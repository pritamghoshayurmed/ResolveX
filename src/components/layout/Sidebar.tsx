import { NavLink } from "react-router-dom"
import {
  BookOpen,
  ExternalLink,
  Headset,
  LayoutDashboard,
  MessagesSquare,
  Phone,
  Plug,
  Puzzle,
  Settings,
  Ticket,
  UsersRound,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { WorkspaceSwitcher } from "./WorkspaceSwitcher"

export const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Conversations", to: "/conversations", icon: MessagesSquare },
  { label: "Calls (Voice AI)", to: "/calls", icon: Phone },
  { label: "Tickets", to: "/tickets", icon: Ticket },
  { label: "Knowledge Base", to: "/knowledge-base", icon: BookOpen },
  { label: "AI Agents", to: "/ai-agents", icon: Puzzle },
  { label: "Integrations", to: "/integrations", icon: Plug },
  { label: "Team", to: "/team", icon: UsersRound },
  { label: "Settings", to: "/settings", icon: Settings },
] as const

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-[68px] items-center gap-2.5 px-6">
        <LogoMark className="size-7" />
        <span className="text-[19px] font-bold tracking-[-0.02em] text-[#0f172a]">
          Resolve X
        </span>
      </div>

      {/* Workspace */}
      <div className="px-3.5 pb-2 pt-3">
        <WorkspaceSwitcher />
      </div>

      {/* Nav */}
      <nav
        aria-label="Main navigation"
        className="flex-1 overflow-y-auto px-3.5 pb-4 pt-2"
      >
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-[10px] px-3 py-[9px] text-[13.5px] font-medium transition-colors duration-150",
                    isActive
                      ? "bg-[#eef2ff] text-[#2563eb]"
                      : "text-[#4b5563] hover:bg-[#f4f6fa] hover:text-[#0f172a]",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn(
                        "size-[17px] shrink-0 transition-colors",
                        isActive
                          ? "text-[#2563eb]"
                          : "text-[#94a3b8] group-hover:text-[#64748b]",
                      )}
                      strokeWidth={1.9}
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help card */}
      <div className="p-3.5 pt-2">
        <div className="rounded-[14px] border border-[#e8ebf1] bg-[#f8faff] p-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#dbeafe]">
            <Headset className="size-4 text-[#2563eb]" strokeWidth={2} />
          </div>
          <p className="mt-3 text-[13.5px] font-semibold text-[#0f172a]">
            Need help?
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#64748b]">
            Check our documentation or contact support.
          </p>
          <a
            href="#docs"
            className="mt-3 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#dbeafe] bg-white px-3 text-[12.5px] font-medium text-[#0f172a] transition-colors hover:bg-[#eff6ff]"
          >
            View Docs
            <ExternalLink className="size-3.5 text-[#64748b]" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M6 4h5.2L26 28h-5.2L6 4Z" fill="#2563eb" />
      <path d="M26 4h-5.2L6 28h5.2L26 4Z" fill="#93c5fd" />
    </svg>
  )
}
