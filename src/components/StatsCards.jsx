import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, CheckCircle2, Clock, Target, Flame } from 'lucide-react'

const stats = [
  {
    label: '완료한 작업',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: CheckCircle2,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: '집중 시간',
    value: '6.5h',
    change: '+8%',
    trend: 'up',
    icon: Clock,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: '목표 달성률',
    value: '87%',
    change: '-3%',
    trend: 'down',
    icon: Target,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: '연속 기록',
    value: '15일',
    change: '+1',
    trend: 'up',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500/10',
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass glass-hover rounded-2xl p-5 cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <Icon size={20} className={`bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: stat.color.includes('emerald') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#a855f7' : '#f97316' }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
