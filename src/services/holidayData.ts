import type { HolidayInfo } from '../types'

// 2025-2026 年中国法定节假日及调休安排
// 数据来源：国务院办公厅通知
const HOLIDAY_DATA: Record<string, HolidayInfo> = {
  // === 2025 年 ===
  // 元旦
  '2025-01-01': { date: '2025-01-01', type: 'holiday', name: '元旦' },
  // 春节
  '2025-01-28': { date: '2025-01-28', type: 'holiday', name: '春节' },
  '2025-01-29': { date: '2025-01-29', type: 'holiday', name: '春节' },
  '2025-01-30': { date: '2025-01-30', type: 'holiday', name: '春节' },
  '2025-01-31': { date: '2025-01-31', type: 'holiday', name: '春节' },
  '2025-02-01': { date: '2025-02-01', type: 'holiday', name: '春节' },
  '2025-02-02': { date: '2025-02-02', type: 'holiday', name: '春节' },
  '2025-02-03': { date: '2025-02-03', type: 'holiday', name: '春节' },
  '2025-02-04': { date: '2025-02-04', type: 'holiday', name: '春节' },
  // 春节调休
  '2025-01-26': { date: '2025-01-26', type: 'workday', name: '春节调休' },
  '2025-02-08': { date: '2025-02-08', type: 'workday', name: '春节调休' },
  // 清明节
  '2025-04-04': { date: '2025-04-04', type: 'holiday', name: '清明节' },
  '2025-04-05': { date: '2025-04-05', type: 'holiday', name: '清明节' },
  '2025-04-06': { date: '2025-04-06', type: 'holiday', name: '清明节' },
  // 劳动节
  '2025-05-01': { date: '2025-05-01', type: 'holiday', name: '劳动节' },
  '2025-05-02': { date: '2025-05-02', type: 'holiday', name: '劳动节' },
  '2025-05-03': { date: '2025-05-03', type: 'holiday', name: '劳动节' },
  '2025-05-04': { date: '2025-05-04', type: 'holiday', name: '劳动节' },
  '2025-05-05': { date: '2025-05-05', type: 'holiday', name: '劳动节' },
  // 劳动节调休
  '2025-04-27': { date: '2025-04-27', type: 'workday', name: '劳动节调休' },
  // 端午节
  '2025-05-31': { date: '2025-05-31', type: 'holiday', name: '端午节' },
  '2025-06-01': { date: '2025-06-01', type: 'holiday', name: '端午节' },
  '2025-06-02': { date: '2025-06-02', type: 'holiday', name: '端午节' },
  // 中秋节+国庆节（连休）
  '2025-10-01': { date: '2025-10-01', type: 'holiday', name: '国庆节·中秋' },
  '2025-10-02': { date: '2025-10-02', type: 'holiday', name: '国庆节' },
  '2025-10-03': { date: '2025-10-03', type: 'holiday', name: '国庆节' },
  '2025-10-04': { date: '2025-10-04', type: 'holiday', name: '国庆节' },
  '2025-10-05': { date: '2025-10-05', type: 'holiday', name: '国庆节' },
  '2025-10-06': { date: '2025-10-06', type: 'holiday', name: '国庆节' },
  '2025-10-07': { date: '2025-10-07', type: 'holiday', name: '国庆节' },
  '2025-10-08': { date: '2025-10-08', type: 'holiday', name: '国庆节' },
  // 国庆调休
  '2025-09-28': { date: '2025-09-28', type: 'workday', name: '国庆调休' },
  '2025-10-11': { date: '2025-10-11', type: 'workday', name: '国庆调休' },

  // === 2026 年 ===
  // 元旦
  '2026-01-01': { date: '2026-01-01', type: 'holiday', name: '元旦' },
  '2026-01-02': { date: '2026-01-02', type: 'holiday', name: '元旦' },
  '2026-01-03': { date: '2026-01-03', type: 'holiday', name: '元旦' },
  // 春节（2026年2月17日除夕）
  '2026-02-16': { date: '2026-02-16', type: 'holiday', name: '春节' },
  '2026-02-17': { date: '2026-02-17', type: 'holiday', name: '春节' },
  '2026-02-18': { date: '2026-02-18', type: 'holiday', name: '春节' },
  '2026-02-19': { date: '2026-02-19', type: 'holiday', name: '春节' },
  '2026-02-20': { date: '2026-02-20', type: 'holiday', name: '春节' },
  '2026-02-21': { date: '2026-02-21', type: 'holiday', name: '春节' },
  '2026-02-22': { date: '2026-02-22', type: 'holiday', name: '春节' },
  '2026-02-23': { date: '2026-02-23', type: 'holiday', name: '春节' },
  // 春节调休
  '2026-02-14': { date: '2026-02-14', type: 'workday', name: '春节调休' },
  '2026-02-28': { date: '2026-02-28', type: 'workday', name: '春节调休' },
  // 清明节
  '2026-04-05': { date: '2026-04-05', type: 'holiday', name: '清明节' },
  '2026-04-06': { date: '2026-04-06', type: 'holiday', name: '清明节' },
  // 清明调休
  '2026-04-04': { date: '2026-04-04', type: 'workday', name: '清明调休' },
  // 劳动节
  '2026-05-01': { date: '2026-05-01', type: 'holiday', name: '劳动节' },
  '2026-05-02': { date: '2026-05-02', type: 'holiday', name: '劳动节' },
  '2026-05-03': { date: '2026-05-03', type: 'holiday', name: '劳动节' },
  '2026-05-04': { date: '2026-05-04', type: 'holiday', name: '劳动节' },
  '2026-05-05': { date: '2026-05-05', type: 'holiday', name: '劳动节' },
  // 劳动节调休
  '2026-05-09': { date: '2026-05-09', type: 'workday', name: '劳动节调休' },
  // 端午节
  '2026-06-19': { date: '2026-06-19', type: 'holiday', name: '端午节' },
  '2026-06-20': { date: '2026-06-20', type: 'holiday', name: '端午节' },
  '2026-06-21': { date: '2026-06-21', type: 'holiday', name: '端午节' },
  // 端午调休
  '2026-06-13': { date: '2026-06-13', type: 'workday', name: '端午调休' },
  // 中秋节
  '2026-09-25': { date: '2026-09-25', type: 'holiday', name: '中秋节' },
  '2026-09-26': { date: '2026-09-26', type: 'holiday', name: '中秋节' },
  '2026-09-27': { date: '2026-09-27', type: 'holiday', name: '中秋节' },
  // 中秋调休
  '2026-09-20': { date: '2026-09-20', type: 'workday', name: '中秋调休' },
  // 国庆节
  '2026-10-01': { date: '2026-10-01', type: 'holiday', name: '国庆节' },
  '2026-10-02': { date: '2026-10-02', type: 'holiday', name: '国庆节' },
  '2026-10-03': { date: '2026-10-03', type: 'holiday', name: '国庆节' },
  '2026-10-04': { date: '2026-10-04', type: 'holiday', name: '国庆节' },
  '2026-10-05': { date: '2026-10-05', type: 'holiday', name: '国庆节' },
  '2026-10-06': { date: '2026-10-06', type: 'holiday', name: '国庆节' },
  '2026-10-07': { date: '2026-10-07', type: 'holiday', name: '国庆节' },
  // 国庆调休
  '2026-09-28': { date: '2026-09-28', type: 'workday', name: '国庆调休' },
  '2026-10-10': { date: '2026-10-10', type: 'workday', name: '国庆调休' },
}

export function getHoliday(dateStr: string): HolidayInfo | undefined {
  return HOLIDAY_DATA[dateStr]
}

// 获取某月的所有节假日信息
export function getMonthHolidays(
  year: number,
  month: number,
): Map<string, HolidayInfo> {
  const map = new Map<string, HolidayInfo>()
  for (const [dateStr, info] of Object.entries(HOLIDAY_DATA)) {
    const [y, m] = dateStr.split('-').map(Number)
    if (y === year && m === month + 1) {
      map.set(dateStr, info)
    }
  }
  return map
}
