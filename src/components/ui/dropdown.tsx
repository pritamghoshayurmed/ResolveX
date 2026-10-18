import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export function DropdownMenuContent({
  className,
  align = "end",
  sideOffset = 6,
  children,
}: {
  className?: string
  align?: "start" | "center" | "end"
  sideOffset?: number
  children: ReactNode
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-52 rounded-xl border border-[#e8ebf1] bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.16)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          className,
        )}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({
  className,
  active,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  active?: boolean
  className?: string
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] text-[#334155] outline-none transition-colors",
        "data-[highlighted]:bg-[#f1f5f9] data-[highlighted]:text-[#0f172a]",
        active && "bg-[#eff6ff] text-[#2563eb] font-medium",
        className,
      )}
      {...(props as Record<string, unknown>)}
    />
  )
}

export function DropdownMenuLabel({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2.5 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]",
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({
  className,
}: {
  className?: string
}) {
  return (
    <DropdownMenuPrimitive.Separator className={cn("my-1.5 h-px bg-[#eef1f6]", className)} />
  )
}

export function DropdownMenuCheckboxItem({
  className,
  checked,
  children,
  onSelect,
}: {
  className?: string
  checked: boolean
  children: ReactNode
  onSelect: () => void
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      onCheckedChange={() => onSelect()}
      onSelect={(e) => e.preventDefault()}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-lg px-2.5 py-2 text-[13.5px] text-[#334155] outline-none transition-colors data-[highlighted]:bg-[#f1f5f9]",
        className,
      )}
    >
      <span className="flex w-4 items-center justify-center">
        {checked && (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}
