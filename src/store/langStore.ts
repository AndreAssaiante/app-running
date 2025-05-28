import { create } from "zustand";

type Langs = "pt" | "en";

interface LangState {
  lang: Langs;
  setLang: (lang: Langs) => void;
}

export const useLangStore = create<LangState>()((set) => ({
  lang: "pt", // Idioma padrão inicial (pt ou en)
  setLang: (lang) => set({ lang }),
}));
