import { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../../../API/projectApi";
import InviteCollaborators from "../../mes/inviteCollaborators";
import useSession from "../../../hooks/useSession";
import { useNavigate } from "react-router-dom";

export default function AdminProjectsPage() {
  const { user } = useSession();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInvite, setShowInvite] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const canInvite =
    user &&
    (user.companyRole === "ADMIN" || user.companyRole === "SUPER_ADMIN");

  const canCreateProject =
    user &&
    (
      user.companyRole === "ADMIN" ||
      user.companyRole === "SUPER_ADMIN" ||
      user.requestedRole === "LEAD_AUTOMATION_ENGINEER"
    );

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const handleCreateProject = async () => {
    if (!projectName.trim()) return;
    try {
      setIsCreating(true);
      const project = await createProject({ name: projectName });
      setProjects((prev) => [project, ...prev]); // Add new to top
      setProjectName("");
    } catch (error) {
      console.error("Failed to create project", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-900">
      <style>{`
        .gh-btn-primary {
          background-color: #1f883d;
          color: #ffffff;
          border: 1px solid rgba(27, 31, 36, 0.15);
          box-shadow: 0 1px 0 rgba(27, 31, 36, 0.1);
          transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
        }
        .gh-btn-primary:hover:not(:disabled) {
          background-color: #1a7f37;
        }
        .gh-btn-secondary {
          background-color: #f6f8fa;
          color: #24292f;
          border: 1px solid rgba(27, 31, 36, 0.15);
          box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
          transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        }
        .gh-btn-secondary:hover {
          background-color: #f3f4f6;
          border-color: rgba(27, 31, 36, 0.15);
        }
        .gh-card {
          border: 1px solid #d0d7de;
          border-radius: 6px;
          overflow: hidden;
        }
        .gh-header {
          background-color: #f6f8fa;
          border-bottom: 1px solid #d0d7de;
        }
        .gh-input {
          background-color: #f6f8fa;
          border: 1px solid #d0d7de;
          box-shadow: inset 0 1px 0 rgba(208, 215, 222, 0.2);
        }
        .gh-input:focus {
          border-color: #0969da;
          outline: none;
          box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
          background-color: #fff;
        }
        .repo-icon {
          color: #636c76;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-semibold text-[#1f2328]">Projects</h1>
          <p className="text-sm text-[#636c76] mt-1">
            Manage automation projects and assign team permissions.
          </p>
        </div>

        {/* Creation Bar */}
        {canCreateProject && (
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-[#f6f8fa] border border-[#d0d7de] p-4 rounded-md">
            <div className="flex-grow w-full sm:w-auto">
              <label className="sr-only">Project Name</label>
              <input
                className="gh-input w-full rounded-md py-1.5 px-3 text-sm text-[#1f2328] placeholder-gray-500"
                placeholder="Name your new project..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
              />
            </div>
            <button
              onClick={handleCreateProject}
              disabled={!projectName.trim() || isCreating}
              className="gh-btn-primary w-full sm:w-auto px-4 py-1.5 rounded-md text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isCreating ? "Creating..." : "New Project"}
            </button>
          </div>
        )}

        {/* Projects List */}
        <div className="gh-card bg-white">
          <div className="gh-header px-4 py-3 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-[#1f2328]">
              {projects.length} Active {projects.length === 1 ? 'Project' : 'Projects'}
            </h3>
          </div>

          {projects.length === 0 ? (
            <div className="p-12 text-center text-[#636c76]">
              <svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p>No projects found. Create one to get started.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#d0d7de]">
              {projects.map((p) => (
                <li key={p._id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {/* Repo Icon */}
                    <svg className="w-5 h-5 mt-1 repo-icon shrink-0" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8ZM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.249.249 0 0 1 .3 0l1.45 1.087a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25Z"></path>
                    </svg>

                    <div>
                      <h4
                        onClick={() =>
                          navigate(`/projects/${p._id}`, {
                            state: { project: p }
                          })
                        }
                        className="text-[#0969da] font-semibold text-base hover:underline cursor-pointer"
                      >
                        {p.name}
                      </h4>

                      <p className="text-xs text-[#636c76] mt-1">
                        Updated recently • ID: <span className="font-mono">{p._id.slice(-6)}</span>
                      </p>
                    </div>
                  </div>

                  {canInvite && (
                    <button
                      onClick={() => {
                        setSelectedProject(p._id);
                        setShowInvite(true);
                      }}
                      className="gh-btn-secondary text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-md flex items-center gap-2 whitespace-nowrap self-start sm:self-center"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      Assign Team
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal Wrapper */}
        {showInvite && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Assuming InviteCollaborators has its own internal styling. 
                If it's unstyled, we might need a wrapper div here. 
             */}
            <InviteCollaborators
              projectId={selectedProject}
              onClose={() => setShowInvite(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}