"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/lib/store/cart"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Sepet boşsa cart'a dön
    useEffect(() => {
        if (items.length === 0 && !success) {
            router.push("/")
        }
    }, [items, router, success])


    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleSubmit = async () => {
        if (!form.customer_name || !form.customer_phone || !form.customer_address) {
            alert("Lütfen zorunlu alanları doldurun")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    total,
                    ...form,
                }),
            })

            let data
            try {
                data = await res.json()

            } catch (e) {

                data = { error: "Sunucudan geçerli yanıt gelmedi" }
            }

            if (res.ok && data.success) {
                setOrderId(data.orderId)
                setSuccess(true)
                clear()
            }
            else {


                setError(data.error || "Sipariş oluşturulamadı")
            }
        } catch (err) {
            console.error(err)
            setError("Sipariş sırasında bir hata oluştu. Lütfen tekrar deneyin.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-xl mx-auto p-4 text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">🎉 Siparişiniz alındı!</h2>
                <p className="mb-4">Sipariş No: <strong>{orderId}</strong></p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-2 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
                >
                    Ana sayfaya dön
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <div className="flex items-center p-6" >
                <h1 className="text-2xl font-bold ">🧾 Özet</h1>

                {error && <p className="text-red-600 mb-2">{error}</p>}

                <Link
                    href="/"
                    className="text-amber-600 hover:underline text-sm absolute right-0 me-12"
                >
                    ← Ana sayfaya dön
                </Link>
            </div>


            <input
                placeholder="Ad Soyad *"
                className="w-full border p-2 mb-2"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
            />
            <input
                placeholder="Firma Adı"
                className="w-full border p-2 mb-2"
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            />
            <input
                placeholder="Telefon *"
                className="w-full border p-2 mb-2"
                value={form.customer_phone}
                onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
            />
            <textarea
                placeholder="Adres *"
                className="w-full border p-2 mb-2"
                value={form.customer_address}
                onChange={(e) => setForm({ ...form, customer_address: e.target.value })}
            />
            <textarea
                placeholder="Sipariş Notu"
                className="w-full border p-2 mb-2"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            <p className="font-semibold mt-4">Toplam: {total.toFixed(2)} ₺</p>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-6 w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"}`}
            >
                {loading ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
            </button>
        </div>
    )
}
