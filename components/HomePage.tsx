"use client"

import { useState, useEffect } from "react"
import { getProducts } from "@/lib/supabase/products"
import { Product, ProductInCart } from "@/lib/types"
import { useCart } from "@/lib/store/cart"
import ProductCard from "./ProductCard"
import FilterPanel from "./FilterPanel"
import FloatingCartButton from "./FloatingCartButton"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { addItem } = useCart()

  useEffect(() => {
    getProducts().then((data) => setProducts(data ?? []))
  }, [])

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Filtre + Arama alanı */}
      <div className="flex flex-row items-start sm:items-center gap-4 mb-6">
        {/* Arama */}
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-amber-600"
        />

        {/* Filtre paneli */}
        <FilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClear={() => { setSelectedCategory("all"); setSearchTerm("") }}
        />
      </div>

      {/* Ürün Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-4">Ürün bulunamadı</p>
        )}
      </div>
            <FloatingCartButton />

    </div>
  )
}
