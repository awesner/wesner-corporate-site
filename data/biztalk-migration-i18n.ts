export interface BizTalkI18n {
  hero: { overline: string; title: string; subtitle: string };
  tabs: { overview: string; migration: string; environments: string };
  f1: {
    ipaasTitle: string;
    ipaasP1: string;
    ipaasP2: string;
    ipaasP3: string;
    platformTitle: string;
    platformDesc: string;
    serverlessTitle: string;
    serverlessDesc: string;
    serverlessItems: { title: string; desc: string }[];
    refsTitle: string;
  };
  f2: {
    stratTitle: string;
    hybridTitle: string;
    hybridDesc: string;
    hybridItems: { title: string; desc: string; pct: string }[];
    mappingTitle: string;
    phasesTitle: string;
    sixRsTitle: string;
    sixRsDesc: string;
    compareTitle: string;
    eolTitle: string;
    eolDesc: string;
    eolItems: { title: string; date: string; desc: string }[];
    reqTitle: string;
  };
  f3: {
    title: string;
    subtitle: string;
    compareTitle: string;
    flowTitle: string;
    whyTitle: string;
    whyDesc: string;
    whyItems: string[];
    whyFooter: string;
    wsTitle: string;
    wsDesc: string;
  };
  serviceLabels: {
    features: string;
    biztalkEquiv: string;
    tiers: string;
    useCases: string;
    connections: string;
    keyConfig: string;
    direction: string;
    service: string;
    description: string;
  };
  phaseLabels: {
    goal: string;
    tasks: string;
    deliverables: string;
    pros: string;
    cons: string;
    bestFor: string;
  };
  envLabels: { components: string; characteristics: string; criterion: string };
}

export const de: BizTalkI18n = {
  hero: {
    overline: 'Wesner Software',
    title: ' Migration von MS BizTalk nach MS Azure',
    subtitle:
      'Vom Microsoft BizTalk Server zu Azure Integration Services — Analyse, Strategie, Umsetzung und Betrieb',
  },
  tabs: {
    overview: 'Überblick',
    migration: 'F2: Migration',
    environments: 'F3: Umgebungen',
  },
  f1: {
    ipaasTitle:
      'Was ist iPaaS und warum brauchen Unternehmen eine Integrationsplattform?',
    ipaasP1:
      'iPaaS (Integration Platform as a Service) ist eine cloudbasierte Plattform, die es Unternehmen ermöglicht, Anwendungen, Daten und Prozesse über verschiedene Systeme hinweg zu verbinden ohne eigene Middleware-Infrastruktur betreiben zu müssen.',
    ipaasP2:
      'Ohne eine zentrale Integrationsplattform braucht es Punkt-zu-Punkt-Verbindungen zwischen den einzelnen Systemen, was bei 10 Systemen bereits 45 Verbindungen ergibt. Eine iPaaS löst dieses Problem durch eine Hub-and-Spoke-Architektur. Das bedeutet, alle Systeme verbinden sich mit der zentralen Plattform, die Routing, Transformation und Monitoring übernimmt.',
    ipaasP3:
      'Microsoft Azure Integration Services wurden im Gartner Magic Quadrant 2024 für Enterprise-iPaaS als Leader eingestuft. Ihre Stärken liegen vor allem in der nahtlosen Integration mit dem Azure-Ökosystem, dem Serverless-Modell und den über 400 vorgefertigten Connectors.',
    platformTitle:
      'Azure Integration Services als Enterprise-Integrationsplattform',
    platformDesc:
      'Azure Integration Services (AIS) ist Microsofts iPaaS-Angebot und besteht aus sechs Kernkomponenten, die zusammen eine vollständige Integrationsplattform bilden. Sie ersetzen alle Funktionen von BizTalk Servern und gehen sogar darüber hinaus:',
    serverlessTitle: 'Was bedeutet "Serverless" in diesem Kontext?',
    serverlessDesc:
      'Serverless bedeutet, dass Sie sich auf ihr Geschäft konzentrieren können anstatt sich um Server kümmern zu müssen. Microsoft verwaltet die gesamte Infrastruktur für Sie: Vom Betriebssystem, über Patching und Skalierung bis hin zur Hochverfügbarkeit.',
    serverlessItems: [
      {
        title: 'Auto-Scaling',
        desc: 'Ressourcen werden automatisch hoch- und herunterskaliert basierend auf der Last. Bei 0 Requests = 0 Kosten (Scale-to-Zero).',
      },
      {
        title: 'Pay-per-Use',
        desc: 'Abrechnung pro Ausführung. Keine monatlichen Fixkosten für ungenutzte Kapazität.',
      },
      {
        title: 'Managed Infrastructure',
        desc: 'Kein Server-Management, kein Patching, kein Capacity Planning.',
      },
    ],
    refsTitle: 'Quellen — Microsoft Learn',
  },
  f2: {

       eolTitle: 'Warum Migrieren?',
    eolDesc:
      'Bereits seit dem 14. Oktober 2025 ist der Support von BizTalk-Servern durch Microsoft eingestellt worden. An ihre Stelle treten stattdessen Azure Integration Services als Nachfolger',
    eolItems: [
      {
        title: 'Mainstream Support Ende',
        date: '14. Oktober 2025',
        desc: 'Keine neuen Features, keine Hotfixes',
      },
      {
        title: 'Extended Support Ende',
        date: '14. Oktober 2030',
        desc: 'Nur Sicherheitsupdates (kostenpflichtig)',
      },
      {
        title: 'Nachfolger',
        date: 'Azure Integration Services',
        desc: 'Cloud-native iPaaS-Plattform',
      },
    ],
    compareTitle: 'On-Premises (BizTalk) vs. Cloud (Azure)',
    sixRsTitle: 'Die 6 Rs der Cloud-Migration',
    sixRsDesc:
      'Gartner und AWS haben die 6 Rs der Cloud-Migration als Rahmenwerk definiert. Für BizTalk-Integrationen sind vor allem Rehost, Re-architect und Retire relevant.',
    stratTitle: 'Migrationsstrategie: Lift & Shift vs. Native Neuentwicklung',
    hybridTitle: 'Empfehlung: Hybride Strategie',
    hybridDesc:
      'In der Praxis empfehlen wir eine hybride Strategie — die Entscheidung wird pro Applikation getroffen, basierend auf Komplexität, Business-Kritikalität und Optimierungspotential.',
    hybridItems: [
      {
        title: 'Lift & Shift',
        desc: 'Einfache File-Transfers, Pass-Through',
        pct: '~ 60-70% der Applikationen',
      },
      {
        title: 'Native Neuentwicklung',
        desc: 'Komplexe Orchestrierungen',
        pct: '~ 20-30% der Applikationen',
      },
      {
        title: 'Retire / Replace',
        desc: 'Obsolete Integrationen abschalten',
        pct: '~ 5-10% der Applikationen',
      },
    ],
    mappingTitle: 'BizTalk Server → Azure Integration Services Mapping',
    phasesTitle: 'Migrationsphasen',
    reqTitle: 'Was benötigen wir für die Migration?',
  },
  f3: {
    title: 'Welche Umgebungen werden benötigt?',
    subtitle:
      'Drei Umgebungen für den vollständigen Entwicklungs- und Betriebszyklus',
    compareTitle: 'Umgebungsvergleich',
    flowTitle: 'Promotion Flow',
    whyTitle: 'Warum drei Umgebungen?',
    whyDesc:
      'Die Trennung in DEV, TEST und PROD ist ein bewährtes Muster in der Software-Entwicklung und wird von Microsoft als Best Practice für Azure Integration Services empfohlen. Jede Umgebung hat einen spezifischen Zweck:',
    whyItems: [
      'DEV — Hier wird entwickelt. Entwickler haben volle Berechtigungen, können direkt deployen und debuggen.',
      'TEST — Hier wird getestet. Produktionsnahe Konfiguration, Zugriff nur über CI/CD. UAT durch den Fachbereich.',
      'PROD — Hier läuft der Live-Betrieb. Vollständige Sicherheit, VNET-Isolation, Approval Gates.',
    ],
    whyFooter:
      'Alle drei Umgebungen werden aus identischen Bicep Templates provisioniert (Infrastructure as Code). Die Unterschiede werden ausschliesslich über Parameter-Dateien pro Umgebung gesteuert (SKU-Sizing, Netzwerk, Feature Flags).',
    wsTitle: 'WS1 / WS2 / WS3 — Workflow Standard Hosting Plans',
    wsDesc:
      'Logic Apps Standard läuft auf einem Workflow Standard (WS) Hosting Plan. Dieser bestimmt CPU, RAM und Storage:', //unschlüssig ob das zu technishc ist oder nicht
  },
  serviceLabels: {
    features: 'Features',
    biztalkEquiv: 'BizTalk Äquivalent',
    tiers: 'Verfügbare Tiers',
    useCases: 'Use Cases — Typische Einsatzszenarien',
    connections: 'Verbindungen zu anderen Services',
    keyConfig: 'Wichtige Konfigurationsaspekte',
    direction: 'Richtung',
    service: 'Service',
    description: 'Beschreibung',
  },
  phaseLabels: {
    goal: 'Ziel',
    tasks: 'Aufgaben',
    deliverables: 'Deliverables',
    pros: 'Vorteile',
    cons: 'Nachteile',
    bestFor: 'Geeignet für',
  },
  envLabels: {
    components: 'Azure Komponenten',
    characteristics: 'Eigenschaften',
    criterion: 'Kriterium',
  },
};

export const en: BizTalkI18n = {
  hero: {
    overline: 'Wesner Software',
    title: 'MS BizTalk Migration to MS Azure',
    subtitle:
      'From Microsoft BizTalk Server to Azure Integration Services — Analysis, Strategy, Implementation and Operations',
  },
  tabs: {
    overview: 'Overview',
    migration: 'F2: Migration',
    environments: 'F3: Environments',
  },
  f1: {
    ipaasTitle:
      'What is iPaaS and why do enterprises need an integration platform?',
    ipaasP1:
      'iPaaS (Integration Platform as a Service) is a cloud-based platform that enables enterprises to connect applications, data and processes across different systems without having to operate their own middleware infrastructure.',
    ipaasP2:
      'Without a central integration platform, point-to-point connections emerge between systems. With only 10 systems, this already results in up to 45 individual connections. An iPaaS solves this problem through a hub-and-spoke architectur. It means that all systems connect to the central platform, which handles routing, transformation and monitoring.',
      ipaasP3:
      'Microsoft Azure Integration Services was rated as a Leader in the Gartner Magic Quadrant 2024 for Enterprise iPaaS. Its primary strengths lie in the 400 pre-built connectors, seamless integration with the Azure ecosystem and serverless model',
    platformTitle:
      'Azure Integration Services as an Enterprise Integration Platform',
    platformDesc:
      "Azure Integration Services (AIS) is Microsoft's iPaaS offering and consists of six core components that together form a complete integration platform. Together they replace all functions of BizTalk servers and go even beyond:",
    serverlessTitle: 'What does "serverless" mean?',
    serverlessDesc:
      "Serverless means you can focus completely on your business instead of always worrying about servers. Microsoft manages the entire infrastructure from operating system,over patching and scaling, to high availability.",

      serverlessItems: [
      {
        title: 'Auto-Scaling',
        desc: 'Resources are automatically scaled up and down based on load. 0 requests = 0 costs.', //unsicher ob überzeugend, weil viel nutzen =? viel Kosten?
      },
      {
        title: 'Pay-per-Use',
        desc: 'Billing per execution. No monthly fixed costs for unused capacity.',
      },
      {
        title: 'Managed Infrastructure',
        desc: 'No server management, no patching, no capacity planning.',
      },
    ],
    refsTitle: 'References — Microsoft Learn',
  },
  f2: {
    stratTitle: 'Migration Strategy: Lift & Shift vs. Native Re-development',
    hybridTitle: 'Recommendation: Hybrid Strategy',
    hybridDesc:
      'In practice, we recommend a hybrid strategy — the decision is made per application, based on complexity, business criticality and optimization potential.',
    hybridItems: [
      {
        title: 'Lift & Shift',
        desc: 'Simple file transfers, pass-through',
        pct: '~ 60-70% of applications',
      },
      {
        title: 'Native Re-development',
        desc: 'Complex orchestrations',
        pct: '~ 20-30% of applications',
      },
      {
        title: 'Retire / Replace',
        desc: 'Decommission obsolete integrations',
        pct: '~ 5-10% of applications',
      },
    ],
    mappingTitle: 'BizTalk Server → Azure Integration Services Mapping',
    phasesTitle: 'Migration Phases',
    sixRsTitle: 'The 6 Rs of Cloud Migration',
    sixRsDesc:
      'Gartner and AWS defined the 6 Rs of Cloud Migration as a framework. For BizTalk integrations, Rehost, Re-architect and Retire are most relevant.',
    compareTitle: 'On-Premises (BizTalk) vs. Cloud (Azure) — Comparison',
    eolTitle: 'Why Migrate?',
    eolDesc:
      'Since the 14. October 2025 Microsoft does not support BizTalk servers anymore and instead offers Azure Integration Services.',

      eolItems: [
      {
        title: 'Mainstream Support End',
        date: 'October 14, 2025',
        desc: 'No new features, no hotfixes',
      },
      {
        title: 'Extended Support End',
        date: 'October 14, 2030',
        desc: 'Security updates only (paid)',
      },
      {
        title: 'Successor',
        date: 'Azure Integration Services',
        desc: 'Cloud-native iPaaS platform',
      },
    ],
    reqTitle: 'What do we need for the migration?',
  },
  f3: {
    title: 'Which environments are needed?',
    subtitle:
      'Three environments for the complete development and operations lifecycle',
    compareTitle: 'Environment Comparison',
    flowTitle: 'Promotion Flow',
    whyTitle: 'Why three environments?',
    whyDesc:
      'The separation into DEV, TEST and PROD is a proven pattern in software development and is recommended by Microsoft as best practice for Azure Integration Services. Each environment has a specific purpose:',
    whyItems: [
      'DEV — This is where development happens. Developers have full permissions, can deploy and debug directly.',
      'TEST — This is where testing happens. Production-like configuration, access only via CI/CD. UAT by the business team.',
      'PROD — This is where live operations run. Full security, VNET isolation, approval gates.',
    ],
    whyFooter:
      'All three environments are provisioned from identical Bicep Templates (Infrastructure as Code). Differences are controlled exclusively via parameter files per environment (SKU sizing, networking, feature flags).',
    wsTitle: 'WS1 / WS2 / WS3 — Workflow Standard Hosting Plans',
    wsDesc:
      'Logic Apps Standard runs on a Workflow Standard (WS) Hosting Plan. This determines CPU, RAM and storage:',
  },
  serviceLabels: {
    features: 'Features',
    biztalkEquiv: 'BizTalk Equivalent',
    tiers: 'Available Tiers',
    useCases: 'Use Cases — Typical Scenarios',
    connections: 'Connections to Other Services',
    keyConfig: 'Key Configuration Aspects',
    direction: 'Direction',
    service: 'Service',
    description: 'Description',
  },
  phaseLabels: {
    goal: 'Goal',
    tasks: 'Tasks',
    deliverables: 'Deliverables',
    pros: 'Advantages',
    cons: 'Disadvantages',
    bestFor: 'Best for',
  },
  envLabels: {
    components: 'Azure Components',
    characteristics: 'Characteristics',
    criterion: 'Criterion',
  },
};

/* ─── F1 Services: EN versions ─── */

export const servicesEn: Record<string, any> = {
  logicApps: {
    name: 'Azure Logic Apps (Standard)',
    short: 'Logic Apps',
    color: '#0080FF',
    role: 'Workflow Orchestration',
    desc: 'Serverless workflow engine for business processes. Orchestrates calls between systems, transforms messages, implements content-based routing and complex EAI patterns. 400+ pre-built connectors.',
    features: [
      'Visual Workflow Designer',
      '400+ Connectors (SAP, SF, etc.)',
      'Stateful & Stateless Workflows',
      'B2B: EDI, AS2, X12',
      'XSLT / Liquid Transformations',
      'Integration Account',
    ],
    biztalk: 'Replaces: BizTalk Orchestrations, Maps, Pipelines, BRE',
    useCases: [
      'Receive SFTP file → Parse → Transform → Send to backend',
      'Content-Based Routing: Route message to different targets based on content',
      'Scheduled Batch Processing: Timer → SQL Query → Generate Reports',
      'B2B/EDI: AS2 Receive → X12 Decode → Processing → AS2 Response',
      'Long-Running Approval Workflows with Human-in-the-Loop',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'Receives requests from APIM as backend',
        direction: 'in',
      },
      {
        target: 'Functions',
        desc: 'Calls Azure Functions for custom logic (XSLT, Parsing)',
        direction: 'out',
      },
      {
        target: 'Service Bus',
        desc: 'Sends/receives messages via Service Bus Connector',
        direction: 'both',
      },
      {
        target: 'Event Grid',
        desc: 'Trigger: Reacts to events (BlobCreated, etc.)',
        direction: 'in',
      },
      {
        target: 'Key Vault',
        desc: 'Connection strings and secrets via Managed Identity',
        direction: 'in',
      },
      {
        target: 'Monitoring',
        desc: 'Run History and Traces to Application Insights',
        direction: 'out',
      },
    ],
    tiers: [
      'Consumption (Pay-per-Execution)',
      'Standard (Single-Tenant, WS1/WS2/WS3)',
      'ISE (Legacy)',
    ],
    keyConfig: [
      'Stateful vs. Stateless Workflows (Checkpointing)',
      'Trigger: Polling (SFTP, SQL) vs. Push (HTTP, Service Bus, Event Grid)',
      'Integration Account for Schemas, Maps, Partners, Agreements',
      'VNET Integration for Private Endpoints',
      'Deployment Slots for Zero-Downtime Updates',
    ],
  },
  serviceBus: {
    name: 'Azure Service Bus',
    short: 'Service Bus',
    color: '#00B7C3',
    role: 'Enterprise Messaging',
    desc: 'Enterprise message broker for reliable asynchronous communication. Guaranteed delivery (At-Least-Once), Dead-Letter Queues, Sessions, Scheduled Delivery. Decouples sender and receiver temporally and spatially.',
    features: [
      'Queues & Topics/Subscriptions',
      'Dead-Letter Queue (DLQ)',
      'Sessions & FIFO',
      'Duplicate Detection',
      'Scheduled Delivery',
      'Message TTL & Auto-Forward',
    ],
    biztalk:
      'Replaces: BizTalk MessageBox (Publish/Subscribe), SB-Messaging Adapter',
    useCases: [
      'Async Decoupling: Logic App publishes message, consumer processes independently',
      'Fan-Out: Topic with multiple subscriptions for parallel processing',
      'Retry & Dead-Letter: Failed messages land in DLQ for analysis',
      'Ordered Processing: Sessions guarantee FIFO per Session-ID',
      'Scheduled Delivery: Deliver messages at specific time (e.g. batch at 06:00)',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Trigger: Logic App reacts to new messages in Queue/Subscription',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Service Bus Trigger starts Function on new message',
        direction: 'out',
      },
      {
        target: 'Event Grid',
        desc: 'Service Bus Active Messages Count → Event Grid Alert',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Metrics: Active Messages, DLQ Count, Throughput',
        direction: 'out',
      },
    ],
    tiers: [
      'Basic (Queues only)',
      'Standard (Topics + Queues)',
      'Premium (VNET, Dedicated, Geo-DR)',
    ],
    keyConfig: [
      'Queues: Point-to-Point, one consumer per message',
      'Topics/Subscriptions: Pub/Sub, Filter Rules per Subscription',
      'Dead-Letter Queue: Max Delivery Count, TTL Expiry',
      'Duplicate Detection Window (e.g. 10 minutes)',
      'Geo-Disaster Recovery: Paired Namespaces',
    ],
  },
  apim: {
    name: 'Azure API Management',
    short: 'API Management',
    color: '#0078D4',
    role: 'API Gateway & Facade',
    desc: 'Central entry layer for all API calls. Authentication (OAuth2, Subscription Keys), Rate Limiting, Request/Response Transformation, Caching, Developer Portal. Decouples consumer from backend implementation.',
    features: [
      'OAuth2 / API Key Auth',
      'Rate Limiting & Throttling',
      'Request Transformation',
      'Developer Portal',
      'Monitoring & Analytics',
      'Policy Engine',
    ],
    biztalk: 'Replaces: BizTalk Receive/Send Ports (HTTP), WCF Adapter',
    useCases: [
      'Unified API gateway for all consumers (Web, Mobile, Partners)',
      'Versioning: Run /v1/, /v2/ in parallel without backend changes',
      'Token exchange: Consumer sends API Key, APIM gets OAuth2 Token internally',
      'Response caching for frequently queried reference data',
      'Monetization: Different subscription tiers (Basic, Premium)',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'APIM routes validated requests to Logic App Workflows (Backend-URL)',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Direct integration for lightweight API endpoints',
        direction: 'out',
      },
      {
        target: 'Entra ID',
        desc: 'OAuth2 Token Validation via validate-jwt Policy',
        direction: 'in',
      },
      {
        target: 'Key Vault',
        desc: 'Named Values reference Key Vault Secrets (API Keys, Certificates)',
        direction: 'in',
      },
      {
        target: 'Monitoring',
        desc: 'Diagnostic Logs and Metrics to Application Insights',
        direction: 'out',
      },
    ],
    tiers: [
      'Developer (Dev/Test)',
      'Basic',
      'Standard',
      'Premium (VNET, Multi-Region)',
      'v2 Tiers (Preview)',
    ],
    keyConfig: [
      'Products & Subscriptions define access policies',
      'Policies: Inbound → Backend → Outbound → On-Error',
      'Backends: URL + Circuit Breaker + Load Balancing',
      'Custom Domains & TLS Certificates',
      'Self-hosted Gateway for hybrid scenarios',
    ],
  },
  eventGrid: {
    name: 'Azure Event Grid',
    short: 'Event Grid',
    color: '#7C3AED',
    role: 'Event Routing',
    desc: 'Serverless event broker for reactive architectures. Routes events from Azure services (Blob Created, Resource Changed) and custom sources to handlers. Push-based, high throughput, sub-second latency.',
    features: [
      'Push-based Event Delivery',
      'Event Filtering & Routing',
      'Azure-native Event Sources',
      'Custom Topics',
      'Dead-Letter & Retry',
      'CloudEvents Schema',
    ],
    biztalk: 'Replaces: BizTalk File/FTP Polling, Event-based Triggers',
    useCases: [
      'File Upload: BlobCreated event triggers Logic App Workflow',
      'Resource Changes: VM Created/Deleted → Compliance Check',
      'Custom Events: Application publishes business events',
      'Reactive Architecture: Events instead of polling (no unnecessary resource consumption)',
      'Fan-Out: One event → multiple subscribers (Logic App + Function + Storage Queue)',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Event Grid Trigger starts Logic App Workflow',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Event Grid Trigger starts Azure Function',
        direction: 'out',
      },
      {
        target: 'Service Bus',
        desc: 'Forward events to Service Bus Queue/Topic',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Delivery Metrics and Failed Events',
        direction: 'out',
      },
    ],
    tiers: [
      'Per Event Pricing (first 100K events/month free)',
      'Namespaces (Preview, Pull-based)',
    ],
    keyConfig: [
      'System Topics: Azure-native events (Storage, Resource Group, etc.)',
      'Custom Topics: Register custom event sources',
      'Event Subscriptions with Subject Filter and Advanced Filters',
      'Retry Policy: Max Attempts + Event TTL',
      'Dead-Letter Destination: Blob Storage for failed events',
    ],
  },
  functions: {
    name: 'Azure Functions',
    short: 'Functions',
    color: '#F5A623',
    role: 'Custom Code / Serverless Compute',
    desc: 'Serverless compute platform for custom logic. XSLT/Liquid transformations, data validation, lookups, enrichment. Complements Logic Apps where declarative workflows are not sufficient.',
    features: [
      'Event-Triggered Execution',
      '.NET, Python, Java, Node.js',
      'Durable Functions (Orchestration)',
      'Bindings (Blob, Queue, HTTP)',
      'Auto-Scaling',
      'VNET Integration',
    ],
    biztalk: 'Replaces: BizTalk Custom Pipeline Components, Helper Classes',
    useCases: [
      'XSLT/Liquid Transformation: Logic App calls Function with payload',
      'PGP Encrypt/Decrypt: Keys from Key Vault, encryption in Function',
      'CSV/Flat File Parsing: Custom parser for special formats',
      'Database Lookup & Enrichment: SQL Query, result back to Logic App',
      'Durable Functions: Complex orchestration with Fan-Out/Fan-In pattern',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Logic App calls Function via HTTP Trigger',
        direction: 'in',
      },
      {
        target: 'Service Bus',
        desc: 'Service Bus Trigger starts Function',
        direction: 'in',
      },
      {
        target: 'Event Grid',
        desc: 'Event Grid Trigger starts Function',
        direction: 'in',
      },
      {
        target: 'Key Vault',
        desc: 'Managed Identity reads Secrets (PGP Keys, Connection Strings)',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Traces and Custom Metrics to Application Insights',
        direction: 'out',
      },
    ],
    tiers: [
      'Consumption (Pay-per-Execution)',
      'Premium (VNET, Always Ready)',
      'Dedicated (App Service Plan)',
    ],
    keyConfig: [
      'Trigger Bindings: HTTP, Timer, Queue, Blob, Event Grid, Service Bus',
      'Output Bindings: Queue, Blob, SQL, Cosmos DB, Service Bus',
      'Durable Functions for Stateful Orchestrations',
      'Deployment Slots for Blue/Green Deployments',
      'Application Settings via Key Vault References',
    ],
  },
  dataFactory: {
    name: 'Azure Data Factory',
    short: 'Data Factory',
    color: '#E91E8C',
    role: 'Data Integration & ETL',
    desc: 'Cloud-based ETL/ELT service for data integration at scale. Creates data-driven workflows to orchestrate and automate data movement and data transformation.',
    features: [
      '90+ Data Source Connectors',
      'Data Flows (visual ETL)',
      'Copy Activity (data movement)',
      'Pipeline Orchestration',
      'Integration Runtime (Cloud/Self-hosted)',
      'Mapping Data Flows',
    ],
    biztalk:
      'Complements: BizTalk Batch Processing, Flat File Import, Database Integrations',
    useCases: [
      'Batch data loads: CSV/Excel from Blob Storage → SQL Database transform',
      'Data Migration: On-Premises SQL Server → Azure SQL / Data Lake',
      'Scheduled ETL: Daily data synchronization between systems',
      'Data Lake Ingestion: Centralize raw data from various sources',
      'Hybrid Integration: On-Premises data sources via Self-hosted Integration Runtime',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Data Factory Pipeline can trigger Logic App Workflow',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Custom Activities call Azure Functions',
        direction: 'out',
      },
      {
        target: 'Service Bus',
        desc: 'Send data to Service Bus Queue after processing',
        direction: 'out',
      },
      {
        target: 'Event Grid',
        desc: 'Pipeline Events trigger downstream processes',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Pipeline Runs and Activity Logs to Monitor',
        direction: 'out',
      },
    ],
    tiers: [
      'Data Factory V2 (Pay-per-Use)',
      'Managed VNET Integration Runtime',
      'SSIS Integration Runtime',
    ],
    keyConfig: [
      'Pipelines: Logical grouping of Activities',
      'Linked Services: Connections to data sources and targets',
      'Datasets: Schema definition of data',
      'Integration Runtime: Cloud, Self-hosted or Azure-SSIS',
      'Triggers: Schedule, Tumbling Window, Event-based',
    ],
  },
  keyvault: {
    name: 'Azure Key Vault',
    short: 'Key Vault',
    color: '#DC2626',
    role: 'Secret & Certificate Management',
    desc: 'Central vault for secrets, certificates and encryption keys. APIM Named Values, Logic App Connection Strings, Function App Settings — all credentials are managed and automatically rotated here.',
    features: [
      'Secret Management',
      'Certificate Storage',
      'Key Rotation',
      'RBAC Access Policies',
      'Managed Identity Integration',
      'Audit Logging',
    ],
    biztalk: 'Replaces: BizTalk SSO (Enterprise Single Sign-On)',
    useCases: [
      'SFTP Credentials: Username/Password/SSH Keys for SFTP Connectors',
      'PGP Keys: Private/Public Keys for encryption in Azure Functions',
      'TLS Certificates: Custom Domains for APIM and Logic Apps',
      'Connection Strings: SQL, Service Bus, Storage — centralized and rotatable',
      'API Keys: Securely manage and reference partner API keys',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'Named Values reference Key Vault Secrets',
        direction: 'out',
      },
      {
        target: 'Logic Apps',
        desc: 'Connector credentials via Managed Identity',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'App Settings as Key Vault References (@Microsoft.KeyVault(...))',
        direction: 'out',
      },
      {
        target: 'Entra ID',
        desc: 'RBAC and Managed Identity for access control',
        direction: 'in',
      },
      {
        target: 'Monitoring',
        desc: 'Audit Logs: Who read which secret when?',
        direction: 'out',
      },
    ],
    tiers: [
      'Standard (Software-Protected Keys)',
      'Premium (HSM-Protected Keys)',
    ],
    keyConfig: [
      'Access Policies vs. RBAC (recommended: RBAC)',
      'Soft-Delete and Purge Protection (prevent accidental deletion)',
      'Secret Rotation: Event Grid Event near expiry',
      'Private Endpoint: No Public Access',
      'Diagnostic Settings: Audit Logs to Log Analytics',
    ],
  },
  monitor: {
    name: 'Application Insights / Monitor',
    short: 'Monitoring',
    color: '#10B981',
    role: 'Observability & Alerting',
    desc: 'End-to-end monitoring across all Integration Services. Distributed Tracing, Custom Metrics, Log Analytics, Alerting. Correlates requests across APIM → Logic App → Service Bus → Function.',
    features: [
      'Distributed Tracing',
      'Log Analytics (KQL)',
      'Custom Dashboards',
      'Alert Rules & Action Groups',
      'Workbooks & Reports',
      'Cost Analysis',
    ],
    biztalk: 'Replaces: BizTalk Admin Console, HAT, Event Log',
    useCases: [
      'Distributed Tracing: Track request across APIM → Logic App → Function → Service Bus',
      'Alerting: Email/Teams notification when error rate > 5%',
      'KQL Queries: Analyze error patterns over time',
      'Dashboards: Business KPIs (Messages/day, Success rate, Latency)',
      'Cost Analysis: Break down costs per integration flow',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'Request/Response Logs, Latency, Error Rates',
        direction: 'in',
      },
      {
        target: 'Logic Apps',
        desc: 'Workflow Run History, Action-Level Traces',
        direction: 'in',
      },
      {
        target: 'Functions',
        desc: 'Function Invocations, Exceptions, Dependencies',
        direction: 'in',
      },
      {
        target: 'Service Bus',
        desc: 'Queue Depth, DLQ Count, Throughput Metrics',
        direction: 'in',
      },
      {
        target: 'Event Grid',
        desc: 'Delivery Success/Failure Rates',
        direction: 'in',
      },
    ],
    tiers: [
      'Pay-as-you-go (Ingestion + Retention)',
      'Commitment Tiers (Discounts from 100 GB/day)',
    ],
    keyConfig: [
      'Log Analytics Workspace: Central data sink',
      'Diagnostic Settings on all AIS resources',
      'Alert Rules: Metric Alerts + Log Alerts + Activity Log Alerts',
      'Action Groups: Email, SMS, Teams, Logic App Webhook',
      'Workbooks: Reusable dashboard templates',
    ],
  },
  entraId: {
    name: 'Microsoft Entra ID',
    short: 'Entra ID',
    color: '#1565C0',
    role: 'Identity & Access',
    desc: 'Identity Provider for OAuth2/OIDC. App Registrations for API consumers and backend services, Managed Identities eliminate passwords between Azure services, Conditional Access Policies.',
    features: [
      'OAuth2 Client Credentials',
      'Managed Identity',
      'App Registrations & Roles',
      'Conditional Access',
      'Service Principal',
      'Token Validation',
    ],
    biztalk: 'Replaces: BizTalk Windows Auth, Custom Auth Adapters',
    useCases: [
      'API Consumer Authentication: App Registration + Client Credentials Grant',
      'Managed Identity: Logic App accesses Key Vault / SQL without passwords',
      'Role-Based Access: App Roles define who can use which API operations',
      'Conditional Access: Access only from specific IP ranges or with MFA',
      'Service-to-Service: Backend services authenticate via Bearer Token',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'validate-jwt Policy verifies OAuth2 Tokens',
        direction: 'out',
      },
      {
        target: 'Logic Apps',
        desc: 'Managed Identity for connector authentication',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Managed Identity + EasyAuth for Function access',
        direction: 'out',
      },
      {
        target: 'Key Vault',
        desc: 'RBAC: Which identity can read which secrets?',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Sign-in Logs and Audit Logs',
        direction: 'out',
      },
    ],
    tiers: [
      'Free (Basic Features)',
      'P1 (Conditional Access, PIM)',
      'P2 (Identity Protection, Access Reviews)',
    ],
    keyConfig: [
      'App Registration: Redirect URIs, API Permissions, Certificates/Secrets',
      'Managed Identity: System-Assigned (per resource) vs. User-Assigned (shared)',
      'App Roles: Defined in App Registration, assigned to Service Principals',
      'Token Lifetime: Default vs. Custom Policies',
      'Enterprise Application: Consent and User Assignment',
    ],
  },
};

/* ─── F2 EN data ─── */

export const strategiesEn = [
  {
    name: 'Lift & Shift',
    color: '#F59E0B',
    desc: '1:1 rebuild of existing BizTalk logic in Azure Integration Services. Same data flow, same formats, same interfaces.',
    pros: [
      'Fast migration — minimal analysis effort',
      'Low risk — proven logic is adopted',
      'Minimal business interruption',
      'Well suited for simple file transfers (FILE → SFTP)',
    ],
    cons: [
      'Legacy patterns remain (e.g. Polling instead of Event-Driven)',
      'No process optimization',
      'Technical debt is carried over',
    ],
    bestFor:
      'Simple pass-through integrations, file transfers, time-critical migrations',
  },
  {
    name: 'Process Analysis & Native Development',
    color: '#10B981',
    desc: 'Existing processes are analyzed, optimized and re-developed cloud-natively in Azure. Event-Driven, resilient, scalable.',
    pros: [
      'Cloud-native architecture — Event-Driven instead of Polling',
      'Process optimization',
      'Better scalability and resilience',
      'Future-proof — no technical baggage',
      'Chance for standardization across all integrations',
    ],
    cons: [
      'Higher initial effort (Analysis + Design + Development)',
      'Longer time-to-production per application',
    ],
    bestFor:
      'Complex orchestrations, business-critical processes, integrations with optimization potential',
  },
];

export const requirementsEn = [ //sinnvoll das ganz so detailliert hier aufzuführen?
  {
    title: 'Access to BizTalk environment with Visual Studio',
    desc: 'Full access to the existing BizTalk Server environment incl. Visual Studio with BizTalk Developer Tools.',
    details: [
      'Remote Desktop or VPN access to the BizTalk Server',
      'Visual Studio with BizTalk Developer Tools installed',
      'Access to all BizTalk Applications (Orchestrations, Schemas, Maps, Pipelines)',
      'BizTalk Admin Console — overview of all Receive/Send Ports',
      'Export Binding Files (environment-specific configurations)',
      'Access to Custom Pipeline Components and Helper Assemblies (Source Code)',
    ],
    output:
      'Complete inventory of all BizTalk artifacts, dependencies and configurations per application.',
  },
  {
    title: 'Access to Jira / Confluence',
    desc: 'Access to existing documentation, tickets and knowledge articles around BizTalk integrations.',
    details: [
      'Confluence: Existing architecture documentation and runbooks',
      'Jira: Open issues / known bugs in existing integrations',
      'Jira: Change history — recent changes',
      'Contact persons / responsible parties per integration',
      'SLA documentation: Which integrations have which availability requirements',
    ],
    output:
      'Business context and requirements per integration, prioritization by business impact.',
  },
  {
    title: 'Listing / Architecture of connected systems',
    desc: 'Complete overview of which source and target systems are currently connected via BizTalk.',
    details: [
      'System landscape: All systems communicating via BizTalk (SAP, SFTP partners, databases, MQ)',
      'Per system: Protocol (SFTP, MQ, SQL, REST, SOAP), Data format (CSV, XML, Flat File, JSON)',
      'Data flow direction: Inbound, Outbound or Bidirectional',
      'Network topology: On-Premises, external (partners), Cloud',
      'Firewall rules and network permissions',
      'Credentials and certificates: Auth methods per connection',
    ],
    output:
      'Dependency matrix and network diagram as basis for Azure architecture planning.',
  },
  {
    title: 'Define migration strategy per application',
    desc: 'Joint decision whether each BizTalk application is migrated via Lift & Shift or Native re-development.',
    details: [
      'Assess per application: Complexity, business criticality, change frequency',
      'Native Re-development: Process analysis → optimized Azure design',
      'Define decision criteria together',
      'Consider dependencies between applications',
      'Plan parallel operation: BizTalk and Azure simultaneously',
    ],
    output:
      'Migration strategy matrix: Each application with assigned strategy and prioritization.',
  },
  {
    title: 'Access & Tooling',
    desc: 'Prerequisites for the development phase: Access to Azure environment and selection of development tools.',
    details: [
      'Access to MS Azure Subscription with Contributor permissions',
      'Visual Studio or Visual Studio Code as development environment',
      'Azure DevOps or GitHub for Source Control and CI/CD Pipelines',
      'Define Git branching strategy',
      'Access to partner test systems',
      'Test data (anonymized) for integration tests',
    ],
    output:
      'Development environment set up, tooling defined, access to all relevant systems secured.',
  },
  {
    title: 'Deployment',
    desc: 'Development and deployment process for Azure Logic Apps and other Integration Services.',
    details: [
      'Logic Apps are developed in the Azure development portal',
      'Download workflows via Azure CLI into the Git repository',
      'Versioning and code review via Git (Pull Requests)',
      'CI/CD Pipeline deploys from Git to target environments (DEV → TEST → PROD)',
      'Infrastructure as Code (Bicep Templates)',
      'Deployment Slots for Zero-Downtime Updates',
    ],
    output:
      'Defined deployment process from development to automated rollout via CI/CD.',
  },
];

export const phasesEn = [
  {
    id: 'analyse',
    title: 'Analysis Phase',
    color: '#F59E0B',
    subtitle: 'Inventory and assessment of all BizTalk integrations',
    goal: 'Complete understanding of the existing integration landscape as basis for migration planning.',
    tasks: [
      {
        title: 'Create BizTalk inventory',
        desc: 'Capture all Applications, Orchestrations, Schemas, Maps, Pipelines and Custom Components.',
      },
      {
        title: 'Document data flows',
        desc: 'Per integration: Source → Transformation → Target, protocols, formats, frequency and data volume.',
      },
      {
        title: 'Analyze dependencies',
        desc: 'Which systems communicate via BizTalk? Identify network topology, firewall rules.',
      },
      {
        title: 'Assess complexity',
        desc: 'Classify each application by complexity, business criticality and change frequency.',
      },
      {
        title: 'Define migration strategy',
        desc: 'Decide per application: Lift & Shift, Native Re-development or Retire/Replace.',
      },
      {
        title: 'Define migration sequence',
        desc: 'Consider dependencies, identify quick wins, select pilot application.',
      },
    ],
    deliverables: [
      'BizTalk artifact inventory (complete)',
      'System dependency matrix',
      'Migration strategy matrix per application',
      'Prioritized migration sequence',
      'Risk assessment',
    ],
  },
  {
    id: 'entwicklung',
    title: 'Development',
    color: '#3B82F6',
    subtitle: 'Build the Azure platform and migrate integrations',
    goal: 'Stepwise migration of BizTalk integrations to Azure Integration Services — starting with a pilot application.',
    tasks: [
      {
        title: 'Create Resource Groups',
        desc: 'Azure Landing Zone with Resource Groups for DEV, TEST, PROD incl. VNET, Private Endpoints, Key Vault and Monitoring.',
      },
      {
        title: 'Build CI/CD Pipeline',
        desc: 'Azure DevOps / GitHub Actions Pipeline for automated deployment: Build → Test → DEV → TEST → PROD.',
      },
      {
        title: 'Develop pilot integration',
        desc: 'Migrate first application (ideally Lift & Shift), establish patterns, collect lessons learned.',
      },
      {
        title: 'Migrate further integrations',
        desc: 'Iteratively migrate further applications based on prioritized sequence.',
      },
      {
        title: 'Implement mapping & transformation',
        desc: 'BizTalk Maps → Logic Apps Transformations, XSLT mappings, Liquid Templates or Azure Functions.',
      },
      {
        title: 'Error Handling & Retry Logic',
        desc: 'Implement error handling, Dead-Letter Queues, retry policies and alerting per integration.',
      },
    ],
    deliverables: [
      'Resource Groups (DEV, TEST, PROD) set up',
      'CI/CD Pipeline (fully automated)',
      'Migrated integrations (iterative)',
      'Bicep Templates (Infrastructure as Code)',
      'Technical documentation per integration',
      'Runbooks for operations and troubleshooting',
    ],
  },
  {
    id: 'testen',
    title: 'Testing',
    color: '#7C3AED',
    subtitle: 'Quality assurance through comprehensive testing at all levels',
    goal: 'Ensure that all migrated integrations work correctly, performantly and reliably.',
    tasks: [
      {
        title: 'Unit Tests',
        desc: 'Test individual workflow steps and Azure Functions in isolation. Mock external systems.',
      },
      {
        title: 'Integration Tests',
        desc: 'End-to-end tests against test systems: Send data, verify transformation, validate target system.',
      },
      {
        title: 'Regression comparison',
        desc: 'Compare Azure outputs with BizTalk outputs — identical inputs must produce identical results.',
      },
      {
        title: 'Performance Tests',
        desc: 'Load tests under realistic conditions: Measure throughput, latency, scaling behavior.',
      },
      {
        title: 'Failover & Resilience Tests',
        desc: 'Test behavior during outages: Service Bus down, SFTP unreachable, timeout scenarios.',
      },
      {
        title: 'User Acceptance Testing (UAT)',
        desc: 'Business team validates migrated integrations against business requirements.',
      },
    ],
    deliverables: [
      'Test protocols per integration',
      'Regression comparison BizTalk vs. Azure',
      'Performance benchmark results',
      'Open defects / known issues list',
      'UAT sign-off by business team',
      'Go/No-Go recommendation per integration',
    ],
  },
  {
    id: 'produktion',
    title: 'Production',
    color: '#10B981',
    subtitle: 'Go-Live, Cutover and transition to regular operations',
    goal: 'Controlled transition from BizTalk to Azure Integration Services with minimal risk and no business interruption.',
    tasks: [
      {
        title: 'Create cutover plan',
        desc: 'Detailed plan per integration: Time window, rollback strategy, responsibilities, communication.',
      },
      {
        title: 'Set up parallel operation',
        desc: 'BizTalk and Azure run simultaneously — gradual switchover of traffic to Azure.',
      },
      {
        title: 'Switch DNS / routing',
        desc: 'Redirect endpoints, SFTP access, API URLs to new Azure services.',
      },
      {
        title: 'Activate monitoring & alerting',
        desc: 'Application Insights Dashboards, Alert Rules, Action Groups — 24/7 monitoring.',
      },
      {
        title: 'Hypercare phase',
        desc: 'Increased attention after Go-Live: Immediate response to incidents, daily status calls.',
      },
      {
        title: 'Decommission BizTalk',
        desc: 'After successful stabilization: Shut down BizTalk applications, power down servers.',
      },
    ],
    deliverables: [
      'Cutover plan (detailed per integration)',
      'Rollback runbooks',
      'Monitoring Dashboards (Azure Portal)',
      'Alert Rules with escalation paths',
      'Hypercare report (daily)',
      'BizTalk decommissioning protocol',
    ],
  },
];

export const biztalkMappingEn = [
  {
    biz: 'Receive Port / Receive Location',
    azure: 'API Management (HTTP) / Event Grid + Blob Trigger (File)',
  },
  {
    biz: 'Pipeline (Flat File, XML)',
    azure: 'Logic App Decode Action / Azure Function',
  },
  { biz: 'Orchestration (XLANG/s)', azure: 'Logic App Standard Workflow' },
  {
    biz: 'Map (XSLT)',
    azure: 'Azure Function (XSLT/Liquid) / Logic App Transform Action',
  },
  {
    biz: 'Business Rule Engine (BRE)',
    azure: 'Logic App Switch/Condition / Azure Function',
  },
  { biz: 'MessageBox (Pub/Sub)', azure: 'Service Bus Topics & Subscriptions' },
  {
    biz: 'Send Port / Send Port Group',
    azure: 'Logic App HTTP Action / Connectors / APIM Backend',
  },
  {
    biz: 'Adapter Framework (SAP, FTP, SQL...)',
    azure: 'Logic App Connectors (400+)',
  },
  {
    biz: 'SSO (Enterprise Single Sign-On)',
    azure: 'Key Vault + Managed Identity',
  },
  {
    biz: 'BizTalk Admin Console / HAT',
    azure: 'Application Insights + Log Analytics',
  },
  { biz: 'Custom Pipeline Components', azure: 'Azure Functions' },
  {
    biz: 'BAM (Business Activity Monitoring)',
    azure: 'Application Insights + Power BI',
  },
  {
    biz: 'Integration Account (B2B/EDI)',
    azure: 'Logic App Integration Account (AS2, X12, EDIFACT)',
  },
  {
    biz: 'Host / Host Instances',
    azure: 'Logic App Plan (Workflow Service Plan / ASE)',
  },
];

export const onPremVsCloudEn = [
  {
    k: 'Infrastructure',
    biz: 'Own servers, VMs, SQL Server, Windows Server licenses',
    az: 'Serverless / PaaS — no infrastructure management',
  },
  {
    k: 'Scaling',
    biz: 'Vertical: Buy larger servers, add Host Instances',
    az: 'Horizontal: Auto-Scale based on load, Pay-per-Use',
  },
  {
    k: 'Costs',
    biz: 'High fixed costs: Hardware, licenses, maintenance, personnel',
    az: 'Variable costs: Pay-per-Execution, low upfront investment',
  },
  {
    k: 'Updates',
    biz: 'Manual: Install CU, plan downtime, risk',
    az: 'Automatic: Platform Updates from Microsoft, Zero Downtime',
  },
  {
    k: 'Availability',
    biz: 'Own HA: SQL Clustering, BizTalk Group, NLB',
    az: 'Built-in HA: 99.95% SLA (Logic Apps), Geo-DR (Service Bus)',
  },
  {
    k: 'Monitoring',
    biz: 'BizTalk Admin Console, HAT, custom tools',
    az: 'Application Insights, Log Analytics, Azure Monitor',
  },
  {
    k: 'Deployment',
    biz: 'MSI packages, BizTalk Admin Console, GAC',
    az: 'CI/CD Pipeline, ZIP Deploy, Slot Swap (Zero Downtime)',
  },
];

export const sixRsEn = [
  {
    r: 'Rehost',
    subtitle: 'Lift & Shift',
    desc: '1:1 rebuild in the cloud. Same logic, same data flows.',
    color: '#F59E0B',
    relevant: true,
  },
  {
    r: 'Replatform',
    subtitle: 'Lift & Optimize',
    desc: 'Migration with minor cloud optimizations.',
    color: '#3B82F6',
    relevant: true,
  },
  {
    r: 'Re-architect',
    subtitle: 'Cloud Native',
    desc: 'Process analysis and re-development with cloud-native patterns.',
    color: '#10B981',
    relevant: true,
  },
  {
    r: 'Repurchase',
    subtitle: 'Replace / SaaS',
    desc: 'Replace with a ready-made SaaS solution.',
    color: '#8B5CF6',
    relevant: false,
  },
  {
    r: 'Retain',
    subtitle: 'Keep',
    desc: 'Keep in existing environment for now.',
    color: '#6B7280',
    relevant: false,
  },
  {
    r: 'Retire',
    subtitle: 'Decommission',
    desc: 'Identify and decommission unneeded integrations.',
    color: '#EF4444',
    relevant: true,
  },
];

/* ─── F3 EN data ─── */

export const environmentsEn = [ //ist das in der ausführlichkeit notwendig?
  {
    id: 'dev',
    name: 'Development Environment',
    short: 'DEV',
    color: '#F59E0B',
    purpose: 'Development and local testing of new integrations and changes.',
    components: [
      {
        name: 'Logic Apps Standard',
        detail: 'Workflow development, local debugging via VS Code + Azurite',
      },
      {
        name: 'Azure Functions',
        detail: 'Develop custom code and run unit tests',
      },
      {
        name: 'Service Bus',
        detail: 'Basic Tier — Queues for local integration tests',
      },
      {
        name: 'API Management',
        detail: 'Developer Tier — API design, mocking, policy tests',
      },
      {
        name: 'Key Vault',
        detail: 'Dev secrets, test certificates, separated from Prod',
      },
      {
        name: 'Storage Account',
        detail: 'Blob Storage for test files and workflow state',
      },
      {
        name: 'Application Insights',
        detail: 'Debugging, trace analysis, performance profiling',
      },
    ],
    characteristics: [
      'Developers have Contributor access',
      'No VNET requirement (optional for network tests)',
      'Cheapest SKUs (Developer, Basic, WS1)',
      'Fast iteration: Direct deployments without approval',
      'Test data, no production data',
      'Feature Branches → Dev Environment',
    ],
    sizing: 'WS1 (Logic Apps), Developer (APIM), Basic (Service Bus)',
  },
  {
    id: 'test',
    name: 'Test Environment',
    short: 'TEST',
    color: '#7C3AED',
    purpose:
      'Integration tests, end-to-end tests and User Acceptance Testing (UAT) under production-like conditions.',
    components: [
      {
        name: 'Logic Apps Standard',
        detail: 'Production-like workflows, E2E tests with real connectors',
      },
      {
        name: 'Azure Functions',
        detail: 'Integration tests against external systems (SFTP, SQL)',
      },
      {
        name: 'Service Bus',
        detail: 'Standard Tier — Topics & Subscriptions like in Prod',
      },
      {
        name: 'API Management',
        detail: 'Standard Tier — full policy tests, load testing',
      },
      { name: 'Key Vault', detail: 'Test credentials for partner systems' },
      {
        name: 'Storage Account',
        detail: 'Production-like blob structure with test data',
      },
      {
        name: 'Application Insights',
        detail: 'E2E tracing, alert tests, dashboard validation',
      },
    ],
    characteristics: [
      'Production-like configuration (same Bicep Templates)',
      'VNET Integration active — test Private Endpoints',
      'Access only via CI/CD Pipeline (no manual deployment)',
      'Test partner systems (SFTP test server, test APIs)',
      'Anonymized / synthetic test data',
      'Approval gate before promotion to Prod',
      'Performance and load tests possible',
    ],
    sizing: 'WS2 (Logic Apps), Standard (APIM), Standard (Service Bus)',
  },
  {
    id: 'prod',
    name: 'Production Environment',
    short: 'PROD',
    color: '#10B981',
    purpose:
      'Live operation of all integrations with highest availability, security and performance.',
    components: [
      {
        name: 'Logic Apps Standard',
        detail: 'All production workflows, Deployment Slots for Zero-Downtime',
      },
      {
        name: 'Azure Functions',
        detail: 'Premium Plan — Always Ready, VNET, no Cold Starts',
      },
      { name: 'Service Bus', detail: 'Premium Tier — Dedicated, VNET, Geo-DR' },
      {
        name: 'API Management',
        detail: 'Premium Tier — VNET, Multi-Region (optional)',
      },
      {
        name: 'Key Vault',
        detail:
          'Premium (HSM) — Production secrets, auto-rotation, audit logging',
      },
      {
        name: 'Storage Account',
        detail: 'GRS — Geo-Redundant, Private Endpoints, Soft Delete',
      },
      {
        name: 'Application Insights',
        detail: 'Full monitoring, alerting, dashboards, retention',
      },
    ],
    characteristics: [
      'Full VNET isolation — all services via Private Endpoints',
      'Deployment only via CI/CD with Approval Gate',
      'Managed Identities — no passwords',
      'Geo-redundancy for Service Bus and Storage',
      'Alert Rules with Action Groups (Email, Teams, PagerDuty)',
      'Resource Locks — prevent accidental deletion',
      'Compliance: Azure Policy Guardrails enforce standards',
      'PIM for admin access (Just-in-Time, time-limited)',
    ],
    sizing: 'WS2/WS3 (Logic Apps), Premium (APIM), Premium (Service Bus)',
  },
];

export const envComparisonEn = [
  {
    label: 'Purpose',
    dev: 'Development & Debugging',
    test: 'Integration & UAT',
    prod: 'Live Operations',
  },
  {
    label: 'VNET / Private Endpoints',
    dev: 'Optional',
    test: 'Yes',
    prod: 'Required',
  },
  {
    label: 'Deployment',
    dev: 'Manual / Feature Branch',
    test: 'CI/CD Pipeline',
    prod: 'CI/CD + Approval Gate',
  },
  {
    label: 'Data',
    dev: 'Test data',
    test: 'Anonymized data',
    prod: 'Production data',
  },
  {
    label: 'Developer Access',
    dev: 'Contributor',
    test: 'Reader (CI/CD deployed)',
    prod: 'No direct access',
  },
  { label: 'APIM Tier', dev: 'Developer', test: 'Standard', prod: 'Premium' },
  {
    label: 'Service Bus Tier',
    dev: 'Basic',
    test: 'Standard',
    prod: 'Premium',
  },
  { label: 'Logic Apps Plan', dev: 'WS1', test: 'WS2', prod: 'WS2 / WS3' },
  {
    label: 'Monitoring',
    dev: 'Debug Traces',
    test: 'E2E Tracing',
    prod: 'Alerting + Dashboards',
  },
  {
    label: 'Security',
    dev: 'Basic',
    test: 'Production-like',
    prod: 'Full (PIM, Policy, Locks)',
  },
];

export const promotionFlowEn = [
  { label: 'Feature Branch', sub: 'Developer', color: '#6B7280' },
  { label: 'DEV', sub: 'Auto-Deploy', color: '#F59E0B' },
  { label: 'Pull Request', sub: 'Code Review', color: '#6B7280' },
  { label: 'TEST', sub: 'CI/CD Pipeline', color: '#7C3AED' },
  { label: 'E2E Tests', sub: 'Automated', color: '#6B7280' },
  { label: 'Approval', sub: 'Release Manager', color: '#DC2626' },
  { label: 'PROD', sub: 'Slot Swap', color: '#10B981' },
];
