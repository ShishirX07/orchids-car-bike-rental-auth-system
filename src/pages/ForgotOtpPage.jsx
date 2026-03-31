import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import OtpInput from '../components/OtpInput';
import { useAuth } from '../context/AuthContext';

export default function ForgotOtpPage() {
  const navigate = useNavigate();
  const { forgotEmail, verifyOtp, sendOtp, DEMO_OTP } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 6) { setError('Please enter the complete 6-digit OTP'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    if (verifyOtp(otp)) {
      navigate('/new-password');
    } else {
      setError('Invalid OTP. Please check and try again.');
      setOtp('');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise(r => setTimeout(r, 800));
    sendOtp(forgotEmail);
    setTimer(60);
    setOtp('');
    setError('');
    setResending(false);
  };

  return (
    <AuthLayout
      title="Check Your Email"
      subtitle={`Enter the 6-digit code sent to ${forgotEmail || 'your email'}`}>
      <form onSubmit={handleVerify} className="space-y-6">
        {/* Icon */}
        <div className="text-center py-2">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        {/* Demo hint */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-center">
          <p className="text-blue-400 text-xs">Demo OTP: <span className="font-bold text-blue-300 tracking-widest">{DEMO_OTP}</span></p>
        </div>

        <div>
          <p className="text-center text-white/40 text-sm mb-5">
            Sent to <span className="text-white/60 font-medium">{forgotEmail || 'your@email.com'}</span>
          </p>
          <OtpInput value={otp} onChange={setOtp} length={6} error={!!error} />
          {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
        </div>

        {/* Timer */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-white/30 text-sm">
              Resend in <span className="text-orange-400 font-semibold tabular-nums">{timer}s</span>
            </p>
          ) : (
            <button type="button" onClick={handleResend} disabled={resending}
              className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors mx-auto">
              {resending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>

        <button type="submit" disabled={loading || otp.length < 6}
          className="w-full btn-primary flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
            : <>Verify Code <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </AuthLayout>
  );
}
