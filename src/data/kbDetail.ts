export type KbType = "Document" | "FAQ" | "Web Page" | "Database" | "API"
export type KbStatus = "Indexed" | "Processing" | "Synced" | "Failed"

export interface KbItem {
  id: string
  name: string
  subtitle: string
  type: KbType
  source: string
  status: KbStatus
  updatedDate: string
  updatedBy: string
  chunks: string
  icon:
    | "pdf"
    | "file-blue"
    | "link-purple"
    | "notion"
    | "db-green"
    | "globe-blue"
    | "file-orange"
}

export const kbKpis = [
  {
    id: "docs",
    title: "Total Documents",
    display: "58",
    deltaPct: 12.5,
    tone: "blue" as const,
    icon: "file" as const,
    sparkline: [8, 10, 9, 12, 11, 14, 13, 16, 15, 18, 17, 21],
  },
  {
    id: "chunks",
    title: "Indexed Chunks",
    display: "12,480",
    deltaPct: 18.3,
    tone: "green" as const,
    icon: "db" as const,
    sparkline: [10, 12, 11, 15, 14, 17, 16, 20, 19, 22, 21, 26],
  },
  {
    id: "faqs",
    title: "FAQs",
    display: "24",
    deltaPct: 9.1,
    tone: "purple" as const,
    icon: "faq" as const,
    sparkline: [7, 9, 8, 11, 10, 13, 12, 15, 14, 16, 15, 18],
  },
  {
    id: "web",
    title: "Web Pages",
    display: "8",
    deltaPct: 14.2,
    tone: "blue2" as const,
    icon: "globe" as const,
    sparkline: [5, 7, 6, 8, 7, 10, 9, 12, 11, 14, 13, 16],
  },
]

export const kbItems: KbItem[] = [
  {
    id: "kb-1",
    name: "Warranty Policy.pdf",
    subtitle: "Product warranty terms and conditions",
    type: "Document",
    source: "Upload",
    status: "Indexed",
    updatedDate: "May 20, 2026",
    updatedBy: "by Pritam Ghosh",
    chunks: "420",
    icon: "pdf",
  },
  {
    id: "kb-2",
    name: "Service & Support FAQ",
    subtitle: "Common support questions",
    type: "FAQ",
    source: "Manual",
    status: "Indexed",
    updatedDate: "May 18, 2026",
    updatedBy: "by Riya Sharma",
    chunks: "320",
    icon: "file-blue",
  },
  {
    id: "kb-3",
    name: "CNC Machine Product Catalog",
    subtitle: "Complete product catalog with specifications",
    type: "Web Page",
    source: "Website",
    status: "Indexed",
    updatedDate: "May 15, 2026",
    updatedBy: "by Arjun Nair",
    chunks: "580",
    icon: "link-purple",
  },
  {
    id: "kb-4",
    name: "Internal SOPs",
    subtitle: "Standard operating procedures",
    type: "Document",
    source: "Notion",
    status: "Indexed",
    updatedDate: "May 12, 2026",
    updatedBy: "by Pritam Ghosh",
    chunks: "210",
    icon: "notion",
  },
  {
    id: "kb-5",
    name: "Pricing & Quotation Guidelines",
    subtitle: "Pricing rules and discount policies",
    type: "Document",
    source: "Upload",
    status: "Processing",
    updatedDate: "May 10, 2026",
    updatedBy: "by Riya Sharma",
    chunks: "—",
    icon: "file-blue",
  },
  {
    id: "kb-6",
    name: "Product Knowledge (Database)",
    subtitle: "Machine models, specs and availability",
    type: "Database",
    source: "PostgreSQL",
    status: "Synced",
    updatedDate: "May 8, 2026",
    updatedBy: "Auto sync",
    chunks: "1,240",
    icon: "db-green",
  },
  {
    id: "kb-7",
    name: "Return & Refund Policy",
    subtitle: "Return, refund and cancellation terms",
    type: "Web Page",
    source: "Website",
    status: "Indexed",
    updatedDate: "May 5, 2026",
    updatedBy: "by Arjun Nair",
    chunks: "380",
    icon: "globe-blue",
  },
  {
    id: "kb-8",
    name: "Installation Guide.pdf",
    subtitle: "Step by step installation process",
    type: "Document",
    source: "Upload",
    status: "Indexed",
    updatedDate: "May 3, 2026",
    updatedBy: "by Siddharth Rao",
    chunks: "520",
    icon: "pdf",
  },
  {
    id: "kb-9",
    name: "Troubleshooting Guide",
    subtitle: "Common issues and solutions",
    type: "FAQ",
    source: "Manual",
    status: "Indexed",
    updatedDate: "Apr 28, 2026",
    updatedBy: "by Riya Sharma",
    chunks: "310",
    icon: "file-orange",
  },
  {
    id: "kb-10",
    name: "Parts & Accessories API",
    subtitle: "Live data from inventory system",
    type: "API",
    source: "REST API",
    status: "Synced",
    updatedDate: "Apr 25, 2026",
    updatedBy: "Auto sync",
    chunks: "860",
    icon: "link-purple",
  },
]

export const kbStatus = [
  { label: "Indexed", value: 52, color: "#22c55e" },
  { label: "Processing", value: 3, color: "#3b82f6" },
  { label: "Syncing", value: 2, color: "#facc15" },
  { label: "Failed", value: 1, color: "#94a3b8" },
]

export const addKnowledgeActions = [
  { id: "upload", title: "Upload Document", sub: "PDF, DOCX, TXT (Max 50MB)", icon: "upload" as const },
  { id: "web", title: "Add Web Page", sub: "Crawl and sync website content", icon: "globe" as const },
  { id: "faq", title: "Add FAQ", sub: "Manually create FAQs", icon: "faq" as const },
  { id: "data", title: "Connect Data Source", sub: "Notion, Drive, Database, API", icon: "db" as const },
]

export const connectedSources = [
  { id: "src-1", name: "Website", sub: "https://woodmastercnc.com", icon: "website" as const },
  { id: "src-2", name: "Google Drive", sub: "woodmastercnc@gmail.com", icon: "drive" as const },
  { id: "src-3", name: "Notion", sub: "Company Knowledge", icon: "notion" as const },
  { id: "src-4", name: "PostgreSQL", sub: "Product Database", icon: "postgres" as const },
  { id: "src-5", name: "REST API", sub: "Inventory & Parts", icon: "api" as const },
]

export const aiUsage = {
  label: "Knowledge queries",
  value: "1,248",
  deltaPct: 18.2,
  sparkline: [40, 52, 46, 58, 54, 66, 60, 72, 68, 80, 76, 92],
}
