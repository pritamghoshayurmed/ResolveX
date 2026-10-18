import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { analytics } from "@/data/mockData"

const barColors = ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#f97316"]

export function CustomerIssues({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel className="flex h-full flex-col">
        <PanelHeader
          title="Top Customer Issues"
          action={
            <button className="flex items-center gap-0.5 rounded-lg px-2 py-1 text-[12.5px] font-medium text-[#2563eb] transition-colors hover:bg-[#eff6ff]">
              View All <ChevronRight className="size-3.5" />
            </button>
          }
        />
        <div className="flex-1 px-5 pb-5">
          <ul className="flex h-full flex-col justify-between gap-1">
            {analytics.topIssues.map((issue, i) => (
              <motion.li
                key={issue.rank}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                className="group flex items-center gap-3.5 rounded-lg px-2 py-2 transition-colors hover:bg-[#f8fafc]"
              >
                <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[11.5px] font-semibold text-[#475569]">
                  {issue.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-[#0f172a]">
                    {issue.title}
                  </p>
                  <div className="mt-1.5 h-[4px] w-full max-w-[240px] overflow-hidden rounded-full bg-[#f1f5f9]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(issue.sharePct / 28) * 100}%` }}
                      transition={{ delay: 0.45 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColors[i] }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-[13px] font-semibold text-[#0f172a]">
                  {issue.sharePct}%
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Panel>
    </motion.div>
  )
}
