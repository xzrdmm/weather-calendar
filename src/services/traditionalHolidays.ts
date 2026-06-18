import type { HolidayInfo } from '../types'

// 中国传统节日 2020-2030 年完整对照表
// 含农历节日（春节/元宵/端午/七夕/中秋/重阳/除夕/腊八）和公历节日
interface TradHoliday {
  m: number // 月 1-12
  d: number // 日
  t: 'holiday' | 'workday'
  n: string
}

// 年份 → 节日列表
const TRADITIONAL: Record<number, TradHoliday[]> = {
  2020: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 2, t: 'holiday', n: '腊八节' },
    { m: 1, d: 24, t: 'holiday', n: '除夕' },
    { m: 1, d: 25, t: 'holiday', n: '春节' },
    { m: 2, d: 8, t: 'holiday', n: '元宵节' },
    { m: 4, d: 4, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 25, t: 'holiday', n: '端午节' },
    { m: 8, d: 25, t: 'holiday', n: '七夕' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节·中秋' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 25, t: 'holiday', n: '重阳节' },
  ],
  2021: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 20, t: 'holiday', n: '腊八节' },
    { m: 2, d: 11, t: 'holiday', n: '除夕' },
    { m: 2, d: 12, t: 'holiday', n: '春节' },
    { m: 2, d: 26, t: 'holiday', n: '元宵节' },
    { m: 4, d: 4, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 14, t: 'holiday', n: '端午节' },
    { m: 8, d: 14, t: 'holiday', n: '七夕' },
    { m: 9, d: 21, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 14, t: 'holiday', n: '重阳节' },
  ],
  2022: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 10, t: 'holiday', n: '腊八节' },
    { m: 1, d: 31, t: 'holiday', n: '除夕' },
    { m: 2, d: 1, t: 'holiday', n: '春节' },
    { m: 2, d: 15, t: 'holiday', n: '元宵节' },
    { m: 4, d: 5, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 3, t: 'holiday', n: '端午节' },
    { m: 8, d: 4, t: 'holiday', n: '七夕' },
    { m: 9, d: 10, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 4, t: 'holiday', n: '重阳节' },
  ],
  2023: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 21, t: 'holiday', n: '除夕' },
    { m: 1, d: 22, t: 'holiday', n: '春节' },
    { m: 2, d: 5, t: 'holiday', n: '元宵节' },
    { m: 4, d: 5, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 22, t: 'holiday', n: '端午节' },
    { m: 8, d: 22, t: 'holiday', n: '七夕' },
    { m: 9, d: 29, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 23, t: 'holiday', n: '重阳节' },
  ],
  2024: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 18, t: 'holiday', n: '腊八节' },
    { m: 2, d: 9, t: 'holiday', n: '除夕' },
    { m: 2, d: 10, t: 'holiday', n: '春节' },
    { m: 2, d: 24, t: 'holiday', n: '元宵节' },
    { m: 4, d: 4, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 10, t: 'holiday', n: '端午节' },
    { m: 8, d: 10, t: 'holiday', n: '七夕' },
    { m: 9, d: 17, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 11, t: 'holiday', n: '重阳节' },
  ],
  2025: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 7, t: 'holiday', n: '腊八节' },
    { m: 1, d: 28, t: 'holiday', n: '除夕' },
    { m: 1, d: 29, t: 'holiday', n: '春节' },
    { m: 2, d: 12, t: 'holiday', n: '元宵节' },
    { m: 4, d: 4, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 5, d: 31, t: 'holiday', n: '端午节' },
    { m: 8, d: 29, t: 'holiday', n: '七夕' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 6, t: 'holiday', n: '中秋节' },
    { m: 10, d: 29, t: 'holiday', n: '重阳节' },
  ],
  2026: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 2, d: 16, t: 'holiday', n: '除夕' },
    { m: 2, d: 17, t: 'holiday', n: '春节' },
    { m: 3, d: 3, t: 'holiday', n: '元宵节' },
    { m: 4, d: 5, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 19, t: 'holiday', n: '端午节' },
    { m: 8, d: 19, t: 'holiday', n: '七夕' },
    { m: 9, d: 25, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 18, t: 'holiday', n: '重阳节' },
  ],
  2027: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 2, d: 5, t: 'holiday', n: '除夕' },
    { m: 2, d: 6, t: 'holiday', n: '春节' },
    { m: 2, d: 20, t: 'holiday', n: '元宵节' },
    { m: 4, d: 5, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 9, t: 'holiday', n: '端午节' },
    { m: 8, d: 8, t: 'holiday', n: '七夕' },
    { m: 9, d: 15, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 8, t: 'holiday', n: '重阳节' },
  ],
  2028: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 1, d: 25, t: 'holiday', n: '除夕' },
    { m: 1, d: 26, t: 'holiday', n: '春节' },
    { m: 2, d: 9, t: 'holiday', n: '元宵节' },
    { m: 4, d: 4, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 5, d: 28, t: 'holiday', n: '端午节' },
    { m: 8, d: 26, t: 'holiday', n: '七夕' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节·中秋' },
    { m: 10, d: 26, t: 'holiday', n: '重阳节' },
  ],
  2029: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 2, d: 12, t: 'holiday', n: '除夕' },
    { m: 2, d: 13, t: 'holiday', n: '春节' },
    { m: 2, d: 27, t: 'holiday', n: '元宵节' },
    { m: 4, d: 4, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 16, t: 'holiday', n: '端午节' },
    { m: 8, d: 14, t: 'holiday', n: '七夕' },
    { m: 9, d: 22, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 16, t: 'holiday', n: '重阳节' },
  ],
  2030: [
    { m: 1, d: 1, t: 'holiday', n: '元旦' },
    { m: 2, d: 2, t: 'holiday', n: '除夕' },
    { m: 2, d: 3, t: 'holiday', n: '春节' },
    { m: 2, d: 17, t: 'holiday', n: '元宵节' },
    { m: 4, d: 5, t: 'holiday', n: '清明节' },
    { m: 5, d: 1, t: 'holiday', n: '劳动节' },
    { m: 6, d: 5, t: 'holiday', n: '端午节' },
    { m: 8, d: 5, t: 'holiday', n: '七夕' },
    { m: 9, d: 12, t: 'holiday', n: '中秋节' },
    { m: 10, d: 1, t: 'holiday', n: '国庆节' },
    { m: 10, d: 2, t: 'holiday', n: '国庆节' },
    { m: 10, d: 3, t: 'holiday', n: '国庆节' },
    { m: 10, d: 5, t: 'holiday', n: '重阳节' },
    { m: 12, d: 31, t: 'holiday', n: '除夕' },
  ],
}

export function getTraditionalHolidays(
  year: number,
  month: number, // 0-indexed
): Map<string, HolidayInfo> {
  const map = new Map<string, HolidayInfo>()
  const holidays = TRADITIONAL[year]
  if (!holidays) return map

  const targetMonth = month + 1
  for (const h of holidays) {
    if (h.m === targetMonth) {
      const dateStr = `${year}-${String(h.m).padStart(2, '0')}-${String(h.d).padStart(2, '0')}`
      // 检查是否是公历固定节日（元旦、劳动节、国庆节、清明节近似）
      map.set(dateStr, {
        date: dateStr,
        type: h.t,
        name: h.n,
      })
    }
  }
  return map
}

// 获取全年的传统节日
export function getYearTraditionalHolidays(year: number): Record<string, HolidayInfo> {
  const result: Record<string, HolidayInfo> = {}
  const holidays = TRADITIONAL[year]
  if (!holidays) return result

  for (const h of holidays) {
    const dateStr = `${year}-${String(h.m).padStart(2, '0')}-${String(h.d).padStart(2, '0')}`
    result[dateStr] = {
      date: dateStr,
      type: h.t,
      name: h.n,
    }
  }
  return result
}
