import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import {
  Bell,
  ChevronsUpDown,
  FileText,
  LifeBuoy,
  LogOut,
  Phone,
  Settings,
  Ticket,
  UserCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { notifications, conversations } from "@/data/mockData"
import { formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const [query, setQuery] = useState("")
  const [kOpen, setKOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        document.getElementById("global-search")?.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    setKOpen(query.trim().length > 0)
  }, [query])

  const results = query.trim()
    ? conversations.filter((c) =>
        `${c.customerName} ${c.message}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      )
    : []

  const unread = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center gap-4 border-b border-[#e8ebf1] bg-white px-6">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#475569] hover:bg-[#f1f5f9] lg:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Search */}
      <div className="relative w-full max-w-[640px]">
        <div
          className={cn(
            "flex h-10 items-center gap-2.5 rounded-[10px] border bg-[#f7f8fb] px-3.5 transition-all duration-200",
            query ? "border-[#c7d7f5] bg-white ring-2 ring-[#2563eb]/15" : "border-[#e8ebf1] hover:border-[#d7dce5]",
          )}
        >
          <Search className="size-4 shrink-0 text-[#94a3b8]" />
          <input
            id="global-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations, tickets, customers..."
            aria-label="Search"
            className="w-full bg-transparent text-[13.5px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
          />
          <kbd className="hidden shrink-0 items-center rounded-md border border-[#e2e8f0] bg-white px-2 py-0.5 text-[11px] font-medium text-[#94a3b8] sm:flex">
            Ctrl K
          </kbd>
        </div>

        <AnimatePresence>
          {kOpen && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-[#e8ebf1] bg-white shadow-[0_12px_32px_-8px_rgba(15,23,42,0.16)]"
              role="listbox"
            >
              <p className="px-4 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Conversations
              </p>
              {results.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[#f8fafc]"
                  onClick={() => setQuery("")}
                >
                  <Search className="size-3.5 shrink-0 text-[#94a3b8]" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-medium text-[#0f172a]">
                      {c.customerName}
                    </span>
                    <span className="block truncate text-[12.5px] text-[#64748b]">
                      {c.message}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11.5px] text-[#94a3b8]">
                    {formatRelativeTime(c.minutesAgo)}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Notifications"
            className="relative flex size-9.5 items-center justify-center rounded-[10px] text-[#475569] transition-colors hover:bg-[#f1f5f9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
          >
            <Bell className="size-[18px]" strokeWidth={1.9} />
            {unread > 0 && (
              <span className="absolute right-2 top-2 size-2 rounded-full bg-[#ef4444] ring-2 ring-white" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0">
            <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
              <span className="text-[14px] font-semibold text-[#0f172a]">
                Notifications
              </span>
              <span className="rounded-full bg-[#fef2f2] px-2 py-0.5 text-[11px] font-semibold text-[#dc2626]">
                {unread} new
              </span>
            </div>
            <DropdownMenuSeparator className="my-0" />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="items-start gap-3 py-2.5">
                <span
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                    n.type === "call" && "bg-[#ecfdf5] text-[#059669]",
                    n.type === "ticket" && "bg-[#eff6ff] text-[#2563eb]",
                    n.type === "document" && "bg-[#faf5ff] text-[#7c3aed]",
                    n.type === "team" && "bg-[#fff7ed] text-[#c2410c]",
                  )}
                >
                  {n.type === "call" && <Phone className="size-3.5" />}
                  {n.type === "ticket" && <Ticket className="size-3.5" />}
                  {n.type === "document" && <FileText className="size-3.5" />}
                  {n.type === "team" && <UserCircle className="size-3.5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-medium text-[#0f172a]">
                      {n.title}
                    </span>
                    <span className="shrink-0 text-[11px] text-[#94a3b8]">
                      {formatRelativeTime(n.minutesAgo)}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-[#64748b]">
                    {n.detail}
                  </span>
                </span>
                {!n.read && (
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#2563eb]" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="mx-1 hidden h-6 w-px bg-[#e8ebf1] sm:block" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2.5 rounded-[10px] py-1.5 pl-1.5 pr-2 transition-colors hover:bg-[#f1f5f9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
            aria-label="Account menu"
          >
            <span className="flex size-8.5 items-center justify-center rounded-full bg-[#2563eb] text-[12.5px] font-semibold text-white">
              PG
            </span>
            <span className="hidden text-left md:block">
              <span className="block text-[13.5px] font-semibold leading-tight text-[#0f172a]">
                Pritam Ghosh
              </span>
              <span className="block text-[11.5px] leading-tight text-[#94a3b8]">
                Admin
              </span>
            </span>
            <ChevronsUpDown className="hidden size-3.5 text-[#94a3b8] md:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <div className="flex items-center gap-3 px-2.5 pb-2 pt-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#2563eb] text-[13px] font-semibold text-white">
                PG
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold text-[#0f172a]">
                  Pritam Ghosh
                </span>
                <span className="block truncate text-[12px] text-[#94a3b8]">
                  pritam@resolve.ai
                </span>
              </span>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="size-4 text-[#94a3b8]" /> My profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4 text-[#94a3b8]" /> Organization settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="size-4 text-[#94a3b8]" /> Help & support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
              <LogOut className="size-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
