import { analytics } from "@/data/mockData"
import { DonutPanel, Donut } from "./Donut"

export function ChannelChart({ index = 0 }: { index?: number }) {
  return (
    <DonutPanel title="Support Channels" index={index}>
      <Donut
        data={analytics.channels}
        total={analytics.channels.reduce((a, d) => a + d.value, 0)}
        centerLabel="Total"
      />
    </DonutPanel>
  )
}

export function TicketStatus({ index = 0 }: { index?: number }) {
  return (
    <DonutPanel title="Ticket Status" index={index}>
      <Donut
        data={analytics.ticketStatus}
        total={analytics.ticketStatus.reduce((a, d) => a + d.value, 0)}
        centerLabel="Tickets"
      />
    </DonutPanel>
  )
}
