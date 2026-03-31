import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError('');
    setLoading(true);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);

    // Demo: any login succeeds
    navigate('/');
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to continue your journey with DriveEasy">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="email"
              className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white/60 text-sm font-medium">Password</label>
            <Link to="/forgot-password" className="text-orange-400 hover:text-orange-300 text-xs transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showPw ? 'text' : 'password'}
              className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-orange-500" />
          <label htmlFor="remember" className="text-white/40 text-sm">Remember me for 30 days</label>
        </div>

        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
            {apiError}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/20 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-3">
          {['Google', 'Apple'].map(provider => (
            <button key={provider} type="button"
              className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm hover:bg-white/10 hover:text-white transition-all duration-300">
              <span>{provider === 'Google' ? '🔵' : '🍎'}</span>
              {provider}
            </button>
          ))}
        </div>
      </form>

      <p className="text-center text-white/30 text-sm mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
}
