import { useState, useEffect, useCallback } from 'react'
import type { GeoLocation } from '../types'
import type { CityData } from '../data/cities'

const DEFAULT_LOCATION: GeoLocation = {
  latitude: 31.2304,
  longitude: 121.4737,
  city: '上海',
}

// 反向地理编码
async function reverseGeocode(lat: number, lon: number): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1&language=zh&format=json`,
      { signal: AbortSignal.timeout(5000) },
    )
    if (!res.ok) return undefined
    const d = await res.json()
    const r = d.results?.[0]
    return r?.admin2 ?? r?.admin1 ?? r?.country ?? undefined
  } catch {
    return undefined
  }
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const selectCity = useCallback((city: CityData) => {
    setLocation({
      latitude: city.latitude,
      longitude: city.longitude,
      city: city.name,
    })
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function locate() {
      if (!navigator.geolocation) {
        setError('浏览器不支持定位，请手动选择城市')
        setLoading(false)
        return
      }

      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          })
        })

        if (cancelled) return
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const city = await reverseGeocode(lat, lon)
        setLocation({
          latitude: lat,
          longitude: lon,
          city: city ?? `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
        })
        setError(null)
      } catch (err: unknown) {
        const ge = err as GeolocationPositionError
        if (ge?.code === 1) {
          setError('定位权限未授权，请手动选择城市')
        } else if (ge?.code === 2) {
          setError('定位超时，请手动选择城市')
        } else {
          setError('定位不可用，请手动选择城市')
        }
      }
      setLoading(false)
    }

    locate()
    return () => { cancelled = true }
  }, [])

  return { location, error, loading, selectCity }
}
