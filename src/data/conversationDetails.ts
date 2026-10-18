export interface ThreadMessage {
  id: string
  from: "customer" | "ai" | "you"
  text: string
  time: string
  sources?: { title: string; sub: string; kind: "pdf" | "doc" }[]
}

export interface CustomerDetail {
  name: string
  initials: string
  email: string
  phone: string
  company: string
  location: string
  customerType: string
  totalConversations: number
  totalTickets: number
  customerSince: string
  intent: string
  sentiment: "positive" | "neutral" | "negative"
  language: string
  confidence: string
  relatedKnowledge: { title: string; sub: string; kind: "pdf" | "doc" | "link" }[]
  ticket?: {
    id: string
    status: string
    subject: string
    meta: string
  }
}

interface ConversationThread {
  messages: ThreadMessage[]
  detail: CustomerDetail
}

const rahulThread: ConversationThread = {
  messages: [
    {
      id: "m-1",
      from: "customer",
      text: "What is the warranty period for CNC machines?",
      time: "2:14 PM",
    },
    {
      id: "m-2",
      from: "ai",
      text: "Your CNC machines come with a standard 2-year warranty covering manufacturing defects. Extended warranty plans are also available on request.",
      time: "2:14 PM",
    },
    {
      id: "m-3",
      from: "customer",
      text: "Does the warranty include on-site service?",
      time: "2:15 PM",
    },
    {
      id: "m-4",
      from: "ai",
      text: "Yes, the standard warranty includes on-site service within India. For international locations, on-site service is available with extended warranty plans.",
      time: "2:16 PM",
      sources: [
        { title: "Warranty Policy.pdf", sub: "Page 3", kind: "pdf" },
        { title: "Service & Support FAQ", sub: "Section 2.1", kind: "doc" },
      ],
    },
    {
      id: "m-5",
      from: "customer",
      text: "Great! Can you also share the process to claim the warranty?",
      time: "2:16 PM",
    },
  ],
  detail: {
    name: "Rahul Mehta",
    initials: "RM",
    email: "rahul.mehta@gmail.com",
    phone: "+91 98765 43210",
    company: "Mehta Industries",
    location: "Kolkata, India",
    customerType: "Existing Customer",
    totalConversations: 12,
    totalTickets: 4,
    customerSince: "Jan 12, 2025",
    intent: "Warranty Information",
    sentiment: "positive",
    language: "English",
    confidence: "0.92",
    relatedKnowledge: [
      { title: "Warranty Policy.pdf", sub: "Page 3 • 92% match", kind: "pdf" },
      { title: "Service & Support FAQ", sub: "Section 2.1 • 87% match", kind: "doc" },
      { title: "Warranty Claim Process", sub: "Help Center Article • 81% match", kind: "link" },
    ],
    ticket: {
      id: "#TK-1024",
      status: "Resolved",
      subject: "Warranty information for CNC machines",
      meta: "Created: May 15, 2026 • Resolved: May 15, 2026",
    },
  },
}

function genericThread(
  name: string,
  message: string,
  contact: string,
): ConversationThread {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return {
    messages: [
      { id: "m-1", from: "customer", text: message, time: "Just now" },
      {
        id: "m-2",
        from: "ai",
        text: "Thanks for reaching out! I've noted your request and our team will follow up shortly with the details you need.",
        time: "Just now",
        sources: [
          { title: "Service & Support FAQ", sub: "Section 1.4", kind: "doc" },
        ],
      },
    ],
    detail: {
      name,
      initials,
      email: `${name.split(" ")[0].toLowerCase()}@example.com`,
      phone: contact,
      company: "—",
      location: "India",
      customerType: "Existing Customer",
      totalConversations: 5,
      totalTickets: 2,
      customerSince: "Mar 4, 2025",
      intent: "General Enquiry",
      sentiment: "neutral",
      language: "English",
      confidence: "0.87",
      relatedKnowledge: [
        { title: "Service & Support FAQ", sub: "Section 1.4 • 78% match", kind: "doc" },
        { title: "AMC Policy 2026.pdf", sub: "Page 1 • 74% match", kind: "pdf" },
      ],
    },
  }
}

export function getThread(convId: string): ConversationThread {
  if (convId === "c-1") return rahulThread
  const [name, contact] = convDetailsMeta[convId] ?? ["Customer", ""]
  return genericThread(name, convMessages[convId] ?? "Hi, I need some help.", contact)
}

export const convDetailsMeta: Record<string, [string, string]> = {
  "c-2": ["Sneha Kapoor", "+91 91234 56789"],
  "c-3": ["Deepak Verma", "+91 87654 32109"],
  "c-4": ["Amit Shaw", "+91 98989 76654"],
  "c-5": ["Priya Singh", "+91 93300 11223"],
  "c-6": ["Vikram Patel", "+91 98220 44112"],
  "c-7": ["Neha Joshi", "+91 90990 55432"],
  "c-8": ["Karan Malhotra", "+91 88001 23456"],
}

export const convMessages: Record<string, string> = {
  "c-2": "I want to know about machine installation...",
  "c-3": "Can you share the price list?",
  "c-4": "Need support for error code E101",
  "c-5": "How to book a service?",
  "c-6": "Machine delivery date confirmation for order #4471",
  "c-7": "Requesting AMC renewal quote for 2 machines",
  "c-8": "Spindle part availability for WM-300X",
}
