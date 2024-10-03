---
layout: post
title: "pulumi-github-actions-aws-ecs"
date: 2024-09-16 13:19:24 -0400
categories: devops
---

## Introduction

In this blog post, we will explore how to use Pulumi to host and deploy a microservice application in Amazon ECS (Elastic Container Service) and automate the deployment process using GitHub Actions. Pulumi is an infrastructure as code tool that allows you to define cloud resources using familiar programming languages. GitHub Actions is a powerful CI/CD tool that integrates seamlessly with GitHub repositories.

## Setting Up Pulumi

First, you need to install Pulumi and set up your AWS credentials.

1. Install Pulumi:
    ```bash
    curl -fsSL https://get.pulumi.com | sh
    ```

2. Configure AWS CLI with your credentials:
    ```bash
    aws configure
    ```
  [Details on aws cli can be found here](https://aws.amazon.com/cli/)

3. Create a new Pulumi project:
    ```bash
    pulumi new aws-typescript
    ```
  Pulumi allows you to have multiple stacks that can be saved to the same sate file. 
  [See details on pulumi stack here ](https://www.pulumi.com/docs/iac/concepts/stacks/)
## Defining the Microservice

Next, define your microservice application in Pulumi. Here is an example of how to define an ECS cluster and a Fargate service using TypeScript:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an ECS cluster
const cluster = new aws.ecs.Cluster("my-cluster");

// Define a task definition
const taskDefinition = new aws.ecs.TaskDefinition("my-task", {
    family: "my-task-family",
    cpu: "256",
    memory: "512",
    networkMode: "awsvpc",
    requiresCompatibilities: ["FARGATE"],
    executionRoleArn: aws.iam.Role.get("ecsTaskExecutionRole", "arn:aws:iam::123456789012:role/ecsTaskExecutionRole").arn,
    containerDefinitions: pulumi.output([{
        name: "my-app",
        image: "my-docker-image", // this image can be stored in Amazon ECR
        portMappings: [{
            containerPort: 80,
            hostPort: 80,
            protocol: "tcp"
        }]
    }]).apply(JSON.stringify)
});

// Create a Fargate service
const service = new aws.ecs.Service("my-service", {
    cluster: cluster.arn,
    taskDefinition: taskDefinition.arn,
    desiredCount: 1,
    launchType: "FARGATE",
    networkConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: aws.ec2.getSubnetIds().then(subnet => subnet.ids),
        securityGroups: [aws.ec2.getSecurityGroup({ name: "default" }).then(sg => sg.id)]
    }
});

```

### Deploying to ECS

Deploy the microservice to ECS using Pulumi:

```
pulumi stack init app-dev
pulumi stack select app-dev
pulumi preview --diff
pulumi up
```

### Setting Up GitHub Actions

Create a GitHub Actions workflow to automate the deployment process. Add a .github/workflows/deploy.yml file to your repository:

```
name: Deploy to ECS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install Pulumi
        run: |
          curl -fsSL https://get.pulumi.com | sh
          export PATH=$PATH:$HOME/.pulumi/bin

      - name: Install dependencies
        run: npm install

      - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-west-2

      - name: Deploy with Pulumi
        run: pulumi up --yes
```

### Automating Deployment
With the GitHub Actions workflow in place, every push to the main branch will trigger the deployment process. Ensure you have added your AWS credentials to the repository secrets.

### Conclusion
In this blog post, we demonstrated how to use Pulumi to define and deploy a microservice application to Amazon ECS and automate the deployment process using GitHub Actions. This approach allows you to manage your infrastructure as code and streamline your CI/CD pipeline, making deployments more efficient and reliable.