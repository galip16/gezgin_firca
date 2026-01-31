"use client"

import Link from "next/link"
import { useCart } from "@/lib/store/cart"

export default function FloatingCartButton() {
  const { items } = useCart()

  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Link
      href="/cart"
      className="fixed bottom-0 right-6 z-50 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg transition"
    >
      🧺
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  )
}
