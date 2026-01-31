import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import { ProductInCart } from "@/lib/types"

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
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      product_id: item.id,
    }))

    const { error: itemsError } = await supabaseServer
      .from("order_items")
      .insert(orderItems)

    if (itemsError) {
      console.error("Order items insert error:", itemsError)
      return NextResponse.json({ error: "Sipariş ürünleri kaydedilemedi" }, { status: 500 })
    }

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (err) {
    console.error("Unexpected server error:", err)
    return NextResponse.json({ error: "Sunucuda bir hata oluştu" }, { status: 500 })
  }
}
