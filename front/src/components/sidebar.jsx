import {
  HomeIcon,
  TrendingUpIcon,
  UsersIcon,
  FileTextIcon,
  LifeBuoyIcon,
  Settings2Icon,
  LogOutIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: HomeIcon, label: "Dashboard", lk:"/dashboard" },
  { icon: TrendingUpIcon, label: "ASKAI", lk:"/askai" },
  
  { icon: FileTextIcon, label: "DYNAMICQS", lk:"/dynamicqs" },
  { icon: LifeBuoyIcon, label: "VIDEOCALL" , lk:"/vc"},
  { icon: UsersIcon, label: "FAQs", lk:"/faq" },

]

export function Sidebar() {
  return (
    <div className="h-screen w-[240px] bg-zinc-900 text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8">
          <a href="/">
          <svg viewBox="0 0 24 24" className="w-full h-full text-white">
            <path fill="currentColor" d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
          </svg>
          </a>
        </div>
        <span className="font-semibold text-lg">NidaanAI</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.lk?item.lk : "#"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                  item.active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white">
        <LogOutIcon className="w-5 h-5" />
        Log out
      </button>
    </div>
  )
}