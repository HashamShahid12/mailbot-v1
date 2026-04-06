import type { Shop, WarmupData } from "@/types/shop-types";

export interface ShopState {
  shop: Shop | null;
  warmupData: WarmupData | null;
  setAutomationStatus: (key: string, value: boolean) => void;
  isLoading: boolean;
  setShop: (shop: Shop | null) => void;
  clearShop: () => void;
  setLogo: (logo: string) => void;
  setWarmupData: (data: WarmupData) => void;
}
