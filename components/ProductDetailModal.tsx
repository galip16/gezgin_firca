"use client"

import { useEffect } from "react"
import { Product, ProductInCart } from "@/lib/types"

type Props = {
  product: Product
  cartQuantity: number
  onAdd: (product: ProductInCart) => void
  onIncrease: (productId: string) => void
  onDecrease: (productId: string) => void
  onRemove: (productId: string) => void
  onClose: () => void
}

export default function ProductDetailModal({
  product,
  cartQuantity,
  onAdd,
  onIncrease,
  onDecrease,
  onRemove,
  onClose,
}: Props) {
  const isInCart = cartQuantity > 0

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const handleAddToCart = () => {
    onAdd({
      ...product,
      quantity: 1,
    })
  }

  const handleDecrease = () => {
    if (cartQuantity === 1) {
      onRemove(product.id)
      return
    }

    onDecrease(product.id)
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Arka plan */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Kapat */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Ürün detayını kapat"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>

        {/* Mobil üst tutacak */}
        <div className="sm:hidden flex justify-center pt-2">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        <div className="overflow-y-auto">
          {/* Görsel */}
          <div className="h-56 sm:h-64 bg-gray-50 flex items-center justify-center p-6">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-12 h-12"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                  />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 15-5-5L5 21"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* İçerik */}
          <div className="p-4 sm:p-6">
            <h2
              id="product-detail-title"
              className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight pr-8"
            >
              {product.name}
            </h2>

            {product.description && (
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="mt-5">
              <p className="text-xl font-bold text-gray-900">
                {product.price.toFixed(2)} ₺
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                / {product.unit || "adet"}
              </p>
            </div>

            {/* Sepet aksiyonu */}
            {!isInCart ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full mt-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition active:scale-[0.98]"
              >
                Sepete Ekle
              </button>
            ) : (
              <div className="mt-6 flex items-center border border-gray-200 rounded-xl overflow-hidden">
                {/* Azalt / Sil */}
                <button
                  type="button"
                  onClick={handleDecrease}
                  aria-label={
                    cartQuantity === 1
                      ? "Ürünü sepetten çıkar"
                      : "Adeti azalt"
                  }
                  className="w-14 h-12 shrink-0 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95 transition"
                >
                  {cartQuantity === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5 text-red-500"
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
                  ) : (
                    <span className="text-xl">−</span>
                  )}
                </button>

                {/* Adet */}
                <div className="flex-1 h-12 flex items-center justify-center font-semibold text-gray-900">
                  {cartQuantity}{" "}
                  {cartQuantity === 1 ? "Adet" : "Adet"}
                </div>

                {/* Artır */}
                <button
                  type="button"
                  onClick={() => onIncrease(product.id)}
                  aria-label="Adeti artır"
                  className="w-14 h-12 shrink-0 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95 transition text-xl"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}