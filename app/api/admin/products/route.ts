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

    // Mevcut ürünü bul
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

/**
 * Ürünü aktif / pasif yapar
 *
 * PATCH /api/admin/products
 *
 * Body:
 * {
 *   "id": "ürün-id",
 *   "is_active": false
 * }
 */
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

    // Ürünü kontrol et
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

/**
 * Ürünü kalıcı olarak siler
 *
 * DELETE /api/admin/products?id=ürün-id
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Ürün ID gerekli" },
        { status: 400 }
      )
    }

    // Önce ürünü bul
    const { data: product, error: findError } =
      await supabaseAdmin
        .from("products")
        .select("id, name, image_url")
        .eq("id", id)
        .single()

    if (findError || !product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      )
    }

    // Önce database kaydını sil
    const { error: deleteError } =
      await supabaseAdmin
        .from("products")
        .delete()
        .eq("id", id)

    if (deleteError) {
      console.error("Delete Product Error:", deleteError)

      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 }
      )
    }

    // Ürüne ait görseli Storage'dan da sil
    if (product.image_url) {
      try {
        const imageUrl = new URL(product.image_url)

        const marker = "/storage/v1/object/public/product-images/"

        const markerIndex = imageUrl.pathname.indexOf(marker)

        if (markerIndex !== -1) {
          const filePath = decodeURIComponent(
            imageUrl.pathname.substring(
              markerIndex + marker.length
            )
          )

          const { error: storageError } =
            await supabaseAdmin
              .storage
              .from("product-images")
              .remove([filePath])

          if (storageError) {
            // DB'deki ürün silindiği için burada işlemi
            // başarısız saymıyoruz.
            console.error(
              "Product image could not be deleted:",
              storageError
            )
          }
        }
      } catch (imageError) {
        console.error(
          "Image URL parse error:",
          imageError
        )
      }
    }

    return NextResponse.json({
      message: "Ürün kalıcı olarak silindi",
      data: {
        id: product.id,
        name: product.name,
      },
    })
  } catch (err) {
    console.error("DELETE Product Error:", err)

    return NextResponse.json(
      { error: "Ürün silinirken bilinmeyen hata oluştu" },
      { status: 500 }
    )
  }
}