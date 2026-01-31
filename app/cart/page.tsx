"use client"

import { useCart } from "@/lib/store/cart"
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function CartPage() {

    const { items, removeItem, clear } = useCart();
    const router = useRouter();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (items.length === 0) {
        return (<div>
            <Link
                href="/"
                className="text-amber-600 hover:underline text-sm absolute right-0 me-12"
            >
                ← Ana sayfaya dön
            </Link>
            <p className="m-4">Sepetiniz boş</p>
        </div>)
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">🧺 Sepetiniz</h1>

            {items.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.name} × {item.quantity}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500">✕</button>
                </div>
            ))}

            <p className="mt-4 font-semibold">
                Toplam: {total.toFixed(2)} ₺
            </p>

            <button
                onClick={() => router.push("/checkout")}
                className="mt-6 w-full bg-amber-600 text-white py-2 rounded cursor-pointer hover:bg-amber-700 "
            >
                Siparişi Onayla
            </button>
        </div>
    )
}
