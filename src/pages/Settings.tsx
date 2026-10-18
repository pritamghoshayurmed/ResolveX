import { useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRightLeft,
  BarChart3,
  Bell,
  Bot,
  Bug,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Clock,
  Clock4,
  Copy,
  Crown,
  Download,
  Gauge,
  Globe,
  Headset,
  History,
  KeyRound,
  Languages as LanguagesIcon,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  MoreVertical,
  Palette,
  PanelTop,
  Paperclip,
  Plus,
  RotateCcw,
  Settings as Cog,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Trash2,
  Type,
  Upload,
  UsersRound,
  UserRoundCog,
  Webhook,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { Panel } from "@/components/ui/panel"
import { Badge } from "@/components/ui/badge"
import { SelectMenu } from "@/components/ui/select-menu"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import {
  accentColors,
  apiKeys as initialApiKeys,
  businessHours,
  dataRegions,
  dateFormats,
  defaultAgents,
  defaultChannels,
  densities,
  emailAlerts,
  fallbackActions,
  fontSizes,
  industries,
  inAppAlerts,
  languages,
  passwordLengths,
  planInfo,
  quickActions,
  quietHours,
  responseTones,
  retentionOptions,
  sessionTimeouts,
  settingsProfile,
  slackAlerts,
  agentModels,
  themeOptions,
  timeFormats,
  timezones,
  webhooks,
  type ApiKey,
} from "@/data/settingsDetail"
import { rolePermissions, teamMembers, type MemberRole } from "@/data/teamDetail"
import { cn } from "@/lib/utils"

type Section =
  | "general"
  | "organization"
  | "members"
  | "channels"
  | "agents"
  | "notifications"
  | "security"
  | "data"
  | "api"
  | "languages"
  | "appearance"
  | "advanced"

const navItems: {
  key: Section
  label: string
  sub: string
  icon: LucideIcon
  tile: string
}[] = [
  { key: "general", label: "General", sub: "Workspace and account details", icon: Cog, tile: "bg-[#eff6ff] text-[#2563eb]" },
  { key: "organization", label: "Organization", sub: "Company profile and branding", icon: Building2, tile: "bg-[#f3e8ff] text-[#9333ea]" },
  { key: "members", label: "Members & Permissions", sub: "Manage team access", icon: UsersRound, tile: "bg-[#fff7ed] text-[#ea580c]" },
  { key: "channels", label: "Channels", sub: "Chat, voice and other channels", icon: MessageCircle, tile: "bg-[#dcfce7] text-[#16a34a]" },
  { key: "agents", label: "AI Agent Settings", sub: "Default behaviour and model settings", icon: Bot, tile: "bg-[#dbeafe] text-[#2563eb]" },
  { key: "notifications", label: "Notifications", sub: "Email, in-app and Slack alerts", icon: Bell, tile: "bg-[#fef2f2] text-[#dc2626]" },
  { key: "security", label: "Security", sub: "Passwords, 2FA and audit logs", icon: ShieldCheck, tile: "bg-[#eff6ff] text-[#2563eb]" },
  { key: "data", label: "Data & Privacy", sub: "Data retention and export", icon: Shield, tile: "bg-[#f1f5f9] text-[#475569]" },
  { key: "api", label: "API Keys", sub: "Manage API keys and webhooks", icon: KeyRound, tile: "bg-[#faf5ff] text-[#7c3aed]" },
  { key: "languages", label: "Languages", sub: "Set default language and locale", icon: LanguagesIcon, tile: "bg-[#ccfbf1] text-[#0d9488]" },
  { key: "appearance", label: "Appearance", sub: "Theme, display and preferences", icon: Palette, tile: "bg-[#f3e8ff] text-[#9333ea]" },
  { key: "advanced", label: "Advanced", sub: "Developer and system settings", icon: SlidersHorizontal, tile: "bg-[#f1f5f9] text-[#475569]" },
]

const sectionMeta: Record<
  Section,
  { title: string; desc: string; action: "save" | "key" | "none" }
> = {
  general: { title: "General Settings", desc: "Update your workspace information and preferences.", action: "save" },
  organization: { title: "Organization Settings", desc: "Company profile, branding and legal details.", action: "save" },
  members: { title: "Members & Permissions", desc: "Manage team access, defaults and role permissions.", action: "save" },
  channels: { title: "Channel Settings", desc: "Configure chat, voice, email and messaging channels.", action: "save" },
  agents: { title: "AI Agent Settings", desc: "Control agent behaviour, models and human handoffs.", action: "save" },
  notifications: { title: "Notification Settings", desc: "Choose what you get notified about and where.", action: "save" },
  security: { title: "Security Settings", desc: "Password policy, two-factor authentication and sessions.", action: "save" },
  data: { title: "Data & Privacy", desc: "Retention, residency and data export options.", action: "save" },
  api: { title: "API Keys & Webhooks", desc: "Manage API keys and webhook endpoints.", action: "key" },
  languages: { title: "Language Settings", desc: "Default language, locale and translation.", action: "save" },
  appearance: { title: "Appearance", desc: "Theme, accent color and display preferences.", action: "none" },
  advanced: { title: "Advanced Settings", desc: "Developer and system-level options.", action: "none" },
}

const initialForm: Record<string, string> = {
  workspaceName: "Woodmaster CNC",
  workspaceUrl: "woodmastercnc.resolvex.com",
  description:
    "CNC machine manufacturer and service provider. We use Resolve X to manage customer support, enquiries and service requests.",
  industry: "Manufacturing",
  primaryEmail: "support@woodmastercnc.com",
  contactNumber: "+91 98765 43210",
  website: "https://woodmastercnc.com",
  address: "Bhandarhati, Arambagh\nHooghly, West Bengal - 712601\nIndia",
  defaultChannel: "Website Chat",
  defaultAgent: "Chatbot Agent",
  timezone: "(GMT+05:30) Kolkata, India",
  dateFormat: "May 1, 2026 (MM DD, YYYY)",
  timeFormat: "12-hour (AM/PM)",
  legalName: "Woodmaster CNC Industries Pvt. Ltd.",
  taxId: "19AACCD1234F1Z5",
  companySize: "11 - 50 employees",
  foundedYear: "2015",
  linkedin: "linkedin.com/company/woodmaster-cnc",
  twitter: "x.com/woodmastercnc",
  defaultRole: "Support Agent",
  businessHours: "24 / 7",
  outsideHours: "AI answers 24/7",
  agentModel: "GPT-4o (recommended)",
  responseTone: "Professional",
  fallbackAction: "Create a ticket",
  replyLength: "Standard",
  notifyEmail: "pritam@woodmastercnc.com",
  quietHours: "Off",
  sessionTimeout: "1 hour",
  passwordLength: "12 characters",
  ipAllowlist: "203.0.113.0/24\n198.51.100.14",
  conversationRetention: "90 days",
  ticketRetention: "2 years",
  dataRegion: "Mumbai (ap-south-2)",
  defaultLanguage: "English (US)",
  fallbackLanguage: "English (US)",
  density: "Comfortable",
  fontSize: "Default",
  apiBaseUrl: "https://api.resolvex.com/v1",
  webhookRetryPolicy: "5 retries (exponential)",
}

const initialSwitches: Record<string, boolean> = {
  requireApproval: true,
  autoAssign: true,
  canExportData: false,
  wsChat: true,
  whatsappCh: false,
  voiceCh: true,
  emailCh: true,
  agentTickets: true,
  agentEscalate: true,
  agentDisclaimer: false,
  ...Object.fromEntries(emailAlerts.map((r) => [r.id, r.value])),
  ...Object.fromEntries(inAppAlerts.map((r) => [r.id, r.value])),
  ...Object.fromEntries(slackAlerts.map((r) => [r.id, r.value])),
  require2fa: true,
  specialChars: true,
  blockCommon: true,
  auditLog: true,
  autoDelete: true,
  includeAttachments: true,
  euResidency: false,
  autoTranslate: true,
  translateReplies: true,
  reduceMotion: false,
  webhookRetry: true,
  debugLog: false,
  betaFeatures: false,
}

const roleIcons: Record<MemberRole, { Icon: LucideIcon; cls: string }> = {
  Owner: { Icon: Crown, cls: "bg-[#faf5ff] text-[#9333ea]" },
  Admin: { Icon: Crown, cls: "bg-[#fff7ed] text-[#c2410c]" },
  "Team Lead": { Icon: UserRoundCog, cls: "bg-[#fff7ed] text-[#ea580c]" },
  "Support Agent": { Icon: Headset, cls: "bg-[#dbeafe] text-[#2563eb]" },
  Analyst: { Icon: BarChart3, cls: "bg-[#ecfdf5] text-[#059669]" },
  Viewer: { Icon: History, cls: "bg-[#f1f5f9] text-[#64748b]" },
}

const inputCls =
  "h-10 w-full rounded-[10px] border border-[#e8ebf1] bg-white px-3 text-[13px] text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#c7d7f5] focus:ring-2 focus:ring-[#2563eb]/15"

const textareaCls =
  "w-full rounded-[10px] border border-[#e8ebf1] bg-white px-3 py-2.5 text-[13px] leading-relaxed text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#c7d7f5] focus:ring-2 focus:ring-[#2563eb]/15"

/* --------------------------------- page ---------------------------------- */

export function Settings() {
  const [section, setSection] = useState<Section>("general")
  const [form, setForm] = useState<Record<string, string>>(initialForm)
  const [switches, setSwitches] = useState<Record<string, boolean>>(initialSwitches)
  const [savedSection, setSavedSection] = useState<Section | null>(null)
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState("light")
  const [accent, setAccent] = useState("blue")
  const [keys, setKeys] = useState<ApiKey[]>(initialApiKeys)

  const meta = sectionMeta[section]

  const set = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }))
  const setSw = (k: string, v: boolean) => setSwitches((prev) => ({ ...prev, [k]: v }))

  const save = (s: Section) => {
    setSavedSection(s)
    window.setTimeout(() => setSavedSection((cur) => (cur === s ? null : cur)), 1800)
  }

  const copyUrl = () => {
    try {
      void navigator.clipboard?.writeText(form.workspaceUrl)
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const copyKey = (value: string) => {
    try {
      void navigator.clipboard?.writeText(value)
    } catch {
      /* clipboard unavailable */
    }
  }

  const generateKey = () => {
    const rand = () => Math.random().toString(16).slice(2, 6)
    setKeys((prev) => [
      {
        id: `key-${prev.length + 1}-${Date.now()}`,
        name: "New API Key",
        masked: `rx_live_${rand()}••••••••${rand()}`,
        created: "Just now",
        lastUsed: "Never",
        status: "Active",
      },
      ...prev,
    ])
    save("api")
  }

  const revokeKey = (id: string) =>
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "Revoked" as const } : k)),
    )

  const rotateKey = (id: string) => {
    const rand = () => Math.random().toString(16).slice(2, 6)
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id
          ? { ...k, masked: `rx_live_${rand()}••••••••${rand()}`, lastUsed: "Never", status: "Active" as const }
          : k,
      ),
    )
  }

  const sw = (k: string, label: string) => (
    <Switch
      checked={!!switches[k]}
      onCheckedChange={(v) => setSw(k, v)}
      ariaLabel={label}
    />
  )

  const roleCount = (role: MemberRole) => teamMembers.filter((m) => m.role === role).length

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="pb-5">
        <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">Settings</h1>
        <p className="mt-1 text-[14px] text-[#64748b]">
          Manage your account settings, preferences, and organization details.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_345px]">
        {/* Settings nav */}
        <nav aria-label="Settings sections" className="lg:sticky lg:top-6">
          <Panel className="space-y-0.5 p-2.5">
            {navItems.map((item) => {
              const active = section === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setSection(item.key)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[12px] border px-2.5 py-2 text-left transition-colors",
                    active
                      ? "border-[#dbeafe] bg-[#eff6ff]"
                      : "border-transparent hover:bg-[#f8fafc]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-[9px]",
                      item.tile,
                    )}
                  >
                    <item.icon className="size-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate text-[13px] font-semibold",
                        active ? "text-[#2563eb]" : "text-[#0f172a]",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="block truncate text-[11px] text-[#94a3b8]">{item.sub}</span>
                  </span>
                </button>
              )
            })}
          </Panel>
        </nav>

        {/* Center content */}
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.21, 0.5, 0.4, 1] }}
          className="min-w-0"
        >
          <Panel className="overflow-hidden">
            {/* Panel header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8ebf1] px-6 py-5">
              <div>
                <h2 className="text-[18px] font-bold tracking-[-0.01em] text-[#0f172a]">
                  {meta.title}
                </h2>
                <p className="mt-1 text-[13px] text-[#64748b]">{meta.desc}</p>
              </div>
              {meta.action === "save" && (
                <button
                  onClick={() => save(section)}
                  className={cn(
                    "inline-flex h-9.5 items-center gap-2 rounded-lg px-4 text-[13.5px] font-medium transition-colors",
                    savedSection === section
                      ? "border border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a]"
                      : "bg-[#2563eb] text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] hover:bg-[#1d4ed8]",
                  )}
                >
                  {savedSection === section ? (
                    <>
                      <Check className="size-4" strokeWidth={2.4} />
                      Saved
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              )}
              {meta.action === "key" && (
                <button
                  onClick={generateKey}
                  className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#2563eb] px-4 text-[13.5px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1d4ed8]"
                >
                  <Plus className="size-4" strokeWidth={2.2} />
                  Generate New Key
                </button>
              )}
            </div>

            {/* ---------------------------- GENERAL ---------------------------- */}
            {section === "general" && (
              <>
                <SectionBlock title="Workspace Information">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Workspace Name">
                      <input
                        className={inputCls}
                        value={form.workspaceName}
                        onChange={(e) => set("workspaceName", e.target.value)}
                      />
                    </Field>
                    <Field label="Workspace URL">
                      <div className="relative">
                        <input
                          className={cn(inputCls, "pr-10")}
                          value={form.workspaceUrl}
                          onChange={(e) => set("workspaceUrl", e.target.value)}
                        />
                        <button
                          onClick={copyUrl}
                          aria-label="Copy workspace URL"
                          className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569]"
                        >
                          {copied ? (
                            <Check className="size-4 text-[#16a34a]" strokeWidth={2.4} />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </button>
                      </div>
                    </Field>
                    <Field label="Workspace Logo">
                      <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#4f46e5] to-[#2563eb] text-[17px] font-bold text-white shadow-[0_4px_12px_-4px_rgba(37,99,235,0.5)]">
                          W
                        </span>
                        <div>
                          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                            <Upload className="size-3.5 text-[#64748b]" />
                            Change Logo
                          </button>
                          <p className="mt-1.5 text-[11.5px] text-[#94a3b8]">
                            JPG, PNG or SVG. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </Field>
                    <Field label="Industry">
                      <SelectMenu
                        value={form.industry}
                        options={industries}
                        onChange={(v) => set("industry", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                    <Field
                      label="Description"
                      className="sm:col-span-2"
                    >
                      <div className="relative">
                        <textarea
                          rows={4}
                          maxLength={500}
                          value={form.description}
                          onChange={(e) => set("description", e.target.value)}
                          className={cn(textareaCls, "min-h-[110px] resize-none pr-16")}
                        />
                        <span className="pointer-events-none absolute bottom-2.5 right-3 text-[11px] font-medium text-[#94a3b8]">
                          {form.description.length}/500
                        </span>
                      </div>
                    </Field>
                  </div>
                </SectionBlock>

                <SectionBlock title="Contact Information">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Primary Email">
                      <input
                        className={inputCls}
                        value={form.primaryEmail}
                        onChange={(e) => set("primaryEmail", e.target.value)}
                      />
                    </Field>
                    <Field label="Contact Number">
                      <input
                        className={inputCls}
                        value={form.contactNumber}
                        onChange={(e) => set("contactNumber", e.target.value)}
                      />
                    </Field>
                    <Field label="Website">
                      <input
                        className={inputCls}
                        value={form.website}
                        onChange={(e) => set("website", e.target.value)}
                      />
                    </Field>
                    <Field label="Address">
                      <textarea
                        rows={4}
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        className={cn(textareaCls, "min-h-[110px] resize-none")}
                      />
                    </Field>
                  </div>
                </SectionBlock>

                <SectionBlock title="Preferences">
                  <div className="space-y-1">
                    <SettingRow
                      icon={MessageCircle}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Default Channel"
                      sub="Channel to open when a new conversation starts"
                    >
                      <SelectMenu
                        value={form.defaultChannel}
                        options={defaultChannels}
                        onChange={(v) => set("defaultChannel", v)}
                        className="h-9 w-[240px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={ClipboardList}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Default AI Agent"
                      sub="AI agent to assign for new conversations"
                    >
                      <SelectMenu
                        value={form.defaultAgent}
                        options={defaultAgents}
                        onChange={(v) => set("defaultAgent", v)}
                        className="h-9 w-[240px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Clock}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Timezone"
                      sub="Used for reports and notifications"
                    >
                      <SelectMenu
                        value={form.timezone}
                        options={timezones}
                        onChange={(v) => set("timezone", v)}
                        className="h-9 w-[240px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Calendar}
                      iconCls="bg-[#ecfdf5] text-[#059669]"
                      title="Date Format"
                      sub="Select your preferred date format"
                    >
                      <SelectMenu
                        value={form.dateFormat}
                        options={dateFormats}
                        onChange={(v) => set("dateFormat", v)}
                        className="h-9 w-[240px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Clock4}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Time Format"
                      sub="Select your preferred time format"
                    >
                      <SelectMenu
                        value={form.timeFormat}
                        options={timeFormats}
                        onChange={(v) => set("timeFormat", v)}
                        className="h-9 w-[240px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* -------------------------- ORGANIZATION -------------------------- */}
            {section === "organization" && (
              <>
                <SectionBlock title="Company Profile">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Legal Company Name">
                      <input
                        className={inputCls}
                        value={form.legalName}
                        onChange={(e) => set("legalName", e.target.value)}
                      />
                    </Field>
                    <Field label="Registration / GSTIN">
                      <input
                        className={inputCls}
                        value={form.taxId}
                        onChange={(e) => set("taxId", e.target.value)}
                      />
                    </Field>
                    <Field label="Company Size">
                      <SelectMenu
                        value={form.companySize}
                        options={[
                          "1 - 10 employees",
                          "11 - 50 employees",
                          "51 - 200 employees",
                          "201 - 500 employees",
                          "500+ employees",
                        ]}
                        onChange={(v) => set("companySize", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                    <Field label="Founded Year">
                      <input
                        className={inputCls}
                        value={form.foundedYear}
                        onChange={(e) => set("foundedYear", e.target.value)}
                      />
                    </Field>
                    <Field label="Headquarters">
                      <input
                        className={inputCls}
                        value={form.address.split("\n")[0]}
                        onChange={(e) => set("address", e.target.value)}
                      />
                    </Field>
                    <Field label="Industry">
                      <SelectMenu
                        value={form.industry}
                        options={industries}
                        onChange={(v) => set("industry", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                </SectionBlock>

                <SectionBlock title="Branding">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex size-14 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4f46e5] to-[#2563eb] text-[20px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.5)]">
                      W
                    </span>
                    <div>
                      <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                        <Upload className="size-3.5 text-[#64748b]" />
                        Change Logo
                      </button>
                      <p className="mt-1.5 text-[11.5px] text-[#94a3b8]">
                        JPG, PNG or SVG. Max size 2MB.
                      </p>
                    </div>
                    <div className="ml-auto">
                      <p className="mb-2 text-[12.5px] font-medium text-[#334155]">Brand Color</p>
                      <div className="flex items-center gap-2">
                        {accentColors.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setAccent(c.id)}
                            aria-label={`Brand color ${c.id}`}
                            className={cn(
                              "size-7 rounded-full transition-transform hover:scale-110",
                              accent === c.id &&
                                "ring-2 ring-[#0f172a] ring-offset-2 ring-offset-white",
                            )}
                            style={{ backgroundColor: c.value }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="LinkedIn URL">
                      <input
                        className={inputCls}
                        value={form.linkedin}
                        onChange={(e) => set("linkedin", e.target.value)}
                      />
                    </Field>
                    <Field label="X (Twitter) URL">
                      <input
                        className={inputCls}
                        value={form.twitter}
                        onChange={(e) => set("twitter", e.target.value)}
                      />
                    </Field>
                  </div>
                </SectionBlock>

                <SectionBlock title="Support Hours">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Business Hours">
                      <SelectMenu
                        value={form.businessHours}
                        options={businessHours}
                        onChange={(v) => set("businessHours", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                    <Field label="Timezone">
                      <SelectMenu
                        value={form.timezone}
                        options={timezones}
                        onChange={(v) => set("timezone", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- MEMBERS --------------------------- */}
            {section === "members" && (
              <>
                <SectionBlock title="Access Defaults">
                  <div className="space-y-1">
                    <SettingRow
                      icon={UsersRound}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Default role for new members"
                      sub="Applied when a member joins the workspace"
                    >
                      <SelectMenu
                        value={form.defaultRole}
                        options={["Support Agent", "Viewer", "Team Lead", "Analyst"]}
                        onChange={(v) => set("defaultRole", v)}
                        className="h-9 w-[200px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={ShieldCheck}
                      iconCls="bg-[#ecfdf5] text-[#059669]"
                      title="Require admin approval"
                      sub="New invites must be approved before joining"
                    >
                      {sw("requireApproval", "Require admin approval")}
                    </SettingRow>
                    <SettingRow
                      icon={ArrowRightLeft}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Auto-assign new conversations"
                      sub="Route new conversations to available agents automatically"
                    >
                      {sw("autoAssign", "Auto-assign new conversations")}
                    </SettingRow>
                    <SettingRow
                      icon={Download}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Allow members to export data"
                      sub="Members can export conversations and reports as CSV"
                    >
                      {sw("canExportData", "Allow members to export data")}
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Role Summary" sub="Current roles and what they can access">
                  <div className="space-y-1">
                    {rolePermissions.map((r) => {
                      const t = roleIcons[r.role]
                      return (
                        <div
                          key={r.id}
                          className="flex items-start gap-3 rounded-[10px] px-1.5 py-2.5 transition-colors hover:bg-[#f8fafc]"
                        >
                          <span
                            className={cn(
                              "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
                              t.cls,
                            )}
                          >
                            <t.Icon className="size-4.5" strokeWidth={2} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[13.5px] font-semibold text-[#0f172a]">
                                {r.role}
                              </span>
                              <Badge tone="gray">
                                {roleCount(r.role)} {roleCount(r.role) === 1 ? "member" : "members"}
                              </Badge>
                            </span>
                            <span className="mt-0.5 block text-[12px] text-[#94a3b8]">
                              {r.description}
                            </span>
                            <span className="mt-2 flex flex-wrap gap-1.5">
                              {r.permissions.map((p) => (
                                <span
                                  key={p}
                                  className="rounded-full bg-[#f8fafc] px-2 py-0.5 text-[11px] font-medium text-[#475569] ring-1 ring-[#e8ebf1]"
                                >
                                  {p}
                                </span>
                              ))}
                            </span>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- CHANNELS --------------------------- */}
            {section === "channels" && (
              <>
                <SectionBlock title="Connected Channels">
                  <div className="space-y-1">
                    <SettingRow
                      icon={PanelTop}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Website Chat"
                      sub="Embed chat widget on your website"
                    >
                      <span className="flex items-center gap-3">
                        <Badge tone="green" dot>
                          Enabled
                        </Badge>
                        {sw("wsChat", "Website Chat")}
                      </span>
                    </SettingRow>
                    <SettingRow
                      icon={Smartphone}
                      iconCls="bg-[#dcfce7] text-[#16a34a]"
                      title="WhatsApp"
                      sub="Handle customer queries on WhatsApp"
                    >
                      <span className="flex items-center gap-3">
                        <Badge tone={switches.whatsappCh ? "green" : "gray"} dot>
                          {switches.whatsappCh ? "Connected" : "Not connected"}
                        </Badge>
                        {sw("whatsappCh", "WhatsApp")}
                      </span>
                    </SettingRow>
                    <SettingRow
                      icon={Headset}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Voice AI"
                      sub="AI voice agent for inbound support calls"
                    >
                      <span className="flex items-center gap-3">
                        <Badge tone="green" dot>
                          Enabled
                        </Badge>
                        {sw("voiceCh", "Voice AI")}
                      </span>
                    </SettingRow>
                    <SettingRow
                      icon={Mail}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Email Forwarding"
                      sub="Forward support@woodmastercnc.com emails to tickets"
                    >
                      <span className="flex items-center gap-3">
                        <Badge tone="green" dot>
                          Enabled
                        </Badge>
                        {sw("emailCh", "Email Forwarding")}
                      </span>
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Business Hours">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Business Hours">
                      <SelectMenu
                        value={form.businessHours}
                        options={businessHours}
                        onChange={(v) => set("businessHours", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                    <Field label="Outside Business Hours">
                      <SelectMenu
                        value={form.outsideHours}
                        options={["AI answers 24/7", "Create a ticket", "Close channels"]}
                        onChange={(v) => set("outsideHours", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* ---------------------------- AGENTS ---------------------------- */}
            {section === "agents" && (
              <>
                <SectionBlock title="Behaviour">
                  <div className="space-y-1">
                    <SettingRow
                      icon={Bot}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Default AI Agent"
                      sub="Agent assigned to new conversations"
                    >
                      <SelectMenu
                        value={form.defaultAgent}
                        options={defaultAgents}
                        onChange={(v) => set("defaultAgent", v)}
                        className="h-9 w-[220px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={SlidersHorizontal}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Agent Model"
                      sub="Model used for generating replies"
                    >
                      <SelectMenu
                        value={form.agentModel}
                        options={agentModels}
                        onChange={(v) => set("agentModel", v)}
                        className="h-9 w-[220px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={MessageCircle}
                      iconCls="bg-[#ecfdf5] text-[#059669]"
                      title="Response Tone"
                      sub="How the agent phrases its replies"
                    >
                      <SelectMenu
                        value={form.responseTone}
                        options={responseTones}
                        onChange={(v) => set("responseTone", v)}
                        className="h-9 w-[220px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={ClipboardList}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Max Reply Length"
                      sub="Default length of an agent reply"
                    >
                      <SelectMenu
                        value={form.replyLength}
                        options={["Short", "Standard", "Detailed"]}
                        onChange={(v) => set("replyLength", v)}
                        className="h-9 w-[220px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={ArrowRightLeft}
                      iconCls="bg-[#e0e7ff] text-[#4f46e5]"
                      title="Fallback When Unsure"
                      sub="Action when the agent cannot answer confidently"
                    >
                      <SelectMenu
                        value={form.fallbackAction}
                        options={fallbackActions}
                        onChange={(v) => set("fallbackAction", v)}
                        className="h-9 w-[220px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Guardrails">
                  <div className="space-y-1">
                    <SettingRow
                      icon={Plus}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Create tickets automatically"
                      sub="Turn unresolved conversations into tickets"
                    >
                      {sw("agentTickets", "Create tickets automatically")}
                    </SettingRow>
                    <SettingRow
                      icon={Shield}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Escalate on negative sentiment"
                      sub="Hand the conversation to a human agent when frustrated"
                    >
                      {sw("agentEscalate", "Escalate on negative sentiment")}
                    </SettingRow>
                    <SettingRow
                      icon={Bot}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Show AI disclaimer"
                      sub="Display 'AI-generated reply' under agent messages"
                    >
                      {sw("agentDisclaimer", "Show AI disclaimer")}
                    </SettingRow>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* ------------------------- NOTIFICATIONS ------------------------- */}
            {section === "notifications" && (
              <>
                <SectionBlock title="Email Alerts">
                  <div className="space-y-1">
                    {emailAlerts.map((r) => (
                      <SettingRow
                        key={r.id}
                        icon={Mail}
                        iconCls="bg-[#dbeafe] text-[#2563eb]"
                        title={r.title}
                        sub={r.sub}
                      >
                        {sw(r.id, r.title)}
                      </SettingRow>
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock title="In-App Alerts">
                  <div className="space-y-1">
                    {inAppAlerts.map((r) => (
                      <SettingRow
                        key={r.id}
                        icon={Bell}
                        iconCls="bg-[#fff7ed] text-[#ea580c]"
                        title={r.title}
                        sub={r.sub}
                      >
                        {sw(r.id, r.title)}
                      </SettingRow>
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock title="Slack Integration">
                  <div className="space-y-1">
                    <SettingRow
                      icon={MessageCircle}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Connected workspace"
                      sub="woodmastercnc.slack.com"
                    >
                      <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                        Reconnect
                      </button>
                    </SettingRow>
                    {slackAlerts.map((r) => (
                      <SettingRow
                        key={r.id}
                        icon={Zap}
                        iconCls="bg-[#ecfdf5] text-[#059669]"
                        title={r.title}
                        sub={r.sub}
                      >
                        {sw(r.id, r.title)}
                      </SettingRow>
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock title="Delivery">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Notification Email">
                      <input
                        className={inputCls}
                        value={form.notifyEmail}
                        onChange={(e) => set("notifyEmail", e.target.value)}
                      />
                    </Field>
                    <Field label="Quiet Hours">
                      <SelectMenu
                        value={form.quietHours}
                        options={quietHours}
                        onChange={(v) => set("quietHours", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- SECURITY --------------------------- */}
            {section === "security" && (
              <>
                <SectionBlock title="Password Policy">
                  <div className="space-y-1">
                    <SettingRow
                      icon={Lock}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Minimum password length"
                      sub="Applies to all workspace members"
                    >
                      <SelectMenu
                        value={form.passwordLength}
                        options={passwordLengths}
                        onChange={(v) => set("passwordLength", v)}
                        className="h-9 w-[190px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={ShieldCheck}
                      iconCls="bg-[#ecfdf5] text-[#059669]"
                      title="Require special characters"
                      sub="Must include at least one symbol"
                    >
                      {sw("specialChars", "Require special characters")}
                    </SettingRow>
                    <SettingRow
                      icon={Shield}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Block common passwords"
                      sub="Reject passwords found in breach databases"
                    >
                      {sw("blockCommon", "Block common passwords")}
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Two-Factor Authentication">
                  <div className="space-y-1">
                    <SettingRow
                      icon={ShieldCheck}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Require 2FA for admins"
                      sub="Admins and owners must enable two-factor authentication"
                    >
                      {sw("require2fa", "Require 2FA for admins")}
                    </SettingRow>
                    <SettingRow
                      icon={Clock}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Auto sign-out after"
                      sub="Session timeout for inactive members"
                    >
                      <SelectMenu
                        value={form.sessionTimeout}
                        options={sessionTimeouts}
                        onChange={(v) => set("sessionTimeout", v)}
                        className="h-9 w-[190px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={LogOut}
                      iconCls="bg-[#fef2f2] text-[#dc2626]"
                      title="Active sessions"
                      sub="You are signed in on 2 devices"
                    >
                      <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12.5px] font-medium text-[#dc2626] transition-colors hover:bg-[#fef2f2]">
                        Sign out all devices
                      </button>
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Access Control">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="IP Allowlist"
                      hint="One IP or CIDR range per line. Leave empty to allow all."
                      className="sm:col-span-2"
                    >
                      <textarea
                        rows={4}
                        value={form.ipAllowlist}
                        onChange={(e) => set("ipAllowlist", e.target.value)}
                        className={cn(textareaCls, "min-h-[96px] resize-none font-mono text-[12.5px]")}
                      />
                    </Field>
                  </div>
                  <div className="space-y-1">
                    <SettingRow
                      icon={History}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Audit logging"
                      sub="Record all admin actions for security review"
                    >
                      {sw("auditLog", "Audit logging")}
                    </SettingRow>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- DATA --------------------------- */}
            {section === "data" && (
              <>
                <SectionBlock title="Data Retention">
                  <div className="space-y-1">
                    <SettingRow
                      icon={Clock}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Conversation retention"
                      sub="Conversations are deleted after this period"
                    >
                      <SelectMenu
                        value={form.conversationRetention}
                        options={retentionOptions}
                        onChange={(v) => set("conversationRetention", v)}
                        className="h-9 w-[190px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Clock4}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Ticket retention"
                      sub="Tickets are deleted after this period"
                    >
                      <SelectMenu
                        value={form.ticketRetention}
                        options={retentionOptions}
                        onChange={(v) => set("ticketRetention", v)}
                        className="h-9 w-[190px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Trash2}
                      iconCls="bg-[#fef2f2] text-[#dc2626]"
                      title="Auto-delete expired data"
                      sub="Permanently remove data once it expires"
                    >
                      {sw("autoDelete", "Auto-delete expired data")}
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Location & Export">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Data Region">
                      <SelectMenu
                        value={form.dataRegion}
                        options={dataRegions}
                        onChange={(v) => set("dataRegion", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                  <div className="mt-3 space-y-1">
                    <SettingRow
                      icon={Shield}
                      iconCls="bg-[#ecfdf5] text-[#059669]"
                      title="EU data residency"
                      sub="Keep all customer data inside the EU region"
                    >
                      {sw("euResidency", "EU data residency")}
                    </SettingRow>
                    <SettingRow
                      icon={Paperclip}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Include attachments in exports"
                      sub="Export files and images with your data"
                    >
                      {sw("includeAttachments", "Include attachments in exports")}
                    </SettingRow>
                    <SettingRow
                      icon={Download}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Export workspace data"
                      sub="Download conversations, tickets and contacts as a ZIP"
                    >
                      <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                        <Download className="size-3.5 text-[#64748b]" />
                        Export Now
                      </button>
                    </SettingRow>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- API KEYS --------------------------- */}
            {section === "api" && (
              <>
                <SectionBlock title="API Keys" sub="Use keys to authenticate server-side requests">
                  <div className="space-y-2">
                    {keys.map((k) => (
                      <div
                        key={k.id}
                        className="flex flex-wrap items-center gap-3 rounded-[12px] border border-[#e8ebf1] bg-[#fbfcfe] px-4 py-3"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#faf5ff] text-[#7c3aed]">
                          <KeyRound className="size-4" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
                            {k.name}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[11.5px] text-[#64748b]">
                            {k.masked}
                          </span>
                        </span>
                        <span className="hidden text-[11.5px] text-[#94a3b8] sm:block">
                          Created {k.created}
                        </span>
                        <span className="hidden text-[11.5px] text-[#94a3b8] md:block">
                          Used {k.lastUsed}
                        </span>
                        <Badge tone={k.status === "Active" ? "green" : "red"} dot>
                          {k.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            aria-label={`Actions for ${k.name}`}
                            className="flex size-7 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
                          >
                            <MoreVertical className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => copyKey(k.masked)}>
                              Copy key
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => rotateKey(k.id)}>
                              Rotate key
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => revokeKey(k.id)}
                              className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]"
                            >
                              Revoke key
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock title="Webhooks" sub="Send events to your endpoints in real time">
                  <div className="space-y-2">
                    {webhooks.map((wh) => (
                      <div
                        key={wh.id}
                        className="flex flex-wrap items-center gap-3 rounded-[12px] border border-[#e8ebf1] bg-[#fbfcfe] px-4 py-3"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#eff6ff] text-[#2563eb]">
                          <Webhook className="size-4" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-mono text-[12.5px] font-semibold text-[#0f172a]">
                            {wh.url}
                          </span>
                          <span className="mt-0.5 block truncate text-[11.5px] text-[#94a3b8]">
                            {wh.events}
                          </span>
                        </span>
                        <Badge tone={wh.status === "Healthy" ? "green" : "red"} dot>
                          {wh.status}
                        </Badge>
                        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                          <Zap className="size-3.5 text-[#64748b]" />
                          Test
                        </button>
                        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
                          <Plus className="size-3.5 text-[#64748b]" />
                          Add Endpoint
                        </button>
                      </div>
                    ))}
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- LANGUAGES --------------------------- */}
            {section === "languages" && (
              <>
                <SectionBlock title="Workspace Language">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Default Language">
                      <SelectMenu
                        value={form.defaultLanguage}
                        options={languages}
                        onChange={(v) => set("defaultLanguage", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                    <Field label="Fallback Language">
                      <SelectMenu
                        value={form.fallbackLanguage}
                        options={languages}
                        onChange={(v) => set("fallbackLanguage", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                  <div className="mt-3 space-y-1">
                    <SettingRow
                      icon={LanguagesIcon}
                      iconCls="bg-[#ccfbf1] text-[#0d9488]"
                      title="Auto-translate conversations"
                      sub="Detect customer language and translate messages"
                    >
                      {sw("autoTranslate", "Auto-translate conversations")}
                    </SettingRow>
                    <SettingRow
                      icon={Bot}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Translate AI replies"
                      sub="Send AI agent replies in the customer's language"
                    >
                      {sw("translateReplies", "Translate AI replies")}
                    </SettingRow>
                    <SettingRow
                      icon={Globe}
                      iconCls="bg-[#eff6ff] text-[#2563eb]"
                      title="Locale formats"
                      sub="Date and number formats follow General settings"
                    >
                      <SelectMenu
                        value={`${form.defaultLanguage} locale`}
                        options={["Default locale", `${form.defaultLanguage} locale`]}
                        onChange={() => undefined}
                        className="h-9 w-[210px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- APPEARANCE --------------------------- */}
            {section === "appearance" && (
              <>
                <SectionBlock title="Theme">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {themeOptions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        aria-pressed={theme === t.id}
                        className={cn(
                          "rounded-[14px] border p-3 text-left transition-all hover:shadow-[0_8px_20px_-10px_rgba(15,23,42,0.18)]",
                          theme === t.id
                            ? "border-[#2563eb] ring-2 ring-[#2563eb]/20"
                            : "border-[#e8ebf1] bg-white",
                        )}
                      >
                        <span
                          className={cn(
                            "block h-20 w-full overflow-hidden rounded-[9px] border",
                            t.id === "light" && "border-[#e8ebf1] bg-white",
                            t.id === "dark" && "border-[#1e293b] bg-[#0f172a]",
                            t.id === "system" && "border-[#e8ebf1] bg-[linear-gradient(to_right,#fff_50%,#0f172a_50%)]",
                          )}
                        >
                          <span className="flex h-full flex-col gap-1.5 p-2">
                            <span
                              className={cn(
                                "h-2 w-1/2 rounded-full",
                                t.id === "dark" ? "bg-[#334155]" : "bg-[#e2e8f0]",
                                t.id === "system" && "bg-[#e2e8f0]",
                              )}
                            />
                            <span
                              className={cn(
                                "h-2 w-3/4 rounded-full",
                                t.id === "dark" ? "bg-[#1e293b]" : "bg-[#f1f5f9]",
                                t.id === "system" && "bg-[#f1f5f9]",
                              )}
                            />
                            <span
                              className={cn(
                                "mt-auto h-4 w-full rounded-md",
                                t.id === "dark" ? "bg-[#2563eb]" : "bg-[#dbeafe]",
                                t.id === "system" && "bg-[#dbeafe]",
                              )}
                            />
                          </span>
                        </span>
                        <span className="mt-2.5 block text-[13px] font-semibold text-[#0f172a]">
                          {t.label}
                        </span>
                        <span className="block text-[11.5px] text-[#94a3b8]">{t.sub}</span>
                      </button>
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock title="Accent Color">
                  <div className="flex flex-wrap items-center gap-3">
                    {accentColors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setAccent(c.id)}
                        aria-label={`Accent ${c.id}`}
                        aria-pressed={accent === c.id}
                        className={cn(
                          "size-9 rounded-full transition-transform hover:scale-110",
                          accent === c.id && "ring-2 ring-[#0f172a] ring-offset-2 ring-offset-white",
                        )}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock title="Display">
                  <div className="space-y-1">
                    <SettingRow
                      icon={Gauge}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Density"
                      sub="Spacing used across tables and lists"
                    >
                      <SelectMenu
                        value={form.density}
                        options={densities}
                        onChange={(v) => set("density", v)}
                        className="h-9 w-[190px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Type}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Font size"
                      sub="Base text size across the app"
                    >
                      <SelectMenu
                        value={form.fontSize}
                        options={fontSizes}
                        onChange={(v) => set("fontSize", v)}
                        className="h-9 w-[190px] justify-between text-[12.5px]"
                      />
                    </SettingRow>
                    <SettingRow
                      icon={Sparkles}
                      iconCls="bg-[#ecfdf5] text-[#059669]"
                      title="Reduce motion"
                      sub="Minimize animations and transitions"
                    >
                      {sw("reduceMotion", "Reduce motion")}
                    </SettingRow>
                  </div>
                </SectionBlock>
              </>
            )}

            {/* --------------------------- ADVANCED --------------------------- */}
            {section === "advanced" && (
              <>
                <SectionBlock title="Developer">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="API Base URL" className="sm:col-span-2">
                      <input
                        className={cn(inputCls, "font-mono text-[12.5px]")}
                        value={form.apiBaseUrl}
                        onChange={(e) => set("apiBaseUrl", e.target.value)}
                      />
                    </Field>
                    <Field label="Webhook Retry Policy">
                      <SelectMenu
                        value={form.webhookRetryPolicy}
                        options={[
                          "Off",
                          "3 retries (fixed)",
                          "5 retries (exponential)",
                          "Until success",
                        ]}
                        onChange={(v) => set("webhookRetryPolicy", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                    <Field label="Data Region">
                      <SelectMenu
                        value={form.dataRegion}
                        options={dataRegions}
                        onChange={(v) => set("dataRegion", v)}
                        className="h-10 w-full justify-between text-[13px]"
                      />
                    </Field>
                  </div>
                  <div className="mt-3 space-y-1">
                    <SettingRow
                      icon={RotateCcw}
                      iconCls="bg-[#dbeafe] text-[#2563eb]"
                      title="Retry failed webhooks"
                      sub="Automatically re-send failed webhook deliveries"
                    >
                      {sw("webhookRetry", "Retry failed webhooks")}
                    </SettingRow>
                    <SettingRow
                      icon={Bug}
                      iconCls="bg-[#fff7ed] text-[#ea580c]"
                      title="Debug logging"
                      sub="Verbose logs for API and webhook troubleshooting"
                    >
                      {sw("debugLog", "Debug logging")}
                    </SettingRow>
                    <SettingRow
                      icon={Zap}
                      iconCls="bg-[#f3e8ff] text-[#9333ea]"
                      title="Beta features"
                      sub="Get early access to experimental features"
                    >
                      {sw("betaFeatures", "Beta features")}
                    </SettingRow>
                  </div>
                </SectionBlock>

                <SectionBlock title="Danger Zone">
                  <div className="rounded-[12px] border border-[#fecaca] bg-[#fef2f2] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-[#b91c1c]">
                          Delete this workspace
                        </p>
                        <p className="mt-0.5 max-w-lg text-[12px] leading-relaxed text-[#b91c1c]/80">
                          This permanently deletes all conversations, tickets, knowledge and member
                          data. This action cannot be undone.
                        </p>
                      </div>
                      <button className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-[#dc2626] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#b91c1c]">
                        <Trash2 className="size-4" />
                        Delete Workspace
                      </button>
                    </div>
                  </div>
                </SectionBlock>
              </>
            )}
          </Panel>
        </motion.div>

        {/* Right column */}
        <div className="min-w-0 space-y-5">
          <ProfileCard />
          <PlanCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ shared parts ------------------------------ */

function SectionBlock({
  title,
  sub,
  children,
}: {
  title: string
  sub?: string
  children: ReactNode
}) {
  return (
    <div className="border-b border-[#eef1f6] px-6 py-6 last:border-b-0">
      <h3 className="text-[14.5px] font-bold tracking-[-0.01em] text-[#0f172a]">{title}</h3>
      {sub && <p className="mt-0.5 text-[12px] text-[#94a3b8]">{sub}</p>}
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label className="mb-1.5 block text-[12.5px] font-medium text-[#334155]">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-[11.5px] text-[#94a3b8]">{hint}</p>}
    </div>
  )
}

function SettingRow({
  icon: Icon,
  iconCls,
  title,
  sub,
  children,
}: {
  icon: LucideIcon
  iconCls: string
  title: string
  sub?: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-[10px] px-1.5 py-2.5 transition-colors hover:bg-[#f8fafc]">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
          iconCls,
        )}
      >
        <Icon className="size-4.5" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-semibold text-[#0f172a]">{title}</span>
        {sub && <span className="mt-0.5 block text-[12px] text-[#94a3b8]">{sub}</span>}
      </span>
      <span className="shrink-0">{children}</span>
    </div>
  )
}

/* ------------------------------ right column ------------------------------ */

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Your Profile
          </h2>
          <button className="rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]">
            Edit
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-[#4f46e5] text-[24px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.6)]">
            {settingsProfile.avatar}
          </span>
          <p className="mt-3 text-[15.5px] font-semibold text-[#0f172a]">{settingsProfile.name}</p>
          <p className="mt-0.5 text-[12.5px] text-[#94a3b8]">{settingsProfile.email}</p>
          <Badge tone="green" className="mt-2.5">
            {settingsProfile.badge}
          </Badge>
        </div>

        <div className="mt-4 space-y-3 border-t border-[#eef1f6] pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12.5px] text-[#64748b]">Phone</span>
            <span className="text-[13px] font-medium text-[#0f172a]">{settingsProfile.phone}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12.5px] text-[#64748b]">Two-Factor Authentication</span>
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#059669]">
                <span className="size-1.5 rounded-full bg-[#22c55e]" />
                {settingsProfile.twoFactor}
              </span>
              <button className="rounded-lg bg-[#eff6ff] px-3 py-1.5 text-[12px] font-medium text-[#2563eb] transition-colors hover:bg-[#dbeafe]">
                Manage
              </button>
            </span>
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}

function PlanCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Plan Information
          </h2>
          <button className="rounded-lg bg-[#eff6ff] px-3 py-1.5 text-[12px] font-medium text-[#2563eb] transition-colors hover:bg-[#dbeafe]">
            Manage Plan
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#4f46e5] to-[#2563eb] shadow-[0_6px_16px_-6px_rgba(37,99,235,0.5)]">
            <Crown className="size-6 text-white" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-semibold text-[#0f172a]">{planInfo.name}</span>
              <Badge tone="green" dot>
                {planInfo.status}
              </Badge>
            </span>
            <span className="mt-0.5 block text-[12px] text-[#94a3b8]">{planInfo.renews}</span>
          </span>
        </div>

        <ul className="mt-4 space-y-2.5">
          {planInfo.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#334155]">
              <CircleCheck className="size-4 shrink-0 text-[#16a34a]" strokeWidth={2.2} />
              {f}
            </li>
          ))}
        </ul>

        <button className="mt-4 flex h-10 w-full items-center justify-between rounded-lg border border-[#e2e8f0] bg-white px-3.5 text-[13px] font-medium text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-colors hover:bg-[#f8fafc]">
          View Billing &amp; Usage
          <ChevronRight className="size-4 text-[#94a3b8]" />
        </button>
      </Panel>
    </motion.div>
  )
}

const quickActionIcons = {
  export: { Icon: Download, cls: "bg-[#dbeafe] text-[#2563eb]" },
  delete: { Icon: Trash2, cls: "bg-[#fef2f2] text-[#dc2626]" },
  transfer: { Icon: ArrowRightLeft, cls: "bg-[#fff7ed] text-[#ea580c]" },
  audit: { Icon: History, cls: "bg-[#f3e8ff] text-[#9333ea]" },
} as const

function QuickActionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel>
        <div className="px-5 pb-2 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Quick Actions
          </h2>
        </div>
        <div className="px-3.5 pb-4">
          {quickActions.map((a) => {
            const { Icon, cls } = quickActionIcons[a.icon]
            return (
              <button
                key={a.id}
                className="flex w-full items-center gap-3 rounded-[12px] px-1.5 py-2.5 text-left transition-colors hover:bg-[#f8fafc]"
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
                    cls,
                  )}
                >
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block truncate text-[13px] font-semibold",
                      a.tone === "red" ? "text-[#dc2626]" : "text-[#0f172a]",
                    )}
                  >
                    {a.title}
                  </span>
                  <span className="block truncate text-[11.5px] text-[#94a3b8]">{a.sub}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-[#cbd5e1]" />
              </button>
            )
          })}
        </div>
      </Panel>
    </motion.div>
  )
}
