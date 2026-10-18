import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { CountUpText } from "@/lib/useCountUp"

const tones = {
  blue: {
    iconBg: "bg-[#dbeafe] text-[#2563eb]",
    line: "#2563eb",
    fill: ["rgba(37,99,235,0.18)", "rgba(37,99,235,0)"],
  },
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
  orange: {
    iconBg: "bg-[#ffedd5] text-[#ea580c]",
    line: "#f97316",
    fill: ["rgba(249,115,22,0.18)", "rgba(249,115,22,0)"],
  },
} as const

export type MetricTone = keyof typeof tones

export function MetricCard({
  icon: Icon,
  title,
  value,
  suffix,
  deltaPct,
  sparkline,
  tone,
  index = 0,
}: {
  icon: LucideIcon
  title: string
  value: number
  suffix?: string
  deltaPct: number
  sparkline: number[]
  tone: MetricTone
  index?: number
}) {
  const t = tones[tone]
  const data = sparkline.map((v, i) => ({ i, v }))

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
      whileHover={{ y: -2 }}
      className="rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_-6px_rgba(15,23,42,0.1)]"
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex size-8.5 shrink-0 items-center justify-center rounded-[9px]",
            t.iconBg,
          )}
        >
          <Icon className="size-4" strokeWidth={2.1} />
        </span>
        <h3 className="text-[13.5px] font-medium text-[#475569]">{title}</h3>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[26px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
            <CountUpText value={value} suffix={suffix} />
          </p>
          <p className="mt-2.5 flex items-center gap-1 text-[12.5px] font-semibold text-[#16a34a]">
            <ArrowUp className="size-3.5" strokeWidth={2.5} />
            {deltaPct}%
          </p>
          <p className="mt-0.5 text-[11.5px] text-[#94a3b8]">vs last month</p>
        </div>
        <div className="h-[52px] w-[92px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${tone}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.fill[0]} />
                  <stop offset="100%" stopColor={t.fill[1]} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={t.line}
                strokeWidth={1.8}
                fill={`url(#spark-${tone})`}
                isAnimationActive
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
