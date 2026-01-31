"use client"

import { useState } from "react"
import { CATEGORY_LABELS } from "@/lib/types"
import Link from "next/link"

export default function AdminProductForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [unit, setUnit] = useState("")
  const [category, setCategory] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("unit", unit)
    formData.append("category", category)
    if (imageFile) formData.append("imageFile", imageFile)

    const res = await fetch("/api/admin/products", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess("Ürün başarıyla eklendi")
      setError("")
      setName("")
      setDescription("")
      setPrice(0)
      setUnit("")
      setCategory("")
      setImageFile(null)
    } else {
      setError(data.error || "Bilinmeyen hata")
      setSuccess("")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 inline-block">Yeni Ürün Ekle</h1>
       <Link
        href="/"
        className="text-amber-600 hover:underline text-sm absolute right-0 me-12"
      >
        ← Ana sayfaya dön
      </Link>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Ürün adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Birim (adet, kg...)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Kategori seçiniz</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
        >
          Kaydet
        </button>
      </form>
    </div>
  )
}
