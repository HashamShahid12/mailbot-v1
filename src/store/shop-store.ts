import { create } from "zustand";
import type { ShopState } from "@/types/shop-store-props";
import { useShallow } from "zustand/react/shallow";

// Legacy cleanup: Remove shop-storage from localStorage if it exists to prevent stale data issues
try {
  localStorage.removeItem("shop-storage");
} catch (error) {
  console.error("[ShopStore] Failed to remove legacy shop-storage:", error);
}

export const useShopStore = create<ShopState>()((set) => ({
  shop: null,
  warmupData: null,
  isLoading: true,
  setShop: (shop) => {
    console.log("[ShopStore] setShop called.", {
      shopId: shop?.id,
      shopName: shop?.shop_name,
    });
    set({ shop, isLoading: false });
  },
  clearShop: () => {
    console.log("[ShopStore] clearShop called.");
    set({ shop: null, warmupData: null, isLoading: false });
  },
  setLogo: (logo: string) =>
    set((state) => ({ shop: { ...state.shop, logo } })),
  setWarmupData: (data) => set({ warmupData: data }),
  setAutomationStatus: (key: string, value: boolean) =>
    set((state) => {
      if (!state.shop) return state;

      return {
        shop: {
          ...state.shop,
          shop_settings: {
            ...state.shop.shop_settings,
            [key]: value,
          },
        },
      };
    }),
}));

export const useShop = () =>
  useShopStore(
    useShallow((state) => ({
      shop: state.shop,
      warmupData: state.warmupData,
      setShop: state.setShop,
      clearShop: state.clearShop,
      isLoading: state.isLoading,
      setLogo: state.setLogo,
      setWarmupData: state.setWarmupData,
    })),
  );
