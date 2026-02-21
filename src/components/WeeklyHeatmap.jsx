import { motion } from 'framer-motion'

const days = ['월', '화', '수', '목', '금', '토', '일']
const hours = Array.from({ length: 12 }, (_, i) => i + 8)

// 더미 활동 데이터
const activityData = {}
days.forEach((day, di) => {
  hours.forEach((hour) => {
    const key = `${di}-${hour}`
    const rand = Math.random()
    activityData[key] = rand > 0.7 ? 3 : rand > 0.4 ? 2 : rand > 0.2 ? 1 : 0
  })
})

const intensityColors = [
  'bg-white/5',
  'bg-indigo-500/20',
  'bg-indigo-500/40',
  'bg-indigo-500/70',
]

export default function WeeklyHeatmap() {
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
            {intensityColors.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <span>많음</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${hours.length}, 1fr)` }}>
          {/* 헤더 */}
          <div />
          {hours.map((h) => (
            <div key={h} className="text-[10px] text-slate-500 text-center pb-1">
              {h}시
            </div>
          ))}

          {/* 데이터 */}
          {days.map((day, di) => (
            <>
              <div key={`label-${day}`} className="text-xs text-slate-400 flex items-center">
                {day}
              </div>
              {hours.map((hour) => {
                const intensity = activityData[`${di}-${hour}`]
                return (
                  <motion.div
                    key={`${di}-${hour}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (di * hours.length + hours.indexOf(hour)) * 0.01 }}
                    className={`h-6 rounded-sm ${intensityColors[intensity]} cursor-default transition-all hover:ring-1 hover:ring-indigo-400/50`}
                    title={`${day} ${hour}시: ${['활동 없음', '낮음', '보통', '높음'][intensity]}`}
                  />
                )
              })}
            </>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
