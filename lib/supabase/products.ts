import { supabaseBrowser } from "./client"

export async function getProducts() {
  const { data, error } = await supabaseBrowser
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
