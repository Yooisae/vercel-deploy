'use client'

import { motion } from 'framer-motion'
import SettingsPanel from '@/components/SettingsPanel'

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <SettingsPanel />
    </motion.div>
  )
}
