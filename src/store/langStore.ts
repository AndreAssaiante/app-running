import { create } from "zustand";

export type Langs = "pt" | "en" | "es" | "de" | "fr";

interface LangState {
  lang: Langs;
  setLang: (lang: Langs) => void;
}

export const useLangStore = create<LangState>()((set) => ({
  lang: "pt",
  setLang: (lang) => set({ lang }),
}));
