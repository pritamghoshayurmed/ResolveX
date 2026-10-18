import type { ReactNode } from "react"
import { Code2, Database, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import type { IntegrationIconKey } from "@/data/integrationsDetail"

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[58%]" fill="none" aria-hidden>
      <path
        d="M12 3.4a8.6 8.6 0 0 0-7.4 13L3.3 20.7l4.4-1.2A8.6 8.6 0 1 0 12 3.4Z"
        fill="#fff"
      />
      <path
        d="M8.7 7.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.7c.1.2 1.9 2.9 4.6 3.9 2.2.8 2.7.7 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3l-1.7-.8c-.3-.1-.5-.1-.7.1l-.6.8c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5l-.6-1.6Z"
        fill="#25D366"
      />
    </svg>
  )
}

function GmailGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" fill="#fff" />
      <path
        d="M3.6 7.2 12 13.4l8.4-6.2"
        stroke="#EA4335"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.5 8.6 5.9 11v7.5H4a1.5 1.5 0 0 1-1.5-1.5V8.6Z" fill="#4285F4" />
      <path d="M21.5 8.6 18.1 11v7.5h1.4a1.5 1.5 0 0 0 1.5-1.5V8.6Z" fill="#34A853" />
      <path d="M2.5 18.5c0 .6.4 1 1 1h2.4v-1.5L2.5 15.4v3.1Z" fill="#FBBC04" />
    </svg>
  )
}

function DriveGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <path d="M8.2 3h7.6L22 15.6H14.4L8.2 3Z" fill="#ffc107" />
      <path d="M8.2 3 1 15.6 4.8 22l7.2-12.6L8.2 3Z" fill="#1e88e5" />
      <path d="M14.4 15.6H22l-3.8 6.4H10.6l3.8-6.4Z" fill="#4caf50" />
    </svg>
  )
}

function SlackGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <rect x="4.5" y="2.5" width="4" height="11" rx="2" fill="#36C5F0" />
      <rect x="10.5" y="8.5" width="11" height="4" rx="2" fill="#2EB67D" />
      <rect x="15.5" y="10.5" width="4" height="11" rx="2" fill="#ECB22E" />
      <rect x="2.5" y="15.5" width="11" height="4" rx="2" fill="#E01E5A" />
    </svg>
  )
}

function TeamsGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[72%]" fill="none" aria-hidden>
      <rect x="2" y="6" width="13" height="13" rx="3" fill="#5059C9" />
      <rect x="15.5" y="8.5" width="6.5" height="8" rx="2" fill="#7B83EB" />
      <path d="M5 9.5h7v2.2H9.6V17H7.4v-5.3H5V9.5Z" fill="#fff" />
    </svg>
  )
}

function ZendeskGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <path d="M11 4.5v15H1.5L11 4.5Z" fill="#03363D" />
      <path d="M13 19.5v-15h9.5L13 19.5Z" fill="#03363D" />
    </svg>
  )
}

function FreshdeskGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[74%]" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#25C16F" />
      <circle cx="12" cy="7.6" r="2.7" fill="#fff" />
      <circle cx="16.4" cy="14.4" r="2.7" fill="#fff" />
      <circle cx="7.6" cy="14.4" r="2.7" fill="#fff" />
    </svg>
  )
}

function HubspotGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <circle cx="14" cy="15" r="5.5" stroke="#FF7A59" strokeWidth="3" />
      <path
        d="m17.4 10.4 1.7-3.6"
        stroke="#FF7A59"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="17.4" y="3.2" width="4.4" height="4.4" rx="1.2" fill="#FF7A59" />
      <path d="M8.5 15H3.8" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function SalesforceGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[74%]" fill="none" aria-hidden>
      <path
        d="M6.6 18.2a4.1 4.1 0 0 1-.5-8.1 5.6 5.6 0 0 1 10.5-1.7 4.3 4.3 0 0 1 5.7 4 4.4 4.4 0 0 1-4.4 4.4L6.6 18.2Z"
        fill="#00A1E0"
      />
    </svg>
  )
}

function ShopifyGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[74%]" fill="none" aria-hidden>
      <path
        d="M7.4 6.8h9.2l1.1 11.6a1.5 1.5 0 0 1-1.5 1.7H7.8a1.5 1.5 0 0 1-1.5-1.7l1.1-11.6Z"
        fill="#95BF47"
      />
      <path
        d="M9.2 8V6.6a2.8 2.8 0 0 1 5.6 0V8"
        stroke="#5E8E3E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <text
        x="12"
        y="16.6"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill="#fff"
        fontFamily="inherit"
      >
        S
      </text>
    </svg>
  )
}

function IntercomGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <rect x="4.4" y="7" width="2.2" height="8.6" rx="1.1" fill="#fff" />
      <rect x="8.5" y="5.8" width="2.2" height="11.4" rx="1.1" fill="#fff" />
      <rect x="12.6" y="5.8" width="2.2" height="11.4" rx="1.1" fill="#fff" />
      <rect x="16.7" y="7" width="2.2" height="8.6" rx="1.1" fill="#fff" />
      <path
        d="M4.7 17.4c4.8 2.1 9.6 2.1 14.4 0"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DiscordGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[74%]" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="#5865F2" />
      <path
        d="M7.8 15.6c1.3 1.1 2.7 1.7 4.2 1.7s2.9-.6 4.2-1.7"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <ellipse cx="9.5" cy="12.4" rx="1.25" ry="1.6" fill="#fff" />
      <ellipse cx="14.5" cy="12.4" rx="1.25" ry="1.6" fill="#fff" />
    </svg>
  )
}

function TelegramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[70%]" fill="none" aria-hidden>
      <path
        d="M20.4 4.6 3.7 11.1c-.9.4-.9 1 0 1.3l4.2 1.4 1.6 4.8c.2.6.7.7 1.2.3l2.2-1.9 4.3 3.2c.6.4 1.3.1 1.4-.6l3-13.9c.2-.9-.4-1.4-1.2-1.1Z"
        fill="#fff"
      />
      <path
        d="m8.4 14.1 9.6-6.4-7.5 7.5-.3 3.4"
        stroke="#229ED9"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

const tiles: Record<
  IntegrationIconKey,
  { cls: string; render: () => ReactNode }
> = {
  website: {
    cls: "bg-[#eff6ff] text-[#2563eb]",
    render: () => <Globe className="size-5" strokeWidth={1.9} />,
  },
  whatsapp: {
    cls: "bg-[#25D366]",
    render: () => <WhatsAppGlyph />,
  },
  drive: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <DriveGlyph />,
  },
  notion: {
    cls: "bg-white ring-1 ring-[#e2e8f0] text-[#0f172a]",
    render: () => <span className="text-[16px] font-bold leading-none">N</span>,
  },
  gmail: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <GmailGlyph />,
  },
  postgres: {
    cls: "bg-[#eff6ff] text-[#336791]",
    render: () => <Database className="size-5" strokeWidth={1.9} />,
  },
  slack: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <SlackGlyph />,
  },
  teams: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <TeamsGlyph />,
  },
  zendesk: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <ZendeskGlyph />,
  },
  freshdesk: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <FreshdeskGlyph />,
  },
  hubspot: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <HubspotGlyph />,
  },
  salesforce: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <SalesforceGlyph />,
  },
  shopify: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <ShopifyGlyph />,
  },
  woocommerce: {
    cls: "bg-[#7F54B3] text-white",
    render: () => (
      <span className="text-[9.5px] font-bold tracking-tight">WOO</span>
    ),
  },
  intercom: {
    cls: "bg-[#111827]",
    render: () => <IntercomGlyph />,
  },
  discord: {
    cls: "bg-white ring-1 ring-[#e8ebf1]",
    render: () => <DiscordGlyph />,
  },
  telegram: {
    cls: "bg-[#229ED9]",
    render: () => <TelegramGlyph />,
  },
  api: {
    cls: "bg-[#eff6ff] text-[#2563eb]",
    render: () => <Code2 className="size-5" strokeWidth={1.9} />,
  },
}

export function IntegrationIcon({
  name,
  className,
}: {
  name: IntegrationIconKey
  className?: string
}) {
  const tile = tiles[name]
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-[11px]",
        tile.cls,
        className ?? "size-11",
      )}
      aria-hidden
    >
      {tile.render()}
    </span>
  )
}
