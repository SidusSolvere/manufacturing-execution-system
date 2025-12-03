import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [companyEmail, setCompanyEmail] = useState("");
  const [company, setCompany] = useState("");
  const [ID, setID] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let companyExists=false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyExists) {
      alert("company already registered");
      return;
    }
    console.log("Signup:", { companyEmail,company   });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-200 flex items-center justify-center p-15">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl ">
        <div className="bg-blue-600 text-white rounded-t-2xl p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-2xl font-bold">MES</span>
          </div>
          <h1 className="text-3xl font-bold">Register Company</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-3">
         
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Company Name
              <div className="relative group inline-block ">
                <button className="px-1.5 py-0.25 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">
                  ?
                </button>
                <div
                  className=" absolute w-128 left-1/2  mt-2 px-2 border-1 border-solid  bg-white text-gray-700 shadow-xl rounded-xl opacity-0  group-hover:opacity-100 transition duration-400">
                  <strong>Provide your official company name</strong> registered under any formal government authority
                </div>
              </div>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>
           <div>
            <label className="flex  text-sm font-medium text-slate-900 mb-2">
              ID
              <div className="relative group inline-block ">
                <button className="px-1.5 py-0.25 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">
                  ?
                </button>
                <div
                  className=" absolute w-128 left-1/2  mt-2 px-2 border-1 border-solid  bg-white text-gray-700 shadow-xl rounded-xl opacity-0  group-hover:opacity-100 transition duration-400"
                >
                  <strong>Provide your a company ID</strong>, it can be gstin, cin, or even your personal pan if your a small business owner 
                </div>
              </div>
              
            </label>
            <input
              type="text"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="flex  text-sm font-medium text-slate-900 mb-2">
              Company Email
              <div className="relative group inline-block ">
                <button className="px-1.5 py-0.25 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">
                  ?
                </button>
                <div
                  className=" absolute w-128 left-1/2  mt-2 px-2 border-1 border-solid  bg-white text-gray-700 shadow-xl rounded-xl opacity-0  group-hover:opacity-100 transition duration-400"
                >
                  The provided company email will be only an admin, we will provide a super admin account on provided official email to your company once the registration is complete.
                </div>
              </div>
              
            </label>
            <input
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              placeholder="CIN/PAN/MSME"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
            <div>
            <label className="block text-sm font-medium text-slate-900 mt-2 mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-sm text-slate-600">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mt-2 mb-2">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-sm text-slate-600">{showConfirmPassword ?  'Hide' : 'Show'}</button>
            </div>
          </div>

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
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Register Company
          </button>
        </form>

        <div className="bg-slate-50 px-8 py-4 border-t text-center rounded-b-2xl">
          
        </div>
      </div>
    </div>
  );
}

export default Register;
