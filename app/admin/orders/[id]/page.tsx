
import PrintButton from "@/components/PrintButton"
import { supabaseServer } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params


    const { data: order, error } = await supabaseServer
        .from("orders")
        .select("*")
        .eq("id", id)
        .single()


    if (error || !order) {
        return notFound()
    }

    const { data: items } = await supabaseServer
        .from("order_items")
        .select("*")
        .eq("order_id", id)

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white print:p-0">

            {/* Başlık */}
            <div className="flex flex-col gap-4 items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Sipariş #{order.id.slice(0, 8)}
                </h1>

                <Link
                    href="/admin/orders"
                    className="text-amber-600 hover:underline text-sm "
                >
                    ← Siparislerim
                </Link>
            </div>

            {/* Müşteri */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Müşteri</h2>

                <p>Isim: {order.customer_name}</p>
                <p>Telefon: {order.customer_phone}</p>

                {order.company_name && (
                    <p>Sirket: {order.company_name}</p>
                )}
                <p>
                    Tarih: {new Date(order.created_at).toLocaleString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>

            {/* Adres */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Adres</h2>
                <p>{order.customer_address}</p>
            </div>

            {/* Not */}
            {order.note && (
                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Not</h2>
                    <p>{order.note}</p>
                </div>
            )}

            {/* Ürünler */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Ürünler</h2>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border text-left">Ürün</th>
                            <th className="p-2 border text-left">Adet</th>
                            <th className="p-2 border text-left">Fiyat</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items?.map((item) => (
                            <tr key={item.id}>
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border">{item.quantity}</td>
                                <td className="p-2 border">{item.price} ₺</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Toplam */}
            <div className="text-right text-lg font-bold">
                Toplam: {order.total} ₺
            </div>

            <div>
                <PrintButton />
            </div>

        </div>
    )
}