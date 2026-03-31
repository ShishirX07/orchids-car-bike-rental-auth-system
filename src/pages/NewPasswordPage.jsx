import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowRight, Loader2, CheckCircle2, Check } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const rules = [
  { label: 'At least 8 characters', test: pw => pw.length >= 8 },
  { label: 'One uppercase letter', test: pw => /[A-Z]/.test(pw) },
  { label: 'One number', test: pw => /[0-9]/.test(pw) },
  { label: 'One special character', test: pw => /[^A-Za-z0-9]/.test(pw) },
];

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'At least 8 characters required';
    else if (!rules.slice(0, 3).every(r => r.test(form.password))) e.password = 'Password does not meet requirements';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 2000));
    navigate('/login');
  };

  if (success) {
    return (
      <AuthLayout title="Password Reset!" subtitle="Your password has been updated successfully">
        <div className="text-center py-8 space-y-4">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">All Done!</h3>
            <p className="text-white/40 text-sm">Your password has been reset. Redirecting to login...</p>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Create a strong password to secure your account">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Icon */}
        <div className="text-center py-2">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showPw ? 'text' : 'password'}
              className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter new password"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
              autoFocus
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
        </div>

        {/* Password Rules */}
        {form.password && (
          <div className="bg-white/3 border border-white/8 rounded-xl px-4 py-3 space-y-2">
            <p className="text-white/40 text-xs font-semibold mb-2 uppercase tracking-wider">Password Requirements</p>
            {rules.map(({ label, test }) => {
              const passed = test(form.password);
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${passed ? 'bg-green-500' : 'bg-white/10 border border-white/20'}`}>
                    {passed && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={`text-xs transition-colors duration-300 ${passed ? 'text-green-400' : 'text-white/30'}`}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Confirm Password */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showConfirm ? 'text' : 'password'}
              className={`input-field pl-10 pr-10 ${
                errors.confirm ? 'border-red-500' :
                form.confirm && form.password === form.confirm ? 'border-green-500' : ''
              }`}
              placeholder="Re-enter new password"
              value={form.confirm}
              onChange={e => { setForm({ ...form, confirm: e.target.value }); setErrors({ ...errors, confirm: '' }); }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.confirm && form.password === form.confirm && !errors.confirm && (
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <p className="text-green-400 text-xs">Passwords match</p>
            </div>
          )}
          {errors.confirm && <p className="text-red-400 text-xs mt-1.5">{errors.confirm}</p>}
        </div>

        <button type="submit" disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating password...</>
            : <>Reset Password <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </AuthLayout>
  );
}
