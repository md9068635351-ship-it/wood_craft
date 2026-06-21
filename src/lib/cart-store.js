import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(persist((set, get) => ({
  items: [],
  isOpen: false,
  addItem(product, quantity = 1) {
    const safeQuantity = Math.max(1, Math.min(Number(product.stock) || 99, quantity));
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) return { items: state.items.map((item) => item.product.id === product.id
        ? { ...item, product, quantity: Math.min(Number(product.stock) || 99, item.quantity + safeQuantity) }
        : item), isOpen: true };
      return { items: [...state.items, { product, quantity: safeQuantity }], isOpen: true };
    });
  },
  removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  updateQuantity(productId, quantity) {
    if (quantity <= 0) return get().removeItem(productId);
    set((state) => ({ items: state.items.map((item) => item.product.id === productId
      ? { ...item, quantity: Math.min(Number(item.product.stock) || 99, Math.max(1, quantity)) }
      : item) }));
  },
  clearCart: () => set({ items: [], isOpen: false }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
}), {
  name: "woodcraft-cart",
  version: 2,
  migrate: () => ({ items: [] }),
  partialize: (state) => ({ items: state.items }),
}));
