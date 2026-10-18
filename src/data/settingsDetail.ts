export interface SettingsProfile {
  name: string
  email: string
  avatar: string
  badge: string
  phone: string
  twoFactor: string
}

export const settingsProfile: SettingsProfile = {
  name: "Pritam Ghosh",
  email: "pritam@woodmastercnc.com",
  avatar: "PG",
  badge: "Admin",
  phone: "+91 98765 43210",
  twoFactor: "Enabled",
}

export interface PlanInfo {
  name: string
  status: string
  renews: string
  features: string[]
}

export const planInfo: PlanInfo = {
  name: "Enterprise Plan",
  status: "Active",
  renews: "Renews on May 31, 2026",
  features: [
    "50,000 conversations / month",
    "10 AI agents",
    "Multi-channel support (Chat + Voice)",
    "Advanced analytics",
    "Custom integrations",
    "Priority support",
  ],
}

export interface QuickAction {
  id: string
  title: string
  sub: string
  icon: "export" | "delete" | "transfer" | "audit"
  tone: "blue" | "red" | "orange" | "purple"
}

export const quickActions: QuickAction[] = [
  {
    id: "qa-export",
    title: "Export Workspace Data",
    sub: "Download your conversations, tickets and more",
    icon: "export",
    tone: "blue",
  },
  {
    id: "qa-delete",
    title: "Delete Workspace",
    sub: "Permanently delete your workspace data",
    icon: "delete",
    tone: "red",
  },
  {
    id: "qa-transfer",
    title: "Transfer Ownership",
    sub: "Transfer this workspace to another member",
    icon: "transfer",
    tone: "orange",
  },
  {
    id: "qa-audit",
    title: "View Audit Logs",
    sub: "See recent activity and security logs",
    icon: "audit",
    tone: "purple",
  },
]

export const industries = [
  "Manufacturing",
  "Retail & E-commerce",
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Travel & Hospitality",
  "Other",
]

export const defaultChannels = ["Website Chat", "WhatsApp", "Voice AI", "Email"]

export const defaultAgents = [
  "Chatbot Agent",
  "Support Agent",
  "Escalation Agent",
  "Sales Agent",
]

export const timezones = [
  "(GMT+05:30) Kolkata, India",
  "(GMT+00:00) London, UK",
  "(GMT-05:00) New York, US",
  "(GMT+01:00) Berlin, Germany",
  "(GMT+08:00) Singapore",
  "(GMT+10:00) Sydney, Australia",
]

export const dateFormats = [
  "May 1, 2026 (MM DD, YYYY)",
  "01/05/2026 (DD/MM/YYYY)",
  "2026-05-01 (YYYY-MM-DD)",
]

export const timeFormats = ["12-hour (AM/PM)", "24-hour"]

export interface ApiKey {
  id: string
  name: string
  masked: string
  created: string
  lastUsed: string
  status: "Active" | "Revoked"
}

export const apiKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production Key",
    masked: "rx_live_9f3d••••••••4a21",
    created: "Feb 12, 2025",
    lastUsed: "12 minutes ago",
    status: "Active",
  },
  {
    id: "key-2",
    name: "Zapier Integration",
    masked: "rx_live_7b1c••••••••8e02",
    created: "Mar 3, 2025",
    lastUsed: "3 hours ago",
    status: "Active",
  },
  {
    id: "key-3",
    name: "Webflow Test Key",
    masked: "rx_test_1a8f••••••••c57d",
    created: "Jan 20, 2025",
    lastUsed: "2 weeks ago",
    status: "Revoked",
  },
]

export interface WebhookEndpoint {
  id: string
  url: string
  events: string
  status: "Healthy" | "Failing"
}

export const webhooks: WebhookEndpoint[] = [
  {
    id: "wh-1",
    url: "https://woodmastercnc.com/api/webhooks/resolvex",
    events: "ticket.created, message.received",
    status: "Healthy",
  },
  {
    id: "wh-2",
    url: "https://hooks.zapier.com/hooks/catch/2245/rx",
    events: "conversation.closed",
    status: "Healthy",
  },
]

export interface NotificationRow {
  id: string
  title: string
  sub: string
  value: boolean
}

export const emailAlerts: NotificationRow[] = [
  { id: "ne-1", title: "New ticket assigned", sub: "When a conversation is assigned to you", value: true },
  { id: "ne-2", title: "Mentions", sub: "When a teammate @mentions you", value: true },
  { id: "ne-3", title: "Escalations", sub: "When a ticket is escalated to management", value: true },
  { id: "ne-4", title: "Weekly digest", sub: "Summary of your team's activity each Monday", value: false },
]

export const inAppAlerts: NotificationRow[] = [
  { id: "ni-1", title: "New conversations", sub: "Toast + badge for incoming messages", value: true },
  { id: "ni-2", title: "Ticket updates", sub: "Status changes on tickets you follow", value: true },
  { id: "ni-3", title: "AI handoffs", sub: "When an AI agent transfers to a human", value: true },
  { id: "ni-4", title: "Sound alerts", sub: "Play a sound for new assignments", value: false },
]

export const slackAlerts: NotificationRow[] = [
  { id: "ns-1", title: "Tickets to Slack", sub: "Post new tickets to #support-tickets", value: true },
  { id: "ns-2", title: "Daily summary", sub: "Post a daily recap every morning", value: false },
]

export const agentModels = [
  "GPT-4o (recommended)",
  "GPT-4o mini",
  "Claude Sonnet 4.5",
  "Gemini 2.5 Pro",
]

export const responseTones = ["Professional", "Friendly", "Concise", "Formal"]

export const fallbackActions = [
  "Create a ticket",
  "Offer a callback",
  "Transfer to human agent",
  "End conversation politely",
]

export const retentionOptions = ["30 days", "90 days", "1 year", "2 years", "Forever"]

export const dataRegions = [
  "Singapore (ap-south-1)",
  "Mumbai (ap-south-2)",
  "Virginia (us-east-1)",
  "Frankfurt (eu-central-1)",
]

export const sessionTimeouts = ["30 minutes", "1 hour", "8 hours", "1 day", "1 week"]

export const passwordLengths = ["8 characters", "10 characters", "12 characters", "16 characters"]

export const languages = [
  "English (US)",
  "English (UK)",
  "Hindi",
  "Bengali",
  "Spanish",
  "French",
  "German",
  "Japanese",
]

export const themeOptions = [
  { id: "light", label: "Light", sub: "Bright and clean" },
  { id: "dark", label: "Dark", sub: "Low-light friendly" },
  { id: "system", label: "System", sub: "Match your OS" },
]

export const accentColors = [
  { id: "blue", value: "#2563eb" },
  { id: "indigo", value: "#4f46e5" },
  { id: "violet", value: "#7c3aed" },
  { id: "emerald", value: "#059669" },
  { id: "orange", value: "#ea580c" },
  { id: "rose", value: "#e11d48" },
]

export const densities = ["Comfortable", "Compact"]

export const fontSizes = ["Small", "Default", "Large"]

export const quietHours = ["Off", "22:00 – 06:00", "20:00 – 08:00", "Custom schedule"]

export const businessHours = ["24 / 7", "09:00 – 18:00 IST", "Custom schedule"]
