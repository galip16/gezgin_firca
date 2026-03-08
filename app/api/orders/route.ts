import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import { ProductInCart } from "@/lib/types"
import { sendTelegramMessage } from "@/lib/telegram"
import { rateLimit } from "@/lib/rate-limit"

type CreateOrderBody = {
  items: ProductInCart[]
  customer_name: string
  customer_phone: string
  customer_address: string
  company_name?: string
  note?: string
  total: number
}

export async function POST(req: Request) {

  try {
const ordersUrl = "https://gezgin-firca.vercel.app/admin/orders";
    const ip = req.headers.get("x-forwarded-for") || "unknown"

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderildi" },
        { status: 429 }
      )
    }

    const body: CreateOrderBody = await req.json()
    const { items, customer_name, customer_phone, customer_address, company_name, note, total } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Sepet boş" }, { status: 400 })
    }

    if (!customer_name || !customer_phone || !customer_address) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik" }, { status: 400 })
    }

    // orders
    const { data: order, error: orderError } = await supabaseServer
      .from("orders")
      .insert({
        total,
        status: "pending",
        customer_name,
        customer_phone,
        customer_address,
        company_name,
        note,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Order insert error:", orderError)
      return NextResponse.json({ error: "Sipariş oluşturulamadı" }, { status: 500 })
    }

    // order_items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabaseServer
      .from("order_items")
      .insert(orderItems)

    if (itemsError) {
      console.error("Order items insert error:", itemsError)
      return NextResponse.json({ error: "Sipariş ürünleri kaydedilemedi" }, { status: 500 })
    }

    await sendTelegramMessage(`
📦 Yeni Sipariş!

Müşteri: ${customer_name}
Telefon: ${customer_phone}

Toplam: ${total} ₺
Sipariş No: ${order.id}
Siparise git: ${ordersUrl}/${order.id}
`)

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (err) {
    console.error("Unexpected server error:", err)
    return NextResponse.json({ error: "Sunucuda bir hata oluştu" }, { status: 500 })
  }
}
