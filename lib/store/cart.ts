import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ProductInCart } from "@/lib/types"

type CartState = {
  items: ProductInCart[]
  addItem: (product: ProductInCart) => void
  removeItem: (id: string) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items
        const existing = items.find((i) => i.id === product.id)

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + product.quantity }
                : i
            ),
          })
        } else {
          set({ items: [...items, product] })
        }
      },

      increase: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
)