'use client'

import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const themes = {
  '#6366f1': { name: 'Indigo', rgb: '99, 102, 241', light: '#818cf8', dark: '#4f46e5', tw: 'indigo' },
  '#ec4899': { name: 'Pink', rgb: '236, 72, 153', light: '#f472b6', dark: '#db2777', tw: 'pink' },
  '#10b981': { name: 'Emerald', rgb: '16, 185, 129', light: '#34d399', dark: '#059669', tw: 'emerald' },
  '#f97316': { name: 'Orange', rgb: '249, 115, 22', light: '#fb923c', dark: '#ea580c', tw: 'orange' },
  '#3b82f6': { name: 'Blue', rgb: '59, 130, 246', light: '#60a5fa', dark: '#2563eb', tw: 'blue' },
  '#8b5cf6': { name: 'Violet', rgb: '139, 92, 246', light: '#a78bfa', dark: '#7c3aed', tw: 'violet' },
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useLocalStorage('pulse-theme-color', '#6366f1')

  useEffect(() => {
    const theme = themes[themeColor]
    if (!theme) return
    const root = document.documentElement
    root.style.setProperty('--theme-color', themeColor)
    root.style.setProperty('--theme-rgb', theme.rgb)
    root.style.setProperty('--theme-light', theme.light)
    root.style.setProperty('--theme-dark', theme.dark)
  }, [themeColor])

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
