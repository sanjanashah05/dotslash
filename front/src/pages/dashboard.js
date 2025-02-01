
import { Avatar } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { KpiCard } from "@/components/kpi-card"
import { AnalyticsChart } from "@/components/analytics-chart"
import { GrowthChart } from "@/components/growth-chart"
import { RecentActivity } from "@/components/recent-activity"
import DashboardPagee from "@/components/DashMOD"


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <Sidebar />

      <main className="flex-1 p-8">
        
        <DashboardPagee />
      </main>
    </div>
  )
}

