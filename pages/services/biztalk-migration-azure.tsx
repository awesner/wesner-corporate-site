import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Divider,
  Link as MuiLink,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess, OpenInNew } from '@mui/icons-material';
import { BaseLayout } from '@components/layouts/base-layout';
import ContactUs from 'components/shared/contact-us/contact-us';
import {
  IntegrationEnvContent,
  EnterprisePlatformContent,
  MigrationExamplesContent,
  CutoverContent,
  DevProcessContent,
  GitBranchingContent,
  CiCdAzureContent,
  CiCdDevOpsContent,
  TestingContent,
  MonitoringContent,
  ExceptionHandlingContent,
  SecurityContent,
  PricingContent,
  ProjectMgmtContent,
} from '@components/features/biztalk-migration/all-topics-content';
import {
  de as i18nDe,
  en as i18nEn,
  BizTalkI18n,
  servicesEn,
  strategiesEn,
  requirementsEn,
  phasesEn,
  biztalkMappingEn,
  onPremVsCloudEn,
  sixRsEn,
  environmentsEn,
  envComparisonEn,
  promotionFlowEn,
} from 'data/biztalk-migration-i18n';

/* ─── Daten aus AzureArchitecture.jsx ─── */

interface AisService {
  name: string;
  short: string;
  color: string;
  role: string;
  desc: string;
  features: string[];
  biztalk: string;
  useCases: string[];
  connections: { target: string; desc: string; direction: string }[];
  tiers: string[];
  keyConfig: string[];
}

const services: Record<string, AisService> = {
  logicApps: {
    name: 'Azure Logic Apps (Standard)',
    short: 'Logic Apps',
    color: '#0080FF',
    role: 'Workflow-Orchestrierung',
    desc: 'Serverlose Workflow-Engine für Business-Prozesse. Orchestriert Aufrufe zwischen Systemen, transformiert Nachrichten, implementiert Content-Based Routing und komplexe EAI-Patterns. 400+ vorgefertigte Connectors.',
    features: [
      'Visual Workflow Designer',
      '400+ Connectors (SAP, SF, etc.)',
      'Stateful & Stateless Workflows',
      'B2B: EDI, AS2, X12',
      'XSLT / Liquid Transformations',
      'Integration Account',
    ],
    biztalk: 'Ersetzt: BizTalk Orchestrations, Maps, Pipelines, BRE',
    useCases: [
      'SFTP-Datei empfangen → Parsen → Transformieren → an Backend senden',
      'Content-Based Routing: Nachricht je nach Inhalt an verschiedene Ziele',
      'Scheduled Batch-Verarbeitung: Timer → SQL Query → Generiere Reports',
      'B2B/EDI: AS2 Empfang → X12 Decode → Verarbeitung → AS2 Antwort',
      'Long-Running Approval Workflows mit Human-in-the-Loop',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'Empfängt Requests von APIM als Backend',
        direction: 'in',
      },
      {
        target: 'Functions',
        desc: 'Ruft Azure Functions für Custom-Logik auf (XSLT, Parsing)',
        direction: 'out',
      },
      {
        target: 'Service Bus',
        desc: 'Sendet/empfängt Messages via Service Bus Connector',
        direction: 'both',
      },
      {
        target: 'Event Grid',
        desc: 'Trigger: Reagiert auf Events (BlobCreated, etc.)',
        direction: 'in',
      },
      {
        target: 'Key Vault',
        desc: 'Connection Strings und Secrets über Managed Identity',
        direction: 'in',
      },
      {
        target: 'Monitoring',
        desc: 'Run History und Traces an Application Insights',
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
      'Integration Account für Schemas, Maps, Partner, Agreements',
      'VNET Integration für Private Endpoints',
      'Deployment Slots für Zero-Downtime Updates',
    ],
  },
  serviceBus: {
    name: 'Azure Service Bus',
    short: 'Service Bus',
    color: '#00B7C3',
    role: 'Enterprise Messaging',
    desc: 'Enterprise Message Broker für zuverlässige asynchrone Kommunikation. Garantierte Zustellung (At-Least-Once), Dead-Letter Queues, Sessions, Scheduled Delivery. Entkoppelt Sender und Empfänger zeitlich und räumlich.',
    features: [
      'Queues & Topics/Subscriptions',
      'Dead-Letter Queue (DLQ)',
      'Sessions & FIFO',
      'Duplicate Detection',
      'Scheduled Delivery',
      'Message TTL & Auto-Forward',
    ],
    biztalk:
      'Ersetzt: BizTalk MessageBox (Publish/Subscribe), SB-Messaging Adapter',
    useCases: [
      'Asynchrone Entkopplung: Logic App publiziert Message, Consumer verarbeitet unabhängig',
      'Fan-Out: Topic mit mehreren Subscriptions für parallele Verarbeitung',
      'Retry & Dead-Letter: Fehlgeschlagene Messages landen in DLQ zur Analyse',
      'Ordered Processing: Sessions garantieren FIFO pro Session-ID',
      'Scheduled Delivery: Messages zu bestimmtem Zeitpunkt zustellen (z.B. Batch um 06:00)',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Trigger: Logic App reagiert auf neue Messages in Queue/Subscription',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Service Bus Trigger startet Function bei neuer Message',
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
      'Basic (nur Queues)',
      'Standard (Topics + Queues)',
      'Premium (VNET, Dedicated, Geo-DR)',
    ],
    keyConfig: [
      'Queues: Point-to-Point, ein Consumer pro Message',
      'Topics/Subscriptions: Pub/Sub, Filter Rules pro Subscription',
      'Dead-Letter Queue: Max Delivery Count, TTL Expiry',
      'Duplicate Detection Window (z.B. 10 Minuten)',
      'Geo-Disaster Recovery: Paired Namespaces',
    ],
  },
  apim: {
    name: 'Azure API Management',
    short: 'API Management',
    color: '#0078D4',
    role: 'API Gateway & Fassade',
    desc: 'Zentrale Eingangsschicht für alle API-Aufrufe. Authentifizierung (OAuth2, Subscription Keys), Rate Limiting, Request/Response Transformation, Caching, Developer Portal. Entkoppelt Consumer von Backend-Implementierung.',
    features: [
      'OAuth2 / API Key Auth',
      'Rate Limiting & Throttling',
      'Request Transformation',
      'Developer Portal',
      'Monitoring & Analytics',
      'Policy Engine',
    ],
    biztalk: 'Ersetzt: BizTalk Receive/Send Ports (HTTP), WCF-Adapter',
    useCases: [
      'Einheitlicher API-Eingang für alle Consumer (Web, Mobile, Partner)',
      'Versionierung: /v1/, /v2/ parallel betreiben ohne Backend-Änderung',
      'Token-Austausch: Consumer sendet API Key, APIM holt intern OAuth2 Token',
      'Response-Caching für häufig abgefragte Referenzdaten',
      'Monetarisierung: Verschiedene Subscription-Tiers (Basic, Premium)',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'APIM leitet validierte Requests an Logic App Workflows weiter (Backend-URL)',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Direkte Integration für leichtgewichtige API-Endpoints',
        direction: 'out',
      },
      {
        target: 'Entra ID',
        desc: 'OAuth2 Token-Validation über validate-jwt Policy',
        direction: 'in',
      },
      {
        target: 'Key Vault',
        desc: 'Named Values referenzieren Key Vault Secrets (API Keys, Certificates)',
        direction: 'in',
      },
      {
        target: 'Monitoring',
        desc: 'Diagnostic Logs und Metrics an Application Insights',
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
      'Products & Subscriptions definieren Zugriffs-Policies',
      'Policies: Inbound → Backend → Outbound → On-Error',
      'Backends: URL + Circuit Breaker + Load Balancing',
      'Custom Domains & TLS Certificates',
      'Self-hosted Gateway für Hybrid-Szenarien',
    ],
  },
  eventGrid: {
    name: 'Azure Event Grid',
    short: 'Event Grid',
    color: '#7C3AED',
    role: 'Event Routing',
    desc: 'Serverloser Event-Broker für reaktive Architekturen. Routet Events von Azure-Services (Blob Created, Resource Changed) und Custom Sources an Handler. Push-basiert, hoher Durchsatz, Sub-Sekunden Latenz.',
    features: [
      'Push-based Event Delivery',
      'Event Filtering & Routing',
      'Azure-native Event Sources',
      'Custom Topics',
      'Dead-Letter & Retry',
      'CloudEvents Schema',
    ],
    biztalk: 'Ersetzt: BizTalk File/FTP Polling, Event-basierte Trigger',
    useCases: [
      'Datei-Upload: BlobCreated Event triggert Logic App Workflow',
      'Resource-Änderungen: VM Created/Deleted → Compliance-Check',
      'Custom Events: Eigene Applikation publiziert Business-Events',
      'Reaktive Architektur: Events statt Polling (kein unnötiger Ressourcenverbrauch)',
      'Fan-Out: Ein Event → mehrere Subscriber (Logic App + Function + Storage Queue)',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Event Grid Trigger startet Logic App Workflow',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Event Grid Trigger startet Azure Function',
        direction: 'out',
      },
      {
        target: 'Service Bus',
        desc: 'Events an Service Bus Queue/Topic weiterleiten',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Delivery Metrics und Failed Events',
        direction: 'out',
      },
    ],
    tiers: [
      'Per Event Pricing (erste 100K Events/Monat kostenlos)',
      'Namespaces (Preview, Pull-basiert)',
    ],
    keyConfig: [
      'System Topics: Azure-native Events (Storage, Resource Group, etc.)',
      'Custom Topics: Eigene Event-Quellen registrieren',
      'Event Subscriptions mit Subject-Filter und Advanced Filters',
      'Retry Policy: Max Attempts + Event TTL',
      'Dead-Letter Destination: Blob Storage für fehlgeschlagene Events',
    ],
  },
  functions: {
    name: 'Azure Functions',
    short: 'Functions',
    color: '#F5A623',
    role: 'Custom Code / Serverless Compute',
    desc: 'Serverlose Compute-Plattform für Custom-Logik. XSLT/Liquid Transformationen, Daten-Validierung, Lookups, Enrichment. Ergänzt Logic Apps wo deklarative Workflows nicht ausreichen.',
    features: [
      'Event-Triggered Execution',
      '.NET, Python, Java, Node.js',
      'Durable Functions (Orchestration)',
      'Bindings (Blob, Queue, HTTP)',
      'Auto-Scaling',
      'VNET Integration',
    ],
    biztalk: 'Ersetzt: BizTalk Custom Pipeline Components, Helper Classes',
    useCases: [
      'XSLT/Liquid Transformation: Logic App ruft Function mit Payload auf',
      'PGP Encrypt/Decrypt: Schlüssel aus Key Vault, Ver-/Entschlüsselung in Function',
      'CSV/Flat File Parsing: Custom Parser für spezielle Formate',
      'Database Lookup & Enrichment: SQL Query, Ergebnis an Logic App zurück',
      'Durable Functions: Komplexe Orchestrierung mit Fan-Out/Fan-In Pattern',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Logic App ruft Function über HTTP Trigger auf',
        direction: 'in',
      },
      {
        target: 'Service Bus',
        desc: 'Service Bus Trigger startet Function',
        direction: 'in',
      },
      {
        target: 'Event Grid',
        desc: 'Event Grid Trigger startet Function',
        direction: 'in',
      },
      {
        target: 'Key Vault',
        desc: 'Managed Identity liest Secrets (PGP Keys, Connection Strings)',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Traces und Custom Metrics an Application Insights',
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
      'Durable Functions für Stateful Orchestrations',
      'Deployment Slots für Blue/Green Deployments',
      'Application Settings über Key Vault References',
    ],
  },
  dataFactory: {
    name: 'Azure Data Factory',
    short: 'Data Factory',
    color: '#E91E8C',
    role: 'Datenintegration & ETL',
    desc: 'Cloud-basierter ETL/ELT-Service für Datenintegration im großen Maßstab. Erstellt datengesteuerte Workflows zum Orchestrieren und Automatisieren von Datenbewegungen und Datentransformationen.',
    features: [
      '90+ Datenquellen-Connectors',
      'Data Flows (visuelle ETL)',
      'Copy Activity (Datenbewegung)',
      'Pipeline Orchestration',
      'Integration Runtime (Cloud/Self-hosted)',
      'Mapping Data Flows',
    ],
    biztalk:
      'Ergänzt: BizTalk Batch-Processing, Flat File Import, Datenbank-Integrationen',
    useCases: [
      'Batch-Datenladungen: CSV/Excel aus Blob Storage → SQL Database transformieren',
      'Daten-Migration: On-Premises SQL Server → Azure SQL / Data Lake',
      'Scheduled ETL: Tägliche Daten-Synchronisation zwischen Systemen',
      'Data Lake Ingestion: Rohdaten aus verschiedenen Quellen zentralisieren',
      'Hybrid-Integration: On-Premises Datenquellen über Self-hosted Integration Runtime anbinden',
    ],
    connections: [
      {
        target: 'Logic Apps',
        desc: 'Data Factory Pipeline kann Logic App Workflow triggern',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Custom Activities rufen Azure Functions auf',
        direction: 'out',
      },
      {
        target: 'Service Bus',
        desc: 'Daten an Service Bus Queue senden nach Verarbeitung',
        direction: 'out',
      },
      {
        target: 'Event Grid',
        desc: 'Pipeline Events triggern nachgelagerte Prozesse',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Pipeline Runs und Activity Logs an Monitor',
        direction: 'out',
      },
    ],
    tiers: [
      'Data Factory V2 (Pay-per-Use)',
      'Managed VNET Integration Runtime',
      'SSIS Integration Runtime',
    ],
    keyConfig: [
      'Pipelines: Logische Gruppierung von Activities',
      'Linked Services: Verbindungen zu Datenquellen und -zielen',
      'Datasets: Schema-Definition der Daten',
      'Integration Runtime: Cloud, Self-hosted oder Azure-SSIS',
      'Triggers: Schedule, Tumbling Window, Event-basiert',
    ],
  },
  keyvault: {
    name: 'Azure Key Vault',
    short: 'Key Vault',
    color: '#DC2626',
    role: 'Secret & Certificate Management',
    desc: 'Zentraler Tresor für Secrets, Zertifikate und Encryption Keys. APIM Named Values, Logic App Connection Strings, Function App Settings — alle Credentials werden hier verwaltet und automatisch rotiert.',
    features: [
      'Secret Management',
      'Certificate Storage',
      'Key Rotation',
      'RBAC Access Policies',
      'Managed Identity Integration',
      'Audit Logging',
    ],
    biztalk: 'Ersetzt: BizTalk SSO (Enterprise Single Sign-On)',
    useCases: [
      'SFTP Credentials: Username/Password/SSH Keys für SFTP Connectors',
      'PGP Keys: Private/Public Keys für Verschlüsselung in Azure Functions',
      'TLS Zertifikate: Custom Domains für APIM und Logic Apps',
      'Connection Strings: SQL, Service Bus, Storage — zentral und rotierbar',
      'API Keys: Partner-API-Schlüssel sicher verwalten und referenzieren',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'Named Values referenzieren Key Vault Secrets',
        direction: 'out',
      },
      {
        target: 'Logic Apps',
        desc: 'Connector-Credentials über Managed Identity',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'App Settings als Key Vault References (@Microsoft.KeyVault(...))',
        direction: 'out',
      },
      {
        target: 'Entra ID',
        desc: 'RBAC und Managed Identity für Zugriffskontrolle',
        direction: 'in',
      },
      {
        target: 'Monitoring',
        desc: 'Audit Logs: Wer hat wann welches Secret gelesen?',
        direction: 'out',
      },
    ],
    tiers: [
      'Standard (Software-Protected Keys)',
      'Premium (HSM-Protected Keys)',
    ],
    keyConfig: [
      'Access Policies vs. RBAC (empfohlen: RBAC)',
      'Soft-Delete und Purge Protection (versehentliches Löschen verhindern)',
      'Secret Rotation: Event Grid Event bei Expiry-Nähe',
      'Private Endpoint: Kein Public Access',
      'Diagnostic Settings: Audit Logs an Log Analytics',
    ],
  },
  monitor: {
    name: 'Application Insights / Monitor',
    short: 'Monitoring',
    color: '#10B981',
    role: 'Observability & Alerting',
    desc: 'End-to-End Monitoring über alle Integration Services. Distributed Tracing, Custom Metrics, Log Analytics, Alerting. Korreliert Requests über APIM → Logic App → Service Bus → Function.',
    features: [
      'Distributed Tracing',
      'Log Analytics (KQL)',
      'Custom Dashboards',
      'Alert Rules & Action Groups',
      'Workbooks & Reports',
      'Cost Analysis',
    ],
    biztalk: 'Ersetzt: BizTalk Admin Console, HAT, Event Log',
    useCases: [
      'Distributed Tracing: Request über APIM → Logic App → Function → Service Bus verfolgen',
      'Alerting: E-Mail/Teams-Benachrichtigung bei Fehlerquote > 5%',
      'KQL-Queries: Analyse von Fehler-Patterns über Zeiträume',
      'Dashboards: Business-KPIs (Messages/Tag, Erfolgsquote, Latenz)',
      'Cost Analysis: Kosten pro Integration-Flow aufschlüsseln',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'Request/Response Logs, Latenz, Error Rates',
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
      'Commitment Tiers (Rabatte ab 100 GB/Tag)',
    ],
    keyConfig: [
      'Log Analytics Workspace: Zentrale Datensenke',
      'Diagnostic Settings auf allen AIS-Ressourcen aktivieren',
      'Alert Rules: Metric Alerts + Log Alerts + Activity Log Alerts',
      'Action Groups: E-Mail, SMS, Teams, Logic App Webhook',
      'Workbooks: Wiederverwendbare Dashboard-Templates',
    ],
  },
  entraId: {
    name: 'Microsoft Entra ID',
    short: 'Entra ID',
    color: '#1565C0',
    role: 'Identity & Access',
    desc: 'Identity Provider für OAuth2/OIDC. App Registrations für API-Consumer und Backend-Services, Managed Identities eliminieren Passwörter zwischen Azure-Services, Conditional Access Policies.',
    features: [
      'OAuth2 Client Credentials',
      'Managed Identity',
      'App Registrations & Roles',
      'Conditional Access',
      'Service Principal',
      'Token Validation',
    ],
    biztalk: 'Ersetzt: BizTalk Windows Auth, Custom Auth Adapters',
    useCases: [
      'API-Consumer Authentifizierung: App Registration + Client Credentials Grant',
      'Managed Identity: Logic App greift ohne Passwort auf Key Vault / SQL zu',
      'Rollenbasierter Zugriff: App Roles definieren wer welche API-Operationen nutzen darf',
      'Conditional Access: Zugriff nur aus bestimmten IP-Ranges oder mit MFA',
      'Service-to-Service: Backend-Services authentifizieren sich gegenseitig via Bearer Token',
    ],
    connections: [
      {
        target: 'APIM',
        desc: 'validate-jwt Policy prüft OAuth2 Tokens',
        direction: 'out',
      },
      {
        target: 'Logic Apps',
        desc: 'Managed Identity für Connector-Authentifizierung',
        direction: 'out',
      },
      {
        target: 'Functions',
        desc: 'Managed Identity + EasyAuth für Function-Zugriff',
        direction: 'out',
      },
      {
        target: 'Key Vault',
        desc: 'RBAC: Welche Identität darf welche Secrets lesen?',
        direction: 'out',
      },
      {
        target: 'Monitoring',
        desc: 'Sign-in Logs und Audit Logs',
        direction: 'out',
      },
    ],
    tiers: [
      'Free (Basis-Features)',
      'P1 (Conditional Access, PIM)',
      'P2 (Identity Protection, Access Reviews)',
    ],
    keyConfig: [
      'App Registration: Redirect URIs, API Permissions, Certificates/Secrets',
      'Managed Identity: System-Assigned (pro Ressource) vs. User-Assigned (geteilt)',
      'App Roles: Definiert in App Registration, zugewiesen an Service Principals',
      'Token Lifetime: Default vs. Custom Policies',
      'Enterprise Application: Consent und User Assignment',
    ],
  },
};

const mainComponentIds = [
  'logicApps',
  'serviceBus',
  'apim',
  'eventGrid',
  'functions',
  'dataFactory',
];

/* ─── F2: Migration Daten ─── */

const strategies = [
  {
    name: 'Lift & Shift',
    color: '#F59E0B',
    desc: '1:1 Nachbau der bestehenden BizTalk-Logik in Azure Integration Services. Gleicher Datenfluss, gleiche Formate, gleiche Schnittstellen.',
    pros: [
      'Schnelle Migration — minimaler Analyseaufwand',
      'Geringes Risiko — bewährte Logik wird übernommen',
      'Business-Unterbrechung minimal',
      'Gut geeignet für einfache File-Transfers (FILE → SFTP)',
    ],
    cons: [
      'Legacy-Patterns bleiben erhalten (z.B. Polling statt Event-Driven)',
      'Keine Optimierung der Prozesse',
      'Technische Schulden werden mitgenommen',
      'Möglicherweise nicht alle BizTalk-Features 1:1 abbildbar',
    ],
    bestFor:
      'Einfache Pass-Through Integrationen, File-Transfers, zeitkritische Migrationen',
  },
  {
    name: 'Prozessanalyse & Native Entwicklung',
    color: '#10B981',
    desc: 'Bestehende Prozesse werden analysiert, optimiert und cloud-nativ in Azure neu entwickelt. Event-Driven, resilient, skalierbar.',
    pros: [
      'Cloud-native Architektur — Event-Driven statt Polling',
      'Prozessoptimierung — unnötige Schritte eliminieren',
      'Bessere Skalierbarkeit und Resilienz',
      'Zukunftssicher — kein technischer Ballast',
      'Chance für Standardisierung über alle Integrationen',
    ],
    cons: [
      'Höherer initialer Aufwand (Analyse + Design + Entwicklung)',
      'Fachbereich muss Anforderungen validieren',
      'Längere Time-to-Production pro Applikation',
    ],
    bestFor:
      'Komplexe Orchestrierungen, Business-kritische Prozesse, Integrationen mit Optimierungspotential',
  },
];

const requirements = [
  {
    title: 'Zugriff auf BizTalk Umgebung mit Visual Studio',
    desc: 'Vollständiger Zugriff auf die bestehende BizTalk Server Umgebung inkl. Visual Studio mit BizTalk Developer Tools.',
    details: [
      'Remote Desktop oder VPN-Zugang zum BizTalk Server',
      'Visual Studio mit BizTalk Developer Tools installiert',
      'Zugriff auf alle BizTalk Applications (Orchestrations, Schemas, Maps, Pipelines)',
      'BizTalk Admin Console — Übersicht aller Receive/Send Ports',
      'Binding Files exportieren (Environment-spezifische Konfigurationen)',
      'Zugriff auf Custom Pipeline Components und Helper-Assemblies (Source Code)',
    ],
    output:
      'Vollständiges Inventar aller BizTalk-Artefakte, Abhängigkeiten und Konfigurationen pro Applikation.',
  },
  {
    title: 'Zugriff auf Jira / Confluence',
    desc: 'Zugriff auf bestehende Dokumentation, Tickets und Wissensartikel rund um die BizTalk-Integrationen.',
    details: [
      'Confluence: Bestehende Architektur-Dokumentation und Runbooks',
      'Jira: Offene Issues / Known Bugs in bestehenden Integrationen',
      'Jira: Change History — welche Änderungen wurden zuletzt durchgeführt',
      'Kontaktpersonen / Verantwortliche pro Integration identifizieren',
      'SLA-Dokumentation: Welche Integrationen haben welche Verfügbarkeitsanforderungen',
    ],
    output:
      'Business-Kontext und Anforderungen pro Integration, Priorisierung nach Business Impact.',
  },
  {
    title: 'Auflistung / Architektur der verbundenen Systeme',
    desc: 'Komplette Übersicht welche Quell- und Zielsysteme aktuell über BizTalk verbunden werden.',
    details: [
      'System-Landkarte: Alle Systeme die mit BizTalk kommunizieren (SAP, SFTP-Partner, Datenbanken, MQ)',
      'Pro System: Protokoll (SFTP, MQ, SQL, REST, SOAP), Datenformat (CSV, XML, Flat File, JSON)',
      'Datenfluss-Richtung: Inbound, Outbound oder Bidirektional',
      'Netzwerk-Topologie: On-Premises, extern (Partner), Cloud',
      'Firewall-Regeln und Netzwerk-Freigaben',
      'Credentials und Zertifikate: Auth-Methoden pro Verbindung',
    ],
    output:
      'Abhängigkeits-Matrix und Netzwerk-Diagramm als Basis für die Azure-Architekturplanung.',
  },
  {
    title: 'Festlegung Migrationsstrategie pro Applikation',
    desc: 'Gemeinsame Entscheidung ob jede BizTalk-Applikation per Lift & Shift oder über eine Native-Neuentwicklung migriert wird.',
    details: [
      'Pro Applikation bewerten: Komplexität, Business-Kritikalität, Änderungshäufigkeit',
      'Lift & Shift: 1:1 Nachbau in Logic Apps — schnell, minimales Risiko',
      'Native Neuentwicklung: Prozessanalyse → optimiertes Design in Azure',
      'Kriterien für die Entscheidung gemeinsam definieren',
      'Abhängigkeiten zwischen Applikationen berücksichtigen',
      'Parallel-Betrieb planen: BizTalk und Azure gleichzeitig',
    ],
    output:
      'Migrationsstrategie-Matrix: Jede Applikation mit zugewiesener Strategie und Priorisierung.',
  },
  {
    title: 'Zugriff & Tooling',
    desc: 'Voraussetzungen für die Entwicklungsphase: Zugriff auf Azure-Umgebung und Festlegung der Entwicklungswerkzeuge.',
    details: [
      'Zugriff auf MS Azure Subscription mit Contributor-Berechtigungen',
      'Visual Studio oder Visual Studio Code als Entwicklungsumgebung',
      'Azure DevOps oder GitHub für Source Control und CI/CD Pipelines',
      'Git Branching-Konzept festlegen',
      'Zugang zu Test-Systemen der Partner',
      'Test-Daten (anonymisiert) für Integration-Tests',
    ],
    output:
      'Entwicklungsumgebung eingerichtet, Tooling festgelegt, Zugriff auf alle relevanten Systeme gesichert.',
  },
  {
    title: 'Deployment',
    desc: 'Entwicklungs- und Deployment-Prozess für Azure Logic Apps und weitere Integration Services.',
    details: [
      'Logic Apps werden im Azure Entwicklungsportal entwickelt',
      'Workflows mit Azure CLI in das Git-Repository herunterladen',
      'Versionierung und Code Review über Git (Pull Requests)',
      'CI/CD Pipeline deployt aus Git in die Zielumgebungen (DEV → TEST → PROD)',
      'Infrastructure as Code (Bicep Templates)',
      'Deployment Slots für Zero-Downtime Updates',
    ],
    output:
      'Definierter Deployment-Prozess von der Entwicklung bis zum automatisierten Rollout über CI/CD.',
  },
];

const phases = [
  {
    id: 'analyse',
    title: 'Analyse-Phase',
    color: '#F59E0B',
    subtitle: 'Bestandsaufnahme und Bewertung aller BizTalk-Integrationen',
    goal: 'Vollständiges Verständnis der bestehenden Integrationslandschaft als Grundlage für die Migrationsplanung.',
    tasks: [
      {
        title: 'BizTalk Inventar erstellen',
        desc: 'Alle Applications, Orchestrations, Schemas, Maps, Pipelines und Custom Components erfassen.',
      },
      {
        title: 'Datenflüsse dokumentieren',
        desc: 'Pro Integration: Quelle → Transformation → Ziel, Protokolle, Formate, Frequenz und Datenvolumen.',
      },
      {
        title: 'Abhängigkeiten analysieren',
        desc: 'Welche Systeme kommunizieren über BizTalk? Netzwerk-Topologie, Firewall-Regeln identifizieren.',
      },
      {
        title: 'Komplexität bewerten',
        desc: 'Jede Applikation nach Komplexität, Business-Kritikalität und Änderungshäufigkeit klassifizieren.',
      },
      {
        title: 'Migrationsstrategie festlegen',
        desc: 'Pro Applikation entscheiden: Lift & Shift, Native Neuentwicklung oder Retire/Replace.',
      },
      {
        title: 'Migrationsreihenfolge definieren',
        desc: 'Abhängigkeiten berücksichtigen, Quick Wins identifizieren, Pilot-Applikation auswählen.',
      },
    ],
    deliverables: [
      'BizTalk Artefakt-Inventar (komplett)',
      'System-Abhängigkeits-Matrix',
      'Migrationsstrategie-Matrix pro Applikation',
      'Priorisierte Migrationsreihenfolge',
      'Risiko-Assessment',
    ],
  },
  {
    id: 'entwicklung',
    title: 'Entwicklung',
    color: '#3B82F6',
    subtitle: 'Aufbau der Azure-Plattform und Migration der Integrationen',
    goal: 'Schrittweise Migration der BizTalk-Integrationen nach Azure Integration Services — beginnend mit einer Pilot-Applikation.',
    tasks: [
      {
        title: 'Resource Groups erstellen',
        desc: 'Azure Landing Zone mit Resource Groups für DEV, TEST, PROD inkl. VNET, Private Endpoints, Key Vault und Monitoring.',
      },
      {
        title: 'CI/CD Pipeline aufbauen',
        desc: 'Azure DevOps / GitHub Actions Pipeline für automatisiertes Deployment: Build → Test → DEV → TEST → PROD.',
      },
      {
        title: 'Pilot-Integration entwickeln',
        desc: 'Erste Applikation migrieren (idealerweise Lift & Shift), Patterns etablieren, Lessons Learned sammeln.',
      },
      {
        title: 'Weitere Integrationen migrieren',
        desc: 'Basierend auf der priorisierten Reihenfolge iterativ weitere Applikationen migrieren.',
      },
      {
        title: 'Mapping & Transformation umsetzen',
        desc: 'BizTalk Maps → Logic Apps Transformationen, XSLT-Mappings, Liquid Templates oder Azure Functions.',
      },
      {
        title: 'Error Handling & Retry-Logik',
        desc: 'Fehlerbehandlung, Dead-Letter-Queues, Retry-Policies und Alerting pro Integration implementieren.',
      },
    ],
    deliverables: [
      'Resource Groups (DEV, TEST, PROD) eingerichtet',
      'CI/CD Pipeline (vollständig automatisiert)',
      'Migrierte Integrationen (iterativ)',
      'Bicep Templates (Infrastructure as Code)',
      'Technische Dokumentation pro Integration',
      'Runbooks für Betrieb und Troubleshooting',
    ],
  },
  {
    id: 'testen',
    title: 'Testen',
    color: '#7C3AED',
    subtitle: 'Qualitätssicherung durch umfassende Tests auf allen Ebenen',
    goal: 'Sicherstellen, dass alle migrierten Integrationen korrekt, performant und zuverlässig funktionieren.',
    tasks: [
      {
        title: 'Unit Tests',
        desc: 'Einzelne Workflow-Schritte und Azure Functions isoliert testen. Mocking von externen Systemen.',
      },
      {
        title: 'Integration Tests',
        desc: 'End-to-End Tests gegen Test-Systeme: Daten senden, Transformation prüfen, Ziel-System validieren.',
      },
      {
        title: 'Regressionsvergleich',
        desc: 'Vergleich der Azure-Outputs mit BizTalk-Outputs — identische Eingaben müssen identische Ergebnisse liefern.',
      },
      {
        title: 'Performance Tests',
        desc: 'Last-Tests unter realistischen Bedingungen: Durchsatz, Latenz, Skalierungsverhalten messen.',
      },
      {
        title: 'Failover & Resilienz Tests',
        desc: 'Verhalten bei Ausfällen testen: Service Bus Down, SFTP nicht erreichbar, Timeout-Szenarien.',
      },
      {
        title: 'User Acceptance Testing (UAT)',
        desc: 'Fachbereich validiert die migrierten Integrationen gegen Business-Anforderungen.',
      },
    ],
    deliverables: [
      'Test-Protokolle pro Integration',
      'Regressionsvergleich BizTalk vs. Azure',
      'Performance-Benchmark Ergebnisse',
      'Offene Defects / Known Issues Liste',
      'UAT Sign-Off durch Fachbereich',
      'Go/No-Go Empfehlung pro Integration',
    ],
  },
  {
    id: 'produktion',
    title: 'Produktion',
    color: '#10B981',
    subtitle: 'Go-Live, Cutover und Übergang in den Regelbetrieb',
    goal: 'Kontrollierter Übergang von BizTalk zu Azure Integration Services mit minimalem Risiko und ohne Business-Unterbrechung.',
    tasks: [
      {
        title: 'Cutover-Plan erstellen',
        desc: 'Detaillierter Plan pro Integration: Zeitfenster, Rollback-Strategie, Verantwortlichkeiten, Kommunikation.',
      },
      {
        title: 'Parallel-Betrieb einrichten',
        desc: 'BizTalk und Azure laufen gleichzeitig — schrittweise Umschaltung des Traffics auf Azure.',
      },
      {
        title: 'DNS / Routing umstellen',
        desc: 'Endpunkte, SFTP-Zugänge, API-URLs auf die neuen Azure-Services umleiten.',
      },
      {
        title: 'Monitoring & Alerting aktivieren',
        desc: 'Application Insights Dashboards, Alert Rules, Action Groups — 24/7 Überwachung.',
      },
      {
        title: 'Hypercare-Phase',
        desc: 'Erhöhte Aufmerksamkeit nach Go-Live: Sofortige Reaktion auf Incidents, tägliche Status-Calls.',
      },
      {
        title: 'BizTalk dekommissionieren',
        desc: 'Nach erfolgreicher Stabilisierung: BizTalk-Applikationen abschalten, Server herunterfahren.',
      },
    ],
    deliverables: [
      'Cutover-Plan (detailliert pro Integration)',
      'Rollback-Runbooks',
      'Monitoring Dashboards (Azure Portal)',
      'Alert Rules mit Eskalationspfaden',
      'Hypercare-Bericht (täglich)',
      'BizTalk Dekommissionierungs-Protokoll',
    ],
  },
];

const biztalkMapping = [
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

const onPremVsCloud = [
  {
    k: 'Infrastruktur',
    biz: 'Eigene Server, VMs, SQL Server, Windows Server Lizenzen',
    az: 'Serverless / PaaS — keine Infrastruktur-Verwaltung',
  },
  {
    k: 'Skalierung',
    biz: 'Vertikal: Grössere Server kaufen, Host Instances hinzufügen',
    az: 'Horizontal: Auto-Scale basierend auf Last, Pay-per-Use',
  },
  {
    k: 'Kosten',
    biz: 'Hohe Fixkosten: Hardware, Lizenzen, Wartung, Personal',
    az: 'Variable Kosten: Pay-per-Execution, keine Vorab-Investition',
  },
  {
    k: 'Updates',
    biz: 'Manuell: CU installieren, Downtime planen, Risiko',
    az: 'Automatisch: Platform Updates von Microsoft, Zero Downtime',
  },
  {
    k: 'Verfügbarkeit',
    biz: 'Eigene HA: SQL Clustering, BizTalk Group, NLB',
    az: 'Built-in HA: 99.95% SLA (Logic Apps), Geo-DR (Service Bus)',
  },
  {
    k: 'Monitoring',
    biz: 'BizTalk Admin Console, HAT, eigene Tools',
    az: 'Application Insights, Log Analytics, Azure Monitor',
  },
  {
    k: 'Deployment',
    biz: 'MSI-Pakete, BizTalk Admin Console, GAC',
    az: 'CI/CD Pipeline, ZIP Deploy, Slot Swap (Zero Downtime)',
  },
];

const sixRs = [
  {
    r: 'Rehost',
    subtitle: 'Lift & Shift',
    desc: '1:1 Nachbau in der Cloud. Gleiche Logik, gleiche Datenflüsse.',
    color: '#F59E0B',
    relevant: true,
  },
  {
    r: 'Replatform',
    subtitle: 'Lift & Optimize',
    desc: 'Migration mit kleineren Cloud-Optimierungen.',
    color: '#3B82F6',
    relevant: true,
  },
  {
    r: 'Re-architect',
    subtitle: 'Cloud Native',
    desc: 'Prozessanalyse und Neuentwicklung mit Cloud-nativen Patterns.',
    color: '#10B981',
    relevant: true,
  },
  {
    r: 'Repurchase',
    subtitle: 'Replace / SaaS',
    desc: 'Ersetzen durch eine fertige SaaS-Lösung.',
    color: '#8B5CF6',
    relevant: false,
  },
  {
    r: 'Retain',
    subtitle: 'Beibehalten',
    desc: 'Vorerst in der bestehenden Umgebung belassen.',
    color: '#6B7280',
    relevant: false,
  },
  {
    r: 'Retire',
    subtitle: 'Abschalten',
    desc: 'Nicht mehr benötigte Integrationen identifizieren und abschalten.',
    color: '#EF4444',
    relevant: true,
  },
];

/* ─── F3: Umgebungen Daten ─── */

const environments = [
  {
    id: 'dev',
    name: 'Entwicklungsumgebung',
    short: 'DEV',
    color: '#F59E0B',
    purpose:
      'Entwicklung und lokales Testen neuer Integrationen und Änderungen.',
    components: [
      {
        name: 'Logic Apps Standard',
        detail: 'Workflow-Entwicklung, lokales Debugging via VS Code + Azurite',
      },
      {
        name: 'Azure Functions',
        detail: 'Custom Code entwickeln und Unit Tests ausführen',
      },
      {
        name: 'Service Bus',
        detail: 'Basic Tier — Queues für lokale Integration-Tests',
      },
      {
        name: 'API Management',
        detail: 'Developer Tier — API-Design, Mocking, Policy-Tests',
      },
      {
        name: 'Key Vault',
        detail: 'Dev-Secrets, Test-Zertifikate, getrennt von Prod',
      },
      {
        name: 'Storage Account',
        detail: 'Blob Storage für Test-Dateien und Workflow-State',
      },
      {
        name: 'Application Insights',
        detail: 'Debugging, Trace-Analyse, Performance-Profiling',
      },
    ],
    characteristics: [
      'Entwickler haben Contributor-Zugriff',
      'Keine VNET-Pflicht (optional für Netzwerk-Tests)',
      'Günstigste SKUs (Developer, Basic, WS1)',
      'Schnelle Iteration: Direkte Deployments ohne Approval',
      'Test-Daten, keine produktiven Daten',
      'Feature Branches → Dev Environment',
    ],
    sizing: 'WS1 (Logic Apps), Developer (APIM), Basic (Service Bus)',
  },
  {
    id: 'test',
    name: 'Testumgebung',
    short: 'TEST',
    color: '#7C3AED',
    purpose:
      'Integration-Tests, End-to-End-Tests und User Acceptance Testing (UAT) unter produktionsnahen Bedingungen.',
    components: [
      {
        name: 'Logic Apps Standard',
        detail: 'Produktionsnahe Workflows, E2E-Tests mit echten Connectors',
      },
      {
        name: 'Azure Functions',
        detail: 'Integration-Tests gegen externe Systeme (SFTP, SQL)',
      },
      {
        name: 'Service Bus',
        detail: 'Standard Tier — Topics & Subscriptions wie in Prod',
      },
      {
        name: 'API Management',
        detail: 'Standard Tier — vollständige Policy-Tests, Load Testing',
      },
      { name: 'Key Vault', detail: 'Test-Credentials für Partner-Systeme' },
      {
        name: 'Storage Account',
        detail: 'Produktionsnahe Blob-Struktur mit Test-Daten',
      },
      {
        name: 'Application Insights',
        detail: 'E2E Tracing, Alert-Tests, Dashboard-Validation',
      },
    ],
    characteristics: [
      'Produktionsnahe Konfiguration (gleiche Bicep Templates)',
      'VNET Integration aktiv — Private Endpoints testen',
      'Zugriff nur über CI/CD Pipeline (kein manuelles Deployment)',
      'Test-Partner-Systeme (SFTP Test-Server, Test-APIs)',
      'Anonymisierte / synthetische Test-Daten',
      'Approval Gate vor Promotion zu Prod',
      'Performance- und Last-Tests möglich',
    ],
    sizing: 'WS2 (Logic Apps), Standard (APIM), Standard (Service Bus)',
  },
  {
    id: 'prod',
    name: 'Produktivumgebung',
    short: 'PROD',
    color: '#10B981',
    purpose:
      'Live-Betrieb aller Integrationen mit höchster Verfügbarkeit, Sicherheit und Performance.',
    components: [
      {
        name: 'Logic Apps Standard',
        detail:
          'Alle produktiven Workflows, Deployment Slots für Zero-Downtime',
      },
      {
        name: 'Azure Functions',
        detail: 'Premium Plan — Always Ready, VNET, keine Cold Starts',
      },
      { name: 'Service Bus', detail: 'Premium Tier — Dediziert, VNET, Geo-DR' },
      {
        name: 'API Management',
        detail: 'Premium Tier — VNET, Multi-Region (optional)',
      },
      {
        name: 'Key Vault',
        detail:
          'Premium (HSM) — Produktiv-Secrets, Auto-Rotation, Audit Logging',
      },
      {
        name: 'Storage Account',
        detail: 'GRS — Geo-Redundant, Private Endpoints, Soft Delete',
      },
      {
        name: 'Application Insights',
        detail: 'Vollständiges Monitoring, Alerting, Dashboards, Retention',
      },
    ],
    characteristics: [
      'Vollständige VNET-Isolation — alle Services über Private Endpoints',
      'Deployment nur über CI/CD mit Approval Gate',
      'Managed Identities — keine Passwörter',
      'Geo-Redundanz für Service Bus und Storage',
      'Alert Rules mit Action Groups (E-Mail, Teams, PagerDuty)',
      'Resource Locks — kein versehentliches Löschen',
      'Compliance: Azure Policy Guardrails erzwingen Standards',
      'PIM für Admin-Zugriff (Just-in-Time, zeitlich begrenzt)',
    ],
    sizing: 'WS2/WS3 (Logic Apps), Premium (APIM), Premium (Service Bus)',
  },
];

const envComparison = [
  {
    label: 'Zweck',
    dev: 'Entwicklung & Debugging',
    test: 'Integration & UAT',
    prod: 'Live-Betrieb',
  },
  {
    label: 'VNET / Private Endpoints',
    dev: 'Optional',
    test: 'Ja',
    prod: 'Pflicht',
  },
  {
    label: 'Deployment',
    dev: 'Manuell / Feature Branch',
    test: 'CI/CD Pipeline',
    prod: 'CI/CD + Approval Gate',
  },
  {
    label: 'Daten',
    dev: 'Test-Daten',
    test: 'Anonymisierte Daten',
    prod: 'Produktiv-Daten',
  },
  {
    label: 'Zugriff Entwickler',
    dev: 'Contributor',
    test: 'Reader (CI/CD deployed)',
    prod: 'Kein direkter Zugriff',
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
    dev: 'Basis',
    test: 'Produktionsnah',
    prod: 'Vollständig (PIM, Policy, Locks)',
  },
];

const promotionFlow = [
  { label: 'Feature Branch', sub: 'Entwickler', color: '#6B7280' },
  { label: 'DEV', sub: 'Auto-Deploy', color: '#F59E0B' },
  { label: 'Pull Request', sub: 'Code Review', color: '#6B7280' },
  { label: 'TEST', sub: 'CI/CD Pipeline', color: '#7C3AED' },
  { label: 'E2E Tests', sub: 'Automatisiert', color: '#6B7280' },
  { label: 'Approval', sub: 'Release Manager', color: '#DC2626' },
  { label: 'PROD', sub: 'Slot Swap', color: '#10B981' },
];

/* ─── Themenübersicht — kategorisiert ─── */

interface TopicItem {
  num: number;
  label: string;
  desc?: string;
  tabIndex: number;
  color: string;
}
interface TopicCategory {
  title: string;
  desc?: string;
  color: string;
  items: TopicItem[];
}

function topicCategories(isEn: boolean): TopicCategory[] {
  if (isEn)
    return [
      {
        title: 'Platform & Architecture',
        color: '#0078D4',
        desc: 'Understand Azure Integration Services and its core components.',
        items: [
          {
            num: 1,
            label: 'Azure Integration Services',
            desc: 'iPaaS platform, core components, serverless model',
            tabIndex: 0,
            color: '#0078D4',
          },
          {
            num: 2,
            label: 'Integration Environment & BPT',
            desc: 'Business Process Tracking, Data Explorer',
            tabIndex: 12,
            color: '#0080FF',
          },
          {
            num: 3,
            label: 'Enterprise Integration Platform',
            desc: 'EAI, B2B, API Management, ETL, Hybrid',
            tabIndex: 13,
            color: '#0078D4',
          },
        ],
      },
      {
        title: 'Migration Strategy',
        color: '#DC2626',
        desc: 'From BizTalk Server to Azure — strategies, phases and planning.',
        items: [
          {
            num: 4,
            label: 'BizTalk Migration to Azure',
            desc: 'Lift & Shift vs. Native, phases, BizTalk mapping, 6 Rs',
            tabIndex: 10,
            color: '#DC2626',
          },
          {
            num: 5,
            label: 'Environments (DEV / TEST / PROD)',
            desc: 'Three environments, sizing, promotion flow',
            tabIndex: 11,
            color: '#7C3AED',
          },
          {
            num: 6,
            label: 'Migration Examples',
            desc: 'Lift & Shift, Hybrid, Native, copy-in-to-out, SQL-to-Storage',
            tabIndex: 14,
            color: '#F59E0B',
          },
          {
            num: 7,
            label: 'Cutover Planning',
            desc: 'Parallel operation, rollback strategy, go-live',
            tabIndex: 15,
            color: '#10B981',
          },
        ],
      },
      {
        title: 'Development & DevOps',
        color: '#3B82F6',
        desc: 'Development processes, CI/CD pipelines and quality assurance.',
        items: [
          {
            num: 8,
            label: 'Development Process',
            desc: 'Naming conventions, NFRs, IaC, security standards',
            tabIndex: 16,
            color: '#3B82F6',
          },
          {
            num: 9,
            label: 'GitHub Branching & Staging',
            desc: 'Git Flow, feature branches, Pull Requests',
            tabIndex: 17,
            color: '#6B7280',
          },
          {
            num: 10,
            label: 'CI/CD Azure Integration Services',
            desc: 'ZIP Deploy, Slot Swap, Logic Apps & Functions deployment',
            tabIndex: 18,
            color: '#00B7C3',
          },
          {
            num: 11,
            label: 'CI/CD DevOps',
            desc: 'GitHub Actions vs. Azure DevOps, pipeline anatomy',
            tabIndex: 19,
            color: '#7C3AED',
          },
          {
            num: 12,
            label: 'Test Automation & Integration Testing',
            desc: 'Unit, Integration, E2E, UAT testing pyramid',
            tabIndex: 20,
            color: '#8B5CF6',
          },
        ],
      },
      {
        title: 'Operations & Monitoring',
        color: '#10B981',
        desc: 'Monitoring, error handling and operational excellence.',
        items: [
          {
            num: 13,
            label: 'Monitoring',
            desc: 'Application Insights, Log Analytics, KQL, dashboards',
            tabIndex: 21,
            color: '#10B981',
          },
          {
            num: 14,
            label: 'Exception Handling',
            desc: 'Retry strategies, Dead-Letter Queues, error categories',
            tabIndex: 22,
            color: '#DC2626',
          },
          {
            num: 15,
            label: 'Security',
            desc: '8 security domains, Zero Trust, DORA compliance',
            tabIndex: 23,
            color: '#0F1B2D',
          },
        ],
      },
      {
        title: 'Costs & Project Management',
        color: '#F5A623',
        items: [
          {
            num: 16,
            label: 'Azure Integration Prod Pricing',
            desc: 'Production cost calculation per application',
            tabIndex: 24,
            color: '#F5A623',
          },
          {
            num: 17,
            label: 'Azure Integration Dev/Test Pricing',
            desc: 'Development & test environment costs',
            tabIndex: 25,
            color: '#F5A623',
          },
          {
            num: 18,
            label: 'Project Management & Collaboration',
            desc: 'Phases, team model, tools, DORA compliance',
            tabIndex: 26,
            color: '#3B82F6',
          },
        ],
      },
    ];

  return [
    {
      title: 'Plattform & Architektur',
      color: '#0078D4',
      desc: 'Azure Integration Services verstehen — Komponenten, Architektur und Serverless-Modell.',
      items: [
        {
          num: 1,
          label: 'Azure Integration Services',
          desc: 'iPaaS-Plattform, Kernkomponenten, Serverless-Modell',
          tabIndex: 0,
          color: '#0078D4',
        },
        {
          num: 2,
          label: 'Integration Environment & BPT',
          desc: 'Business Process Tracking, Data Explorer',
          tabIndex: 12,
          color: '#0080FF',
        },
        {
          num: 3,
          label: 'Enterprise Integration Platform',
          desc: 'EAI, B2B, API Management, ETL, Hybrid',
          tabIndex: 13,
          color: '#0078D4',
        },
      ],
    },
    {
      title: 'Migrationsstrategie',
      color: '#DC2626',
      desc: 'Von BizTalk Server zu Azure — Strategien, Phasen und Planung.',
      items: [
        {
          num: 4,
          label: 'BizTalk Migration nach Azure',
          desc: 'Lift & Shift vs. Native, Phasen, BizTalk-Mapping, 6 Rs',
          tabIndex: 10,
          color: '#DC2626',
        },
        {
          num: 5,
          label: 'Umgebungen (DEV / TEST / PROD)',
          desc: 'Drei Umgebungen, Sizing, Promotion Flow',
          tabIndex: 11,
          color: '#7C3AED',
        },
        {
          num: 6,
          label: 'Beispiel Migration',
          desc: 'Lift & Shift, Hybrid, Native, copy-in-to-out, SQL-to-Storage',
          tabIndex: 14,
          color: '#F59E0B',
        },
        {
          num: 7,
          label: 'Cutover-Planung',
          desc: 'Parallelbetrieb, Rollback-Strategie, Go-Live',
          tabIndex: 15,
          color: '#10B981',
        },
      ],
    },
    {
      title: 'Entwicklung & DevOps',
      color: '#3B82F6',
      desc: 'Entwicklungsprozesse, CI/CD-Pipelines und Qualitätssicherung.',
      items: [
        {
          num: 8,
          label: 'Entwicklungsprozess',
          desc: 'Naming Conventions, NFRs, IaC, Security-Standards',
          tabIndex: 16,
          color: '#3B82F6',
        },
        {
          num: 9,
          label: 'GitHub Branching & Staging',
          desc: 'Git Flow, Feature Branches, Pull Requests',
          tabIndex: 17,
          color: '#6B7280',
        },
        {
          num: 10,
          label: 'CI/CD Azure Integration Services',
          desc: 'ZIP Deploy, Slot Swap, Logic Apps & Functions Deployment',
          tabIndex: 18,
          color: '#00B7C3',
        },
        {
          num: 11,
          label: 'CI/CD DevOps',
          desc: 'GitHub Actions vs. Azure DevOps, Pipeline-Anatomie',
          tabIndex: 19,
          color: '#7C3AED',
        },
        {
          num: 12,
          label: 'Testautomatisierung & Integrationstest',
          desc: 'Unit-, Integrations-, E2E-, UAT-Testpyramide',
          tabIndex: 20,
          color: '#8B5CF6',
        },
      ],
    },
    {
      title: 'Betrieb & Monitoring',
      color: '#10B981',
      desc: 'Überwachung, Fehlerbehandlung und operative Exzellenz.',
      items: [
        {
          num: 13,
          label: 'Monitoring',
          desc: 'Application Insights, Log Analytics, KQL, Dashboards',
          tabIndex: 21,
          color: '#10B981',
        },
        {
          num: 14,
          label: 'Exception Handling',
          desc: 'Retry-Strategien, Dead-Letter Queues, Fehler-Kategorien',
          tabIndex: 22,
          color: '#DC2626',
        },
        {
          num: 15,
          label: 'Security',
          desc: '8 Security-Domänen, Zero Trust, DORA-Compliance',
          tabIndex: 23,
          color: '#0F1B2D',
        },
      ],
    },
    {
      title: 'Kosten & Projektmanagement',
      color: '#F5A623',
      items: [
        {
          num: 16,
          label: 'Azure Integration Prod Pricing',
          desc: 'Produktionskosten-Kalkulation pro Applikation',
          tabIndex: 24,
          color: '#F5A623',
        },
        {
          num: 17,
          label: 'Azure Integration Dev/Test Pricing',
          desc: 'Entwicklungs- und Testumgebungs-Kosten',
          tabIndex: 25,
          color: '#F5A623',
        },
        {
          num: 18,
          label: 'Projektmanagement & Zusammenarbeit',
          desc: 'Phasen, Team-Modell, Tools, DORA-Compliance',
          tabIndex: 26,
          color: '#3B82F6',
        },
      ],
    },
  ];
}

/* ─── Sidebar Links ─── */

interface SidebarLink {
  label: string;
  tabIndex: number;
  section?: boolean;
}

function sidebarLinks(isEn: boolean, t: BizTalkI18n): SidebarLink[] {
  if (isEn)
    return [
      { label: 'PLATFORM', tabIndex: -1, section: true },
      { label: 'Overview', tabIndex: 0 },
      { label: 'Logic Apps', tabIndex: 1 },
      { label: 'Service Bus', tabIndex: 2 },
      { label: 'API Management', tabIndex: 3 },
      { label: 'Event Grid', tabIndex: 4 },
      { label: 'Functions', tabIndex: 5 },
      { label: 'Data Factory', tabIndex: 6 },
      { label: 'Key Vault', tabIndex: 7 },
      { label: 'Monitoring (Comp.)', tabIndex: 8 },
      { label: 'Entra ID', tabIndex: 9 },
      { label: 'Integration Env & BPT', tabIndex: 12 },
      { label: 'Enterprise Platform', tabIndex: 13 },
      { label: 'MIGRATION', tabIndex: -1, section: true },
      { label: 'Migration Strategy', tabIndex: 10 },
      { label: 'Environments', tabIndex: 11 },
      { label: 'Migration Examples', tabIndex: 14 },
      { label: 'Cutover Planning', tabIndex: 15 },
      { label: 'DEVELOPMENT', tabIndex: -1, section: true },
      { label: 'Dev Process', tabIndex: 16 },
      { label: 'Git Branching', tabIndex: 17 },
      { label: 'CI/CD Azure', tabIndex: 18 },
      { label: 'CI/CD DevOps', tabIndex: 19 },
      { label: 'Testing', tabIndex: 20 },
      { label: 'OPERATIONS', tabIndex: -1, section: true },
      { label: 'Monitoring', tabIndex: 21 },
      { label: 'Exception Handling', tabIndex: 22 },
      { label: 'Security', tabIndex: 23 },
      { label: 'COSTS', tabIndex: -1, section: true },
      { label: 'Prod Pricing', tabIndex: 24 },
      { label: 'Dev/Test Pricing', tabIndex: 25 },
      { label: 'Project Mgmt', tabIndex: 26 },
    ];
  return [
    { label: 'PLATTFORM', tabIndex: -1, section: true },
    { label: 'Überblick', tabIndex: 0 },
    { label: 'Logic Apps', tabIndex: 1 },
    { label: 'Service Bus', tabIndex: 2 },
    { label: 'API Management', tabIndex: 3 },
    { label: 'Event Grid', tabIndex: 4 },
    { label: 'Functions', tabIndex: 5 },
    { label: 'Data Factory', tabIndex: 6 },
    { label: 'Key Vault', tabIndex: 7 },
    { label: 'Monitoring (Komp.)', tabIndex: 8 },
    { label: 'Entra ID', tabIndex: 9 },
    { label: 'Integration Env & BPT', tabIndex: 12 },
    { label: 'Enterprise Platform', tabIndex: 13 },
    { label: 'MIGRATION', tabIndex: -1, section: true },
    { label: 'Migrationsstrategie', tabIndex: 10 },
    { label: 'Umgebungen', tabIndex: 11 },
    { label: 'Beispiel Migration', tabIndex: 14 },
    { label: 'Cutover-Planung', tabIndex: 15 },
    { label: 'ENTWICKLUNG', tabIndex: -1, section: true },
    { label: 'Entwicklungsprozess', tabIndex: 16 },
    { label: 'Git Branching', tabIndex: 17 },
    { label: 'CI/CD Azure', tabIndex: 18 },
    { label: 'CI/CD DevOps', tabIndex: 19 },
    { label: 'Testing', tabIndex: 20 },
    { label: 'BETRIEB', tabIndex: -1, section: true },
    { label: 'Monitoring', tabIndex: 21 },
    { label: 'Exception Handling', tabIndex: 22 },
    { label: 'Security', tabIndex: 23 },
    { label: 'KOSTEN', tabIndex: -1, section: true },
    { label: 'Prod Pricing', tabIndex: 24 },
    { label: 'Dev/Test Pricing', tabIndex: 25 },
    { label: 'Projektmanagement', tabIndex: 26 },
  ];
}

/* ─── Alle Tabs ─── */
const allTabIds = [
  'overview', // 0
  ...Object.keys(services), // 1-9 (logicApps, serviceBus, apim, eventGrid, functions, dataFactory, keyvault, monitor, entraId)
  'migration', // 10
  'environments', // 11
  'integrationEnv', // 12
  'enterprisePlatform', // 13
  'examples', // 14
  'cutover', // 15
  'devProcess', // 16
  'gitBranching', // 17
  'cicdAzure', // 18
  'cicdDevOps', // 19
  'testing', // 20
  'monitoring', // 21
  'exceptionHandling', // 22
  'security', // 23
  'pricingProd', // 24
  'pricingDevTest', // 25
  'projectMgmt', // 26
];

const references = [
  {
    label: 'Azure Logic Apps Übersicht',
    url: 'https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview',
  },
  {
    label: 'Azure Service Bus Messaging',
    url: 'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview',
  },
  {
    label: 'Azure API Management',
    url: 'https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts',
  },
  {
    label: 'Azure Event Grid Übersicht',
    url: 'https://learn.microsoft.com/en-us/azure/event-grid/overview',
  },
  {
    label: 'Azure Functions Übersicht',
    url: 'https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview',
  },
  {
    label: 'Azure Data Factory Einführung',
    url: 'https://learn.microsoft.com/en-us/azure/data-factory/introduction',
  },
  {
    label: 'Enterprise Integration — Referenzarchitektur',
    url: 'https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/enterprise-integration/basic-enterprise-integration',
  },
  {
    label: 'Azure Key Vault Übersicht',
    url: 'https://learn.microsoft.com/en-us/azure/key-vault/general/overview',
  },
];

/* ─── Komponenten ─── */

function DirectionChip({ direction }: { direction: string }) {
  const map: Record<
    string,
    { label: string; color: 'info' | 'success' | 'warning' }
  > = {
    out: { label: 'OUT', color: 'info' },
    in: { label: 'IN', color: 'success' },
    both: { label: 'BOTH', color: 'warning' },
  };
  const d = map[direction] || map.out;
  return (
    <Chip
      label={d.label}
      color={d.color}
      size="small"
      variant="outlined"
      sx={{ fontSize: '0.7rem', height: 22 }}
    />
  );
}

function ServiceDetail({ svc, t }: { svc: AisService; t?: BizTalkI18n }) {
  const labels = t?.serviceLabels || i18nDe.serviceLabels;
  return (
    <Paper
      variant="outlined"
      sx={{ mt: 3, overflow: 'hidden', borderColor: svc.color + '60' }}
    >
      {/* Header */}
      <Box
        sx={{ px: 4, py: 3, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: svc.color, mb: 0.5 }}
        >
          {svc.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {svc.role}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {svc.desc}
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Features */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              fontWeight="bold"
              color="text.secondary"
            >
              {labels.features}
            </Typography>
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              {svc.features.map((f, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: svc.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2">{f}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* BizTalk + Tiers */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              fontWeight="bold"
              color="text.secondary"
            >
              {labels.biztalkEquiv}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, mb: 3, color: 'warning.main', fontWeight: 500 }}
            >
              {svc.biztalk}
            </Typography>

            <Typography
              variant="overline"
              fontWeight="bold"
              color="text.secondary"
            >
              {labels.tiers}
            </Typography>
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              {svc.tiers.map((t, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2">{t}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Use Cases */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="overline"
            fontWeight="bold"
            sx={{ color: svc.color }}
          >
            {labels.useCases}
          </Typography>
          <Paper variant="outlined" sx={{ mt: 1, p: 2 }}>
            <Stack spacing={1}>
              {svc.useCases.map((uc, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                >
                  <Chip
                    label={i + 1}
                    size="small"
                    sx={{
                      bgcolor: svc.color + '20',
                      color: svc.color,
                      fontWeight: 'bold',
                      minWidth: 28,
                      height: 24,
                    }}
                  />
                  <Typography variant="body2">{uc}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Connections */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="overline"
            fontWeight="bold"
            sx={{ color: svc.color }}
          >
            {labels.connections}
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                    {labels.direction}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                    {labels.service}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {labels.description}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {svc.connections.map((conn, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <DirectionChip direction={conn.direction} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {conn.target}
                    </TableCell>
                    <TableCell>{conn.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Key Config */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="overline"
            fontWeight="bold"
            sx={{ color: svc.color }}
          >
            {labels.keyConfig}
          </Typography>
          <Paper variant="outlined" sx={{ mt: 1, p: 2 }}>
            <Stack spacing={0.5}>
              {svc.keyConfig.map((cfg, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}
                >
                  <Typography
                    sx={{ color: svc.color, fontWeight: 'bold', flexShrink: 0 }}
                  >
                    ›
                  </Typography>
                  <Typography variant="body2">{cfg}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
}

/* ─── Hauptseite ─── */

export default function BizTalkMigrationAzure({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  );

  const isEn = locale === 'en';
  const t: BizTalkI18n = isEn ? i18nEn : i18nDe;
  const svcData = isEn ? servicesEn : services;
  const stratData = isEn ? strategiesEn : strategies;
  const reqData = isEn ? requirementsEn : requirements;
  const phaseData = isEn ? phasesEn : phases;
  const mappingData = isEn ? biztalkMappingEn : biztalkMapping;
  const compareData = isEn ? onPremVsCloudEn : onPremVsCloud;
  const sixRData = isEn ? sixRsEn : sixRs;
  const envData = isEn ? environmentsEn : environments;
  const envCmpData = isEn ? envComparisonEn : envComparison;
  const promoData = isEn ? promotionFlowEn : promotionFlow;

  const currentTabId = activeTab !== null ? allTabIds[activeTab] : null;

  return (
    <BaseLayout>
      <Head>
        <title>{t.hero.title} | Wesner-Softwareentwicklung</title>
        <meta name="description" content={t.hero.subtitle} />
      </Head>

      {/* Hero */}
      <Box
        sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 4, md: 5 } }}
      >
        <Container>
          <Typography
            variant="overline"
            sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 3 }}
          >
            {t.hero.overline}
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            {t.hero.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              maxWidth: 800,
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 400,
            }}
          >
            {t.hero.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Themenübersicht (Landing) — Microsoft Style */}
      {activeTab === null && (
        <Box sx={{ bgcolor: '#f9fafb' }}>
          {/* Quick-Nav Leiste */}
          <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}>
            <Container maxWidth="lg">
              <Box
                sx={{ display: 'flex', gap: 0.5, py: 1.5, overflowX: 'auto' }}
              >
                {topicCategories(isEn).map((cat, ci) => (
                  <Chip
                    key={ci}
                    label={cat.title}
                    size="small"
                    onClick={() => {
                      document
                        .getElementById(`cat-${ci}`)
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                    }}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      bgcolor: 'transparent',
                      border: '1px solid #e5e7eb',
                      '&:hover': {
                        bgcolor: cat.color + '10',
                        borderColor: cat.color,
                      },
                    }}
                  />
                ))}
              </Box>
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            {topicCategories(isEn).map((cat, ci) => (
              <Box
                key={ci}
                id={`cat-${ci}`}
                sx={{ mb: 7, '&:last-child': { mb: 0 }, scrollMarginTop: 80 }}
              >
                {/* Kategorie-Header */}
                <Typography
                  variant="overline"
                  sx={{
                    color: cat.color,
                    fontWeight: 700,
                    letterSpacing: 2,
                    fontSize: '0.7rem',
                  }}
                >
                  {cat.title}
                </Typography>
                {cat.desc && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 2.5, maxWidth: 600 }}
                  >
                    {cat.desc}
                  </Typography>
                )}
                {!cat.desc && <Box sx={{ mb: 2 }} />}

                {/* Topic-Links als kompakte Zeilen */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {cat.items.map((topic) => (
                    <Box
                      key={topic.num}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActiveTab(topic.tabIndex);
                        setSelectedComponent(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActiveTab(topic.tabIndex);
                          setSelectedComponent(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        px: 2.5,
                        py: 2,
                        bgcolor: 'white',
                        borderRadius: 2,
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          borderColor: topic.color,
                          boxShadow: `0 2px 12px ${topic.color}18`,
                          transform: 'translateX(4px)',
                          '& .topic-arrow': {
                            opacity: 1,
                            transform: 'translateX(0)',
                          },
                        },
                      }}
                    >
                      {/* Farb-Indikator */}
                      <Box
                        sx={{
                          width: 4,
                          height: 36,
                          borderRadius: 1,
                          bgcolor: topic.color,
                          flexShrink: 0,
                        }}
                      />

                      {/* Text */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{ lineHeight: 1.3 }}
                        >
                          {topic.label}
                        </Typography>
                        {topic.desc && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ lineHeight: 1.4 }}
                          >
                            {topic.desc}
                          </Typography>
                        )}
                      </Box>

                      {/* Pfeil */}
                      <Box
                        className="topic-arrow"
                        sx={{
                          opacity: 0,
                          transform: 'translateX(-8px)',
                          transition: 'all 0.15s',
                          color: topic.color,
                          fontSize: 18,
                        }}
                      >
                        →
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Container>
        </Box>
      )}

      {/* Layout mit Sidebar-Navigation (nur wenn Thema gewählt) */}
      {activeTab !== null && (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'flex', gap: { xs: 0, md: 4 } }}>
            {/* Sidebar Links */}
            <Box
              component="nav"
              sx={{
                display: { xs: 'none', md: 'block' },
                width: 240,
                flexShrink: 0,
                position: 'sticky',
                top: 24,
                alignSelf: 'flex-start',
                maxHeight: 'calc(100vh - 48px)',
                overflowY: 'auto',
              }}
            >
              {/* Zurück-Link */}
              <Box
                onClick={() => {
                  setActiveTab(null);
                  setSelectedComponent(null);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  cursor: 'pointer',
                  color: 'primary.main',
                  mb: 2,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <ExpandLess
                  sx={{ transform: 'rotate(-90deg)', fontSize: 18 }}
                />
                <Typography variant="body2" fontWeight={600}>
                  {isEn ? 'All topics' : 'Alle Themen'}
                </Typography>
              </Box>

              <Divider sx={{ mb: 1.5 }} />

              {sidebarLinks(isEn, t).map((link, i) => {
                const isActive = activeTab === link.tabIndex;
                const isSection = link.section;
                if (isSection) {
                  return (
                    <Typography
                      key={i}
                      variant="caption"
                      fontWeight="bold"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 2,
                        mb: 0.5,
                        px: 1.5,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                      }}
                    >
                      {link.label}
                    </Typography>
                  );
                }
                return (
                  <Box
                    key={i}
                    onClick={() => {
                      setActiveTab(link.tabIndex);
                      setSelectedComponent(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{
                      px: 1.5,
                      py: 0.8,
                      borderRadius: 1,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      lineHeight: 1.4,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? 'primary.main' : 'text.primary',
                      bgcolor: isActive ? 'primary.main' + '0A' : 'transparent',
                      borderLeft: isActive
                        ? '3px solid'
                        : '3px solid transparent',
                      borderColor: isActive ? 'primary.main' : 'transparent',
                      '&:hover': { bgcolor: 'action.hover' },
                      transition: 'all 0.1s',
                    }}
                  >
                    {link.label}
                  </Box>
                );
              })}
            </Box>

            {/* Mobile: Dropdown statt Sidebar */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                width: '100%',
                mb: 2,
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <IconButton
                  size="small"
                  onClick={() => {
                    setActiveTab(null);
                    setSelectedComponent(null);
                  }}
                >
                  <ExpandLess sx={{ transform: 'rotate(-90deg)' }} />
                </IconButton>
                <Typography variant="body2" fontWeight={600} color="primary">
                  {isEn ? 'All topics' : 'Alle Themen'}
                </Typography>
              </Box>
              <Tabs
                value={activeTab}
                onChange={(_, v) => {
                  setActiveTab(v);
                  setSelectedComponent(null);
                }}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    minHeight: 40,
                    fontSize: '0.8rem',
                  },
                }}
              >
                <Tab label={t.tabs.overview} />
                <Tab label="Logic Apps" />
                <Tab label="Service Bus" />
                <Tab label="API Mgmt" />
                <Tab label="Event Grid" />
                <Tab label="Functions" />
                <Tab label="Data Factory" />
                <Tab label="Key Vault" />
                <Tab label="Monitoring" />
                <Tab label="Entra ID" />
                <Tab label={isEn ? 'Migration' : 'Migration'} />
                <Tab label={isEn ? 'Environments' : 'Umgebungen'} />
              </Tabs>
            </Box>

            {/* Hauptinhalt */}
            <Box
              id="content-top"
              sx={{ flex: 1, minWidth: 0, scrollMarginTop: 80 }}
            >
              {/* ─── ÜBERBLICK TAB ─── */}
              {currentTabId === 'overview' && (
                <>
                  {/* iPaaS Erklärung */}
                  <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                    >
                      {t.f1.ipaasTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f1.ipaasP1}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f1.ipaasP2}
                    </Typography>
                    <Typography variant="body1">{t.f1.ipaasP3}</Typography>
                  </Paper>

                  {/* 6 Kernkomponenten */}
                  <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                      gutterBottom
                    >
                      {t.f1.platformTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f1.platformDesc}
                    </Typography>
                    <Grid container spacing={2}>
                      {mainComponentIds.map((id) => {
                        const s = svcData[id];
                        return (
                          <Grid item xs={12} sm={6} md={4} key={id}>
                            <Card
                              variant="outlined"
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                '&:hover': {
                                  borderColor: s.color,
                                  boxShadow: `0 2px 12px ${s.color}22`,
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <CardActionArea
                                onClick={() => {
                                  const tabIdx = allTabIds.indexOf(id);
                                  if (tabIdx >= 0) {
                                    setActiveTab(tabIdx);
                                    setSelectedComponent(null);
                                    document
                                      .getElementById('content-top')
                                      ?.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                                sx={{ p: 2 }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="bold"
                                  sx={{ color: s.color }}
                                >
                                  {s.short}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {s.role} —{' '}
                                  {s.biztalk
                                    .replace('Ersetzt: ', '')
                                    .replace('Ergänzt: ', '')
                                    .replace('Replaces: ', '')
                                    .replace('Complements: ', '')}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: s.color,
                                    mt: 1,
                                    display: 'block',
                                  }}
                                >
                                  → {isEn ? 'View details' : 'Details anzeigen'}
                                </Typography>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Paper>

                  {/* Serverless Erklärung */}
                  <Paper variant="outlined" sx={{ p: 4, mb: 4, mt: 4 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="secondary.main"
                      gutterBottom
                    >
                      {t.f1.serverlessTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f1.serverlessDesc}
                    </Typography>
                    <Grid container spacing={2}>
                      {t.f1.serverlessItems.map((f, i) => (
                        <Grid item xs={12} md={4} key={i}>
                          <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color="primary"
                              >
                                {f.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                {f.desc}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* Quellen */}
                  <Paper variant="outlined" sx={{ p: 4 }}>
                    <Typography
                      variant="overline"
                      fontWeight="bold"
                      color="text.secondary"
                    >
                      {t.f1.refsTitle}
                    </Typography>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      {references.map((ref, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                          <MuiLink
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            variant="body2"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <OpenInNew sx={{ fontSize: 14 }} />
                            {ref.label}
                          </MuiLink>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </>
              )}

              {/* ─── EINZELNE SERVICE TABS ─── */}
              {currentTabId !== 'overview' &&
                currentTabId !== 'migration' &&
                currentTabId !== 'environments' &&
                ![
                  'integrationEnv',
                  'enterprisePlatform',
                  'examples',
                  'cutover',
                  'devProcess',
                  'gitBranching',
                  'cicdAzure',
                  'cicdDevOps',
                  'testing',
                  'monitoring',
                  'exceptionHandling',
                  'security',
                  'pricingProd',
                  'pricingDevTest',
                  'projectMgmt',
                ].includes(currentTabId || '') &&
                svcData[currentTabId!] && (
                  <ServiceDetail svc={svcData[currentTabId!]} t={t} />
                )}

              {currentTabId === 'integrationEnv' && (
                <IntegrationEnvContent locale={locale} />
              )}
              {currentTabId === 'enterprisePlatform' && (
                <EnterprisePlatformContent locale={locale} />
              )}
              {currentTabId === 'examples' && (
                <MigrationExamplesContent locale={locale} />
              )}
              {currentTabId === 'cutover' && <CutoverContent locale={locale} />}
              {currentTabId === 'devProcess' && (
                <DevProcessContent locale={locale} />
              )}
              {currentTabId === 'gitBranching' && (
                <GitBranchingContent locale={locale} />
              )}
              {currentTabId === 'cicdAzure' && (
                <CiCdAzureContent locale={locale} />
              )}
              {currentTabId === 'cicdDevOps' && (
                <CiCdDevOpsContent locale={locale} />
              )}
              {currentTabId === 'testing' && <TestingContent locale={locale} />}
              {currentTabId === 'monitoring' && (
                <MonitoringContent locale={locale} />
              )}
              {currentTabId === 'exceptionHandling' && (
                <ExceptionHandlingContent locale={locale} />
              )}
              {currentTabId === 'security' && (
                <SecurityContent locale={locale} />
              )}
              {currentTabId === 'pricingProd' && (
                <PricingContent mode="prod" locale={locale} />
              )}
              {currentTabId === 'pricingDevTest' && (
                <PricingContent mode="devtest" locale={locale} />
              )}
              {currentTabId === 'projectMgmt' && (
                <ProjectMgmtContent locale={locale} />
              )}

              {/* ─── F2: MIGRATION TAB ─── */}
              {currentTabId === 'migration' && (
                <>
                  {/* Strategien */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f2.stratTitle}
                  </Typography>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stratData.map((s, i) => (
                      <Grid item xs={12} md={6} key={i}>
                        <Paper
                          variant="outlined"
                          sx={{ height: '100%', overflow: 'hidden' }}
                        >
                          <Box
                            sx={{
                              px: 3,
                              py: 2,
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                              bgcolor: s.color + '10',
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{ color: s.color }}
                            >
                              {s.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {s.desc}
                            </Typography>
                          </Box>
                          <Box sx={{ p: 3 }}>
                            <Typography
                              variant="overline"
                              fontWeight="bold"
                              color="success.main"
                            >
                              {t.phaseLabels.pros}
                            </Typography>
                            <Stack spacing={0.5} sx={{ mt: 0.5, mb: 2 }}>
                              {s.pros.map((p, j) => (
                                <Box
                                  key={j}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      bgcolor: 'success.main',
                                      mt: 1,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography variant="body2">{p}</Typography>
                                </Box>
                              ))}
                            </Stack>
                            <Typography
                              variant="overline"
                              fontWeight="bold"
                              color="error.main"
                            >
                              {t.phaseLabels.cons}
                            </Typography>
                            <Stack spacing={0.5} sx={{ mt: 0.5, mb: 2 }}>
                              {s.cons.map((c, j) => (
                                <Box
                                  key={j}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      bgcolor: 'error.main',
                                      mt: 1,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography variant="body2">{c}</Typography>
                                </Box>
                              ))}
                            </Stack>
                            <Paper
                              variant="outlined"
                              sx={{ p: 1.5, bgcolor: 'action.hover' }}
                            >
                              <Typography variant="body2">
                                <strong>{t.phaseLabels.bestFor}:</strong>{' '}
                                {s.bestFor}
                              </Typography>
                            </Paper>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Empfehlung: Hybride Strategie */}
                  <Paper
                    sx={{
                      p: 4,
                      mb: 4,
                      bgcolor: 'primary.main',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {t.f2.hybridTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f2.hybridDesc}
                    </Typography>
                    <Grid container spacing={2}>
                      {t.f2.hybridItems.map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                          <Paper
                            sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)' }}
                          >
                            <Typography variant="subtitle2" fontWeight="bold">
                              {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.85 }}>
                              {item.desc}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              {item.pct}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* BizTalk → Azure Mapping */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f2.mappingTitle}
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ mb: 4 }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: 'error.main',
                              width: '45%',
                            }}
                          >
                            BizTalk Server
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              textAlign: 'center',
                              width: '10%',
                            }}
                          >
                            →
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: 'primary.main',
                              width: '45%',
                            }}
                          >
                            Azure Integration Services
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mappingData.map((row, i) => (
                          <TableRow key={i}>
                            <TableCell>{row.biz}</TableCell>
                            <TableCell
                              sx={{
                                textAlign: 'center',
                                color: 'text.secondary',
                              }}
                            >
                              →
                            </TableCell>
                            <TableCell>{row.azure}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* 4 Migrationsphasen */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f2.phasesTitle}
                  </Typography>
                  <Stack spacing={3} sx={{ mb: 4 }}>
                    {phaseData.map((phase) => (
                      <Paper
                        variant="outlined"
                        key={phase.id}
                        sx={{ overflow: 'hidden' }}
                      >
                        <Box
                          sx={{
                            px: 3,
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            bgcolor: phase.color + '10',
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: phase.color }}
                          >
                            {phase.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {phase.subtitle}
                          </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                            <Typography
                              variant="overline"
                              fontWeight="bold"
                              color="text.secondary"
                            >
                              {t.phaseLabels.goal}
                            </Typography>
                            <Typography variant="body1">
                              {phase.goal}
                            </Typography>
                          </Paper>
                          <Typography
                            variant="overline"
                            fontWeight="bold"
                            color="text.secondary"
                          >
                            {t.phaseLabels.tasks}
                          </Typography>
                          <Stack spacing={1.5} sx={{ mt: 1, mb: 3 }}>
                            {phase.tasks.map((t, i) => (
                              <Box
                                key={i}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1.5,
                                }}
                              >
                                <Chip
                                  label={i + 1}
                                  size="small"
                                  sx={{
                                    bgcolor: phase.color + '20',
                                    color: phase.color,
                                    fontWeight: 'bold',
                                    minWidth: 28,
                                    height: 24,
                                  }}
                                />
                                <Box>
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                  >
                                    {t.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {t.desc}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Stack>
                          <Typography
                            variant="overline"
                            fontWeight="bold"
                            color="text.secondary"
                          >
                            {t.phaseLabels.deliverables}
                          </Typography>
                          <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                            {phase.deliverables.map((d, i) => (
                              <Box
                                key={i}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: phase.color,
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography variant="body2">{d}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>

                  {/* 6 Rs der Cloud-Migration */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f2.sixRsTitle}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {t.f2.sixRsDesc}
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {sixRData.map((item, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <Card
                          variant="outlined"
                          sx={{
                            height: '100%',
                            opacity: item.relevant ? 1 : 0.5,
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Chip
                                label={item.r}
                                size="small"
                                sx={{
                                  bgcolor: item.color + '20',
                                  color: item.color,
                                  fontWeight: 'bold',
                                }}
                              />
                              {item.relevant && (
                                <Chip
                                  label="Relevant"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  sx={{ height: 20, fontSize: '0.65rem' }}
                                />
                              )}
                            </Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {item.subtitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.desc}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* On-Prem vs Cloud */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f2.compareTitle}
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ mb: 4 }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                            {t.envLabels.criterion}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: 'error.main',
                              width: '40%',
                            }}
                          >
                            BizTalk (On-Premises)
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: 'primary.main',
                              width: '40%',
                            }}
                          >
                            Azure Integration Services
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {compareData.map((row, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontWeight: 500 }}>
                              {row.k}
                            </TableCell>
                            <TableCell>{row.biz}</TableCell>
                            <TableCell>{row.az}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* BizTalk End of Life */}
                  <Paper
                    sx={{ p: 4, mb: 4, bgcolor: 'error.dark', color: 'white' }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {t.f2.eolTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f2.eolDesc}
                    </Typography>
                    <Grid container spacing={2}>
                      {t.f2.eolItems.map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                          <Paper
                            sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)' }}
                          >
                            <Typography variant="caption" fontWeight="bold">
                              {item.title}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {item.date}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                              {item.desc}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* Voraussetzungen */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f2.reqTitle}
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {reqData.map((req, i) => (
                      <Grid item xs={12} md={6} key={i}>
                        <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                          >
                            {req.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            {req.desc}
                          </Typography>
                          <Stack spacing={0.5}>
                            {req.details.map((d, j) => (
                              <Box
                                key={j}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    mt: 1,
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography variant="body2">{d}</Typography>
                              </Box>
                            ))}
                          </Stack>
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 1.5,
                              mt: 2,
                              bgcolor: 'primary.main',
                              color: 'white',
                            }}
                          >
                            <Typography variant="body2">
                              <strong>Ergebnis:</strong> {req.output}
                            </Typography>
                          </Paper>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {/* ─── F3: UMGEBUNGEN TAB ─── */}
              {currentTabId === 'environments' && (
                <>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f3.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {t.f3.subtitle}
                  </Typography>

                  {/* Environment Cards */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {envData.map((env) => (
                      <Grid item xs={12} md={4} key={env.id}>
                        <Paper
                          variant="outlined"
                          sx={{ height: '100%', overflow: 'hidden' }}
                        >
                          <Box
                            sx={{
                              px: 3,
                              py: 2,
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                              bgcolor: env.color + '10',
                            }}
                          >
                            <Typography
                              variant="h5"
                              fontWeight="bold"
                              sx={{ color: env.color }}
                            >
                              {env.short}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {env.name}
                            </Typography>
                          </Box>
                          <Box sx={{ p: 3 }}>
                            <Typography variant="body2" paragraph>
                              {env.purpose}
                            </Typography>

                            <Typography
                              variant="overline"
                              fontWeight="bold"
                              color="text.secondary"
                            >
                              {t.envLabels.components}
                            </Typography>
                            <Stack spacing={1} sx={{ mt: 0.5, mb: 2 }}>
                              {env.components.map((c, i) => (
                                <Box key={i}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: env.color,
                                        flexShrink: 0,
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      fontWeight="bold"
                                    >
                                      {c.name}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ ml: 2 }}
                                  >
                                    {c.detail}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>

                            <Typography
                              variant="overline"
                              fontWeight="bold"
                              color="text.secondary"
                            >
                              {t.envLabels.characteristics}
                            </Typography>
                            <Stack spacing={0.5} sx={{ mt: 0.5, mb: 2 }}>
                              {env.characteristics.map((c, i) => (
                                <Box
                                  key={i}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 5,
                                      height: 5,
                                      borderRadius: '50%',
                                      bgcolor: env.color,
                                      mt: 1,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography variant="body2">{c}</Typography>
                                </Box>
                              ))}
                            </Stack>

                            <Paper
                              variant="outlined"
                              sx={{ p: 1.5, bgcolor: 'action.hover' }}
                            >
                              <Typography
                                variant="caption"
                                fontFamily="monospace"
                              >
                                {env.sizing}
                              </Typography>
                            </Paper>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Vergleichstabelle */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f3.compareTitle}
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ mb: 4 }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                            {t.envLabels.criterion}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: '#F59E0B',
                              width: '25%',
                            }}
                          >
                            DEV
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: '#7C3AED',
                              width: '25%',
                            }}
                          >
                            TEST
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              color: '#10B981',
                              width: '25%',
                            }}
                          >
                            PROD
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {envCmpData.map((row, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontWeight: 500 }}>
                              {row.label}
                            </TableCell>
                            <TableCell>{row.dev}</TableCell>
                            <TableCell>{row.test}</TableCell>
                            <TableCell>{row.prod}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Promotion Flow */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t.f3.flowTitle}
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      {promoData.map((step, i) => (
                        <React.Fragment key={i}>
                          <Paper
                            variant="outlined"
                            sx={{
                              px: 2,
                              py: 1.5,
                              textAlign: 'center',
                              minWidth: 100,
                              borderColor: step.color + '60',
                              bgcolor: step.color + '10',
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              sx={{ color: step.color }}
                            >
                              {step.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {step.sub}
                            </Typography>
                          </Paper>
                          {i < promotionFlow.length - 1 && (
                            <Typography color="text.secondary" sx={{ mx: 0.5 }}>
                              →
                            </Typography>
                          )}
                        </React.Fragment>
                      ))}
                    </Box>
                  </Paper>

                  {/* Warum drei Umgebungen? */}
                  <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {t.f3.whyTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f3.whyDesc}
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {t.f3.whyItems.map((item, i) => {
                        const colors = ['#F59E0B', '#7C3AED', '#10B981'];
                        const label = item.split(' — ')[0];
                        const rest = item.substring(item.indexOf(' — ') + 3);
                        return (
                          <Typography key={i} variant="body1">
                            <strong style={{ color: colors[i] }}>
                              {label}
                            </strong>{' '}
                            — {rest}
                          </Typography>
                        );
                      })}
                    </Stack>
                    <Typography variant="body1">{t.f3.whyFooter}</Typography>
                  </Paper>

                  {/* WS Plans */}
                  <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {t.f3.wsTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {t.f3.wsDesc}
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        {
                          plan: 'WS1',
                          cpu: '1 vCPU',
                          ram: '3.5 GB',
                          price: '~ 0.16 EUR/Std.',
                          use: 'DEV, einfache Workflows',
                        },
                        {
                          plan: 'WS2',
                          cpu: '2 vCPU',
                          ram: '7 GB',
                          price: '~ 0.31 EUR/Std.',
                          use: 'TEST, PROD (Standard)',
                        },
                        {
                          plan: 'WS3',
                          cpu: '4 vCPU',
                          ram: '14 GB',
                          price: '~ 0.62 EUR/Std.',
                          use: 'PROD (High Volume)',
                        },
                      ].map((p, i) => (
                        <Grid item xs={12} md={4} key={i}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="primary"
                              >
                                {p.plan}
                              </Typography>
                              <Typography variant="body2">
                                CPU: {p.cpu}
                              </Typography>
                              <Typography variant="body2">
                                RAM: {p.ram}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: 'warning.main' }}
                              >
                                Preis: {p.price}
                              </Typography>
                              <Divider sx={{ my: 1 }} />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Empfohlen für: {p.use}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </>
              )}
            </Box>
          </Box>
        </Container>
      )}

      <ContactUs />
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale: locale || 'de',
      messages: {
        ...require(`../../locales/${locale || 'de'}/shared.json`),
        ...require(`../../locales/${locale || 'de'}/pages/services.json`),
      },
    },
  };
};
