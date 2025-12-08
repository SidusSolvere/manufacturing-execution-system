
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  // 1. State Initialization (Individual states kept as requested)
  const [companyEmail, setCompanyEmail] = useState("");
  const [company, setCompany] = useState("");
  // State for Company ID context: would be used for sorting through company data in
  const [idType, setIdType] = useState("Select"); 
  const [companyId, setCompanyId] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let companyExists = false; // Flag maintained for existing logic

  // 2. Submission & Validation Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(idType==="Select"){

      alert("Please select the idType!");
      return;
    }
    // Password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Company existence check
    if (companyExists) {
      alert("company already registered");
      return;
    }
    
    // Log new MES registration fields
    console.log("Signup:", { companyEmail, company, idType, companyId });

    // 3. Solution: Resetting all states after successful submission
    setCompanyEmail("");
    setCompany("");
    setIdType("Select"); // Reset to default value
    setCompanyId("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-xl">
        
        {/* Header Section */}
        <div className="bg-blue-600 text-white rounded-t-2xl p-6 md:p-8 text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
            <span className="text-blue-600 text-xl md:text-2xl font-bold">MES</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Register Company</h1>
        </div>

        {/* Form Start */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          
          {/* Company Name Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Company Name
              {/* Tooltip */}
              <div className="relative group inline-block"><button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">?</button>
                <div className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 z-10 text-xs md:text-sm">
                  <strong>Provide your official company name</strong> registered under any formal government authority
                </div>
              </div>
            </label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" 
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base" required />
          </div>
          

         
          
          {/* Company ID Input (MES ID STEP 2) */}
          <div>
            <label className="flex text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Company ID
              {/* Tooltip */}
              <div className="relative group inline-block"><button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">?</button>
                <div className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 z-10 text-xs md:text-sm">
                  Enter your unique company ID and ID type
                </div>
              </div>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)} placeholder="CIN-123456789"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base" required />
              <select name="idType" value={idType} onChange={(e) => setIdType(e.target.value)} 
              className="w-full sm:w-[40%] px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-xs md:text-sm" required>
              <option value="Select">CIN</option>
              <option value="production">GSTIN</option>
              <option value="quality">PAN</option>
              <option value="maintenance">TAN</option>
              <option value="logistics">UDYAM Registration/MSME</option>
              <option value="admin">FSSAI</option>
              <option value="admin">IEC</option>
              <option value="admin">LLPIN</option>
              <option value="admin">Other</option>
            </select>
            </div>
          </div>
          

          {/* Company Email Input (Admin Contact) */}
          <div>
            <label className="flex text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Company Email
              {/* Tooltip */}
              <div className="relative group inline-block"><button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">?</button>
                <div className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 z-10 text-xs md:text-sm">
                  The provided company email will be only an admin...
                </div>
              </div>
            </label>
            <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} placeholder="admin@company.com"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base" required />
          </div>
          
          {/* Password Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" 
                className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-xs md:text-sm text-slate-600">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" 
                className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-xs md:text-sm text-slate-600">{showConfirmPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>
          
          {/* Terms Checkbox */}
          <div className="flex justify-start">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4" required />
              <span className="ml-2 text-xs md:text-sm text-slate-600">I agree to terms</span>
            </label>
          </div>

          {/* Submit Button (Cursor fix applied: added cursor-pointer class) */}
          <button type="submit" className="w-full px-3 md:px-4 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 cursor-pointer text-sm md:text-base">
            Register Company
          </button>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 px-6 md:px-8 py-3 md:py-4 border-t text-center rounded-b-2xl">
          <p className="text-xs md:text-sm text-slate-600">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log in            
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;