import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const days = ['월', '화', '수', '목', '금', '토', '일']
const hours = Array.from({ length: 12 }, (_, i) => i + 8)

const activityData = {}
days.forEach((day, di) => {
  hours.forEach((hour) => {
    const key = `${di}-${hour}`
    const rand = Math.random()
    activityData[key] = rand > 0.7 ? 3 : rand > 0.4 ? 2 : rand > 0.2 ? 1 : 0
  })
})

const intensityOpacities = [0.05, 0.2, 0.4, 0.7]

export default function WeeklyHeatmap() {
  const { themeColor } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-6 col-span-2"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">활동 히트맵</h3>
          <p className="text-sm text-slate-400 mt-0.5">이번 주 시간대별 활동</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>적음</span>
          <div className="flex gap-1">
            {intensityOpacities.map((op, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.05)' : `${themeColor}${Math.round(op * 255).toString(16).padStart(2, '0')}` }}
              />
            ))}
          </div>
          <span>많음</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${hours.length}, 1fr)` }}>
          <div />
          {hours.map((h) => (
            <div key={h} className="text-[10px] text-slate-500 text-center pb-1">
              {h}시
            </div>
          ))}

          {days.map((day, di) => (
            <div key={day} className="contents">
              <div className="text-xs text-slate-400 flex items-center">
                {day}
              </div>
              {hours.map((hour) => {
                const intensity = activityData[`${di}-${hour}`]
                const bg = intensity === 0
                  ? 'rgba(255,255,255,0.05)'
                  : `${themeColor}${Math.round(intensityOpacities[intensity] * 255).toString(16).padStart(2, '0')}`
                return (
                  <motion.div
                    key={`${di}-${hour}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (di * hours.length + hours.indexOf(hour)) * 0.01 }}
                    className="h-6 rounded-sm cursor-default transition-all hover:ring-1"
                    style={{ backgroundColor: bg, '--tw-ring-color': `${themeColor}80` }}
                    title={`${day} ${hour}시: ${['활동 없음', '낮음', '보통', '높음'][intensity]}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
