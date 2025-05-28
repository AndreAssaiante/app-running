import { useLangStore } from "../store/langStore";
import translations from "../locales";

export function useTranslation() {
  const { lang } = useLangStore();
  const t = (key: string) => {
    // Se não encontrar a chave, retorna ela mesma
    return translations[lang][key] || key;
  };
  return t;
}
