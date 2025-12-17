import { useState } from "react";
import { backgroundColor } from "./backgroundTheme/background";
import { color } from "./backgroundTheme/color";
import { ChevronDown } from "lucide-react";

export default function ThemeRibbonContent({
  bgColorKey,
  setBgColorKey,
  colorKey,
  setColorKey,
}) {
  return (
    <div className="flex gap-6">
      <ColorDropdown
        label="Background"
        value={bgColorKey}
        colors={backgroundColor}
        onChange={setBgColorKey}
        hoverClass="hover:bg-blue-200"
      />

      <ColorDropdown
        label="Accent"
        value={colorKey}
        colors={color}
        onChange={setColorKey}
        hoverClass="hover:bg-blue-200"
      />
    </div>
  );
}

function ColorDropdown({ label, value, colors, onChange, hoverClass }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex flex-col items-center w-24 p-2 rounded-2xl transition-colors ${hoverClass}`}
      >
        <div
          className="w-6 h-6 rounded-full border mb-1"
          style={{ background: colors[value] }}
        />

        <span className="text-xs font-medium">{label}</span>

        <ChevronDown size={12} className="text-gray-600 mt-1" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border shadow-xl rounded-xl p-2 w-40 z-50">
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(colors).map((key) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={`w-8 h-8   hover:scale-110 transition
                  ${key === value ? "ring-2 ring-black/25" : ""}
                `}
                style={{ background: colors[key] }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
