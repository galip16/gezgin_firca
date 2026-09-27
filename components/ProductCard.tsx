"use client"

import { useState } from "react"
import { Product, ProductInCart } from "@/lib/types"
import { useCart } from "@/lib/store/cart"
import ProductDetailModal from "./ProductDetailModal"

type Props = {
  product: Product
  onAdd: (product: ProductInCart) => void
}

export default function ProductCard({
  product,
  onAdd,
}: Props) {
  const [showDetail, setShowDetail] = useState(false)
  const [added, setAdded] = useState(false)

  const {
    items,
    increase,
    decrease,
    removeItem,
  } = useCart()

  const cartItem = items.find(
    (item) => item.id === product.id
  )

  const cartQuantity = cartItem?.quantity ?? 0
  const isInCart = cartQuantity > 0

  const handleAdd = () => {
    onAdd({
      ...product,
      quantity: 1,
    })

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <>
      <div
        className="h-full border rounded-lg p-2 sm:p-3 flex flex-col gap-1 bg-white shadow-sm cursor-pointer transition hover:shadow-md active:scale-[0.99]"
        onClick={() => setShowDetail(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault()
            setShowDetail(true)
          }
        }}
        aria-label={`${product.name} ürün detayını aç`}
      >
        {/* Ürün görseli */}
        <div className="relative w-full h-24 sm:h-28 md:h-36 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
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
                className="w-7 h-7"
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

          {/* Sepetteki adet */}
          {isInCart && (
            <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[11px] sm:text-xs font-bold min-w-7 h-7 px-1.5 rounded-full flex items-center justify-center shadow-sm">
              ×{cartQuantity}
            </span>
          )}
        </div>

        {/* Ürün adı */}
        <h2 className="font-bold text-sm sm:text-base line-clamp-2 leading-tight">
          {product.name}
        </h2>

        {/* Açıklama */}
        {product.description && (
          <p className="text-gray-500 text-[11px] sm:text-xs line-clamp-1 leading-tight">
            {product.description}
          </p>
        )}

        {/* Fiyat */}
        <p className="font-semibold text-sm sm:text-base mt-auto pt-1">
          {product.price.toFixed(2)} ₺{" "}
          <span className="text-[9px] sm:text-[10px] font-normal text-gray-500">
            / {product.unit || "adet"}
          </span>
        </p>

        {/* Sepete ekle */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            handleAdd()
          }}
          className={`w-full py-1.5 rounded font-medium text-xs sm:text-sm text-white transition ${
            added
              ? "bg-blue-600"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {added ? "✓ Eklendi" : "Sepete Ekle"}
        </button>
      </div>

      {showDetail && (
        <ProductDetailModal
          product={product}
          cartQuantity={cartQuantity}
          onAdd={onAdd}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={removeItem}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}