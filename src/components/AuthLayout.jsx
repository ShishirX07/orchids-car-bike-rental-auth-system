import { Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4 bg-grid">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black">Drive<span className="gradient-text">Easy</span></span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">{title}</h2>
          <p className="text-white/40 text-sm">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          {children}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © 2026 DriveEasy · Your journey starts here
        </p>
      </div>
    </div>
  );
}
