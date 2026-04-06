"use client"

import { useCart } from "@/lib/store/cart"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { items, removeItem, decrease, increase } = useCart()
  const router = useRouter()

  if (!mounted) return null

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">🧺</div>

        <h2 className="text-2xl font-bold mb-2">
          Sepetiniz boş
        </h2>

        <p className="text-gray-500 mb-6">
          Henüz sepete ürün eklemediniz.
        </p>

        <Link
          href="/"
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-xl mx-auto p-4 pb-28">
        <h1 className="text-2xl font-bold mb-4">🧺 Sepetiniz</h1>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-3 border-b pb-2"
          >
            <span className="font-medium">{item.name}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item.id)}
                className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 active:scale-90 transition"
              >
                −
              </button>

              <span className="min-w-5 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increase(item.id)}
                className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 active:scale-90 transition"
              >
                +
              </button>
            </div>

            <span className="w-20 text-right text-sm">
              {(item.price * item.quantity).toFixed(2)} ₺
            </span>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
        <div className="max-w-xl mx-auto space-y-2">

          <div className="flex justify-between font-semibold">
            <span>Toplam</span>
            <span>{total.toFixed(2)} ₺</span>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 text-center border border-amber-600 text-amber-600 py-2 rounded hover:bg-amber-50"
            >
              Anasayfa
            </Link>

            <button
              onClick={() => router.push("/checkout")}
              className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
            >
              Siparis ver
            </button>
          </div>
        </div>
      </div>
    </>
  )
}