import { motion } from 'framer-motion'
import type { WeatherDay } from '../../types'
import { getClothingAdvice } from '../../utils/clothingLogic'

interface Props {
  weather: WeatherDay
}

export default function ClothingAdvice({ weather }: Props) {
  const advice = getClothingAdvice(
    weather.tempMax,
    weather.tempMin,
    weather.humidity,
    weather.windSpeed,
    weather.precipitation,
  )

  return (
    <motion.div
      className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{advice.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-700">{advice.text}</p>
          <p className="text-xs text-slate-400 mt-0.5">{advice.detail}</p>
        </div>
      </div>
    </motion.div>
  )
}
