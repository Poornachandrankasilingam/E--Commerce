import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  Plus, 
  Minus, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateToProduct,
    setIsSizeGuideOpen 
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sync state when quickViewProduct changes
  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setSelectedColor(quickViewProduct.colors[0] || { name: 'Standard', hex: '#111111' });
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFav = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(quickViewProduct, selectedSize, selectedColor.name, selectedColor.hex, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFull = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateToProduct(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E8E2D8] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left: Gallery Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#E8E2D8]">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F4EFE6] group shadow-inner">
            <img
              src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {quickViewProduct.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#9E2A2B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                {quickViewProduct.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-5">
          
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A88A60]">
                  {quickViewProduct.gender} • {quickViewProduct.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B] mt-0.5">
                  {quickViewProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-1.5 text-[#716B64] hover:text-[#18181B] hover:bg-[#F3EFE6] rounded-full transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ratings & SKU */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center text-[#D4AF37]">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span className="font-bold ml-1 text-[#18181B]">{quickViewProduct.rating}</span>
                <span className="text-[#716B64] ml-1">({quickViewProduct.reviewCount} reviews)</span>
              </div>
              <span className="text-[#DCD4C6]">•</span>
              <span className="text-[#716B64] font-mono text-[11px]">SKU: {quickViewProduct.sku}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-serif text-2xl font-bold text-[#18181B]">
                ₹{quickViewProduct.sellingPrice.toLocaleString()}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.sellingPrice && (
                <span className="text-sm text-[#A1A1AA] line-through">
                  ₹{quickViewProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description excerpt */}
            <p className="text-xs text-[#52525B] leading-relaxed mt-3 line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#18181B]">
                  Color: <span className="font-normal text-[#52525B]">{selectedColor?.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor?.name === c.name
                        ? 'border-[#121214] scale-110 ring-2 ring-[#C5A880]/50'
                        : 'border-[#E8E2D8] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#18181B]">
                  Size: <span className="font-normal text-[#52525B]">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#A88A60] hover:underline font-medium text-[11px]"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === s
                        ? 'bg-[#121214] text-white border-[#121214]'
                        : 'bg-white text-[#18181B] border-[#E8E2D8] hover:border-[#121214]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Stock */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center border border-[#E8E2D8] rounded-xl bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#52525B] hover:text-[#18181B]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-[#18181B]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#52525B] hover:text-[#18181B]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs">
                {quickViewProduct.totalStock <= 5 ? (
                  <span className="text-[#9E2A2B] font-bold">Only {quickViewProduct.totalStock} pieces available</span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ready for dispatch
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#121214] hover:bg-[#27272A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-3 rounded-xl border transition-colors ${
                  isFav
                    ? 'bg-[#FDF0ED] border-[#FADBD8] text-[#9E2A2B]'
                    : 'bg-white border-[#E8E2D8] text-[#52525B] hover:text-[#18181B]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-[#9E2A2B]' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewFull}
              className="w-full py-2 text-center text-xs text-[#A88A60] hover:text-[#121214] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Complete Craftsmanship Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
