import { create } from "zustand"
import { ProductInCart } from "@/lib/types"

type CartState = {
  items: ProductInCart[]
  addItem: (product: ProductInCart) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + product.quantity }
              : i
          ),
        }
      }

      return {
        items: [...state.items, product],
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clear: () => set({ items: [] }),
}))
