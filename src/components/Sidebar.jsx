import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Clock,
  Settings,
  Zap,
  StickyNote,
  Music,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', id: 'dashboard' },
  { icon: CheckSquare, label: '할 일', id: 'todos' },
  { icon: StickyNote, label: '메모', id: 'notes' },
  { icon: BarChart3, label: '통계', id: 'stats' },
  { icon: Clock, label: '포모도로', id: 'pomodoro' },
  { icon: Music, label: '분위기', id: 'ambient' },
  { icon: Settings, label: '설정', id: 'settings' },
]

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-20 glass flex flex-col items-center py-6 z-50"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 180 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
          <Zap size={20} className="text-white" />
        </div>
      </motion.div>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group cursor-pointer ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-indigo-500/20 border border-indigo-500/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={20} className="relative z-10" />
              <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            </motion.button>
          )
        })}
      </nav>
    </motion.aside>
  )
}
