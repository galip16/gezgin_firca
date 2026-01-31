import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import { ProductInCart } from "@/lib/types"

type CreateOrderBody = {
  items: ProductInCart[]
}

export async function POST(req: Request) {
  try {
    const body: CreateOrderBody = await req.json()
    const { items } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Sepet boş" },
        { status: 400 }
      )
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // orders
    const { data: order, error: orderError } = await supabaseServer
      .from("orders")
      .insert({
        total,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) throw orderError

    // order_items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      price: item.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabaseServer
      .from("order_items")
      .insert(orderItems)

    if (itemsError) throw itemsError

    return NextResponse.json({
      success: true,
      orderId: order.id,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Sipariş oluşturulamadı" },
      { status: 500 }
    )
  }
}
