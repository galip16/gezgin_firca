"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/lib/types"
import { useCart } from "@/lib/store/cart"

import ProductCard from "./ProductCard"
import FilterPanel from "./FilterPanel"
import FloatingContactButton from "./FloatingContactButton"
import CartButton from "./CartButton"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const { addItem } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const normalizeText = (text: string) => {
    return text
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  const searchWords = normalizeText(searchTerm)
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const filteredProducts = products.filter((product) => {
    // Kategori filtresi
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory

    // Arama yapılmıyorsa bütün ürünler kategoriye göre gösterilir
    if (searchWords.length === 0) {
      return matchesCategory
    }

    // Aranabilecek bütün ürün bilgilerini birleştiriyoruz
    const searchableText = normalizeText(
      [
        product.name,
        product.description,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
    )

    // Girilen bütün kelimelerin ürün bilgilerinde bulunması gerekiyor
    const matchesSearch = searchWords.every((word) =>
      searchableText.includes(word)
    )

    return matchesCategory && matchesSearch
  })

  const clearFilters = () => {
    setSelectedCategory("all")
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      {/* Logo */}
      <Link
        href="/"
        className="flex flex-col items-center mb-4 pt-4 select-none cursor-pointer"
        aria-label="Gezgin Temizlik ana sayfa"
      >
        <div className="flex items-center tracking-tighter">
          <span className="text-4xl sm:text-5xl font-extrabold text-[#0A4F8E] lowercase">
            gezgin
          </span>

          <span className="text-4xl sm:text-5xl font-light text-[#008080] lowercase ml-1">
            temizlik
          </span>
        </div>

        <div className="h-1 w-24 bg-linear-to-r from-[#0A4F8E] to-[#008080] mt-2 rounded-full opacity-50" />
      </Link>

      {/* Sticky kontrol alanı */}
      <div className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-sm -mx-4 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-3">

          {/* Arama */}
          <div className="flex-1 min-w-0">
            <input
              id="search"
              type="search"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Ürün ara"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4F8E]/20 focus:border-[#0A4F8E] transition"
            />
          </div>

          {/* Sepet + Filtre */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <CartButton />

            <FilterPanel
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onClear={clearFilters}
            />
          </div>
        </div>
      </div>

      {/* Ürünler */}
      <div className="max-w-7xl mx-auto mt-4">

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-500">
              Ürünler yükleniyor...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addItem}
                />
              ))}
            </div>

            {/* Sonuç bulunamadı */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">
                  Ürün bulunamadı
                </p>

                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 text-sm text-[#0A4F8E] hover:underline"
                  >
                    Filtreleri temizle
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* İletişim */}
      <FloatingContactButton />
    </div>
  )
}