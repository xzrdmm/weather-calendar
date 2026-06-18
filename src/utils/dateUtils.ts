import type { CalendarDay, HolidayInfo } from '../types'

// 格式化日期为 "YYYY-MM-DD"
export function formatDateStr(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 判断是否为今天
export function isToday(date: Date): boolean {
  const now = new Date()
  return formatDateStr(date) === formatDateStr(now)
}

// 判断是否为周末
export function isWeekend(date: Date): boolean {
  const d = date.getDay()
  return d === 0 || d === 6
}

// 获取某月的天数
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

// 获取某月第一天是星期几 (0=Sunday)
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

// 星期头
export const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'] as const

// 生成月历网格数据
export function generateCalendarGrid(
  year: number,
  month: number,
  weatherMap: Map<string, CalendarDay['weather']>,
  holidayMap: Map<string, HolidayInfo>,
): CalendarDay[] {
  const days: CalendarDay[] = []
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  // 上月填充
  const prevMonthDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1)
  const prevMonthYear = month === 0 ? year - 1 : year
  const prevMonth = month === 0 ? 11 : month - 1
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(prevMonthYear, prevMonth, prevMonthDays - i)
    const ds = formatDateStr(d)
    days.push({
      date: d,
      dateStr: ds,
      dayOfMonth: prevMonthDays - i,
      isToday: isToday(d),
      isWeekend: isWeekend(d),
      isCurrentMonth: false,
      weather: weatherMap.get(ds),
      holiday: holidayMap.get(ds),
    })
  }

  // 当月
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i)
    const ds = formatDateStr(d)
    days.push({
      date: d,
      dateStr: ds,
      dayOfMonth: i,
      isToday: isToday(d),
      isWeekend: isWeekend(d),
      isCurrentMonth: true,
      weather: weatherMap.get(ds),
      holiday: holidayMap.get(ds),
    })
  }

  // 下月填充（填满 7×6=42 格）
  const remaining = 42 - days.length
  const nextMonthYear = month === 11 ? year + 1 : year
  const nextMonth = month === 11 ? 0 : month + 1
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(nextMonthYear, nextMonth, i)
    const ds = formatDateStr(d)
    days.push({
      date: d,
      dateStr: ds,
      dayOfMonth: i,
      isToday: isToday(d),
      isWeekend: isWeekend(d),
      isCurrentMonth: false,
      weather: weatherMap.get(ds),
      holiday: holidayMap.get(ds),
    })
  }

  return days
}

// 获取当月所有日期字符串列表
export function getMonthDateRange(year: number, month: number): string[] {
  const days = getDaysInMonth(year, month)
  const result: string[] = []
  for (let i = 1; i <= days; i++) {
    result.push(formatDateStr(new Date(year, month, i)))
  }
  return result
}
