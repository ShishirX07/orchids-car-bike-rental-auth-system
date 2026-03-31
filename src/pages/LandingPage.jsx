import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, Bike, Star, Shield, Clock, MapPin, ChevronRight,
  Phone, Mail,
  CheckCircle, ArrowRight, Zap, Award, Users, Menu, X
} from 'lucide-react';

const cars = [
  { name: 'Tesla Model 3', type: 'Electric', price: '85', rating: 4.9, img: '🚗', color: 'from-blue-500 to-cyan-400' },
  { name: 'BMW X5', type: 'SUV', price: '120', rating: 4.8, img: '🚙', color: 'from-slate-600 to-slate-400' },
  { name: 'Porsche 911', type: 'Sport', price: '200', rating: 5.0, img: '🏎️', color: 'from-red-500 to-orange-400' },
];

const bikes = [
  { name: 'Harley Davidson', type: 'Cruiser', price: '60', rating: 4.9, img: '🏍️', color: 'from-orange-600 to-yellow-400' },
  { name: 'Ducati Monster', type: 'Naked', price: '75', rating: 4.8, img: '🏍️', color: 'from-red-600 to-pink-400' },
  { name: 'Royal Enfield', type: 'Classic', price: '45', rating: 4.7, img: '🛵', color: 'from-green-600 to-emerald-400' },
];

const stats = [
  { icon: Car, value: '500+', label: 'Premium Vehicles' },
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: MapPin, value: '30+', label: 'City Locations' },
  { icon: Award, value: '8+', label: 'Years Experience' },
];

const features = [
  { icon: Shield, title: 'Fully Insured', desc: 'All vehicles come with comprehensive insurance coverage for your peace of mind.' },
  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support to assist you anytime, anywhere.' },
  { icon: Zap, title: 'Instant Booking', desc: 'Book your ride in under 2 minutes with our seamless booking experience.' },
  { icon: MapPin, title: 'GPS Tracking', desc: 'Real-time GPS tracking on all vehicles for maximum safety and convenience.' },
];

const testimonials = [
  { name: 'Arjun Sharma', role: 'Business Traveler', rating: 5, text: 'DriveEasy made my business trip so smooth. The Tesla was immaculate and the booking process was instant!' },
  { name: 'Priya Patel', role: 'Weekend Explorer', rating: 5, text: 'Rented a Harley for a weekend trip to the mountains. Best experience ever! Will definitely book again.' },
  { name: 'Rahul Verma', role: 'Daily Commuter', rating: 4, text: 'Affordable, clean, and always on time. DriveEasy is my go-to for city commuting every single day.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cars');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a14]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Drive<span className="gradient-text">Easy</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Vehicles', 'Features', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={() => navigate('/register')}
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0a0a14]/98 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-4">
            {['Home', 'Vehicles', 'Features', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white py-2 border-b border-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => navigate('/login')} className="flex-1 py-2.5 border border-white/20 rounded-xl text-sm font-medium hover:border-orange-500 transition-colors">Sign In</button>
              <button onClick={() => navigate('/register')} className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-sm font-semibold">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'1.5s'}} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>India's #1 Vehicle Rental Platform</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              Rent Your
              <span className="block gradient-text">Dream Ride</span>
              <span className="block text-white/90">Today</span>
            </h1>

            <p className="text-lg text-white/50 leading-relaxed max-w-lg">
              Experience the freedom of the open road with our premium fleet of cars and bikes.
              Affordable rates, zero hassle, unlimited adventure.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/register')}
                className="btn-primary flex items-center gap-2 glow-orange">
                Start Renting <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary flex items-center gap-2">
                Explore Fleet <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[['500+', 'Vehicles'], ['50K+', 'Users'], ['4.9★', 'Rating']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{val}</div>
                  <div className="text-xs text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main card */}
              <div className="glass-card p-8 glow-orange">
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 animate-float inline-block">🏎️</div>
                  <h3 className="text-2xl font-bold text-white">Premium Experience</h3>
                  <p className="text-white/40 text-sm mt-1">Curated fleet for every journey</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['🚗', '🚙', '🏍️'].map((emoji, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 text-center hover:bg-orange-500/10 transition-colors cursor-pointer">
                      <div className="text-3xl mb-1">{emoji}</div>
                      <div className="text-xs text-white/40">{['Sedan', 'SUV', 'Bike'][i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-green-500/20 border border-green-500/30 backdrop-blur-xl rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-semibold">Available Now</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-orange-500/20 border border-orange-500/30 backdrop-blur-xl rounded-2xl px-4 py-3">
                <div className="text-xs text-white/50">Starting from</div>
                <div className="text-xl font-bold gradient-text">₹45/hour</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/20 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-orange-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-orange-600/10 via-orange-500/5 to-orange-600/10 border-y border-orange-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-black gradient-text">{value}</div>
                  <div className="text-white/40 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="vehicles" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Our Fleet</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-3 mb-4">
              Choose Your <span className="gradient-text">Perfect Ride</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">From luxury cars to powerful bikes, we have the perfect vehicle for every journey and every budget.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5 flex gap-2">
              <button
                onClick={() => setActiveTab('cars')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'cars' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' : 'text-white/50 hover:text-white'}`}>
                <Car className="w-4 h-4" /> Cars
              </button>
              <button
                onClick={() => setActiveTab('bikes')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'bikes' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' : 'text-white/50 hover:text-white'}`}>
                <Bike className="w-4 h-4" /> Bikes
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === 'cars' ? cars : bikes).map((vehicle) => (
              <div key={vehicle.name}
                className="glass-card overflow-hidden group hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
                <div className={`h-40 bg-gradient-to-br ${vehicle.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{vehicle.img}</div>
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs font-bold">{vehicle.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white/80 text-xs">{vehicle.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{vehicle.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black gradient-text">₹{vehicle.price}</span>
                      <span className="text-white/30 text-sm">/hour</span>
                    </div>
                    <button onClick={() => navigate('/register')}
                      className="px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-400 text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate('/register')}
              className="btn-primary inline-flex items-center gap-2">
              View All Vehicles <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-3 mb-4">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">We've built the ultimate rental experience from the ground up, so you can focus on what matters — the ride.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 group hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Simple Process</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-3 mb-4">
              Ready in <span className="gradient-text">3 Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0" />
            {[
              { step: '01', icon: '📱', title: 'Create Account', desc: 'Sign up in seconds with email verification and OTP confirmation.' },
              { step: '02', icon: '🔍', title: 'Pick Your Ride', desc: 'Browse our premium fleet and choose the perfect vehicle for your journey.' },
              { step: '03', icon: '🚀', title: 'Hit the Road', desc: 'Confirm your booking, pick up your keys, and start your adventure!' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/30 text-2xl">
                  {icon}
                </div>
                <div className="text-orange-500/30 text-xs font-black tracking-widest mb-2">STEP {step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-3 mb-4">
              What Riders <span className="gradient-text">Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, rating, text }) => (
              <div key={name} className="glass-card p-6 hover:border-orange-500/20 transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{name}</div>
                    <div className="text-white/30 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden glow-orange">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
            <div className="relative z-10">
              <div className="text-6xl mb-6 animate-float inline-block">🚗</div>
              <h2 className="text-4xl lg:text-5xl font-black mb-4">
                Ready to <span className="gradient-text">Start?</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Join 50,000+ happy customers who trust DriveEasy for their every journey. Sign up today and get your first hour free!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => navigate('/register')}
                  className="btn-primary flex items-center gap-2 text-base">
                  Create Free Account <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/login')}
                  className="btn-secondary flex items-center gap-2 text-base">
                  Sign In
                </button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-white/30 text-sm">
                {['No credit card required', 'Free cancellation', '24/7 support'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/5 py-16 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Drive<span className="gradient-text">Easy</span></span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed mb-5">
                India's most trusted car & bike rental platform. Adventure starts here.
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                  { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                  { label: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 20.5h9a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5h-9a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5z' },
                  { label: 'Youtube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
                ].map(({ label, path }) => (
                  <div key={label} className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/30 cursor-pointer transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white/50 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={path} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
              { title: 'Services', links: ['Car Rental', 'Bike Rental', 'Subscription', 'Corporate'] },
              { title: 'Support', links: ['Help Center', 'Safety', 'Terms', 'Privacy'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">{title}</h4>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}><a href="#" className="text-white/30 hover:text-orange-400 text-sm transition-colors duration-300">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm">© 2026 DriveEasy. All rights reserved.</p>
            <div className="flex items-center gap-4 text-white/20 text-sm">
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 98765 43210</div>
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> hello@driveeasy.in</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
