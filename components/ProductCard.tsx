"use client"

import { useState } from "react"
import { Product, ProductInCart } from "@/lib/types"

type Props = {
  product: Product
  onAdd: (product: ProductInCart) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1)

  return (
    // p-4 yerine p-2 (mobilde), font boyutlarını küçülttük
    <div className="border rounded-lg p-2 sm:p-4 flex flex-col gap-1 sm:gap-2 bg-white shadow-sm">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          // Mobilde h-24 yerine h-20 veya h-28 ihtiyaca göre ayarlanabilir
          className="w-full h-28 md:h-40 object-contain rounded-md bg-gray-50" 
        />
      )}

      <h2 className="font-bold text-sm sm:text-lg line-clamp-1">{product.name}</h2>
      
      {product.description && (
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-tight">
          {product.description}
        </p>
      )}
      
      <p className="font-semibold text-sm sm:text-base mt-auto">
        {product.price.toFixed(2)} ₺ <span className="text-[10px] font-normal text-gray-500">/ {product.unit || "adet"}</span>
      </p>

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => onAdd({ ...product, quantity })}
          className="w-full bg-amber-600 text-white py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-amber-700 transition-colors"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  )
}