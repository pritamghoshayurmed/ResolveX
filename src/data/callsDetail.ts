export type CallOutcome = "ai_resolved" | "human_transfer" | "missed"

export interface CallRecord {
  id: string
  customerName: string
  company: string
  phone: string
  intent: string
  intentTone: "blue" | "purple" | "green" | "red"
  duration: string
  durationSec: number
  outcome: CallOutcome
  timeLabel: string
}

export interface TranscriptTurn {
  from: "customer" | "ai"
  time: string
  text: string
}

export interface CallDetail {
  name: string
  company: string
  phone: string
  date: string
  time: string
  outcome: CallOutcome
  intent: string
  intentTone: "blue" | "purple" | "green" | "red"
  duration: string
  durationSec: number
  transcript: TranscriptTurn[]
  summary: string[]
  insights: { label: string; value: string; tone: string }[]
  topics: string[]
}

export const callKpis = [
  {
    id: "total",
    title: "Total Calls",
    value: 312,
    display: "312",
    deltaPct: 18.2,
    direction: "up" as const,
    good: true,
    tone: "green" as const,
    sparkline: [18, 22, 20, 26, 24, 28, 25, 30, 28, 33, 31, 36],
  },
  {
    id: "resolved",
    title: "AI Resolved",
    value: 248,
    display: "248",
    deltaPct: 22.5,
    direction: "up" as const,
    good: true,
    tone: "green" as const,
    sparkline: [14, 17, 16, 20, 19, 22, 21, 25, 24, 28, 27, 31],
  },
  {
    id: "transfer",
    title: "Transferred to Human",
    value: 38,
    display: "38",
    deltaPct: 4.1,
    direction: "up" as const,
    good: false,
    tone: "purple" as const,
    sparkline: [12, 10, 14, 11, 15, 13, 17, 14, 18, 16, 20, 19],
  },
  {
    id: "duration",
    title: "Avg. Call Duration",
    value: 134,
    display: "2m 14s",
    deltaPct: 12.6,
    direction: "down" as const,
    good: true,
    tone: "blue" as const,
    sparkline: [20, 23, 19, 25, 22, 27, 24, 29, 26, 31, 28, 33],
  },
]

export const callVolume: { date: string; aiRes: number; transfer: number }[] = [
  { date: "May 1", aiRes: 12, transfer: 4 },
  { date: "May 2", aiRes: 15, transfer: 5 },
  { date: "May 3", aiRes: 10, transfer: 3 },
  { date: "May 4", aiRes: 18, transfer: 6 },
  { date: "May 5", aiRes: 21, transfer: 7 },
  { date: "May 6", aiRes: 16, transfer: 5 },
  { date: "May 7", aiRes: 19, transfer: 6 },
  { date: "May 8", aiRes: 14, transfer: 4 },
  { date: "May 9", aiRes: 17, transfer: 5 },
  { date: "May 10", aiRes: 13, transfer: 4 },
  { date: "May 11", aiRes: 20, transfer: 7 },
  { date: "May 12", aiRes: 22, transfer: 8 },
  { date: "May 13", aiRes: 18, transfer: 6 },
  { date: "May 14", aiRes: 16, transfer: 5 },
  { date: "May 15", aiRes: 24, transfer: 8 },
  { date: "May 16", aiRes: 21, transfer: 7 },
  { date: "May 17", aiRes: 28, transfer: 6 },
  { date: "May 18", aiRes: 23, transfer: 9 },
  { date: "May 19", aiRes: 26, transfer: 7 },
  { date: "May 20", aiRes: 19, transfer: 6 },
  { date: "May 21", aiRes: 22, transfer: 8 },
  { date: "May 22", aiRes: 27, transfer: 9 },
  { date: "May 23", aiRes: 24, transfer: 7 },
  { date: "May 24", aiRes: 18, transfer: 5 },
  { date: "May 25", aiRes: 25, transfer: 8 },
  { date: "May 26", aiRes: 21, transfer: 6 },
  { date: "May 27", aiRes: 23, transfer: 7 },
  { date: "May 28", aiRes: 26, transfer: 9 },
  { date: "May 29", aiRes: 20, transfer: 6 },
  { date: "May 30", aiRes: 22, transfer: 7 },
  { date: "May 31", aiRes: 24, transfer: 8 },
]

export const recentCalls: CallRecord[] = [
  {
    id: "#CL-1048",
    customerName: "Rahul Mehta",
    company: "Mehta Industries",
    phone: "+91 98765 43210",
    intent: "Warranty Info",
    intentTone: "blue",
    duration: "3m 12s",
    durationSec: 192,
    outcome: "ai_resolved",
    timeLabel: "2 min ago",
  },
  {
    id: "#CL-1047",
    customerName: "Sneha Kapoor",
    company: "Kapoor Enterprises",
    phone: "+91 91234 56789",
    intent: "Machine Installation",
    intentTone: "purple",
    duration: "5m 28s",
    durationSec: 328,
    outcome: "human_transfer",
    timeLabel: "18 min ago",
  },
  {
    id: "#CL-1046",
    customerName: "Deepak Verma",
    company: "Verma Tech",
    phone: "+91 87654 32109",
    intent: "Price Quotation",
    intentTone: "green",
    duration: "2m 14s",
    durationSec: 134,
    outcome: "ai_resolved",
    timeLabel: "32 min ago",
  },
  {
    id: "#CL-1045",
    customerName: "Amit Shaw",
    company: "Shaw Automation",
    phone: "+91 99887 66554",
    intent: "Error Code",
    intentTone: "blue",
    duration: "4m 05s",
    durationSec: 245,
    outcome: "ai_resolved",
    timeLabel: "1 hour ago",
  },
  {
    id: "#CL-1044",
    customerName: "Priya Singh",
    company: "Singh Fabrication",
    phone: "+91 93300 11223",
    intent: "Service Booking",
    intentTone: "purple",
    duration: "6m 18s",
    durationSec: 378,
    outcome: "human_transfer",
    timeLabel: "2 hours ago",
  },
  {
    id: "#CL-1043",
    customerName: "Vikram Patel",
    company: "Patel Engineering",
    phone: "+91 78643 21098",
    intent: "Spare Parts",
    intentTone: "green",
    duration: "1m 42s",
    durationSec: 102,
    outcome: "ai_resolved",
    timeLabel: "2 hours ago",
  },
  {
    id: "#CL-1042",
    customerName: "Anjali Nair",
    company: "Nair & Sons",
    phone: "+91 90909 87664",
    intent: "Delivery Status",
    intentTone: "blue",
    duration: "3m 56s",
    durationSec: 236,
    outcome: "ai_resolved",
    timeLabel: "3 hours ago",
  },
  {
    id: "#CL-1041",
    customerName: "Riya Sen",
    company: "Sen Manufacturing",
    phone: "+91 78945 61233",
    intent: "Return & Refund",
    intentTone: "red",
    duration: "2m 30s",
    durationSec: 150,
    outcome: "missed",
    timeLabel: "4 hours ago",
  },
]

const rahulTranscript: TranscriptTurn[] = [
  {
    from: "customer",
    time: "00:00",
    text: "Hi, what is the warranty period for your CNC machines?",
  },
  {
    from: "ai",
    time: "00:04",
    text: "Hello! Your CNC machines come with a standard 2-year warranty covering manufacturing defects...",
  },
  { from: "customer", time: "00:32", text: "Does it include on-site service?" },
  {
    from: "ai",
    time: "00:36",
    text: "Yes, on-site service is included within India. For international locations, extended warranty plans ...",
  },
]

const callDetailsById: Record<string, CallDetail> = {
  "#CL-1048": {
    name: "Rahul Mehta",
    company: "Mehta Industries",
    phone: "+91 98765 43210",
    date: "May 17, 2026",
    time: "02:14 PM",
    outcome: "ai_resolved",
    intent: "Warranty Info",
    intentTone: "blue",
    duration: "3:12",
    durationSec: 192,
    transcript: rahulTranscript,
    summary: [
      "Customer called to confirm the warranty period and on-site service coverage for CNC machines.",
      "Voice agent shared the standard 2-year warranty covering manufacturing defects.",
      "On-site service confirmed within India; extended plans explained for international locations.",
      "Call resolved by AI — customer satisfied, no escalation required.",
    ],
    insights: [
      { label: "Intent", value: "Warranty Info", tone: "bg-[#eff6ff] text-[#2563eb]" },
      { label: "Sentiment", value: "Positive", tone: "bg-[#dcfce7] text-[#16a34a]" },
      { label: "Language", value: "English", tone: "" },
      { label: "Confidence", value: "0.94", tone: "bg-[#dcfce7] text-[#16a34a]" },
    ],
    topics: ["Warranty period", "On-site service", "Extended warranty plans"],
  },
}

function genericDetail(call: CallRecord): CallDetail {
  return {
    name: call.customerName,
    company: call.company,
    phone: call.phone,
    date: "May 17, 2026",
    time: "02:14 PM",
    outcome: call.outcome,
    intent: call.intent,
    intentTone: call.intentTone,
    duration: call.duration.replace("m ", ":").replace("s", ""),
    durationSec: call.durationSec,
    transcript: [
      { from: "customer", time: "00:00", text: `Hi, I have a question about ${call.intent.toLowerCase()}.` },
      {
        from: "ai",
        time: "00:05",
        text: "Thanks for calling! Let me look that up for you right away...",
      },
    ],
    summary: [
      `Customer called regarding ${call.intent.toLowerCase()}.`,
      call.outcome === "human_transfer"
        ? "Call was transferred to a human agent for specialized support."
        : call.outcome === "missed"
          ? "Call was not answered — consider a callback."
          : "Voice agent handled the call end-to-end.",
    ],
    insights: [
      { label: "Intent", value: call.intent, tone: "bg-[#eff6ff] text-[#2563eb]" },
      {
        label: "Sentiment",
        value: call.outcome === "missed" ? "Neutral" : "Positive",
        tone: call.outcome === "missed" ? "bg-[#f1f5f9] text-[#64748b]" : "bg-[#dcfce7] text-[#16a34a]",
      },
      { label: "Language", value: "English", tone: "" },
      { label: "Confidence", value: "0.89", tone: "bg-[#dcfce7] text-[#16a34a]" },
    ],
    topics: [call.intent, "Customer support"],
  }
}

export function getCallDetail(callId: string): CallDetail {
  return callDetailsById[callId] ?? genericDetail(recentCalls.find((c) => c.id === callId) ?? recentCalls[0])
}

export const voiceAgentConfig = {
  number: "+91 98765 43210",
  label: "Customer Support Number",
  rows: [
    { icon: "clock", title: "Business Hours", sub: "Mon – Sat, 9:00 AM – 8:00 PM" },
    { icon: "phone", title: "Call Handling", sub: "AI answers and handles calls" },
    { icon: "shield", title: "Escalation Rules", sub: "Transfer to human if low confidence" },
  ],
}

// deterministic waveform heights for the audio player
export const waveform = Array.from({ length: 64 }, (_, i) => {
  const a = Math.sin(i * 0.7) * 0.5 + 0.5
  const b = Math.sin(i * 1.9 + 1.2) * 0.5 + 0.5
  return Math.round(6 + (a * 0.6 + b * 0.4) * 18)
})
