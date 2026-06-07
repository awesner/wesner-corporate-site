export interface RefLink {
  label: string;
  url: string;
  type: 'video' | 'doc' | 'training' | 'github';
}

export const topicReferences: Record<string, RefLink[]> = {
  overview: [
    { label: "Azure Integration Services Overview", url: "https://learn.microsoft.com/en-us/shows/azure-friday/an-overview-of-azure-integration-services", type: "video" },
    { label: "Introduction to Azure Integration Service Environment", url: "https://learn.microsoft.com/en-us/shows/azure-friday/introduction-to-azure-integration-service-environment-for-logic-apps", type: "video" },
    { label: "Architect API Integration (Learning Path)", url: "https://learn.microsoft.com/en-us/training/paths/architect-api-integration/", type: "training" },
  ],
  logicApps: [
    { label: "Azure Logic Apps Overview (1 min)", url: "https://learn.microsoft.com/en-us/shows/one-dev-minute/azure-logic-apps-overview", type: "video" },
    { label: "Getting Started with Logic Apps Standard", url: "https://learn.microsoft.com/en-us/shows/azure-logic-apps-community-day-2023/getting-started-with-logic-apps-standard", type: "video" },
    { label: "Logic Apps: Consumption vs. Standard", url: "https://www.youtube.com/watch?v=XaxDcuFaPZg", type: "video" },
    { label: "Build Custom Connectors for Logic Apps", url: "https://learn.microsoft.com/en-us/shows/azure-serverless-conf/build-custom-connectors-for-azure-logic-apps", type: "video" },
    { label: "Workflow & Trigger Expressions", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/workflow-and-trigger-expressions-can-help-monitor-your-logic-apps", type: "video" },
    { label: "Peek-Lock Service Bus Triggers", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/mastering-azure-logic-apps-renewing-lock-tokens-in-peek-lock-service-bus-triggers", type: "video" },
    { label: "Intro to Logic Apps (Training)", url: "https://learn.microsoft.com/en-us/training/modules/intro-to-logic-apps/", type: "training" },
    { label: "Single-Tenant vs. Multi-Tenant", url: "https://learn.microsoft.com/en-us/azure/logic-apps/single-tenant-overview-compare", type: "doc" },
    { label: "Consumption vs. Standard Plans", url: "https://techcommunity.microsoft.com/blog/appsonazureblog/azure-logic-apps-plans-consumption-based-vs-standard/3793997", type: "doc" },
    { label: "Connector Differences Explained", url: "https://marczak.io/posts/2025/01/logic-app-tip-connector-differences/", type: "doc" },
    { label: "Connectors Overview", url: "https://learn.microsoft.com/en-us/azure/connectors/introduction", type: "doc" },
    { label: "Built-in Connectors", url: "https://learn.microsoft.com/en-us/azure/connectors/built-in", type: "doc" },
    { label: "Connector Reference", url: "https://learn.microsoft.com/en-us/connectors/connector-reference/connector-reference-logicapps-connectors", type: "doc" },
    { label: "Workflow Actions & Triggers", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-workflow-actions-triggers", type: "doc" },
    { label: "Tutorial: Recurring Workflow", url: "https://learn.microsoft.com/en-us/azure/logic-apps/tutorial-build-schedule-recurring-logic-app-workflow", type: "doc" },
    { label: "Logic App Triggers Guide", url: "https://turbo360.com/blog/azure-logic-app-triggers", type: "doc" },
  ],
  serviceBus: [
    { label: "Azure Service Bus Overview", url: "https://www.youtube.com/watch?v=sjgG3Q2GbeA", type: "video" },
    { label: "Service Bus from the Ground Up", url: "https://learn.microsoft.com/en-us/shows/on-dotnet/azure-service-bus-from-the-ground-up", type: "video" },
    { label: "Service Bus Deep Dive", url: "https://www.youtube.com/watch?v=8marp1oyY_I", type: "video" },
    { label: "Queues, Topics & Subscriptions", url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions", type: "doc" },
    { label: "Service Bus Messaging Overview", url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview", type: "doc" },
  ],
  apim: [
    { label: "API Management Overview", url: "https://www.youtube.com/watch?v=gQ0UMB8kDNE", type: "video" },
    { label: "Getting Started with APIM (1 min)", url: "https://learn.microsoft.com/en-us/shows/one-dev-minute/how-do-i-get-started-with-azure-api-management", type: "video" },
    { label: "Intro to API Management (Training)", url: "https://learn.microsoft.com/en-us/training/modules/introduction-to-azure-api-management/", type: "training" },
  ],
  eventGrid: [
    { label: "Azure Event Grid Explained", url: "https://www.youtube.com/watch?v=TujzkSxJzIA", type: "video" },
    { label: "Introducing Azure Event Grid", url: "https://learn.microsoft.com/en-us/shows/azure-videos/introducing-azure-event-grid", type: "video" },
    { label: "Azure Event Grid (Training)", url: "https://learn.microsoft.com/en-us/training/modules/azure-event-grid/", type: "training" },
    { label: "Custom Events Quickstart", url: "https://learn.microsoft.com/en-us/azure/event-grid/custom-event-quickstart", type: "doc" },
  ],
  functions: [
    { label: "Serverless Event-Driven Apps with Functions", url: "https://learn.microsoft.com/en-us/shows/azure-friday/go-serverless-event-driven-applications-with-azure-functions", type: "video" },
    { label: "Build Serverless APIs with Functions", url: "https://learn.microsoft.com/en-us/shows/azure-friday/build-serverless-APIs-with-azure-functions", type: "video" },
    { label: "Intro to Azure Functions (Training)", url: "https://learn.microsoft.com/en-us/training/modules/intro-azure-functions/", type: "training" },
    { label: "Implement Azure Functions (Learning Path)", url: "https://learn.microsoft.com/en-us/training/paths/implement-azure-functions/", type: "training" },
    { label: "Develop Azure Functions (Training)", url: "https://learn.microsoft.com/en-us/training/modules/develop-azure-functions/", type: "training" },
  ],
  dataFactory: [
    { label: "Azure Data Factory Overview", url: "https://learn.microsoft.com/en-us/shows/azure-videos/azure-data-factory", type: "video" },
    { label: "Data Flow Tutorials", url: "https://learn.microsoft.com/en-us/azure/data-factory/data-flow-tutorials", type: "doc" },
    { label: "Intro to Data Factory (Training)", url: "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-data-factory/", type: "training" },
  ],
  migration: [
    { label: "BizTalk to AIS Migration — Learnings from the Field", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/biztalk-to-ais-migration-learnings-from-the-field", type: "video" },
    { label: "BizTalk Server Migration Overview", url: "https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview", type: "doc" },
    { label: "Migration Approaches", url: "https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-azure-integration-services-migration-approaches", type: "doc" },
  ],
  monitoring: [
    { label: "What to Use for Monitoring in Azure", url: "https://learn.microsoft.com/en-us/shows/azure-friday/what-to-use-for-monitoring-your-applications-in-azure", type: "video" },
    { label: "Log Analytics Tutorial", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial", type: "doc" },
    { label: "Application Insights Overview", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview", type: "doc" },
    { label: "Azure Monitor Overview", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/overview", type: "doc" },
  ],
  cicdDevOps: [
    { label: "Azure DevOps Introduction", url: "https://learn.microsoft.com/en-us/shows/azure-devops-launch-2018/a101", type: "video" },
    { label: "Deploying to Azure with GitHub Actions", url: "https://learn.microsoft.com/en-us/shows/devops-lab/deploying-to-azure-with-github-actions", type: "video" },
    { label: "Automate Azure Deployments with Bicep & GitHub Actions", url: "https://learn.microsoft.com/en-us/shows/learn-live/automate-azure-deployments-bicep-github-actions/", type: "video" },
    { label: "Create First Pipeline", url: "https://learn.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops", type: "doc" },
    { label: "Azure DevOps with GitHub", url: "https://learn.microsoft.com/en-us/azure/devops-project/azure-devops-project-github", type: "doc" },
    { label: "GitHub Actions CD (Training)", url: "https://learn.microsoft.com/en-us/training/modules/github-actions-cd/", type: "training" },
  ],
  cicdAzure: [
    { label: "Logic Apps Community Standup — CI/CD", url: "https://learn.microsoft.com/en-us/shows/azure-developers/azure-logic-apps-community-standup-july-2023", type: "video" },
    { label: "DevOps Deployment for Logic Apps Standard", url: "https://learn.microsoft.com/en-us/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps", type: "doc" },
    { label: "Set Up DevOps Deployment", url: "https://learn.microsoft.com/en-us/azure/logic-apps/set-up-devops-deployment-single-tenant-azure-logic-apps", type: "doc" },
    { label: "Logic Apps CI/CD 2024 Guide", url: "https://marczak.io/posts/2024/02/azure-logic-apps-cicd-2024/", type: "doc" },
  ],
  exceptionHandling: [
    { label: "Everything You Need to Know About Error Handling", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/logic-apps-everything-you-need-to-know-about-error-handling", type: "video" },
    { label: "Error & Exception Handling", url: "https://learn.microsoft.com/en-us/azure/logic-apps/error-exception-handling", type: "doc" },
    { label: "Diagnosing Failures", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-diagnosing-failures", type: "doc" },
  ],
  testing: [
    { label: "Automated Testing for Logic Apps", url: "https://learn.microsoft.com/en-us/shows/azure-logic-apps-community-day-2023/automated-testing-for-logic-apps", type: "video" },
    { label: "Azure DevOps Testing", url: "https://learn.microsoft.com/en-us/shows/azure-devops-launch-2018/a104", type: "video" },
    { label: "LogicAppUnit Testing Framework", url: "https://github.com/LogicAppUnit/TestingFramework", type: "github" },
  ],
  security: [
    { label: "Azure Key Vault & .NET Aspire", url: "https://learn.microsoft.com/en-us/shows/azure-developers-dotnet-aspire-day-2024/introduction-to-azure-key-vault-and-dotnet-aspire", type: "video" },
    { label: "Managed Identities Tutorial", url: "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-vm-access-nonaad", type: "doc" },
    { label: "Key Vault with Web App Tutorial", url: "https://learn.microsoft.com/en-us/azure/key-vault/general/tutorial-net-create-vault-azure-web-app", type: "doc" },
    { label: "Secure Your Key Vault", url: "https://learn.microsoft.com/en-us/azure/key-vault/general/secure-key-vault", type: "doc" },
  ],
  enterprisePlatform: [
    { label: "Azure Integration Services Overview", url: "https://learn.microsoft.com/en-us/shows/azure-friday/an-overview-of-azure-integration-services", type: "video" },
    { label: "Enterprise Integration Overview", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-overview", type: "doc" },
    { label: "Enterprise Integration Reference Architecture", url: "https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/enterprise-integration/basic-enterprise-integration", type: "doc" },
    { label: "Choose Integration Capabilities", url: "https://learn.microsoft.com/en-us/azure/logic-apps/azure-integration-services-choose-capabilities", type: "doc" },
  ],
  cutover: [
    { label: "BizTalk to AIS Migration — Learnings from the Field", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/biztalk-to-ais-migration-learnings-from-the-field", type: "video" },
    { label: "Plan Migration", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/plan-migration", type: "doc" },
    { label: "Migration Wave Planning", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/migration-wave-planning", type: "doc" },
    { label: "Cutover Guide", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/relocate/cutover", type: "doc" },
  ],
  environments: [
    { label: "How to Set Up Dev/Test Environments in Azure", url: "https://learn.microsoft.com/en-us/shows/azure-videos/how-to-setup-devtest-environments-in-azure", type: "video" },
    { label: "Environment Considerations", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/considerations/environments", type: "doc" },
    { label: "Azure Deployment Environments", url: "https://learn.microsoft.com/en-us/azure/deployment-environments/overview-what-is-azure-deployment-environments", type: "doc" },
  ],
  integrationEnv: [
    { label: "Azure Integration Environment Overview", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-overview", type: "doc" },
  ],
  devProcess: [
    { label: "Azure Naming Conventions", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming", type: "doc" },
    { label: "Bicep Overview", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview", type: "doc" },
  ],
  examples: [
    { label: "BizTalk to AIS Migration — Learnings from the Field", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/biztalk-to-ais-migration-learnings-from-the-field", type: "video" },
    { label: "Migration Approaches", url: "https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-azure-integration-services-migration-approaches", type: "doc" },
  ],
  projectMgmt: [
    { label: "Cloud Adoption Framework — Migration", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/", type: "doc" },
    { label: "Azure DevOps with GitHub", url: "https://learn.microsoft.com/en-us/azure/devops-project/azure-devops-project-github", type: "doc" },
  ],
  gitBranching: [
    { label: "Git Branching & Merging", url: "https://learn.microsoft.com/en-us/shows/learn-live/learn-git-episode-3-branching-and-merging-with-git", type: "video" },
    { label: "Manage Git Branches (Training)", url: "https://learn.microsoft.com/en-us/training/modules/manage-git-branches-workflows/", type: "training" },
    { label: "Git Branching Guidance", url: "https://learn.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops", type: "doc" },
  ],
};
