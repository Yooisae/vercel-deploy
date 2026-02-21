'use client'

import { motion } from 'framer-motion'
import StatsCards from '@/components/StatsCards'
import ActivityChart from '@/components/ActivityChart'
import PomodoroTimer from '@/components/PomodoroTimer'
import HabitTracker from '@/components/HabitTracker'
import QuoteWidget from '@/components/QuoteWidget'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ActivityChart />
        <PomodoroTimer />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <HabitTracker />
        <QuoteWidget />
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">빠른 링크</h3>
          <div className="space-y-2">
            {[
              { emoji: '📋', label: 'Notion', color: 'bg-white/10' },
              { emoji: '💻', label: 'GitHub', color: 'bg-white/10' },
              { emoji: '🎨', label: 'Figma', color: 'bg-white/10' },
              { emoji: '📧', label: 'Gmail', color: 'bg-white/10' },
              { emoji: '📊', label: 'Analytics', color: 'bg-white/10' },
            ].map((link) => (
              <motion.button
                key={link.label}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-lg">{link.emoji}</span>
                <span className="text-sm text-slate-300">{link.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
