import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Tag, Copy, ArrowRight, Check } from 'lucide-react';

export const SpecialOffersBanner: React.FC = () => {
  const { navigateToShop, addToast } = useShop();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast('Coupon Code Copied!', `Use ${code} at checkout to claim your luxury savings.`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-16 bg-[#161619] text-[#FAF9F6] relative overflow-hidden">
      {/* Decorative Golden Pattern Line */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#1E1E24] to-[#121215] border border-[#C5A880]/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[11px] font-bold uppercase tracking-[0.2em]">
                <Tag className="w-3.5 h-3.5" />
                <span>Limited Edition Festive Privilege</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Celebrate in Royal Splendor: Save 20% on Luxury Ensembles
              </h2>

              <p className="text-xs sm:text-sm text-[#D4CDBF] max-w-xl leading-relaxed">
                Enjoy complimentary personal stylist guidance and priority white-glove shipping on all bridal, gala, and wedding orders above ₹4,999.
              </p>

              {/* Coupon code snippet */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <div className="flex items-center gap-2 bg-[#25252D] border border-[#C5A880]/50 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">Promo Code:</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#E5D7C3] tracking-wider">
                    ELEGANCE20
                  </span>
                  <button
                    onClick={() => handleCopy('ELEGANCE20')}
                    className="ml-2 p-1 text-[#C5A880] hover:text-white transition-colors"
                    aria-label="Copy voucher code"
                  >
                    {copiedCode === 'ELEGANCE20' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-[#25252D] border border-[#C5A880]/50 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">First Order:</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#E5D7C3] tracking-wider">
                    WELCOME10
                  </span>
                  <button
                    onClick={() => handleCopy('WELCOME10')}
                    className="ml-2 p-1 text-[#C5A880] hover:text-white transition-colors"
                    aria-label="Copy voucher code"
                  >
                    {copiedCode === 'WELCOME10' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right CTA (4 cols) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => navigateToShop('all', 'sale')}
                className="w-full py-4 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Shop Festive Sale</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateToShop('all')}
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center"
              >
                <span>View Full Catalog</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
