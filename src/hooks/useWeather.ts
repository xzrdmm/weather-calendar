import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import type { WeatherDay, CurrentWeather, GeoLocation } from '../types'
import { fetchWeather, getCachedWeather, setCachedWeather } from '../services/weatherApi'

export function useWeather(location: GeoLocation | null) {
  const [daily, setDaily] = useState<WeatherDay[]>([])
  const [current, setCurrent] = useState<CurrentWeather | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const prevLocationRef = useRef<string>('')
  const dailyRef = useRef<WeatherDay[]>([])

  const load = useCallback(async (loc: GeoLocation, force = false) => {
    const locKey = `${loc.latitude.toFixed(2)},${loc.longitude.toFixed(2)}`
    const isNewLocation = locKey !== prevLocationRef.current
    prevLocationRef.current = locKey

    setLoading(true)
    setError(null)

    if (!force && !isNewLocation) {
      const cached = getCachedWeather(loc)
      if (cached) {
        setDaily(cached.daily)
        setCurrent(cached.current)
        dailyRef.current = cached.daily
        setLoading(false)
        return
      }
    }

    try {
      const data = await fetchWeather(loc, 7)
      setDaily(data.daily)
      setCurrent(data.current)
      dailyRef.current = data.daily
      setCachedWeather(loc, data)
    } catch (e) {
      const msg = e instanceof Error ? e.message : '获取天气失败'
      setError(msg)
      // 有旧数据时保留不动（用 ref 避免闭包过期）
      if (dailyRef.current.length === 0) {
        setDaily([])
        setCurrent(undefined)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (location) {
      load(location)
    }
  }, [location, load])

  const refresh = useCallback(() => {
    if (location) {
      load(location, true)
    }
  }, [location, load])

  // memo 避免每帧重建 Map 导致下游 useMemo 失效
  const weatherMap = useMemo(() => {
    const map = new Map<string, WeatherDay>()
    for (const w of daily) {
      map.set(w.date, w)
    }
    return map
  }, [daily])

  return { current, daily, weatherMap, loading, error, refresh }
}
