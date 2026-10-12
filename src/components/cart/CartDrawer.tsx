import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Truck, 
  Tag, 
  Sparkles 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartFinalTotal,
    activeCoupon,
    couponMessage,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    navigateToShop
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E8E2D8] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E8E2D8] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-lg font-bold text-[#18181B] tracking-wide uppercase">
                Shopping Bag
              </h3>
              <span className="text-xs text-[#716B64] font-medium">({cart.length} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#716B64] hover:text-[#18181B] hover:bg-[#F3EFE6] rounded-full transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#F4EFE6] border-b border-[#E8E2D8] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#18181B]">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  {remainingForFreeShipping > 0 ? (
                    <span>Add <strong className="text-[#A88A60]">₹{remainingForFreeShipping.toLocaleString()}</strong> more for <strong>FREE Express Delivery</strong></span>
                  ) : (
                    <span className="text-emerald-800 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Unlocked FREE Express White-Glove Delivery!
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-[#716B64] font-semibold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-[#E5D7C3] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#121214] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EFE6] border border-[#E8E2D8] flex items-center justify-center text-[#716B64]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#18181B]">Your Shopping Bag is Empty</h4>
                  <p className="text-xs text-[#716B64] mt-1 max-w-xs">
                    Explore our curated festive suits, silk sarees, and bespoke attire to elevate your wardrobe.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToShop('all');
                  }}
                  className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#27272A] transition-all shadow-md"
                >
                  Explore New Arrivals
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-white border border-[#E8E2D8] rounded-xl shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#18181B] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A1A1AA] hover:text-[#9E2A2B] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#716B64] mt-0.5">
                        Size: <span className="font-semibold text-[#18181B]">{item.size}</span> | Color:{' '}
                        <span className="font-semibold text-[#18181B]">{item.color}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8E2D8] rounded-lg bg-[#FAF9F6]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#52525B] hover:text-[#18181B] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#18181B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#52525B] hover:text-[#18181B] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#18181B]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D8] bg-white space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#A88A60] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder={activeCoupon ? `Applied: ${activeCoupon.code}` : "Coupon Code (e.g. WELCOME10)"}
                      className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-[#FAF9F6] border border-[#E8E2D8] rounded-lg focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  {activeCoupon ? (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="px-3 py-2 text-xs font-bold uppercase text-[#9E2A2B] bg-[#FDF0ED] hover:bg-[#FADBD8] rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold uppercase bg-[#121214] text-white hover:bg-[#27272A] rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {couponMessage && (
                  <p className="text-[11px] text-[#A88A60] font-medium">{couponMessage}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-[#52525B] border-t border-[#F0ECE1] pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-[#18181B] font-semibold">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Voucher Discount</span>
                    <span className="font-semibold">-₹{cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span>{cartShipping === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `₹${cartShipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#18181B] border-t border-[#F0ECE1] pt-2">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#121214]">₹{cartFinalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#121214] hover:bg-[#27272A] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-[#716B64]">
                Taxes included. Cash on Delivery &amp; Razorpay available at checkout.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
