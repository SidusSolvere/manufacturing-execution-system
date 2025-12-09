import ThemePopup from "./themePopup";
import Sidebar from "./siebar";

function Ribbon({
  bgColorKey,
  setBgColorKey,
  colorKey,
  setColorKey,
  variantKey,
  setVariantKey
}) {
  return (
    <div className="flex ">
      <Sidebar />

      <ThemePopup
        bgColorKey={bgColorKey}
        setBgColorKey={setBgColorKey}
        colorKey={colorKey}
        setColorKey={setColorKey}
        variantKey={variantKey}
        setVariantKey={setVariantKey}
      />
    </div>
  );
}

export default Ribbon;
