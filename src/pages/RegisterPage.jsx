import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle, Check, Shield, X } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

// ── Password rules ──────────────────────────────────────────────────────────
const RULES = [
  { id: 'len',   label: '15+ characters',          test: pw => pw.length >= 15 },
  { id: 'alpha', label: 'Contains alphabets',       test: pw => /[a-zA-Z]/.test(pw) },
  { id: 'upper', label: 'Uppercase letter (A-Z)',   test: pw => /[A-Z]/.test(pw) },
  { id: 'lower', label: 'Lowercase letter (a-z)',   test: pw => /[a-z]/.test(pw) },
  { id: 'num',   label: 'Number (0-9)',              test: pw => /[0-9]/.test(pw) },
  { id: 'sym',   label: 'Symbol (!@#$...)',          test: pw => /[^A-Za-z0-9]/.test(pw) },
];

const getStrength = (pw) => {
  if (!pw) return { score: 0, pct: 0, label: '', bar: '', text: '' };
  const passed = RULES.filter(r => r.test(pw)).length;
  // score out of 6
  if (passed <= 1) return { score: passed, pct: 17,  label: 'Very Weak', bar: 'bg-red-600',    text: 'text-red-400' };
  if (passed === 2) return { score: passed, pct: 33,  label: 'Weak',      bar: 'bg-red-400',    text: 'text-red-400' };
  if (passed === 3) return { score: passed, pct: 50,  label: 'Fair',      bar: 'bg-yellow-500', text: 'text-yellow-400' };
  if (passed === 4) return { score: passed, pct: 67,  label: 'Good',      bar: 'bg-blue-500',   text: 'text-blue-400' };
  if (passed === 5) return { score: passed, pct: 83,  label: 'Strong',    bar: 'bg-green-400',  text: 'text-green-400' };
  return             { score: passed, pct: 100, label: 'Very Strong', bar: 'bg-green-500',  text: 'text-green-400' };
};

// ── CAPTCHA widget ───────────────────────────────────────────────────────────
function CaptchaBox({ onVerify, error }) {
  const [state, setState] = useState('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    await new Promise(r => setTimeout(r, 1500));
    setState('verified');
    onVerify(true);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer select-none
        ${error          ? 'border-red-500 bg-red-500/5' :
          state === 'verified' ? 'border-green-500/50 bg-green-500/5' :
          'border-white/10 bg-white/5 hover:border-orange-500/40'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0
          ${state === 'verified' ? 'bg-green-500 border-green-500' :
            state === 'loading'  ? 'border-orange-400' :
            'border-white/30 bg-white/5'}`}>
          {state === 'loading'  && <Loader2 className="w-3.5 h-3.5 text-orange-400 animate-spin" />}
          {state === 'verified' && <Check   className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
        <span className={`text-sm font-medium transition-colors duration-300
          ${state === 'verified' ? 'text-green-400' :
            state === 'loading'  ? 'text-orange-400' : 'text-white/50'}`}>
          {state === 'idle' && "I'm not a robot"}
          {state === 'loading' && 'Verifying...'}
          {state === 'verified' && 'Verified!'}
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <Shield className={`w-6 h-6 transition-colors ${state === 'verified' ? 'text-green-400' : 'text-white/20'}`} />
        <span className="text-white/20 text-[9px] tracking-wide">reCAPTCHA</span>
        <span className="text-white/10 text-[8px]">Privacy · Terms</span>
      </div>
    </div>
  );
}

// ── Password strength panel ──────────────────────────────────────────────────
function PasswordStrengthPanel({ password, visible }) {
  const strength = getStrength(password);

  if (!visible) return null;

  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/3 overflow-hidden
                    animate-[fadeSlideDown_0.25s_ease-out]">
      {/* Strength bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/30 text-xs font-medium uppercase tracking-wider">Password Strength</span>
          <span className={`text-xs font-bold ${strength.text}`}>{strength.label}</span>
        </div>
        {/* Segmented bar */}
        <div className="flex gap-1">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${i <= strength.score ? strength.bar : ''}`}
                style={{ width: i <= strength.score ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rules list */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 px-4 pb-3 pt-1">
        {RULES.map(rule => {
          const passed = rule.test(password);
          return (
            <div key={rule.id} className="flex items-center gap-1.5">
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${passed ? 'bg-green-500' : 'bg-white/10 border border-white/20'}`}>
                {passed
                  ? <Check className="w-2 h-2 text-white" strokeWidth={3} />
                  : <X     className="w-2 h-2 text-white/30" strokeWidth={2.5} />}
              </div>
              <span className={`text-xs transition-colors duration-300 ${passed ? 'text-green-400' : 'text-white/30'}`}>
                {rule.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Register page ────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const navigate = useNavigate();
  const { setPendingEmail, sendOtp } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [panelDismissed, setPanelDismissed] = useState(false);

  const strength = getStrength(form.password);
  const allRulesPassed = RULES.every(r => r.test(form.password));

  // Auto-dismiss panel when Very Strong
  useEffect(() => {
    if (allRulesPassed && !panelDismissed) {
      const t = setTimeout(() => setPanelDismissed(true), 900);
      return () => clearTimeout(t);
    }
  }, [allRulesPassed]);

  // Re-show panel if user edits after dismissal
  useEffect(() => {
    if (!allRulesPassed) setPanelDismissed(false);
  }, [form.password]);

  const showPanel = pwFocused && form.password.length > 0 && !panelDismissed;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'At least 8 characters required';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!agree) e.agree = 'Please accept the terms';
    if (!captchaVerified) e.captcha = 'Please complete the CAPTCHA verification';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setPendingEmail(form.email);
    sendOtp(form.email);
    navigate('/verify-otp');
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join DriveEasy and start your adventure today">

      {/* keyframe injected inline for the panel animation */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="email"
              className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password + live rules panel */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showPw ? 'text' : 'password'}
              className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Min. 8 characters"
              value={form.password}
              onFocus={() => setPwFocused(true)}
              onBlur={() => setPwFocused(false)}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength panel (shows while focused, hides when Very Strong) */}
          <PasswordStrengthPanel password={form.password} visible={showPanel} />

          {/* Compact bar shown after panel dismisses (all rules passed) */}
          {panelDismissed && form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-green-500" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={3} />
                <span className="text-green-400 text-xs font-semibold">Very Strong</span>
              </div>
            </div>
          )}

          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showConfirm ? 'text' : 'password'}
              className={`input-field pl-10 pr-10 ${errors.confirm ? 'border-red-500' : form.confirm && form.password === form.confirm ? 'border-green-500' : ''}`}
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.confirm && form.password === form.confirm && (
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <p className="text-green-400 text-xs">Passwords match</p>
            </div>
          )}
          {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
        </div>

        {/* CAPTCHA */}
        <div>
          <CaptchaBox
            onVerify={v => { setCaptchaVerified(v); setErrors(prev => ({ ...prev, captcha: '' })); }}
            error={!!errors.captcha}
          />
          {errors.captcha && <p className="text-red-400 text-xs mt-1.5">{errors.captcha}</p>}
        </div>

        {/* Terms */}
        <div>
          <div className="flex items-start gap-2">
            <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-orange-500 flex-shrink-0" />
            <label htmlFor="agree" className="text-white/40 text-sm leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Privacy Policy</a>
            </label>
          </div>
          {errors.agree && <p className="text-red-400 text-xs mt-1">{errors.agree}</p>}
        </div>

        <button type="submit" disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2">
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
            : <>Create Account <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-center text-white/30 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
