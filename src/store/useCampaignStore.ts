// store/useCampaignStore.ts
import { create } from "zustand";
import type { CampaignTable } from "@/types/user-type";

export interface CampaignForm {
  segment_id: string;
  title: string;
  sending_option: "now" | "scheduled";
  subject: string;
  template_name: string;
  template_id?: string;
  template_json: Record<string, any>;
  template_html: Record<string, any>;
  template_image: string;
  scheduled_date: string | null;
  preview_text: string;
  discount_code: Record<string, any> | null;
}

interface CampaignState {
  campaigns: CampaignTable[];
  currentCampaignId: string | null;
  campaignForm: CampaignForm;
  currentStep: number;
  addCampaign: (campaign: CampaignTable) => void;
  setCurrentCampaignId: (id: string) => void;
  updateCampaignStatus: (id: string, status: string) => void;
  setCampaignForm: (form: Partial<CampaignForm>) => void;
  setCurrentStep: (step: number) => void;
  resetCampaignForm: () => void;
}

const initialFormState: CampaignForm = {
  segment_id: "",
  title: "",
  sending_option: "now",
  subject: "",
  template_name: "",
  template_json: {},
  template_html: {},
  template_image: "",
  scheduled_date: null,
  preview_text: "",
  discount_code: null,
};

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  currentCampaignId: null,
  campaignForm: initialFormState,
  currentStep: 0,
  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),
  setCurrentCampaignId: (id) => set({ currentCampaignId: id }),
  updateCampaignStatus: (id, status) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, status } : c,
      ),
    })),
  setCampaignForm: (updates) =>
    set((state) => ({
      campaignForm: { ...state.campaignForm, ...updates },
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetCampaignForm: () =>
    set({ campaignForm: initialFormState, currentStep: 0 }),
}));
