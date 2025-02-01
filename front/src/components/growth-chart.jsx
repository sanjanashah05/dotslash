import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 400, target: 300 },
  { name: "Feb", value: 300, target: 400 },
  { name: "Mar", value: 500, target: 400 },
  { name: "Apr", value: 280, target: 300 },
  { name: "May", value: 390, target: 380 },
  { name: "Jun", value: 430, target: 400 },
]

export function GrowthChart() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">This Year Growth</h3>
        <select className="text-sm border rounded-md px-2 py-1">
          <option>Last 6M</option>
          <option>Last 12M</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

