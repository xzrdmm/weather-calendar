// 当前实时天气
export interface CurrentWeather {
  temperature: number    // 当前温度
  humidity: number       // 当前湿度
  weatherCode: number    // WMO weather code
  windSpeed: number      // km/h
  time: string           // 观测时间
}

// 每日预报
export interface WeatherDay {
  date: string           // "2025-06-18"
  tempMax: number
  tempMin: number
  humidity: number       // 日均湿度 0-100
  weatherCode: number    // WMO weather code
  windSpeed: number      // km/h
  precipitation: number  // mm
}

// 完整天气响应
export interface WeatherData {
  current?: CurrentWeather
  daily: WeatherDay[]
}

// 节假日信息
export interface HolidayInfo {
  date: string           // "2025-05-01"
  type: 'holiday' | 'workday'
  name: string           // "劳动节" / "春节调休"
}

// 日历中每一天的聚合数据
export interface CalendarDay {
  date: Date
  dateStr: string        // "2025-06-18"
  dayOfMonth: number
  isToday: boolean
  isWeekend: boolean
  isCurrentMonth: boolean
  weather?: WeatherDay
  holiday?: HolidayInfo
}

// 穿衣建议
export interface ClothingAdvice {
  icon: string           // emoji
  text: string           // "薄外套 + 长裤"
  detail: string         // 补充说明
}

// 坐标
export interface GeoLocation {
  latitude: number
  longitude: number
  city?: string
}
