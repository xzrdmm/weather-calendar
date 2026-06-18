import { memo } from 'react'
import type { CalendarDay as CalendarDayType } from '../../types'
import WeatherIcon from '../Weather/WeatherIcon'
import TemperatureDisplay from '../Weather/TemperatureDisplay'
import HumidityDisplay from '../Weather/HumidityDisplay'
import HolidayBadge from '../Holiday/HolidayBadge'
import WorkdayBadge from '../Holiday/WorkdayBadge'

interface Props {
  day: CalendarDayType
}

function CalendarDayCell({ day }: Props) {
  const { dayOfMonth, isToday, isWeekend, isCurrentMonth, weather, holiday } = day

  const isWorkday = holiday?.type === 'workday'
  const isHoliday = holiday?.type === 'holiday'

  return (
    <div
      className={`
        relative flex flex-col items-center py-1.5 px-0.5 rounded-lg
        transition-colors duration-200 select-none
        ${isCurrentMonth ? '' : 'opacity-30'}
        ${isToday
          ? 'bg-indigo-50 ring-2 ring-indigo-400 shadow-sm z-10'
          : isHoliday
            ? 'bg-red-50/70'
            : isWorkday
              ? 'bg-orange-50/50'
              : 'hover:bg-slate-100 active:bg-slate-200'
        }
      `}
    >
      {/* 日期数字 */}
      <span
        className={`
          day-label text-xs font-semibold leading-none mb-0.5
          ${isToday ? 'text-indigo-600' : ''}
          ${!isToday && isHoliday ? 'text-red-500' : ''}
          ${!isToday && !isHoliday && isWeekend ? 'text-red-400' : ''}
          ${!isToday && !isHoliday && !isWeekend ? 'text-slate-600' : ''}
        `}
      >
        {dayOfMonth}
      </span>

      {/* 节假日 / 调休标记 */}
      {isHoliday && <HolidayBadge name={holiday.name} compact />}
      {isWorkday && <WorkdayBadge name={holiday.name} compact />}

      {/* 天气图标 */}
      {weather && isCurrentMonth && (
        <WeatherIcon weatherCode={weather.weatherCode} temp={(weather.tempMax + weather.tempMin) / 2} size="sm" />
      )}

      {/* 温度 */}
      {weather && isCurrentMonth && (
        <TemperatureDisplay
          tempMax={weather.tempMax}
          tempMin={weather.tempMin}
          size="sm"
        />
      )}

      {/* 湿度 */}
      {weather && isCurrentMonth && (
        <HumidityDisplay humidity={weather.humidity} size="sm" />
      )}
    </div>
  )
}

export default memo(CalendarDayCell)
