import { useEffect, useState } from "react";
import { fetchCompanyUsers } from "../../API/userApi";
import { assignUserToProject } from "../../API/projectApi";
import useSession from "../../hooks/useSession";

export default function InviteCollaborators({ projectId, onClose }) {
  const { user } = useSession();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCompanyUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.companyRole)) {
    return null;
  }

  // Find the full user object to get their role
  const selectedUserObj = users.find((u) => u._id === selectedUserId);
  
  // Extract the role specifically from requestedRole as per your instruction
  const userRole = selectedUserObj?.requestedRole || "MACHINE_OPERATOR"; 

  const handleAssign = async () => {
    if (!selectedUserId) {
      alert("Please select a user.");
      return;
    }

    setIsLoading(true);
    try {
      // Use the fetched role automatically
      await assignUserToProject(projectId, selectedUserId, userRole);
      onClose();
    } catch (error) {
      alert("Failed to assign user.");
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub-style Color Mapping for Roles
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

  const currentRoleStyle = getRoleStyle(userRole);

  return (
    <div className="bg-white border border-[#d0d7de] shadow-xl rounded-lg w-80 font-sans text-sm z-50 flex flex-col overflow-hidden">
      
      <style>{`
        .gh-header {
          background-color: #f6f8fa;
          border-bottom: 1px solid #d0d7de;
        }
        .gh-input {
          background-color: #f6f8fa;
          border: 1px solid #d0d7de;
          box-shadow: inset 0 1px 0 rgba(208, 215, 222, 0.2);
          transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
        }
        .gh-input:focus {
          border-color: #0969da;
          outline: none;
          box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
          background-color: #fff;
        }
        .gh-btn-primary {
          background-color: #1f883d;
          color: white;
          border: 1px solid rgba(27,31,36,0.15);
          box-shadow: 0 1px 0 rgba(27,31,36,0.1);
          font-weight: 600;
        }
        .gh-btn-primary:hover { background-color: #1a7f37; }
        .gh-btn-sec {
          background-color: #f6f8fa;
          color: #24292f;
          border: 1px solid rgba(27,31,36,0.15);
          font-weight: 500;
        }
        .gh-btn-sec:hover { background-color: #f3f4f6; }
      `}</style>

      {/* Header */}
      <div className="gh-header px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-[#1f2328]">Add collaborator</h3>
        <button onClick={onClose} className="text-[#57606a] hover:text-[#1f2328]">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 0 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#1f2328] mb-1.5">
            Select User
          </label>
          <select
            className="gh-input w-full rounded-md py-1.5 px-2 text-[#1f2328]"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Search people...</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic User Role Display */}
        {selectedUserObj ? (
          <div className="rounded-md border border-[#d0d7de] bg-white p-3">
            <div className="text-xs text-[#636c76] mb-1">Collaborator will be added as:</div>
            
            <div className="flex items-center gap-2">
               {/* Color Badge */}
               <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: currentRoleStyle.bg,
                    color: currentRoleStyle.text,
                    borderColor: currentRoleStyle.border
                  }}
               >
                 {userRole.replace(/_/g, " ")}
               </span>
            </div>
          </div>
        ) : (
          /* Empty State Placeholder */
          <div className="rounded-md border border-dashed border-[#d0d7de] bg-gray-50 p-4 text-center">
             <span className="text-xs text-[#636c76]">Select a user to view their role</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 pt-0 flex gap-2 justify-end">
        <button
          onClick={onClose}
          className="gh-btn-sec px-3 py-1.5 rounded-md text-xs"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          disabled={isLoading || !selectedUserObj}
          className="gh-btn-primary px-3 py-1.5 rounded-md text-xs disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add to Project"}
        </button>
      </div>
    </div>
  );
}