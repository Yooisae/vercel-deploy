'use client'

import { motion } from 'framer-motion'
import AmbientSounds from '@/components/AmbientSounds'

export default function AmbientPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
      <AmbientSounds />
    </motion.div>
  )
}
