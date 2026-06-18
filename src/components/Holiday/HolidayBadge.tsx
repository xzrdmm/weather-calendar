interface Props {
  name: string
  compact?: boolean
}

export default function HolidayBadge({ name, compact }: Props) {
  if (compact) {
    return (
      <span className="text-[10px] text-red-500 font-medium truncate block leading-tight">
        {name}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600">
      {name}
    </span>
  )
}
