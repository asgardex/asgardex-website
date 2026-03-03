'use client'
import { useEffect, useState, useRef } from 'react'

export const AnimatedCounter = ({ value, formatter }: { value: number | string, formatter?: (val: number) => string }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const targetValue = typeof value === 'string' ? parseFloat(value) : value
  const animationRef = useRef<ReturnType<typeof setInterval>>()
  const currentDisplayRef = useRef(displayValue)

  useEffect(() => {
    if (isNaN(targetValue)) return

    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    const duration = 2000
    const steps = 60
    const startValue = currentDisplayRef.current
    const increment = (targetValue - startValue) / steps
    let currentStep = 0

    animationRef.current = setInterval(() => {
      currentStep++
      setDisplayValue(() => {
        const newValue = startValue + (increment * currentStep)
        if (currentStep >= steps) {
          if (animationRef.current) clearInterval(animationRef.current)
          currentDisplayRef.current = targetValue
          return targetValue
        }
        currentDisplayRef.current = newValue
        return newValue
      })
    }, duration / steps)

    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [targetValue])

  return (
    <span className="font-bold">
      {formatter != null ? formatter(displayValue) : displayValue.toFixed(2)}
    </span>
  )
}
