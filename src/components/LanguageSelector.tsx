import React from "react";
import { useLangStore } from "../store/langStore";

const LANGS = [
  { code: "pt", label: "🇧🇷 Português" },
  { code: "en", label: "🇺🇸 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "fr", label: "🇫🇷 Français" }
];

export default function LanguageSelector() {
  const { lang, setLang } = useLangStore();

  return (
    <div className="flex gap-2 mb-4 items-center">
      <span className="font-medium">Idioma:</span>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as any)}
          className={`px-2 py-1 rounded transition ${
            lang === l.code
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
