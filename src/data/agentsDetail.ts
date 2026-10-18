export const agentSummaries = [
  {
    id: "chat",
    name: "Chatbot Agent",
    status: "Online",
    tone: "blue" as const,
    icon: "chat" as const,
    toggleable: true,
    stats: [
      { value: "1,024", label: "Conversations this month" },
      { value: "92%", label: "Resolution Rate" },
      { value: "1.4s", label: "Avg. First Response" },
    ],
  },
  {
    id: "voice",
    name: "Voice Agent",
    status: "Online",
    tone: "green" as const,
    icon: "phone" as const,
    toggleable: true,
    stats: [
      { value: "312", label: "Calls this month" },
      { value: "88%", label: "Resolution Rate" },
      { value: "2m 14s", label: "Avg. Call Duration" },
    ],
  },
  {
    id: "handoff",
    name: "Human Handoff",
    status: "Enabled",
    tone: "purple" as const,
    icon: "users" as const,
    toggleable: false,
    stats: [
      { value: "38", label: "Transferred this month" },
      { value: "100%", label: "Handoff Success" },
      { value: "4m 32s", label: "Avg. Response Time" },
    ],
  },
]

export const chatKeyMetrics = [
  {
    id: "conv",
    value: "1,024",
    label: "Total Conversations",
    deltaPct: 12.4,
    direction: "up" as const,
    tone: "blue" as const,
    sparkline: [18, 22, 20, 26, 24, 28, 26, 31, 29, 34, 33, 38],
  },
  {
    id: "res",
    value: "92%",
    label: "Resolution Rate",
    deltaPct: 3.6,
    direction: "up" as const,
    tone: "green" as const,
    sparkline: [22, 24, 23, 26, 25, 28, 27, 29, 28, 31, 30, 33],
  },
  {
    id: "resp",
    value: "1.4s",
    label: "Avg. Response Time",
    deltaPct: 18.2,
    direction: "down" as const,
    tone: "orange" as const,
    sparkline: [30, 27, 31, 26, 29, 25, 28, 24, 27, 23, 26, 21],
  },
  {
    id: "csat",
    value: "4.8/5",
    label: "Customer Satisfaction",
    deltaPct: 6.1,
    direction: "up" as const,
    tone: "green" as const,
    sparkline: [20, 22, 21, 24, 23, 26, 25, 28, 27, 30, 29, 32],
  },
]

export const topIntents = [
  { rank: 1, label: "Warranty Information", pct: 28, color: "#3b82f6" },
  { rank: 2, label: "Price & Quotation", pct: 18, color: "#22c55e" },
  { rank: 3, label: "Service Booking", pct: 14, color: "#3b82f6" },
  { rank: 4, label: "Machine Installation", pct: 10, color: "#22c55e" },
  { rank: 5, label: "Spare Parts Availability", pct: 8, color: "#3b82f6" },
]

export const chatSuggestions = [
  "What does the warranty cover?",
  "How to claim warranty?",
  "Do you provide on-site service?",
]

export const connectedChannels = [
  { id: "web", name: "Website", active: true, icon: "website" as const },
  { id: "wa", name: "WhatsApp", active: true, icon: "whatsapp" as const },
  { id: "fb", name: "Facebook", active: false, icon: "facebook" as const },
  { id: "ig", name: "Instagram", active: false, icon: "instagram" as const },
  { id: "widget", name: "Custom Widget", active: true, icon: "widget" as const },
]

export const voiceKeyMetrics = [
  {
    id: "calls",
    value: "312",
    label: "Total Calls",
    deltaPct: 18.2,
    direction: "up" as const,
    tone: "blue" as const,
    sparkline: [16, 19, 17, 21, 20, 24, 22, 26, 25, 29, 28, 33],
  },
  {
    id: "vres",
    value: "88%",
    label: "Resolution Rate",
    deltaPct: 5.1,
    direction: "up" as const,
    tone: "green" as const,
    sparkline: [20, 22, 21, 24, 23, 26, 25, 27, 26, 29, 28, 31],
  },
  {
    id: "vdur",
    value: "2m 14s",
    label: "Avg. Call Duration",
    deltaPct: 12.6,
    direction: "down" as const,
    tone: "orange" as const,
    sparkline: [28, 25, 29, 24, 27, 23, 26, 22, 25, 21, 24, 20],
  },
  {
    id: "vcsat",
    value: "4.6/5",
    label: "Customer Satisfaction",
    deltaPct: 8.3,
    direction: "up" as const,
    tone: "green" as const,
    sparkline: [18, 20, 19, 22, 21, 24, 23, 26, 25, 28, 27, 30],
  },
]

export const callOutcomes = [
  { label: "AI Resolved", pct: 68, color: "#22c55e" },
  { label: "Transferred to Human", pct: 12, color: "#3b82f6" },
  { label: "Missed / No Answer", pct: 8, color: "#facc15" },
  { label: "Others", pct: 12, color: "#94a3b8" },
]

export const voiceCallTranscript = [
  {
    from: "customer" as const,
    text: "Do you provide installation support for CNC machines?",
  },
  {
    from: "ai" as const,
    text: "Yes, we provide on-site installation support across India. Let me check the availability in your location.",
  },
]

export const phoneSettings = {
  number: "+91 98765 43210",
  label: "Customer Support (Main Line)",
  rows: [
    { icon: "clock" as const, title: "Business Hours", value: "Mon – Sat, 9:00 AM – 8:00 PM" },
    { icon: "flow" as const, title: "Call Flow", value: "AI → Resolve → Human (if needed)" },
    { icon: "lang" as const, title: "Language", value: "English (India)" },
  ],
}

export const agentTabs = {
  chat: ["Overview", "Instructions", "Knowledge Sources", "Tools & Actions", "Guardrails", "Channels"],
  voice: ["Overview", "Voice & Language", "Instructions", "Knowledge Sources", "Call Flow", "Tools", "Settings"],
}
