import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import OtpInput from '../components/OtpInput';
import { useAuth } from '../context/AuthContext';

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const { pendingEmail, verifyOtp, sendOtp, DEMO_OTP } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [verified, setVerified] = useState(false);

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
      setVerified(true);
      await new Promise(r => setTimeout(r, 1200));
      navigate('/');
    } else {
      setError('Invalid OTP. Please try again.');
      setOtp('');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise(r => setTimeout(r, 800));
    sendOtp(pendingEmail);
    setTimer(60);
    setOtp('');
    setError('');
    setResending(false);
  };

  if (verified) {
    return (
      <AuthLayout title="Verified!" subtitle="Your account is ready">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Account Created!</h3>
          <p className="text-white/40 text-sm">Redirecting you to the dashboard...</p>
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={`We've sent a 6-digit code to ${pendingEmail || 'your email'}`}>
      <form onSubmit={handleVerify} className="space-y-6">
        {/* Email display */}
        <div className="flex items-center justify-center gap-3 bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3">
          <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <span className="text-white/60 text-sm truncate">{pendingEmail || 'your@email.com'}</span>
        </div>

        {/* Demo hint */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-center">
          <p className="text-blue-400 text-xs">Demo OTP: <span className="font-bold text-blue-300 tracking-widest">{DEMO_OTP}</span></p>
        </div>

        <div>
          <p className="text-center text-white/40 text-sm mb-5">Enter the verification code below</p>
          <OtpInput value={otp} onChange={setOtp} length={6} error={!!error} />
          {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
        </div>

        {/* Timer */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-white/30 text-sm">
              Resend code in <span className="text-orange-400 font-semibold tabular-nums">{timer}s</span>
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
            : <>Verify & Continue <ArrowRight className="w-4 h-4" /></>}
        </button>

        <p className="text-center text-white/20 text-xs">
          Didn't receive an email? Check your spam folder.
        </p>
      </form>
    </AuthLayout>
  );
}
