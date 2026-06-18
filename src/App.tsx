import { useState, useCallback, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { generateCalendarGrid, formatDateStr } from './utils/dateUtils'
import { useGeolocation } from './hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'
import { useHolidays } from './hooks/useHolidays'
import CalendarGrid from './components/Calendar/CalendarGrid'
import MonthNavigator from './components/Calendar/MonthNavigator'
import TodayDetail from './components/TodayDetail'
import CityPicker from './components/CityPicker'

const now = new Date()
const CURRENT_YEAR = now.getFullYear()
const CURRENT_MONTH = now.getMonth()

export default function App() {
  const [year, setYear] = useState(CURRENT_YEAR)
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [slideDir, setSlideDir] = useState(0)

  // ref 保持最新值，避免 useCallback 闭包过期
  const monthRef = useRef(month)
  monthRef.current = month
  const yearRef = useRef(year)
  yearRef.current = year

  const { location, error: geoError, loading: geoLoading, selectCity } = useGeolocation()
  const { current, weatherMap, loading: weatherLoading, error: weatherError, refresh: refreshWeather } = useWeather(location)
  const holidayMap = useHolidays(year, month)

  const calendarDays = useMemo(
    () => generateCalendarGrid(year, month, weatherMap, holidayMap),
    [year, month, weatherMap, holidayMap],
  )

  const goToPrevMonth = useCallback(() => {
    setSlideDir(-1)
    const m = monthRef.current
    if (m === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((x) => x - 1)
    }
  }, [])

  const goToNextMonth = useCallback(() => {
    setSlideDir(1)
    const m = monthRef.current
    if (m === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((x) => x + 1)
    }
  }, [])

  const goToToday = useCallback(() => {
    setSlideDir(0)
    setYear(CURRENT_YEAR)
    setMonth(CURRENT_MONTH)
  }, [])

  // 刷新：强制拉取最新天气
  const handleRefresh = useCallback(() => {
    refreshWeather()
  }, [refreshWeather])

  // 触摸滑动
  const touchStartX = useRef(0)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 50) return
    if (dx > 0) goToPrevMonth()
    else goToNextMonth()
  }, [goToPrevMonth, goToNextMonth])

  // 今日天气
  const todayStr = formatDateStr(now)
  const todayWeather = weatherMap.get(todayStr)
  const todayHoliday = holidayMap.get(todayStr)

  const loading = geoLoading || weatherLoading

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col px-3 pb-8">
      {/* Header */}
      <header className="pt-6 pb-2 px-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              天气日历
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              <CityPicker currentCity={location.city} onSelect={selectCity} />
              {(geoError || weatherError) && (
                <span className="text-amber-500 ml-1">· {geoError ?? weatherError}</span>
              )}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="w-8 h-8 flex items-center justify-center rounded-full
              text-slate-400 hover:bg-white active:bg-slate-200 transition-colors"
            aria-label="刷新天气与定位"
          >
            <svg className={`w-5 h-5 ${loading ? 'spinner' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </header>

      {/* 今日详情 */}
      <motion.section
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <TodayDetail
          weather={todayWeather}
          current={current}
          loading={loading}
          holidayName={todayHoliday?.name}
          isWorkday={todayHoliday?.type === 'workday'}
        />
      </motion.section>

      {/* 月份切换器 */}
      <MonthNavigator
        year={year}
        month={month}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
        onToday={goToToday}
      />

      {/* 日历网格 + 触摸滑动 */}
      <section
        className="flex-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CalendarGrid days={calendarDays} slideDirection={slideDir} />
      </section>

      {/* 底部图例 */}
      <footer className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-300">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400" /> 节假日
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-400" /> 调休上班
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-indigo-400 ring-1 ring-indigo-200" /> 今天
        </span>
      </footer>
    </div>
  )
}
