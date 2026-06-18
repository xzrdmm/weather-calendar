import { useState, useEffect, useMemo } from 'react'
import type { HolidayInfo } from '../types'
import { getMonthHolidays as getEmbeddedHolidays } from '../services/holidayData'
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
    if (apiMap && apiMap.size > 0) return apiMap
    // API 还没返回 → 先用嵌入数据
    return getEmbeddedHolidays(year, month)
  }, [apiMap, year, month])

  return holidayMap
}
