
import { supabaseServer } from "@/lib/supabase/server"
import Link from "next/link"

export default async function OrdersPage() {
    const { data: orders, error } = await supabaseServer
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        return <p className="p-4 text-red-500">Siparişler yüklenemedi</p>
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">📦 Siparişler</h1>
            <Link
                href="/admin"
                className="text-amber-600 hover:underline text-sm absolute top-4 right-0 me-12"
            >
                ← Admin Panel
            </Link>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">Sipariş</th>
                        <th className="p-2 border">Müşteri</th>
                        <th className="p-2 border">Telefon</th>
                        <th className="p-2 border">Toplam</th>
                        <th className="p-2 border">Tarih</th>
                        <th className="p-2 border">İşlem</th>
                    </tr>
                </thead>

                <tbody>
                    {orders?.map((order) => (
                        <tr key={order.id}>
                            <td className="p-2 border">{order.id.slice(0, 8)}</td>

                            <td className="p-2 border">
                                {order.customer_name}
                            </td>

                            <td className="p-2 border">
                                {order.customer_phone}
                            </td>

                            <td className="p-2 border">
                                {order.total} ₺
                            </td>

                            <td className="p-2 border">
                                {new Date(order.created_at).toLocaleString()}
                            </td>

                            <td className="p-2 border">
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="text-blue-600 underline"
                                >
                                    Görüntüle
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}