export const CATEGORY_LABELS: Record<string, string> = {
  firca: "Fırça",
  yersil: "Yer Sil",
  camsil: "Cam Sil",
  mop: "Paspas (Mop)",
  sap: "Sap",
  bez: "Bez",
  toz_alici: "Toz Alıcı",
  supurge: "Süpürge",
  deterjan: "Deterjan",
  kova: "Kova",
}

export type Product = {
  id: string
  name: string
  description?: string
  price: number
  unit?: string
  image_url?: string
  category: keyof typeof CATEGORY_LABELS
}



export type ProductInCart = Product & {
  quantity: number
}


