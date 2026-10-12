import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal, 
  Search, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    activeGender, 
    setActiveGender, 
    activeCategory, 
    setActiveCategory,
    searchQuery,
    setSearchQuery 
  } = useShop();

  // Local Filter states
  const [selectedGender, setSelectedGender] = useState<string>(activeGender || 'all');
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(35000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync when activeGender from context changes
  React.useEffect(() => {
    if (activeGender) setSelectedGender(activeGender);
  }, [activeGender]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38R', '40R', '42R', '44R'];
  const allColors = [
    { name: 'Black', hex: '#111111' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Beige', hex: '#D9CDB8' },
    { name: 'Navy', hex: '#14213D' },
    { name: 'Crimson', hex: '#9E2A2B' },
    { name: 'Olive', hex: '#586B5C' },
    { name: 'Ivory', hex: '#FDFBF7' }
  ];

  const subcategoriesByGender = {
    men: [
      'T-shirts and polo shirts',
      'Shirts and formal wear',
      'Jeans and trousers',
      'Hoodies and jackets',
      'Traditional wear',
      'Shorts and casual wear'
    ],
    women: [
      'Tops and T-shirts',
      'Kurtis and ethnic wear',
      'Dresses and gowns',
      'Sarees and salwar suits',
      'Jeans and trousers',
      'Western wear',
      'Party wear'
    ],
    kids: [
      'Boys clothing',
      'Girls clothing',
      'Kids casual wear',
      'Festive outfits'
    ]
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Gender filter
      if (selectedGender !== 'all' && prod.gender !== selectedGender) {
        return false;
      }

      // Subcategory filter
      if (selectedSubcat !== 'all') {
        const matchCategory = prod.subcategory?.toLowerCase() === selectedSubcat.toLowerCase() ||
                              prod.category?.toLowerCase() === selectedSubcat.toLowerCase();
        if (!matchCategory) return false;
      }

      // Keyword / search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = prod.name.toLowerCase().includes(q) ||
                        prod.description.toLowerCase().includes(q) ||
                        prod.category.toLowerCase().includes(q) ||
                        prod.subcategory.toLowerCase().includes(q) ||
                        prod.sku.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (prod.sellingPrice > priceRange) {
        return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = prod.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = prod.colors.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // In stock
      if (inStockOnly && prod.totalStock <= 0) {
        return false;
      }

      // On sale
      if (onSaleOnly && prod.discountPercent <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products, 
    selectedGender, 
    selectedSubcat, 
    searchQuery, 
    priceRange, 
    selectedSizes, 
    selectedColors, 
    inStockOnly, 
    onSaleOnly, 
    sortBy
  ]);

  const handleClearFilters = () => {
    setSelectedGender('all');
    setSelectedSubcat('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(35000);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const activeFilterCount = 
    (selectedGender !== 'all' ? 1 : 0) +
    (selectedSubcat !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0) +
    (priceRange < 35000 ? 1 : 0);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-8 pb-6 border-b border-[#E8E2D8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A88A60] block mb-1">
                Atelier Catalog
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121214]">
                {selectedGender === 'men' 
                  ? "Men's Sartorial Collection" 
                  : selectedGender === 'women' 
                  ? "Women's Couture & Ensembles" 
                  : selectedGender === 'kids' 
                  ? "Kids' Royal & Festive Wear" 
                  : "All Collections & Ateliers"}
              </h1>
            </div>

            {/* Quick Gender Pill Switcher */}
            <div className="flex items-center bg-[#EFECE6] p-1 rounded-xl self-start sm:self-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'men', label: 'Men' },
                { id: 'women', label: 'Women' },
                { id: 'kids', label: 'Kids' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGender(g.id);
                    setSelectedSubcat('all');
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedGender === g.id
                      ? 'bg-[#121214] text-white shadow-xs'
                      : 'text-[#716B64] hover:text-[#121214]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toolbar: Results Count, Mobile Filter Trigger, Sorting */}
        <div className="flex items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#E8E2D8] shadow-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl text-xs font-bold uppercase tracking-wider text-[#121214]"
            >
              <Filter className="w-4 h-4 text-[#C5A880]" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <span className="text-xs text-[#716B64]">
              Showing <strong className="text-[#121214]">{filteredProducts.length}</strong> master pieces
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-[#716B64] font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-[#18181B] focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated &amp; Reviews</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#716B64] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Main Content Layout (Desktop Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-left">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#E8E2D8] rounded-2xl p-6 shadow-xs space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                  <h3 className="font-serif text-base font-bold text-[#18181B]">Filters</h3>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-[#9E2A2B] hover:underline font-semibold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Subcategories (if Gender chosen) */}
              {selectedGender !== 'all' && (subcategoriesByGender as any)[selectedGender] && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88A60] mb-2.5">
                    Category Silhouettes
                  </h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => setSelectedSubcat('all')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedSubcat === 'all' ? 'bg-[#121214] text-white' : 'text-[#52525B] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      All Silhouettes
                    </button>
                    {(subcategoriesByGender as any)[selectedGender].map((sub: string) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcat(sub)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedSubcat === sub ? 'bg-[#121214] text-white' : 'text-[#52525B] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#18181B]">Max Price</span>
                  <span className="font-mono font-bold text-[#C5A880]">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="35000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#121214] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A1A1AA] mt-1">
                  <span>₹2,000</span>
                  <span>₹35,000</span>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88A60] mb-2.5">
                  Available Sizes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSizes.includes(size)
                          ? 'bg-[#121214] text-white border-[#121214]'
                          : 'bg-[#FAF9F6] text-[#52525B] border-[#E8E2D8] hover:border-[#121214]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88A60] mb-2.5">
                  Color Palette
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((col) => {
                    const isSelected = selectedColors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          isSelected
                            ? 'border-[#121214] ring-2 ring-[#C5A880] scale-110'
                            : 'border-[#E8E2D8] hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Toggles: In stock & On Sale */}
              <div className="pt-2 border-t border-[#E8E2D8] space-y-2">
                <label className="flex items-center gap-2 text-xs text-[#18181B] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded accent-[#121214]"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[#18181B] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="rounded accent-[#121214]"
                  />
                  <span className="text-[#9E2A2B] font-semibold">Festive Special Offers Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Right Product Grid (3 cols) */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E8E2D8] rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EFE6] flex items-center justify-center mx-auto text-[#716B64]">
                  <Search className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#18181B]">No garments match your criteria</h3>
                  <p className="text-xs text-[#716B64] mt-1 max-w-sm mx-auto">
                    Try adjusting your filters, price range, or category selections to explore our collections.
                  </p>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A] transition-all shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 text-left shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <h3 className="font-serif text-lg font-bold text-[#18181B]">Refine Garments</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-[#716B64] hover:text-[#18181B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gender selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88A60] mb-2">Gender</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'men', 'women', 'kids'].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setSelectedGender(g);
                        setSelectedSubcat('all');
                      }}
                      className={`py-2 text-xs font-bold uppercase rounded-lg border ${
                        selectedGender === g ? 'bg-[#121214] text-white' : 'border-[#E8E2D8] text-[#52525B]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Max Budget:</span>
                  <span className="text-[#C5A880]">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="35000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#121214]"
                />
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88A60] mb-2">Sizes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border ${
                        selectedSizes.includes(size) ? 'bg-[#121214] text-white' : 'border-[#E8E2D8] text-[#52525B]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={() => {
                  handleClearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-[#9E2A2B]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
