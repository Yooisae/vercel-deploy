import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, Circle, Star } from 'lucide-react'

const initialTodos = [
  { id: 1, text: 'React 프로젝트 완성하기', done: false, starred: true, priority: 'high' },
  { id: 2, text: '디자인 시스템 문서 작성', done: false, starred: false, priority: 'medium' },
  { id: 3, text: '코드 리뷰 진행', done: true, starred: false, priority: 'low' },
  { id: 4, text: 'API 엔드포인트 테스트', done: false, starred: true, priority: 'high' },
  { id: 5, text: '주간 회고 작성', done: true, starred: false, priority: 'medium' },
]

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500',
}

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = () => {
    if (!newTodo.trim()) return
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, done: false, starred: false, priority: 'medium' },
    ])
    setNewTodo('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const toggleStar = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    if (filter === 'starred') return t.starred
    return true
  })

  const completedCount = todos.filter((t) => t.done).length
  const progress = todos.length ? (completedCount / todos.length) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">할 일 목록</h3>
        <span className="text-xs text-slate-400">
          {completedCount}/{todos.length} 완료
        </span>
      </div>

      {/* 진행률 바 */}
      <div className="w-full h-1.5 rounded-full bg-white/5 mb-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* 필터 */}
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'done', 'starred'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              filter === f
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f === 'all' ? '전체' : f === 'active' ? '진행' : f === 'done' ? '완료' : '중요'}
          </button>
        ))}
      </div>

      {/* 입력 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="새 할 일 추가..."
          className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm border border-white/5 focus:border-indigo-500/30 outline-none transition-colors placeholder:text-slate-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTodo}
          className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white"
        >
          <Plus size={18} />
        </motion.button>
      </div>

      {/* 리스트 */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filtered.map((todo) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${
                todo.done ? 'bg-white/[0.02]' : 'bg-white/5 hover:bg-white/[0.08]'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[todo.priority]}`} />
              <button onClick={() => toggleTodo(todo.id)} className="shrink-0">
                {todo.done ? (
                  <Check size={18} className="text-emerald-400" />
                ) : (
                  <Circle size={18} className="text-slate-500 hover:text-indigo-400 transition-colors" />
                )}
              </button>
              <span className={`flex-1 text-sm ${todo.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {todo.text}
              </span>
              <button onClick={() => toggleStar(todo.id)}>
                <Star
                  size={14}
                  className={`transition-colors ${
                    todo.starred ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-amber-400'
                  }`}
                />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} className="text-slate-500 hover:text-red-400 transition-colors" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
