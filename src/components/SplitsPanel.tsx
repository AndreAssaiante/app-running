// src/components/SplitsPanel.tsx
export function SplitsPanel({ splits }: SplitsPanelProps) {
  const t = useTranslation();
  
  return (
    <div className="bg-gray-50 p-4">
      <h3 className="font-bold mb-2">{t("splits")}</h3>
      <div className="max-h-32 overflow-y-auto">
        {splits.map((split, index) => (
          <div key={index} className="flex justify-between py-1 border-b">
            <span>{t("km")} {index + 1}</span>
            <span>{formatPace(split.pace)}</span>
            <span className={`text-sm ${
              split.pace < split.targetPace ? 'text-green-600' : 'text-red-600'
            }`}>
              {split.pace < split.targetPace ? '⬇️' : '⬆️'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
