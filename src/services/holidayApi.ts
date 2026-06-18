import type { HolidayInfo } from '../types'
import { getMonthHolidays as getEmbeddedHolidays } from './holidayData'
import { getTraditionalHolidays } from './traditionalHolidays'

const API_BASE = 'https://timor.tech/api/holiday'

interface TimorHoliday {
  holiday: boolean
  name: string
  wage: number
  date: string
  rest?: string
  target?: string
}

const yearCache = new Map<number, Map<string, HolidayInfo>>()

async function fetchYearHolidays(year: number): Promise<Map<string, HolidayInfo>> {
  if (yearCache.has(year)) return yearCache.get(year)!

  try {
    const res = await fetch(`${API_BASE}/year/${year}`, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (json.code !== 0) throw new Error('API error')

    const map = new Map<string, HolidayInfo>()
    const holidays = json.holiday as Record<string, TimorHoliday> | null
    if (!holidays) return map

    for (const [key, item] of Object.entries(holidays)) {
      const dateStr = item.date ?? `${year}-${key}`
      map.set(dateStr, {
        date: dateStr,
        type: item.holiday ? 'holiday' : 'workday',
        name: item.name || (item.holiday ? '节假日' : '调休上班'),
      })
    }

    yearCache.set(year, map)
    return map
  } catch {
    // API 失败 → 返回空 Map，由后续层补充
    return new Map()
  }
}

// 三层数据融合：API > 嵌入式国务院数据 > 传统节日
export async function fetchMonthHolidays(
  year: number,
  month: number,
): Promise<Map<string, HolidayInfo>> {
  const result = new Map<string, HolidayInfo>()
  const targetMonth = month + 1

  // Layer 1: 传统节日（最低优先级，先放入）
  const traditional = getTraditionalHolidays(year, month)
  for (const [dateStr, info] of traditional) {
    result.set(dateStr, info)
  }

  // Layer 2: 嵌入式国务院数据（中优先级，覆盖传统节日）
  const embedded = getEmbeddedHolidays(year, month)
  for (const [dateStr, info] of embedded) {
    result.set(dateStr, info)
  }

  // Layer 3: 实时 API（最高优先级，覆盖前两层）
  const apiMap = await fetchYearHolidays(year)
  for (const [dateStr, info] of apiMap) {
    const [, m] = dateStr.split('-').map(Number)
    if (m === targetMonth) {
      result.set(dateStr, info)
    }
  }

  return result
}
