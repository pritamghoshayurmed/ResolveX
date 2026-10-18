import { useState } from "react"
import { Phone, ChevronRight, MessageSquare } from "lucide-react"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { aiAgents } from "@/data/mockData"
import { cn, formatNumber } from "@/lib/utils"

export function AgentStatus({ index = 0 }: { index?: number }) {
  const [agents, setAgents] = useState(aiAgents)

  const toggle = (id: string) =>
    setAgents((list) =>
      list.map((a) => (a.id === id ? { ...a, online: !a.online } : a)),
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel>
        <PanelHeader title="AI Agent Status" />
        <div className="space-y-2.5 px-3.5 pb-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={cn(
                "flex items-center gap-3 rounded-[12px] border px-3.5 py-3 transition-colors",
                agent.online ? "border-[#e8ebf1] bg-white" : "border-[#f1f5f9] bg-[#f8fafc]",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
                  agent.type === "chat"
                    ? "bg-[#dbeafe] text-[#2563eb]"
                    : "bg-[#dcfce7] text-[#16a34a]",
                )}
              >
                {agent.type === "chat" ? (
                  <MessageSquare className="size-4" strokeWidth={2} />
                ) : (
                  <Phone className="size-4" strokeWidth={2} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-[#0f172a]">{agent.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px]">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      agent.online ? "bg-[#22c55e]" : "bg-[#cbd5e1]",
                    )}
                  />
                  <span className={agent.online ? "text-[#16a34a] font-medium" : "text-[#94a3b8]"}>
                    {agent.online ? "Online" : "Offline"}
                  </span>
                  <span className="text-[#cbd5e1]">·</span>
                  <span className="truncate text-[#94a3b8]">
                    {agent.online ? agent.subtitle : "Paused"}
                  </span>
                </p>
              </div>
              <Switch
                checked={agent.online}
                onCheckedChange={() => toggle(agent.id)}
                ariaLabel={`Toggle ${agent.name}`}
              />
              <button
                aria-label={`Open ${agent.name} settings`}
                className="flex size-6 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          ))}
          <p className="px-1 pt-1 text-[11.5px] text-[#94a3b8]">
            {formatNumber(agents.reduce((a, x) => a + (x.online ? x.conversationsHandled : 0), 0))}{" "}
            handled this month by active agents
          </p>
        </div>
      </Panel>
    </motion.div>
  )
}
