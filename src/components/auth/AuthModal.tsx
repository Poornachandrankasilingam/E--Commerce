import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Lock, Mail, User, Phone, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, registerUser, addToast, setCurrentView } = useShop();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }

    if (mode === 'login') {
      if (!password || password.length < 4) {
        addToast('Validation Error', 'Password must be at least 4 characters.', 'error');
        return;
      }
      loginUser(email, email.includes('admin') ? 'admin' : 'customer');
      setIsAuthModalOpen(false);
      setCurrentView('account');
    } else {
      if (!name.trim()) {
        addToast('Validation Error', 'Please enter your full name.', 'error');
        return;
      }
      if (!phone.trim()) {
        addToast('Validation Error', 'Please enter your mobile phone number.', 'error');
        return;
      }
      registerUser(name, email, phone);
      setIsAuthModalOpen(false);
      setCurrentView('account');
    }
  };

  const handleQuickCustomer = () => {
    loginUser('devika.s@example.com', 'customer');
    setIsAuthModalOpen(false);
    setCurrentView('account');
  };

  const handleQuickAdmin = () => {
    loginUser('admin@mrandmrsclothing.com', 'admin');
    setIsAuthModalOpen(false);
    setCurrentView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E8E2D8] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#121214] border border-[#C5A880] flex items-center justify-center shadow-md">
              <span className="font-serif text-[#C5A880] text-sm font-bold tracking-tighter">M&amp;M</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#121214]">
                {mode === 'login' ? 'Client Concierge Sign In' : 'Join Mr & Mrs Privé'}
              </h3>
              <p className="text-xs text-[#716B64]">Bespoke privileges and personal styling</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-[#716B64] hover:text-[#121214] hover:bg-[#F3EFE6] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#E8E2D8] bg-[#F7F5F0]">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              mode === 'login'
                ? 'bg-white text-[#121214] border-b-2 border-[#121214]'
                : 'text-[#716B64] hover:text-[#121214]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              mode === 'register'
                ? 'bg-white text-[#121214] border-b-2 border-[#121214]'
                : 'text-[#716B64] hover:text-[#121214]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#18181B] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A88A60] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maharani Gayatri"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18181B] mb-1">Mobile Contact</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#A88A60] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#18181B] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A88A60] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#18181B]">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => addToast('Reset Link Sent', 'Password reset instructions sent to your email.', 'info')}
                  className="text-[11px] text-[#A88A60] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A88A60] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#121214] hover:bg-[#27272A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-98"
          >
            {mode === 'login' ? 'Access My Account' : 'Register for Privé Membership'}
          </button>
        </form>

        {/* Quick Testing Short-cuts */}
        <div className="p-4 bg-[#F4EFE6] border-t border-[#E8E2D8] space-y-2 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#716B64]">
            Instant Testing Access
          </span>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleQuickCustomer}
              className="py-2 px-3 bg-white border border-[#DCD4C6] rounded-lg text-xs font-semibold text-[#18181B] hover:border-[#C5A880] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              Demo Customer
            </button>
            <button
              onClick={handleQuickAdmin}
              className="py-2 px-3 bg-[#121214] text-[#C5A880] rounded-lg text-xs font-semibold hover:bg-[#27272A] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Demo Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
