import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';
import { Flame, ArrowRight } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const { products, navigateToShop } = useShop();

  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <section className="py-20 bg-white border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9E2A2B] mb-2">
              <Flame className="w-4 h-4 text-[#9E2A2B]" />
              <span>Trending Couture Right Now</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121214]">
              Most Desired Pieces
            </h2>
          </div>

          <button
            onClick={() => navigateToShop('all')}
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#A88A60] hover:text-[#121214] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Curated Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
