import { Slot } from "@radix-ui/react-slot"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "outline" | "ghost" | "subtle"
type Size = "sm" | "md"

const variants: Record<Variant, string> = {
  default:
    "bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
  outline:
    "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]",
  ghost: "text-[#475569] hover:bg-[#f1f5f9]",
  subtle: "bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]",
}

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-9.5 px-4 text-sm gap-2",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
