import { motion } from "framer-motion"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Panel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-[#e8ebf1] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function PanelHeader({
  title,
  action,
  className,
}: {
  title: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-5 pb-4 pt-5",
        className,
      )}
    >
      <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
        {title}
      </h2>
      {action}
    </div>
  )
}

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.5, 0.4, 1] as const, delay: i * 0.05 },
  }),
}

export function MotionPanel({
  index = 0,
  className,
  children,
  ...props
}: Omit<
  HTMLAttributes<HTMLDivElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onTransitionEnd"
> & { index?: number; children: ReactNode }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
