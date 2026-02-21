'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)
  const isLoaded = useRef(false)

  // 마운트 시 localStorage에서 값 로드
  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item !== null) {
        setStoredValue(JSON.parse(item))
      }
    } catch {}
    isLoaded.current = true
  }, [key])

  // 값 변경 시 localStorage에 저장 (초기 로드 이후부터)
  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const newValue = typeof value === 'function' ? value(prev) : value
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch {}
      return newValue
    })
  }, [key])

  return [storedValue, setValue]
}
