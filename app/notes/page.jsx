'use client'

import { motion } from 'framer-motion'
import Notes from '@/components/Notes'

export default function NotesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Notes />
    </motion.div>
  )
}
