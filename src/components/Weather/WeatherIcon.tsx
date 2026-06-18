import { motion } from 'framer-motion'
import { getWeatherDescription } from '../../services/weatherApi'

interface Props {
  weatherCode: number
  temp?: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }

export default function WeatherIcon({ weatherCode, temp, size = 'md' }: Props) {
  const { icon } = getWeatherDescription(weatherCode, temp)

  return (
    <motion.span
      className={`${sizeMap[size]} inline-block`}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ willChange: 'transform' }}
    >
      {icon}
    </motion.span>
  )
}
