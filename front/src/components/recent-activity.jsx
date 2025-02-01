import { Avatar } from "@/components/ui/avatar"

const activities = [
  {
    user: { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    type: "New Customer",
    id: "#0012123",
    time: "1 min ago",
    amount: "$534.65",
  },
  {
    user: { name: "Olivia Martin", avatar: "/placeholder.svg?height=32&width=32" },
    type: "Signed up",
    id: "#0012122",
    time: "5 min ago",
    amount: "$82.25",
  },
  {
    user: { name: "William Smith", avatar: "/placeholder.svg?height=32&width=32" },
    type: "New Customer",
    id: "#0012121",
    time: "24 min ago",
    amount: "$127.55",
  },
]

export function RecentActivity() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <select className="text-sm border rounded-md px-2 py-1">
          <option>Last 24h</option>
          <option>Last 7d</option>
        </select>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <img src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
              </Avatar>
              <div>
                <p className="font-medium">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">{activity.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{activity.amount}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

