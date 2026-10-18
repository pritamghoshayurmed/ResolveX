import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import type { ComponentType } from "react"
import {
  Archive,
  CalendarDays,
  CheckCheck,
  ChevronRight,
  EyeOff,
  FileText,
  Image as ImageIcon,
  Languages,
  Link2,
  ListFilter,
  Mail,
  MessageCircle,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Pencil,
  Phone,
  Plus,
  Search,
  Send,
  Smile,
  Sparkles,
  Star,
  Tag,
  Target,
  Ticket,
  Trash2,
  UserCheck,
  Zap,
} from "lucide-react"
import { SelectMenu } from "@/components/ui/select-menu"
import { Button } from "@/components/ui/button"
import { Panel, PanelHeader } from "@/components/ui/panel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { conversations } from "@/data/mockData"
import {
  getThread,
  type CustomerDetail,
  type ThreadMessage,
} from "@/data/conversationDetails"
import { formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/layout/Sidebar"
import type { Channel, TicketStatus } from "@/types"

/* ---------------------------------- data ---------------------------------- */

const palette = [
  { bg: "#dbeafe", fg: "#2563eb" },
  { bg: "#ffedd5", fg: "#ea580c" },
  { bg: "#f3e8ff", fg: "#7c3aed" },
  { bg: "#dcfce7", fg: "#16a34a" },
  { bg: "#eee7fe", fg: "#6d28d9" },
  { bg: "#ffe4e6", fg: "#e11d48" },
  { bg: "#d1fae5", fg: "#059669" },
  { bg: "#fef9c3", fg: "#ca8a04" },
]

const statusTone: Record<TicketStatus, { label: string; className: string }> = {
  resolved: { label: "Resolved", className: "bg-[#ecfdf5] text-[#059669]" },
  in_progress: { label: "In Progress", className: "bg-[#fff7ed] text-[#c2410c]" },
  open: { label: "Open", className: "bg-[#fef2f2] text-[#dc2626]" },
  on_hold: { label: "On Hold", className: "bg-[#f1f5f9] text-[#64748b]" },
}

const channelMeta: Record<Channel, { label: string; icon: ComponentType<{ className?: string }> }> = {
  chat: { label: "Chat", icon: MessageCircle },
  voice: { label: "Voice Call", icon: Phone },
  whatsapp: { label: "WhatsApp", icon: WhatsAppIcon },
  email: { label: "Email", icon: Mail },
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.32 4.94L2 22l5.24-1.38a9.93 9.93 0 0 0 4.8 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.1c-1.52 0-3.02-.4-4.32-1.18l-.3-.18-3.12.82.84-3.04-.2-.32a8.05 8.05 0 0 1-1.24-4.24c0-4.46 3.62-8.1 8.06-8.1 4.46 0 8.08 3.64 8.08 8.1 0 4.46-3.64 8.14-7.8 8.14Zm4.44-6.06c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.1 3.64.58.24 1.02.38 1.38.5.58.18 1.1.16 1.52.1.46-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

/* ---------------------------------- page ---------------------------------- */

type ListTab = "all" | "unresolved" | "mentions"

export function Conversations() {
  const [tab, setTab] = useState<ListTab>("all")
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState("c-1")
  const [channel, setChannel] = useState("All Channels")
  const [status, setStatus] = useState("All Status")
  const [draft, setDraft] = useState("")
  const [extraMessages, setExtraMessages] = useState<Record<string, ThreadMessage[]>>({})

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0]
  const thread = getThread(active.id)
  const messages = [...thread.messages, ...(extraMessages[active.id] ?? [])]

  const detail = thread.detail

  useEffect(() => {
    setDraft("")
  }, [activeId])

  const list = conversations
    .filter((c) => {
      if (tab === "unresolved") return c.status !== "resolved"
      if (tab === "mentions") return false
      return true
    })
    .filter((c) => {
      if (channel === "All Channels") return true
      if (channel === "Voice") return c.channel === "voice"
      if (channel === "WhatsApp") return c.channel === "whatsapp"
      if (channel === "Email") return c.channel === "email"
      if (channel === "Chat") return c.channel === "chat"
      return true
    })
    .filter((c) => status === "All Status" || statusTone[c.status].label === status)
    .filter(
      (c) =>
        query.trim() === "" ||
        `${c.customerName} ${c.message}`.toLowerCase().includes(query.trim().toLowerCase()),
    )

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
    setExtraMessages((m) => ({
      ...m,
      [active.id]: [
        ...(m[active.id] ?? []),
        { id: `you-${Date.now()}`, from: "you", text, time: now },
      ],
    }))
    setDraft("")
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">
            Conversations
          </h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Manage all customer conversations across chat, calls and channels.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <SelectMenu
            value={channel}
            options={["All Channels", "Chat", "Voice", "WhatsApp", "Email"]}
            onChange={setChannel}
            className="h-9.5 pr-3 pl-3.5 text-[13.5px]"
          />
          <SelectMenu
            value={status}
            options={["All Status", "Open", "In Progress", "Resolved", "On Hold"]}
            onChange={setStatus}
            className="h-9.5 pr-3 pl-3.5 text-[13.5px]"
          />
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
          <Button asChild>
            <Link to="/tickets">
              <Plus className="size-4" /> New Ticket
            </Link>
          </Button>
        </div>
      </div>

      {/* Three-column workspace */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[400px_minmax(0,1fr)_350px]">
        <ConversationList
          tab={tab}
          onTab={setTab}
          query={query}
          onQuery={setQuery}
          list={list}
          activeId={activeId}
          onSelect={setActiveId}
        />

        <ChatPanel
          customerName={active.customerName}
          messages={messages}
          draft={draft}
          onDraft={setDraft}
          onSend={send}
        />

        <DetailColumn detail={detail} ticket={thread.detail.ticket} />
      </div>
    </div>
  )
}

/* ------------------------------ conversation list ------------------------------ */

function ConversationList({
  tab,
  onTab,
  query,
  onQuery,
  list,
  activeId,
  onSelect,
}: {
  tab: ListTab
  onTab: (t: ListTab) => void
  query: string
  onQuery: (v: string) => void
  list: typeof conversations
  activeId: string
  onSelect: (id: string) => void
}) {
  const tabs: { key: ListTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: 248 },
    { key: "unresolved", label: "Unresolved", count: 42 },
    { key: "mentions", label: "Mentions", count: 12 },
  ]

  return (
    <Panel className="flex flex-col xl:h-[790px]">
      {/* Tabs */}
      <div className="flex items-center gap-5 border-b border-[#e8ebf1] px-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onTab(t.key)}
            aria-selected={tab === t.key}
            role="tab"
            className={cn(
              "relative flex items-center gap-1.5 pb-3 pt-4 text-[13.5px] font-medium transition-colors",
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
                tab === t.key
                  ? "bg-[#2563eb] text-white"
                  : "bg-[#f1f5f9] text-[#64748b]",
              )}
            >
              {t.count}
            </span>
          </button>
        ))}
        <button
          aria-label="More list options"
          className="ml-auto flex size-7 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 pt-3.5">
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[#e8ebf1] bg-[#f7f8fb] px-3 transition-colors focus-within:border-[#c7d7f5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2563eb]/15 hover:border-[#d7dce5]">
          <Search className="size-4 shrink-0 text-[#94a3b8]" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search customers or messages..."
            aria-label="Search conversations"
            className="w-full bg-transparent text-[13px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
          />
        </div>
        <button
          aria-label="Filter conversations"
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#e8ebf1] bg-white text-[#475569] transition-colors hover:bg-[#f1f5f9]"
        >
          <ListFilter className="size-4" />
        </button>
      </div>

      {/* Items */}
      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2.5">
        {list.length === 0 && (
          <p className="px-4 py-10 text-center text-[13px] text-[#94a3b8]">
            No conversations match your filters.
          </p>
        )}
        {list.map((c, i) => {
          const ch = channelMeta[c.channel]
          const st = statusTone[c.status]
          const color = palette[i % palette.length]
          const initials = c.customerName
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
          const isActive = c.id === activeId
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-[12px] border px-3 py-3 text-left transition-colors duration-150",
                isActive
                  ? "border-[#dbeafe] bg-[#eef4ff]"
                  : "border-transparent hover:bg-[#f6f8fb]",
              )}
            >
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold"
                style={{ backgroundColor: color.bg, color: color.fg }}
              >
                {initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13.5px] font-semibold text-[#0f172a]">
                    {c.customerName}
                  </span>
                  <span className="shrink-0 text-[11px] text-[#94a3b8]">
                    {formatRelativeTime(c.minutesAgo)}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] text-[#64748b]">
                  {c.message}
                </span>
                <span className="mt-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#475569]">
                    <ch.icon
                      className={cn(
                        "size-3.5",
                        c.channel === "whatsapp" && "text-[#16a34a]",
                      )}
                    />
                    {ch.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      st.className,
                    )}
                  >
                    {st.label}
                  </span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

/* --------------------------------- chat panel --------------------------------- */

function ChatPanel({
  customerName,
  messages,
  draft,
  onDraft,
  onSend,
}: {
  customerName: string
  messages: ThreadMessage[]
  draft: string
  onDraft: (v: string) => void
  onSend: () => void
}) {
  const [chatTab, setChatTab] = useState("Conversation")
  const [composerTab, setComposerTab] = useState("Reply")
  const [starred, setStarred] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const last = messages[messages.length - 1]

  useEffect(() => {
    if (last?.from === "you") {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [last?.id, last?.from])

  const initials = customerName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const chatTabs = ["Conversation", "Customer Info", "Tickets (1)", "Notes", "Activity"]

  return (
    <Panel className="flex min-h-[640px] flex-col xl:h-[790px]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#e8ebf1] px-4 py-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-[12.5px] font-semibold text-white">
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14.5px] font-semibold text-[#0f172a]">
            {customerName}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[#16a34a]">
            <span className="size-1.5 rounded-full bg-[#22c55e]" /> Online
          </span>
        </span>
        <span className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setStarred((s) => !s)}
            aria-label={starred ? "Unstar conversation" : "Star conversation"}
            className="flex size-8.5 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
          >
            <Star
              className={cn("size-[17px]", starred && "fill-[#f59e0b] text-[#f59e0b]")}
              strokeWidth={1.9}
            />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Conversation options"
              className="flex size-8.5 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
            >
              <MoreVertical className="size-[17px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <UserCheck className="size-4 text-[#94a3b8]" /> Assign to agent
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="size-4 text-[#94a3b8]" /> Add tags
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EyeOff className="size-4 text-[#94a3b8]" /> Mark as unread
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="size-4 text-[#94a3b8]" /> Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
                <Trash2 className="size-4" /> Close conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-5 border-b border-[#e8ebf1] px-4">
        {chatTabs.map((t) => (
          <button
            key={t}
            onClick={() => setChatTab(t)}
            className={cn(
              "relative pb-3 pt-3.5 text-[13px] font-medium transition-colors",
              "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2.5px] after:rounded-full after:bg-[#2563eb] after:transition-opacity",
              chatTab === t
                ? "text-[#2563eb] after:opacity-100"
                : "text-[#64748b] after:opacity-0 hover:text-[#0f172a]",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Body */}
      {chatTab !== "Conversation" ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 text-[13px] text-[#94a3b8]">
          {chatTab === "Customer Info" && (
            <p className="text-center">Customer info is shown in the details panel.</p>
          )}
          {chatTab === "Tickets (1)" && (
            <div className="flex items-center justify-center gap-2 py-8 text-[#64748b]">
              <Ticket className="size-4" /> 1 linked ticket for this customer.
            </div>
          )}
          {chatTab === "Notes" && (
            <p className="text-center">No internal notes yet. Add one from the composer.</p>
          )}
          {chatTab === "Activity" && (
            <p className="text-center">No recent activity for this conversation.</p>
          )}
        </div>
      ) : (
        <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
          {messages.map((m) => {
            if (m.from === "customer") {
              return (
                <div key={m.id} className="flex items-start gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eef2f7] text-[11px] font-semibold text-[#475569]">
                    {initials}
                  </span>
                  <span className="min-w-0">
                    <span className="max-w-[520px] rounded-2xl rounded-tl-md bg-[#f1f4f9] px-4 py-2.5 text-[13.5px] leading-relaxed text-[#0f172a]">
                      {m.text}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 pl-0.5 text-[11px] text-[#94a3b8]">
                      {m.time}
                      <span className="flex items-center gap-1">
                        <MessageCircle className="size-3" /> Chat
                      </span>
                    </span>
                  </span>
                </div>
              )
            }

            return (
              <div key={m.id} className="flex items-start justify-end gap-2.5">
                <span className="flex max-w-[560px] flex-col items-end">
                  <span
                    className={cn(
                      "rounded-2xl rounded-tr-md px-4 py-2.5 text-[13.5px] leading-relaxed text-white",
                      m.from === "ai"
                        ? "bg-[#3f7cf6]"
                        : "bg-[#2563eb]",
                    )}
                  >
                    {m.text}
                    {m.sources && (
                      <span className="mt-2.5 block">
                        <span className="block text-[10.5px] font-medium text-white/70">
                          Sources ({m.sources.length})
                        </span>
                        <span className="mt-1.5 flex flex-wrap gap-1.5">
                          {m.sources.map((s) => (
                            <span
                              key={s.title}
                              className="flex items-center gap-1.5 rounded-lg bg-white/12 px-2 py-1.5 text-left"
                            >
                              {s.kind === "pdf" ? (
                                <span className="flex size-6 shrink-0 items-center justify-center rounded bg-white text-[8px] font-bold text-[#dc2626]">
                                  PDF
                                </span>
                              ) : (
                                <FileText className="size-3.5 shrink-0 text-white/85" />
                              )}
                              <span className="min-w-0">
                                <span className="block max-w-[140px] truncate text-[11px] font-medium text-white">
                                  {s.title}
                                </span>
                                <span className="block truncate text-[10px] text-white/65">
                                  {s.sub}
                                </span>
                              </span>
                            </span>
                          ))}
                        </span>
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1 pr-0.5 text-[11px] text-[#94a3b8]">
                    {m.time}
                    {m.from === "ai" && <CheckCheck className="size-3.5 text-[#3b82f6]" />}
                  </span>
                </span>
                {m.from === "ai" ? (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#e8ebf1]">
                    <LogoMark className="size-5" />
                  </span>
                ) : (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-[11px] font-semibold text-white">
                    PG
                  </span>
                )}
              </div>
            )
          })}

          {/* AI typing indicator */}
          <div className="flex items-end justify-end gap-2.5">
            <span className="flex h-8 items-center gap-1.5 rounded-full bg-[#eef2f7] px-3.5">
              <TypingDot delay="0s" />
              <TypingDot delay="0.15s" />
              <TypingDot delay="0.3s" />
            </span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#e8ebf1]">
              <LogoMark className="size-5" />
            </span>
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="border-t border-[#e8ebf1]">
        <div className="flex items-center gap-5 px-4 pt-1">
          {["Reply", "Internal Note", "Create Ticket"].map((t) => (
            <button
              key={t}
              onClick={() => setComposerTab(t)}
              className={cn(
                "relative pb-2 pt-2.5 text-[12.5px] font-medium transition-colors",
                "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2.5px] after:rounded-full after:bg-[#2563eb] after:transition-opacity",
                composerTab === t
                  ? "text-[#2563eb] after:opacity-100"
                  : "text-[#64748b] after:opacity-0 hover:text-[#0f172a]",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="px-4 pb-3.5 pt-1.5">
          <textarea
            value={draft}
            onChange={(e) => onDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
            rows={2}
            aria-label={composerTab}
            placeholder={
              composerTab === "Reply"
                ? "Type a message..."
                : composerTab === "Internal Note"
                  ? "Add an internal note..."
                  : "Describe the ticket..."
            }
            className="min-h-[56px] w-full resize-none rounded-lg text-[13.5px] leading-relaxed text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
          />
          <div className="flex flex-wrap items-center gap-1">
            {[Paperclip, Smile, ImageIcon, Zap].map((Icon, i) => (
              <button
                key={i}
                aria-label={`Composer action ${i + 1}`}
                className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
              >
                <Icon className="size-4" />
              </button>
            ))}
            <span className="ml-auto flex items-center gap-1.5">
              <button
                aria-label="Send later"
                className="flex size-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
              >
                <ClockIcon />
              </button>
              <Button className="h-8.5 rounded-lg px-4 text-[13px]" onClick={onSend}>
                Send <Send className="size-3.5" />
              </Button>
            </span>
          </div>
        </div>
      </div>
    </Panel>
  )
}

function TypingDot({ delay }: { delay: string }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-[#94a3b8]"
      style={{ animationDelay: delay }}
    />
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3v2M19 12h2M19.4 5.6l-1.4 1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

/* -------------------------------- detailed column -------------------------------- */

const sentimentTone: Record<CustomerDetail["sentiment"], string> = {
  positive: "bg-[#dcfce7] text-[#16a34a]",
  neutral: "bg-[#f1f5f9] text-[#64748b]",
  negative: "bg-[#fee2e2] text-[#dc2626]",
}

function DetailColumn({
  detail,
  ticket,
}: {
  detail: CustomerDetail
  ticket?: CustomerDetail["ticket"]
}) {
  const insightRows = [
    { icon: Target, label: "Intent", value: <Badge className="bg-[#eff6ff] text-[#2563eb]">{detail.intent}</Badge> },
    { icon: Sparkles, label: "Sentiment", value: <Badge className={sentimentTone[detail.sentiment]}>{detail.sentiment === "positive" ? "Positive" : detail.sentiment === "neutral" ? "Neutral" : "Negative"}</Badge> },
    { icon: Languages, label: "Language", value: <span className="text-[12.5px] font-medium text-[#334155]">{detail.language}</span> },
    { icon: FileText, label: "Confidence", value: <Badge className="bg-[#dcfce7] text-[#16a34a]">{detail.confidence}</Badge> },
  ]

  const knowledgeIcons = {
    pdf: <span className="flex size-8 items-center justify-center rounded-[9px] bg-[#fef2f2] text-[8px] font-bold text-[#dc2626]">PDF</span>,
    doc: <span className="flex size-8 items-center justify-center rounded-[9px] bg-[#f1f5f9] text-[#475569]"><FileText className="size-4" /></span>,
    link: <span className="flex size-8 items-center justify-center rounded-[9px] bg-[#eff6ff] text-[#2563eb]"><Link2 className="size-4" /></span>,
  }

  return (
    <div className="min-w-0 space-y-5">
      {/* Customer details */}
      <Panel>
        <PanelHeader
          title="Customer Details"
          action={
            <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
              <Pencil className="size-3.5" /> Edit
            </button>
          }
        />
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3.5">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#d5e3fb] text-[15px] font-semibold text-[#2563eb]">
              {detail.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[16px] font-semibold text-[#0f172a]">
                {detail.name}
              </span>
              <span className="block truncate text-[12.5px] text-[#64748b]">{detail.email}</span>
              <span className="block text-[12.5px] text-[#64748b]">{detail.phone}</span>
            </span>
          </div>
          <div className="mt-4 space-y-0 text-[13px]">
            <MetaRow label="Company" value={detail.company} />
            <MetaRow label="Location" value={detail.location} />
            <MetaRow label="Customer Type" value={detail.customerType} />
            <MetaRow label="Total Conversations" value={String(detail.totalConversations)} />
            <MetaRow label="Total Tickets" value={String(detail.totalTickets)} />
            <MetaRow label="Customer Since" value={detail.customerSince} />
          </div>
        </div>
      </Panel>

      {/* AI insights */}
      <Panel>
        <PanelHeader
          title="AI Insights"
          action={<Sparkles className="size-4 text-[#f59e0b]" />}
        />
        <div className="px-5 pb-5">
          <div className="space-y-3.5">
            {insightRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 text-[13px] font-medium text-[#334155]">
                  <row.icon className="size-4 shrink-0 text-[#94a3b8]" />
                  {row.label}
                </span>
                {row.value}
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Related knowledge */}
      <Panel>
        <PanelHeader
          title="Related Knowledge"
          action={
            <Link
              to="/knowledge-base"
              className="text-[12.5px] font-medium text-[#2563eb] hover:underline"
            >
              View All
            </Link>
          }
        />
        <div className="space-y-2 px-3.5 pb-4">
          {detail.relatedKnowledge.map((k) => (
            <button
              key={k.title}
              className="flex w-full items-start gap-3 rounded-[12px] border border-transparent px-2 py-2 text-left transition-colors hover:border-[#e8ebf1] hover:bg-[#f8fafc]"
            >
              {knowledgeIcons[k.kind]}
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{k.title}</span>
                <span className="block truncate text-[12px] text-[#94a3b8]">{k.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </Panel>

      {/* Tickets */}
      <Panel>
        <PanelHeader
          title="Tickets"
          action={
            <Link to="/tickets" className="text-[12.5px] font-medium text-[#2563eb] hover:underline">
              View All
            </Link>
          }
        />
        <div className="px-3.5 pb-4">
          {ticket ? (
            <button className="group flex w-full items-start gap-3 rounded-[12px] border border-transparent px-2 py-2 text-left transition-colors hover:border-[#e8ebf1] hover:bg-[#f8fafc]">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#eff6ff] text-[#2563eb]">
                <Ticket className="size-4" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-[#0f172a]">{ticket.id}</span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <span className="rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-medium text-[#059669]">
                      {ticket.status}
                    </span>
                    <ChevronRight className="size-4 text-[#cbd5e1] transition-colors group-hover:text-[#94a3b8]" />
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] text-[#475569]">{ticket.subject}</span>
                <span className="mt-0.5 block truncate text-[11.5px] text-[#94a3b8]">{ticket.meta}</span>
              </span>
            </button>
          ) : (
            <p className="px-2 py-3 text-[13px] text-[#94a3b8]">No linked tickets.</p>
          )}
        </div>
      </Panel>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#eef1f6] py-2.5 last:border-b-0">
      <span className="font-medium text-[#64748b]">{label}</span>
      <span className="font-medium text-[#0f172a]">{value}</span>
    </div>
  )
}

function Badge({ className, children }: { className?: string; children: string }) {
  return (
    <span
      className={cn(
        "max-w-[180px] truncate rounded-full px-2.5 py-0.5 text-[12px] font-medium",
        className,
      )}
    >
      {children}
    </span>
  )
}
