import { useState } from "react";
import ThemeRibbonContent from "./themePopup";
import NodesRibbonContent from "./nodesRibbonContent";

function Ribbon({
  bgColorKey,
  setBgColorKey,
  colorKey,
  setColorKey,
  variantKey,
  setVariantKey,
  projects,
  activeProjectId,
  onSelectProject,
  onSaveProject,
  isCollaborative,
  onToggleCollaborative,
  socketRef
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
        <select
  className="border px-2 py-1 rounded text-sm"
  value={activeProjectId || ""}
  onChange={(e) => onSelectProject(e.target.value)}
>
  <option value="">Select Project</option> {/* ✅ ADD THIS */}
  {projects.map((p) => (
    <option key={p._id} value={p._id}>
      {p.name}
    </option>
  ))}
</select>


      <button
        onClick={onSaveProject}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
      >
        Save
      </button>

      <button
        onClick={() => onToggleCollaborative(!isCollaborative)}
        className={`px-3 py-1 rounded text-sm ${
          isCollaborative ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        {isCollaborative ? "Collaborative ON" : "Collaborative OFF"}
      </button>
      </div>

      {activeTab && (
        <div className="px-4 py-3 border-b bg-gray-100">
          {activeTab === "nodes" && <NodesRibbonContent socketRef={socketRef} isCollaborative={isCollaborative} activeProjectId={activeProjectId} />}

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
