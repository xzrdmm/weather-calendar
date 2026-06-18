interface Props {
  tempMax: number
  tempMin: number
  size?: 'sm' | 'md' | 'lg'
}

function tempColor(temp: number): string {
  if (temp <= 0) return 'text-blue-500'
  if (temp <= 10) return 'text-blue-400'
  if (temp <= 20) return 'text-green-500'
  if (temp <= 28) return 'text-amber-500'
  return 'text-red-500'
}

export default function TemperatureDisplay({ tempMax, tempMin, size = 'md' }: Props) {
  const sizeClass = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-2xl' : 'text-base'

  return (
    <span className={`temp-text ${sizeClass} inline-flex items-center gap-1`}>
      <span className={tempColor(tempMax)}>{Math.round(tempMax)}°</span>
      <span className="text-slate-300 font-normal">/</span>
      <span className={tempColor(tempMin)}>{Math.round(tempMin)}°</span>
    </span>
  )
}
