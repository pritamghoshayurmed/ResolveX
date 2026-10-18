import { useEffect, useState } from "react"
import {
  ChevronRight,
  Clock,
  Globe,
  Grid3x3,
  Languages,
  MessageCircle,
  Mic,
  MoreVertical,
  Phone,
  PhoneOff,
  Play,
  Plus,
  RotateCcw,
  Send,
  Smile,
  UsersRound,
  Workflow,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"
import { Panel } from "@/components/ui/panel"
import { SelectMenu } from "@/components/ui/select-menu"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import {
  agentSummaries,
  agentTabs,
  callOutcomes,
  chatKeyMetrics,
  chatSuggestions,
  connectedChannels,
  phoneSettings,
  topIntents,
  voiceCallTranscript,
  voiceKeyMetrics,
} from "@/data/agentsDetail"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/layout/Sidebar"

/* ---------------------------------- helpers ---------------------------------- */

function motionDelay(index: number) {
  return { duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] as const }
}

const miniTones = {
  blue: { line: "#3b82f6", fill: ["rgba(59,130,246,0.18)", "rgba(59,130,246,0)"] },
  green: { line: "#22c55e", fill: ["rgba(34,197,94,0.18)", "rgba(34,197,94,0)"] },
  orange: { line: "#f97316", fill: ["rgba(249,115,22,0.18)", "rgba(249,115,22,0)"] },
} as const

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.32 4.94L2 22l5.24-1.38a9.93 9.93 0 0 0 4.8 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.1c-1.52 0-3.02-.4-4.32-1.18l-.3-.18-3.12.82.84-3.04-.2-.32a8.05 8.05 0 0 1-1.24-4.24c0-4.46 3.62-8.1 8.06-8.1 4.46 0 8.08 3.64 8.08 8.1 0 4.46-3.64 8.14-7.8 8.14Zm4.44-6.06c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.1 3.64.58.24 1.02.38 1.38.5.58.18 1.1.16 1.52.1.46-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#1877f2" />
      <path d="M13.4 19.5v-6.3h2.1l.3-2.5h-2.4V9.2c0-.7.2-1.2 1.2-1.2h1.3V5.8c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H8.8v2.5h2v6.2h2.6Z" fill="#fff" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#fd5949" />
          <stop offset="50%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-g)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
    </svg>
  )
}

/* ------------------------------------ page ------------------------------------ */

export function AIAgents() {
  const [chatOnline, setChatOnline] = useState(true)
  const [voiceOnline, setVoiceOnline] = useState(true)

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">AI Agents</h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Configure and manage your AI agents for chat and voice support.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13.5px] font-medium text-[#1d4ed8] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-colors hover:bg-[#f8fafc]">
            <Play className="size-3.5 fill-[#2563eb] text-[#2563eb]" />
            Test AI Agents
          </button>
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#0f172a] px-4 text-[13.5px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1e293b]">
            <Plus className="size-4" strokeWidth={2.2} />
            Create Agent
            <ChevronRight className="size-3.5 rotate-90 opacity-70" />
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 xl:grid-cols-3">
        {agentSummaries.map((a, i) => (
          <SummaryCard
            key={a.id}
            agent={a}
            index={i}
            online={a.id === "chat" ? chatOnline : a.id === "voice" ? voiceOnline : true}
            onToggle={a.id === "chat" ? () => setChatOnline((v) => !v) : () => setVoiceOnline((v) => !v)}
          />
        ))}
      </div>

      {/* Agent panels */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <ChatAgentPanel online={chatOnline} onToggle={() => setChatOnline((v) => !v)} />
        <VoiceAgentPanel online={voiceOnline} onToggle={() => setVoiceOnline((v) => !v)} />
      </div>
    </div>
  )
}

/* ------------------------------ summary card ------------------------------ */

const summaryIcon = {
  chat: { Icon: MessageCircle, cls: "bg-[#dbeafe] text-[#2563eb]" },
  phone: { Icon: Phone, cls: "bg-[#dcfce7] text-[#16a34a]" },
  users: { Icon: UsersRound, cls: "bg-[#f3e8ff] text-[#9333ea]" },
} as const

function SummaryCard({
  agent,
  index,
  online,
  onToggle,
}: {
  agent: (typeof agentSummaries)[number]
  index: number
  online: boolean
  onToggle: () => void
}) {
  const { Icon, cls } = summaryIcon[agent.icon]

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay(index)}
      className="rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-center gap-3">
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-[11px]", cls)}>
          <Icon className="size-[18px]" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14.5px] font-semibold text-[#0f172a]">{agent.name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[12px] font-medium text-[#16a34a]">
            <span className="size-1.5 rounded-full bg-[#22c55e]" /> {agent.status}
          </span>
        </span>
        {agent.toggleable ? (
          <Switch checked={online} onCheckedChange={onToggle} ariaLabel={`Toggle ${agent.name}`} />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-[#cbd5e1]" />
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {agent.stats.map((s) => (
          <div key={s.label} className="min-w-0">
            <p className="text-[20px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
              {s.value}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-snug text-[#94a3b8]">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.article>
  )
}

/* ------------------------------ mini metric ------------------------------ */

function MiniMetric({ m }: { m: (typeof chatKeyMetrics)[number] }) {
  const t = miniTones[m.tone]
  const data = m.sparkline.map((v, i) => ({ i, v }))

  return (
    <div className="rounded-[12px] border border-[#eef1f6] bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[18px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
            {m.value}
          </p>
          <p className="mt-1 text-[11.5px] leading-snug text-[#94a3b8]">{m.label}</p>
          <p
            className={cn(
              "mt-1.5 flex items-center gap-0.5 text-[11.5px] font-semibold",
              m.direction === "down" && m.label.includes("Response")
                ? "text-[#16a34a]"
                : m.direction === "down"
                  ? "text-[#16a34a]"
                  : "text-[#16a34a]",
            )}
          >
            {m.direction === "up" ? "↑" : "↓"} {m.deltaPct}%
          </p>
        </div>
        <div className="h-[38px] w-[64px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`mini-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.fill[0]} />
                  <stop offset="100%" stopColor={t.fill[1]} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={t.line}
                strokeWidth={1.6}
                fill={`url(#mini-${m.id})`}
                animationDuration={900}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ chat agent ------------------------------ */

function AgentTabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: string[]
  active: string
  onSelect: (t: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[#eef1f6] px-5">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className={cn(
            "relative px-2.5 pb-2.5 pt-1 text-[12.5px] font-medium transition-colors",
            "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2.5px] after:rounded-full after:bg-[#2563eb] after:transition-opacity",
            active === t
              ? "text-[#2563eb] after:opacity-100"
              : "text-[#64748b] after:opacity-0 hover:text-[#0f172a]",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

function ChatAgentPanel({ online, onToggle }: { online: boolean; onToggle: () => void }) {
  const [tab, setTab] = useState("Overview")
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState([
    { from: "customer", text: "What is the warranty period for CNC machines?", time: "10:24 AM" },
    {
      from: "ai",
      text: "Our CNC machines come with a standard 2-year warranty covering manufacturing defects. Extended warranty plans are also available on request.",
      time: "10:24 AM",
    },
  ])

  const send = (text?: string) => {
    const t = (text ?? draft).trim()
    if (!t) return
    const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    setMessages((m) => [...m, { from: "customer", text: t, time }])
    setDraft("")
  }

  const reset = () =>
    setMessages([
      { from: "customer", text: "What is the warranty period for CNC machines?", time: "10:24 AM" },
      {
        from: "ai",
        text: "Our CNC machines come with a standard 2-year warranty covering manufacturing defects. Extended warranty plans are also available on request.",
        time: "10:24 AM",
      },
    ])

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
      <Panel className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3 px-5 pt-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[#dbeafe] text-[#2563eb]">
            <MessageCircle className="size-5" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[16px] font-bold tracking-[-0.01em] text-[#0f172a]">Chatbot Agent</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11.5px] font-medium text-[#059669]">
                <span className="size-1.5 rounded-full bg-[#22c55e]" /> Online
              </span>
            </span>
            <span className="mt-0.5 block text-[12.5px] text-[#64748b]">
              Handles website chat, WhatsApp and other text-based conversations.
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Switch checked={online} onCheckedChange={onToggle} ariaLabel="Toggle Chatbot Agent" />
            <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
              <MessageCircle className="size-3.5 text-[#64748b]" />
              Test Chat
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Chatbot options"
                className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
              >
                <MoreVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Agent settings</DropdownMenuItem>
                <DropdownMenuItem>Duplicate agent</DropdownMenuItem>
                <DropdownMenuItem>View logs</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
                  Pause agent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>

        <AgentTabs tabs={agentTabs.chat} active={tab} onSelect={setTab} />

        {tab !== "Overview" ? (
          <div className="flex min-h-[420px] items-center justify-center px-5 py-10 text-[13px] text-[#94a3b8]">
            {tab} configuration coming soon.
          </div>
        ) : (
          <div className="space-y-5 px-5 py-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Conversation preview */}
              <div className="min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Conversation Preview</h3>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1 text-[12px] font-medium text-[#2563eb] hover:underline"
                  >
                    <RotateCcw className="size-3" /> Reset
                  </button>
                </div>
                <div className="mt-3 space-y-3 rounded-[12px] border border-[#eef1f6] bg-[#f8fafc] p-3.5">
                  <div className="space-y-3">
                    {messages.map((m, i) =>
                      m.from === "customer" ? (
                        <div key={i} className="flex justify-end">
                          <span className="max-w-[85%] rounded-2xl rounded-tr-md bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                            {m.text}
                            <span className="mt-1 block text-right text-[10.5px] text-[#94a3b8]">{m.time}</span>
                          </span>
                        </div>
                      ) : (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#e8ebf1]">
                            <LogoMark className="size-4" />
                          </span>
                          <span className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#334155] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                            {m.text}
                            <span className="mt-1 block text-[10.5px] text-[#94a3b8]">{m.time}</span>
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-1.5 pt-1">
                    {chatSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="block w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-left text-[12px] text-[#475569] transition-colors hover:border-[#c7d7f5] hover:bg-[#eff6ff] hover:text-[#1d4ed8]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex items-center gap-2 rounded-[10px] border border-[#e2e8f0] bg-white px-3 py-2">
                    <Smile className="size-4 shrink-0 text-[#94a3b8]" />
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                      placeholder="Type a message..."
                      aria-label="Preview message"
                      className="w-full bg-transparent text-[12.5px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                    />
                    <button
                      onClick={() => send()}
                      aria-label="Send preview message"
                      className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-white transition-colors hover:bg-[#1d4ed8]"
                    >
                      <Send className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Key metrics + intents */}
              <div className="min-w-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Key Metrics</h3>
                  <SelectMenu
                    value="This Month"
                    options={["This Month", "Last Month", "Last 90 Days"]}
                    onChange={() => undefined}
                    className="h-8 text-[12px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {chatKeyMetrics.map((m) => (
                    <MiniMetric key={m.id} m={m} />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Top Intents</h3>
                  <button className="text-[12px] font-medium text-[#2563eb] hover:underline">View All</button>
                </div>
                <div className="space-y-2.5">
                  {topIntents.map((it) => (
                    <div key={it.rank} className="flex items-center gap-3">
                      <span className="w-4 shrink-0 text-[12.5px] font-semibold text-[#94a3b8]">
                        {it.rank}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-[12.5px] font-medium text-[#334155]">
                            {it.label}
                          </span>
                          <span className="shrink-0 text-[12px] font-semibold text-[#0f172a]">
                            {it.pct}%
                          </span>
                        </span>
                        <span className="mt-1 block h-1.5 w-full rounded-full bg-[#eef1f6]">
                          <span
                            className="block h-1.5 rounded-full"
                            style={{ width: `${(it.pct / 28) * 100}%`, backgroundColor: it.color }}
                          />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connected channels */}
            <div className="border-t border-[#eef1f6] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Connected Channels</h3>
                <button className="inline-flex h-8 items-center rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                  Manage Channels
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {connectedChannels.map((ch) => (
                  <div key={ch.id} className="flex items-center gap-2 rounded-[10px] border border-[#eef1f6] px-3 py-2">
                    <ChannelIcon kind={ch.icon} />
                    <span>
                      <span className="block text-[12px] font-semibold text-[#0f172a]">{ch.name}</span>
                      <span
                        className={cn(
                          "block text-[11px] font-medium",
                          ch.active ? "text-[#16a34a]" : "text-[#94a3b8]",
                        )}
                      >
                        {ch.active ? "Active" : "Inactive"}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Panel>
    </motion.div>
  )
}

function ChannelIcon({ kind }: { kind: (typeof connectedChannels)[number]["icon"] }) {
  switch (kind) {
    case "website":
      return (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
          <Globe className="size-3.5" />
        </span>
      )
    case "whatsapp":
      return (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
          <WhatsAppIcon className="size-3.5" />
        </span>
      )
    case "facebook":
      return <FacebookIcon className="size-7 shrink-0" />
    case "instagram":
      return <InstagramIcon className="size-7 shrink-0" />
    case "widget":
      return (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f3e8ff] text-[#7c3aed]">
          <Grid3x3 className="size-3.5" />
        </span>
      )
  }
}

/* ----------------------------- voice agent ----------------------------- */

function VoiceAgentPanel({ online, onToggle }: { online: boolean; onToggle: () => void }) {
  const [tab, setTab] = useState("Overview")
  const [seconds, setSeconds] = useState(18)

  useEffect(() => {
    if (!online) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [online])

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(2)}>
      <Panel className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3 px-5 pt-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[#dcfce7] text-[#16a34a]">
            <Phone className="size-5" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[16px] font-bold tracking-[-0.01em] text-[#0f172a]">Voice Agent</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11.5px] font-medium text-[#059669]">
                <span className="size-1.5 rounded-full bg-[#22c55e]" /> Online
              </span>
            </span>
            <span className="mt-0.5 block text-[12.5px] text-[#64748b]">
              Handles incoming calls and provides AI-powered voice support.
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Switch checked={online} onCheckedChange={onToggle} ariaLabel="Toggle Voice Agent" />
            <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
              <Phone className="size-3.5 text-[#64748b]" />
              Test Call
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Voice agent options"
                className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
              >
                <MoreVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Agent settings</DropdownMenuItem>
                <DropdownMenuItem>Call recordings</DropdownMenuItem>
                <DropdownMenuItem>View logs</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
                  Pause agent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>

        <AgentTabs tabs={agentTabs.voice} active={tab} onSelect={setTab} />

        {tab !== "Overview" ? (
          <div className="flex min-h-[420px] items-center justify-center px-5 py-10 text-[13px] text-[#94a3b8]">
            {tab} configuration coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 px-5 py-4 lg:grid-cols-2">
            {/* Live call preview */}
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Live Call Preview</h3>
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#16a34a]">
                  <span className={cn("size-1.5 rounded-full bg-[#22c55e]", online && "animate-pulse")} /> Live
                  Simulation
                </span>
              </div>
              <div className="mt-3 rounded-[12px] border border-[#eef1f6] bg-[#f8fafc] p-4">
                {/* Visualizer */}
                <div className="flex flex-col items-center">
                  <div className="relative flex size-[128px] items-center justify-center rounded-full border border-[#dbeafe] bg-white shadow-[0_0_0_10px_rgba(219,234,254,0.45)]">
                    <span className="absolute inset-2 rounded-full bg-gradient-to-br from-[#dbeafe] to-[#e0e7ff]" />
                    <span className="relative flex h-10 items-center gap-[3px]">
                      {[14, 22, 30, 20, 34, 26, 16, 24, 18].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-[3px] rounded-full bg-[#2563eb]"
                          style={{ height: `${h}px` }}
                          animate={online ? { scaleY: [1, 1.6, 0.7, 1.25, 1] } : { scaleY: 1 }}
                          transition={{
                            duration: 1.1,
                            repeat: Infinity,
                            delay: i * 0.09,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="mt-3 text-[16px] font-bold tabular-nums text-[#0f172a]">{fmt(seconds)}</p>
                  <p className="mt-0.5 text-[12px] text-[#64748b]">AI Agent is speaking...</p>
                </div>

                {/* Transcript */}
                <div className="mt-4 space-y-2.5">
                  {voiceCallTranscript.map((t, i) =>
                    t.from === "customer" ? (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                          <UsersRound className="size-3.5" />
                        </span>
                        <span className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                          {t.text}
                        </span>
                      </div>
                    ) : (
                      <div key={i} className="flex items-start justify-end gap-2">
                        <span className="max-w-[85%] rounded-2xl rounded-tr-md bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#334155] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                          {t.text}
                        </span>
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#e8ebf1]">
                          <LogoMark className="size-4" />
                        </span>
                      </div>
                    ),
                  )}
                </div>

                {/* Controls */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    aria-label="Mute microphone"
                    className="flex size-11 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#475569] transition-colors hover:bg-[#f1f5f9]"
                  >
                    <Mic className="size-[18px]" />
                  </button>
                  <button
                    aria-label="End call"
                    className="flex size-13 items-center justify-center rounded-full bg-[#ef4444] text-white shadow-[0_4px_12px_rgba(239,68,68,0.35)] transition-colors hover:bg-[#dc2626]"
                  >
                    <PhoneOff className="size-5" />
                  </button>
                  <button
                    aria-label="Keypad"
                    className="flex size-11 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#475569] transition-colors hover:bg-[#f1f5f9]"
                  >
                    <Grid3x3 className="size-[18px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="min-w-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Call Metrics</h3>
                <SelectMenu
                  value="This Month"
                  options={["This Month", "Last Month", "Last 90 Days"]}
                  onChange={() => undefined}
                  className="h-8 text-[12px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {voiceKeyMetrics.map((m) => (
                  <MiniMetric key={m.id} m={m} />
                ))}
              </div>

              {/* Call outcomes */}
              <div>
                <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Call Outcomes</h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="relative h-[124px] w-[124px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={callOutcomes}
                          dataKey="pct"
                          innerRadius={40}
                          outerRadius={58}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={2}
                          stroke="none"
                          animationDuration={900}
                        >
                          {callOutcomes.map((c) => (
                            <Cell key={c.label} fill={c.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[17px] font-bold tracking-[-0.02em] text-[#0f172a]">312</span>
                      <span className="text-[10.5px] text-[#94a3b8]">Total Calls</span>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    {callOutcomes.map((c) => (
                      <div key={c.label} className="flex items-center gap-2 text-[12px]">
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                        <span className="truncate text-[#475569]">{c.label}</span>
                        <span className="ml-auto font-semibold text-[#0f172a]">{c.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone settings */}
              <div className="rounded-[12px] border border-[#eef1f6] p-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13.5px] font-semibold text-[#0f172a]">Phone Number & Settings</h3>
                  <button className="text-[12px] font-medium text-[#2563eb] hover:underline">Edit</button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                    <Phone className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#0f172a]">{phoneSettings.number}</span>
                      <span className="rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-medium text-[#059669]">
                        Active
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] text-[#94a3b8]">{phoneSettings.label}</span>
                  </span>
                </div>
                <div className="mt-1">
                  {phoneSettings.rows.map((row) => {
                    const Icon =
                      row.icon === "clock" ? Clock : row.icon === "flow" ? Workflow : Languages
                    return (
                      <button
                        key={row.title}
                        className="flex w-full items-center gap-2.5 border-b border-[#eef1f6] py-2.5 text-left transition-colors last:border-b-0 hover:bg-[#f8fafc]"
                      >
                        <Icon className="size-4 shrink-0 text-[#94a3b8]" />
                        <span className="text-[12.5px] font-medium text-[#334155]">{row.title}</span>
                        <span className="ml-auto truncate text-[12px] text-[#64748b]">{row.value}</span>
                        <ChevronRight className="size-3.5 shrink-0 text-[#cbd5e1]" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>
    </motion.div>
  )
}
