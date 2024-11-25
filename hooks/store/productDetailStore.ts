import { create } from "zustand";

interface ProductDetailStore {
  isVisible: boolean;
  product: Product | null;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;
}

export const useProductDetailStore = create<ProductDetailStore>((set) => ({
  isVisible: false,
  product: null,
  openProductDetails: (product) => set({ isVisible: true, product }),
  closeProductDetails: () => set({ isVisible: false, product: null }),
}));
