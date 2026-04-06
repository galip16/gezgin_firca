"use client"

import Link from "next/link"
import { useCart } from "@/lib/store/cart"

export default function CartButton() {
  const { items } = useCart()

  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Link
      href="/cart"
      className="z-50 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-amber-700 transition relative"
    >
      Sepet
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-800 text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
          {count}
        </span>
      )}
    </Link>
  )
}
