import { supabaseAdmin } from "@/lib/supabase/admin"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const unit = formData.get("unit") as string
    const category = formData.get("category") as string
    const file = formData.get("imageFile") as File | null

    if (!name || !price) {
      return NextResponse.json({ error: "Ürün adı ve fiyat gerekli" }, { status: 400 })
    }

    let imageUrl: string | null = null

    if (file) {
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      const fileName = `${Date.now()}-${file.name}`

      const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from("products-images")
        .upload(`products/${fileName}`, uint8Array, { contentType: file.type })

      if (uploadError) {
        console.log(uploadError);
        
        console.error("Supabase Storage Error:", uploadError)
        return NextResponse.json({ error: "Görsel yüklenirken hata oluştu", uploadError }, { status: 500 })
      }

      const { data } = supabaseAdmin
        .storage
        .from("products-images")
        .getPublicUrl(uploadData.path)

      imageUrl = data.publicUrl
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .insert([
        { name, description, price, unit, category, image_url: imageUrl, is_active: true, created_at: new Date().toISOString() }
      ])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error("API Error:", err)
    return NextResponse.json({ error: "Bilinmeyen hata" }, { status: 500 })
  }
}
