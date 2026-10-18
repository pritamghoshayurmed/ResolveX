import { useMemo, useState } from "react"
import {
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Database,
  FileText,
  Globe,
  HelpCircle,
  Link2,
  ListFilter,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Upload,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"
import { Panel } from "@/components/ui/panel"
import { SelectMenu } from "@/components/ui/select-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import {
  addKnowledgeActions,
  aiUsage,
  connectedSources,
  kbItems,
  kbKpis,
  kbStatus,
  type KbItem,
} from "@/data/kbDetail"
import { cn } from "@/lib/utils"

/* ---------------------------------- helpers ---------------------------------- */

const typeTones: Record<KbItem["type"], string> = {
  Document: "bg-[#eff6ff] text-[#2563eb]",
  FAQ: "bg-[#faf5ff] text-[#7c3aed]",
  "Web Page": "bg-[#fff7ed] text-[#c2410c]",
  Database: "bg-[#ecfdf5] text-[#059669]",
  API: "bg-[#faf5ff] text-[#7c3aed]",
}

const statusTones: Record<KbItem["status"], string> = {
  Indexed: "bg-[#ecfdf5] text-[#059669]",
  Processing: "bg-[#fff7ed] text-[#c2410c]",
  Synced: "bg-[#eff6ff] text-[#2563eb]",
  Failed: "bg-[#fef2f2] text-[#dc2626]",
}

function KbIcon({ kind, className }: { kind: KbItem["icon"]; className?: string }) {
  switch (kind) {
    case "pdf":
      return (
        <span
          className={cn(
            "flex items-center justify-center rounded-[9px] bg-[#fef2f2] text-[8.5px] font-bold text-[#dc2626]",
            className ?? "size-9",
          )}
        >
          PDF
        </span>
      )
    case "file-blue":
      return (
        <span className={cn("flex items-center justify-center rounded-[9px] bg-[#eff6ff] text-[#2563eb]", className ?? "size-9")}>
          <FileText className="size-4" />
        </span>
      )
    case "file-orange":
      return (
        <span className={cn("flex items-center justify-center rounded-[9px] bg-[#fff7ed] text-[#ea580c]", className ?? "size-9")}>
          <HelpCircle className="size-4" />
        </span>
      )
    case "link-purple":
      return (
        <span className={cn("flex items-center justify-center rounded-[9px] bg-[#f3e8ff] text-[#7c3aed]", className ?? "size-9")}>
          <Link2 className="size-4" />
        </span>
      )
    case "notion":
      return (
        <span
          className={cn(
            "flex items-center justify-center rounded-[9px] bg-[#dcfce7] text-[14px] font-bold text-[#16a34a]",
            className ?? "size-9",
          )}
        >
          N
        </span>
      )
    case "db-green":
      return (
        <span className={cn("flex items-center justify-center rounded-[9px] bg-[#dcfce7] text-[#16a34a]", className ?? "size-9")}>
          <Database className="size-4" />
        </span>
      )
    case "globe-blue":
      return (
        <span className={cn("flex items-center justify-center rounded-[9px] bg-[#dbeafe] text-[#2563eb]", className ?? "size-9")}>
          <Globe className="size-4" />
        </span>
      )
  }
}

function motionDelay(index: number) {
  return { duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] as const }
}

/* ------------------------------------ page ------------------------------------ */

type KbTab = "all" | "documents" | "faqs" | "web" | "notion" | "api"

export function KnowledgeBase() {
  const [tab, setTab] = useState<KbTab>("all")
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    let list = kbItems
    if (tab === "documents") list = list.filter((i) => i.type === "Document")
    if (tab === "faqs") list = list.filter((i) => i.type === "FAQ")
    if (tab === "web") list = list.filter((i) => i.type === "Web Page")
    if (tab === "notion") list = list.filter((i) => i.source === "Notion")
    if (tab === "api") list = list.filter((i) => i.type === "API")
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((i) => `${i.name} ${i.subtitle}`.toLowerCase().includes(q))
    return list
  }, [tab, query])

  const tabs: { key: KbTab; label: string; count: number }[] = [
    { key: "all", label: "All Content", count: 58 },
    { key: "documents", label: "Documents", count: 28 },
    { key: "faqs", label: "FAQs", count: 24 },
    { key: "web", label: "Web Pages", count: 6 },
    { key: "notion", label: "Notion", count: 0 },
    { key: "api", label: "API Sources", count: 0 },
  ]

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">Knowledge Base</h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Manage your company knowledge, FAQs and documents to help AI agents answer customer
            queries accurately.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13.5px] font-medium text-[#1d4ed8] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-colors hover:bg-[#f8fafc]">
            <Sparkles className="size-4 text-[#2563eb]" />
            Test Knowledge
          </button>
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#0f172a] px-4 text-[13.5px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1e293b]">
            <Plus className="size-4" strokeWidth={2.2} />
            Add Content
            <ChevronDown className="size-3.5 opacity-70" />
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_345px]">
        {/* Primary column */}
        <div className="min-w-0 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kbKpis.map((kpi, i) => (
              <KbMetricCard key={kpi.id} kpi={kpi} index={i} />
            ))}
          </div>

          {/* Table */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
            <Panel>
              {/* Tabs + search */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8ebf1] px-5 pt-4">
                <div className="flex flex-wrap items-center gap-1">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      role="tab"
                      aria-selected={tab === t.key}
                      className={cn(
                        "relative flex items-center gap-1.5 px-2.5 pb-3 pt-1 text-[13px] font-medium transition-colors",
                        "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2.5px] after:rounded-full after:bg-[#2563eb] after:transition-opacity",
                        tab === t.key
                          ? "text-[#2563eb] after:opacity-100"
                          : "text-[#64748b] after:opacity-0 hover:text-[#0f172a]",
                      )}
                    >
                      {t.label}
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                          tab === t.key ? "bg-[#2563eb] text-white" : "bg-[#f1f5f9] text-[#64748b]",
                        )}
                      >
                        {t.count}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pb-3">
                  <div className="flex h-9 w-[220px] items-center gap-2 rounded-[10px] border border-[#e8ebf1] bg-[#f7f8fb] px-3 transition-colors focus-within:border-[#c7d7f5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2563eb]/15">
                    <Search className="size-3.5 shrink-0 text-[#94a3b8]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search knowledge base..."
                      aria-label="Search knowledge base"
                      className="w-full bg-transparent text-[12.5px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>
                  <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                    <ListFilter className="size-3.5 text-[#64748b]" /> Filters
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#eef1f6] text-[12px] font-medium text-[#94a3b8]">
                      <th className="w-10 py-3 pl-5 font-medium">
                        <input type="checkbox" aria-label="Select all" className="size-3.5 accent-[#2563eb]" />
                      </th>
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium">Type</th>
                      <th className="py-3 font-medium">Source</th>
                      <th className="py-3 font-medium">Status</th>
                      <th className="py-3 font-medium">Last Updated</th>
                      <th className="py-3 font-medium">Chunks</th>
                      <th className="py-3 pr-5 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item) => (
                      <KbRow key={item.id} item={item} />
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-[13px] text-[#94a3b8]">
                          {tab === "notion" || tab === "api"
                            ? "No items in this source yet."
                            : "No content matches your search."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1f6] px-5 py-3.5">
                <p className="text-[12.5px] text-[#94a3b8]">
                  Showing 1 to {rows.length} of {tab === "all" && !query ? 58 : rows.length} items
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    aria-label="Previous page"
                    className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f1f5f9]"
                  >
                    <ChevronRight className="size-4 rotate-180" />
                  </button>
                  {[1, 2, 3, 4, 5, 6].map((p) => (
                    <button
                      key={p}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg text-[12.5px] font-medium transition-colors",
                        p === 1 ? "bg-[#2563eb] text-white" : "text-[#475569] hover:bg-[#f1f5f9]",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    aria-label="Next page"
                    className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f1f5f9]"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <SelectMenu
                    value="10 per page"
                    options={["10 per page", "20 per page", "50 per page"]}
                    onChange={() => undefined}
                    className="ml-2 h-8.5 text-[12.5px]"
                  />
                </div>
              </div>
            </Panel>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-5">
          <KbStatusCard />
          <AddKnowledgeCard />
          <ConnectedSourcesCard />
          <AiUsageCard />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- metric card ------------------------------- */

const kpiTones = {
  blue: {
    iconBg: "bg-[#dbeafe] text-[#2563eb]",
    bar: "#3b82f6",
    icon: FileText,
  },
  green: {
    iconBg: "bg-[#dcfce7] text-[#16a34a]",
    bar: "#22c55e",
    icon: Database,
  },
  purple: {
    iconBg: "bg-[#f3e8ff] text-[#9333ea]",
    bar: "#a855f7",
    icon: HelpCircle,
  },
  blue2: {
    iconBg: "bg-[#e0e7ff] text-[#4f46e5]",
    bar: "#6366f1",
    icon: Globe,
  },
} as const

function KbMetricCard({ kpi, index }: { kpi: (typeof kbKpis)[number]; index: number }) {
  const t = kpiTones[kpi.tone]
  const Icon = t.icon
  const data = kpi.sparkline.map((v, i) => ({ i, v }))

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay(index)}
      whileHover={{ y: -2 }}
      className="rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_-6px_rgba(15,23,42,0.1)]"
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("flex size-8.5 shrink-0 items-center justify-center rounded-[9px]", t.iconBg)}>
          <Icon className="size-4" strokeWidth={2.1} />
        </span>
        <h3 className="text-[13.5px] font-medium text-[#475569]">{kpi.title}</h3>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[26px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
            {kpi.display}
          </p>
          <p className="mt-2.5 flex items-center gap-1 text-[12.5px] font-semibold text-[#16a34a]">
            <ArrowUp className="size-3.5" strokeWidth={2.5} />
            {kpi.deltaPct}%
          </p>
          <p className="mt-0.5 text-[11.5px] text-[#94a3b8]">vs last month</p>
        </div>
        <div className="h-[52px] w-[86px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }} barCategoryGap="22%">
              <Bar dataKey="v" fill={t.bar} radius={[3, 3, 0, 0]} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.article>
  )
}

/* -------------------------------- table row -------------------------------- */

function KbRow({ item }: { item: KbItem }) {
  return (
    <tr className="cursor-pointer border-b border-[#f1f5f9] text-[13px] transition-colors last:border-b-0 hover:bg-[#f8fafc]">
      <td className="py-3 pl-5" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" aria-label={`Select ${item.name}`} className="size-3.5 accent-[#2563eb]" />
      </td>
      <td className="py-3">
        <span className="flex items-center gap-3">
          <KbIcon kind={item.icon} className="size-9 shrink-0" />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{item.name}</span>
            <span className="block truncate text-[11.5px] text-[#94a3b8]">{item.subtitle}</span>
          </span>
        </span>
      </td>
      <td className="py-3">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", typeTones[item.type])}>
          {item.type}
        </span>
      </td>
      <td className="py-3 text-[#475569]">{item.source}</td>
      <td className="py-3">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", statusTones[item.status])}>
          {item.status}
        </span>
      </td>
      <td className="py-3">
        <span className="block text-[12.5px] text-[#334155]">{item.updatedDate}</span>
        <span className="block text-[11.5px] text-[#94a3b8]">{item.updatedBy}</span>
      </td>
      <td className="py-3 tabular-nums text-[#475569]">{item.chunks}</td>
      <td className="py-3 pr-5" onClick={(e) => e.stopPropagation()}>
        <span className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Actions for ${item.name}`}
              className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Re-index</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </td>
    </tr>
  )
}

/* ------------------------------ right column ------------------------------ */

function KbStatusCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(0)}>
      <Panel className="px-5 pb-5 pt-5">
        <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
          Knowledge Base Status
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative h-[148px] w-[148px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={kbStatus}
                  dataKey="value"
                  innerRadius={52}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                  stroke="none"
                  animationDuration={900}
                >
                  {kbStatus.map((s) => (
                    <Cell key={s.label} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-bold tracking-[-0.02em] text-[#0f172a]">92%</span>
              <span className="text-[11.5px] text-[#94a3b8]">Indexed</span>
            </span>
          </div>
          <div className="min-w-0 flex-1 space-y-2.5">
            {kbStatus.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[12.5px]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[#475569]">{s.label}</span>
                <span className="ml-auto font-semibold text-[#0f172a]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}

const actionIcons = {
  upload: { Icon: Upload, cls: "bg-[#dbeafe] text-[#2563eb]" },
  globe: { Icon: Globe, cls: "bg-[#dcfce7] text-[#16a34a]" },
  faq: { Icon: HelpCircle, cls: "bg-[#ffedd5] text-[#ea580c]" },
  db: { Icon: Database, cls: "bg-[#ccfbf1] text-[#0d9488]" },
} as const

function AddKnowledgeCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
      <Panel className="px-5 pb-3 pt-5">
        <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">Add Knowledge</h2>
        <div className="mt-1">
          {addKnowledgeActions.map((a) => {
            const { Icon, cls } = actionIcons[a.icon]
            return (
              <button
                key={a.id}
                className="flex w-full items-center gap-3 border-b border-[#eef1f6] py-3 text-left transition-colors last:border-b-0 hover:bg-[#f8fafc]"
              >
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-[10px]", cls)}>
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{a.title}</span>
                  <span className="block truncate text-[12px] text-[#94a3b8]">{a.sub}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-[#cbd5e1]" />
              </button>
            )
          })}
        </div>
      </Panel>
    </motion.div>
  )
}

function SourceIcon({ kind }: { kind: (typeof connectedSources)[number]["icon"] }) {
  if (kind === "notion") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#0f172a] text-[13px] font-bold text-white">
        N
      </span>
    )
  }
  if (kind === "drive") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#f8fafc]">
        <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden>
          <path d="M8.2 3h7.6L22 15.6H14.4L8.2 3Z" fill="#ffc107" />
          <path d="M8.2 3 1 15.6 4.8 22l7.2-12.6L8.2 3Z" fill="#1e88e5" />
          <path d="M14.4 15.6H22l-3.8 6.4H10.6l3.8-6.4Z" fill="#4caf50" />
        </svg>
      </span>
    )
  }
  if (kind === "postgres") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#eff6ff] text-[#1d4ed8]">
        <Database className="size-4" />
      </span>
    )
  }
  if (kind === "api") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#f3e8ff] text-[#7c3aed]">
        <Link2 className="size-4" />
      </span>
    )
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#dbeafe] text-[#2563eb]">
      <Globe className="size-4" />
    </span>
  )
}

function ConnectedSourcesCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(2)}>
      <Panel>
        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Connected Sources
          </h2>
          <button className="text-[12.5px] font-medium text-[#2563eb] hover:underline">View All</button>
        </div>
        <div className="px-3.5 pb-4">
          {connectedSources.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-[12px] px-1.5 py-2.5 transition-colors hover:bg-[#f8fafc]"
            >
              <SourceIcon kind={s.icon} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{s.name}</span>
                <span className="block truncate text-[11.5px] text-[#94a3b8]">{s.sub}</span>
              </span>
              <span className="inline-flex shrink-0 rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-medium text-[#059669]">
                Active
              </span>
              <button
                aria-label={`Options for ${s.name}`}
                className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
              >
                <MoreVertical className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </motion.div>
  )
}

function AiUsageCard() {
  const data = aiUsage.sparkline.map((v, i) => ({ i, v }))

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(3)}>
      <Panel className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">AI Usage</h2>
          <SelectMenu
            value="This Month"
            options={["This Month", "Last Month", "Last 90 Days"]}
            onChange={() => undefined}
            className="h-8 text-[12.5px]"
          />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[12.5px] text-[#64748b]">{aiUsage.label}</p>
            <p className="mt-1.5 text-[24px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
              {aiUsage.value}
            </p>
            <p className="mt-2 flex items-center gap-1 text-[12.5px] font-semibold text-[#16a34a]">
              <ArrowUp className="size-3.5" strokeWidth={2.5} />
              {aiUsage.deltaPct}%
            </p>
          </div>
          <div className="h-[56px] w-[120px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="kb-usage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.18)" />
                    <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#2563eb"
                  strokeWidth={1.8}
                  fill="url(#kb-usage)"
                  animationDuration={900}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}
