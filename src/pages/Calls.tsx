import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowDown,
  ArrowUp,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Gauge,
  Headphones,
  ListFilter,
  MoreVertical,
  Pause,
  Phone,
  Play,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { motion } from "framer-motion"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { SelectMenu } from "@/components/ui/select-menu"
import { Switch } from "@/components/ui/switch"
import { Area, AreaChart } from "recharts"
import {
  callKpis,
  callVolume,
  getCallDetail,
  recentCalls,
  voiceAgentConfig,
  waveform,
  type CallOutcome,
  type CallRecord,
} from "@/data/callsDetail"
import { cn } from "@/lib/utils"

/* ---------------------------------- helpers ---------------------------------- */

const intentTones: Record<string, string> = {
  blue: "bg-[#eff6ff] text-[#2563eb]",
  purple: "bg-[#faf5ff] text-[#7c3aed]",
  green: "bg-[#ecfdf5] text-[#059669]",
  red: "bg-[#fef2f2] text-[#dc2626]",
}

const outcomeMeta: Record<CallOutcome, { label: string; className: string }> = {
  ai_resolved: { label: "AI Resolved", className: "bg-[#ecfdf5] text-[#059669]" },
  human_transfer: { label: "Human Transfer", className: "bg-[#fff7ed] text-[#c2410c]" },
  missed: { label: "Missed", className: "bg-[#fef2f2] text-[#dc2626]" },
}

const avatarPalette = [
  { bg: "#dbeafe", fg: "#2563eb" },
  { bg: "#ffedd5", fg: "#ea580c" },
  { bg: "#f3e8ff", fg: "#7c3aed" },
  { bg: "#dcfce7", fg: "#16a34a" },
  { bg: "#eee7fe", fg: "#6d28d9" },
  { bg: "#ffe4e6", fg: "#e11d48" },
  { bg: "#d1fae5", fg: "#059669" },
  { bg: "#fef9c3", fg: "#ca8a04" },
]

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

type CallsTab = "all" | "ai_resolved" | "human_transfer" | "missed"

export function Calls() {
  const [tab, setTab] = useState<CallsTab>("all")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [intentFilter, setIntentFilter] = useState("All Intent")
  const [selectedId, setSelectedId] = useState("#CL-1048")
  const [agentOnline, setAgentOnline] = useState(true)

  const selected = recentCalls.find((c) => c.id === selectedId) ?? recentCalls[0]
  const detail = getCallDetail(selected.id)

  const rows = useMemo(
    () =>
      recentCalls
        .filter((c) => tab === "all" || c.outcome === tab)
        .filter(
          (c) =>
            statusFilter === "All Status" ||
            outcomeMeta[c.outcome].label === statusFilter,
        )
        .filter((c) => intentFilter === "All Intent" || c.intent === intentFilter),
    [tab, statusFilter, intentFilter],
  )

  const tabCounts: { key: CallsTab; label: string; count: number }[] = [
    { key: "all", label: "All Calls", count: 312 },
    { key: "ai_resolved", label: "AI Resolved", count: 248 },
    { key: "human_transfer", label: "Human Transfer", count: 38 },
    { key: "missed", label: "Missed", count: 12 },
  ]

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">
            Calls (Voice AI)
          </h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Manage and monitor all customer calls handled by your AI voice agent.
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
            <Settings className="size-4" strokeWidth={2} />
            Configure Voice Agent
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_355px]">
        {/* Primary column */}
        <div className="min-w-0 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {callKpis.map((k, i) => (
              <CallMetricCard key={k.id} kpi={k} index={i} />
            ))}
          </div>

          {/* Call volume chart */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
            <CallVolumeChart />
          </motion.div>

          {/* Recent calls */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(2)}>
            <Panel>
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5">
                <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
                  Recent Calls
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <SelectMenu
                    value={statusFilter}
                    options={["All Status", "AI Resolved", "Human Transfer", "Missed"]}
                    onChange={setStatusFilter}
                    className="h-8.5 text-[13px]"
                  />
                  <SelectMenu
                    value={intentFilter}
                    options={[
                      "All Intent",
                      "Warranty Info",
                      "Machine Installation",
                      "Price Quotation",
                      "Error Code",
                      "Service Booking",
                      "Spare Parts",
                      "Delivery Status",
                      "Return & Refund",
                    ]}
                    onChange={setIntentFilter}
                    className="h-8.5 text-[13px]"
                  />
                  <button className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                    <ListFilter className="size-3.5 text-[#64748b]" /> Filter
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-3 flex items-center gap-1 border-b border-[#e8ebf1] px-5">
                {tabCounts.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    role="tab"
                    aria-selected={tab === t.key}
                    className={cn(
                      "relative flex items-center gap-1.5 px-2.5 pb-2.5 pt-1 text-[13px] font-medium transition-colors",
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

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#eef1f6] text-[12px] font-medium text-[#94a3b8]">
                      <th className="w-10 py-3 pl-5 font-medium">
                        <input type="checkbox" aria-label="Select all calls" className="size-3.5 accent-[#2563eb]" />
                      </th>
                      <th className="py-3 font-medium">Call ID</th>
                      <th className="py-3 font-medium">Customer</th>
                      <th className="py-3 font-medium">Phone Number</th>
                      <th className="py-3 font-medium">Intent</th>
                      <th className="py-3 font-medium">Duration</th>
                      <th className="py-3 font-medium">Status</th>
                      <th className="py-3 font-medium">Time</th>
                      <th className="py-3 pr-5 text-right font-medium">Recording</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((call, i) => (
                      <CallRow
                        key={call.id}
                        call={call}
                        index={i}
                        selected={call.id === selectedId}
                        onSelect={() => setSelectedId(call.id)}
                      />
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-10 text-center text-[13px] text-[#94a3b8]">
                          No calls match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1f6] px-5 py-3.5">
                <p className="text-[12.5px] text-[#94a3b8]">
                  Showing 1 to {rows.length} of {tab === "all" ? 312 : tabCounts.find((t) => t.key === tab)?.count} calls
                </p>
                <div className="flex items-center gap-1.5">
                  <PaginationButton dir="prev" />
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg text-[12.5px] font-medium transition-colors",
                        p === 1
                          ? "bg-[#2563eb] text-white"
                          : "text-[#475569] hover:bg-[#f1f5f9]",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  <PaginationButton dir="next" />
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
          <VoiceAgentStatus online={agentOnline} onToggle={() => setAgentOnline((v) => !v)} />
          <CallDetailsPanel detail={detail} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- metric card ------------------------------- */

const toneStyles = {
  green: {
    iconBg: "bg-[#dcfce7] text-[#16a34a]",
    line: "#22c55e",
    fill: ["rgba(34,197,94,0.18)", "rgba(34,197,94,0)"],
  },
  purple: {
    iconBg: "bg-[#f3e8ff] text-[#9333ea]",
    line: "#a855f7",
    fill: ["rgba(168,85,247,0.18)", "rgba(168,85,247,0)"],
  },
  blue: {
    iconBg: "bg-[#dbeafe] text-[#2563eb]",
    line: "#2563eb",
    fill: ["rgba(37,99,235,0.18)", "rgba(37,99,235,0)"],
  },
} as const

const kpiIcons: Record<string, typeof Phone> = {
  total: Phone,
  resolved: CheckCircle2,
  transfer: UsersRound,
  duration: Clock,
}

function CallMetricCard({
  kpi,
  index,
}: {
  kpi: (typeof callKpis)[number]
  index: number
}) {
  const t = toneStyles[kpi.tone]
  const Icon = kpiIcons[kpi.id]
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
        <div className="h-[52px] w-[92px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.fill[0]} />
                  <stop offset="100%" stopColor={t.fill[1]} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={t.line}
                strokeWidth={1.8}
                fill={`url(#spark-${kpi.id})`}
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

/* ------------------------------ volume chart ------------------------------ */

function CallVolumeChart() {
  const [range, setRange] = useState("Last 30 days")
  const slice = range === "Last 7 days" ? 7 : range === "Last 14 days" ? 14 : 31
  const data = callVolume.slice(-slice)

  return (
    <Panel className="overflow-hidden">
      <PanelHeader
        title="Call Volume"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden items-center gap-3.5 sm:flex">
              <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#475569]">
                <span className="size-2.5 rounded-full bg-[#3b82f6]" /> AI Resolved
              </span>
              <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#475569]">
                <span className="size-2.5 rounded-full bg-[#a855f7]" /> Human Transfer
              </span>
            </div>
            <SelectMenu
              value={range}
              options={["Last 7 days", "Last 14 days", "Last 30 days"]}
              onChange={setRange}
              className="h-8.5 text-[13px]"
            />
          </div>
        }
      />
      <div className="h-[240px] px-2 pb-3 sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#eef1f6" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              interval={3}
              dy={6}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              width={28}
            />
            <Tooltip
              cursor={{ fill: "#f1f5f9" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                return (
                  <div className="rounded-xl border border-[#e8ebf1] bg-white px-3.5 py-2.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.16)]">
                    <p className="mb-1.5 text-[12px] font-semibold text-[#0f172a]">
                      {label}, 2026
                    </p>
                    <div className="flex items-center gap-2 py-0.5 text-[12.5px]">
                      <span className="size-2 rounded-full bg-[#3b82f6]" />
                      <span className="text-[#64748b]">AI Resolved</span>
                      <span className="ml-auto pl-4 font-semibold text-[#0f172a]">
                        {payload.find((p) => p.dataKey === "aiRes")?.value}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-0.5 text-[12.5px]">
                      <span className="size-2 rounded-full bg-[#a855f7]" />
                      <span className="text-[#64748b]">Human Transfer</span>
                      <span className="ml-auto pl-4 font-semibold text-[#0f172a]">
                        {payload.find((p) => p.dataKey === "transfer")?.value}
                      </span>
                    </div>
                  </div>
                )
              }}
            />
            <Bar dataKey="aiRes" stackId="calls" fill="#3b82f6" radius={[0, 0, 0, 0]} animationDuration={900} />
            <Bar dataKey="transfer" stackId="calls" fill="#c4b5fd" radius={[4, 4, 0, 0]} animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}

/* -------------------------------- table row -------------------------------- */

function CallRow({
  call,
  index,
  selected,
  onSelect,
}: {
  call: CallRecord
  index: number
  selected: boolean
  onSelect: () => void
}) {
  const color = avatarPalette[index % avatarPalette.length]
  const outcome = outcomeMeta[call.outcome]

  return (
    <tr
      onClick={onSelect}
      className={cn(
        "cursor-pointer border-b border-[#f1f5f9] text-[13px] transition-colors last:border-b-0",
        selected ? "bg-[#eef4ff]" : "hover:bg-[#f8fafc]",
      )}
    >
      <td className="py-3 pl-5" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" aria-label={`Select ${call.id}`} className="size-3.5 accent-[#2563eb]" />
      </td>
      <td className="py-3 font-semibold text-[#0f172a]">{call.id}</td>
      <td className="py-3">
        <span className="flex items-center gap-2.5">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11.5px] font-semibold"
            style={{ backgroundColor: color.bg, color: color.fg }}
          >
            {initialsOf(call.customerName)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
              {call.customerName}
            </span>
            <span className="block truncate text-[11.5px] text-[#94a3b8]">{call.company}</span>
          </span>
        </span>
      </td>
      <td className="py-3 text-[#475569]">{call.phone}</td>
      <td className="py-3">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", intentTones[call.intentTone])}>
          {call.intent}
        </span>
      </td>
      <td className="py-3 text-[#475569]">{call.duration}</td>
      <td className="py-3">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", outcome.className)}>
          {outcome.label}
        </span>
      </td>
      <td className="py-3 text-[#64748b]">{call.timeLabel}</td>
      <td className="py-3 pr-5">
        <span className="flex items-center justify-end gap-1">
          <button
            aria-label={`Play recording ${call.id}`}
            className="flex size-8 items-center justify-center rounded-lg border border-[#dbeafe] bg-[#eff6ff] text-[#2563eb] transition-colors hover:bg-[#dbeafe]"
          >
            <Play className="size-3.5 fill-current" />
          </button>
          <button
            aria-label={`More options for ${call.id}`}
            className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
          >
            <MoreVertical className="size-4" />
          </button>
        </span>
      </td>
    </tr>
  )
}

function PaginationButton({ dir }: { dir: "prev" | "next" }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      aria-label={dir === "prev" ? "Previous page" : "Next page"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg border transition-colors",
        dir === "prev" ? "border-[#e2e8f0]" : "border-[#e2e8f0]",
        hover ? "bg-[#f1f5f9]" : "bg-white",
      )}
    >
      {dir === "prev" ? (
        <ChevronLeft className="size-4 text-[#64748b]" />
      ) : (
        <ChevronRight className="size-4 text-[#64748b]" />
      )}
    </button>
  )
}

/* ---------------------------- voice agent status ---------------------------- */

function VoiceAgentStatus({
  online,
  onToggle,
}: {
  online: boolean
  onToggle: () => void
}) {
  const rowIcons: Record<string, typeof Clock> = {
    clock: Clock,
    phone: Phone,
    shield: ShieldCheck,
  }

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(0)}>
      <Panel>
        <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Voice Agent Status
          </h2>
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#16a34a]">
              <span className="size-1.5 rounded-full bg-[#22c55e]" /> Online
            </span>
            <Switch checked={online} onCheckedChange={onToggle} ariaLabel="Toggle voice agent" />
          </span>
        </div>

        <div className="px-5">
          {/* Support number */}
          <div className="flex items-center gap-3 rounded-[12px] border border-[#e8ebf1] px-3.5 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#dcfce7] text-[#16a34a]">
              <Phone className="size-4.5" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[14px] font-semibold text-[#0f172a]">
                  {voiceAgentConfig.number}
                </span>
                <button
                  aria-label="Copy phone number"
                  className="flex size-6 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
                >
                  <Copy className="size-3.5" />
                </button>
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-[#94a3b8]">
                {voiceAgentConfig.label}
              </span>
            </span>
          </div>

          {/* Config rows */}
          <div className="mt-1.5">
            {voiceAgentConfig.rows.map((row, i) => {
              const Icon = rowIcons[row.icon]
              return (
                <button
                  key={row.title}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-[#eef1f6] py-3 text-left transition-colors last:border-b-0 hover:bg-[#f8fafc]",
                    i === 0 && "mt-1",
                  )}
                >
                  <Icon className="size-4 shrink-0 text-[#94a3b8]" strokeWidth={1.9} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{row.title}</span>
                    <span className="block truncate text-[12px] text-[#94a3b8]">{row.sub}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-[#cbd5e1]" />
                </button>
              )
            })}
          </div>
        </div>
        <div className="h-4" />
      </Panel>
    </motion.div>
  )
}

/* ------------------------------- call details ------------------------------- */

function CallDetailsPanel({ detail }: { detail: ReturnType<typeof getCallDetail> }) {
  const [tab, setTab] = useState("Transcript")
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState("1x")

  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    setTab("Transcript")
  }, [detail.phone, detail.intent])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false)
          return 100
        }
        return p + 100 / (detail.durationSec * 2)
      })
    }, 500)
    return () => clearInterval(id)
  }, [playing, detail.durationSec])

  const outcome = outcomeMeta[detail.outcome]
  const playedBars = Math.round((progress / 100) * waveform.length)
  const totalSec = detail.durationSec
  const curSec = Math.round((progress / 100) * totalSec)
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
      <Panel>
        <PanelHeader
          title="Call Details"
          action={
            <Link
              to="/conversations"
              className="text-[12.5px] font-medium text-[#2563eb] hover:underline"
            >
              View in Conversation
            </Link>
          }
        />

        <div className="px-5">
          {/* Customer */}
          <div className="flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#d5e3fb] text-[15px] font-semibold text-[#2563eb]">
              {initialsOf(detail.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold text-[#0f172a]">{detail.name}</span>
              <span className="block truncate text-[12.5px] text-[#64748b]">{detail.company}</span>
              <span className="block truncate text-[12.5px] text-[#64748b]">{detail.phone}</span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block text-[12.5px] text-[#64748b]">{detail.date}</span>
              <span className="block text-[12.5px] text-[#64748b]">{detail.time}</span>
            </span>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", outcome.className)}>
              {outcome.label}
            </span>
            <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium", intentTones[detail.intentTone])}>
              {detail.intent}
            </span>
          </div>

          {/* Audio player */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause recording" : "Play recording"}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white transition-colors hover:bg-[#1d4ed8]"
            >
              {playing ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
            </button>
            <div className="flex h-8 min-w-0 flex-1 items-center gap-[2px]">
              {waveform.map((h, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-[2px] shrink-0 rounded-full transition-colors",
                    i < playedBars ? "bg-[#3b82f6]" : "bg-[#dbe3ee]",
                  )}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <span className="shrink-0 text-[12px] tabular-nums text-[#64748b]">
              {fmt(curSec)} / {fmt(totalSec)}
            </span>
            <button
              onClick={() => setSpeed((s) => (s === "1x" ? "1.5x" : s === "1.5x" ? "2x" : "1x"))}
              aria-label="Playback speed"
              className="shrink-0 rounded-md border border-[#e2e8f0] px-1.5 py-0.5 text-[11.5px] font-medium text-[#475569] transition-colors hover:bg-[#f8fafc]"
            >
              {speed}
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex items-center gap-5 border-b border-[#eef1f6]">
            {["Transcript", "AI Summary", "Intent & Insights"].map((t) => (
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
          <div className="min-h-[236px] pb-5 pt-4">
            {tab === "Transcript" && (
              <div className="space-y-3.5">
                {detail.transcript.map((turn, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                        turn.from === "customer"
                          ? "bg-[#eff6ff] text-[#2563eb]"
                          : "bg-[#dcfce7] text-[#16a34a]",
                      )}
                    >
                      {turn.from === "customer" ? (
                        <UserRound className="size-4" strokeWidth={2} />
                      ) : (
                        <Bot className="size-4" strokeWidth={2} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="text-[12.5px] font-semibold text-[#0f172a]">
                          {turn.from === "customer" ? "Customer" : "Voice AI"}
                        </span>
                        <span className="text-[11.5px] text-[#94a3b8]">{turn.time}</span>
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-relaxed text-[#475569]">
                        {turn.text}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === "AI Summary" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#0f172a]">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#faf5ff] text-[#7c3aed]">
                    <Headphones className="size-3.5" />
                  </span>
                  Call Summary
                </div>
                <ul className="space-y-2">
                  {detail.summary.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-[#475569]">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#16a34a]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "Intent & Insights" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {detail.insights.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3">
                      <span className="text-[12.5px] font-medium text-[#64748b]">{row.label}</span>
                      {row.tone ? (
                        <span className={cn("inline-flex max-w-[180px] truncate rounded-full px-2.5 py-0.5 text-[12px] font-medium", row.tone)}>
                          {row.value}
                        </span>
                      ) : (
                        <span className="text-[12.5px] font-medium text-[#0f172a]">{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                    <Gauge className="size-3.5" /> Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {detail.topics.map((t) => (
                      <span
                        key={t}
                        className="inline-flex rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-0.5 text-[12px] font-medium text-[#475569]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}
