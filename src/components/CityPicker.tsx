import { useState, useRef, useEffect, memo } from 'react'
import { CITIES, type CityData } from '../data/cities'

interface Props {
  currentCity: string | undefined
  onSelect: (city: CityData) => void
}

function CityPicker({ currentCity, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  // 点击外部关闭
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const filtered = search.trim()
    ? CITIES.filter((c) => c.name.includes(search.trim()))
    : CITIES

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2 decoration-dotted"
      >
        {currentCity ?? '选择城市'}
      </button>

      {open && (
        <div className="absolute top-6 left-0 z-50 w-48 max-h-64 overflow-y-auto bg-white rounded-xl shadow-lg border border-slate-200 py-1 animate-in fade-in">
          {/* 搜索框 */}
          <div className="px-2 pb-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索城市..."
              className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-300"
              autoFocus
            />
          </div>

          {/* 城市列表 */}
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  onSelect(city)
                  setOpen(false)
                  setSearch('')
                }}
                className={`w-full text-left px-3 py-1.5 text-sm transition-colors
                  ${city.name === currentCity
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {city.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-2">无匹配城市</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(CityPicker)
