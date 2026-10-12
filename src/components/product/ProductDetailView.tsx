import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { StorageService } from '../../services/storage';
import { ProductCard } from './ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Ruler, 
  Plus, 
  Minus, 
  Check, 
  Share2, 
  MapPin, 
  ChevronRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Review } from '../../types';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    setIsSizeGuideOpen,
    setCurrentView,
    addToast 
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  // Review submission state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || { name: 'Standard', hex: '#111111' });
      setQuantity(1);
      setPincodeResult(null);
      StorageService.addRecentlyViewed(product);
      setReviews(StorageService.getReviews(product.id));
    }
  }, [product?.id]);

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  // Current variant inventory check
  const currentVariant = product.variants?.find(
    v => v.size === selectedSize && v.color === selectedColor?.name
  );
  const availableStock = currentVariant ? currentVariant.stock : product.totalStock;
  const isOutOfStock = availableStock <= 0;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    if (isOutOfStock) {
      addToast('Out of Stock', 'This size & color variant is temporarily out of stock.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor.name, selectedColor.hex, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (!selectedColor) return;
    if (isOutOfStock) {
      addToast('Out of Stock', 'This size & color variant is temporarily out of stock.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor.name, selectedColor.hex, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    const estDays = product.estimatedDeliveryDays || 3;
    const date = new Date();
    date.setDate(date.getDate() + estDays);
    const dateStr = date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    setPincodeResult(`Express Delivery available to ${pincode} by ${dateStr}. White-glove concierge dispatch.`);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewTitle.trim() || !newReviewComment.trim()) {
      addToast('Incomplete Review', 'Please fill in all review fields.', 'error');
      return;
    }

    const created = StorageService.addReview({
      productId: product.id,
      customerName: newReviewAuthor.trim(),
      rating: newReviewRating,
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    });

    setReviews(prev => [created, ...prev]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    addToast('Review Submitted', 'Thank you for your valuable feedback!', 'success');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  // Recently viewed
  const recentlyViewed = StorageService.getRecentlyViewed().filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#716B64] mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => setCurrentView('home')} className="hover:text-[#121214] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#DCD4C6] flex-shrink-0" />
          <button 
            onClick={() => setCurrentView('shop')} 
            className="hover:text-[#121214] transition-colors capitalize"
          >
            {product.gender}'s Collection
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#DCD4C6] flex-shrink-0" />
          <span className="text-[#18181B] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Section (Gallery + Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Product Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Interactive Zoom Photo */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-[#F0ECE1] border border-[#E8E2D8] shadow-md group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-zoom-in"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isNewArrival && (
                  <span className="bg-[#121214] text-[#E5D7C3] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    New Arrival
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-[#9E2A2B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Fullscreen indicator */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-3 py-1.5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Hover to Zoom Fabric Detail
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx 
                        ? 'border-[#C5A880] ring-3 ring-[#C5A880]/30 scale-102' 
                        : 'border-[#E8E2D8] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Craftsmanship Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E2D8] text-xs text-[#52525B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Handcrafted in India</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A880]" />
                <span>Express White-Glove</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#C5A880]" />
                <span>7-Day Return Privilege</span>
              </div>
            </div>

          </div>

          {/* Product Purchasing Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs text-[#716B64] mb-1">
                <span className="uppercase font-bold tracking-[0.2em] text-[#A88A60]">
                  {product.category} • {product.gender}
                </span>
                <span className="font-mono text-[11px]">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs sm:text-sm text-[#716B64] italic mt-1 font-serif">
                  {product.tagline}
                </p>
              )}

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3 mt-3 text-xs">
                <div className="flex items-center text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                  <span className="font-bold ml-1 text-[#18181B]">{product.rating}</span>
                  <span className="text-[#716B64] ml-1">({product.reviewCount} verified reviews)</span>
                </div>
                <span className="text-[#DCD4C6]">•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Atelier Inventory
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#18181B]">
                  ₹{product.sellingPrice.toLocaleString()}
                </span>
                {product.originalPrice > product.sellingPrice && (
                  <>
                    <span className="text-sm text-[#A1A1AA] line-through font-normal">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#9E2A2B] bg-[#FDF0ED] px-2 py-0.5 rounded">
                      SAVE {product.discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-[#716B64] mt-1">
                Inclusive of all taxes. Free express shipping on orders over ₹1,999.
              </p>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#18181B]">
                  Select Color: <span className="font-normal text-[#52525B]">{selectedColor?.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor?.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-[#121214] ring-2 ring-[#C5A880] scale-110'
                          : 'border-[#E8E2D8] hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#111111' || c.hex === '#14213d' ? 'text-white' : 'text-black'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#18181B]">
                  Select Size: <span className="font-normal text-[#52525B]">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#A88A60] hover:underline font-semibold flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#121214] text-white border-[#121214] shadow-xs'
                          : 'bg-white text-[#18181B] border-[#E8E2D8] hover:border-[#121214]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Stock Status */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center border border-[#E8E2D8] rounded-xl bg-white shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-[#52525B] hover:text-[#18181B] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#18181B]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  className="p-2.5 text-[#52525B] hover:text-[#18181B] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right text-xs">
                {isOutOfStock ? (
                  <span className="text-[#9E2A2B] font-bold">Temporarily Out of Stock</span>
                ) : availableStock <= 4 ? (
                  <span className="text-[#9E2A2B] font-bold animate-pulse">
                    Only {availableStock} pieces remaining in stock!
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock &amp; Ready to Ship
                  </span>
                )}
              </div>
            </div>

            {/* CTAs: Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-4 bg-[#121214] hover:bg-[#27272A] disabled:bg-[#A1A1AA] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Shopping Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl border transition-colors flex items-center justify-center ${
                    isFav
                      ? 'bg-[#FDF0ED] border-[#FADBD8] text-[#9E2A2B]'
                      : 'bg-white border-[#E8E2D8] text-[#52525B] hover:text-[#18181B]'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-[#9E2A2B]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-4 bg-[#C5A880] hover:bg-[#B38F58] disabled:bg-[#DCD4C6] text-[#121214] text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all shadow-lg active:scale-98"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#18181B]">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>Check Delivery &amp; COD Availability</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#121214] text-white rounded-xl hover:bg-[#27272A] transition-colors"
                >
                  Verify
                </button>
              </form>
              {pincodeResult && (
                <p className="text-xs text-[#52525B] pt-1 leading-relaxed">
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* Fabric Details Accordion / Cards */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] space-y-3 text-xs text-[#52525B]">
              <div>
                <h4 className="font-bold text-[#18181B] mb-0.5">Fabric &amp; Composition</h4>
                <p>{product.material}</p>
              </div>
              <div className="pt-2 border-t border-[#F0ECE1]">
                <h4 className="font-bold text-[#18181B] mb-0.5">Luxury Garment Care</h4>
                <p>{product.careInstructions}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Product Reviews & Ratings Section */}
        <section className="mt-20 pt-12 border-t border-[#E8E2D8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A88A60] block mb-1">
                Verified Patrons
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121214]">
                Customer Reviews ({reviews.length})
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-5 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A] transition-colors self-start sm:self-auto"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* Write a Review Modal / Form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="mb-10 p-6 rounded-2xl bg-white border border-[#C5A880]/50 shadow-md space-y-4 max-w-2xl animate-fade-in">
              <h3 className="font-serif text-lg font-bold text-[#18181B]">
                Share Your Experience with {product.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Maharani Gayatri S."
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">Star Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value={5}>★★★★★ (5/5 Exceptional)</option>
                    <option value={4}>★★★★☆ (4/5 Very Good)</option>
                    <option value={3}>★★★☆☆ (3/5 Average)</option>
                    <option value={2}>★★☆☆☆ (2/5 Below Expectations)</option>
                    <option value={1}>★☆☆☆☆ (1/5 Poor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18181B] mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Impeccable tailoring and breathtaking silk quality"
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18181B] mb-1">Detailed Feedback</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the fit, drape, texture, and compliments received..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Publish Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
              <p className="text-xs text-[#716B64] italic">
                Be the first to review this artisanal creation.
              </p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#A1A1AA]">
                      {new Date(rev.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#18181B]">{rev.title}</h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">{rev.comment}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE1] text-[11px] text-[#716B64]">
                    <span className="font-semibold text-[#18181B]">{rev.customerName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E8E2D8]">
            <div className="mb-8">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A88A60] block mb-1">
                Complementary Styles
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121214]">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E8E2D8]">
            <div className="mb-8">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A88A60] block mb-1">
                Your Browsing Journey
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121214]">
                Recently Viewed
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
