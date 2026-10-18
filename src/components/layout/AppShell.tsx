import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Topbar } from "./Topbar"
import { Sidebar } from "./Sidebar"
import { cn } from "@/lib/utils"

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [])

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f7f8fb]">
      {/* Desktop sidebar */}
      <aside className="hidden w-[248px] shrink-0 border-r border-[#e8ebf1] bg-white lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-[#0f172a]/30 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className={cn(
                "fixed inset-y-0 left-0 z-50 w-[272px] border-r border-[#e8ebf1] bg-white lg:hidden",
              )}
            >
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
