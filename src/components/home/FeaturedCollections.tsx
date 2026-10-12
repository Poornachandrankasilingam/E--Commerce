import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const FeaturedCollections: React.FC = () => {
  const { navigateToShop } = useShop();

  const collections = [
    {
      title: 'Formal Black-Tie & Galas',
      subtitle: 'The Tuxedo & Evening Gown Edit',
      desc: 'Double-breasted tuxedos, pleated metallic gowns, and Italian poplin dress shirts for grand soirees.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      gender: 'all',
      category: 'Shirts and formal wear'
    },
    {
      title: 'Festive Royal Heritage',
      subtitle: 'Katan Silk & Imperial Bundi',
      desc: 'Handcrafted Varanasi brocades, raw matka silk kurtas, and scalloped organza dupattas.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      gender: 'women',
      category: 'Sarees and salwar suits'
    },
    {
      title: 'Quiet Luxury Casuals',
      subtitle: 'Supima Cotton & Selvedge Denim',
      desc: 'Featherweight European linen shorts, 280 GSM pique polo shirts, and vintage shuttle-loom denim.',
      image: 'https://images.unsplash.com/photo-1625910513413-7a2750e41712?q=80&w=1000&auto=format&fit=crop',
      gender: 'men',
      category: 'T-shirts and polo shirts'
    },
    {
      title: 'Junior Royalty & Festive',
      subtitle: 'Cherished Heirlooms for Kids',
      desc: 'Comfortable pure cotton mulmul lining paired with exquisite zardozi sherwanis and twirl lehengas.',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
      gender: 'kids',
      category: 'Boys clothing'
    }
  ];

  return (
    <section className="py-20 bg-[#FAF9F6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A88A60] block">
            Signature Lookbooks
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#121214]">
            Featured Editorial Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#716B64] leading-relaxed">
            Curated pairings designed to harmonize effortlessly for memorable milestones and festive seasons.
          </p>
        </div>

        {/* Collections 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col, idx) => (
            <div
              key={idx}
              onClick={() => navigateToShop(col.gender === 'all' ? undefined : col.gender, col.category)}
              className="group relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#EAE5D9]"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-left text-white z-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-1">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 group-hover:text-[#E5D7C3] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#D4CDBF] max-w-md line-clamp-2 mb-4 leading-relaxed opacity-90">
                  {col.desc}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors">
                  <span>Explore Lookbook</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
