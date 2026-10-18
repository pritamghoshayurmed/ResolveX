import { useMemo, useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MoreVertical,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Panel } from "@/components/ui/panel"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { IntegrationIcon } from "@/components/integrations/IntegrationIcon"
import { LogoMark } from "@/components/layout/Sidebar"
import {
  availableIntegrations,
  connectedIntegrations,
  integrationActivity,
  integrationCategories,
  integrationGuides,
  integrationPlanLimit,
  type Integration,
  type IntegrationCategory,
} from "@/data/integrationsDetail"
import { cn } from "@/lib/utils"

type Item = Integration & { synced?: string }

const allIntegrations: Item[] = [...connectedIntegrations, ...availableIntegrations]

function motionDelay(index: number) {
  return { duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] as const }
}

type Tab = "all" | IntegrationCategory

export function Integrations() {
  const [tab, setTab] = useState<Tab>("all")
  const [query, setQuery] = useState("")
  const [connectedIds, setConnectedIds] = useState<string[]>(() =>
    connectedIntegrations.map((i) => i.id),
  )
  const [syncOverrides, setSyncOverrides] = useState<Record<string, string>>({})

  const isConnected = (id: string) => connectedIds.includes(id)

  const connect = (id: string) => {
    setConnectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setSyncOverrides((prev) => ({ ...prev, [id]: "Last synced just now" }))
  }

  const disconnect = (id: string) => {
    setConnectedIds((prev) => prev.filter((x) => x !== id))
  }

  const matches = (i: Item) => {
    if (tab !== "all" && i.category !== tab) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return `${i.name} ${i.description}`.toLowerCase().includes(q)
  }

  const connectedList = allIntegrations.filter((i) => isConnected(i.id) && matches(i))
  const availableList = allIntegrations.filter((i) => !isConnected(i.id) && matches(i))

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: allIntegrations.length }
    for (const c of integrationCategories) {
      map[c] = allIntegrations.filter((i) => i.category === c).length
    }
    return map
  }, [])

  const connectedCount = connectedIds.length
  const pct = Math.min(100, Math.round((connectedCount / integrationPlanLimit) * 100))

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All Integrations" },
    ...integrationCategories.map((c) => ({ key: c as Tab, label: c })),
  ]

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">
            Integrations
          </h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Connect your existing tools and channels to bring all customer conversations into
            Resolve X.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13.5px] font-medium text-[#334155] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-colors hover:bg-[#f8fafc]">
            <ExternalLink className="size-4 text-[#64748b]" />
            View Docs
            <ChevronDown className="size-3.5 text-[#94a3b8]" />
          </button>
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#0f172a] px-4 text-[13.5px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1e293b]">
            <Plus className="size-4" strokeWidth={2.2} />
            Add Integration
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_345px]">
        {/* Primary column */}
        <div className="min-w-0 space-y-5">
          <HeroBanner />

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
            <Panel>
              {/* Tabs + search */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8ebf1] px-5 pt-4">
                <div className="flex flex-wrap items-center gap-1" role="tablist">
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
                      {t.key !== "all" && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                            tab === t.key ? "bg-[#2563eb] text-white" : "bg-[#f1f5f9] text-[#64748b]",
                          )}
                        >
                          {counts[t.key]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pb-3">
                  <div className="flex h-9 w-[220px] items-center gap-2 rounded-[10px] border border-[#e8ebf1] bg-[#f7f8fb] px-3 transition-colors focus-within:border-[#c7d7f5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2563eb]/15">
                    <Search className="size-3.5 shrink-0 text-[#94a3b8]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search integrations..."
                      aria-label="Search integrations"
                      className="w-full bg-transparent text-[12.5px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>
                </div>
              </div>

              {/* Connected integrations */}
              <section className="px-5 pb-5 pt-5">
                <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#0f172a]">
                  Connected Integrations
                </h2>
                <p className="mt-1 text-[12.5px] text-[#94a3b8]">
                  These integrations are active and syncing data with Resolve X.
                </p>
                {connectedList.length > 0 ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {connectedList.map((item) => (
                      <ConnectedCard
                        key={item.id}
                        item={item}
                        synced={syncOverrides[item.id] ?? item.synced ?? "Last synced just now"}
                        onDisconnect={() => disconnect(item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    label={
                      query
                        ? "No connected integrations match your search."
                        : "No connected integrations in this category."
                    }
                  />
                )}
              </section>

              <div className="border-t border-[#eef1f6]" />

              {/* Available integrations */}
              <section className="px-5 pb-5 pt-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#0f172a]">
                      Available Integrations
                    </h2>
                    <p className="mt-1 text-[12.5px] text-[#94a3b8]">
                      Connect more tools to automate your customer support workflow.
                    </p>
                  </div>
                  <button className="mt-1 inline-flex items-center gap-1 text-[12.5px] font-medium text-[#2563eb] hover:underline">
                    View All
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
                {availableList.length > 0 ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {availableList.map((item) => (
                      <AvailableCard
                        key={item.id}
                        item={item}
                        onConnect={() => connect(item.id)}
                        disabled={connectedCount >= integrationPlanLimit}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    label={
                      query
                        ? "No integrations match your search."
                        : "All integrations in this category are already connected."
                    }
                  />
                )}
              </section>
            </Panel>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-5">
          <StatusCard count={connectedCount} pct={pct} />
          <ActivityCard />
          <GuidesCard />
          <CustomIntegrationCard />
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- helpers --------------------------------- */

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-4 rounded-[12px] border border-dashed border-[#e2e8f0] bg-[#f8fafc] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
      {label}
    </div>
  )
}

/* --------------------------------- hero ------------------------------------ */

function HeroBanner() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(0)}>
      <div className="relative overflow-hidden rounded-[14px] border border-[#e8ebf1] bg-gradient-to-r from-[#f7faff] via-[#f2f6ff] to-[#eef2fe]">
        <div className="flex flex-col gap-5 px-6 py-7 lg:flex-row lg:items-center lg:gap-6">
          <div className="min-w-0 lg:max-w-[54%]">
            <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[#0f172a]">
              Connect your tools. Supercharge your support.
            </h2>
            <p className="mt-2.5 max-w-[520px] text-[13.5px] leading-relaxed text-[#64748b]">
              Integrate your communication channels, knowledge sources and business tools to give
              your AI agents full context and keep your team in sync.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] items-center justify-center px-4 lg:flex xl:w-[38%]">
          <NetworkArt />
        </div>
      </div>
    </motion.div>
  )
}

function NetworkArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[150px] w-full max-w-[420px]", className)}>
      <svg
        viewBox="0 0 360 150"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
      >
        <g stroke="#c7d2fe" strokeWidth="1.4" strokeDasharray="4 5" strokeLinecap="round">
          <path d="M34 24C90 32 124 54 166 68" />
          <path d="M24 82C82 82 122 78 166 74" />
          <path d="M66 124C112 120 142 100 170 82" />
          <path d="M180 26C180 40 180 50 180 62" />
          <path d="M326 26C278 36 240 56 194 68" />
          <path d="M338 88C288 86 240 80 194 76" />
        </g>
      </svg>

      <IntegrationIcon
        name="whatsapp"
        className="absolute left-[1%] top-[6%] size-9 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)]"
      />
      <IntegrationIcon
        name="postgres"
        className="absolute left-0 top-[45%] size-9 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)]"
      />
      <IntegrationIcon
        name="gmail"
        className="absolute left-[12%] top-[73%] size-9 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)]"
      />
      <IntegrationIcon
        name="website"
        className="absolute left-[45%] top-0 size-9 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)]"
      />
      <IntegrationIcon
        name="slack"
        className="absolute right-[4%] top-[8%] size-9 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)]"
      />
      <IntegrationIcon
        name="notion"
        className="absolute right-0 top-[50%] size-9 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)]"
      />

      <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-[0_10px_28px_-10px_rgba(37,99,235,0.45)] ring-1 ring-[#e8ebf1]">
        <LogoMark className="size-7" />
      </span>
    </div>
  )
}

/* ------------------------------ connected card ----------------------------- */

function ConnectedCard({
  item,
  synced,
  onDisconnect,
}: {
  item: Item
  synced: string
  onDisconnect: () => void
}) {
  const MenuIcon = item.menu === "settings" ? Settings : MoreVertical
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.5, 0.4, 1] }}
      className="h-full rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)]"
    >
      <div className="flex items-start gap-3">
        <IntegrationIcon name={item.icon} className="size-11" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[14px] font-semibold text-[#0f172a]">{item.name}</h3>
            <Badge tone="green">Connected</Badge>
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-[#64748b]">{item.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Options for ${item.name}`}
            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
          >
            <MenuIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Configure</DropdownMenuItem>
            <DropdownMenuItem>Sync now</DropdownMenuItem>
            <DropdownMenuItem>View logs</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={onDisconnect}
              className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]"
            >
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-3.5 flex items-center gap-1.5">
        <span className="size-1.5 shrink-0 rounded-full bg-[#22c55e]" />
        <span className="truncate text-[11.5px] text-[#94a3b8]">{synced}</span>
      </div>
    </motion.article>
  )
}

/* ------------------------------ available card ----------------------------- */

function AvailableCard({
  item,
  onConnect,
  disabled,
}: {
  item: Item
  onConnect: () => void
  disabled?: boolean
}) {
  const isApi = item.id === "custom-api"
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.5, 0.4, 1] }}
      className="flex h-full flex-col rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)]"
    >
      <div className="flex items-start gap-3">
        <IntegrationIcon name={item.icon} className="size-10" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[13.5px] font-semibold text-[#0f172a]">{item.name}</h3>
          <p className="mt-1 text-[12px] leading-snug text-[#64748b]">{item.description}</p>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <button
          onClick={isApi ? undefined : onConnect}
          disabled={!isApi && disabled}
          title={!isApi && disabled ? "Plan limit reached" : undefined}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-[#dbeafe] bg-white px-3.5 text-[12.5px] font-medium text-[#1d4ed8] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-colors hover:bg-[#eff6ff] disabled:pointer-events-none disabled:opacity-50"
        >
          {isApi ? "View Docs" : "Connect"}
        </button>
      </div>
    </motion.article>
  )
}

/* ------------------------------- right column ------------------------------ */

function StatusCard({ count, pct }: { count: number; pct: number }) {
  const data = [
    { key: "used", value: pct },
    { key: "left", value: Math.max(0, 100 - pct) },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(0)}>
      <Panel className="px-5 pb-5 pt-5">
        <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
          Integration Status
        </h2>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[30px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
              {count} <span className="text-[#cbd5e1]">/</span> {integrationPlanLimit}
            </p>
            <p className="mt-2 text-[12.5px] text-[#94a3b8]">Integrations connected</p>
          </div>
          <div className="relative h-[104px] w-[104px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={36}
                  outerRadius={48}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  animationDuration={900}
                  isAnimationActive={pct > 0}
                >
                  <Cell fill="#2563eb" />
                  <Cell fill="#e8edf5" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[15px] font-bold tracking-[-0.01em] text-[#0f172a]">
              {pct}%
            </span>
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}

function ActivityCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
      <Panel>
        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Recent Activity
          </h2>
          <button className="text-[12.5px] font-medium text-[#2563eb] hover:underline">View All</button>
        </div>
        <div className="px-3.5 pb-4">
          {integrationActivity.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 rounded-[12px] px-1.5 py-2.5 transition-colors hover:bg-[#f8fafc]"
            >
              <IntegrationIcon name={a.icon} className="size-9" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
                  {a.title}
                </span>
                <span className="block truncate text-[11.5px] text-[#94a3b8]">{a.time}</span>
              </span>
              <span className="size-1.5 shrink-0 rounded-full bg-[#22c55e]" />
            </div>
          ))}
        </div>
      </Panel>
    </motion.div>
  )
}

function GuidesCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(2)}>
      <Panel>
        <div className="px-5 pb-3 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Popular Integration Guides
          </h2>
        </div>
        <div className="px-3.5 pb-4">
          {integrationGuides.map((g) => (
            <button
              key={g.id}
              className="flex w-full items-center gap-3 rounded-[12px] px-1.5 py-2.5 text-left transition-colors hover:bg-[#f8fafc]"
            >
              <IntegrationIcon name={g.icon} className="size-9" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
                  {g.title}
                </span>
                <span className="block truncate text-[11.5px] text-[#94a3b8]">{g.sub}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-[#cbd5e1]" />
            </button>
          ))}
        </div>
      </Panel>
    </motion.div>
  )
}

function CustomIntegrationCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(3)}>
      <Panel className="px-5 pb-5 pt-5">
        <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
          Need a custom integration?
        </h2>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#64748b]">
          Use our API or webhooks to connect any tool with Resolve X.
        </p>
        <button className="mt-3.5 flex h-10 w-full items-center justify-between rounded-lg border border-[#e2e8f0] bg-white px-3.5 text-[13px] font-medium text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-colors hover:bg-[#f8fafc]">
          View API Documentation
          <ExternalLink className="size-4 text-[#64748b]" />
        </button>
      </Panel>
    </motion.div>
  )
}
