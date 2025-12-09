import { useState } from "react";
import { backgroundColor } from "./backgroundTheme/background";
import { color } from "./backgroundTheme/color";
import { variant } from "./backgroundTheme/variant";

export default function ThemePopup({
  bgColorKey,
  setBgColorKey,
  colorKey,
  setColorKey,
  variantKey,
  setVariantKey
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-10">

      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-100 text-xl font-bold text-blue-800 rounded-b-2xl p-4 shadow-2xl hover:bg-gray-200"
      >
        View
      </button>

      {open && (
        <div className="absolute mt-2 bg-white shadow-xl rounded-lg p-4 w-64 space-y-4 border border-gray-200">

          <div>
            <label className="font-medium">Background Color</label>
            <select
              className="border w-full p-2 rounded mt-1"
              onChange={(e) => setBgColorKey(e.target.value)}
              value={bgColorKey}
            >
              {Object.keys(backgroundColor).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>

            <div
              className="w-full h-6 mt-1 rounded border"
              style={{ background: backgroundColor[bgColorKey] }}
            ></div>
          </div>

          <div>
            <label className="font-medium">Node Accent Color</label>
            <select
              className="border w-full p-2 rounded mt-1"
              onChange={(e) => setColorKey(e.target.value)}
              value={colorKey}
            >
              {Object.keys(color).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>

            <div
              className="w-full h-6 mt-1 rounded border"
              style={{ background: color[colorKey] }}
            ></div>
          </div>

          <div>
            <label className="font-medium">Background Variant</label>
            <select
              className="border w-full p-2 rounded mt-1"
              onChange={(e) => setVariantKey(e.target.value)}
              value={variantKey}
            >
              {Object.keys(variant).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
