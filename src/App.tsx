import { Navigate, Route, Routes } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { Dashboard } from "@/pages/Dashboard"
import { Conversations } from "@/pages/Conversations"
import { Calls } from "@/pages/Calls"
import { Tickets } from "@/pages/Tickets"
import { KnowledgeBase } from "@/pages/KnowledgeBase"
import { AIAgents } from "@/pages/AIAgents"
import { Integrations } from "@/pages/Integrations"
import { Team } from "@/pages/Team"
import { Settings } from "@/pages/Settings"

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/ai-agents" element={<AIAgents />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}
