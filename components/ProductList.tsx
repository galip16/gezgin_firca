"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/lib/types"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/lib/store/cart"

type Props = {
  selectedCategory: string
  search: string
}

export function ProductList({ selectedCategory, search }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    getProducts().then((data) => setProducts(data ?? []))
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (filteredProducts.length === 0) {
    return <p className="text-gray-500">Ürün bulunamadı</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={addItem}
        />
      ))}
    </div>
  )
}
