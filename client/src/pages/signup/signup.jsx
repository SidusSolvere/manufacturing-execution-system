import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [company, setCompany] = useState("");
  let companyExists; //temporary value, would be a function which checks if company is in database

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyExists) {
      alert("company not registered");
      return;
    }
    console.log("Signup:", { fullName, company, companyEmail, email });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-200 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-xl">
        <div className="bg-blue-600 text-white rounded-t-2xl p-6 md:p-8 text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
            <span className="text-blue-600 text-xl md:text-2xl font-bold">MES</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-3">
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2"></label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">
              Company
              <div className="relative group inline-block">
                <button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">
                  ?
                </button>
                <div
                  className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 text-xs md:text-sm"
                >
                  <strong>Provide your company name</strong> so your account can
                  be verified by your company admin and you gain access to the
                  services, in case your company is not here then to use the
                  service please register your company
                </div>
              </div>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="flex text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">
              Company Email
              <div className="relative group inline-block">
                <button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">
                  ?
                </button>
                <div
                  className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 text-xs md:text-sm"
                >
                  <strong>Provide your company email</strong>, the admin can only approve you via your company email, you will recieve your passkey there, if not registered then<Link to="/companyregister"> register your company </Link>
                </div>
              </div>
            </label>
            <input
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="flex text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">
              Personal Email&nbsp;<p className="text-black/60">(optional)</p>
              <div className="relative group inline-block">
                <button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">
                  ?
                </button>
                <div
                  className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 text-xs md:text-sm"
                >
                  Personal email if provided will act as a secondary means of contact, personal emails need to be approved by the company 
                </div>
              </div>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
            />
          </div>

          <div className="flex justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4" required />
              <span className="ml-2 text-sm text-slate-600">
                I agree to terms
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 cursor-pointer text-sm md:text-base"
          >
            Create Account
          </button>
        </form>

        
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
        <div className="bg-slate-50 px-6 md:px-8 py-3 md:py-4 text-center rounded-b-2xl">
          <p className="text-xs md:text-sm text-slate-600">
            Company not registered ?{" "}
            <Link
              to="/companyRegister"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register your company
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
