import { useState } from "react";
import ThemeRibbonContent from "./themePopup";
import NodesRibbonContent from "./nodesRibbonContent";

function Ribbon({
  bgColorKey,
  setBgColorKey,
  colorKey,
  setColorKey,
}) {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="sticky top-0 z-20 bg-gray-50 shadow-md">
      <div className="flex items-center gap-4 px-4 h-12 border-b">
        <RibbonTab
          label="Nodes"
          active={activeTab === "nodes"}
          onClick={() =>
            setActiveTab(activeTab === "nodes" ? null : "nodes")
          }
        />

        <RibbonTab
          label="Theme"
          active={activeTab === "theme"}
          onClick={() =>
            setActiveTab(activeTab === "theme" ? null : "theme")
          }
        />
      </div>

      {activeTab && (
        <div className="px-4 py-3 border-b bg-gray-100">
          {activeTab === "nodes" && <NodesRibbonContent />}

          {activeTab === "theme" && (
            <ThemeRibbonContent
              bgColorKey={bgColorKey}
              setBgColorKey={setBgColorKey}
              colorKey={colorKey}
              setColorKey={setColorKey}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Ribbon;

function RibbonTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm font-medium
        ${
          active
            ? "bg-white shadow text-blue-600"
            : "hover:bg-gray-200 text-gray-700"
        }`}
    >
      {label}
    </button>
  );
}
