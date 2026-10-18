export type Channel = "chat" | "voice" | "whatsapp" | "email"
export type TicketStatus = "open" | "in_progress" | "resolved" | "on_hold"
export type AgentType = "chat" | "voice"

export interface BaseEntity {
  tenantId: string
}

export interface Organization extends BaseEntity {
  id: string
  name: string
  plan: "Starter" | "Growth" | "Enterprise"
  industry: string
  seats: number
  createdAt: string
}

export interface User extends BaseEntity {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Agent"
  avatarColor: string
  initials: string
  status: "active" | "invited" | "disabled"
  joinedAt: string
}

export interface Conversation extends BaseEntity {
  id: string
  customerName: string
  customerContact: string
  channel: Channel
  message: string
  agentId: string
  status: TicketStatus
  minutesAgo: number
  sentiment: "positive" | "neutral" | "negative"
}

export interface Ticket extends BaseEntity {
  id: string
  subject: string
  customerName: string
  channel: Channel
  agentId: string
  status: TicketStatus
  priority: "low" | "medium" | "high"
  createdAt: string
}

export interface Call extends BaseEntity {
  id: string
  callerNumber: string
  agent: AgentType
  durationSec: number
  outcome: "resolved" | "escalated" | "missed"
  minutesAgo: number
}

export interface KnowledgeDocument extends BaseEntity {
  id: string
  title: string
  format: "pdf" | "url" | "faq" | "doc"
  sizeKb: number
  status: "indexed" | "processing" | "failed"
  updatedAt: string
}

export interface AIAgent extends BaseEntity {
  id: string
  name: string
  type: AgentType
  online: boolean
  subtitle: string
  conversationsHandled: number
  model: string
}

export interface Integration extends BaseEntity {
  id: string
  name: string
  category: string
  connected: boolean
  description: string
}

export interface TimeSeriesPoint {
  date: string
  chat: number
  voice: number
  tickets: number
}

export interface Analytics extends BaseEntity {
  metrics: {
    totalConversations: { value: number; deltaPct: number; sparkline: number[] }
    aiCallsHandled: { value: number; deltaPct: number; sparkline: number[] }
    ticketsCreated: { value: number; deltaPct: number; sparkline: number[] }
    resolutionRate: { value: number; deltaPct: number; sparkline: number[] }
  }
  trends: TimeSeriesPoint[]
  channels: { label: string; value: number; color: string }[]
  ticketStatus: { label: string; value: number; color: string }[]
  topIssues: { rank: number; title: string; sharePct: number }[]
  activity: {
    id: string
    title: string
    detail: string
    type: "document" | "ticket" | "call" | "team"
    minutesAgo: number
  }[]
}

export interface Notification {
  id: string
  title: string
  detail: string
  type: "document" | "ticket" | "call" | "team"
  minutesAgo: number
  read: boolean
}
