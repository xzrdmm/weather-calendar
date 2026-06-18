interface Props {
  name?: string
  compact?: boolean
}

export default function WorkdayBadge({ name, compact }: Props) {
  const label = name ?? '班'

  if (compact) {
    return (
      <span className="text-[10px] text-orange-500 font-medium truncate block leading-tight">
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-600">
      {label}
    </span>
  )
}
