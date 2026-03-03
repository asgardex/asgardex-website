'use client'
import { useEffect, useState, useCallback, useRef } from 'react'

interface UseLiveDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdate: Date
  retry: () => void
}

export function useLiveData<T> (
  fetchFn: (signal: AbortSignal) => Promise<T>,
  intervalMs = 30000
): UseLiveDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const isRefreshing = useRef(false)
  const lastFetchTime = useRef<number>(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchData = useCallback(async (): Promise<void> => {
    const now = Date.now()
    if (isRefreshing.current || (now - lastFetchTime.current) < 5000) {
      return
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    timeoutRef.current = setTimeout(() => {
      controller.abort()
    }, 8000)

    isRefreshing.current = true
    lastFetchTime.current = now
    setLoading(true)
    setError(null)

    try {
      const result = await fetchFn(controller.signal)
      setData(result)
      setLastUpdate(new Date())

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out - will retry automatically')
      } else {
        console.error('Failed to fetch data:', err)
        setError('Failed to fetch data')
      }
    } finally {
      setLoading(false)
      isRefreshing.current = false

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [fetchFn])

  useEffect(() => {
    void fetchData()

    const interval = setInterval(() => {
      void fetchData()
    }, intervalMs)

    return () => {
      clearInterval(interval)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [fetchData, intervalMs])

  return { data, loading, error, lastUpdate, retry: () => { void fetchData() } }
}
