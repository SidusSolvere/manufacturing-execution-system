import { useState } from "react";

// Mock functions for demo
const createAdmin = async (data) => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const useSession = () => ({
  user: { companyRole: "SUPER_ADMIN" },
  loading: false
});

export default function SuperAdminPage() {
  const { user, loading } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user || user.companyRole !== "SUPER_ADMIN") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Access denied</div>
      </div>
    );
  }

  const handleCreateAdmin = async () => {
    if (!name || !email || !password) return;
    
    setIsSubmitting(true);
    await createAdmin({ name, email, password });
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setName("");
    setEmail("");
    setPassword("");
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-gray-800">
          <h1 className="text-3xl font-semibold mb-2">Super Admin Panel</h1>
          <p className="text-gray-400 text-sm">
            Create and manage administrator accounts
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-900/20 border border-green-800 rounded-lg p-4 text-green-400 text-sm animate-[fadeIn_0.3s_ease-in]">
            ✓ Admin account created successfully
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 backdrop-blur">
          <h2 className="text-xl font-semibold mb-6">Create Admin Account</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                className="w-full bg-black border border-gray-700 rounded-md px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                placeholder="Enter admin name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                className="w-full bg-black border border-gray-700 rounded-md px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                placeholder="admin@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                className="w-full bg-black border border-gray-700 rounded-md px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                placeholder="Enter secure password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleCreateAdmin}
                disabled={isSubmitting || !name || !email || !password}
                className="w-full bg-white text-black font-medium px-4 py-2.5 rounded-md hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
              >
                {isSubmitting ? "Creating..." : "Create Admin"}
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Admin Permissions
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Full access to user management</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>System configuration and settings</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Analytics and reporting dashboard</span>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}