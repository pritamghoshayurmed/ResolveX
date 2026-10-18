import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Phone,
  MessageCircle,
  MoreHorizontal,
  ChevronRight as ChevronRightIcon,
  ArrowUpDown,
} from "lucide-react"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { Badge } from "@/components/ui/badge"
import { SelectMenu } from "@/components/ui/select-menu"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { agentDirectory, conversations } from "@/data/mockData"
import { formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Conversation, TicketStatus } from "@/types"
import { motion } from "framer-motion"

const channelMeta: Record<
  string,
  { label: string; icon: typeof MessageSquare; classes: string }
> = {
  chat: { label: "Chat", icon: MessageSquare, classes: "text-[#2563eb] bg-[#eff6ff]" },
  voice: { label: "Voice Call", icon: Phone, classes: "text-[#16a34a] bg-[#ecfdf5]" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, classes: "text-[#16a34a] bg-[#ecfdf5]" },
  email: { label: "Email", icon: MessageSquare, classes: "text-[#7c3aed] bg-[#faf5ff]" },
}

const statusMeta: Record<TicketStatus, { label: string; tone: "green" | "orange" | "red" | "gray" }> = {
  resolved: { label: "Resolved", tone: "green" },
  in_progress: { label: "In Progress", tone: "orange" },
  open: { label: "Open", tone: "red" },
  on_hold: { label: "On Hold", tone: "gray" },
}

const avatarColors = ["#a855f7", "#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#14b8a6"]

type SortKey = "customerName" | "minutesAgo"

export function RecentConversations({ index = 0 }: { index?: number }) {
  const [channel, setChannel] = useState("All Channels")
  const [status, setStatus] = useState("All Status")
  const [agent, setAgent] = useState("All Agents")
  const [sortKey, setSortKey] = useState<SortKey>("minutesAgo")
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(0)
  const pageSize = 5

  const agentOptions = useMemo(
    () => ["All Agents", ...new Set(conversations.map((c) => agentDirectory[c.agentId].name))],
    [],
  )

  const filtered = useMemo(() => {
    const list = conversations.filter((c) => {
      const okChannel = channel === "All Channels" || channelMeta[c.channel].label === channel
      const okStatus = status === "All Status" || statusMeta[c.status].label === status
      const okAgent = agent === "All Agents" || agentDirectory[c.agentId].name === agent
      return okChannel && okStatus && okAgent
    })
    return [...list].sort((a, b) => {
      const dir = sortAsc ? 1 : -1
      if (sortKey === "minutesAgo") return (a.minutesAgo - b.minutesAgo) * dir
      return a.customerName.localeCompare(b.customerName) * dir
    })
  }, [channel, status, agent, sortKey, sortAsc])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pageCount - 1)
  const rows = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel className="overflow-hidden">
        <PanelHeader
          title="Recent Conversations"
          action={
            <div className="flex flex-wrap items-center justify-end gap-2">
              <SelectMenu
                value={channel}
                options={["All Channels", "Chat", "Voice Call", "WhatsApp", "Email"]}
                onChange={(v) => {
                  setChannel(v)
                  setPage(0)
                }}
                className="w-[124px] justify-between"
              />
              <SelectMenu
                value={status}
                options={["All Status", "Open", "In Progress", "Resolved", "On Hold"]}
                onChange={(v) => {
                  setStatus(v)
                  setPage(0)
                }}
                className="w-[124px] justify-between"
              />
              <SelectMenu
                value={agent}
                options={agentOptions}
                onChange={(v) => {
                  setAgent(v)
                  setPage(0)
                }}
                className="w-[128px] justify-between"
              />
              <button className="flex items-center gap-0.5 rounded-lg px-2 py-1 text-[12.5px] font-medium text-[#2563eb] transition-colors hover:bg-[#eff6ff]">
                View All <ChevronRightIcon className="size-3.5" />
              </button>
            </div>
          }
        />

        <div className="overflow-x-auto border-t border-[#f1f5f9]">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="text-[12px] font-medium text-[#94a3b8]">
                <Th onClick={() => toggleSort("customerName")} className="pl-5">
                  Customer
                  <ArrowUpDown className="ml-1 size-3 opacity-40" />
                </Th>
                <Th>Channel</Th>
                <Th>Issue / Message</Th>
                <Th>Agent</Th>
                <Th>Status</Th>
                <Th onClick={() => toggleSort("minutesAgo")}>
                  Time
                  <ArrowUpDown className="ml-1 size-3 opacity-40" />
                </Th>
                <Th className="pr-5 text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <ConversationRow key={c.id} c={c} i={i} />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-[13px] text-[#94a3b8]">
                    No conversations match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#f1f5f9] px-5 py-3">
          <p className="text-[12.5px] text-[#94a3b8]">
            Showing{" "}
            <span className="font-medium text-[#475569]">
              {filtered.length === 0 ? 0 : safePage * pageSize + 1}–
              {Math.min((safePage + 1) * pageSize, filtered.length)}
            </span>{" "}
            of <span className="font-medium text-[#475569]">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              aria-label="Previous page"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="flex size-8 items-center justify-center rounded-lg border border-[#e8ebf1] text-[#64748b] transition-colors hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                aria-current={safePage === i ? "page" : undefined}
                onClick={() => setPage(i)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg text-[12.5px] font-medium transition-colors",
                  safePage === i
                    ? "bg-[#eff6ff] text-[#2563eb]"
                    : "text-[#64748b] hover:bg-[#f8fafc]",
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              aria-label="Next page"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              className="flex size-8 items-center justify-center rounded-lg border border-[#e8ebf1] text-[#64748b] transition-colors hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}

function Th({
  children,
  onClick,
  className,
}: {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  const Tag = onClick ? "button" : "span"
  return (
    <th scope="col" className={cn("px-3 py-2.5 font-medium", className)}>
      <Tag
        onClick={onClick}
        className={cn(
          "flex items-center",
          className?.includes("text-right") && "justify-end",
          onClick && "cursor-pointer rounded hover:text-[#475569]",
        )}
      >
        {children}
      </Tag>
    </th>
  )
}

function ConversationRow({ c, i }: { c: Conversation; i: number }) {
  const channel = channelMeta[c.channel]
  const ChannelIcon = channel.icon
  const agent = agentDirectory[c.agentId]
  const st = statusMeta[c.status]

  return (
    <tr className="group border-t border-[#f1f5f9] transition-colors hover:bg-[#f8fafc]">
      <td className="py-2.5 pl-5 pr-3">
        <div className="flex items-center gap-2.5">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
            style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
          >
            {c.customerName[0]}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-[#0f172a]">
              {c.customerName}
            </p>
            <p className="truncate text-[11.5px] text-[#94a3b8]">{c.customerContact}</p>
          </div>
        </div>
      </td>
      <td className="px-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
            channel.classes,
          )}
        >
          <ChannelIcon className="size-3" />
          {channel.label}
        </span>
      </td>
      <td className="max-w-[260px] px-3">
        <p className="truncate text-[13px] text-[#334155]">{c.message}</p>
      </td>
      <td className="px-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6.5 shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold text-white"
            style={{ backgroundColor: agent.avatarColor }}
          >
            {agent.initials}
          </span>
          <span className="truncate text-[13px] text-[#334155]">{agent.name}</span>
        </div>
      </td>
      <td className="px-3">
        <Badge tone={st.tone} dot>
          {st.label}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-3 text-[12.5px] text-[#94a3b8]">
        {formatRelativeTime(c.minutesAgo)}
      </td>
      <td className="py-2.5 pl-3 pr-5">
        <div className="flex items-center justify-end gap-1 opacity-60 transition-opacity group-hover:opacity-100">
          <Dialog>
            <DialogTrigger
              aria-label={`View conversation with ${c.customerName}`}
              className="flex size-7.5 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-[#eff6ff] hover:text-[#2563eb]"
            >
              <Eye className="size-4" />
            </DialogTrigger>
            <DialogContent
              title={c.customerName}
              description={`${channel.label} · ${formatRelativeTime(c.minutesAgo)} ago`}
            >
              <div className="rounded-xl bg-[#f8fafc] border border-[#eef1f6] p-4 text-[13.5px] leading-relaxed text-[#334155]">
                “{c.message}”
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="flex size-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                    style={{ backgroundColor: agent.avatarColor }}
                  >
                    {agent.initials}
                  </span>
                  <span className="text-[13px] text-[#475569]">
                    Assigned to <span className="font-medium">{agent.name}</span>
                  </span>
                </div>
                <Badge tone={st.tone} dot>
                  {st.label}
                </Badge>
              </div>
            </DialogContent>
          </Dialog>
          <button
            aria-label="More actions"
            className="flex size-7.5 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-[#f1f5f9]"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
