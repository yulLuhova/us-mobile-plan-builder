import { create } from "zustand";

export interface PlanState {
  data: string;
  talk: string;
  text: string;
  setData: (data: string) => void;
  setTalk: (talk: string) => void;
  setText: (text: string) => void;
  saveSettings: () => void;
  resetSettings: () => void;
}

export const LOCAL_STORAGE_KEY = "mobilePlanSettings";

const DEFAULT_PLAN = { data: "5GB", talk: "none", text: "none" };

const getInitialState = (): { data: string; talk: string; text: string } => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error parsing local storage", err);
      }
    }
  }

  return DEFAULT_PLAN;
};

export const usePlanStore = create<PlanState>((set, get) => ({
  ...getInitialState(),
  setData: (data: string) => set({ data }),
  setTalk: (talk: string) => set({ talk }),
  setText: (text: string) => set({ text }),
  saveSettings: () => {
    const { data, talk, text } = get();
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ data, talk, text }),
    );
  },
  resetSettings: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set(DEFAULT_PLAN);
  },
}));
