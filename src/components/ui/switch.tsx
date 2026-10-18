import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export function Switch({
  checked,
  onCheckedChange,
  className,
  ariaLabel,
}: {
  checked: boolean
  onCheckedChange: (v: boolean) => void
  className?: string
  ariaLabel?: string
}) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        checked ? "bg-[#2563eb]" : "bg-[#cbd5e1]",
        className,
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-[3px]",
        )}
      />
    </SwitchPrimitive.Root>
  )
}
