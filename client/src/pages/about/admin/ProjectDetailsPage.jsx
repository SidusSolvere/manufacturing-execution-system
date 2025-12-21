import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProjectMembers } from "../../../API/projectApi";

export default function ProjectDetailsPage() {
  const { state } = useLocation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = state?.project;
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const getRoleStyle = (roleName) => {
    switch (roleName) {
      case "LEAD_AUTOMATION_ENGINEER":
        return { bg: "#ddf4ff", text: "#0969da", border: "#54aeff" }; // Blue
      case "AUTOMATION_ENGINEER":
        return { bg: "#e6f6ff", text: "#0969da", border: "#83c7ff" }; // Lighter Blue
      case "SUPERVISOR":
        return { bg: "#fff8c5", text: "#9a6700", border: "#d4a72c" }; // Gold/Yellow
      case "QUALITY_ENGINEER":
        return { bg: "#ffebe9", text: "#cf222e", border: "#ff8182" }; // Red
      case "MAINTENANCE_ENGINEER":
        return { bg: "#dafbe1", text: "#1a7f37", border: "#4ac26b" }; // Green
      case "MACHINE_OPERATOR":
      default:
        return { bg: "#eff1f3", text: "#57606a", border: "#d0d7de" }; // Gray
    }
  };
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            Project data not available.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleToggleMembers = async () => {
    if (showMembers) {
      setShowMembers(false);
      return;
    }

    try {
      setLoadingMembers(true);
      const data = await fetchProjectMembers(project._id);
      setMembers(data);
      console.log("Fetched members:", data);
      setShowMembers(true);
    } catch (err) {
      console.error("❌ Failed to fetch project members", err);
    } finally {
      setLoadingMembers(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-semibold text-[#1f2328]">
            {project.name}
          </h1>
          <p className="text-sm text-[#636c76] mt-1">
            Project overview and access control
          </p>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Info label="Project ID" value={project._id} mono />
          <Info label="Company ID" value={project.company} mono />
          <Info label="Created By" value={project.createdBy} mono />

          <Info
            label="Nodes"
            value={`${project.nodes?.length || 0} nodes`}
          />
          <Info
            label="Edges"
            value={`${project.edges?.length || 0} edges`}
          />

          <Info
            label="Created At"
            value={new Date(project.createdAt).toLocaleString()}
          />
          <Info
            label="Last Updated"
            value={new Date(project.updatedAt).toLocaleString()}
          />
        </div>

        {/* Members Toggle */}
        <div className="pt-2">
          <button
            onClick={handleToggleMembers}
            className="gh-btn-secondary px-4 py-1.5 text-sm font-semibold rounded-md"
          >
            {loadingMembers
              ? "Loading members..."
              : showMembers
              ? "Hide Project Members"
              : "View Project Members"}
          </button>
        </div>

        {/* Members List */}
        {showMembers && (
          <div className="border border-[#d0d7de] rounded-md overflow-hidden">

            <div className="bg-[#f6f8fa] px-4 py-2 text-sm font-semibold text-[#1f2328]">
              Project Members ({members.length})
            </div>

            {members.length === 0 ? (
              <div className="p-6 text-sm text-[#636c76]">
                No members assigned to this project.
              </div>
            ) : (
              <ul className="divide-y divide-[#d0d7de]">
                {members.map((m) => (
                  <li
                    key={m._id}
                    className="p-4 flex justify-between items-start gap-4"
                  >
                    <div>
                      <p className="font-semibold text-[#0969da]">
                        {m.user?.name || "Unnamed User"}
                      </p>
                      <p className="text-xs text-[#636c76]">
                        {m.user?.email}
                      </p>
                      <p className="text-xs text-[#636c76] mt-1">
                        User ID:{" "}
                        <span className="font-mono break-all">
                          {m.user?._id}
                        </span>
                      </p>
                    </div>

                    {(() => {
  const style = getRoleStyle(m.role);
  return (
    <span
      className="text-xs font-bold px-2 py-1 rounded border"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.border,
      }}
    >
      {m.role}
    </span>
  );
})()}

                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Back */}
        <div className="pt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Back to Projects
          </button>
        </div>

      </div>
    </div>
  );
}

function Info({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs text-[#636c76]">{label}</p>
      <p
        className={`text-sm text-[#1f2328] ${
          mono ? "font-mono break-all" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
