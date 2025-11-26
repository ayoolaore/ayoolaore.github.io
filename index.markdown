---
layout: home
title: About
---

<div class="hero-section">
  <h1 class="hero-title">Hi, I'm <span class="gradient-text">Ayoola</span></h1>
  <p class="hero-subtitle">Platform Engineer • Curious Being</p>
</div>

<div class="about-intro">
  <p>I talk a lot about technology and science in general. Topics I've spent time learning about lately include theoretical computing, artificial intelligence, web development, open-banking, quantum computing and a bit of physics—because I believe it's the topic that truly ties it all together.</p>

  <p>With flair and passion for technology, I've been lucky enough to work across multiple technology stacks in areas that concern web development, on-prem networking, security, and data lakes.</p>

  <p>I enjoy setting up new environments, whatever that may be: A greenfield enterprise cloud project, a brand new web application, a new Security Information and Event Management (SIEM)? That is, walking through architecture, gathering the necessary artifacts, resources and talents necessary to embark on building a resilient system.</p>

  <p>I use my understanding of fundamental topics like networking protocols, computer architecture and efficient algorithms to design, foresee and troubleshoot resilient and complex systems.</p>
</div>

## Work Experience

<div class="experience-timeline">

<div class="experience-card">
  <div class="experience-header">
    <h3>DevOps Engineer</h3>
    <span class="company">Harvard University</span>
    <span class="location">Boston, MA</span>
  </div>
  <div class="experience-content">
    <p>Building a modernized learning experience to be used by Harvard and other subscribing schools.</p>
    <ul>
      <li>Worked as one of two DevOps engineers that ensured all of our processes were automated</li>
      <li>Built CI/CD release pipelines leveraging GitHub Actions</li>
      <li>Automated security scanning, build and push of images, deployment of updated infrastructure and applications</li>
      <li>Managed micro-service systems using Pulumi (TypeScript) for IaC</li>
      <li>Managed and built AWS services: ECS, RDS, Elasticache, ALB, etc.</li>
      <li>Orchestrated self-hosted runners to bypass data security constraints</li>
      <li>Built automated smoke tests and load tests using Grafana</li>
      <li>In constant communication with App developers, QA engineers and Product managers</li>
    </ul>
  </div>
</div>

<div class="experience-card">
  <div class="experience-header">
    <h3>DevOps Engineer</h3>
    <span class="company">Onxpress</span>
    <span class="location">Ontario, Canada</span>
  </div>
  <div class="experience-content">
    <p>Rail Transportation in Greater Toronto and Hamilton Area. Focused on modernizing, electrifying, and expanding rail transport leveraging greenfield environment.</p>
    <ul>
      <li>Worked on the platforms engineering team to stand up greenfield cloud-only Azure landing zone</li>
      <li>Led weekly standups between Developers and Infrastructure engineers to facilitate DevOps ecosystem</li>
      <li>Developed Infrastructure as a Platform servicing applications team using Terraform</li>
      <li>Used function apps to host .NET APIs and VM images for COTS applications</li>
      <li>Integrated multiple systems: ServiceNow, GitHub Actions, Azure Integration Services</li>
      <li>Built CI/CD pipelines in GitHub Actions after standing up greenfield GitHub enterprise environment</li>
      <li>Built automated system around data retention policy syncing data to AWS S3 with required LTR settings</li>
      <li>Researched and made recommendations to business on tooling for platforms team</li>
    </ul>
  </div>
</div>

<div class="experience-card">
  <div class="experience-header">
    <h3>Security Consultant</h3>
    <span class="company">Security Resource Group</span>
    <span class="location">Toronto, ON</span>
  </div>
  <div class="experience-content">
    <p>Security company delivering managed services to clients Canada wide.</p>
    <ul>
      <li>Performed threat intelligence on daily basis</li>
      <li>Wrote SOAR programs in Python to deliver data to and from S3</li>
      <li>Worked on migrating SIEM to SumoLogic</li>
      <li>Led the management of EDR services</li>
    </ul>
  </div>
</div>

<div class="experience-card">
  <div class="experience-header">
    <h3>Infrastructure Analyst</h3>
    <span class="company">Payworks</span>
    <span class="location">Toronto, ON</span>
  </div>
  <div class="experience-content">
    <p>SaaS company providing payroll services Canada wide.</p>
    <ul>
      <li>Maintained daily operation of company-wide complex infrastructure</li>
      <li>Worked on L2 and L3 physical and logical networking</li>
      <li>Worked with L7 protocols using Load Balancing and Content Switching methods</li>
      <li>Maintained and evolved network architecture from a flat network</li>
      <li>Implemented Ansible automation for network devices</li>
      <li>Supported .NET web development in highly available clusters</li>
    </ul>
  </div>
</div>

</div>

## Tech Stack

<div class="tech-stack">
  <div class="tech-category">
    <h4>Cloud & Infrastructure</h4>
    <ul>
      <li>AWS (ECS, RDS, Lambda, S3, CloudFront)</li>
      <li>Azure (Function Apps, Landing Zones)</li>
      <li>Terraform & Pulumi (IaC)</li>
    </ul>
  </div>

  <div class="tech-category">
    <h4>DevOps & Automation</h4>
    <ul>
      <li>GitHub Actions</li>
      <li>CI/CD Pipelines</li>
      <li>Ansible</li>
    </ul>
  </div>

  <div class="tech-category">
    <h4>Observability & Security</h4>
    <ul>
      <li>Datadog</li>
      <li>SumoLogic</li>
      <li>Grafana</li>
      <li>SIEM/SOAR</li>
    </ul>
  </div>

  <div class="tech-category">
    <h4>Development</h4>
    <ul>
      <li>Node.js</li>
      <li>Python</li>
      <li>TypeScript</li>
    </ul>
  </div>
</div>

<style>
  .hero-section {
    text-align: center;
    padding: var(--space-3xl) 0 var(--space-2xl);
    margin-bottom: var(--space-2xl);
  }

  .hero-title {
    font-size: var(--text-5xl);
    font-weight: 800;
    margin-bottom: var(--space-md);
    line-height: 1.1;
  }

  .hero-subtitle {
    font-size: var(--text-xl);
    color: var(--text-secondary);
    font-weight: 500;
  }

  .about-intro {
    margin-bottom: var(--space-3xl);
    font-size: var(--text-lg);
    line-height: 1.8;
  }

  .about-intro p {
    margin-bottom: var(--space-lg);
  }

  .experience-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    margin: var(--space-xl) 0;
  }

  .experience-card {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    transition: all var(--transition-base);
    border-left: 4px solid var(--accent-primary);
  }

  .experience-card:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-hover);
    border-left-color: var(--accent-secondary);
  }

  .experience-header {
    margin-bottom: var(--space-lg);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--space-md);
  }

  .experience-header h3 {
    margin: 0 0 var(--space-sm) 0;
    color: var(--text-primary);
    font-size: var(--text-2xl);
  }

  .company {
    display: inline-block;
    color: var(--accent-primary);
    font-weight: 600;
    font-size: var(--text-lg);
    margin-right: var(--space-md);
  }

  .location {
    color: var(--text-tertiary);
    font-size: var(--text-sm);
  }

  .experience-content p {
    font-style: italic;
    color: var(--text-secondary);
    margin-bottom: var(--space-md);
  }

  .experience-content ul {
    list-style: none;
    padding: 0;
  }

  .experience-content ul li {
    padding-left: var(--space-lg);
    margin-bottom: var(--space-sm);
    position: relative;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .experience-content ul li::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: var(--accent-primary);
    font-weight: bold;
  }

  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
    margin-top: var(--space-xl);
  }

  .tech-category {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    transition: all var(--transition-base);
  }

  .tech-category:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .tech-category h4 {
    color: var(--accent-primary);
    margin: 0 0 var(--space-md) 0;
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .tech-category ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tech-category ul li {
    padding: var(--space-xs) 0;
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }

    .hero-subtitle {
      font-size: var(--text-lg);
    }

    .tech-stack {
      grid-template-columns: 1fr;
    }
  }
</style>
