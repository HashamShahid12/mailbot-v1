import type { OnboardingSection } from "@/onboarding/OnboardingFlow";
import { create } from "zustand";

type StepStatus = "pending" | "complete" | "skipped";

type OnboardingProgressState = {
  stepStatus: Record<string, StepStatus>; // step.id
  markComplete: (stepId: string) => void;
  markSkipped: (stepId: string) => void;
  getCompletedSections: (flow: OnboardingSection[]) => { completed: number; total: number };
};

export const useOnboardingProgress = create<OnboardingProgressState>((set, get) => ({
  stepStatus: {},
  markComplete: (stepId) =>
    set((state) => ({
      stepStatus: { ...state.stepStatus, [stepId]: "complete" },
    })),
  markSkipped: (stepId) =>
    set((state) => ({
      stepStatus: { ...state.stepStatus, [stepId]: "skipped" },
    })),
  getCompletedSections: (flow) => {
    const status = get().stepStatus;
    const total = flow.length;
    let completed = 0;

    for (const section of flow) {
      const allSteps = section.steps.map((step) => step.id);
      const allDone = allSteps.every((id) => status[id] === "complete" || status[id] === "skipped");
      if (allDone && allSteps.length > 0) completed++;
    }

    return { completed, total };
  },
}));
