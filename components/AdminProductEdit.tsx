"use client"

import { useEffect, useRef, useState } from "react"
import { CATEGORY_LABELS } from "@/lib/types"
import Link from "next/link"

type Product = {
  id: string
  name: string
  description: string | null
  price: number
  unit: string | null
  category: string
  image_url: string | null
  is_active: boolean
}

export default function AdminProductEdit() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState("")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [unit, setUnit] = useState("")
  const [category, setCategory] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusChanging, setStatusChanging] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/admin/products")
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Ürünler alınamadı")
      }

      setProducts(data.data || [])
    } catch (err) {
      console.error(err)
      setError("Ürünler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setSelectedId("")
    setName("")
    setDescription("")
    setPrice("")
    setUnit("")
    setCategory("")
    setImageFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleProductSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value

    setSelectedId(id)
    setSuccess("")
    setError("")

    const product = products.find(
      (product) => product.id === id
    )

    if (!product) {
      clearForm()
      return
    }

    setName(product.name)
    setDescription(product.description || "")
    setPrice(String(product.price))
    setUnit(product.unit || "")
    setCategory(product.category)
    setImageFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!selectedId) {
      setError("Lütfen bir ürün seçin")
      return
    }

    try {
      setSaving(true)
      setSuccess("")
      setError("")

      const formData = new FormData()

      formData.append("id", selectedId)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("unit", unit)
      formData.append("category", category)

      if (imageFile) {
        formData.append("imageFile", imageFile)
      }

      const res = await fetch(
        "/api/admin/products",
        {
          method: "PUT",
          body: formData,
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "Ürün güncellenemedi"
        )
      }

      setSuccess("Ürün başarıyla güncellendi")

      await loadProducts()

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      setImageFile(null)
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Ürün güncellenirken hata oluştu"
      )
    } finally {
      setSaving(false)
    }
  }

  // Aktif / Pasif değiştirme
  const handleToggleActive = async () => {
    if (!selectedProduct) return

    const newStatus = !selectedProduct.is_active

    try {
      setStatusChanging(true)
      setSuccess("")
      setError("")

      const res = await fetch(
        "/api/admin/products",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedProduct.id,
            is_active: newStatus,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "Ürün durumu değiştirilemedi"
        )
      }

      setSuccess(
        newStatus
          ? "Ürün tekrar aktif edildi"
          : "Ürün pasife alındı"
      )

      await loadProducts()
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Ürün durumu değiştirilirken hata oluştu"
      )
    } finally {
      setStatusChanging(false)
    }
  }

  // Kalıcı silme
  const handleDelete = async () => {
    if (!selectedProduct) return

    const confirmed = window.confirm(
      `"${selectedProduct.name}" ürününü kalıcı olarak silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz.`
    )

    if (!confirmed) {
      return
    }

    try {
      setDeleting(true)
      setSuccess("")
      setError("")

      const res = await fetch(
        `/api/admin/products?id=${selectedProduct.id}`,
        {
          method: "DELETE",
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "Ürün silinemedi"
        )
      }

      setSuccess("Ürün kalıcı olarak silindi")

      clearForm()

      await loadProducts()
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Ürün silinirken hata oluştu"
      )
    } finally {
      setDeleting(false)
    }
  }

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  )

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Ürün Güncelleme
        </h1>

        <Link
          href="/admin"
          className="text-amber-600 hover:underline text-sm"
        >
          ← Admin Panel
        </Link>
      </div>

      {success && (
        <p className="text-green-600 mb-4">
          {success}
        </p>
      )}

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {loading ? (
        <p>Ürünler yükleniyor...</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Güncellenecek ürün
            </label>

            <select
              value={selectedId}
              onChange={handleProductSelect}
              className="border p-2 rounded w-full"
            >
              <option value="">
                Ürün seçiniz
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} - {product.price} TL
                  {!product.is_active
                    ? " (Pasif)"
                    : ""}
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="mb-5">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedProduct.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    selectedProduct.is_active
                      ? "bg-green-500"
                      : "bg-slate-400"
                  }`}
                />

                {selectedProduct.is_active
                  ? "Aktif ürün"
                  : "Pasif ürün"}
              </div>
            </div>
          )}

          {selectedId && selectedProduct && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Ürün adı"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Açıklama"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Fiyat"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                required
                className="border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Birim (adet, kg...)"
                value={unit}
                onChange={(e) =>
                  setUnit(e.target.value)
                }
                className="border p-2 rounded"
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="border p-2 rounded"
                required
              >
                <option value="">
                  Kategori seçiniz
                </option>

                {Object.entries(
                  CATEGORY_LABELS
                ).map(([key, label]) => (
                  <option
                    key={key}
                    value={key}
                  >
                    {label}
                  </option>
                ))}
              </select>

              {selectedProduct.image_url && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Mevcut görsel
                  </p>

                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) =>
                  setImageFile(
                    e.target.files?.[0] || null
                  )
                }
                className="border p-2 rounded"
              />

              <button
                type="submit"
                disabled={
                  saving ||
                  statusChanging ||
                  deleting
                }
                className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700 disabled:opacity-50"
              >
                {saving
                  ? "Güncelleniyor..."
                  : "Ürünü Güncelle"}
              </button>

              {/* Ürün durumu */}
              <button
                type="button"
                onClick={handleToggleActive}
                disabled={
                  saving ||
                  statusChanging ||
                  deleting
                }
                className={`py-2 rounded font-medium border disabled:opacity-50 ${
                  selectedProduct.is_active
                    ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                    : "border-green-300 text-green-700 hover:bg-green-50"
                }`}
              >
                {statusChanging
                  ? "İşlem yapılıyor..."
                  : selectedProduct.is_active
                    ? "Ürünü Pasife Al"
                    : "Ürünü Aktif Et"}
              </button>

              {/* Kalıcı silme */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  saving ||
                  statusChanging ||
                  deleting
                }
                className="py-2 rounded font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting
                  ? "Siliniyor..."
                  : "Ürünü Kalıcı Olarak Sil"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  )
}