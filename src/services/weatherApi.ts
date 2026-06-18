import type { WeatherDay, WeatherData, CurrentWeather, GeoLocation } from '../types'

const API_BASE = 'https://api.open-meteo.com/v1/forecast'

// WMO Weather interpretation codes — precise mapping
// https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
const WMO_MAP: Record<number, { text: string; icon: string }> = {
  0:  { text: '晴朗',   icon: '☀️' },
  1:  { text: '大部晴', icon: '🌤️' },
  2:  { text: '多云',   icon: '⛅' },
  3:  { text: '阴天',   icon: '☁️' },
  45: { text: '雾',     icon: '🌫️' },
  48: { text: '雾凇',   icon: '🌫️' },
  51: { text: '小毛毛雨', icon: '🌦️' },
  53: { text: '毛毛雨',   icon: '🌦️' },
  55: { text: '大毛毛雨', icon: '🌧️' },
  56: { text: '冻毛毛雨', icon: '🌧️' },
  57: { text: '大冻毛毛雨', icon: '🌧️' },
  61: { text: '小雨',   icon: '🌦️' },
  63: { text: '中雨',   icon: '🌧️' },
  65: { text: '大雨',   icon: '🌧️' },
  66: { text: '冻雨',   icon: '🌧️' },
  67: { text: '大冻雨', icon: '🌧️' },
  71: { text: '小雪',   icon: '🌨️' },
  73: { text: '中雪',   icon: '❄️' },
  75: { text: '大雪',   icon: '❄️' },
  77: { text: '雪粒',   icon: '❄️' },
  80: { text: '阵雨',   icon: '🌦️' },
  81: { text: '大阵雨', icon: '🌧️' },
  82: { text: '暴阵雨', icon: '🌧️' },
  85: { text: '小阵雪', icon: '🌨️' },
  86: { text: '大阵雪', icon: '❄️' },
  95: { text: '雷暴',   icon: '⛈️' },
  96: { text: '雷暴+小冰雹', icon: '⛈️' },
  99: { text: '雷暴+大冰雹', icon: '⛈️' },
}

export function getWeatherDescription(code: number, temp?: number): { text: string; icon: string } {
  // 温度合理性校验：修正物理上不可能的天气
  const t = temp ?? 20
  // 雪在 >5°C → 改为雨
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    if (t > 5) return { text: '雨', icon: '🌧️' }
  }
  // 冰雹在 >25°C → 落地前已融化，改为普通雷暴
  if ((code === 96 || code === 99) && t > 25) {
    return { text: '雷阵雨', icon: '⛈️' }
  }

  // 精确查表
  if (code in WMO_MAP) return WMO_MAP[code]

  // 未知码，按区间粗略回退
  if (code <= 3)  return { text: '晴间多云', icon: '🌤️' }
  if (code <= 19) return { text: '多云',     icon: '⛅' }
  if (code <= 49) return { text: '雾/霾',    icon: '🌫️' }
  if (code <= 59) return { text: '毛毛雨',   icon: '🌦️' }
  if (code <= 69) return { text: '雨',       icon: '🌧️' }
  if (code <= 79) return { text: '雪',       icon: '❄️' }
  if (code <= 84) return { text: '阵雨',     icon: '🌦️' }
  if (code <= 86) return { text: '阵雪',     icon: '🌨️' }
  if (code === 95) return { text: '雷暴',    icon: '⛈️' }
  if (code <= 99) return { text: '雷暴+冰雹', icon: '⛈️' }

  return { text: '—', icon: '🌈' }
}

export async function fetchWeather(
  location: GeoLocation,
  days: number = 7,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current_weather: 'true',
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weathercode',
      'windspeed_10m_max',
      'precipitation_sum',
    ].join(','),
    hourly: 'relative_humidity_2m',
    timezone: 'Asia/Shanghai',
    forecast_days: days.toString(),
  })

  const res = await fetch(`${API_BASE}?${params}`)
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`)

  const json = await res.json()
  const daily = json.daily
  const hourly = json.hourly
  const cw = json.current_weather

  // 当前湿度：取当前小时对应的 humidity
  let currentHumidity = 60
  if (cw?.time && hourly?.relative_humidity_2m) {
    const curHour = cw.time.substring(0, 13) // "2026-06-18T14"
    for (let h = 0; h < hourly.time.length; h++) {
      if (hourly.time[h].startsWith(curHour)) {
        currentHumidity = hourly.relative_humidity_2m[h]
        break
      }
    }
  }

  const current: CurrentWeather | undefined = cw ? {
    temperature: cw.temperature,
    humidity: currentHumidity,
    weatherCode: cw.weathercode,
    windSpeed: cw.windspeed,
    time: cw.time,
  } : undefined

  // 从 24 小时湿度计算日均值
  const dailyHumidity: number[] = []
  if (hourly?.relative_humidity_2m) {
    for (let d = 0; d < daily.time.length; d++) {
      const dayDate = daily.time[d]
      let sum = 0, count = 0
      for (let h = 0; h < hourly.time.length; h++) {
        if (hourly.time[h].startsWith(dayDate)) {
          sum += hourly.relative_humidity_2m[h]
          count++
        }
      }
      dailyHumidity.push(count > 0 ? Math.round(sum / count) : 60)
    }
  }

  const dailyWeather: WeatherDay[] = daily.time.map((date: string, i: number) => ({
    date,
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
    humidity: dailyHumidity[i] ?? 60,
    weatherCode: daily.weathercode[i],
    windSpeed: daily.windspeed_10m_max[i],
    precipitation: daily.precipitation_sum[i],
  }))

  return { current, daily: dailyWeather }
}

// 缓存 key
const CACHE_KEY = 'weather_cache_v2'
const CACHE_EXPIRY_MS = 30 * 60 * 1000 // 30 分钟

interface CacheEntry {
  data: WeatherData
  timestamp: number
  location: GeoLocation
}

export function getCachedWeather(location: GeoLocation): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache: CacheEntry = JSON.parse(raw)
    if (Date.now() - cache.timestamp > CACHE_EXPIRY_MS) return null
    if (
      Math.abs(cache.location.latitude - location.latitude) > 0.05 ||
      Math.abs(cache.location.longitude - location.longitude) > 0.05
    ) {
      return null
    }
    return cache.data
  } catch {
    return null
  }
}

export function setCachedWeather(location: GeoLocation, data: WeatherData): void {
  const cache: CacheEntry = { data, timestamp: Date.now(), location }
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}
