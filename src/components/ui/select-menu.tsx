import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SelectMenu({
  value,
  options,
  onChange,
  className,
  leading,
  icon,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
  className?: string
  leading?: ReactNode
  icon?: ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-haspopup="listbox"
          className={cn("group/select", className)}
        >
          {icon}
          {leading && <span className="truncate">{leading}</span>}
          <span className="truncate">{value}</span>
          <ChevronDown className="size-3.5 shrink-0 text-[#94a3b8] transition-transform duration-200 group-data-[state=open]/select:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-72 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            active={opt === value}
            onSelect={() => onChange(opt)}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
