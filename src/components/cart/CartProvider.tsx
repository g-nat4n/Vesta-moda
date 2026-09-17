"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types";

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => { ok: boolean; message: string };
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vesta-cart";

function withList(current: CartItem[] | null, next: (items: CartItem[]) => CartItem[]) {
  return next(current ?? []);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw) as CartItem[]);
        return;
      } catch {
        setItems([]);
        return;
      }
    }
    setItems([]);
  }, []);

  useEffect(() => {
    if (items) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const list = items ?? [];

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: CartItem) => {
      const existing = list.find((entry) => entry.productId === item.productId);
      if (existing) {
        if (item.uniquePiece || existing.quantity >= item.stock) {
          setIsOpen(true);
          return { ok: false, message: "Esta peça já está na sua sacola." };
        }
        setItems((current) =>
          withList(current, (entries) =>
            entries.map((entry) =>
              entry.productId === item.productId
                ? { ...entry, quantity: Math.min(entry.quantity + item.quantity, item.stock) }
                : entry,
            ),
          ),
        );
        setIsOpen(true);
        return { ok: true, message: "Quantidade atualizada na sacola." };
      }
      setItems((current) =>
        withList(current, (entries) => [...entries, { ...item, quantity: Math.min(item.quantity, item.stock) }]),
      );
      setIsOpen(true);
      return { ok: true, message: "Peça adicionada à sacola." };
    };

    return {
      items: list,
      hydrated: items !== null,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (productId) =>
        setItems((current) => withList(current, (entries) => entries.filter((item) => item.productId !== productId))),
      setQuantity: (productId, quantity) =>
        setItems((current) =>
          withList(current, (entries) =>
            entries.map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
                : item,
            ),
          ),
        ),
      clear: () => setItems([]),
      count: list.reduce((sum, item) => sum + item.quantity, 0),
      subtotalCents: list.reduce((sum, item) => sum + item.priceCents * item.quantity, 0),
    };
  }, [list, isOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
