---
layout: default
title: "autoscaling-microservice-application"
date: 2024-10-02 13:19:24 -0400
categories: devops
---
- [Introduction](#introduction)
- [Baselines](#baselines)
- [Real Users vs Requests](#real-users-vs-requests)
- [Determine vertical implementation](#vertical-scaling-implementation)
- [Determine horizontal implementation](#horizontal-scaling-implementation)
- [Discuss and Determine Metric source for autoscaling](#metric-source-for-autoscaling)
- [How to deal with and avoid flapping](#deal-with-and-avoid-flapping)

### Introduction:

In this blog I attempt to disccuss how I went about autoscaling aws ecs services. At a high level, I'll discuss the need for baselining, which KPIs matter, why we want to corrolate users and requests over time. 
I will also dive into what goes into vertically and horizontally scaling your applications and when to perform both scaling technique. 



### Baselines:

In order to autoscale properly, you want to have a baseline for KPIs you want to monitor. KPIs I decided to monitor are latency, error rate and compute utilization. 
You also want to keep a record of reqests per second on each of the microservice you wish to autoscale. 

### Real Users vs Requests:

**App 1 (gateway app):**

rolled up the sum of requests as count for the past hour
rolled up the sum of unique users for the past hour
Recommend using an obersavability tool like datadog to collect metrics for kpi metrics and create a dashbaord based off these metrics. 

So going by a dashbaord graphs that has decent correlation I picked a point on the graph (view of 1 day)
Knowing that these metrics, especially the requests counts are highly volatile, I picked the highest picks of both metrics.
32.15k hits and 41 unique users.
32.15k/41 = 780 hits per user
1 user = 0.2 req/s aproxx
1 req/s  = 5 users. 

**App 2 (gateway app):**

Following the same method above
Highest peaks were 772 hits and 35 unique users 
772/35 = 22.057 hits per user 
1 user = 0.006 req/s (22.057/3600)
1 req/s = 166 users 
0.006rps/1user = 1rps/166 users

### Vertical Scaling Implementation
Perform load tests to determine what each service performs best at for a set of 100 users (Average load test run)  or a particular request per second. We have been going with the average load test, but this can change. 
For this identified KPI, we want to make sure the compute resource is underutilized.  
We shall have a table that represents experiments against each service and how the appropriate compute size was determined. 

Vertical scales should be validated during the release phase using the average load test run and horizontally scaled to a single task count. 
Running a single task may result exceeding latency thresholds, this is okay for the following reasons:
We care primarily about compute utilization and keeping it under utilized in the average case. 
Secondarily we want to know that the provisioning is able to handle certain req/s again while being underutilized. 
It helps validate that horizontally scaling does in fact improve latency. 
Lastly, we never expect to run a single task in prod (minimum of 2). 

Our current vertical scale:

| Service                  | Vertical Scale Level | Horizontal Scale (Task Count) | Req/time(10s) | Latency(s) | Test type | cpu/mem (%) |
|--------------------------|----------------------|-------------------------------|---------------|------------|-----------|--------------|
| app1                     | V3                   | 1                             | 67.4          | 628 ms     | Average   | 37/19        |
| app2                     | V3                   | 1                             | 11.8          | 1.3 s      | Average   | 17/22        |
| app3                     | V3                   | 1                             | 15            | 11 ms      | Average   | 16/16        |



### Metric source for autoscaling:

| Approach                                      | Pros                                                                                       | Cons                                                                                                     |
|-----------------------------------------------|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Default CloudWatch Metrics**                | - Minimal setup/configuration<br>- Create alarms based off existing metrics<br>- Compute resources are collected by default. | - No application logs sent directly to CloudWatch.<br>- Unable to use ALB latency as not all services sit behind an ALB. |
| **Use KPI Dashboard Metrics**                 | - Application data is collected in Datadog by default.<br>- KPI metrics are readily available.<br>- Pulumi state always up-to-date. | - Could involve a lot of logic building.<br>- Additional overhead maintaining webhooks and actions.       |
| **Datadog and EventBridge Integration**       | - Application data is collected in Datadog by default.<br>- KPI metrics are readily available.<br>- Less overhead than using KPI dashboard metrics, integration is by provider. | - Involves coupling of AWS services, causing possible maintenance overhead.                               |



Methods I leaned towards:

Option 1 - Default cloudwatch metrics for compute utilization. 

Option 3 - Datadog and Eventbridge Integration for latency. 

### Scaling policies (using a combination):



| Approach  | Pros                                                                                                           | Cons                                                                                                           |
|-----------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Scheduled** | - Easy to set up<br>- Guarantees scale events                                                               | - Assumes to know when we get the most and least traffic<br>- Will not respond to load increase outside of assumed time. |
| **Step**      | - Ability to control resources at a granular level.<br>- Predictable behavior to avoid over scaling.<br>- Customize cool-down periods to avoid flapping.<br>- Cost efficient once vertical scales have been identified. | - Can get complex especially when using multiple metrics.<br>- Slower response to sudden changes, can lead to underperformance for some time.<br>- Limited to predefined scenarios, not as automated as target tracking. |
| **Target**    | - Simple, with no need for manual tuning.<br>- Adaptive and responsive.<br>- Automatic overscaling prevention; AWS reduces scale actions when metric is close to target.<br>- Less overhead. | - No fine-grained control, AWS determines the amount of resources needed.<br>- Could result in higher costs than wanted based on AWS’s determinants. |


### Horizontal Scaling Implementation 

Sale horizontally based on : 

##### Step Scaling

**Latency**:

Horizontal scaling based on latency is likely to cause flapping. But that is okay, and because we want to almost always react to increased or decreased load. 
And we know load changes correlate highly with latency. See snapshots below. 

##### Target tracking

Less overhead, set a target value and scaling is automated. 

**CPU**
Keep CPU <= 40%

**Memory**
Keep memory <= 40%

### Codifying Autoscaling:

Pulumi Aws and Datadog libraries will be used to provision; 
Cloudwatch alarms 
Cloudwatch per service log group and metric filter.
Datadog Eventbridge Integration 
Eventbridge rule and target
ECS scaling policy 
These resources are likely to be built into an auto scaling component resource

### Deal with and avoid flapping: 

We’ll use cooldown periods to avoid flapping. Because we prioritize performance, we have shorter scale out cooldown periods and longer scale in cool down periods. 

10 minutes total between a scale event and a scale-out event. 
30 minutes total between a scale event and a scale-in event.

### Conclusion:

In this blog post, we discussed autoscaling AWS ECS services. We covered baselining and monitoring KPIs, load testing for vertical scaling, metric sources, scaling policies, horizontal scaling, codifying autoscaling, and avoiding flapping. Follow the referenced links for more details.



### Referenced links:
- [https://aws.amazon.com/blogs/containers/autoscaling-amazon-ecs-services-based-on-custom-metrics-with-application-auto-scaling/](https://aws.amazon.com/blogs/containers/autoscaling-amazon-ecs-services-based-on-custom-metrics-with-application-auto-scaling/)
- [https://www.pulumi.com/docs/clouds/aws/guides/autoscaling/](https://www.pulumi.com/docs/clouds/aws/guides/autoscaling/)
- [https://www.datadoghq.com/blog/amazon-eventbridge/](https://www.datadoghq.com/blog/amazon-eventbridge/)

