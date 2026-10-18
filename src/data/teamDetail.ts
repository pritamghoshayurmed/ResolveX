export type MemberRole = "Owner" | "Admin" | "Team Lead" | "Support Agent" | "Analyst" | "Viewer"

export type Department =
  | "Management"
  | "Customer Support"
  | "Technical Support"
  | "Operations"
  | "Marketing"

export type MemberStatus = "Online" | "Away" | "Offline"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: MemberRole
  department: Department
  status: MemberStatus
  lastActive: string
  joinedDate: string
  avatar: string
  tone: string
}

export const teamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Pritam Ghosh",
    email: "pritam@woodmastercnc.com",
    role: "Owner",
    department: "Management",
    status: "Online",
    lastActive: "Now",
    joinedDate: "Jan 10, 2025",
    avatar: "PG",
    tone: "blue",
  },
  {
    id: "tm-2",
    name: "Riya Sharma",
    email: "riya@woodmastercnc.com",
    role: "Support Agent",
    department: "Customer Support",
    status: "Online",
    lastActive: "5 min ago",
    joinedDate: "Feb 14, 2025",
    avatar: "RS",
    tone: "pink",
  },
  {
    id: "tm-3",
    name: "Arjun Nair",
    email: "arjun@woodmastercnc.com",
    role: "Support Agent",
    department: "Customer Support",
    status: "Online",
    lastActive: "12 min ago",
    joinedDate: "Feb 18, 2025",
    avatar: "AN",
    tone: "indigo",
  },
  {
    id: "tm-4",
    name: "Siddharth Rao",
    email: "siddharth@woodmastercnc.com",
    role: "Team Lead",
    department: "Customer Support",
    status: "Away",
    lastActive: "1 hour ago",
    joinedDate: "Feb 5, 2025",
    avatar: "SR",
    tone: "amber",
  },
  {
    id: "tm-5",
    name: "Neha Kapoor",
    email: "neha@woodmastercnc.com",
    role: "Support Agent",
    department: "Customer Support",
    status: "Online",
    lastActive: "20 min ago",
    joinedDate: "Mar 1, 2025",
    avatar: "NK",
    tone: "violet",
  },
  {
    id: "tm-6",
    name: "Amit Shaw",
    email: "amit@woodmastercnc.com",
    role: "Support Agent",
    department: "Technical Support",
    status: "Offline",
    lastActive: "3 hours ago",
    joinedDate: "Mar 8, 2025",
    avatar: "AS",
    tone: "teal",
  },
  {
    id: "tm-7",
    name: "Deepak Singh",
    email: "deepak@woodmastercnc.com",
    role: "Analyst",
    department: "Operations",
    status: "Online",
    lastActive: "1 hour ago",
    joinedDate: "Mar 12, 2025",
    avatar: "DS",
    tone: "rose",
  },
  {
    id: "tm-8",
    name: "Vikram Patel",
    email: "vikram@woodmastercnc.com",
    role: "Support Agent",
    department: "Customer Support",
    status: "Offline",
    lastActive: "5 hours ago",
    joinedDate: "Mar 20, 2025",
    avatar: "VP",
    tone: "gray",
  },
  {
    id: "tm-9",
    name: "Priya Singh",
    email: "priya@woodmastercnc.com",
    role: "Admin",
    department: "Management",
    status: "Online",
    lastActive: "30 min ago",
    joinedDate: "Apr 2, 2025",
    avatar: "PS",
    tone: "purple",
  },
  {
    id: "tm-10",
    name: "Anjali Nair",
    email: "anjali@woodmastercnc.com",
    role: "Viewer",
    department: "Marketing",
    status: "Offline",
    lastActive: "1 day ago",
    joinedDate: "Apr 15, 2025",
    avatar: "AN",
    tone: "green",
  },
  {
    id: "tm-11",
    name: "Meera Joshi",
    email: "meera@woodmastercnc.com",
    role: "Admin",
    department: "Operations",
    status: "Online",
    lastActive: "2 hours ago",
    joinedDate: "May 2, 2025",
    avatar: "MJ",
    tone: "coral",
  },
  {
    id: "tm-12",
    name: "Rahul Verma",
    email: "rahul@woodmastercnc.com",
    role: "Support Agent",
    department: "Technical Support",
    status: "Offline",
    lastActive: "2 days ago",
    joinedDate: "May 6, 2025",
    avatar: "RV",
    tone: "amber",
  },
]

export interface TeamKpi {
  id: string
  title: string
  value: number
  sub: string
  tone: "blue" | "green" | "purple" | "orange"
  sparkline: number[]
}

export const teamKpis: TeamKpi[] = [
  {
    id: "total",
    title: "Total Members",
    value: 12,
    sub: "↑ 2 new this month",
    tone: "blue",
    sparkline: [10, 11, 10, 12, 11, 13, 12, 12],
  },
  {
    id: "active",
    title: "Active Members",
    value: 11,
    sub: "91.7% of total",
    tone: "green",
    sparkline: [9, 10, 9, 11, 10, 11, 10, 11],
  },
  {
    id: "admin",
    title: "Admin Members",
    value: 2,
    sub: "16.7% of total",
    tone: "purple",
    sparkline: [1, 2, 1, 2, 1, 2, 2, 2],
  },
  {
    id: "agents",
    title: "Agent Members",
    value: 7,
    sub: "58.3% of total",
    tone: "orange",
    sparkline: [5, 6, 5, 6, 6, 7, 6, 7],
  },
]

export interface TeamActivity {
  id: string
  title: string
  sub: string
  time: string
  icon: "login" | "added" | "role" | "permissions"
}

export const teamActivity: TeamActivity[] = [
  {
    id: "act-1",
    title: "Riya Sharma logged in",
    sub: "Signed in from Chrome on Windows",
    time: "5 minutes ago",
    icon: "login",
  },
  {
    id: "act-2",
    title: "New member added",
    sub: "Rahul Verma joined the team",
    time: "2 hours ago",
    icon: "added",
  },
  {
    id: "act-3",
    title: "Role updated",
    sub: "Meera Joshi → Admin",
    time: "5 hours ago",
    icon: "role",
  },
  {
    id: "act-4",
    title: "Permissions changed",
    sub: "Siddharth Rao permissions updated",
    time: "1 day ago",
    icon: "permissions",
  },
  {
    id: "act-5",
    title: "Siddharth Rao logged in",
    sub: "Signed in from Safari on macOS",
    time: "1 day ago",
    icon: "login",
  },
  {
    id: "act-6",
    title: "Settings changed",
    sub: "Ticket auto-assignment enabled",
    time: "2 days ago",
    icon: "permissions",
  },
]

export const rolePermissions: {
  id: string
  role: MemberRole
  description: string
  permissions: string[]
}[] = [
  {
    id: "perm-owner",
    role: "Owner",
    description: "Full access to everything in the workspace",
    permissions: ["Billing", "Members", "Integrations", "Data", "Security"],
  },
  {
    id: "perm-admin",
    role: "Admin",
    description: "Manage members, settings and integrations",
    permissions: ["Members", "Integrations", "Data"],
  },
  {
    id: "perm-lead",
    role: "Team Lead",
    description: "Manage agents, assignments and routing rules",
    permissions: ["Members (read)", "Routing"],
  },
  {
    id: "perm-agent",
    role: "Support Agent",
    description: "Handle conversations, tickets and calls",
    permissions: ["Conversations", "Tickets", "Knowledge Base (read)"],
  },
  {
    id: "perm-analyst",
    role: "Analyst",
    description: "View and export analytics data",
    permissions: ["Analytics", "Export"],
  },
  {
    id: "perm-viewer",
    role: "Viewer",
    description: "Read-only access to dashboards",
    permissions: ["Dashboards (read)"],
  },
]

export const teamSettings: { id: string; title: string; sub: string; value: boolean }[] = [
  {
    id: "ts-1",
    title: "Require admin approval for new members",
    sub: "New invites must be approved by an admin before joining",
    value: true,
  },
  {
    id: "ts-2",
    title: "Auto-assign new conversations",
    sub: "Route new conversations to available agents automatically",
    value: true,
  },
  {
    id: "ts-3",
    title: "Weekly activity digest",
    sub: "Send a summary of team activity every Monday",
    value: false,
  },
  {
    id: "ts-4",
    title: "Show online status",
    sub: "Let teammates see when members are online or away",
    value: true,
  },
]
