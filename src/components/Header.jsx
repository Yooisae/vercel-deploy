import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Bell, Search, User } from 'lucide-react'

export default function Header() {
  const [time, setTime] = useState(new Date())
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const hour = time.getHours()
    if (hour < 6) setGreeting('늦은 밤이에요')
    else if (hour < 12) setGreeting('좋은 아침이에요')
    else if (hour < 18) setGreeting('좋은 오후에요')
    else setGreeting('좋은 저녁이에요')
  }, [time])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold">
          {greeting} <span className="gradient-text">✨</span>
        </h1>
        <p className="text-slate-400 mt-1">
          {format(time, 'yyyy년 M월 d일 EEEE', { locale: ko })} · {format(time, 'HH:mm:ss')}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 w-64"
        >
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="검색..."
            className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder:text-slate-500 w-full"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-[10px] flex items-center justify-center text-white font-bold">
            3
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
        >
          <User size={18} className="text-white" />
        </motion.button>
      </div>
    </motion.header>
  )
}
