'use client'

import { motion } from 'framer-motion'
import TodoList from '@/components/TodoList'

export default function TodosPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <TodoList />
    </motion.div>
  )
}
