// store/onboardingValidation.ts
import { create } from "zustand";

interface OnboardingValidationState {
  isValid: boolean;
  setValid: (val: boolean) => void;
}

export const useOnboardingValidation = create<OnboardingValidationState>((set) => ({
  isValid: true,
  setValid: (val) => set({ isValid: val }),
}));
