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

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-amber-600 text-white px-4 py-2 rounded shadow hover:bg-amber-700 transition"
      >
        Filtrele
      </button>

      {open && (
        <div className="absolute top-12 right-0 z-30 w-64 bg-white border rounded shadow-lg p-4 flex flex-col gap-4">

          {/* Kategoriler */}
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            <label className="flex items-center gap-2 text-sm">
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
              <label key={key} className="flex items-center gap-2 text-sm">
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
          <div className="flex gap-2">
            <button
              onClick={() =>  setOpen(false) }
              className="flex-1 bg-amber-600 text-white rounded py-1 hover:bg-amber-700 transition"
            >
              Kapat
            </button>
            <button
              onClick={onClear}
              className="flex-1 bg-gray-200 text-gray-700 rounded py-1 hover:bg-gray-300 transition"
            >
              Temizle
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
