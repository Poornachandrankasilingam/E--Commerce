import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    navigateToProduct, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    addToCart,
    setIsCartOpen 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const isFav = isInWishlist(product.id);

  const primaryImage = product.images[selectedImage] || product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    const defaultColor = product.colors[0] || { name: 'Standard', hex: '#111111' };
    addToCart(product, size, defaultColor.name, defaultColor.hex, 1);
    setIsCartOpen(true);
  };

  return (
    <div 
      className="group relative flex flex-col text-left cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateToProduct(product.id)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F0ECE1] shadow-xs group-hover:shadow-lg transition-all duration-500">
        
        {/* Main Product Image with subtle zoom & hover transition */}
        <img
          src={isHovered && product.images.length > 1 ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="inline-flex items-center gap-1 bg-[#121214] text-[#E5D7C3] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
              <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center bg-[#C5A880] text-[#121214] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
              Bestseller
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="inline-flex items-center bg-[#9E2A2B] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              {product.discountPercent}% Off
            </span>
          )}
        </div>

        {/* Floating Actions on Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isFav
                ? 'bg-[#FDF0ED] text-[#9E2A2B]'
                : 'bg-white/85 text-[#18181B] hover:text-[#9E2A2B] hover:bg-white'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-[#9E2A2B]' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#18181B] hover:text-[#C5A880] flex items-center justify-center backdrop-blur-md transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Size Selector Bar (Slides up on Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <div className="text-[10px] text-white/90 font-medium tracking-wider uppercase mb-1.5 text-center">
            Quick Add Size
          </div>
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(e, size)}
                className="px-2 py-1 bg-white/90 hover:bg-white text-[#121214] text-[10px] font-bold rounded shadow-xs transition-colors hover:text-[#C5A880]"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-[#716B64]">
          <span className="uppercase font-semibold tracking-wider text-[#A88A60]">
            {product.category}
          </span>
          <div className="flex items-center text-[#D4AF37]">
            <Star className="w-3 h-3 fill-[#D4AF37]" />
            <span className="font-bold ml-1 text-[#18181B]">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-serif text-sm sm:text-base font-bold text-[#18181B] group-hover:text-[#C5A880] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-[#716B64] line-clamp-1">
          {product.tagline || product.material}
        </p>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-serif text-sm sm:text-base font-bold text-[#18181B]">
            ₹{product.sellingPrice.toLocaleString()}
          </span>
          {product.originalPrice > product.sellingPrice && (
            <span className="text-xs text-[#A1A1AA] line-through font-normal">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
