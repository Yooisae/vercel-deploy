'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
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
  { icon: LayoutDashboard, label: '대시보드', href: '/' },
  { icon: CheckSquare, label: '할 일', href: '/todos' },
  { icon: StickyNote, label: '메모', href: '/notes' },
  { icon: BarChart3, label: '통계', href: '/stats' },
  { icon: Clock, label: '포모도로', href: '/pomodoro' },
  { icon: Music, label: '분위기', href: '/ambient' },
  { icon: Settings, label: '설정', href: '/settings' },
]

export default function Sidebar() {
  const { themeColor } = useTheme()
  const pathname = usePathname()

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
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${themeColor}, #ec4899)` }}
        >
          <Zap size={20} className="text-white" />
        </div>
      </motion.div>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group cursor-pointer"
                style={
                  isActive
                    ? { color: 'var(--theme-light)' }
                    : { color: '#64748b' }
                }
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      backgroundColor: `rgba(var(--theme-rgb), 0.2)`,
                      border: `1px solid rgba(var(--theme-rgb), 0.3)`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              </motion.div>
            </Link>
          )
        })}
      </nav>
    </motion.aside>
  )
}
