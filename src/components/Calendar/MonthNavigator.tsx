import { memo } from 'react'

interface Props {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  canGoNext?: boolean
}

const MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
]

function MonthNavigator({ year, month, onPrev, onNext, onToday, canGoNext = true }: Props) {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <button
        onClick={onPrev}
        className="w-9 h-9 flex items-center justify-center rounded-full
          text-slate-400 hover:bg-slate-100 active:bg-slate-200 transition-colors"
        aria-label="上个月"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={onToday}
        className="flex flex-col items-center group"
      >
        <span className="text-lg font-bold text-slate-700 tracking-wide">
          {MONTH_NAMES[month]}{' '}
          <span className="text-base font-normal text-slate-500">{year}</span>
        </span>
        <span className="text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
          回到今天
        </span>
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="w-9 h-9 flex items-center justify-center rounded-full
          text-slate-400 hover:bg-slate-100 active:bg-slate-200 transition-colors
          disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="下个月"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

export default memo(MonthNavigator)
