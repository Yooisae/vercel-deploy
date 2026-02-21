import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'

const MODES = {
  work: { label: '집중', duration: 25 * 60, color: '#6366f1' },
  short: { label: '짧은 휴식', duration: 5 * 60, color: '#10b981' },
  long: { label: '긴 휴식', duration: 15 * 60, color: '#f472b6' },
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(MODES.work.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (mode === 'work') setSessions((s) => s + 1)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft, mode])

  const switchMode = (newMode) => {
    setMode(newMode)
    setTimeLeft(MODES[newMode].duration)
    setIsRunning(false)
  }

  const reset = () => {
    setTimeLeft(MODES[mode].duration)
    setIsRunning(false)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = 1 - timeLeft / MODES[mode].duration
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference * (1 - progress)
  const currentColor = MODES[mode].color

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 flex flex-col items-center"
    >
      <h3 className="text-lg font-semibold text-white mb-2">포모도로 타이머</h3>

      {/* 모드 선택 */}
      <div className="flex gap-2 mb-6">
        {Object.entries(MODES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              mode === key
                ? 'text-white border'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            style={mode === key ? { backgroundColor: `${currentColor}20`, borderColor: `${currentColor}50` } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 원형 타이머 */}
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={currentColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${currentColor}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-slate-400 mt-1">{MODES[mode].label}</span>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsRunning(!isRunning)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: currentColor }}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={reset}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw size={18} />
        </motion.button>
      </div>

      {/* 세션 카운트 */}
      <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
        <Coffee size={14} />
        <span>완료 세션: {sessions}</span>
      </div>
    </motion.div>
  )
}
