import { CalendarDays } from "lucide-react"
import { MessagesSquare, PhoneCall, TicketCheck, Target } from "lucide-react"
import { SelectMenu } from "@/components/ui/select-menu"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { ConversationChart } from "@/components/dashboard/ConversationChart"
import { AgentStatus } from "@/components/dashboard/AgentStatus"
import { ChannelChart, TicketStatus } from "@/components/dashboard/ChannelChart"
import { CustomerIssues } from "@/components/dashboard/CustomerIssues"
import { RecentConversations } from "@/components/dashboard/RecentConversations"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { analytics } from "@/data/mockData"
import { cn } from "@/lib/utils"

export function Dashboard() {
  const m = analytics.metrics

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">
            Good evening, Pritam <span aria-hidden>👋</span>
          </h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Here's what's happening with your customer support today.
          </p>
        </div>
        <SelectMenu
          value="May 1, 2026 – May 31, 2026"
          options={[
            "May 1, 2026 – May 31, 2026",
            "Apr 1, 2026 – Apr 30, 2026",
            "Mar 1, 2026 – Mar 31, 2026",
            "Q1 2026 (Jan – Mar)",
          ]}
          onChange={() => undefined}
          icon={<CalendarDays className="size-4 text-[#64748b]" />}
          className="h-9.5 pr-3 pl-3.5 text-[13.5px]"
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left / primary column */}
        <div className="min-w-0 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              index={0}
              icon={MessagesSquare}
              title="Total Conversations"
              value={m.totalConversations.value}
              deltaPct={m.totalConversations.deltaPct}
              sparkline={m.totalConversations.sparkline}
              tone="blue"
            />
            <MetricCard
              index={1}
              icon={PhoneCall}
              title="AI Calls Handled"
              value={m.aiCallsHandled.value}
              deltaPct={m.aiCallsHandled.deltaPct}
              sparkline={m.aiCallsHandled.sparkline}
              tone="green"
            />
            <MetricCard
              index={2}
              icon={TicketCheck}
              title="Tickets Created"
              value={m.ticketsCreated.value}
              deltaPct={m.ticketsCreated.deltaPct}
              sparkline={m.ticketsCreated.sparkline}
              tone="purple"
            />
            <MetricCard
              index={3}
              icon={Target}
              title="Resolution Rate"
              value={m.resolutionRate.value}
              suffix="%"
              deltaPct={m.resolutionRate.deltaPct}
              sparkline={m.resolutionRate.sparkline}
              tone="orange"
            />
          </div>

          <ConversationChart index={1} />

          {/* Ticket status + issues */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TicketStatus index={2} />
            <CustomerIssues index={2} />
          </div>

          <RecentConversations index={3} />
        </div>

        {/* Right column */}
        <div className={cn("min-w-0 space-y-5")}>
          <AgentStatus index={0} />
          <ChannelChart index={1} />
          <QuickActions index={2} />
          <RecentActivity index={3} />
        </div>
      </div>
    </div>
  )
}
