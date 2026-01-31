"use client"

import { CATEGORY_LABELS } from "@/lib/types"

type Props = {
  selected: string
  onSelect: (category: string) => void
}

export default function CategoryBar({ selected, onSelect }: Props) {
  return (
    <div className="sticky top-0 z-20 bg-white border-b shadow-sm px-4 py-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {/* Tümü Butonu */}
        <button
          onClick={() => onSelect("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${selected === "all" ? "bg-amber-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Tümü
        </button>

        {/* Kategori Butonları */}
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${selected === key ? "bg-amber-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
