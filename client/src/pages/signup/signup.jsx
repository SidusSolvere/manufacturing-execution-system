
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../API/authApi";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [requestedRole, setRequestedRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Streamline Your Flow", subtitle: "Automate workflows and boost productivity" },
    { title: "Real-Time Monitoring", subtitle: "Track operations and performance metrics" },
    { title: "Team Collaboration", subtitle: "Connect your entire manufacturing team" },
    { title: "Advanced Analytics", subtitle: "Make data-driven decisions faster" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestedRole) return alert("Please select a role");
    if (password !== confirmPassword) return alert("Passwords do not match");
    try {
      setIsSubmitting(true);
      await registerUser({ name: fullName, email, password, companyName, requestedRole });
      alert("Signup successful! Awaiting admin approval.");
      setFullName(""); setCompanyName(""); setEmail(""); setRequestedRole(""); setPassword(""); setConfirmPassword("");
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl flex overflow-hidden rounded-xl shadow-2xl bg-white">

        {/* LEFT — FORM */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-black mb-2">Create Account</h1>
            <p className="text-gray-600 text-sm">Join your manufacturing team</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter your company name" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requested Role</label>
              <select value={requestedRole} onChange={(e) => setRequestedRole(e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-black">
                <option value="">Select your role</option>
                <option value="LEAD_AUTOMATION_ENGINEER">Lead Automation Engineer</option>
                <option value="AUTOMATION_ENGINEER">Automation Engineer</option>
                <option value="MACHINE_OPERATOR">Machine Operator</option>
                <option value="SUPERVISOR">Supervisor</option>
                <option value="QUALITY_ENGINEER">Quality Engineer</option>
                <option value="MAINTENANCE_ENGINEER">Maintenance Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-black" />
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition-all">
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="font-medium hover:underline">Log in</Link>
            </div>
          </div>
        </div>

        {/* RIGHT — SLIDER (SAME SIZE, STUCK TO FORM) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black text-white">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center px-12 transition-all duration-1000 ${
                index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg opacity-80">{slide.subtitle}</p>
            </div>
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-gray-500"}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
