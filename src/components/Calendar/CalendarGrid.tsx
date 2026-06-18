import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CalendarDay as CalendarDayType } from '../../types'
import { WEEKDAY_LABELS } from '../../utils/dateUtils'
import CalendarDay from './CalendarDay'

interface Props {
  days: CalendarDayType[]
  slideDirection: number // 1 = 左滑（下月）, -1 = 右滑（上月）, 0 = 不动
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
}

function CalendarGrid({ days, slideDirection }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* 星期头 */}
      <div className="calendar-grid bg-slate-50/80 border-b border-slate-100 px-0.5">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-xs font-medium text-slate-400 py-2"
          >
            {label}
          </div>
        ))}
      </div>

      {/* 日期网格 + 滑动动画 */}
      <div className="slide-container">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={days[15]?.dateStr ?? 'empty'}
            className="calendar-grid p-0.5"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {days.map((day) => (
              <CalendarDay key={day.dateStr} day={day} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default memo(CalendarGrid)
