import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Pin, PinOff } from 'lucide-react'

const colors = [
  'from-indigo-500/20 to-purple-500/20 border-indigo-500/20',
  'from-pink-500/20 to-rose-500/20 border-pink-500/20',
  'from-emerald-500/20 to-teal-500/20 border-emerald-500/20',
  'from-amber-500/20 to-orange-500/20 border-amber-500/20',
  'from-cyan-500/20 to-blue-500/20 border-cyan-500/20',
]

const initialNotes = [
  { id: 1, title: '프로젝트 아이디어', content: 'AI 기반 일정 추천 시스템 만들어보기. GPT API 활용해서 사용자 패턴 분석.', pinned: true, color: 0, date: '2월 21일' },
  { id: 2, title: '회의 메모', content: '다음 스프린트 목표: 사용자 인증 모듈 완성, 대시보드 UI 개선, 성능 최적화.', pinned: false, color: 1, date: '2월 20일' },
  { id: 3, title: '읽을 책 목록', content: '1. Clean Architecture\n2. Designing Data-Intensive Applications\n3. The Pragmatic Programmer', pinned: false, color: 2, date: '2월 19일' },
  { id: 4, title: 'API 엔드포인트', content: 'GET /api/users\nPOST /api/auth/login\nPUT /api/settings\nDELETE /api/sessions/:id', pinned: true, color: 3, date: '2월 18일' },
]

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes)
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const addNote = () => {
    if (!newNote.title.trim()) return
    setNotes([
      { id: Date.now(), ...newNote, pinned: false, color: Math.floor(Math.random() * colors.length), date: '방금' },
      ...notes,
    ])
    setNewNote({ title: '', content: '' })
    setIsAdding(false)
  }

  const togglePin = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const sorted = [...notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">메모</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAdding(!isAdding)}
          className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/30 transition-colors"
        >
          <Plus size={16} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="glass rounded-xl p-4 space-y-2">
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="제목"
                className="w-full bg-transparent border-none outline-none text-sm text-white font-medium placeholder:text-slate-500"
              />
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="내용을 입력하세요..."
                rows={3}
                className="w-full bg-transparent border-none outline-none text-xs text-slate-300 placeholder:text-slate-500 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsAdding(false)} className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg">
                  취소
                </button>
                <button onClick={addNote} className="text-xs text-white bg-indigo-500 px-3 py-1.5 rounded-lg hover:bg-indigo-600">
                  저장
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
        <AnimatePresence>
          {sorted.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-gradient-to-br ${colors[note.color]} border rounded-xl p-4 group cursor-default`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-white flex-1">{note.title}</h4>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => togglePin(note.id)}>
                    {note.pinned ? (
                      <PinOff size={12} className="text-amber-400" />
                    ) : (
                      <Pin size={12} className="text-slate-400 hover:text-amber-400" />
                    )}
                  </button>
                  <button onClick={() => deleteNote(note.id)}>
                    <Trash2 size={12} className="text-slate-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-line line-clamp-4">{note.content}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-slate-500">{note.date}</span>
                {note.pinned && <Pin size={10} className="text-amber-400 fill-amber-400" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
