import { useEffect, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Inbox,
  ListFilter,
  ListTodo,
  Mail,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Send,
  Smile,
  Sparkles,
  Ticket as TicketIcon,
  Timer,
} from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
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
  assigneeColors,
  getTicketDetail,
  ticketKpis,
  ticketRows,
  type TicketDetail,
  type TicketRow,
} from "@/data/ticketsDetail"
import { cn } from "@/lib/utils"
import type { TicketStatus } from "@/types"

/* ---------------------------------- helpers ---------------------------------- */

const statusMeta: Record<TicketStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-[#fef2f2] text-[#dc2626]" },
  in_progress: { label: "In Progress", className: "bg-[#fff7ed] text-[#c2410c]" },
  resolved: { label: "Resolved", className: "bg-[#ecfdf5] text-[#059669]" },
  on_hold: { label: "On Hold", className: "bg-[#f1f5f9] text-[#64748b]" },
}

const priorityMeta: Record<TicketRow["priority"], string> = {
  High: "bg-[#fef2f2] text-[#dc2626]",
  Medium: "bg-[#fff7ed] text-[#c2410c]",
  Low: "bg-[#ecfdf5] text-[#059669]",
}

const avatarPalette = [
  { bg: "#dbeafe", fg: "#2563eb" },
  { bg: "#dcfce7", fg: "#16a34a" },
  { bg: "#f3e8ff", fg: "#7c3aed" },
  { bg: "#dcfce7", fg: "#059669" },
  { bg: "#f3e8ff", fg: "#6d28d9" },
  { bg: "#ccfbf1", fg: "#0d9488" },
  { bg: "#ffedd5", fg: "#c2410c" },
  { bg: "#fee2e2", fg: "#dc2626" },
  { bg: "#dbeafe", fg: "#1d4ed8" },
  { bg: "#d1fae5", fg: "#047857" },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.32 4.94L2 22l5.24-1.38a9.93 9.93 0 0 0 4.8 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.1c-1.52 0-3.02-.4-4.32-1.18l-.3-.18-3.12.82.84-3.04-.2-.32a8.05 8.05 0 0 1-1.24-4.24c0-4.46 3.62-8.1 8.06-8.1 4.46 0 8.08 3.64 8.08 8.1 0 4.46-3.64 8.14-7.8 8.14Zm4.44-6.06c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.1 3.64.58.24 1.02.38 1.38.5.58.18 1.1.16 1.52.1.46-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

function ChannelIcon({ channel, className }: { channel: TicketRow["channel"]; className?: string }) {
  if (channel === "whatsapp") return <WhatsAppIcon className={cn("text-[#16a34a]", className)} />
  if (channel === "email") return <Mail className={cn("text-[#2563eb]", className)} />
  if (channel === "voice") return <Phone className={cn("text-[#16a34a]", className)} />
  return <MessageCircle className={cn("text-[#2563eb]", className)} />
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function motionDelay(index: number) {
  return { duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] as const }
}

/* ------------------------------------ page ------------------------------------ */

type TicketsTab = "all" | TicketStatus

export function Tickets() {
  const [tab, setTab] = useState<TicketsTab>("all")
  const [channel, setChannel] = useState("All Channels")
  const [priority, setPriority] = useState("All Priority")
  const [assignee, setAssignee] = useState("All Assignees")
  const [selectedId, setSelectedId] = useState("#TK-1024")

  const selected = ticketRows.find((t) => t.id === selectedId) ?? ticketRows[0]
  const detail = getTicketDetail(selected.id)

  const rows = ticketRows
    .filter((t) => tab === "all" || t.status === tab)
    .filter((t) => channel === "All Channels" || t.channelLabel === channel)
    .filter((t) => priority === "All Priority" || t.priority === priority)
    .filter((t) => assignee === "All Assignees" || t.assignee === assignee)

  const tabs: { key: TicketsTab; label: string; count: number }[] = [
    { key: "all", label: "All Tickets", count: 186 },
    { key: "open", label: "Open", count: 27 },
    { key: "in_progress", label: "In Progress", count: 34 },
    { key: "resolved", label: "Resolved", count: 119 },
    { key: "on_hold", label: "On Hold", count: 6 },
  ]

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">Tickets</h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Manage and resolve customer support tickets across all channels.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <SelectMenu
            value="May 1, 2026 – May 31, 2026"
            options={[
              "May 1, 2026 – May 31, 2026",
              "Apr 1, 2026 – Apr 30, 2026",
              "Mar 1, 2026 – Mar 31, 2026",
            ]}
            onChange={() => undefined}
            icon={<CalendarDays className="size-4 text-[#64748b]" />}
            className="h-9.5 pr-3 pl-3.5 text-[13.5px]"
          />
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#0f172a] px-4 text-[13.5px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1e293b]">
            <Plus className="size-4" strokeWidth={2.2} />
            Create Ticket
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {ticketKpis.map((kpi, i) => (
          <TicketMetricCard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        {/* Table panel */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
          <Panel>
            {/* Tabs + filters */}
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
              <div className="flex flex-wrap items-center gap-2 pb-3">
                <SelectMenu
                  value={channel}
                  options={["All Channels", "Chat", "Voice", "Call", "WhatsApp", "Email"]}
                  onChange={setChannel}
                  className="h-8.5 text-[13px]"
                />
                <SelectMenu
                  value={priority}
                  options={["All Priority", "High", "Medium", "Low"]}
                  onChange={setPriority}
                  className="h-8.5 text-[13px]"
                />
                <SelectMenu
                  value={assignee}
                  options={["All Assignees", "Arjun Nair", "Riya Sharma", "Siddharth Rao"]}
                  onChange={setAssignee}
                  className="h-8.5 text-[13px]"
                />
                <button className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
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
                      <input type="checkbox" aria-label="Select all tickets" className="size-3.5 accent-[#2563eb]" />
                    </th>
                    <th className="py-3 font-medium">ID</th>
                    <th className="py-3 font-medium">Customer</th>
                    <th className="py-3 font-medium">Subject</th>
                    <th className="py-3 font-medium">Channel</th>
                    <th className="py-3 font-medium">Priority</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Assignee</th>
                    <th className="py-3 font-medium">
                      <span className="inline-flex items-center gap-1">
                        Updated At
                        <span className="flex flex-col leading-none">
                          <ArrowUp className="size-2.5 text-[#2563eb]" strokeWidth={2.5} />
                          <ArrowDown className="size-2.5 text-[#cbd5e1]" strokeWidth={2.5} />
                        </span>
                      </span>
                    </th>
                    <th className="w-10 py-3 pr-5" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <TicketTableRow
                      key={row.id}
                      row={row}
                      index={i}
                      selected={row.id === selectedId}
                      onSelect={() => setSelectedId(row.id)}
                    />
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-10 text-center text-[13px] text-[#94a3b8]">
                        No tickets match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1f6] px-5 py-3.5">
              <p className="text-[12.5px] text-[#94a3b8]">
                Showing 1 to {rows.length} of {tab === "all" ? 186 : tabs.find((t) => t.key === tab)?.count} tickets
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  aria-label="Previous page"
                  className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f1f5f9]"
                >
                  <ChevronRight className="size-4 rotate-180" />
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
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
                <span className="px-1 text-[12.5px] text-[#94a3b8]">…</span>
                <button className="flex size-8 items-center justify-center rounded-lg text-[12.5px] font-medium text-[#475569] transition-colors hover:bg-[#f1f5f9]">
                  19
                </button>
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

        {/* Detail panel */}
        <TicketDetailPanel detail={detail} />
      </div>
    </div>
  )
}

/* ------------------------------- metric card ------------------------------- */

const toneStyles = {
  blue: {
    iconBg: "bg-[#dbeafe] text-[#2563eb]",
    line: "#2563eb",
    fill: ["rgba(37,99,235,0.18)", "rgba(37,99,235,0)"],
    icon: TicketIcon,
  },
  orange: {
    iconBg: "bg-[#ffedd5] text-[#ea580c]",
    line: "#f97316",
    fill: ["rgba(249,115,22,0.18)", "rgba(249,115,22,0)"],
    icon: Inbox,
  },
  purple: {
    iconBg: "bg-[#f3e8ff] text-[#9333ea]",
    line: "#a855f7",
    fill: ["rgba(168,85,247,0.18)", "rgba(168,85,247,0)"],
    icon: ListTodo,
  },
  green: {
    iconBg: "bg-[#dcfce7] text-[#16a34a]",
    line: "#22c55e",
    fill: ["rgba(34,197,94,0.18)", "rgba(34,197,94,0)"],
    icon: CheckCircle2,
  },
  red: {
    iconBg: "bg-[#fee2e2] text-[#dc2626]",
    line: "#ef4444",
    fill: ["rgba(239,68,68,0.18)", "rgba(239,68,68,0)"],
    icon: Timer,
  },
} as const

function TicketMetricCard({
  kpi,
  index,
}: {
  kpi: (typeof ticketKpis)[number]
  index: number
}) {
  const t = toneStyles[kpi.tone]
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
        <h3 className="truncate text-[13.5px] font-medium text-[#475569]">{kpi.title}</h3>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[26px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
            {kpi.display}
          </p>
          <p
            className={cn(
              "mt-2.5 flex items-center gap-1 text-[12.5px] font-semibold",
              kpi.good ? "text-[#16a34a]" : "text-[#dc2626]",
            )}
          >
            {kpi.direction === "up" ? (
              <ArrowUp className="size-3.5" strokeWidth={2.5} />
            ) : (
              <ArrowDown className="size-3.5" strokeWidth={2.5} />
            )}
            {kpi.deltaPct}%
          </p>
          <p className="mt-0.5 text-[11.5px] text-[#94a3b8]">vs last month</p>
        </div>
        <div className="h-[52px] w-[84px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`tkpi-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.fill[0]} />
                  <stop offset="100%" stopColor={t.fill[1]} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={t.line}
                strokeWidth={1.8}
                fill={`url(#tkpi-${kpi.id})`}
                animationDuration={900}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.article>
  )
}

/* -------------------------------- table row -------------------------------- */

function TicketTableRow({
  row,
  index,
  selected,
  onSelect,
}: {
  row: TicketRow
  index: number
  selected: boolean
  onSelect: () => void
}) {
  const color = avatarPalette[index % avatarPalette.length]
  const status = statusMeta[row.status]
  const assigneeColor = assigneeColors[row.assignee]

  return (
    <tr
      onClick={onSelect}
      className={cn(
        "cursor-pointer border-b border-[#f1f5f9] text-[13px] transition-colors last:border-b-0",
        selected ? "bg-[#eef4ff]" : "hover:bg-[#f8fafc]",
      )}
    >
      <td className="py-3.5 pl-5" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" aria-label={`Select ${row.id}`} className="size-3.5 accent-[#2563eb]" />
      </td>
      <td className="py-3.5 font-semibold text-[#0f172a]">{row.id}</td>
      <td className="py-3.5">
        <span className="flex items-center gap-2.5">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11.5px] font-semibold"
            style={{ backgroundColor: color.bg, color: color.fg }}
          >
            {initialsOf(row.customerName)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{row.customerName}</span>
            <span className="block truncate text-[11.5px] text-[#94a3b8]">{row.phone}</span>
          </span>
        </span>
      </td>
      <td className="max-w-[180px] py-3.5">
        <span className="block truncate text-[#334155]">{row.subject}</span>
      </td>
      <td className="py-3.5">
        <span className="flex items-center gap-1.5 text-[12.5px] text-[#475569]">
          <ChannelIcon channel={row.channel} className="size-4" />
          {row.channelLabel}
        </span>
      </td>
      <td className="py-3.5">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", priorityMeta[row.priority])}>
          {row.priority}
        </span>
      </td>
      <td className="py-3.5">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", status.className)}>
          {status.label}
        </span>
      </td>
      <td className="py-3.5">
        <span className="flex items-center gap-2">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: assigneeColor.bg, color: assigneeColor.fg }}
          >
            {initialsOf(row.assignee)}
          </span>
          <span className="text-[12.5px] text-[#334155]">{row.assignee}</span>
        </span>
      </td>
      <td className="py-3.5 text-[#64748b]">{row.updatedLabel}</td>
      <td className="py-3.5 pr-5" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Actions for ${row.id}`}
            className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
          >
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Open ticket</DropdownMenuItem>
            <DropdownMenuItem>Reassign</DropdownMenuItem>
            <DropdownMenuItem>Change status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
              Delete ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

/* ------------------------------ detail panel ------------------------------ */

function TicketDetailPanel({ detail }: { detail: TicketDetail }) {
  const [tab, setTab] = useState("Conversation")
  const [draft, setDraft] = useState("")
  const [extra, setExtra] = useState<TicketDetail["messages"]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const status = statusMeta[detail.status]
  const messages = [...detail.messages, ...extra]

  useEffect(() => {
    setTab("Conversation")
    setDraft("")
    setExtra([])
  }, [detail.id])

  useEffect(() => {
    const last = extra[extra.length - 1]
    if (last) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [extra.length])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setExtra((e) => [
      ...e,
      {
        id: `agent-${Date.now()}`,
        from: "agent",
        text,
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      },
    ])
    setDraft("")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(2)}>
      <Panel className="flex flex-col xl:h-[980px]">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-[#eef1f6] px-5 py-4">
          <button className="flex items-center gap-1 text-[16px] font-bold tracking-[-0.01em] text-[#0f172a]">
            {detail.id}
            <ChevronDown className="size-4 text-[#94a3b8]" />
          </button>
          <span className={cn("ml-auto inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", status.className)}>
            {status.label}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Ticket options"
              className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Change status</DropdownMenuItem>
              <DropdownMenuItem>Change priority</DropdownMenuItem>
              <DropdownMenuItem>Assign to me</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
                Close ticket
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Customer */}
          <div className="px-5 pt-4">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d5e3fb] text-[13px] font-semibold text-[#2563eb]">
                {initialsOf(detail.customerName)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14.5px] font-semibold text-[#0f172a]">
                  {detail.customerName}
                </span>
                <span className="block truncate text-[12.5px] text-[#64748b]">{detail.phone}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                {[Phone, MessageCircle, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    aria-label={`Contact customer via ${["call", "chat", "email"][i]}`}
                    className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#475569] transition-colors hover:bg-[#f8fafc]"
                  >
                    <Icon className="size-3.5" />
                  </button>
                ))}
              </span>
            </div>
            <p className="mt-2.5 text-[12px] text-[#94a3b8]">
              Customer since {detail.customerSince} <span className="mx-1 text-[#dbe1ea]">·</span>{" "}
              {detail.previousTickets} previous tickets
            </p>

            {/* Subject + meta */}
            <h3 className="mt-3.5 text-[15px] font-semibold leading-snug text-[#0f172a]">
              {detail.subject}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="size-3.5 text-[#2563eb]" />
                {detail.channelLabel}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                  priorityMeta[detail.priority],
                )}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {detail.priority}
              </span>
              <span>{detail.createdLabel}</span>
              <span>{detail.updatedLabel}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-3.5 flex items-center gap-5 border-b border-[#eef1f6] px-5">
            {["Conversation", "Details", "AI Summary"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative pb-2.5 pt-1 text-[12.5px] font-medium transition-colors",
                  "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2.5px] after:rounded-full after:bg-[#2563eb] after:transition-opacity",
                  tab === t
                    ? "text-[#2563eb] after:opacity-100"
                    : "text-[#64748b] after:opacity-0 hover:text-[#0f172a]",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab body */}
          {tab === "Conversation" && (
            <div ref={scrollRef} className="space-y-3.5 px-5 py-4">
              {messages.map((m) => {
                if (m.from === "customer") {
                  return (
                    <div key={m.id} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d5e3fb] text-[11px] font-semibold text-[#2563eb]">
                        {initialsOf(detail.customerName)}
                      </span>
                      <span className="min-w-0">
                        <span className="block max-w-[260px] rounded-2xl rounded-tl-md bg-[#f1f4f9] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#0f172a]">
                          {m.text}
                        </span>
                        <span className="mt-1 flex items-center gap-1 pl-0.5 text-[11px] text-[#94a3b8]">
                          {m.time}
                          <svg viewBox="0 0 16 16" className="size-3 text-[#94a3b8]" fill="none" aria-hidden>
                            <path d="M2 8.5L5.5 12L11 4.5M7 9.5l1.5 2L14 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  )
                }
                return (
                  <div key={m.id} className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#6366f1]">
                      <Sparkles className="size-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-[280px] rounded-2xl rounded-tl-md bg-[#eef2ff] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#1e1b4b]">
                        {m.text}
                      </span>
                      <span className="mt-1 flex items-center gap-1 pl-0.5 text-[11px] text-[#94a3b8]">
                        {m.time}
                        <svg viewBox="0 0 16 16" className="size-3 text-[#94a3b8]" fill="none" aria-hidden>
                          <path d="M2 8.5L5.5 12L11 4.5M7 9.5l1.5 2L14 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </div>
                )
              })}

              {/* Knowledge sources */}
              <div className="rounded-[12px] bg-[#eff6ff] p-3">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1d4ed8]">
                  <BookOpen className="size-3.5" /> Knowledge Sources
                </p>
                <div className="mt-1.5">
                  {detail.knowledge.map((k) => (
                    <button
                      key={k.title}
                      className="group flex w-full items-center gap-2.5 rounded-lg px-1.5 py-2 text-left transition-colors hover:bg-white/70"
                    >
                      {k.kind === "pdf" ? (
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#fef2f2] text-[8px] font-bold text-[#dc2626]">
                          PDF
                        </span>
                      ) : (
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[#475569]">
                          <FileText className="size-4" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-[#0f172a]">{k.title}</span>
                        <span className="block truncate text-[11px] text-[#64748b]">{k.sub}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-[#93c5fd] transition-colors group-hover:text-[#2563eb]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "Details" && (
            <div className="px-5 py-4">
              {detail.details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between gap-3 border-b border-[#eef1f6] py-2.5 text-[13px] last:border-b-0"
                >
                  <span className="font-medium text-[#64748b]">{d.label}</span>
                  <span className="font-medium capitalize text-[#0f172a]">{d.value}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "AI Summary" && (
            <div className="space-y-3 px-5 py-4">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-[#0f172a]">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#eef2ff] text-[#6366f1]">
                  <Sparkles className="size-3.5" />
                </span>
                AI Summary
              </p>
              <ul className="space-y-2">
                {detail.aiSummary.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-[#475569]">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#16a34a]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Composer */}
        {tab === "Conversation" && (
          <div className="border-t border-[#eef1f6] p-3.5">
            <div className="flex items-end gap-2 rounded-[12px] border border-[#e2e8f0] bg-white px-3 py-2.5 transition-colors focus-within:border-[#c7d7f5] focus-within:ring-2 focus-within:ring-[#2563eb]/15">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                rows={1}
                placeholder="Type a message..."
                aria-label="Reply to customer"
                className="max-h-24 min-h-[24px] w-full resize-none bg-transparent text-[13px] leading-relaxed text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
              />
              <span className="flex shrink-0 items-center gap-0.5">
                {[Paperclip, Smile, ImageIcon].map((Icon, i) => (
                  <button
                    key={i}
                    aria-label={`Attachment action ${i + 1}`}
                    className="flex size-7 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
                <button
                  onClick={send}
                  aria-label="Send message"
                  className="ml-1 flex size-9 items-center justify-center rounded-[10px] bg-[#2563eb] text-white transition-colors hover:bg-[#1d4ed8]"
                >
                  <Send className="size-4" />
                </button>
              </span>
            </div>
          </div>
        )}
      </Panel>
    </motion.div>
  )
}
