import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles, ShieldCheck, Award, Truck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigateToShop } = useShop();

  return (
    <section className="relative bg-[#111114] text-[#FAF9F6] overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9E2A2B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#202026] border border-[#C5A880]/40 text-xs tracking-[0.2em] uppercase font-semibold text-[#E5D7C3]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Style for Him • Elegance for Her</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Where Modern Tailoring Meets Timeless Couture.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#D4CDBF] max-w-xl font-normal leading-relaxed">
              Step into an elevated world of handcrafted Indian heritage weaves, pure Italian wool suits, bespoke couple ensembles, and refined contemporary essentials.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => navigateToShop('men')}
                className="px-8 py-4 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group transform active:scale-98"
              >
                <span>Shop Men's Atelier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateToShop('women')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all backdrop-blur-md flex items-center justify-center gap-2 group transform active:scale-98"
              >
                <span>Shop Women's Couture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mini Trust Highlights */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span className="truncate">100% Certified Silks</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span className="truncate">Free White-Glove Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span className="truncate">Bespoke Fit Promise</span>
              </div>
            </div>

          </div>

          {/* Right Visual Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image: His & Her Editorial */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                  alt="Mr & Mrs High Fashion Model"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                        Festive Autumn / Winter Edition
                      </span>
                      <h4 className="font-serif text-base font-bold text-white">
                        Royal Couples Collection
                      </h4>
                    </div>
                    <button
                      onClick={() => navigateToShop('all', 'ethnic')}
                      className="w-9 h-9 rounded-full bg-[#C5A880] text-[#121214] flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="View collection"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Fashion Badge */}
              <div className="hidden sm:block absolute -top-6 -left-6 p-4 rounded-2xl bg-[#1C1C22]/90 backdrop-blur-md border border-[#C5A880]/40 shadow-xl text-left">
                <span className="text-[10px] uppercase font-bold text-[#A88A60] tracking-wider">Couture Standard</span>
                <p className="font-serif text-sm font-bold text-white">Hand-Pleated Lamé &amp; Silk</p>
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs mt-1">
                  ★★★★★ <span className="text-white font-bold ml-1">4.9/5</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
