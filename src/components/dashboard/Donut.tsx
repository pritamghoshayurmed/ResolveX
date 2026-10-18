import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { Panel, PanelHeader } from "@/components/ui/panel"
import { CountUpText } from "@/lib/useCountUp"
import { cn } from "@/lib/utils"

export interface DonutDatum {
  label: string
  value: number
  color: string
}

export function Donut({
  data,
  total,
  centerLabel,
  size = 148,
  thickness = 22,
  small,
}: {
  data: DonutDatum[]
  total: number
  centerLabel: string
  size?: number
  thickness?: number
  small?: boolean
}) {
  const pct = (v: number) => `${Math.round((v / data.reduce((a, d) => a + d.value, 0)) * 100)}%`

  return (
    <div className="flex items-center gap-5">
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`${centerLabel}: ${data.map((d) => `${d.label} ${pct(d.value)}`).join(", ")}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const d = payload[0]
                return (
                  <div className="rounded-lg border border-[#e8ebf1] bg-white px-3 py-2 text-[12.5px] shadow-[0_12px_32px_-8px_rgba(15,23,42,0.16)]">
                    <span className="font-semibold text-[#0f172a]">{d.name}:</span>{" "}
                    <span className="text-[#64748b]">{pct(d.value as number)}</span>
                  </div>
                )
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={size / 2 - thickness}
              outerRadius={size / 2 - 2}
              paddingAngle={1.5}
              cornerRadius={thickness / 2}
              startAngle={90}
              endAngle={-270}
              animationDuration={900}
              strokeWidth={0}
            >
              {data.map((d) => (
                <Cell key={d.label} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {small ? (
            <span className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
              <CountUpText value={total} />
            </span>
          ) : (
            <>
              <span className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
                <CountUpText value={total} />
              </span>
              <span className="mt-1 text-[11.5px] text-[#94a3b8]">{centerLabel}</span>
            </>
          )}
        </div>
      </div>

      <ul
        className={cn(
          "min-w-0 flex-1 space-y-2.5",
        )}
      >
        {data.map((d, i) => (
          <motion.li
            key={d.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.07, duration: 0.35 }}
            className="flex items-center gap-2.5 text-[12.5px]"
          >
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
            <span className={cn("truncate text-[#475569]", !small && "text-[13px]")}>
              {d.label}
            </span>
            <span className="ml-auto shrink-0 font-semibold text-[#0f172a]">
              {pct(d.value)}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export function DonutPanel({
  title,
  action,
  className,
  index = 0,
  children,
  bodyClassName,
}: {
  title: string
  action?: React.ReactNode
  className?: string
  index?: number
  children: React.ReactNode
  bodyClassName?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
      className={className}
    >
      <Panel className="flex h-full flex-col">
        <PanelHeader title={title} action={action} />
        <div className={cn("flex-1 px-5 pb-5", bodyClassName)}>{children}</div>
      </Panel>
    </motion.div>
  )
}
