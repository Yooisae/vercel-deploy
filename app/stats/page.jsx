'use client'

import { motion } from 'framer-motion'
import StatsCards from '@/components/StatsCards'
import WeeklyHeatmap from '@/components/WeeklyHeatmap'

export default function StatsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <StatsCards />
      <WeeklyHeatmap />
    </motion.div>
  )
}
