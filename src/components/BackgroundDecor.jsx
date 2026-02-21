export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 그리드 */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* 블롭 */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-blob" />
      <div className="absolute top-60 right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />

      {/* 파티클 */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-indigo-400/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}
