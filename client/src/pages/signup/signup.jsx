import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e. preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup:', { fullName, email, password });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-200 flex items-center justify-center p-15">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-2xl font-bold">MES</span>
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e. target.value)} placeholder="John Doe" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e. target.value)} placeholder="you@example.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-sm text-slate-600">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-sm text-slate-600">{showConfirmPassword ?  'Hide' : 'Show'}</button>
            </div>
          </div>

          <div className="flex justify-between">
            <label className="flex items-center"><input type="checkbox" className="w-4 h-4" required /><span className="ml-2 text-sm text-slate-600">I agree to terms</span></label>
          </div>

          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Create Account</button>
        </form>

        <div className="bg-slate-50 px-8 py-4 border-t text-center">
          <p className="text-slate-600">Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;