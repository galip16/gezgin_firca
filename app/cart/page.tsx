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

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

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
      <div className="max-w-xl mx-auto px-3 sm:px-4 pt-4 pb-32">

        {/* Başlık */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">
            🧺 Sepetiniz
          </h1>

          <Link
            href="/"
            className="text-sm text-[#0A4F8E] hover:underline"
          >
            Alışverişe devam et
          </Link>
        </div>

        {/* Ürünler */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 shadow-sm"
            >
              <div className="flex items-center gap-3">

                {/* Ürün resmi */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xl text-gray-300">
                      🧴
                    </span>
                  )}
                </div>

                {/* Ürün bilgileri */}
                <div className="flex-1 min-w-0">

                  <h2 className="font-medium text-sm sm:text-base text-gray-900 leading-tight line-clamp-2">
                    {item.name}
                  </h2>

                  {/* Alt satır */}
                  <div className="flex items-center justify-between gap-2 mt-2">

                    {/* Adet kontrolü */}
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden shrink-0">

                      <button
                        type="button"
                        onClick={() => decrease(item.id)}
                        aria-label={`${item.name} adetini azalt`}
                        className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95 transition"
                      >
                        −
                      </button>

                      <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increase(item.id)}
                        aria-label={`${item.name} adetini artır`}
                        className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Fiyat */}
                    <span className="font-semibold text-sm text-gray-900 whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} ₺
                    </span>
                  </div>
                </div>

                {/* Sil */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`${item.name} ürününü sepetten kaldır`}
                  className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 active:scale-95 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 6h18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 6V4h8v2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 6l-1 14H6L5 6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 11v5M14 11v5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky toplam / sipariş alanı */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 sm:p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40">
        <div className="max-w-xl mx-auto space-y-2.5">

          {/* Toplam */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Toplam
            </span>

            <span className="text-lg font-bold text-gray-900">
              {total.toFixed(2)} ₺
            </span>
          </div>

          {/* Butonlar */}
          <div className="flex gap-2.5">
            <Link
              href="/"
              className="flex-1 text-center border border-amber-600 text-amber-600 py-2.5 rounded-lg hover:bg-amber-50 active:scale-[0.98] transition font-medium text-sm"
            >
              Anasayfa
            </Link>

            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg hover:bg-amber-700 active:scale-[0.98] transition font-medium text-sm"
            >
              Sipariş ver
            </button>
          </div>
        </div>
      </div>
    </>
  )
}