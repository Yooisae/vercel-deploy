import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useTheme } from '@/contexts/ThemeContext'

const data = [
  { name: '월', tasks: 4, focus: 2.5 },
  { name: '화', tasks: 7, focus: 4.2 },
  { name: '수', tasks: 5, focus: 3.1 },
  { name: '목', tasks: 9, focus: 5.8 },
  { name: '금', tasks: 6, focus: 4.0 },
  { name: '토', tasks: 3, focus: 1.5 },
  { name: '일', tasks: 8, focus: 6.5 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="glass rounded-xl px-4 py-3 text-sm">
      <p className="text-white font-semibold mb-1">{label}요일</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="text-xs">
          {entry.name === 'tasks' ? '작업' : '집중'}: {entry.value}
          {entry.name === 'focus' ? 'h' : '개'}
        </p>
      ))}
    </div>
  )
}

export default function ActivityChart() {
  const { themeColor } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">주간 활동</h3>
          <p className="text-sm text-slate-400 mt-0.5">이번 주 생산성 추이</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
            작업 완료
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            집중 시간
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={themeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke={themeColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorTasks)"
          />
          <Area
            type="monotone"
            dataKey="focus"
            stroke="#f472b6"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorFocus)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
