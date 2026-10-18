import type { Channel, TicketStatus } from "@/types"

export interface TicketRow {
  id: string
  customerName: string
  phone: string
  subject: string
  channel: Channel
  channelLabel: string
  priority: "Low" | "Medium" | "High"
  status: TicketStatus
  assignee: string
  updatedLabel: string
  updatedMinutes: number
}

export interface TicketMessage {
  id: string
  from: "customer" | "ai" | "agent"
  text: string
  time: string
}

export interface TicketDetail {
  id: string
  customerName: string
  phone: string
  customerSince: string
  previousTickets: number
  subject: string
  channelLabel: string
  priority: "Low" | "Medium" | "High"
  status: TicketStatus
  createdLabel: string
  updatedLabel: string
  messages: TicketMessage[]
  knowledge: { title: string; sub: string; kind: "pdf" | "doc" }[]
  details: { label: string; value: string }[]
  aiSummary: string[]
}

export const ticketKpis = [
  {
    id: "total",
    title: "Total Tickets",
    display: "186",
    deltaPct: 6.1,
    direction: "up" as const,
    good: true,
    tone: "blue" as const,
    sparkline: [24, 28, 26, 31, 29, 34, 32, 38, 36, 41, 39, 45],
  },
  {
    id: "open",
    title: "Open",
    display: "27",
    deltaPct: 4.8,
    direction: "up" as const,
    good: false,
    tone: "orange" as const,
    sparkline: [14, 12, 16, 13, 17, 15, 19, 16, 20, 18, 22, 21],
  },
  {
    id: "progress",
    title: "In Progress",
    display: "34",
    deltaPct: 12.5,
    direction: "up" as const,
    good: false,
    tone: "purple" as const,
    sparkline: [16, 19, 17, 21, 20, 24, 22, 26, 25, 29, 28, 32],
  },
  {
    id: "resolved",
    title: "Resolved",
    display: "119",
    deltaPct: 18.2,
    direction: "up" as const,
    good: true,
    tone: "green" as const,
    sparkline: [18, 21, 20, 24, 23, 27, 26, 30, 29, 33, 32, 37],
  },
  {
    id: "resolution",
    title: "Average Resolution Time",
    display: "4h 32m",
    deltaPct: 21.4,
    direction: "down" as const,
    good: true,
    tone: "red" as const,
    sparkline: [30, 28, 32, 27, 31, 26, 30, 25, 29, 24, 28, 22],
  },
]

export const ticketRows: TicketRow[] = [
  {
    id: "#TK-1024",
    customerName: "Rahul Mehta",
    phone: "+91 98765 43210",
    subject: "Warranty period for CNC machines?",
    channel: "chat",
    channelLabel: "Chat",
    priority: "High",
    status: "open",
    assignee: "Arjun Nair",
    updatedLabel: "2 min ago",
    updatedMinutes: 2,
  },
  {
    id: "#TK-1023",
    customerName: "Sneha Kapoor",
    phone: "+91 91234 56789",
    subject: "Machine installation support",
    channel: "voice",
    channelLabel: "Voice",
    priority: "Medium",
    status: "in_progress",
    assignee: "Riya Sharma",
    updatedLabel: "5 min ago",
    updatedMinutes: 5,
  },
  {
    id: "#TK-1022",
    customerName: "Deepak Verma",
    phone: "+91 87654 32109",
    subject: "Price list for CNC Router",
    channel: "chat",
    channelLabel: "Chat",
    priority: "Low",
    status: "resolved",
    assignee: "Siddharth Rao",
    updatedLabel: "12 min ago",
    updatedMinutes: 12,
  },
  {
    id: "#TK-1021",
    customerName: "Amit Shaw",
    phone: "+91 99887 66554",
    subject: "Error code E101",
    channel: "voice",
    channelLabel: "Call",
    priority: "High",
    status: "open",
    assignee: "Arjun Nair",
    updatedLabel: "20 min ago",
    updatedMinutes: 20,
  },
  {
    id: "#TK-1020",
    customerName: "Priya Singh",
    phone: "+91 93300 11223",
    subject: "Service booking",
    channel: "whatsapp",
    channelLabel: "WhatsApp",
    priority: "Medium",
    status: "resolved",
    assignee: "Riya Sharma",
    updatedLabel: "28 min ago",
    updatedMinutes: 28,
  },
  {
    id: "#TK-1019",
    customerName: "Vikram Patel",
    phone: "+91 78643 21098",
    subject: "Spare parts availability",
    channel: "email",
    channelLabel: "Email",
    priority: "Medium",
    status: "in_progress",
    assignee: "Siddharth Rao",
    updatedLabel: "33 min ago",
    updatedMinutes: 33,
  },
  {
    id: "#TK-1018",
    customerName: "Anjali Nair",
    phone: "+91 90909 87664",
    subject: "Delivery status",
    channel: "chat",
    channelLabel: "Chat",
    priority: "Low",
    status: "resolved",
    assignee: "Riya Sharma",
    updatedLabel: "1 hour ago",
    updatedMinutes: 60,
  },
  {
    id: "#TK-1017",
    customerName: "Rohit Sharma",
    phone: "+91 76543 21098",
    subject: "Technical documentation",
    channel: "email",
    channelLabel: "Email",
    priority: "Medium",
    status: "open",
    assignee: "Arjun Nair",
    updatedLabel: "1 hour ago",
    updatedMinutes: 65,
  },
  {
    id: "#TK-1016",
    customerName: "Karan Malhotra",
    phone: "+91 98765 43210",
    subject: "Machine not starting",
    channel: "voice",
    channelLabel: "Call",
    priority: "High",
    status: "in_progress",
    assignee: "Siddharth Rao",
    updatedLabel: "2 hours ago",
    updatedMinutes: 120,
  },
  {
    id: "#TK-1015",
    customerName: "Neha Gupta",
    phone: "+91 87654 21987",
    subject: "Refund request",
    channel: "whatsapp",
    channelLabel: "WhatsApp",
    priority: "Medium",
    status: "resolved",
    assignee: "Riya Sharma",
    updatedLabel: "3 hours ago",
    updatedMinutes: 180,
  },
]

export const assigneeColors: Record<string, { bg: string; fg: string }> = {
  "Arjun Nair": { bg: "#ccfbf1", fg: "#0d9488" },
  "Riya Sharma": { bg: "#f3e8ff", fg: "#7c3aed" },
  "Siddharth Rao": { bg: "#ffedd5", fg: "#ea580c" },
}

const rahulDetail: TicketDetail = {
  id: "#TK-1024",
  customerName: "Rahul Mehta",
  phone: "+91 98765 43210",
  customerSince: "12 Jan, 2025",
  previousTickets: 4,
  subject: "Warranty period for CNC machines?",
  channelLabel: "Chat",
  priority: "High",
  status: "open",
  createdLabel: "May 31, 2026",
  updatedLabel: "2 min ago",
  messages: [
    {
      id: "tm-1",
      from: "customer",
      text: "Can you please tell me what is the warranty period for your CNC machines?",
      time: "2:14 PM",
    },
    {
      id: "tm-2",
      from: "ai",
      text: "Yes, our CNC machines come with a standard 2-year warranty covering manufacturing defects. Extended warranty plans are also available on request.",
      time: "2:15 PM",
    },
    {
      id: "tm-3",
      from: "customer",
      text: "Do you have any info about the extended warranty plan?",
      time: "2:17 PM",
    },
  ],
  knowledge: [
    { title: "Warranty Policy.pdf", sub: "Page 3", kind: "pdf" },
    { title: "Service & Support FAQ", sub: "Section 2.1", kind: "doc" },
    { title: "Product Catalog", sub: "Page 12", kind: "doc" },
  ],
  details: [
    { label: "Status", value: "Open" },
    { label: "Priority", value: "High" },
    { label: "Channel", value: "Chat" },
    { label: "Assignee", value: "Arjun Nair" },
    { label: "Created", value: "May 31, 2026" },
    { label: "Last Updated", value: "2 min ago" },
  ],
  aiSummary: [
    "Customer is asking about the standard warranty period for CNC machines.",
    "AI agent confirmed the 2-year manufacturing defect warranty.",
    "Customer showed interest in extended warranty plans — follow-up recommended.",
  ],
}

function genericDetail(row: TicketRow): TicketDetail {
  const initials = row.customerName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  void initials
  return {
    id: row.id,
    customerName: row.customerName,
    phone: row.phone,
    customerSince: "Mar 4, 2025",
    previousTickets: 2,
    subject: row.subject,
    channelLabel: row.channelLabel,
    priority: row.priority,
    status: row.status,
    createdLabel: "May 31, 2026",
    updatedLabel: row.updatedLabel,
    messages: [
      {
        id: "tm-1",
        from: "customer",
        text: `Hi, I need help with: ${row.subject}`,
        time: "Just now",
      },
      {
        id: "tm-2",
        from: "ai",
        text: "Thanks for reaching out! I've reviewed your request and will get back to you with the details shortly.",
        time: "Just now",
      },
    ],
    knowledge: [
      { title: "Service & Support FAQ", sub: "Section 1.4", kind: "doc" },
      { title: "AMC Policy 2026.pdf", sub: "Page 1", kind: "pdf" },
    ],
    details: [
      { label: "Status", value: row.status.replace("_", " ") },
      { label: "Priority", value: row.priority },
      { label: "Channel", value: row.channelLabel },
      { label: "Assignee", value: row.assignee },
      { label: "Created", value: "May 31, 2026" },
      { label: "Last Updated", value: row.updatedLabel },
    ],
    aiSummary: [
      `Ticket created for: ${row.subject}.`,
      row.status === "resolved"
        ? "Issue has been resolved and closed."
        : "Ticket is being handled by the assigned agent.",
    ],
  }
}

export function getTicketDetail(id: string): TicketDetail {
  if (id === "#TK-1024") return rahulDetail
  const row = ticketRows.find((t) => t.id === id) ?? ticketRows[0]
  return genericDetail(row)
}
