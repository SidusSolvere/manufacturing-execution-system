import { useEffect, useState } from "react";
import useSession from "../../../hooks/useSession";
import { getPendingUsers, approveUser } from "../../../API/authApi";

export default function PendingUsers() {
  const { user, loading } = useSession();

  const [pendingUsers, setPendingUsers] = useState([]);
  const [roleMap, setRoleMap] = useState({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.companyRole)) return;

    getPendingUsers()
      .then((data) => {
        setPendingUsers(data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user]);

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading session...</div>;

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.companyRole)) {
    return (
      <div className="p-8 flex justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          <strong>Access denied:</strong> You do not have permission to view this page.
        </div>
      </div>
    );
  }

  const handleApprove = async (userId) => {
    const finalRole = roleMap[userId];
    if (!finalRole) {
      alert("Please select a role before approving.");
      return;
    }

    try {
      await approveUser(userId, { companyRole: finalRole });
      setPendingUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.message || "Approval failed");
    }
  };

  // GitHub-like Role Badge Color Mapper
  const getRoleBadgeStyle = (role) => {
    // Just a visual helper to mimic GitHub's label styles
    return "inline-block px-2 py-0.5 text-xs font-medium leading-5 text-blue-600 bg-blue-50 border border-blue-200 rounded-full";
  };

  if (fetching) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="border border-gray-200 rounded-md bg-white h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-900">
      
      {/* Custom Styles for specific GitHub nuances */}
      <style>{`
        .gh-btn {
          background-color: #1f883d;
          color: #ffffff;
          box-shadow: 0 1px 0 rgba(27, 31, 36, 0.1);
          transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
        }
        .gh-btn:hover {
          background-color: #1a7f37;
        }
        .gh-btn:active {
          background-color: #187232;
          box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1); 
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
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#1f2328]">Pending Approvals</h1>
            <p className="text-sm text-[#636c76] mt-1">
              Review and assign roles to new team members requesting access.
            </p>
          </div>
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
            {pendingUsers.length} Pending
          </span>
        </div>

        {/* Main Content Card */}
        <div className="gh-card bg-white shadow-sm">
          {pendingUsers.length === 0 ? (
            <div className="p-16 text-center">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-lg font-medium text-[#1f2328]">All caught up!</h3>
              <p className="text-[#636c76] mt-1">There are no users waiting for approval right now.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="gh-header">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-[#636c76] uppercase tracking-wider">User Details</th>
                    <th className="p-4 text-xs font-semibold text-[#636c76] uppercase tracking-wider">Requested Role</th>
                    <th className="p-4 text-xs font-semibold text-[#636c76] uppercase tracking-wider w-1/3">Assign Role</th>
                    <th className="p-4 text-xs font-semibold text-[#636c76] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d0d7de]">
                  {pendingUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                      {/* Name & Email */}
                      <td className="p-4 align-middle">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-300">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[#1f2328]">{u.name}</div>
                            <div className="text-xs text-[#636c76]">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Requested Role Badge */}
                      <td className="p-4 align-middle">
                        <span className={getRoleBadgeStyle(u.requestedRole)}>
                          {u.requestedRole.replace(/_/g, " ")}
                        </span>
                      </td>

                      {/* Role Selector */}
                      <td className="p-4 align-middle">
                        <select
                          className="gh-input w-full rounded-md py-1.5 px-2.5 text-sm text-[#1f2328]"
                          value={roleMap[u._id] || ""}
                          onChange={(e) =>
                            setRoleMap({
                              ...roleMap,
                              [u._id]: e.target.value,
                            })
                          }
                        >
                          <option value="">Choose a role...</option>
                          <option value="LEAD_AUTOMATION_ENGINEER">Lead Automation Engineer</option>
                          <option value="AUTOMATION_ENGINEER">Automation Engineer</option>
                          <option value="MACHINE_OPERATOR">Machine Operator</option>
                          <option value="SUPERVISOR">Supervisor</option>
                          <option value="QUALITY_ENGINEER">Quality Engineer</option>
                          <option value="MAINTENANCE_ENGINEER">Maintenance Engineer</option>
                        </select>
                      </td>

                      {/* Action Button */}
                      <td className="p-4 align-middle text-right">
                        <button
                          onClick={() => handleApprove(u._id)}
                          className="gh-btn border border-[rgba(27,31,36,0.15)] rounded-md px-4 py-1.5 text-sm font-bold leading-5 whitespace-nowrap"
                        >
                          Approve Request
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}