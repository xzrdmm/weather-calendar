import { memo } from 'react'
import { motion } from 'framer-motion'
import type { WeatherDay, CurrentWeather } from '../types'
import WeatherIcon from './Weather/WeatherIcon'
import TemperatureDisplay from './Weather/TemperatureDisplay'
import HumidityDisplay from './Weather/HumidityDisplay'
import ClothingAdvice from './Weather/ClothingAdvice'
import { getWeatherDescription } from '../services/weatherApi'

interface Props {
  weather?: WeatherDay
  current?: CurrentWeather
  loading: boolean
  holidayName?: string
  isWorkday?: boolean
}

function TodayDetail({ weather, current, loading, holidayName, isWorkday }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="spinner w-8 h-8 border-2 border-indigo-300 border-t-indigo-500 rounded-full" />
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="text-center py-8 text-slate-400 text-sm">
        <p>暂无天气数据</p>
        <p className="text-xs mt-1">请检查网络连接后下拉刷新</p>
      </div>
    )
  }

  const { text } = getWeatherDescription(weather.weatherCode, (weather.tempMax + weather.tempMin) / 2)
  const curIcon = current ? getWeatherDescription(current.weatherCode, current.temperature) : null

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={weather.date}
    >
      {/* 当前温度 —— 大字醒目 */}
      {current && (
        <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-800 tracking-tight">
              {Math.round(current.temperature)}
            </span>
            <span className="text-lg text-slate-400">°C</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {curIcon && (
              <span className="text-xs text-slate-400">{curIcon.icon} {curIcon.text}</span>
            )}
            <span className="text-xs text-slate-400">
              💧 {current.humidity}% · 💨 {current.windSpeed} km/h
            </span>
          </div>
          <div className="ml-auto text-right">
            <span className="text-[10px] text-slate-300">
              {new Date(current.time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })} 更新
            </span>
          </div>
        </div>
      )}

      {/* 日期 + 天气描述 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {new Date(weather.date + 'T00:00:00').toLocaleDateString('zh-CN', {
              month: 'long',
              day: 'numeric',
              weekday: 'short',
            })}
          </p>
          {holidayName && (
            <span className={`inline-block mt-0.5 text-xs font-medium px-1.5 py-0.5 rounded ${isWorkday ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
              {holidayName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <WeatherIcon weatherCode={weather.weatherCode} size="lg" />
          <p className="text-xs text-slate-400">{text}</p>
        </div>
      </div>

      {/* 预报温度 + 湿度 + 风力 */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <TemperatureDisplay tempMax={weather.tempMax} tempMin={weather.tempMin} size="lg" />
        </div>
        <div className="flex flex-col gap-1 items-end">
          <HumidityDisplay humidity={weather.humidity} size="md" />
          <span className="text-xs text-slate-300">
            💨 {weather.windSpeed} km/h
          </span>
          {weather.precipitation > 0 && (
            <span className="text-xs text-cyan-500">
              🌧 {weather.precipitation} mm
            </span>
          )}
        </div>
      </div>

      {/* 温度条 */}
      <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-amber-400 to-red-500 relative overflow-hidden">
        <div
          className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-md ring-1 ring-slate-200"
          style={{
            left: `${Math.max(0, Math.min(100, ((weather.tempMin + weather.tempMax) / 2 + 10) / 50 * 100))}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* 穿衣建议 */}
      <ClothingAdvice weather={weather} />
    </motion.div>
  )
}

export default memo(TodayDetail)
