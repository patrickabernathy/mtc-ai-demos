"use client";

import { createContext, useState } from "react";
import type { MenuItem } from "../types/coffee";

type CartValue = {
  items: MenuItem[];
  setItems: (items: MenuItem[]) => void;
};

// 1. make the box
export const CartContext = createContext<CartValue | null>(null);

// 2. fill it, and wrap whatever should be able to reach in
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
}
