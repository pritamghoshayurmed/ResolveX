export type IntegrationCategory =
  | "Communication"
  | "Knowledge"
  | "CRM"
  | "Productivity"
  | "Developer"

export type IntegrationIconKey =
  | "website"
  | "whatsapp"
  | "drive"
  | "notion"
  | "gmail"
  | "postgres"
  | "slack"
  | "teams"
  | "zendesk"
  | "freshdesk"
  | "hubspot"
  | "salesforce"
  | "shopify"
  | "woocommerce"
  | "intercom"
  | "discord"
  | "telegram"
  | "api"

export interface Integration {
  id: string
  name: string
  description: string
  category: IntegrationCategory
  icon: IntegrationIconKey
  menu?: "settings" | "more"
}

export interface ConnectedIntegration extends Integration {
  synced: string
}

export const integrationCategories: IntegrationCategory[] = [
  "Communication",
  "Knowledge",
  "CRM",
  "Productivity",
  "Developer",
]

export const integrationPlanLimit = 15

export const connectedIntegrations: ConnectedIntegration[] = [
  {
    id: "website-chat",
    name: "Website Chat",
    description: "Embed chat widget on your website",
    category: "Communication",
    icon: "website",
    synced: "Last synced 2 minutes ago",
    menu: "settings",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Handle customer queries on WhatsApp",
    category: "Communication",
    icon: "whatsapp",
    synced: "Last synced 5 minutes ago",
    menu: "settings",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Sync documents and knowledge base",
    category: "Knowledge",
    icon: "drive",
    synced: "Last synced 12 minutes ago",
    menu: "settings",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Import knowledge from Notion",
    category: "Knowledge",
    icon: "notion",
    synced: "Last synced 28 minutes ago",
    menu: "more",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Create tickets from support emails",
    category: "Communication",
    icon: "gmail",
    synced: "Last synced 1 hour ago",
    menu: "more",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Connect your internal database",
    category: "Developer",
    icon: "postgres",
    synced: "Last synced 2 hours ago",
    menu: "more",
  },
]

export const availableIntegrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Get notified about new tickets and mentions",
    category: "Communication",
    icon: "slack",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Receive alerts and collaborate with your team",
    category: "Communication",
    icon: "teams",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Sync tickets and customer data with Zendesk",
    category: "Productivity",
    icon: "zendesk",
  },
  {
    id: "freshdesk",
    name: "Freshdesk",
    description: "Import and manage support tickets",
    category: "Productivity",
    icon: "freshdesk",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync contacts and customer data",
    category: "CRM",
    icon: "hubspot",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Integrate with your Salesforce CRM",
    category: "CRM",
    icon: "salesforce",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Get order information and customer details",
    category: "CRM",
    icon: "shopify",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    description: "Access order and product information",
    category: "CRM",
    icon: "woocommerce",
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Import conversations from Intercom",
    category: "Productivity",
    icon: "intercom",
  },
  {
    id: "discord",
    name: "Discord",
    description: "Get support alerts on Discord",
    category: "Communication",
    icon: "discord",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Handle customer queries via Telegram",
    category: "Communication",
    icon: "telegram",
  },
  {
    id: "custom-api",
    name: "Custom API",
    description: "Connect via REST API or Webhooks",
    category: "Developer",
    icon: "api",
  },
]

export interface IntegrationActivity {
  id: string
  title: string
  time: string
  icon: IntegrationIconKey
}

export const integrationActivity: IntegrationActivity[] = [
  { id: "act-1", title: "Google Drive synced", time: "12 minutes ago", icon: "drive" },
  { id: "act-2", title: "New email from Gmail", time: "28 minutes ago", icon: "gmail" },
  { id: "act-3", title: "WhatsApp message received", time: "1 hour ago", icon: "whatsapp" },
  { id: "act-4", title: "Notion document added", time: "2 hours ago", icon: "notion" },
  { id: "act-5", title: "Database synced", time: "3 hours ago", icon: "postgres" },
]

export interface IntegrationGuide {
  id: string
  title: string
  sub: string
  icon: IntegrationIconKey
}

export const integrationGuides: IntegrationGuide[] = [
  {
    id: "guide-1",
    title: "Connect Website Chat",
    sub: "Set up the chat widget on your website",
    icon: "website",
  },
  {
    id: "guide-2",
    title: "Integrate WhatsApp",
    sub: "Handle customer support on WhatsApp",
    icon: "whatsapp",
  },
  {
    id: "guide-3",
    title: "Sync Knowledge from Notion",
    sub: "Import and keep documents in sync",
    icon: "notion",
  },
  {
    id: "guide-4",
    title: "Connect Your Database",
    sub: "Use your company data for better answers",
    icon: "postgres",
  },
]
