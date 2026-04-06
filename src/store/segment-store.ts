import { create } from "zustand";
import type { SegmentsData } from "@/types/segment-types";

interface SegmentStore {
  segments: SegmentsData | null;
  hasSegments: boolean;
  setSegments: (segments: SegmentsData) => void;
}

export const useSegmentStore = create<SegmentStore>((set) => ({
  segments: null,
  hasSegments: false,
  setSegments: (segments) => set({ segments, hasSegments: true }),
}));
