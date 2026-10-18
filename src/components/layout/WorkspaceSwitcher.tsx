import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { organizations } from "@/data/mockData"
import { cn } from "@/lib/utils"

export function WorkspaceSwitcher() {
  const [activeId, setActiveId] = useState(organizations[0].id)
  const active = organizations.find((o) => o.id === activeId) ?? organizations[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group flex w-full items-center gap-3 rounded-[12px] border border-[#e8ebf1] bg-white px-3 py-2.5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
        aria-label="Switch workspace"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#2563eb] text-[13.5px] font-semibold text-white">
          W
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-semibold text-[#0f172a]">
            {active.name}
          </span>
          <span className="block text-[11.5px] text-[#94a3b8]">
            {active.plan} Plan
          </span>
        </span>
        <ChevronsUpDown className="size-3.5 shrink-0 text-[#94a3b8] transition-colors group-hover:text-[#64748b]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[calc(var(--radix-dropdown-menu-trigger-width)+12px)] min-w-56">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            active={org.id === activeId}
            onSelect={() => setActiveId(org.id)}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-md text-[11px] font-semibold text-white",
                org.id === "woodmaster-cnc"
                  ? "bg-[#2563eb]"
                  : org.id === "acme-robotics"
                    ? "bg-[#7c3aed]"
                    : "bg-[#0d9488]",
              )}
            >
              {org.name[0]}
            </span>
            <span className="min-w-0 flex-1 truncate">{org.name}</span>
            <span className="text-[11px] text-[#94a3b8]">{org.plan}</span>
            {org.id === activeId && <Check className="size-3.5 text-[#2563eb]" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className="flex size-6 items-center justify-center rounded-md border border-dashed border-[#cbd5e1]">
            <Plus className="size-3.5 text-[#64748b]" />
          </span>
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
