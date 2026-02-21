import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Quote } from 'lucide-react'

const quotes = [
  { text: '완벽함이란 더 이상 추가할 것이 없을 때가 아니라, 더 이상 뺄 것이 없을 때 달성된다.', author: '앙투안 드 생텍쥐페리' },
  { text: '가장 좋은 코드는 작성하지 않는 코드다.', author: 'Jeff Atwood' },
  { text: '단순함은 궁극의 정교함이다.', author: '레오나르도 다빈치' },
  { text: '먼저 동작하게 만들고, 그 다음 올바르게 만들고, 그 다음 빠르게 만들어라.', author: 'Kent Beck' },
  { text: '오늘 할 수 있는 일을 내일로 미루지 마라.', author: '벤저민 프랭클린' },
  { text: '프로그래밍은 생각하는 것이지, 타이핑하는 것이 아니다.', author: 'Rich Hickey' },
  { text: '실패는 성공의 어머니다.', author: '토마스 에디슨' },
  { text: '코드는 사람이 읽기 위해 작성하는 것이며, 기계가 실행하는 것은 부수적이다.', author: 'Hal Abelson' },
]

export default function QuoteWidget() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes.length))
  }, [])

  const next = () => {
    setIndex((i) => (i + 1) % quotes.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-4 right-4 opacity-5">
        <Quote size={80} />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <Quote size={14} className="text-amber-400" />
        </div>
        <span className="text-sm font-medium text-slate-300">오늘의 명언</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-slate-200 leading-relaxed mb-3 italic">
            &ldquo;{quotes[index].text}&rdquo;
          </p>
          <p className="text-xs text-slate-400">— {quotes[index].author}</p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={next}
        className="mt-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        <RefreshCw size={14} />
      </motion.button>
    </motion.div>
  )
}
