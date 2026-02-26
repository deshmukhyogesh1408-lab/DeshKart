"use client";

import { create } from "zustand";

interface UIStore {
  isMobileMenuOpen: boolean;
  isCartSheetOpen: boolean;
  isSearchOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
  toggleCartSheet: () => void;
  setCartSheet: (open: boolean) => void;
  toggleSearch: () => void;
  setSearch: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isMobileMenuOpen: false,
  isCartSheetOpen: false,
  isSearchOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),

  toggleCartSheet: () =>
    set((state) => ({ isCartSheetOpen: !state.isCartSheetOpen })),
  setCartSheet: (open) => set({ isCartSheetOpen: open }),

  toggleSearch: () =>
    set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearch: (open) => set({ isSearchOpen: open }),
}));
