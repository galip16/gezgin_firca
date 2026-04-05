import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // (opsiyonel ama önerilir) güvenlik
    const auth = request.headers.get("authorization")
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 })
    }

    const order = {
      customer_name: "Test Sipariş",
      customer_phone: "000000",
      customer_address: "Otomatik sipariş",
      total: 100,
      items: [
        {
          id: "dummy",
          name: "Test Ürün",
          price: 100,
          quantity: 1,
        },
      ],
    }

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Cron failed" }, { status: 500 })
  }
}