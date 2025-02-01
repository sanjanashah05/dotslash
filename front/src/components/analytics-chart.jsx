import { PieChart, Pie, Cell } from "recharts"

const data = [
  { name: "Sales", value: 55 },
  { name: "Distribute", value: 30 },
  { name: "Returns", value: 15 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export function AnalyticsChart() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Analytics</h3>
      <div className="flex items-center justify-center">
        <PieChart width={200} height={200}>
          <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

