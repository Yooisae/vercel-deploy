import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, BookOpen, Dumbbell, Code2, Brain } from 'lucide-react'

const initialHabits = [
  { id: 1, name: '물 마시기', icon: Droplets, target: 8, current: 5, color: '#3b82f6', unit: '잔' },
  { id: 2, name: '독서', icon: BookOpen, target: 30, current: 20, color: '#a855f7', unit: '분' },
  { id: 3, name: '운동', icon: Dumbbell, target: 1, current: 1, color: '#10b981', unit: '회' },
  { id: 4, name: '코딩', icon: Code2, target: 4, current: 3, color: '#f97316', unit: '시간' },
  { id: 5, name: '명상', icon: Brain, target: 15, current: 0, color: '#ec4899', unit: '분' },
]

export default function HabitTracker() {
  const [habits, setHabits] = useState(initialHabits)

  const increment = (id) => {
    setHabits(habits.map((h) =>
      h.id === id ? { ...h, current: Math.min(h.current + 1, h.target) } : h
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">오늘의 습관</h3>

      <div className="space-y-3">
        {habits.map((habit) => {
          const Icon = habit.icon
          const progress = (habit.current / habit.target) * 100
          const isComplete = habit.current >= habit.target

          return (
            <motion.div
              key={habit.id}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${habit.color}20` }}
              >
                <Icon size={16} style={{ color: habit.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${isComplete ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {habit.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {habit.current}/{habit.target}{habit.unit}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: habit.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {!isComplete && (
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => increment(habit.id)}
                  className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xs shrink-0 opacity-0 group-hover:opacity-100"
                >
                  +
                </motion.button>
              )}
              {isComplete && (
                <span className="text-emerald-400 text-xs shrink-0">✓</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
