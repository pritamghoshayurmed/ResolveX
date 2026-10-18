import { useState } from "react"
import { Upload, PanelTop, Mic, TicketPlus } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Panel } from "@/components/ui/panel"
import { cn } from "@/lib/utils"

const actions = [
  {
    title: "Upload Knowledge",
    detail: "Add docs, URLs, FAQs",
    icon: Upload,
    iconBg: "bg-[#dbeafe] text-[#2563eb]",
    dialogTitle: "Upload Knowledge",
    dialogDescription: "Add PDFs, documentation links or FAQs to train your AI agents.",
    cta: "Choose files",
  },
  {
    title: "Customize Widget",
    detail: "Chat widget settings",
    icon: PanelTop,
    iconBg: "bg-[#f3e8ff] text-[#9333ea]",
    dialogTitle: "Customize Widget",
    dialogDescription: "Adjust the chat widget appearance and behavior on your website.",
    cta: "Open widget builder",
  },
  {
    title: "Configure Voice Agent",
    detail: "Phone number, prompts",
    icon: Mic,
    iconBg: "bg-[#dcfce7] text-[#16a34a]",
    dialogTitle: "Configure Voice Agent",
    dialogDescription: "Update the phone number, greeting and escalation prompts.",
    cta: "Open voice settings",
  },
  {
    title: "Create New Ticket",
    detail: "Manually create a ticket",
    icon: TicketPlus,
    iconBg: "bg-[#ffedd5] text-[#ea580c]",
    dialogTitle: "Create New Ticket",
    dialogDescription: "Log a ticket on behalf of a customer and assign an agent.",
    cta: "Create ticket",
  },
] as const

export function QuickActions({ index = 0 }: { index?: number }) {
  const [done, setDone] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.5, 0.4, 1] }}
    >
      <Panel>
        <div className="px-5 pb-2 pt-5">
          <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-2.5 px-3.5 pb-4 sm:grid-cols-2">
          {actions.map((a) => (
            <Dialog key={a.title}>
              <DialogTrigger asChild>
                <button className="group flex items-start gap-3 rounded-[12px] border border-[#eef1f6] bg-white p-3 text-left transition-all duration-150 hover:border-[#dbe3f0] hover:shadow-[0_4px_14px_-4px_rgba(15,23,42,0.08)]">
                  <span
                    className={cn(
                      "flex size-8.5 shrink-0 items-center justify-center rounded-[9px] transition-transform duration-150 group-hover:scale-105",
                      a.iconBg,
                    )}
                  >
                    <a.icon className="size-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-[#0f172a]">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] text-[#94a3b8]">
                      {a.detail}
                    </span>
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent
                title={a.dialogTitle}
                description={a.dialogDescription}
              >
                <div className="flex justify-end gap-2 pt-1">
                  <DialogClose asChild>
                    <Button variant="outline" size="md">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    size="md"
                    onClick={() => setDone(a.dialogTitle)}
                  >
                    {a.cta}
                  </Button>
                </div>
                {done === a.dialogTitle && (
                  <p className="mt-3 rounded-lg bg-[#ecfdf5] px-3 py-2 text-[12.5px] font-medium text-[#059669]">
                    Action recorded locally — demo mode.
                  </p>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </Panel>
    </motion.div>
  )
}
