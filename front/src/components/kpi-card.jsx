import { cn } from "@/lib/utils"

export function KpiCard({ label, value, percentage, trend }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <div className={cn("text-xs font-medium", trend === "up" ? "text-green-500" : "text-yellow-500")}>
        {percentage}
      </div>
    </div>
  )
}

