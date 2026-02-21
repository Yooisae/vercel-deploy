'use client'

import { useState, useEffect } from 'react'

export default function BackgroundDecor() {
  const [stars, setStars] = useState(null)

  useEffect(() => {
    setStars(
      Array.from({ length: 30 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div
        className="absolute top-20 left-20 w-72 h-72 rounded-full blur-[100px] animate-blob"
        style={{ backgroundColor: 'rgba(var(--theme-rgb), 0.2)' }}
      />
      <div className="absolute top-60 right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />

      {stars?.map((star, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            top: star.top,
            left: star.left,
            backgroundColor: 'rgba(var(--theme-rgb), 0.3)',
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  )
}
