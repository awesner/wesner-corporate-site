import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Stack, Card, CardContent, CardActionArea, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Collapse, Link as MuiLink } from '@mui/material';
interface RefLink { label: string; url: string; type: 'video' | 'doc' | 'training' | 'github'; }
const topicReferences: Record<string, RefLink[]> = {
  overview: [{ label: "Azure Integration Services Overview", url: "https://learn.microsoft.com/en-us/shows/azure-friday/an-overview-of-azure-integration-services", type: "video" }, { label: "Introduction to Integration Service Environment", url: "https://learn.microsoft.com/en-us/shows/azure-friday/introduction-to-azure-integration-service-environment-for-logic-apps", type: "video" }, { label: "Architect API Integration (Learning Path)", url: "https://learn.microsoft.com/en-us/training/paths/architect-api-integration/", type: "training" }],
  logicApps: [{ label: "Azure Logic Apps Overview (1 min)", url: "https://learn.microsoft.com/en-us/shows/one-dev-minute/azure-logic-apps-overview", type: "video" }, { label: "Getting Started with Logic Apps Standard", url: "https://learn.microsoft.com/en-us/shows/azure-logic-apps-community-day-2023/getting-started-with-logic-apps-standard", type: "video" }, { label: "Consumption vs. Standard", url: "https://www.youtube.com/watch?v=XaxDcuFaPZg", type: "video" }, { label: "Build Custom Connectors", url: "https://learn.microsoft.com/en-us/shows/azure-serverless-conf/build-custom-connectors-for-azure-logic-apps", type: "video" }, { label: "Intro to Logic Apps (Training)", url: "https://learn.microsoft.com/en-us/training/modules/intro-to-logic-apps/", type: "training" }, { label: "Single-Tenant vs. Multi-Tenant", url: "https://learn.microsoft.com/en-us/azure/logic-apps/single-tenant-overview-compare", type: "doc" }, { label: "Connectors Overview", url: "https://learn.microsoft.com/en-us/azure/connectors/introduction", type: "doc" }, { label: "Connector Reference", url: "https://learn.microsoft.com/en-us/connectors/connector-reference/connector-reference-logicapps-connectors", type: "doc" }],
  serviceBus: [{ label: "Azure Service Bus Overview", url: "https://www.youtube.com/watch?v=sjgG3Q2GbeA", type: "video" }, { label: "Service Bus from the Ground Up", url: "https://learn.microsoft.com/en-us/shows/on-dotnet/azure-service-bus-from-the-ground-up", type: "video" }, { label: "Queues, Topics & Subscriptions", url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions", type: "doc" }],
  apim: [{ label: "API Management Overview", url: "https://www.youtube.com/watch?v=gQ0UMB8kDNE", type: "video" }, { label: "Getting Started with APIM", url: "https://learn.microsoft.com/en-us/shows/one-dev-minute/how-do-i-get-started-with-azure-api-management", type: "video" }, { label: "Intro to API Management (Training)", url: "https://learn.microsoft.com/en-us/training/modules/introduction-to-azure-api-management/", type: "training" }],
  eventGrid: [{ label: "Azure Event Grid Explained", url: "https://www.youtube.com/watch?v=TujzkSxJzIA", type: "video" }, { label: "Introducing Azure Event Grid", url: "https://learn.microsoft.com/en-us/shows/azure-videos/introducing-azure-event-grid", type: "video" }, { label: "Event Grid (Training)", url: "https://learn.microsoft.com/en-us/training/modules/azure-event-grid/", type: "training" }],
  functions: [{ label: "Serverless Event-Driven Apps", url: "https://learn.microsoft.com/en-us/shows/azure-friday/go-serverless-event-driven-applications-with-azure-functions", type: "video" }, { label: "Build Serverless APIs", url: "https://learn.microsoft.com/en-us/shows/azure-friday/build-serverless-APIs-with-azure-functions", type: "video" }, { label: "Intro to Functions (Training)", url: "https://learn.microsoft.com/en-us/training/modules/intro-azure-functions/", type: "training" }, { label: "Implement Functions (Learning Path)", url: "https://learn.microsoft.com/en-us/training/paths/implement-azure-functions/", type: "training" }],
  dataFactory: [{ label: "Azure Data Factory Overview", url: "https://learn.microsoft.com/en-us/shows/azure-videos/azure-data-factory", type: "video" }, { label: "Data Flow Tutorials", url: "https://learn.microsoft.com/en-us/azure/data-factory/data-flow-tutorials", type: "doc" }, { label: "Intro to Data Factory (Training)", url: "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-data-factory/", type: "training" }],
  migration: [{ label: "BizTalk to AIS — Learnings from the Field", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/biztalk-to-ais-migration-learnings-from-the-field", type: "video" }, { label: "BizTalk Migration Overview", url: "https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview", type: "doc" }, { label: "Migration Approaches", url: "https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-azure-integration-services-migration-approaches", type: "doc" }],
  monitoring: [{ label: "What to Use for Monitoring in Azure", url: "https://learn.microsoft.com/en-us/shows/azure-friday/what-to-use-for-monitoring-your-applications-in-azure", type: "video" }, { label: "Log Analytics Tutorial", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial", type: "doc" }, { label: "Application Insights Overview", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview", type: "doc" }, { label: "Azure Monitor Overview", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/overview", type: "doc" }],
  cicdDevOps: [{ label: "Azure DevOps Introduction", url: "https://learn.microsoft.com/en-us/shows/azure-devops-launch-2018/a101", type: "video" }, { label: "Deploying with GitHub Actions", url: "https://learn.microsoft.com/en-us/shows/devops-lab/deploying-to-azure-with-github-actions", type: "video" }, { label: "Bicep & GitHub Actions", url: "https://learn.microsoft.com/en-us/shows/learn-live/automate-azure-deployments-bicep-github-actions/", type: "video" }, { label: "GitHub Actions CD (Training)", url: "https://learn.microsoft.com/en-us/training/modules/github-actions-cd/", type: "training" }, { label: "Create First Pipeline", url: "https://learn.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops", type: "doc" }],
  cicdAzure: [{ label: "Logic Apps Community Standup — CI/CD", url: "https://learn.microsoft.com/en-us/shows/azure-developers/azure-logic-apps-community-standup-july-2023", type: "video" }, { label: "DevOps Deployment for Logic Apps", url: "https://learn.microsoft.com/en-us/azure/logic-apps/devops-deployment-single-tenant-azure-logic-apps", type: "doc" }, { label: "Set Up DevOps Deployment", url: "https://learn.microsoft.com/en-us/azure/logic-apps/set-up-devops-deployment-single-tenant-azure-logic-apps", type: "doc" }, { label: "Logic Apps CI/CD 2024 Guide", url: "https://marczak.io/posts/2024/02/azure-logic-apps-cicd-2024/", type: "doc" }],
  exceptionHandling: [{ label: "Everything About Error Handling", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/logic-apps-everything-you-need-to-know-about-error-handling", type: "video" }, { label: "Error & Exception Handling", url: "https://learn.microsoft.com/en-us/azure/logic-apps/error-exception-handling", type: "doc" }, { label: "Diagnosing Failures", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-diagnosing-failures", type: "doc" }],
  testing: [{ label: "Automated Testing for Logic Apps", url: "https://learn.microsoft.com/en-us/shows/azure-logic-apps-community-day-2023/automated-testing-for-logic-apps", type: "video" }, { label: "Azure DevOps Testing", url: "https://learn.microsoft.com/en-us/shows/azure-devops-launch-2018/a104", type: "video" }, { label: "LogicAppUnit Testing Framework", url: "https://github.com/LogicAppUnit/TestingFramework", type: "github" }],
  security: [{ label: "Azure Key Vault & .NET Aspire", url: "https://learn.microsoft.com/en-us/shows/azure-developers-dotnet-aspire-day-2024/introduction-to-azure-key-vault-and-dotnet-aspire", type: "video" }, { label: "Managed Identities Tutorial", url: "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-vm-access-nonaad", type: "doc" }, { label: "Secure Your Key Vault", url: "https://learn.microsoft.com/en-us/azure/key-vault/general/secure-key-vault", type: "doc" }],
  enterprisePlatform: [{ label: "Azure Integration Services Overview", url: "https://learn.microsoft.com/en-us/shows/azure-friday/an-overview-of-azure-integration-services", type: "video" }, { label: "Enterprise Integration Overview", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-overview", type: "doc" }, { label: "Enterprise Integration Reference Architecture", url: "https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/enterprise-integration/basic-enterprise-integration", type: "doc" }],
  cutover: [{ label: "BizTalk to AIS — Learnings from the Field", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/biztalk-to-ais-migration-learnings-from-the-field", type: "video" }, { label: "Plan Migration", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/plan-migration", type: "doc" }, { label: "Cutover Guide", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/relocate/cutover", type: "doc" }],
  environments: [{ label: "How to Set Up Dev/Test Environments", url: "https://learn.microsoft.com/en-us/shows/azure-videos/how-to-setup-devtest-environments-in-azure", type: "video" }, { label: "Environment Considerations", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/considerations/environments", type: "doc" }],
  integrationEnv: [{ label: "Enterprise Integration Overview", url: "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-overview", type: "doc" }],
  devProcess: [{ label: "Azure Naming Conventions", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming", type: "doc" }, { label: "Bicep Overview", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview", type: "doc" }],
  examples: [{ label: "BizTalk to AIS — Learnings from the Field", url: "https://learn.microsoft.com/en-us/shows/logic-apps-community-day-2024/biztalk-to-ais-migration-learnings-from-the-field", type: "video" }, { label: "Migration Approaches", url: "https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-azure-integration-services-migration-approaches", type: "doc" }],
  projectMgmt: [{ label: "Cloud Adoption Framework — Migration", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/", type: "doc" }],
  gitBranching: [{ label: "Git Branching & Merging", url: "https://learn.microsoft.com/en-us/shows/learn-live/learn-git-episode-3-branching-and-merging-with-git", type: "video" }, { label: "Manage Git Branches (Training)", url: "https://learn.microsoft.com/en-us/training/modules/manage-git-branches-workflows/", type: "training" }, { label: "Git Branching Guidance", url: "https://learn.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops", type: "doc" }],
};

type L = { locale?: string };
const e = (locale?: string) => locale === 'en';

const typeIcons: Record<string, string> = { video: '▶', doc: '📄', training: '🎓', github: '🔗' };
const typeLabels: Record<string, Record<string, string>> = {
  video: { de: 'Video-Tutorials', en: 'Video Tutorials' },
  doc: { de: 'Microsoft Learn & Artikel', en: 'Microsoft Learn & Articles' },
  training: { de: 'Interaktive Trainings', en: 'Interactive Training' },
  github: { de: 'GitHub Repositories', en: 'GitHub Repositories' },
};

function ReferencesSection({ topicId, locale }: { topicId: string; locale?: string }) {
  const refs = topicReferences[topicId];
  if (!refs || refs.length === 0) return null;
  const en = e(locale);
  const grouped: Record<string, RefLink[]> = {};
  refs.forEach(r => { if (!grouped[r.type]) grouped[r.type] = []; grouped[r.type].push(r); });
  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="overline" fontWeight="bold" color="text.secondary" sx={{ letterSpacing: 1.5 }}>
        {en ? 'Further Details & Videos' : 'Weiterführende Details & Videos'}
      </Typography>
      {Object.entries(grouped).map(([type, links]) => (
        <Box key={type} sx={{ mt: 2 }}>
          <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            {typeIcons[type]} {typeLabels[type]?.[en ? 'en' : 'de'] || type}
          </Typography>
          <Stack spacing={0.5}>
            {links.map((link, i) => (
              <MuiLink key={i} href={link.url} target="_blank" rel="noopener noreferrer" underline="hover" variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: type === 'video' ? '#DC2626' : 'primary.main', '&:hover': { color: type === 'video' ? '#B91C1C' : 'primary.dark' } }}>
                {link.label}
              </MuiLink>
            ))}
          </Stack>
        </Box>
      ))}
    </Paper>
  );
}

function Section({ title, children, color }: { title: string; children: React.ReactNode; color?: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 4, mb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: color || 'primary.main' }}>{title}</Typography>
      {children}
    </Paper>
  );
}

function BulletList({ items, color }: { items: string[]; color?: string }) {
  return (
    <Stack spacing={0.5}>
      {items.map((item, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color || 'primary.main', mt: 1, flexShrink: 0 }} />
          <Typography variant="body2">{item}</Typography>
        </Box>
      ))}
    </Stack>
  );
}

function TaskList({ tasks, color }: { tasks: { title: string; desc: string }[]; color?: string }) {
  return (
    <Stack spacing={1.5}>
      {tasks.map((t, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Chip label={i + 1} size="small" sx={{ bgcolor: (color || '#3B82F6') + '20', color: color || '#3B82F6', fontWeight: 'bold', minWidth: 28, height: 24 }} />
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">{t.title}</Typography>
            <Typography variant="body2" color="text.secondary">{t.desc}</Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

/* ─── Integration Environment & BPT ─── */
export function IntegrationEnvContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title="Azure Integration Environment" color="#0080FF">
      <Typography variant="body1" paragraph>{en ? "Integration Environment is a logical grouping of Azure resources (Logic Apps, API Management, Service Bus) into an overarching integration landscape. Applications serve as sub-units — e.g. Payroll, Order Processing, Employee Onboarding." : "Integration Environment ist eine logische Gruppierung von Azure-Ressourcen (Logic Apps, API Management, Service Bus) zu einer übergreifenden Integrationslandschaft. Applications dienen als Untereinheiten — z.B. Payroll, Order Processing, Employee Onboarding."}</Typography>
      <Typography variant="body1" paragraph>{en ? "Business Process Tracking enables tracking of business processes across multiple systems — decoupled from workflow code. A Business Identifier (e.g. order number, ticket number) correlates events across systems." : "Business Process Tracking ermöglicht die Nachverfolgung von Business-Prozessen über mehrere Systeme hinweg — entkoppelt vom Workflow-Code. Ein Business Identifier (z.B. Auftragsnummer, Ticketnummer) korreliert Events systemübergreifend."}</Typography>
    </Section>
    <Section title={en ? "Supported Resources" : "Unterstützte Ressourcen"}>
      <Grid container spacing={2}>
        {[{ name: "Azure Logic Apps (Standard)", status: en ? "Available" : "Verfügbar" }, { name: "Azure API Management", status: en ? "Available" : "Verfügbar" }, { name: "Azure Service Bus", status: en ? "Available" : "Verfügbar" }, { name: "Azure Functions", status: en ? "Planned" : "Geplant" }, { name: "Azure Event Grid", status: en ? "Planned" : "Geplant" }].map((r, i) => (
          <Grid item xs={6} md={4} key={i}><Card variant="outlined"><CardContent sx={{ py: 1.5 }}><Typography variant="subtitle2" fontWeight="bold">{r.name}</Typography><Chip label={r.status} size="small" color={r.status === (en ? 'Available' : 'Verfügbar') ? 'success' : 'default'} sx={{ mt: 0.5, height: 20 }} /></CardContent></Card></Grid>
        ))}
      </Grid>
    </Section>
    <Section title="BizTalk BAM vs. Business Process Tracking">
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Aspect" : "Aspekt"}</TableCell><TableCell sx={{ fontWeight: 'bold', color: 'error.main' }}>BizTalk BAM</TableCell><TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Business Process Tracking</TableCell></TableRow></TableHead><TableBody>
        {(en ? [{ a: "Tracking Code", b: "In orchestration code", c: "Decoupled from workflow code" }, { a: "Database", b: "SQL Server", c: "Azure Data Explorer" }, { a: "Portal", b: "BAM Portal", c: "Azure Portal + Power BI" }, { a: "Changes", b: "Re-deployment required", c: "No re-deployment needed" }] : [{ a: "Tracking-Code", b: "Im Orchestration-Code", c: "Entkoppelt vom Workflow-Code" }, { a: "Datenbank", b: "SQL Server", c: "Azure Data Explorer" }, { a: "Portal", b: "BAM Portal", c: "Azure Portal + Power BI" }, { a: "Änderungen", b: "Re-Deployment erforderlich", c: "Keine Re-Deployment nötig" }]).map((r, i) => (
          <TableRow key={i}><TableCell sx={{ fontWeight: 500 }}>{r.a}</TableCell><TableCell>{r.b}</TableCell><TableCell>{r.c}</TableCell></TableRow>
        ))}
      </TableBody></Table></TableContainer>
    </Section>
      <ReferencesSection topicId="integrationEnv" locale={locale} />
  </>);
}

/* ─── Enterprise Integration Platform ─── */
export function EnterprisePlatformContent({ locale }: L) {
  const en = e(locale);
  const [expanded, setExpanded] = useState<number | null>(null);
  const categories = en ? [
    { name: "Data Transformation", items: ["Integration Account — B2B schemas, maps, partner agreements", "Logic Apps — XML/JSON/CSV/Flat-File transformations", "Azure Functions — Custom code for complex transformations"], detail: "Transform data between systems: XSLT for XML, Liquid Templates for JSON, custom code for complex scenarios." },
    { name: "EAI (Enterprise Application Integration)", items: ["Logic Apps — On-prem to cloud, system-to-system"], detail: "Automate cross-system business processes and data flows." },
    { name: "API Management", items: ["Rate Limiting, OAuth 2.0, API Keys, Policies, Developer Portal"], detail: "Centrally manage, secure and monetize your APIs." },
    { name: "ETL & ELT", items: ["Data Factory — 90+ data source connectors, Mapping Data Flows", "Synapse Pipelines — Data Factory in Synapse Workspace"], detail: "Data integration for data warehouse and analytics at scale." },
    { name: "Security & Governance", items: ["Key Vault — Secrets, certificates, encryption keys", "Advisor — Best practice recommendations", "Security Centre — Threat detection, compliance"], detail: "Enforce security and compliance across all integrations." },
    { name: "Durable Messaging", items: ["Service Bus — Queues, Topics, Dead-Letter Queue, Sessions"], detail: "Reliable asynchronous communication with guaranteed delivery." },
    { name: "Storage", items: ["Blob, Queue, Table Storage", "Azure SQL DB — Managed relational database", "Cosmos DB — Globally distributed NoSQL database"], detail: "Various storage options for different requirements." },
    { name: "Hybrid Integration", items: ["VNet Integration — Logic Apps/Functions in Azure Virtual Network", "Data Gateway — On-Premises Data Gateway for local systems"], detail: "Securely connect on-premises systems to the cloud." },
    { name: "B2B Integration", items: ["Integration Account — EDIFACT, X12, AS2 standards"], detail: "EDI-based partner connectivity for B2B data exchange." },
    { name: "Power Platform", items: ["Power Automate — Approval workflows, notifications", "Power Apps — Canvas Apps and model-driven apps", "Power BI — Business Intelligence and data visualization"], detail: "Low-code tools for business users to automate processes." },
  ] : [
    { name: "Data Transformation", items: ["Integration Account — B2B-Schemas, Maps, Partner Agreements", "Logic Apps — XML/JSON/CSV/Flat-File Transformationen", "Azure Functions — Custom Code für komplexe Transformationen"], detail: "Daten zwischen Systemen transformieren: XSLT für XML, Liquid Templates für JSON, Custom Code für komplexe Szenarien." },
    { name: "EAI (Enterprise Application Integration)", items: ["Logic Apps — On-Prem zu Cloud, System-zu-System"], detail: "Systemübergreifende Geschäftsprozesse und Datenflüsse automatisieren." },
    { name: "API Management", items: ["Rate Limiting, OAuth 2.0, API Keys, Policies, Developer Portal"], detail: "APIs zentral verwalten, absichern und monetarisieren." },
    { name: "ETL & ELT", items: ["Data Factory — 90+ Datenquellen-Connectors, Mapping Data Flows", "Synapse Pipelines — Data Factory in Synapse Workspace"], detail: "Datenintegration für Data Warehouse und Analytics im großen Maßstab." },
    { name: "Security & Governance", items: ["Key Vault — Secrets, Zertifikate, Encryption Keys", "Advisor — Best-Practice-Empfehlungen", "Security Centre — Threat Detection, Compliance"], detail: "Sicherheit und Compliance durchsetzen über alle Integrationen." },
    { name: "Durable Messaging", items: ["Service Bus — Queues, Topics, Dead-Letter Queue, Sessions"], detail: "Zuverlässige asynchrone Kommunikation mit garantierter Zustellung." },
    { name: "Storage", items: ["Blob, Queue, Table Storage", "Azure SQL DB — Verwaltete relationale Datenbank", "Cosmos DB — Global verteilte NoSQL-Datenbank"], detail: "Verschiedene Speicheroptionen für unterschiedliche Anforderungen." },
    { name: "Hybrid Integration", items: ["VNet Integration — Logic Apps/Functions in Azure Virtual Network", "Data Gateway — On-Premises Data Gateway für lokale Systeme"], detail: "Sichere Anbindung von On-Premises Systemen an die Cloud." },
    { name: "B2B Integration", items: ["Integration Account — EDIFACT, X12, AS2 Standards"], detail: "EDI-basierte Partneranbindungen für den B2B-Datenaustausch." },
    { name: "Power Platform", items: ["Power Automate — Approval Workflows, Benachrichtigungen", "Power Apps — Canvas Apps und Model-driven Apps", "Power BI — Business Intelligence und Datenvisualisierung"], detail: "Low-Code Tools für Business-Anwender zur Prozessautomatisierung." },
  ];
  return (<>
    <Section title={en ? "Enterprise Integration Platform — All Categories" : "Enterprise Integration Platform — Alle Kategorien"}>
      <Typography variant="body1" paragraph>{en ? "Azure Integration Services as a full-fledged iPaaS platform covers all enterprise integration scenarios." : "Azure Integration Services als vollwertige iPaaS-Plattform deckt alle Enterprise-Integrationsszenarien ab."}</Typography>
      <Grid container spacing={2}>
        {categories.map((cat, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card variant="outlined" sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.15s', borderColor: expanded === i ? 'primary.main' : undefined, '&:hover': { borderColor: 'primary.main', boxShadow: 1 } }}>
              <CardActionArea onClick={() => setExpanded(expanded === i ? null : i)} sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>{cat.name}</Typography>
                <Typography variant="body2" color="text.secondary">{cat.detail}</Typography>
              </CardActionArea>
              <Collapse in={expanded === i}><Box sx={{ px: 2, pb: 2 }}><Divider sx={{ mb: 1 }} /><BulletList items={cat.items} /></Box></Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
      <ReferencesSection topicId="enterprisePlatform" locale={locale} />
  </>);
}

/* ─── Migration Examples ─── */
export function MigrationExamplesContent({ locale }: L) {
  const en = e(locale);
  const examples = en ? [
    { title: "Lift & Shift — File Transfer", desc: "SFTP → File Transfer is migrated 1:1 to Azure. Same flow, same logic, new platform.", biz: ["SFTP Adapter polls remote directory", "PassThruReceive Pipeline", "FILE Adapter writes to network share"], azure: ["Logic App SFTP Connector — Trigger on new file", "No transformation — Pass-Through", "Blob Storage — Write file to container"] },
    { title: "Hybrid / SFTP Mapping", desc: "Parallel operation of BizTalk and Azure with shared SFTP infrastructure and gradual switchover.", biz: ["SFTP Receive Location with Flat File Disassembler", "BizTalk Map (XSLT) for transformation", "Multiple Send Ports (SFTP, REST, SQL, MQ)"], azure: ["Logic App SFTP Connector or Event Grid + Blob Trigger", "Logic App Transform Action or Azure Function (XSLT)", "Logic App Connectors for 400+ target systems"] },
    { title: "Native — Event-Driven Order Processing", desc: "Existing processes are analyzed, optimized and re-developed cloud-natively. Asynchronous, resilient, scalable.", biz: ["Synchronous SOAP/REST Receive — Caller waits", "Monolithic Orchestration for everything", "No Separation of Concerns"], azure: ["APIM → Service Bus Topic (202 Accepted, async)", "Independent Logic Apps per step", "Service Bus for declarative routing"] },
    { title: "copy-in-to-out (DWH)", desc: "File from input folder is copied 1:1 to output folder — without transformation.", biz: ["FILE Adapter monitors input folder", "PassThruReceive Pipeline", "FILE Adapter → output folder"], azure: ["Logic App Blob Trigger on new file in /in", "Pass-Through — no transformation", "Blob Storage → Container /out"] },
    { title: "SQL-to-Storage", desc: "New data in a SQL table automatically triggers a Logic App that transfers the data to Blob Storage.", biz: ["WCF-SQL Adapter — Polling on SQL table", "BizTalk MessageBox → Send Port", "FILE Adapter → Network Share"], azure: ["Logic App SQL Connector — 'When an item is created'", "Optional: Data Operations or Azure Function", "Blob Storage Connector → Container /out"] },
  ] : [
    { title: "Lift & Shift — File Transfer", desc: "SFTP → File Transfer wird 1:1 nach Azure migriert. Gleicher Flow, gleiche Logik, neue Plattform.", biz: ["SFTP Adapter pollt Remote-Verzeichnis", "PassThruReceive Pipeline", "FILE Adapter schreibt in Netzwerk-Verzeichnis"], azure: ["Logic App SFTP Connector — Trigger bei neuer Datei", "Keine Transformation — Pass-Through", "Blob Storage — Datei in Container schreiben"] },
    { title: "Hybrid / SFTP-Mapping", desc: "Parallelbetrieb von BizTalk und Azure mit gemeinsamer SFTP-Infrastruktur und schrittweiser Umstellung.", biz: ["SFTP Receive Location mit Flat File Disassembler", "BizTalk Map (XSLT) für Transformation", "Mehrere Send Ports (SFTP, REST, SQL, MQ)"], azure: ["Logic App SFTP Connector oder Event Grid + Blob Trigger", "Logic App Transform Action oder Azure Function (XSLT)", "Logic App Connectors für 400+ Zielsysteme"] },
    { title: "Native — Event-Driven Order Processing", desc: "Bestehende Prozesse werden analysiert, optimiert und cloud-nativ neu entwickelt. Asynchron, resilient, skalierbar.", biz: ["Synchroner SOAP/REST Receive — Caller wartet", "Monolithische Orchestration für alles", "Kein Separation of Concerns"], azure: ["APIM → Service Bus Topic (202 Accepted, async)", "Eigenständige Logic Apps pro Schritt", "Service Bus für deklaratives Routing"] },
    { title: "copy-in-to-out (DWH)", desc: "Datei aus einem Eingangs-Ordner wird 1:1 in einen Ausgangs-Ordner kopiert — ohne Transformation.", biz: ["FILE Adapter überwacht Eingangs-Ordner", "PassThruReceive Pipeline", "FILE Adapter → Ausgangs-Ordner"], azure: ["Logic App Blob Trigger bei neuer Datei in /in", "Pass-Through — keine Transformation", "Blob Storage → Container /out"] },
    { title: "SQL-to-Storage", desc: "Neue Daten in einer SQL-Tabelle triggern automatisch eine Logic App, die die Daten in Blob Storage überträgt.", biz: ["WCF-SQL Adapter — Polling auf SQL-Tabelle", "BizTalk MessageBox → Send Port", "FILE Adapter → Netzwerk-Share"], azure: ["Logic App SQL Connector — 'When an item is created'", "Optional: Data Operations oder Azure Function", "Blob Storage Connector → Container /out"] },
  ];
  return (<>
    {examples.map((ex, i) => (
      <Section key={i} title={ex.title} color="#F59E0B">
        <Typography variant="body1" paragraph>{ex.desc}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}><Typography variant="overline" fontWeight="bold" color="error.main">BizTalk ({en ? "Current" : "IST"})</Typography><BulletList items={ex.biz} color="#DC2626" /></Grid>
          <Grid item xs={12} md={6}><Typography variant="overline" fontWeight="bold" color="primary">Azure ({en ? "Target" : "SOLL"})</Typography><BulletList items={ex.azure} color="#0078D4" /></Grid>
        </Grid>
      </Section>
    ))}
      <ReferencesSection topicId="examples" locale={locale} />
  </>);
}

/* ─── Cutover Planning ─── */
export function CutoverContent({ locale }: L) {
  const en = e(locale);
  const phases = en ? [
    { title: "Preparation (2-4 weeks before cutover)", color: "#F59E0B", tasks: [{ title: "UAT completed", desc: "Sign-off from business team available" }, { title: "Cutover plan created", desc: "Detailed plan with time windows and responsibilities" }, { title: "External partners informed", desc: "New endpoints communicated" }, { title: "Rollback plan documented and tested", desc: "Step-by-step guide for fallback" }, { title: "Monitoring dashboards configured", desc: "Application Insights, Alert Rules ready" }] },
    { title: "Cutover Execution (maintenance window)", color: "#3B82F6", tasks: [{ title: "Disable BizTalk Receive Locations", desc: "Stop incoming messages" }, { title: "Process remaining messages", desc: "Drain queues" }, { title: "Activate Azure Logic App Workflows", desc: "Switch to new platform" }, { title: "Switch DNS/Routing", desc: "Redirect endpoints to Azure" }, { title: "Monitor first test runs", desc: "Validate results" }] },
    { title: "Observation Phase (1-2 weeks)", color: "#7C3AED", tasks: [{ title: "Daily monitoring", desc: "Check Application Insights" }, { title: "Compare Azure vs. BizTalk data", desc: "Cross-check results" }, { title: "Bug Fixes (Hot Fixes)", desc: "Immediate corrections if needed" }, { title: "Go/No-Go decision", desc: "Final approval" }] },
    { title: "Completion", color: "#10B981", tasks: [{ title: "Permanently disable BizTalk", desc: "Shut down servers, cancel licenses" }, { title: "Update documentation", desc: "Runbooks, architecture diagrams" }, { title: "Document lessons learned", desc: "Insights for next migration" }] },
  ] : [
    { title: "Vorbereitung (2-4 Wochen vor Cutover)", color: "#F59E0B", tasks: [{ title: "UAT abgeschlossen", desc: "Sign-Off durch Fachbereich liegt vor" }, { title: "Cutover-Plan erstellt", desc: "Detaillierter Plan mit Zeitfenstern und Verantwortlichkeiten" }, { title: "Externe Partner informiert", desc: "Neue Endpunkte kommuniziert" }, { title: "Rollback-Plan dokumentiert und getestet", desc: "Schritt-für-Schritt Anleitung für Rückfall" }, { title: "Monitoring-Dashboards konfiguriert", desc: "Application Insights, Alert Rules bereit" }] },
    { title: "Cutover-Durchführung (Maintenance-Fenster)", color: "#3B82F6", tasks: [{ title: "BizTalk Receive Locations deaktivieren", desc: "Eingehende Messages stoppen" }, { title: "Verbleibende Messages abarbeiten", desc: "Queue leeren" }, { title: "Azure Logic App Workflows aktivieren", desc: "Neue Plattform live schalten" }, { title: "DNS/Routing umstellen", desc: "Endpunkte auf Azure umleiten" }, { title: "Erste Testdurchläufe monitoren", desc: "Ergebnisse validieren" }] },
    { title: "Beobachtungsphase (1-2 Wochen)", color: "#7C3AED", tasks: [{ title: "Tägliches Monitoring", desc: "Application Insights prüfen" }, { title: "Vergleich Azure vs. BizTalk-Daten", desc: "Ergebnisse gegenüberstellen" }, { title: "Bug Fixes (Hot Fixes)", desc: "Sofortige Korrekturen bei Problemen" }, { title: "Go/No-Go Entscheidung", desc: "Endgültige Freigabe" }] },
    { title: "Abschluss", color: "#10B981", tasks: [{ title: "BizTalk endgültig deaktivieren", desc: "Server herunterfahren, Lizenzen kündigen" }, { title: "Dokumentation aktualisieren", desc: "Runbooks, Architektur-Diagramme" }, { title: "Lessons Learned dokumentieren", desc: "Erfahrungen für nächste Migration" }] },
  ];
  const opts = en ? [{ title: "Shadow Mode", desc: "Azure runs in parallel, BizTalk stays productive. Direct comparison possible. For critical integrations." }, { title: "Big Bang per App", desc: "BizTalk disabled, Azure takes over immediately. Simpler, faster. For simple file transfers." }, { title: "Gradual Migration", desc: "Switch sub-processes one by one. Lower risk, problems localizable. Recommended." }] : [{ title: "Shadow Mode", desc: "Azure läuft parallel, BizTalk bleibt produktiv. Direkter Vergleich möglich. Für kritische Integrationen." }, { title: "Big Bang pro App", desc: "BizTalk deaktiviert, Azure übernimmt sofort. Einfacher, schneller. Für einfache File-Transfers." }, { title: "Schrittweise Migration", desc: "Teilprozesse nacheinander umstellen. Geringeres Risiko, Probleme lokalisierbar. Empfohlen." }];
  return (<>
    {phases.map((p, i) => (<Section key={i} title={p.title} color={p.color}><TaskList tasks={p.tasks} color={p.color} /></Section>))}
    <Section title={en ? "Parallel Operations Options" : "Parallelbetrieb-Optionen"}>
      <Grid container spacing={2}>{opts.map((o, i) => (<Grid item xs={12} md={4} key={i}><Card variant="outlined" sx={{ height: '100%' }}><CardContent><Typography variant="subtitle2" fontWeight="bold">{o.title}</Typography><Typography variant="body2" color="text.secondary">{o.desc}</Typography></CardContent></Card></Grid>))}</Grid>
    </Section>
      <ReferencesSection topicId="cutover" locale={locale} />
  </>);
}

/* ─── Development Process ─── */
export function DevProcessContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title="Naming Convention">
      <Typography variant="body1" paragraph>Pattern: {'{type}-{workload}-{environment}-{region}'}</Typography>
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Example" : "Beispiel"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Description" : "Beschreibung"}</TableCell></TableRow></TableHead><TableBody>
        {[["rg-integration-dev-weu", "Resource Group"], ["logic-sftp-transfer-prod-weu", "Logic App SFTP"], ["func-csv-parser-test-weu", "Azure Function CSV"], ["sb-integration-prod-weu", "Service Bus"], ["apim-integration-prod-weu", "API Management"], ["kv-integration-prod-weu", "Key Vault"]].map(([n, d], i) => (<TableRow key={i}><TableCell><code>{n}</code></TableCell><TableCell>{d}</TableCell></TableRow>))}
      </TableBody></Table></TableContainer>
    </Section>
    <Section title="Non-Functional Requirements (NFRs)">
      <Grid container spacing={2}>
        {(en ? [{ t: "Infrastructure as Code", items: ["Bicep Templates for all Azure resources", "Parameter files per environment", "What-If Deployment before actual deploy"] }, { t: "Security Standards", items: ["Managed Identities (no passwords)", "Private Endpoints for all services", "RBAC — Least Privilege principle", "TLS 1.2 minimum"] }, { t: "Error Handling & Retry", items: ["Exponential Backoff (4 retries)", "Dead-Letter Queue for failed messages", "Structured error logging with Correlation ID"] }, { t: "Logging & Monitoring", items: ["Application Insights for all Logic Apps/Functions", "Structured Logging (JSON)", "Correlation ID across all services", "Log Retention: 90 days online, 1 year archive"] }, { t: "CI/CD Standards", items: ["Git as Single Source of Truth", "Branch Protection: PR + Code Review", "Deployment Slots for Zero-Downtime", "Release notes auto-generated"] }] : [{ t: "Infrastructure as Code", items: ["Bicep Templates für alle Azure-Ressourcen", "Parameter-Files pro Umgebung", "What-If Deployment vor echtem Deploy"] }, { t: "Security Standards", items: ["Managed Identities (keine Passwörter)", "Private Endpoints für alle Services", "RBAC — Least Privilege Prinzip", "TLS 1.2 Minimum"] }, { t: "Error Handling & Retry", items: ["Exponential Backoff (4 Retries)", "Dead-Letter Queue für fehlgeschlagene Messages", "Strukturiertes Error Logging mit Correlation ID"] }, { t: "Logging & Monitoring", items: ["Application Insights für alle Logic Apps/Functions", "Structured Logging (JSON)", "Correlation ID über alle Services", "Log Retention: 90 Tage online, 1 Jahr Archiv"] }, { t: "CI/CD Standards", items: ["Git als Single Source of Truth", "Branch Protection: PR + Code Review", "Deployment Slots für Zero-Downtime", "Release Notes automatisch generiert"] }]).map((nfr, i) => (
          <Grid item xs={12} md={6} key={i}><Card variant="outlined" sx={{ height: '100%' }}><CardContent><Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>{nfr.t}</Typography><BulletList items={nfr.items} /></CardContent></Card></Grid>))}
      </Grid>
    </Section>
      <ReferencesSection topicId="devProcess" locale={locale} />
  </>);
}

/* ─── Git Branching ─── */
export function GitBranchingContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title={en ? "Branch Model (Git Flow)" : "Branch-Modell (Git Flow)"}>
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>Branch</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Description" : "Beschreibung"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Protected</TableCell></TableRow></TableHead><TableBody>
        {(en ? [["main", "Production branch — always deployable", "Yes"], ["release/*", "Release branch for Staging/UAT", "Yes"], ["develop", "Integration branch for active development", "Yes"], ["feature/*", "Feature branches for individual tasks", "No"], ["hotfix/*", "Emergency fixes directly from main", "No"]] : [["main", "Produktionsbranch — immer deploybar", "Ja"], ["release/*", "Release-Branch für Staging/UAT", "Ja"], ["develop", "Integrationsbranch für aktive Entwicklung", "Ja"], ["feature/*", "Feature-Branches für einzelne Aufgaben", "Nein"], ["hotfix/*", "Notfall-Fixes direkt aus main", "Nein"]]).map(([b, d, p], i) => (<TableRow key={i}><TableCell><code>{b}</code></TableCell><TableCell>{d}</TableCell><TableCell>{p}</TableCell></TableRow>))}
      </TableBody></Table></TableContainer>
    </Section>
    <Section title="Staging Environments">
      <Grid container spacing={2}>
        {(en ? [{ name: "DEV", branch: "develop", trigger: "Auto on push", color: "#F59E0B", details: ["Shared environment for all developers", "Test data, Application Insights debug-level"] }, { name: "Staging/UAT", branch: "release/*", trigger: "Auto on push", color: "#7C3AED", details: ["Mirrors production 1:1", "Performance tests, Approval Gate before Prod"] }, { name: "PROD", branch: "main", trigger: "Manual approval", color: "#10B981", details: ["Blue/Green Deployment or Slot Swap", "Rollback via previous slot", "Audit log for all deployments"] }] : [{ name: "DEV", branch: "develop", trigger: "Auto bei Push", color: "#F59E0B", details: ["Shared Environment für alle Entwickler", "Testdaten, Application Insights Debug-Level"] }, { name: "Staging/UAT", branch: "release/*", trigger: "Auto bei Push", color: "#7C3AED", details: ["Spiegelt Produktion 1:1", "Performance-Tests, Approval Gate vor Prod"] }, { name: "PROD", branch: "main", trigger: "Manuelles Approval", color: "#10B981", details: ["Blue/Green Deployment oder Slot Swap", "Rollback über vorherigen Slot", "Audit Log für alle Deployments"] }]).map((env, i) => (
          <Grid item xs={12} md={4} key={i}><Card variant="outlined" sx={{ borderTop: `3px solid ${env.color}`, height: '100%' }}><CardContent><Typography variant="h6" fontWeight="bold" sx={{ color: env.color }}>{env.name}</Typography><Typography variant="body2" color="text.secondary" gutterBottom>Branch: <code>{env.branch}</code> — {env.trigger}</Typography><BulletList items={env.details} color={env.color} /></CardContent></Card></Grid>))}
      </Grid>
    </Section>
    <Section title="Conventional Commits & Semantic Versioning">
      <Typography variant="body1" paragraph>MAJOR.MINOR.PATCH (e.g. 1.3.2) — MAJOR = Breaking Changes, MINOR = {en ? "New Features" : "Neue Features"}, PATCH = Bugfixes</Typography>
      <BulletList items={[`feat(scope): ${en ? "description" : "beschreibung"} — ${en ? "New Feature" : "Neues Feature"} → MINOR`, `fix(scope): ${en ? "description" : "beschreibung"} — Bugfix → PATCH`, `refactor(scope): ${en ? "description" : "beschreibung"} — ${en ? "Code restructure" : "Code-Umbau"}`, `docs(scope): ${en ? "description" : "beschreibung"} — ${en ? "Documentation" : "Dokumentation"}`]} />
    </Section>
      <ReferencesSection topicId="gitBranching" locale={locale} />
  </>);
}

/* ─── CI/CD Azure ─── */
export function CiCdAzureContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title="Service Deployments">
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Method" : "Methode"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Artifact</TableCell></TableRow></TableHead><TableBody>
        {[["Logic Apps Standard", "ZIP Deploy / Run-from-Package", "Workflow JSON + connections.json"], ["Azure Functions", "ZIP Deploy / Run-from-Package", "Compiled DLL + host.json"], ["API Management", "ARM/Bicep + API Import", "OpenAPI Spec + Policy XML"], ["Service Bus", "Bicep / ARM Template", en ? "Queue/Topic definitions as IaC" : "Queue/Topic Definitionen als IaC"], ["Key Vault", "Bicep + Secret Rotation", "Vault Config + Access Policies"]].map(([s, m, a], i) => (<TableRow key={i}><TableCell sx={{ fontWeight: 500 }}>{s}</TableCell><TableCell>{m}</TableCell><TableCell>{a}</TableCell></TableRow>))}
      </TableBody></Table></TableContainer>
    </Section>
    <Section title={en ? "Deployment Concepts" : "Deployment-Konzepte"}>
      <Grid container spacing={2}>
        {(en ? [{ t: "ZIP Deploy", p: ["Simple implementation", "Fast deployment"], c: ["App restart required"] }, { t: "Run-from-Package", p: ["Atomic deployment", "Faster cold start"], c: ["External storage needed"] }, { t: "Slot Swap (Blue-Green)", p: ["Zero Downtime", "Instant rollback", "Warm-up before go-live"], c: ["Additional cost for slot"] }, { t: "Infrastructure as Code (Bicep)", p: ["Versioned & reproducible", "Idempotent deployments"], c: ["Initial learning curve"] }] : [{ t: "ZIP Deploy", p: ["Einfache Implementierung", "Schnelles Deployment"], c: ["App-Neustart erforderlich"] }, { t: "Run-from-Package", p: ["Atomare Bereitstellung", "Schnellerer Cold Start"], c: ["Externer Storage notwendig"] }, { t: "Slot Swap (Blue-Green)", p: ["Zero Downtime", "Sofortiger Rollback", "Warm-up vor Go-Live"], c: ["Zusätzliche Kosten für Slot"] }, { t: "Infrastructure as Code (Bicep)", p: ["Versioniert & reproduzierbar", "Idempotente Deployments"], c: ["Initiale Lernkurve"] }]).map((d, i) => (
          <Grid item xs={12} sm={6} key={i}><Card variant="outlined" sx={{ height: '100%' }}><CardContent><Typography variant="subtitle2" fontWeight="bold" gutterBottom>{d.t}</Typography><Typography variant="caption" color="success.main" fontWeight="bold">{en ? "Advantages" : "Vorteile"}</Typography><BulletList items={d.p} color="#10B981" /><Box sx={{ mt: 1 }}><Typography variant="caption" color="error.main" fontWeight="bold">{en ? "Disadvantages" : "Nachteile"}</Typography><BulletList items={d.c} color="#DC2626" /></Box></CardContent></Card></Grid>))}
      </Grid>
    </Section>
      <ReferencesSection topicId="cicdAzure" locale={locale} />
  </>);
}

/* ─── CI/CD DevOps ─── */
export function CiCdDevOpsContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title="GitHub Actions vs. Azure DevOps">
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Aspect" : "Aspekt"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>GitHub Actions</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Azure DevOps</TableCell></TableRow></TableHead><TableBody>
        {[["Pipeline", "YAML (.github/workflows/)", en ? "YAML or Classic UI" : "YAML oder Classic UI"], ["Hosting", "GitHub.com (SaaS)", "Azure DevOps Services (SaaS)"], [en ? "Reusability" : "Wiederverwendung", "Reusable Workflows + Composite Actions", "Pipeline Templates + Task Groups"], ["Work Items", "GitHub Issues + Projects (Basic)", "Azure Boards (Enterprise)"], ["Security", "CodeQL, Dependabot, Secret Scanning", "WhiteSource Bolt, SonarQube"], ["AI Features", "GitHub Copilot, Copilot for PRs", en ? "Limited" : "Limitiert"], ["Free Tier", "2,000 min/mo", "1 Parallel Job, 1,800 min/mo"]].map(([a, g, d], i) => (<TableRow key={i}><TableCell sx={{ fontWeight: 500 }}>{a}</TableCell><TableCell>{g}</TableCell><TableCell>{d}</TableCell></TableRow>))}
      </TableBody></Table></TableContainer>
    </Section>
    <Section title={en ? "Pipeline Anatomy (7 Phases)" : "Pipeline-Anatomie (7 Phasen)"}>
      <TaskList tasks={[{ title: "Trigger", desc: "Push, PR, Schedule, Manual" }, { title: "Build & Compile", desc: "dotnet restore, dotnet build" }, { title: "Test & Analyse", desc: en ? "Unit Tests, Code Coverage, Static Analysis, Security Scan" : "Unit Tests, Code Coverage, Static Analysis, Security Scan" }, { title: "Package & Publish", desc: en ? "ZIP artifact, upload, versioning" : "ZIP-Artifact, Upload, Versionierung" }, { title: "Deploy DEV", desc: en ? "Automatic, Smoke Test" : "Automatisch, Smoke Test" }, { title: "Deploy Staging", desc: en ? "Integration Tests, UAT, Approval Gate" : "Integration Tests, UAT, Approval Gate" }, { title: "Deploy Production", desc: en ? "Approval, Slot Swap, Health Check, Monitoring" : "Approval, Slot Swap, Health Check, Monitoring" }]} />
    </Section>
    <Section title="CI/CD Best Practices">
      <BulletList items={en ? ["Never store secrets in code — GitHub Secrets or Variable Groups", "Identical pipelines — DEV, Staging, Prod use the SAME pipeline", "Automatic tests — Unit on push, Integration on PR, E2E on release", "Immutable Artifacts — One build, promoted through environments", "Infrastructure as Code — All Azure resources as Bicep", "Monitor after deploy — Health checks, automatic rollback"] : ["Secrets nie im Code — GitHub Secrets oder Variable Groups", "Identische Pipelines — DEV, Staging, Prod nutzen GLEICHE Pipeline", "Automatische Tests — Unit bei Push, Integration bei PR, E2E bei Release", "Immutable Artifacts — Ein Build, promoted durch Environments", "Infrastructure as Code — Alle Azure-Ressourcen als Bicep", "Monitoring nach Deploy — Health Checks, automatischer Rollback"]} />
    </Section>
      <ReferencesSection topicId="cicdDevOps" locale={locale} />
  </>);
}

/* ─── Testing ─── */
export function TestingContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title={en ? "Testing Pyramid" : "Testpyramide"}>
      <Grid container spacing={2}>
        {(en ? [{ level: "Unit Tests (~70%)", color: "#10B981", tools: "xUnit, Moq, FluentAssertions", desc: "Test individual workflow steps and Functions in isolation, >80% code coverage" }, { level: "Integration Tests (~20%)", color: "#3B82F6", tools: "Logic App Testing Framework, Postman/Newman", desc: "End-to-end tests against test systems, all critical paths" }, { level: "E2E / UAT (~10%)", color: "#7C3AED", tools: "Manual test cases, test datasets", desc: "Business acceptance, compare old vs. new, before go-live" }] : [{ level: "Unit Tests (~70%)", color: "#10B981", tools: "xUnit, Moq, FluentAssertions", desc: "Einzelne Workflow-Schritte und Functions isoliert testen, >80% Code Coverage" }, { level: "Integrationstests (~20%)", color: "#3B82F6", tools: "Logic App Testing Framework, Postman/Newman", desc: "End-to-End Tests gegen Test-Systeme, alle kritischen Pfade" }, { level: "E2E / UAT (~10%)", color: "#7C3AED", tools: "Manuelle Testfälle, Test-Datensets", desc: "Fachliche Abnahme, Vergleich Alt vs. Neu, vor Go-Live" }]).map((t, i) => (
          <Grid item xs={12} md={4} key={i}><Card variant="outlined" sx={{ borderTop: `3px solid ${t.color}`, height: '100%' }}><CardContent><Typography variant="subtitle1" fontWeight="bold" sx={{ color: t.color }}>{t.level}</Typography><Typography variant="caption" color="text.secondary">{t.tools}</Typography><Typography variant="body2" sx={{ mt: 1 }}>{t.desc}</Typography></CardContent></Card></Grid>))}
      </Grid>
    </Section>
    <Section title={en ? "QA Process (5 Phases)" : "QA-Prozess (5 Phasen)"}>
      <TaskList tasks={en ? [{ title: "Test Planning", desc: "Define test cases, test datasets, expected results" }, { title: "Developer Tests", desc: "Write unit tests, check code coverage, local integration tests" }, { title: "QA Tests", desc: "Deploy to QA, run integration tests, bug reports" }, { title: "UAT / Acceptance", desc: "Business acceptance, compare old vs. new, sign-off" }, { title: "Production Test", desc: "Smoke tests, check monitoring, Go/No-Go decision" }] : [{ title: "Testplanung", desc: "Testfälle definieren, Test-Datensets, erwartete Ergebnisse" }, { title: "Entwicklertests", desc: "Unit Tests schreiben, Code Coverage prüfen, lokale Integration Tests" }, { title: "QA-Tests", desc: "Deployment in QA, Integrationstests ausführen, Bug Reports" }, { title: "UAT/Abnahme", desc: "Fachliche Abnahme, Vergleich Alt vs. Neu, Sign-Off" }, { title: "Produktionstest", desc: "Smoke Tests, Monitoring prüfen, Go/No-Go Entscheidung" }]} color="#8B5CF6" />
    </Section>
      <ReferencesSection topicId="testing" locale={locale} />
  </>);
}

/* ─── Monitoring ─── */
export function MonitoringContent({ locale }: L) {
  const en = e(locale);
  const [expanded, setExpanded] = useState<string | null>(null);
  const monitorTools = en ? [
    { id: "ai", name: "Application Insights", desc: "APM: Real-time monitoring of Logic Apps, Functions and APIs. Performance anomalies, transaction tracing, dependency mapping.", details: ["Live Metrics — Real-time monitoring of requests, errors and performance", "Application Map — Visualization of all dependencies", "Transaction Search — End-to-end tracing across Logic Apps, Functions, Service Bus", "Failure Analysis — Automatic detection and grouping of errors", "Smart Detection — AI-based anomaly detection", "Availability Tests — External availability checks"] },
    { id: "la", name: "Log Analytics", desc: "Central log store with KQL. Logs from all Azure resources, deep analysis and long-term retention.", details: ["KQL (Kusto Query Language) — Powerful query language", "Workspace — Central store for all logs", "Diagnostic Settings — Collect logs from all AIS resources", "Log Retention — Configurable from 30 days to 2 years", "Cross-Resource Queries — Across multiple workspaces"] },
    { id: "wb", name: "Azure Workbooks", desc: "Interactive dashboards and reports. KQL queries with visualizations. Ideal for team overviews.", details: ["KQL-based visualizations (Charts, Tables, Heatmaps)", "Drill-down capabilities", "Reusable templates", "Embeddable in Azure Portal Dashboards"] },
    { id: "ag", name: "Alerts & Action Groups", desc: "Automatic notifications at thresholds. Escalation: Email, Teams, SMS, PagerDuty.", details: ["Metric Alerts — Thresholds on Azure metrics", "Log Alerts — KQL-based rules", "Activity Log Alerts — Changes to resources", "Action Groups — Email, SMS, Teams, Logic App Webhook, PagerDuty"] },
  ] : [
    { id: "ai", name: "Application Insights", desc: "APM: Echtzeit-Überwachung von Logic Apps, Functions und APIs. Performance-Anomalien, Transaction Tracing, Dependency Mapping.", details: ["Live Metrics — Echtzeit-Überwachung von Requests, Fehlern und Performance", "Application Map — Visualisierung aller Abhängigkeiten", "Transaction Search — End-to-End Tracing über Logic Apps, Functions, Service Bus", "Failure Analysis — Automatische Erkennung und Gruppierung von Fehlern", "Smart Detection — KI-basierte Anomalie-Erkennung", "Availability Tests — Externe Verfügbarkeitsprüfungen"] },
    { id: "la", name: "Log Analytics", desc: "Zentraler Log-Speicher mit KQL. Logs von allen Azure-Ressourcen, tiefgehende Analyse und langfristige Aufbewahrung.", details: ["KQL (Kusto Query Language) — Mächtige Abfragesprache", "Workspace — Zentraler Speicher für alle Logs", "Diagnostic Settings — Logs von allen AIS-Ressourcen sammeln", "Log Retention — 30 Tage bis 2 Jahre konfigurierbar", "Cross-Resource Queries — Über mehrere Workspaces hinweg"] },
    { id: "wb", name: "Azure Workbooks", desc: "Interaktive Dashboards und Reports. KQL-Abfragen mit Visualisierungen. Ideal für Team-Übersichten.", details: ["KQL-basierte Visualisierungen (Charts, Tables, Heatmaps)", "Drill-Down Möglichkeiten", "Wiederverwendbare Templates", "Einbettbar in Azure Portal Dashboards"] },
    { id: "ag", name: "Alerts & Action Groups", desc: "Automatische Benachrichtigungen bei Schwellwerten. Eskalation: E-Mail, Teams, SMS, PagerDuty.", details: ["Metric Alerts — Schwellwerte auf Azure-Metriken", "Log Alerts — KQL-basierte Regeln", "Activity Log Alerts — Änderungen an Ressourcen", "Action Groups — E-Mail, SMS, Teams, Logic App Webhook, PagerDuty"] },
  ];
  return (<>
    <Section title={en ? "Azure Monitor Ecosystem" : "Azure Monitor Ökosystem"}>
      <Grid container spacing={2}>
        {monitorTools.map((s) => (
          <Grid item xs={12} sm={6} key={s.id}>
            <Card variant="outlined" sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.15s', borderColor: expanded === s.id ? 'primary.main' : undefined, '&:hover': { borderColor: 'primary.main', boxShadow: 1 } }}>
              <CardActionArea onClick={() => setExpanded(expanded === s.id ? null : s.id)} sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="primary">{s.name}</Typography>
                <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
                <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>{expanded === s.id ? (en ? '▲ Less' : '▲ Weniger') : (en ? '▼ Show details' : '▼ Details anzeigen')}</Typography>
              </CardActionArea>
              <Collapse in={expanded === s.id}><Box sx={{ px: 2, pb: 2 }}><Divider sx={{ mb: 1 }} /><BulletList items={s.details} color="#0078D4" /></Box></Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
    <Section title={en ? "Recommended Alert Rules" : "Empfohlene Alert Rules"}>
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Metric" : "Metrik"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Threshold" : "Schwellwert"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Action" : "Aktion"}</TableCell></TableRow></TableHead><TableBody>
        {[["Logic Apps", "Workflow Runs Failed", "> 0", en ? "Email + Teams" : "E-Mail + Teams"], ["Logic Apps", "Run Latency", "> 30s", "Warning → Team Lead"], ["Functions", "Function Errors", "> 5%", en ? "Email + PagerDuty" : "E-Mail + PagerDuty"], ["Functions", "Cold Starts", "> 10/h", "Premium Plan Evaluation"], ["Service Bus", "Dead Letter Messages", "> 0", en ? "Immediate notification" : "Sofort-Benachrichtigung"], ["Service Bus", "Active Messages", "> 1000", "Consumer Scale-Out"]].map(([s, m, t, a], i) => (<TableRow key={i}><TableCell>{s}</TableCell><TableCell>{m}</TableCell><TableCell><code>{t}</code></TableCell><TableCell>{a}</TableCell></TableRow>))}
      </TableBody></Table></TableContainer>
    </Section>
    <Section title="Distributed Tracing">
      <Typography variant="body1" paragraph>{en ? "End-to-end tracking across all services: APIM → Logic App → Function → Service Bus. Based on W3C Trace Context standard." : "End-to-End Nachverfolgung über alle Services: APIM → Logic App → Function → Service Bus. Basierend auf W3C Trace Context Standard."}</Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
        {`APIM (${en ? 'Entry' : 'Eingang'}, 2ms)\n └─ Logic App: process-order (Start)\n    ├─ HTTP: Validate Customer (120ms)\n    ├─ Azure Function: Transform (340ms)\n    │   └─ SQL: Insert Record (45ms)\n    ├─ Service Bus: Send to queue (12ms)\n    └─ SFTP: Upload Result (890ms)\n${en ? 'Total' : 'Gesamt'}: 1.409ms`}
      </Paper>
    </Section>
      <ReferencesSection topicId="monitoring" locale={locale} />
  </>);
}

/* ─── Exception Handling ─── */
export function ExceptionHandlingContent({ locale }: L) {
  const en = e(locale);
  const [expanded, setExpanded] = useState<number | null>(null);
  const strategies = en ? [
    { t: "Retry Strategies", desc: "Exponential Backoff (4 Retries: 15s → 30s → 60s → 120s), Fixed Interval, None", color: "#3B82F6", details: ["Exponential Backoff — Wait time doubles (15s, 30s, 60s, 120s)", "Fixed Interval — Constant wait time between retries", "None — No retry, immediate failure", "Configurable per Action in Logic Apps"] },
    { t: "Scope-based Error Handling", desc: "Try/Catch/Finally pattern in Logic Apps: Try-Scope for main logic, Catch-Scope for error handling", color: "#7C3AED", details: ["Try-Scope — Main workflow logic", "Catch-Scope — Run After: Failed/TimedOut/Skipped", "Finally-Scope — Cleanup, logging (always runs)", "Nestable for granular error handling"] },
    { t: "Dead-Letter Queue", desc: "Service Bus DLQ for undeliverable messages. Automatic DLQ at Max Delivery Count, DLQ reprocessing", color: "#DC2626", details: ["Automatic DLQ when Max Delivery Count exceeded", "Explicit DLQ — Workflow deliberately sends to DLQ", "DLQ Monitoring — Alert when DLQ Count > 0", "DLQ Reprocessing — Logic App reads DLQ and reprocesses"] },
    { t: "Compensation Logic (Saga)", desc: "On failure in multi-step: Undo already executed steps. Idempotent design.", color: "#F59E0B", details: ["Saga Pattern — Each step has a compensation action", "Idempotent Design — Multiple executions yield same result", "State Tracking — Current status persisted in Storage/DB", "Timeout Handling — Maximum runtime per workflow"] },
  ] : [
    { t: "Retry-Strategien", desc: "Exponential Backoff (4 Retries: 15s → 30s → 60s → 120s), Fixed Interval, None", color: "#3B82F6", details: ["Exponential Backoff — Wartezeit verdoppelt sich (15s, 30s, 60s, 120s)", "Fixed Interval — Konstante Wartezeit zwischen Retries", "None — Kein Retry, sofortiger Fehler", "Konfigurierbar pro Action in Logic Apps"] },
    { t: "Scope-basiertes Error Handling", desc: "Try/Catch/Finally Pattern in Logic Apps: Try-Scope für Hauptlogik, Catch-Scope für Fehlerbehandlung", color: "#7C3AED", details: ["Try-Scope — Hauptlogik des Workflows", "Catch-Scope — Run After: Failed/TimedOut/Skipped", "Finally-Scope — Cleanup, Logging (läuft immer)", "Verschachtelbar für granulare Fehlerbehandlung"] },
    { t: "Dead-Letter Queue", desc: "Service Bus DLQ für nicht zustellbare Messages. Automatische DLQ bei Max Delivery Count, DLQ-Reprocessing", color: "#DC2626", details: ["Automatische DLQ bei Max Delivery Count überschritten", "Explizite DLQ — Workflow sendet bewusst an DLQ", "DLQ-Monitoring — Alert bei DLQ Count > 0", "DLQ-Reprocessing — Logic App liest DLQ und verarbeitet erneut"] },
    { t: "Compensation Logic (Saga)", desc: "Bei Fehler in Multi-Step: Bereits ausgeführte Schritte rückgängig machen. Idempotent Design.", color: "#F59E0B", details: ["Saga Pattern — Jeder Schritt hat eine Compensation-Action", "Idempotent Design — Mehrfachausführung liefert gleiches Ergebnis", "State Tracking — Aktueller Status in Storage/DB persistiert", "Timeout-Handling — Maximale Laufzeit pro Workflow definieren"] },
  ];
  const cats = en ? [["Connectivity", "Retry + Alert after 3 failures"], ["Validation", "DLQ + Notification to business team"], ["Transformation", "DLQ + Alert to development"], ["Authentication", "Alert Critical + Immediate escalation"], ["Throttling", "Exponential Backoff + Capacity review"], ["Business Rule", "DLQ + Notification to business team"]] : [["Connectivity", "Retry + Alert nach 3 Fehlversuchen"], ["Validation", "DLQ + Notification an Fachbereich"], ["Transformation", "DLQ + Alert an Entwicklung"], ["Authentication", "Alert Critical + Sofort-Eskalation"], ["Throttling", "Exponential Backoff + Kapazitäts-Review"], ["Business Rule", "DLQ + Notification an Fachbereich"]];
  return (<>
    <Section title={en ? "Strategies" : "Strategien"}>
      <Grid container spacing={2}>
        {strategies.map((s, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card variant="outlined" sx={{ borderTop: `3px solid ${s.color}`, height: '100%', cursor: 'pointer', transition: 'all 0.15s', '&:hover': { boxShadow: 1 } }}>
              <CardActionArea onClick={() => setExpanded(expanded === i ? null : i)} sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold">{s.t}</Typography>
                <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
              </CardActionArea>
              <Collapse in={expanded === i}><Box sx={{ px: 2, pb: 2 }}><Divider sx={{ mb: 1 }} /><BulletList items={s.details} color={s.color} /></Box></Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
    <Section title={en ? "Error Categories" : "Fehler-Kategorien"}>
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Category" : "Kategorie"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Handling" : "Behandlung"}</TableCell></TableRow></TableHead><TableBody>
        {cats.map(([c, b], i) => (<TableRow key={i}><TableCell sx={{ fontWeight: 500 }}>{c}</TableCell><TableCell>{b}</TableCell></TableRow>))}
      </TableBody></Table></TableContainer>
    </Section>
      <ReferencesSection topicId="exceptionHandling" locale={locale} />
  </>);
}

/* ─── Security ─── */
export function SecurityContent({ locale }: L) {
  const en = e(locale);
  const [expanded, setExpanded] = useState<number | null>(null);
  const domains = en ? [
    { name: "Identity & Access Management", services: "Microsoft Entra ID, Managed Identities, Entra Permissions Management", relevance: "APIM OAuth2, Logic Apps/Functions Managed Identity", details: ["Managed Identities eliminate passwords between services", "App Registrations for API consumers", "Conditional Access Policies for access control", "PIM for Just-in-Time admin access"] },
    { name: "Threat Protection", services: "Microsoft Defender for Cloud, Defender for APIs, Microsoft Sentinel", relevance: "APIM protection, Logic Apps/Functions monitoring", details: ["Defender for APIs detects anomalous API usage", "Sentinel aggregates security events", "Automated Incident Response via SOAR"] },
    { name: "Cloud Security", services: "VNET Integration, Private Link/Endpoints, NSG/Azure Firewall, DDoS Protection", relevance: "APIM with Private Endpoint, Logic Apps in VNET", details: ["Private Endpoints for all AIS components", "NSG rules for granular network control", "DDoS Protection for public endpoints"] },
    { name: "Information Protection", services: "Microsoft Purview, Azure Key Vault, Encryption at Rest & in Transit", relevance: "Key Vault for secrets, TLS between services", details: ["TLS 1.2 minimum for all connections", "Key Vault for central secret management", "Encryption at Rest for storage and databases"] },
    { name: "Discover & Respond", services: "Microsoft Sentinel (SIEM), Automated Response (SOAR), Log Analytics", relevance: "APIM Logs → Sentinel, Logic App Run History → Log Analytics", details: ["Central SIEM for all security events", "KQL queries for threat hunting", "Automated playbooks for incident response"] },
    { name: "Compliance Management", services: "Purview Compliance Manager, Azure Policy, Audit Logs", relevance: "Azure Policy for secure AIS configuration", details: ["Azure Policy guardrails enforce standards", "Regulatory Compliance Dashboard", "Activity Logs for audit trail"] },
    { name: "Insider Risk Management", services: "PIM (Privileged Identity Management), Entra ID Access Reviews", relevance: "PIM for admin access, Access Reviews for Service Principals", details: ["Just-in-Time access instead of permanent admin rights", "Regular Access Reviews for Service Principals", "Time-limited permissions with justification"] },
    { name: "Information Governance", services: "Data Lifecycle, Data Map/Catalog, Resource Locks, Backup & DR", relevance: "Retention Policies, Blob Lifecycle Management", details: ["Resource Locks prevent accidental deletion", "Blob Lifecycle Policies for automatic archiving", "Geo-DR for Service Bus and Storage"] },
  ] : [
    { name: "Identity & Access Management", services: "Microsoft Entra ID, Managed Identities, Entra Permissions Management", relevance: "APIM OAuth2, Logic Apps/Functions Managed Identity", details: ["Managed Identities eliminieren Passwörter zwischen Services", "App Registrations für API-Consumer", "Conditional Access Policies für Zugriffskontrolle", "PIM für Just-in-Time Admin-Zugriff"] },
    { name: "Threat Protection", services: "Microsoft Defender for Cloud, Defender for APIs, Microsoft Sentinel", relevance: "APIM Schutz, Logic Apps/Functions Monitoring", details: ["Defender for APIs erkennt anomale API-Nutzung", "Sentinel aggregiert Sicherheits-Events", "Automatisierte Incident Response über SOAR"] },
    { name: "Cloud Security", services: "VNET Integration, Private Link/Endpoints, NSG/Azure Firewall, DDoS Protection", relevance: "APIM mit Private Endpoint, Logic Apps in VNET", details: ["Private Endpoints für alle AIS-Komponenten", "NSG-Regeln für granulare Netzwerksteuerung", "DDoS Protection für öffentliche Endpunkte"] },
    { name: "Information Protection", services: "Microsoft Purview, Azure Key Vault, Encryption at Rest & in Transit", relevance: "Key Vault für Secrets, TLS zwischen Services", details: ["TLS 1.2 Minimum für alle Verbindungen", "Key Vault für zentrale Secret-Verwaltung", "Encryption at Rest für Storage und Datenbanken"] },
    { name: "Discover & Respond", services: "Microsoft Sentinel (SIEM), Automated Response (SOAR), Log Analytics", relevance: "APIM Logs → Sentinel, Logic App Run History → Log Analytics", details: ["Zentrales SIEM für alle Sicherheits-Events", "KQL-Abfragen für Threat Hunting", "Automatisierte Playbooks für Incident Response"] },
    { name: "Compliance Management", services: "Purview Compliance Manager, Azure Policy, Audit Logs", relevance: "Azure Policy für sichere AIS-Konfiguration", details: ["Azure Policy Guardrails erzwingen Standards", "Regulatory Compliance Dashboard", "Activity Logs für Audit-Trail"] },
    { name: "Insider Risk Management", services: "PIM (Privileged Identity Management), Entra ID Access Reviews", relevance: "PIM für Admin-Zugriff, Access Reviews für Service Principal", details: ["Just-in-Time Zugriff statt permanenter Admin-Rechte", "Regelmäßige Access Reviews für Service Principals", "Zeitlich begrenzte Berechtigungen mit Begründung"] },
    { name: "Information Governance", services: "Data Lifecycle, Data Map/Catalog, Resource Locks, Backup & DR", relevance: "Retention Policies, Blob Lifecycle Management", details: ["Resource Locks verhindern versehentliches Löschen", "Blob Lifecycle Policies für automatische Archivierung", "Geo-DR für Service Bus und Storage"] },
  ];
  return (<>
    <Section title={en ? "8 Security Domains" : "8 Security-Domänen"}>
      <Typography variant="body1" paragraph>Zero Trust Architecture: Verify explicitly, Least privilege, Assume breach.</Typography>
      <Grid container spacing={2}>
        {domains.map((d, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card variant="outlined" sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.15s', borderColor: expanded === i ? 'primary.main' : undefined, '&:hover': { borderColor: 'primary.main', boxShadow: 1 } }}>
              <CardActionArea onClick={() => setExpanded(expanded === i ? null : i)} sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold">{d.name}</Typography>
                <Typography variant="caption" color="text.secondary" display="block">{d.services}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="primary">AIS: {d.relevance}</Typography>
              </CardActionArea>
              <Collapse in={expanded === i}><Box sx={{ px: 2, pb: 2 }}><Divider sx={{ mb: 1 }} /><BulletList items={d.details} color="#0078D4" /></Box></Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
    <Section title="DORA Compliance">
      <Typography variant="body1">{en ? "Digital Operational Resilience Act — mandatory since January 2025 for financial companies. Azure Integration Services supports DORA through: Private Endpoints, Managed Identities, Audit Logging, Geo-DR, Azure Policy Guardrails and PIM for admin access." : "Digital Operational Resilience Act — seit Januar 2025 verbindlich für Finanzunternehmen. Azure Integration Services unterstützt DORA durch: Private Endpoints, Managed Identities, Audit Logging, Geo-DR, Azure Policy Guardrails und PIM für Admin-Zugriff."}</Typography>
    </Section>
      <ReferencesSection topicId="security" locale={locale} />
  </>);
}

/* ─── Pricing ─── */
export function PricingContent({ mode, locale }: { mode: 'prod' | 'devtest' } & L) {
  const en = e(locale);
  const isProd = mode === 'prod';
  return (<>
    <Section title={isProd ? (en ? "Azure Integration Services — Production Costs" : "Azure Integration Services — Produktionskosten") : (en ? "Azure Integration Services — Dev/Test Costs" : "Azure Integration Services — Dev/Test Kosten")} color="#F5A623">
      <Typography variant="body1" paragraph>{isProd ? (en ? "Estimated monthly costs for production operation of all integrations." : "Geschätzte monatliche Kosten für den Produktionsbetrieb aller Integrationen.") : (en ? "Estimated monthly costs for development and test (40-70% cheaper than production)." : "Geschätzte monatliche Kosten für Entwicklung und Test (40-70% günstiger als Produktion).")}</Typography>
      <TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Component" : "Komponente"}</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Tier</TableCell><TableCell sx={{ fontWeight: 'bold' }}>{en ? "Cost/Month" : "Kosten/Monat"}</TableCell></TableRow></TableHead><TableBody>
        {isProd ? [["Logic Apps Standard", "WS2 (2 vCPU, 7 GB)", "~ 303 EUR"], ["API Management", "Standard", "~ 580 EUR"], ["Service Bus", "Premium (1 MU)", "~ 677 EUR"], ["Azure Functions", "Premium (EP1)", "~ 155 EUR"], ["Key Vault", "Standard", "~ 5 EUR"], ["Storage Account", "GRS", "~ 25 EUR"], ["Application Insights", "Pay-per-GB", "~ 50 EUR"], ["Integration Account", "Standard", "~ 302 EUR"]].map(([c, t, k], i) => (<TableRow key={i}><TableCell sx={{ fontWeight: 500 }}>{c}</TableCell><TableCell>{t}</TableCell><TableCell sx={{ fontWeight: 'bold', color: '#F5A623' }}>{k}</TableCell></TableRow>)) : [["Logic Apps Standard", "WS1 (1 vCPU, 3.5 GB)", "~ 152 EUR"], ["API Management", "Developer", "~ 43 EUR"], ["Service Bus", "Standard", "~ 10 EUR"], ["Azure Functions", "Consumption", "~ 5 EUR"], ["Key Vault", "Standard", "~ 3 EUR"], ["Storage Account", "LRS", "~ 5 EUR"], ["Application Insights", "Pay-per-GB", "~ 10 EUR"]].map(([c, t, k], i) => (<TableRow key={i}><TableCell sx={{ fontWeight: 500 }}>{c}</TableCell><TableCell>{t}</TableCell><TableCell sx={{ fontWeight: 'bold', color: '#F5A623' }}>{k}</TableCell></TableRow>))}
        <TableRow sx={{ bgcolor: 'action.hover' }}><TableCell sx={{ fontWeight: 'bold' }} colSpan={2}>{en ? "Total (estimated)" : "Gesamt (geschätzt)"}</TableCell><TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#F5A623' }}>{isProd ? '~ 2,100 EUR' : '~ 230 EUR'}</TableCell></TableRow>
      </TableBody></Table></TableContainer>
    </Section>
  </>);
}

/* ─── Project Management ─── */
export function ProjectMgmtContent({ locale }: L) {
  const en = e(locale);
  return (<>
    <Section title={en ? "Project Overview" : "Projektübersicht"}>
      <Grid container spacing={2}>
        {(en ? [{ t: "Timeline", items: ["Project start after contract award", "Typical duration: 12-24 months", "Kick-off workshop at the beginning"] }, { t: "Team & Resources", items: ["Customer: 2-3 internal employees", "Wesner Software: Scalable", "QA team for quality assurance"] }, { t: "Scope", items: ["Processes can be redesigned", "External interfaces remain unchanged", "No rebuilding of source systems"] }, { t: "Migration Approach", items: ["Preferred: Process analysis + Cloud Native", "Pragmatic: Existing C# code reusable", "Boundaries clearly defined"] }] : [{ t: "Timeline", items: ["Projektstart nach Auftragserteilung", "Typische Laufzeit: 12-24 Monate", "Kick-off Workshop zu Beginn"] }, { t: "Team & Ressourcen", items: ["Kunde: 2-3 interne Mitarbeiter", "Wesner Software: Skalierbar", "QA-Team für Qualitätssicherung"] }, { t: "Scope", items: ["Prozesse können neu gestaltet werden", "Externe Schnittstellen bleiben unverändert", "Kein Umbau der Quellsysteme"] }, { t: "Migrationsansatz", items: ["Bevorzugt: Prozessanalyse + Cloud Native", "Pragmatisch: Bestehender C#-Code wiederverwendbar", "Grenzen klar definiert"] }]).map((s, i) => (
          <Grid item xs={12} sm={6} key={i}><Card variant="outlined" sx={{ height: '100%' }}><CardContent><Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>{s.t}</Typography><BulletList items={s.items} /></CardContent></Card></Grid>))}
      </Grid>
    </Section>
    <Section title={en ? "Project Phases" : "Projektphasen"}>
      <TaskList tasks={en ? [{ title: "Analysis Phase", desc: "Inventory of all BizTalk applications, categorization, set up Azure environment" }, { title: "Pilot Phase", desc: "First 2-3 applications, knowledge transfer, establish best practices, create templates" }, { title: "Development Phase", desc: "Migrate more complex applications, team develops independently, continuous acceptance" }, { title: "Cutover & Completion", desc: "Cutover planning per application, disable BizTalk, sign-off by business team" }] : [{ title: "Analysephase", desc: "Bestandsaufnahme aller BizTalk-Applikationen, Kategorisierung, Azure-Umgebung aufsetzen" }, { title: "Pilotphase", desc: "Erste 2-3 Applikationen, Knowledge Transfer, Best Practices etablieren, Templates erstellen" }, { title: "Entwicklungsphase", desc: "Komplexere Applikationen migrieren, Team entwickelt eigenständig, kontinuierliche Abnahme" }, { title: "Cutover & Abschluss", desc: "Cutover-Planung pro Applikation, BizTalk deaktivieren, Sign-Off durch Fachabteilung" }]} />
    </Section>
    <Section title="Tools">
      <BulletList items={en ? ["Jira — Project management & task tracking, sprint planning", "Confluence — Documentation, runbooks, Architecture Decision Records", "Azure DevOps / GitHub — Source control, CI/CD pipelines, code reviews"] : ["Jira — Projektmanagement & Task-Tracking, Sprint-Planung", "Confluence — Dokumentation, Runbooks, Architecture Decision Records", "Azure DevOps / GitHub — Source Control, CI/CD Pipelines, Code Reviews"]} />
    </Section>
      <ReferencesSection topicId="projectMgmt" locale={locale} />
  </>);
}
