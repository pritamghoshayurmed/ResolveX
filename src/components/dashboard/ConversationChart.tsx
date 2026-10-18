import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { motion } from "framer-motion"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { SelectMenu } from "@/components/ui/select-menu"
import { analytics } from "@/data/mockData"
import { cn } from "@/lib/utils"

const series = [
  { key: "chat", label: "Chat", color: "#2563eb" },
  { key: "voice", label: "Voice Calls", color: "#22c55e" },
  { key: "tickets", label: "Tickets", color: "#a855f7" },
] as const

const ranges: Record<string, number> = {
  "Last 7 days": 5,
  "Last 14 days": 8,
  "Last 30 days": 15,
}

export function ConversationChart({ index = 0 }: { index?: number }) {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    chat: true,
    voice: true,
    tickets: true,
  })
  const [range, setRange] = useState("Last 30 days")

  const data = useMemo(() => analytics.trends.slice(-ranges[range]), [range])

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel className="overflow-hidden">
        <PanelHeader
          title="Conversation Trends"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1" role="tablist" aria-label="Toggle series">
                {series.map((s) => (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={visible[s.key]}
                    onClick={() =>
                      setVisible((v) => ({ ...v, [s.key]: !v[s.key] }))
                    }
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12.5px] font-medium transition-colors",
                      visible[s.key]
                        ? "bg-[#f1f5f9] text-[#334155]"
                        : "text-[#94a3b8] hover:bg-[#f8fafc]",
                    )}
                  >
                    <span
                      className="size-2 rounded-full transition-opacity"
                      style={{
                        backgroundColor: s.color,
                        opacity: visible[s.key] ? 1 : 0.3,
                      }}
                    />
                    {s.label}
                  </button>
                ))}
              </div>
              <SelectMenu
                value={range}
                options={Object.keys(ranges)}
                onChange={setRange}
                className="ml-1"
              />
            </div>
          }
        />
        <div className="h-[260px] px-2 pb-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                {series.map((s) => (
                  <linearGradient key={s.key} id={`trend-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.16} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f6" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11.5 }}
                interval={2}
                dy={6}
              />
              <YAxis
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11.5 }}
                width={32}
              />
              <Tooltip
                cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="rounded-xl border border-[#e8ebf1] bg-white px-3.5 py-2.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.16)]">
                      <p className="mb-1.5 text-[12px] font-semibold text-[#0f172a]">{label}</p>
                      {payload
                        .filter((p) => visible[p.dataKey as string])
                        .map((p) => (
                          <div key={String(p.dataKey)} className="flex items-center gap-2 py-0.5 text-[12.5px]">
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: p.color as string }}
                            />
                            <span className="text-[#64748b]">
                              {series.find((s) => s.key === p.dataKey)?.label}
                            </span>
                            <span className="ml-auto pl-4 font-semibold text-[#0f172a]">
                              {p.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  )
                }}
              />
              {series.map((s) =>
                visible[s.key] ? (
                  <Area
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    stroke={s.color}
                    strokeWidth={2}
                    fill={`url(#trend-${s.key})`}
                    animationDuration={900}
                    dot={false}
                    activeDot={{ r: 3.5, strokeWidth: 0 }}
                  />
                ) : null,
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </motion.div>
  )
}
