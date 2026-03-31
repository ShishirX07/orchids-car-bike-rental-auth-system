import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { setForgotEmail, sendOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Enter a valid email address';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setForgotEmail(email);
    sendOtp(email);
    navigate('/forgot-otp');
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries! Enter your email and we'll send you a reset code">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Illustration */}
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Mail className="w-9 h-9 text-orange-400" />
          </div>
          <p className="text-white/30 text-xs mt-2">We'll send a verification code to your email</p>
        </div>

        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="email"
              className={`input-field pl-10 ${error ? 'border-red-500' : ''}`}
              placeholder="Enter your registered email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>

        <button type="submit" disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending code...</>
            : <>Send Reset Code <ArrowRight className="w-4 h-4" /></>}
        </button>

        <Link to="/login"
          className="flex items-center justify-center gap-1.5 text-white/30 hover:text-white/60 text-sm transition-colors mt-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Sign In
        </Link>
      </form>
    </AuthLayout>
  );
}
