"use client"

import { useCart } from "@/lib/store/cart"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const router = useRouter()

  const [form, setForm] = useState({
    customer_name: "",
    company_name: "",
    customer_phone: "",
    customer_address: "",
    note: "",
  })

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = async () => {
    if (!form.customer_name || !form.customer_phone || !form.customer_address) {
      alert("Lütfen zorunlu alanları doldurun")
      return
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total,
        ...form,
      }),
    })

    if (res.ok) {
      clear()
      const data = await res.json()
      router.push(`/order-success?orderId=${data.orderId}`)
    } else {
      alert("Sipariş oluşturulamadı")
    }
  }

  if (items.length === 0) {
    router.push("/")
    return null
  }

  return (
    <div className="max-w-xl mx-auto p-4">
                    <Link
                href="/"
                className="text-amber-600 hover:underline text-sm absolute right-0 me-12"
            >
                ← Ana sayfaya dön
            </Link>
      <h1 className="text-2xl font-bold mb-4">🧾 Checkout</h1>

      <input
        placeholder="Ad Soyad *"
        className="w-full border p-2 mb-2"
        value={form.customer_name}
        onChange={(e) =>
          setForm({ ...form, customer_name: e.target.value })
        }
      />

      <input
        placeholder="Firma Adı"
        className="w-full border p-2 mb-2"
        value={form.company_name}
        onChange={(e) =>
          setForm({ ...form, company_name: e.target.value })
        }
      />

      <input
        placeholder="Telefon *"
        className="w-full border p-2 mb-2"
        value={form.customer_phone}
        onChange={(e) =>
          setForm({ ...form, customer_phone: e.target.value })
        }
      />

      <textarea
        placeholder="Adres *"
        className="w-full border p-2 mb-2"
        value={form.customer_address}
        onChange={(e) =>
          setForm({ ...form, customer_address: e.target.value })
        }
      />

      <textarea
        placeholder="Sipariş Notu"
        className="w-full border p-2 mb-2"
        value={form.note}
        onChange={(e) =>
          setForm({ ...form, note: e.target.value })
        }
      />

      <p className="font-semibold mt-4">
        Toplam: {total.toFixed(2)} ₺
      </p>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
      >
        Siparişi Tamamla
      </button>
    </div>
  )
}
