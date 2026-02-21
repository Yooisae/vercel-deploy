import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import ActivityChart from './components/ActivityChart'
import TodoList from './components/TodoList'
import PomodoroTimer from './components/PomodoroTimer'
import Notes from './components/Notes'
import HabitTracker from './components/HabitTracker'
import AmbientSounds from './components/AmbientSounds'
import QuoteWidget from './components/QuoteWidget'
import WeeklyHeatmap from './components/WeeklyHeatmap'
import SettingsPanel from './components/SettingsPanel'
import BackgroundDecor from './components/BackgroundDecor'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

function DashboardView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ActivityChart />
        <PomodoroTimer />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <HabitTracker />
        <QuoteWidget />
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">빠른 링크</h3>
          <div className="space-y-2">
            {[
              { emoji: '📋', label: 'Notion', color: 'bg-white/10' },
              { emoji: '💻', label: 'GitHub', color: 'bg-white/10' },
              { emoji: '🎨', label: 'Figma', color: 'bg-white/10' },
              { emoji: '📧', label: 'Gmail', color: 'bg-white/10' },
              { emoji: '📊', label: 'Analytics', color: 'bg-white/10' },
            ].map((link) => (
              <motion.button
                key={link.label}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-lg">{link.emoji}</span>
                <span className="text-sm text-slate-300">{link.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TodosView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="max-w-2xl">
      <TodoList />
    </motion.div>
  )
}

function NotesView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <Notes />
    </motion.div>
  )
}

function StatsView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <StatsCards />
      <WeeklyHeatmap />
    </motion.div>
  )
}

function PomodoroView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="max-w-md mx-auto">
      <PomodoroTimer />
    </motion.div>
  )
}

function AmbientView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="max-w-md mx-auto">
      <AmbientSounds />
    </motion.div>
  )
}

function SettingsView() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <SettingsPanel />
    </motion.div>
  )
}

const views = {
  dashboard: DashboardView,
  todos: TodosView,
  notes: NotesView,
  stats: StatsView,
  pomodoro: PomodoroView,
  ambient: AmbientView,
  settings: SettingsView,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const View = views[activeTab]

  return (
    <div className="min-h-screen relative">
      <BackgroundDecor />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-20 p-8 relative z-10">
        <Header />
        <AnimatePresence mode="wait">
          <View key={activeTab} />
        </AnimatePresence>
      </main>
    </div>
  )
}
