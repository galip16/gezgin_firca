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
    <div className="border rounded-lg p-4 flex flex-col gap-2">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-24 md:h-40 object-contain rounded-md" />
      )}

      <h2 className="font-bold text-lg">{product.name}</h2>
      {product.description && <p className="text-gray-600">{product.description}</p>}
      <p className="font-semibold">{product.price.toFixed(2)} ₺ / {product.unit || "adet"}</p>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => onAdd({ ...product, quantity })}
          className="bg-amber-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  )
}
