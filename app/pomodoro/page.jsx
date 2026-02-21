'use client'

import { motion } from 'framer-motion'
import PomodoroTimer from '@/components/PomodoroTimer'

export default function PomodoroPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
      <PomodoroTimer />
    </motion.div>
  )
}
