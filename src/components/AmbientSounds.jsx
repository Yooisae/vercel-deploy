import { useState } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, Wind, Flame, Waves, Trees, Volume2, VolumeX } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const sounds = [
  { id: 'rain', label: '비', icon: CloudRain, color: '#3b82f6' },
  { id: 'wind', label: '바람', icon: Wind, color: '#64748b' },
  { id: 'fire', label: '모닥불', icon: Flame, color: '#f97316' },
  { id: 'ocean', label: '바다', icon: Waves, color: '#06b6d4' },
  { id: 'forest', label: '숲', icon: Trees, color: '#22c55e' },
]

export default function AmbientSounds() {
  const [activesSounds, setActiveSounds] = useLocalStorage('pulse-ambient-sounds', {})
  const [masterVolume, setMasterVolume] = useLocalStorage('pulse-ambient-volume', 70)

  const toggleSound = (id) => {
    setActiveSounds((prev) => {
      const next = { ...prev }
      if (next[id]) {
        delete next[id]
      } else {
        next[id] = 50
      }
      return next
    })
  }

  const setVolume = (id, vol) => {
    setActiveSounds((prev) => ({ ...prev, [id]: vol }))
  }

  const activeCount = Object.keys(activesSounds).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">분위기 사운드</h3>
        <div className="flex items-center gap-2">
          {activeCount > 0 ? (
            <Volume2 size={16} style={{ color: 'var(--theme-light)' }} />
          ) : (
            <VolumeX size={16} className="text-slate-500" />
          )}
          <span className="text-xs text-slate-400">{activeCount}개 활성</span>
        </div>
      </div>

      {/* 마스터 볼륨 */}
      <div className="flex items-center gap-3 mb-5 px-1">
        <span className="text-xs text-slate-400 w-12">마스터</span>
        <input
          type="range"
          min="0"
          max="100"
          value={masterVolume}
          onChange={(e) => setMasterVolume(Number(e.target.value))}
          className="flex-1 h-1 rounded-full appearance-none bg-white/10"
          style={{ accentColor: 'var(--theme-color)' }}
        />
        <span className="text-xs text-slate-400 w-8 text-right">{masterVolume}%</span>
      </div>

      <div className="space-y-3">
        {sounds.map((sound) => {
          const Icon = sound.icon
          const isActive = sound.id in activesSounds

          return (
            <div key={sound.id} className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSound(sound.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'shadow-lg' : 'bg-white/5'
                }`}
                style={
                  isActive
                    ? { backgroundColor: `${sound.color}20`, boxShadow: `0 0 20px ${sound.color}30` }
                    : {}
                }
              >
                <Icon size={18} style={{ color: isActive ? sound.color : '#64748b' }} />
              </motion.button>

              <div className="flex-1">
                <span className={`text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {sound.label}
                </span>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-1"
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={activesSounds[sound.id]}
                      onChange={(e) => setVolume(sound.id, Number(e.target.value))}
                      className="w-full h-1 rounded-full appearance-none bg-white/10"
                      style={{ accentColor: sound.color }}
                    />
                  </motion.div>
                )}
              </div>

              {isActive && (
                <span className="text-xs text-slate-500 w-8 text-right">
                  {activesSounds[sound.id]}%
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* 비주얼라이저 */}
      {activeCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-end justify-center gap-1 mt-5 h-8"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ background: `linear-gradient(to top, var(--theme-color), var(--theme-light))` }}
              animate={{
                height: [4, Math.random() * 28 + 4, 4],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
