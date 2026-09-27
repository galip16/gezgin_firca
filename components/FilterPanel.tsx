"use client"

import { useState } from "react"
import { CATEGORY_LABELS } from "@/lib/types"

type Props = {
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onClear: () => void
}

export default function FilterPanel({
  selectedCategory,
  onSelectCategory,
  onClear,
}: Props) {
  const [open, setOpen] = useState(false)

  const hasFilter = selectedCategory !== "all"

  const handleClear = () => {
    onClear()
    setOpen(false)
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Ürün filtrelerini aç"
        className="relative bg-amber-600 text-white px-4 py-2 rounded shadow hover:bg-amber-700 transition whitespace-nowrap"
      >
        Filtrele

        {/* Filtre aktif göstergesi */}
        {hasFilter && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-50"
          />
        )}
      </button>

      {open && (
        <div className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-4 flex flex-col gap-4">

          {/* Kategoriler */}
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === "all"}
                onChange={() => onSelectCategory("all")}
                className="accent-amber-600"
              />
              Tümü
            </label>

            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={key}
                  checked={selectedCategory === key}
                  onChange={() => onSelectCategory(key)}
                  className="accent-amber-600"
                />
                {label}
              </label>
            ))}
          </div>

          {/* Butonlar */}
          <div className="flex gap-2 pt-1 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-amber-600 text-white rounded py-2 hover:bg-amber-700 transition"
            >
              Kapat
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!hasFilter}
              className="flex-1 bg-gray-200 text-gray-700 rounded py-2 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Temizle
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
