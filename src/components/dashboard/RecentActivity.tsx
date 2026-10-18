import { FileText, Phone, TicketCheck, UserRoundPlus } from "lucide-react"
import { motion } from "framer-motion"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { analytics } from "@/data/mockData"
import { formatRelativeTime } from "@/lib/utils"
import type { Notification } from "@/types"

const typeMeta: Record<
  Notification["type"],
  { icon: typeof FileText; bg: string }
> = {
  document: { icon: FileText, bg: "bg-[#eff6ff] text-[#2563eb]" },
  ticket: { icon: TicketCheck, bg: "bg-[#ecfdf5] text-[#059669]" },
  call: { icon: Phone, bg: "bg-[#faf5ff] text-[#7c3aed]" },
  team: { icon: UserRoundPlus, bg: "bg-[#fff7ed] text-[#c2410c]" },
}

export function RecentActivity({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel className="flex h-full flex-col">
        <PanelHeader
          title="Recent Activity"
          action={
            <button className="rounded-lg px-2 py-1 text-[12.5px] font-medium text-[#2563eb] transition-colors hover:bg-[#eff6ff]">
              View All
            </button>
          }
        />
        <ul className="space-y-1 px-3 pb-4">
          {analytics.activity.map((a, i) => {
            const meta = typeMeta[a.type]
            const Icon = meta.icon
            return (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
                className="flex items-start gap-3 rounded-[10px] px-2.5 py-2.5 transition-colors hover:bg-[#f8fafc]"
              >
                <span
                  className={`mt-0.5 flex size-8.5 shrink-0 items-center justify-center rounded-full ${meta.bg}`}
                >
                  <Icon className="size-3.5" strokeWidth={2.1} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-[#0f172a]">{a.title}</p>
                  <p className="mt-0.5 truncate text-[12px] text-[#94a3b8]">{a.detail}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap pt-0.5 text-[11.5px] text-[#94a3b8]">
                  {formatRelativeTime(a.minutesAgo)}
                </span>
              </motion.li>
            )
          })}
        </ul>
      </Panel>
    </motion.div>
  )
}
