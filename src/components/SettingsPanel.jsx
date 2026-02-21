import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, Globe, Palette, Shield, Monitor } from 'lucide-react'

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors ${
      enabled ? 'bg-indigo-500' : 'bg-white/10'
    }`}
  >
    <motion.div
      className="absolute top-1 w-4 h-4 rounded-full bg-white"
      animate={{ left: enabled ? 24 : 4 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </button>
)

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    sound: false,
    autoSave: true,
    analytics: false,
    language: 'ko',
  })

  const toggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }

  const sections = [
    {
      title: '외관',
      icon: Palette,
      items: [
        { key: 'darkMode', label: '다크 모드', desc: '어두운 테마를 사용합니다', icon: Moon },
      ],
    },
    {
      title: '알림',
      icon: Bell,
      items: [
        { key: 'notifications', label: '알림 받기', desc: '푸시 알림을 허용합니다', icon: Bell },
        { key: 'sound', label: '알림 소리', desc: '알림 소리를 재생합니다', icon: Monitor },
      ],
    },
    {
      title: '일반',
      icon: Globe,
      items: [
        { key: 'autoSave', label: '자동 저장', desc: '변경사항을 자동으로 저장합니다', icon: Shield },
        { key: 'analytics', label: '사용 통계', desc: '익명 사용 데이터를 수집합니다', icon: Globe },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 max-w-2xl"
    >
      <h3 className="text-lg font-semibold text-white mb-6">설정</h3>

      <div className="space-y-6">
        {sections.map((section) => {
          const SectionIcon = section.icon
          return (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <SectionIcon size={16} className="text-indigo-400" />
                <span className="text-sm font-medium text-slate-300">{section.title}</span>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <ItemIcon size={16} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <Toggle enabled={settings[item.key]} onToggle={() => toggle(item.key)} />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* 테마 색상 */}
      <div className="mt-6">
        <span className="text-sm font-medium text-slate-300 mb-3 block">테마 색상</span>
        <div className="flex gap-3">
          {['#6366f1', '#ec4899', '#10b981', '#f97316', '#3b82f6', '#8b5cf6'].map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full border-2"
              style={{
                backgroundColor: color,
                borderColor: color === '#6366f1' ? 'white' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
