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
    { icon: HomeIcon, label: "Overview", active: true },
    { icon: TrendingUpIcon, label: "Growth" },
    { icon: UsersIcon, label: "Customers" },
    { icon: FileTextIcon, label: "Reports" },
    { icon: LifeBuoyIcon, label: "Support" },
    { icon: Settings2Icon, label: "Settings" },
  ]
  
  export function Sidebar() {
    return (
      <div className="h-screen w-[240px] bg-zinc-900 text-white p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white">
              <path fill="currentColor" d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
            </svg>
          </div>
          <span className="font-semibold text-lg">profitize</span>
        </div>
  
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
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
  
  