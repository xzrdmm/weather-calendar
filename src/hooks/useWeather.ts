import { useState, useEffect, useCallback, useRef } from 'react'
import type { WeatherDay, CurrentWeather, GeoLocation } from '../types'
import { fetchWeather, getCachedWeather, setCachedWeather } from '../services/weatherApi'

export function useWeather(location: GeoLocation | null) {
  const [daily, setDaily] = useState<WeatherDay[]>([])
  const [current, setCurrent] = useState<CurrentWeather | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const prevLocationRef = useRef<string>('')

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
        setLoading(false)
        return
      }
    }

    try {
      const data = await fetchWeather(loc, 7)
      setDaily(data.daily)
      setCurrent(data.current)
      setCachedWeather(loc, data)
    } catch (e) {
      const msg = e instanceof Error ? e.message : '获取天气失败'
      setError(msg)
      if (daily.length === 0) {
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

  const weatherMap = new Map<string, WeatherDay>()
  for (const w of daily) {
    weatherMap.set(w.date, w)
  }

  return { current, daily, weatherMap, loading, error, refresh }
}
