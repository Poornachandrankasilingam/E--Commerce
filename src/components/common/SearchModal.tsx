import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    products, 
    navigateToProduct,
    navigateToShop 
  } = useShop();

  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTerm('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const popularTags = [
    'Italian Tuxedo',
    'Banarasi Silk Saree',
    'Supima Polo',
    'Chikankari Anarkali',
    'Evening Gown',
    'Royal Sherwani',
    'Linen Blazer'
  ];

  const matchingProducts = term.trim() === '' ? [] : products.filter(p => {
    const q = term.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (id: string) => {
    setIsSearchModalOpen(false);
    navigateToProduct(id);
  };

  const handleSelectTag = (tag: string) => {
    setTerm(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E8E2D8] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D8] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search by attire, silk, collection, or SKU..."
            className="w-full text-sm sm:text-base bg-transparent text-[#18181B] placeholder-[#A1A1AA] focus:outline-none"
          />
          {term && (
            <button
              onClick={() => setTerm('')}
              className="p-1 text-[#A1A1AA] hover:text-[#18181B] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="ml-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#716B64] hover:text-[#18181B] bg-[#F4EFE6] rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* Popular Tag suggestions */}
          {term.trim() === '' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A88A60] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Trending Searches in Haute Couture</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectTag(tag)}
                    className="px-3.5 py-1.5 bg-white border border-[#E8E2D8] rounded-full text-xs text-[#27272A] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {term.trim() !== '' && (
            <div>
              <div className="flex items-center justify-between text-xs text-[#716B64] mb-3">
                <span>Found {matchingProducts.length} matching couture pieces</span>
                {matchingProducts.length > 0 && (
                  <button
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      navigateToShop('all');
                    }}
                    className="text-[#C5A880] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View all catalog</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {matchingProducts.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F3EFE6] flex items-center justify-center mx-auto text-[#716B64]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg text-[#18181B] font-bold">No garments match "{term}"</h4>
                  <p className="text-xs text-[#716B64] max-w-sm mx-auto">
                    Try searching for broader keywords such as "suit", "saree", "polo", or "gown".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {matchingProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="group flex items-center gap-4 p-3 bg-white hover:bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl cursor-pointer transition-all hover:border-[#C5A880] shadow-xs"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#A88A60]">
                          {prod.category} • {prod.gender}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#18181B] truncate group-hover:text-[#C5A880] transition-colors">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#716B64] truncate">{prod.tagline}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-[#18181B]">
                          ₹{prod.sellingPrice.toLocaleString()}
                        </span>
                        {prod.discountPercent > 0 && (
                          <div className="text-[10px] text-[#9E2A2B] font-semibold">
                            {prod.discountPercent}% OFF
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
