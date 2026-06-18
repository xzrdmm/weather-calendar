interface Props {
  humidity: number
  size?: 'sm' | 'md'
}

export default function HumidityDisplay({ humidity, size = 'md' }: Props) {
  const cls = size === 'sm' ? 'text-[10px]' : 'text-xs'
  // 日均湿度阈值：<30%干燥 30-60%舒适 60-80%微潮 >80%潮湿
  const color =
    humidity > 85 ? 'text-cyan-600' :
    humidity > 70 ? 'text-cyan-500' :
    humidity < 25 ? 'text-amber-500' :
    'text-slate-400'

  return (
    <span className={`${cls} ${color} inline-flex items-center gap-0.5`}>
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4 6-8 10-8 14a8 8 0 0016 0c0-4-4-8-8-14z" />
      </svg>
      {humidity}%
    </span>
  )
}
