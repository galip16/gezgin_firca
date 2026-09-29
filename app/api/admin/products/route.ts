import { supabaseAdmin } from "@/lib/supabase/admin"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error("GET Products Error:", err)

    return NextResponse.json(
      { error: "Ürünler alınırken hata oluştu" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const unit = formData.get("unit") as string
    const category = formData.get("category") as string
    const file = formData.get("imageFile") as File | null

    if (!name || Number.isNaN(price)) {
      return NextResponse.json(
        { error: "Ürün adı ve geçerli bir fiyat gerekli" },
        { status: 400 }
      )
    }

    let imageUrl: string | null = null

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      const fileName = `${Date.now()}-${file.name}`

      const { data: uploadData, error: uploadError } =
        await supabaseAdmin
          .storage
          .from("product-images")
          .upload(
            `products/${fileName}`,
            uint8Array,
            {
              contentType: file.type,
            }
          )

      if (uploadError) {
        console.error("Supabase Storage Error:", uploadError)

        return NextResponse.json(
          {
            error: "Görsel yüklenirken hata oluştu",
          },
          { status: 500 }
        )
      }

      const { data } = supabaseAdmin
        .storage
        .from("product-images")
        .getPublicUrl(uploadData.path)

      imageUrl = data.publicUrl
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          unit,
          category,
          image_url: imageUrl,
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error("POST Product Error:", err)

    return NextResponse.json(
      { error: "Bilinmeyen hata" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData()

    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const unit = formData.get("unit") as string
    const category = formData.get("category") as string
    const file = formData.get("imageFile") as File | null

    if (!id) {
      return NextResponse.json(
        { error: "Ürün ID gerekli" },
        { status: 400 }
      )
    }

    if (!name || Number.isNaN(price)) {
      return NextResponse.json(
        { error: "Ürün adı ve geçerli bir fiyat gerekli" },
        { status: 400 }
      )
    }

    // Güncellenecek ürünü bul
    const { data: existingProduct, error: existingError } =
      await supabaseAdmin
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

    if (existingError || !existingProduct) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      )
    }

    let imageUrl = existingProduct.image_url

    // Yeni görsel gönderildiyse yükle
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      const fileName = `${Date.now()}-${file.name}`

      const { data: uploadData, error: uploadError } =
        await supabaseAdmin
          .storage
          .from("product-images")
          .upload(
            `products/${fileName}`,
            uint8Array,
            {
              contentType: file.type,
            }
          )

      if (uploadError) {
        console.error("Supabase Storage Error:", uploadError)

        return NextResponse.json(
          {
            error: "Yeni görsel yüklenirken hata oluştu",
          },
          { status: 500 }
        )
      }

      const { data } = supabaseAdmin
        .storage
        .from("product-images")
        .getPublicUrl(uploadData.path)

      imageUrl = data.publicUrl
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .update({
        name,
        description,
        price,
        unit,
        category,
        image_url: imageUrl,
      })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Ürün başarıyla güncellendi",
      data,
    })
  } catch (err) {
    console.error("PUT Product Error:", err)

    return NextResponse.json(
      { error: "Ürün güncellenirken bilinmeyen hata oluştu" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()

    const id = body.id
    const isActive = body.is_active

    if (!id) {
      return NextResponse.json(
        { error: "Ürün ID gerekli" },
        { status: 400 }
      )
    }

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "is_active boolean olmalı" },
        { status: 400 }
      )
    }

    // Ürünün var olup olmadığını kontrol et
    const { data: existingProduct, error: existingError } =
      await supabaseAdmin
        .from("products")
        .select("id, name, is_active")
        .eq("id", id)
        .single()

    if (existingError || !existingProduct) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      )
    }

    // Aktif / pasif durumunu değiştir
    const { data, error } = await supabaseAdmin
      .from("products")
      .update({
        is_active: isActive,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: isActive
        ? "Ürün tekrar aktif edildi"
        : "Ürün pasife alındı",
      data,
    })
  } catch (err) {
    console.error("PATCH Product Error:", err)

    return NextResponse.json(
      { error: "Ürün durumu değiştirilirken hata oluştu" },
      { status: 500 }
    )
  }
}