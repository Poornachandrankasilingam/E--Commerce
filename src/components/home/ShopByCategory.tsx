import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const ShopByCategory: React.FC = () => {
  const { categories, navigateToShop } = useShop();

  return (
    <section className="py-20 bg-[#FAF9F6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A88A60] block mb-2">
              Curated Ateliers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121214]">
              Shop By Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#716B64] max-w-md mt-3 md:mt-0 leading-relaxed">
            From imperial evening suits to handcrafted pure Banarasi drapes and playful kids' wear, discover our signature silhouettes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToShop(cat.gender === 'all' ? undefined : (cat.gender as string), cat.slug)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 bg-[#EFECE6]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity" />

              {/* Card Label Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left text-white z-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A880] mb-1">
                  {cat.itemCount} Designs Available
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-tight mb-2 group-hover:text-[#E5D7C3] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#D4CDBF] line-clamp-2 mb-4 leading-relaxed opacity-90 group-hover:opacity-100">
                  {cat.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors">
                  <span>Explore Atelier</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
