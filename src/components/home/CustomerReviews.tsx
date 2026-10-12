import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Princess Gayatri & Raghavan',
      city: 'Jaipur & London',
      occasion: 'Royal Wedding Reception',
      rating: 5,
      review: 'We ordered our coordinating tuxedo and golden lamé gown from Mr & Mrs Clothing Store. The craftsmanship surpassed renowned Savile Row and couture houses. Arrived in pristine custom garment bags with personal styling notes.',
      date: 'September 2026'
    },
    {
      name: 'Vikramaditya & Sanjana Singhania',
      city: 'South Mumbai',
      occasion: 'Diwali Gala Celebration',
      rating: 5,
      review: 'The Banarasi Katan silk saree is breathtaking—heavy pure gold zari without being stiff, and the Matka silk bundi kurta for Vikram fit like a bespoke glove on the very first try. Truly an exceptional luxury brand.',
      date: 'October 2026'
    },
    {
      name: 'Aditya & Neha Mehra',
      city: 'Bengaluru & New York',
      occasion: 'Resort Wedding in Udaipur',
      rating: 5,
      review: 'From the junior sherwani for our 5-year-old son to my chikankari ensemble, every stitch spoke of master tailoring. Customer concierge kept us updated every step of the journey.',
      date: 'October 2026'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A88A60] block">
            Patron Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#121214]">
            Words From Our Esteemed Patrons
          </h2>
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#18181B]">4.9 / 5 Rating</span>
            <span className="text-xs text-[#716B64]">• Based on 1,420+ Verified Orders</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FAF9F6] border border-[#E8E2D8] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-[#C5A880]/40 absolute top-6 right-6 pointer-events-none group-hover:text-[#C5A880]/70 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#27272A] leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8]/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#18181B]">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-[#716B64]">
                      {rev.city} • <span className="text-[#A88A60] font-medium">{rev.occasion}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
