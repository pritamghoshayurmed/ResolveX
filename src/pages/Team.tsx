import { useMemo, useState } from "react"
import {
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
  Eye,
  Headset,
  ListFilter,
  LogIn,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings2,
  UserRoundCheck,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react"
import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Panel } from "@/components/ui/panel"
import { Badge } from "@/components/ui/badge"
import { SelectMenu } from "@/components/ui/select-menu"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import {
  rolePermissions,
  teamActivity,
  teamKpis,
  teamMembers,
  teamSettings,
  type MemberRole,
  type MemberStatus,
  type TeamMember,
} from "@/data/teamDetail"
import { cn } from "@/lib/utils"

type Tab = "members" | "roles" | "activity" | "departments" | "settings"

function motionDelay(index: number) {
  return { duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] as const }
}

/* ------------------------------ visual maps ------------------------------ */

const avatarTones: Record<string, string> = {
  blue: "bg-[#dbeafe] text-[#2563eb]",
  pink: "bg-[#fce7f3] text-[#db2777]",
  indigo: "bg-[#e0e7ff] text-[#4f46e5]",
  amber: "bg-[#fef3c7] text-[#d97706]",
  violet: "bg-[#ede9fe] text-[#7c3aed]",
  teal: "bg-[#ccfbf1] text-[#0d9488]",
  rose: "bg-[#ffe4e6] text-[#e11d48]",
  gray: "bg-[#f1f5f9] text-[#475569]",
  purple: "bg-[#f3e8ff] text-[#9333ea]",
  green: "bg-[#dcfce7] text-[#16a34a]",
  coral: "bg-[#ffedd5] text-[#ea580c]",
}

const statusStyles: Record<MemberStatus, { dot: string; badge: string; label: string }> = {
  Online: { dot: "bg-[#22c55e]", badge: "bg-[#ecfdf5] text-[#059669]", label: "Online" },
  Away: { dot: "bg-[#f59e0b]", badge: "bg-[#fffbeb] text-[#b45309]", label: "Away" },
  Offline: { dot: "bg-[#cbd5e1]", badge: "bg-[#f1f5f9] text-[#64748b]", label: "Offline" },
}

export const roleBadgeTones: Record<MemberRole, string> = {
  Owner: "bg-[#faf5ff] text-[#9333ea]",
  Admin: "bg-[#faf5ff] text-[#9333ea]",
  "Team Lead": "bg-[#fff7ed] text-[#c2410c]",
  "Support Agent": "bg-[#eff6ff] text-[#2563eb]",
  Analyst: "bg-[#ecfdf5] text-[#059669]",
  Viewer: "bg-[#f1f5f9] text-[#64748b]",
}

const roleIcons: Record<
  MemberRole,
  { Icon: typeof Crown; cls: string }
> = {
  Owner: { Icon: Crown, cls: "bg-[#faf5ff] text-[#9333ea]" },
  Admin: { Icon: Crown, cls: "bg-[#fff7ed] text-[#c2410c]" },
  "Team Lead": { Icon: UserRoundCog, cls: "bg-[#fff7ed] text-[#ea580c]" },
  "Support Agent": { Icon: Headset, cls: "bg-[#dbeafe] text-[#2563eb]" },
  Analyst: { Icon: BarChart3, cls: "bg-[#ecfdf5] text-[#059669]" },
  Viewer: { Icon: Eye, cls: "bg-[#f1f5f9] text-[#64748b]" },
}

const kpiTones = {
  blue: { iconBg: "bg-[#dbeafe] text-[#2563eb]", stroke: "#3b82f6", Icon: UserRoundCheck },
  green: { iconBg: "bg-[#dcfce7] text-[#16a34a]", stroke: "#22c55e", Icon: UserRoundCheck },
  purple: { iconBg: "bg-[#faf5ff] text-[#9333ea]", stroke: "#a855f7", Icon: Crown },
  orange: { iconBg: "bg-[#fff7ed] text-[#c2410c]", stroke: "#f97316", Icon: Headset },
} as const

/* --------------------------------- page ---------------------------------- */

export function Team() {
  const [tab, setTab] = useState<Tab>("members")
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [roleFilter, setRoleFilter] = useState("All roles")
  const [deptFilter, setDeptFilter] = useState("All departments")
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [settings, setSettings] = useState(
    Object.fromEntries(teamSettings.map((s) => [s.id, s.value])),
  )

  const setSetting = (id: string, v: boolean) =>
    setSettings((prev) => ({ ...prev, [id]: v }))

  const counts = useMemo(() => {
    const total = teamMembers.length
    const admins = teamMembers.filter((m) => m.role === "Admin").length
    const agents = teamMembers.filter((m) => m.role === "Support Agent").length
    return { total, admins, agents }
  }, [])

  const filtered = useMemo(() => {
    let list = teamMembers
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((m) => `${m.name} ${m.email}`.toLowerCase().includes(q))
    if (statusFilter !== "All") list = list.filter((m) => m.status === statusFilter)
    if (roleFilter !== "All roles") list = list.filter((m) => m.role === roleFilter)
    if (deptFilter !== "All departments") list = list.filter((m) => m.department === deptFilter)
    return list
  }, [query, statusFilter, roleFilter, deptFilter])

  const filteredCount = filtered.length
  const pageCount = Math.max(1, Math.ceil(filteredCount / perPage))
  const safePage = Math.min(page, pageCount)
  const rows = filtered.slice((safePage - 1) * perPage, safePage * perPage)
  const allPageSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id))

  const toggleAll = () => {
    if (allPageSelected) setSelected((prev) => prev.filter((id) => !rows.some((r) => r.id === id)))
    else setSelected((prev) => [...new Set([...prev, ...rows.map((r) => r.id)])])
  }

  const toggleRow = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const roleCounts = useMemo(() => {
    const map: Record<MemberRole, number> = {
      Owner: 0,
      Admin: 0,
      "Team Lead": 0,
      "Support Agent": 0,
      Analyst: 0,
      Viewer: 0,
    }
    for (const m of teamMembers) map[m.role]++
    return map
  }, [])

  const distribution = useMemo(() => {
    const admins = roleCounts.Admin
    const others = roleCounts.Owner + roleCounts["Team Lead"]
    const pct = (n: number) => Math.round((n / teamMembers.length) * 100)
    return [
      { label: "Support Agents", value: roleCounts["Support Agent"], color: "#3b82f6", pct: pct(roleCounts["Support Agent"]) },
      { label: "Admins", value: admins, color: "#a855f7", pct: pct(admins) },
      { label: "Analysts", value: roleCounts.Analyst, color: "#22c55e", pct: pct(roleCounts.Analyst) },
      { label: "Viewers", value: roleCounts.Viewer, color: "#94a3b8", pct: pct(roleCounts.Viewer) },
      { label: "Others", value: others, color: "#fb923c", pct: pct(others) },
    ]
  }, [roleCounts])

  const deptCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const m of teamMembers) map.set(m.department, (map.get(m.department) ?? 0) + 1)
    return [...map.entries()].map(([dept, count]) => ({ dept, count }))
  }, [])

  const deptRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return deptCounts
    return deptCounts.filter((d) => d.dept.toLowerCase().includes(q))
  }, [deptCounts, query])

  const activityRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return teamActivity
    return teamActivity.filter((a) => `${a.title} ${a.sub}`.toLowerCase().includes(q))
  }, [query])

  const tabs: { key: Tab; label: string }[] = [
    { key: "members", label: "Members" },
    { key: "roles", label: "Roles & Permissions" },
    { key: "activity", label: "Activity Log" },
    { key: "departments", label: "Departments" },
    { key: "settings", label: "Settings" },
  ]

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-7">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#0f172a]">Team</h1>
          <p className="mt-1 text-[14px] text-[#64748b]">
            Manage your team members, roles and permissions. Collaborate to deliver better customer
            support.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#eff6ff] px-4 text-[13.5px] font-medium text-[#2563eb] transition-colors hover:bg-[#dbeafe]">
            <UserRoundPlus className="size-4" />
            Invite Member
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-[#0f172a] px-4 text-[13.5px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40 data-[state=open]:bg-[#1e293b]"
            >
              <Plus className="size-4" strokeWidth={2.2} />
              Add Member
              <ChevronDown className="size-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Add manually</DropdownMenuItem>
              <DropdownMenuItem>Invite by email</DropdownMenuItem>
              <DropdownMenuItem>Copy invite link</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Bulk import CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_345px]">
        {/* Primary column */}
        <div className="min-w-0 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {teamKpis.map((kpi, i) => (
              <TeamKpiCard key={kpi.id} kpi={kpi} index={i} />
            ))}
          </div>

          {/* Table panel */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
            <Panel>
              {/* Tabs + search */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8ebf1] px-5 pt-4">
                <div className="flex flex-wrap items-center gap-1" role="tablist">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      role="tab"
                      aria-selected={tab === t.key}
                      className={cn(
                        "relative flex items-center gap-1.5 px-2.5 pb-3 pt-1 text-[13px] font-medium transition-colors",
                        "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2.5px] after:rounded-full after:bg-[#2563eb] after:transition-opacity",
                        tab === t.key
                          ? "text-[#2563eb] after:opacity-100"
                          : "text-[#64748b] after:opacity-0 hover:text-[#0f172a]",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pb-3">
                  <div className="flex h-9 w-[200px] items-center gap-2 rounded-[10px] border border-[#e8ebf1] bg-[#f7f8fb] px-3 transition-colors focus-within:border-[#c7d7f5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2563eb]/15">
                    <Search className="size-3.5 shrink-0 text-[#94a3b8]" />
                    <input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setPage(1)
                      }}
                      placeholder="Search members..."
                      aria-label="Search members"
                      className="w-full bg-transparent text-[12.5px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
                    >
                      <ListFilter className="size-3.5 text-[#64748b]" /> Filters
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-56">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      {["All", "Online", "Away", "Offline"].map((s) => (
                        <DropdownMenuItem
                          key={s}
                          active={statusFilter === s}
                          onSelect={() => {
                            setStatusFilter(s)
                            setPage(1)
                          }}
                        >
                          {s}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Role</DropdownMenuLabel>
                      {["All roles", "Owner", "Admin", "Team Lead", "Support Agent", "Analyst", "Viewer"].map((r) => (
                        <DropdownMenuItem
                          key={r}
                          active={roleFilter === r}
                          onSelect={() => {
                            setRoleFilter(r)
                            setPage(1)
                          }}
                        >
                          {r}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Department</DropdownMenuLabel>
                      {[
                        "All departments",
                        "Management",
                        "Customer Support",
                        "Technical Support",
                        "Operations",
                        "Marketing",
                      ].map((d) => (
                        <DropdownMenuItem
                          key={d}
                          active={deptFilter === d}
                          onSelect={() => {
                            setDeptFilter(d)
                            setPage(1)
                          }}
                        >
                          {d}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Members tab */}
              {tab === "members" && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#eef1f6] text-[12px] font-medium text-[#94a3b8]">
                          <th className="w-10 py-3 pl-5 font-medium">
                            <input
                              type="checkbox"
                              aria-label="Select all on page"
                              checked={allPageSelected}
                              onChange={toggleAll}
                              className="size-3.5 accent-[#2563eb]"
                            />
                          </th>
                          <th className="py-3 font-medium">Name</th>
                          <th className="py-3 font-medium">Role</th>
                          <th className="py-3 font-medium">Department</th>
                          <th className="py-3 font-medium">Status</th>
                          <th className="py-3 font-medium">Last Active</th>
                          <th className="py-3 font-medium">Joined</th>
                          <th className="py-3 pr-5 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((m) => (
                          <MemberRow
                            key={m.id}
                            member={m}
                            selected={selected.includes(m.id)}
                            onToggle={() => toggleRow(m.id)}
                          />
                        ))}
                        {rows.length === 0 && (
                          <tr>
                            <td colSpan={8} className="py-10 text-center text-[13px] text-[#94a3b8]">
                              No members match your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1f6] px-5 py-3.5">
                    <p className="text-[12.5px] text-[#94a3b8]">
                      Showing {(safePage - 1) * perPage + 1} to{" "}
                      {Math.min(safePage * perPage, filteredCount)} of {filteredCount} members
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        aria-label="Previous page"
                        disabled={safePage <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f1f5f9] disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={cn(
                            "flex size-8 items-center justify-center rounded-lg text-[12.5px] font-medium transition-colors",
                            p === safePage ? "bg-[#2563eb] text-white" : "text-[#475569] hover:bg-[#f1f5f9]",
                          )}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        aria-label="Next page"
                        disabled={safePage >= pageCount}
                        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                        className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f1f5f9] disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                      <SelectMenu
                        value={`${perPage} per page`}
                        options={["10 per page", "25 per page", "50 per page"]}
                        onChange={(v) => {
                          setPerPage(parseInt(v, 10))
                          setPage(1)
                        }}
                        className="ml-2 h-8.5 text-[12.5px]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Roles tab */}
              {tab === "roles" && (
                <div className="grid grid-cols-1 gap-4 px-5 py-5 lg:grid-cols-2">
                  {rolePermissions.map((r) => {
                    const t = roleIcons[r.role]
                    return (
                      <div
                        key={r.id}
                        className="rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn("flex size-10 items-center justify-center rounded-[11px]", t.cls)}>
                            <t.Icon className="size-5" strokeWidth={1.9} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate text-[14px] font-semibold text-[#0f172a]">{r.role}</h3>
                              <Badge tone="gray">{roleCounts[r.role]} members</Badge>
                            </div>
                            <p className="mt-0.5 truncate text-[12px] text-[#64748b]">{r.description}</p>
                          </div>
                          <button
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12.5px] font-medium text-[#334155] transition-colors hover:bg-[#f8fafc]"
                          >
                            <Pencil className="size-3.5 text-[#64748b]" />
                            Edit
                          </button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {r.permissions.map((p) => (
                            <span
                              key={p}
                              className="rounded-full bg-[#f8fafc] px-2.5 py-1 text-[11.5px] font-medium text-[#475569] ring-1 ring-[#e8ebf1]"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Activity tab */}
              {tab === "activity" && (
                <div className="px-5 py-3">
                  {activityRows.map((a) => {
                    const { Icon, cls } = activityIcons[a.icon]
                    return (
                      <div
                        key={a.id}
                        className="flex items-center gap-3 border-b border-[#eef1f6] px-1 py-3.5 last:border-b-0"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
                            cls,
                          )}
                        >
                          <Icon className="size-4.5" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
                            {a.title}
                          </span>
                          <span className="block truncate text-[11.5px] text-[#94a3b8]">{a.sub}</span>
                        </span>
                        <span className="shrink-0 text-[11px] text-[#94a3b8]">{a.time}</span>
                      </div>
                    )
                  })}
                  {activityRows.length === 0 && (
                    <p className="py-8 text-center text-[13px] text-[#94a3b8]">No activity found.</p>
                  )}
                </div>
              )}

              {/* Departments tab */}
              {tab === "departments" && (
                <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 xl:grid-cols-3">
                  {deptRows.map((d) => (
                    <div
                      key={d.dept}
                      className="rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[14px] font-semibold text-[#0f172a]">{d.dept}</h3>
                        <Badge tone="blue">{d.count} {d.count === 1 ? "member" : "members"}</Badge>
                      </div>
                      <div className="mt-3 space-y-2">
                        {teamMembers
                          .filter((m) => m.department === d.dept)
                          .slice(0, 4)
                          .map((m) => (
                            <div key={m.id} className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "flex size-6.5 items-center justify-center rounded-full text-[10px] font-bold",
                                  avatarTones[m.tone],
                                )}
                              >
                                {m.avatar}
                              </span>
                              <span className="truncate text-[12.5px] text-[#475569]">{m.name}</span>
                              <span
                                className={cn(
                                  "ml-auto size-1.5 shrink-0 rounded-full",
                                  m.status === "Online"
                                    ? "bg-[#22c55e]"
                                    : m.status === "Away"
                                      ? "bg-[#f59e0b]"
                                      : "bg-[#cbd5e1]",
                                )}
                              />
                            </div>
                          ))}
                        {d.count > 4 && (
                          <p className="text-[11.5px] text-[#94a3b8]">+{d.count - 4} more</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {deptRows.length === 0 && (
                    <p className="col-span-full py-8 text-center text-[13px] text-[#94a3b8]">
                      No departments match your search.
                    </p>
                  )}
                </div>
              )}

              {/* Settings tab */}
              {tab === "settings" && (
                <div className="px-5 py-3">
                  {teamSettings.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-4 border-b border-[#eef1f6] py-4 last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-[#0f172a]">{s.title}</p>
                        <p className="mt-0.5 text-[12px] text-[#94a3b8]">{s.sub}</p>
                      </div>
                      <Switch
                        checked={settings[s.id]}
                        onCheckedChange={(v) => setSetting(s.id, v)}
                        ariaLabel={s.title}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-5">
          <DistributionCard distribution={distribution} total={counts.total} />
          <RolesCard roleCounts={roleCounts} onManage={() => setTab("roles")} />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- kpi card -------------------------------- */

function TeamKpiCard({ kpi, index }: { kpi: (typeof teamKpis)[number]; index: number }) {
  const t = kpiTones[kpi.tone]
  const Icon = t.Icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay(index)}
      whileHover={{ y: -2 }}
      className="rounded-[14px] border border-[#e8ebf1] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_-6px_rgba(15,23,42,0.1)]"
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-[10px]", t.iconBg)}>
          <Icon className="size-4.5" strokeWidth={2} />
        </span>
        <h3 className="text-[13.5px] font-medium text-[#475569]">{kpi.title}</h3>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[27px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
            {kpi.value}
          </p>
          <p
            className={cn(
              "mt-2.5 text-[12px] font-medium",
              kpi.id === "total" ? "text-[#16a34a]" : "text-[#94a3b8]",
            )}
          >
            {kpi.sub}
          </p>
        </div>
        <svg viewBox="0 0 80 36" className="h-9 w-20 shrink-0" fill="none" aria-hidden>
          <polyline
            points={kpi.sparkline
              .map((v, i) => `${(i / (kpi.sparkline.length - 1)) * 78 + 1},${34 - ((v - Math.min(...kpi.sparkline)) / Math.max(0.001, Math.max(...kpi.sparkline) - Math.min(...kpi.sparkline))) * 30}`)
              .join(" ")}
            stroke={t.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          />
        </svg>
      </div>
    </motion.article>
  )
}

/* -------------------------------- table row ------------------------------- */

function MemberRow({
  member,
  selected,
  onToggle,
}: {
  member: TeamMember
  selected: boolean
  onToggle: () => void
}) {
  return (
    <tr className="border-b border-[#f1f5f9] text-[13px] transition-colors last:border-b-0 hover:bg-[#f8fafc]">
      <td className="py-3 pl-5">
        <input
          type="checkbox"
          aria-label={`Select ${member.name}`}
          checked={selected}
          onChange={onToggle}
          className="size-3.5 accent-[#2563eb]"
        />
      </td>
      <td className="py-3">
        <span className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold",
              avatarTones[member.tone],
            )}
          >
            {member.avatar}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
              {member.name}
            </span>
            <span className="block truncate text-[11.5px] text-[#94a3b8]">{member.email}</span>
          </span>
        </span>
      </td>
      <td className="py-3">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium whitespace-nowrap",
            roleBadgeTones[member.role],
          )}
        >
          {member.role}
        </span>
      </td>
      <td className="whitespace-nowrap py-3 text-[#475569]">{member.department}</td>
      <td className="py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium",
            statusStyles[member.status].badge,
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusStyles[member.status].dot)} />
          {member.status}
        </span>
      </td>
      <td className="whitespace-nowrap py-3 text-[#475569]">{member.lastActive}</td>
      <td className="whitespace-nowrap py-3 text-[#475569]">{member.joinedDate}</td>
      <td className="py-3 pr-5">
        <span className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Actions for ${member.name}`}
              className="flex size-8 items-center justify-center rounded-lg border border-[#eef1f6] text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Change role</DropdownMenuItem>
              <DropdownMenuItem>Assign department</DropdownMenuItem>
              <DropdownMenuItem>Send message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#dc2626] data-[highlighted]:bg-[#fef2f2] data-[highlighted]:text-[#dc2626]">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </td>
    </tr>
  )
}

/* ------------------------------- right column ------------------------------ */

function DistributionCard({
  distribution,
  total,
}: {
  distribution: { label: string; value: number; color: string; pct: number }[]
  total: number
}) {
  const slices = distribution.flatMap((d) =>
    d.value > 0 ? [{ name: d.label, value: d.value, color: d.color }] : [],
  )
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(0)}>
      <Panel className="px-5 pb-5 pt-5">
        <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
          Team Distribution
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative h-[132px] w-[132px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  innerRadius={44}
                  outerRadius={62}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                  stroke="none"
                  animationDuration={900}
                >
                  {slices.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[20px] font-bold tracking-[-0.02em] text-[#0f172a]">{total}</span>
              <span className="text-[10.5px] text-[#94a3b8]">Members</span>
            </span>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            {distribution.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[12px]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="min-w-0 flex-1 truncate text-[#475569]">{s.label}</span>
                <span className="font-semibold text-[#0f172a]">{s.value}</span>
                <span className="w-9 text-right text-[#94a3b8]">({s.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}

function RolesCard({
  roleCounts,
  onManage,
}: {
  roleCounts: Record<MemberRole, number>
  onManage: () => void
}) {
  const roles: MemberRole[] = ["Owner", "Admin", "Team Lead", "Support Agent", "Analyst", "Viewer"]
  const units = (n: number) => (n === 1 ? "1 member" : `${n} members`)
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(1)}>
      <Panel>
        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
          <div>
            <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">Roles</h2>
            <p className="mt-0.5 text-[12px] text-[#94a3b8]">Manage roles and permissions</p>
          </div>
          <button
            onClick={onManage}
            className="rounded-full bg-[#eff6ff] px-3 py-1.5 text-[12px] font-medium text-[#2563eb] transition-colors hover:bg-[#dbeafe]"
          >
            Manage Roles
          </button>
        </div>
        <div className="px-3.5 pb-4">
          {roles.map((r) => {
            const t = roleIcons[r]
            return (
              <div
                key={r}
                className="flex items-center gap-3 rounded-[12px] px-1.5 py-2.5 transition-colors hover:bg-[#f8fafc]"
              >
                <span className={cn("relative flex size-9 shrink-0 items-center justify-center rounded-[10px]", t.cls)}>
                  <t.Icon className="size-4.5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#0f172a]">{r}</span>
                <span className="shrink-0 text-[12px] text-[#94a3b8]">{units(roleCounts[r])}</span>
                <ChevronRight className="size-4 shrink-0 text-[#cbd5e1]" />
              </div>
            )
          })}
        </div>
      </Panel>
    </motion.div>
  )
}

const activityIcons = {
  login: { Icon: LogIn, cls: "bg-[#dbeafe] text-[#2563eb]" },
  added: { Icon: UserRoundPlus, cls: "bg-[#dcfce7] text-[#16a34a]" },
  role: { Icon: UserRoundCog, cls: "bg-[#f3e8ff] text-[#9333ea]" },
  permissions: { Icon: Settings2, cls: "bg-[#fff7ed] text-[#ea580c]" },
} as const

function RecentActivityCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={motionDelay(2)}>
      <Panel>
        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Recent Activity
          </h2>
          <button className="text-[12.5px] font-medium text-[#2563eb] hover:underline">
            View All
          </button>
        </div>
        <div className="px-3.5 pb-4">
          {teamActivity.slice(0, 5).map((a) => {
            const { Icon, cls } = activityIcons[a.icon]
            return (
              <div
                key={a.id}
                className="flex items-center gap-3 rounded-[12px] px-1.5 py-2.5 transition-colors hover:bg-[#f8fafc]"
              >
                <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", cls)}>
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-[#0f172a]">{a.title}</span>
                  <span className="block truncate text-[11.5px] text-[#94a3b8]">{a.sub}</span>
                </span>
                <span className="shrink-0 whitespace-nowrap text-[11px] text-[#94a3b8]">{a.time}</span>
              </div>
            )
          })}
        </div>
      </Panel>
    </motion.div>
  )
}
