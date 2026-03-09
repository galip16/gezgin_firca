"use client"

import { useState, useEffect } from "react"
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
  const { addItem } = useCart()

  useEffect(() => {
    getProducts().then((data) => setProducts(data ?? []))
  }, [])

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      {/* --- Logo Alanı --- */}
      <div className="flex flex-col items-center mb-4 pt-4 select-none">
        <div className="flex items-center tracking-tighter">
          <span className="text-4xl sm:text-5xl font-extrabold text-[#0A4F8E] lowercase">
            gezgin
          </span>
          <span className="text-4xl sm:text-5xl font-light text-[#008080] lowercase ml-1">
            temizlik
          </span>
        </div>
        <div className="h-1 w-24 bg-linear-to-r from-[#0A4F8E] to-[#008080] mt-2 rounded-full opacity-50" />
      </div>

      {/* Filtre + Arama alanı */}
      <div className="flex flex-wrap flex-row items-start sm:items-center gap-4 mb-4 max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A4F8E]/20 border-gray-300"
        />


        <div className="flex gap-4 m-auto" >
          <CartButton />
        <FilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClear={() => { setSelectedCategory("all"); setSearchTerm("") }}
        />
        </div>
      </div>

      {/* Ürün Listesi Bölümü */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-10">Ürün bulunamadı</p>
        )}
      </div>

      <FloatingContactButton />
    </div>
  )
}