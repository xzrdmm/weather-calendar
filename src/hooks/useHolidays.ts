import { useState, useEffect, useMemo } from 'react'
import type { HolidayInfo } from '../types'
import { getMonthHolidays as getEmbeddedHolidays } from '../services/holidayData'
import { getTraditionalHolidays } from '../services/traditionalHolidays'
import { fetchMonthHolidays } from '../services/holidayApi'

export function useHolidays(year: number, month: number) {
  const [apiMap, setApiMap] = useState<Map<string, HolidayInfo> | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchMonthHolidays(year, month).then((map) => {
      if (!cancelled) setApiMap(map)
    })
    return () => { cancelled = true }
  }, [year, month])

  const holidayMap = useMemo(() => {
    if (apiMap) return apiMap
    // API 还没返回 → 嵌入式 + 传统节日合并
    const merged = getEmbeddedHolidays(year, month)
    for (const [dateStr, info] of getTraditionalHolidays(year, month)) {
      if (!merged.has(dateStr)) merged.set(dateStr, info)
    }
    return merged
  }, [apiMap, year, month])

  return holidayMap
}
