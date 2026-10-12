import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const NewsletterSubscription: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }

    setIsSubscribed(true);
    addToast(
      'Welcome to Mr & Mrs Privé',
      'Your exclusive 10% welcome voucher code is WELCOME10.',
      'success'
    );
  };

  return (
    <section className="py-20 bg-[#121214] text-[#FAF9F6] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1F24] border border-[#C5A880]/40 text-xs tracking-[0.2em] uppercase font-semibold text-[#E5D7C3]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>The Privé Circle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Receive Private Runway Previews &amp; Bespoke Privileges
        </h2>

        <p className="text-xs sm:text-sm text-[#D4CDBF] max-w-xl mx-auto leading-relaxed">
          Be first to preview seasonal couture capsules, private trunk show invitations, and receive an instant 10% welcome gift voucher.
        </p>

        {isSubscribed ? (
          <div className="p-6 rounded-2xl bg-[#1C1C22] border border-[#C5A880]/40 max-w-md mx-auto text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto" />
            <h4 className="font-serif text-lg font-bold text-white">You Are Now a Privé Member</h4>
            <p className="text-xs text-[#A1A1AA]">
              Use code <strong className="text-[#C5A880] font-mono">WELCOME10</strong> at checkout for 10% off your maiden purchase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#A88A60] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3.5 text-xs rounded-xl bg-[#1C1C22] border border-[#2D2D33] text-white placeholder-[#71717A] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="py-3.5 px-6 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-all shadow-lg whitespace-nowrap active:scale-98"
            >
              Join Privé
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#71717A]">
          We respect your privacy. No spam. You may withdraw your subscription at any time.
        </p>

      </div>
    </section>
  );
};
