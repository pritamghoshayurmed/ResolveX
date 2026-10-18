import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Tone = "green" | "orange" | "blue" | "red" | "gray" | "purple"

const tones: Record<Tone, string> = {
  green: "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]",
  orange: "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]",
  blue: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]",
  red: "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]",
  purple: "bg-[#faf5ff] text-[#7c3aed] border-[#f3e8ff]",
  gray: "bg-[#f8fafc] text-[#64748b] border-[#e2e8f0]",
}

const dotTones: Record<Tone, string> = {
  green: "bg-[#10b981]",
  orange: "bg-[#fb923c]",
  blue: "bg-[#3b82f6]",
  red: "bg-[#ef4444]",
  purple: "bg-[#a855f7]",
  gray: "bg-[#94a3b8]",
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  dot?: boolean
}

export function Badge({ className, tone = "gray", dot, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotTones[tone])} />}
      {props.children as string}
    </span>
  )
}
