import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { initiateRazorpayPayment } from '../../services/razorpay';
import { Address, PaymentMethod } from '../../types';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Lock, 
  MapPin, 
  ArrowLeft, 
  Tag, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartFinalTotal, 
    activeCoupon, 
    user, 
    createOrder, 
    navigateToOrderConfirmation, 
    setCurrentView,
    addToast 
  } = useShop();

  // Customer contact info
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');

  // Address fields
  const [addressLine1, setAddressLine1] = useState(user?.addresses[0]?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(user?.addresses[0]?.addressLine2 || '');
  const [landmark, setLandmark] = useState(user?.addresses[0]?.landmark || '');
  const [city, setCity] = useState(user?.addresses[0]?.city || '');
  const [state, setState] = useState(user?.addresses[0]?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(user?.addresses[0]?.pincode || '');
  const [country, setCountry] = useState('India');
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');

  // Checkout options
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay_upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#18181B]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#716B64]">Add luxury garments to your bag before checking out.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A] transition-all"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  const handleSelectSavedAddress = (addr: Address) => {
    setCustomerName(addr.fullName);
    setCustomerPhone(addr.phone);
    setCustomerEmail(addr.email);
    setAddressLine1(addr.addressLine1);
    setAddressLine2(addr.addressLine2 || '');
    setLandmark(addr.landmark || '');
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    setAddressType(addr.type);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      addToast('Validation Error', 'Please complete your contact details.', 'error');
      return;
    }

    if (!addressLine1.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      addToast('Validation Error', 'Please complete your delivery address.', 'error');
      return;
    }

    if (pincode.replace(/\D/g, '').length !== 6) {
      addToast('Validation Error', 'Please enter a valid 6-digit PIN code.', 'error');
      return;
    }

    setIsSubmitting(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      fullName: customerName,
      phone: customerPhone,
      email: customerEmail,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      pincode,
      country,
      isDefault: true,
      type: addressType
    };

    // If COD
    if (paymentMethod === 'cod') {
      try {
        const order = createOrder({
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          shippingMethod,
          paymentMethod: 'cod',
          paymentStatus: 'pending'
        });

        addToast('Order Confirmed!', `Your order #${order.orderNumber} is confirmed via Cash on Delivery.`, 'success');
        navigateToOrderConfirmation(order.id);
      } catch (err) {
        addToast('Order Error', 'Failed to submit order. Please try again.', 'error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Online Payment via Razorpay
    try {
      const generatedOrderNumber = `MM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      await initiateRazorpayPayment({
        amount: cartFinalTotal,
        orderNumber: generatedOrderNumber,
        customerName,
        customerEmail,
        customerPhone,
        onSuccess: (paymentResp) => {
          const order = createOrder({
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            shippingMethod,
            paymentMethod,
            paymentStatus: 'completed',
            razorpayPaymentId: paymentResp.razorpay_payment_id
          });

          addToast('Payment Successful!', `Transaction verified: ${paymentResp.razorpay_payment_id}`, 'success');
          navigateToOrderConfirmation(order.id);
          setIsSubmitting(false);
        },
        onFailure: (err) => {
          addToast('Payment Cancelled', err.message || 'Payment was not completed.', 'warning');
          setIsSubmitting(false);
        }
      });
    } catch (err) {
      addToast('Payment Error', 'Encountered error initiating payment gateway.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Back Button */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#716B64] hover:text-[#18181B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] mt-2">
            Secure White-Glove Checkout
          </h1>
          <p className="text-xs text-[#716B64] mt-1">
            256-bit bank encrypted payment and insured parcel transit.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Client Details, Address, Shipping, Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Contact Details */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#18181B]">
                    1. Patron Contact Information
                  </h3>
                  <span className="text-[11px] text-[#A88A60] font-medium">Guest or Member Checkout</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">Mobile Phone (for delivery SMS) *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">Email Address (for order invoice &amp; tracking) *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="patron@luxurydomain.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#18181B]">
                    2. White-Glove Delivery Destination
                  </h3>
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                </div>

                {/* Saved addresses selector (if customer logged in) */}
                {user && user.addresses.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A88A60]">
                      Saved Addresses:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {user.addresses.map((addr) => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => handleSelectSavedAddress(addr)}
                          className={`p-3 text-left rounded-xl border text-xs transition-colors ${
                            addressLine1 === addr.addressLine1
                              ? 'border-[#121214] bg-[#F7F5F0]'
                              : 'border-[#E8E2D8] hover:border-[#C5A880]'
                          }`}
                        >
                          <span className="font-bold text-[#18181B] block">{addr.fullName} ({addr.type})</span>
                          <span className="text-[#52525B] line-clamp-1">{addr.addressLine1}, {addr.city}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">Street Address &amp; Residence / Villa *</label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. Bungalow 14, Royal Palm Estates, Juhu Tara Road"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">Apartment, Suite, Unit (optional)</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Penthouse 5B"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">Prominent Landmark (optional)</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Sea Princess Promenade"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">PIN Code *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 400049"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Address type tag */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-semibold text-[#18181B]">Address Type:</span>
                  {(['home', 'work', 'other'] as const).map((t) => (
                    <label key={t} className="flex items-center gap-1.5 text-xs text-[#52525B] cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        checked={addressType === t}
                        onChange={() => setAddressType(t)}
                        className="accent-[#121214]"
                      />
                      <span className="capitalize">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Shipping Method */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#18181B]">
                    3. Dispatch &amp; Transit Method
                  </h3>
                  <Truck className="w-4 h-4 text-[#C5A880]" />
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard' ? 'border-[#121214] bg-[#F7F5F0]' : 'border-[#E8E2D8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-[#121214]"
                      />
                      <div>
                        <span className="font-bold text-xs text-[#18181B] block">
                          Complimentary White-Glove Delivery (3-4 Business Days)
                        </span>
                        <span className="text-[11px] text-[#716B64]">
                          Insured transit with signature verification on arrival
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800">FREE</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express' ? 'border-[#121214] bg-[#F7F5F0]' : 'border-[#E8E2D8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-[#121214]"
                      />
                      <div>
                        <span className="font-bold text-xs text-[#18181B] block">
                          Priority Air Express Courier (1-2 Business Days)
                        </span>
                        <span className="text-[11px] text-[#716B64]">
                          Guaranteed next-flight out via BlueDart Apex Air
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#18181B]">₹250</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Payment Methods */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#18181B]">
                    4. Payment Selection
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                </div>

                <div className="space-y-3">
                  {/* Razorpay UPI */}
                  <label
                    onClick={() => setPaymentMethod('razorpay_upi')}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'razorpay_upi' ? 'border-[#121214] bg-[#F7F5F0]' : 'border-[#E8E2D8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'razorpay_upi'}
                      onChange={() => setPaymentMethod('razorpay_upi')}
                      className="accent-[#121214] mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#18181B]">
                          UPI (Google Pay, PhonePe, Paytm, BHIM)
                        </span>
                        <span className="px-2 py-0.5 bg-[#C5A880]/20 text-[#A88A60] rounded text-[10px] font-bold">
                          INSTANT
                        </span>
                      </div>
                      <p className="text-[11px] text-[#716B64] mt-0.5">
                        Seamless 0% surcharge mobile checkout powered by Razorpay.
                      </p>
                    </div>
                  </label>

                  {/* Razorpay Cards */}
                  <label
                    onClick={() => setPaymentMethod('razorpay_card')}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'razorpay_card' ? 'border-[#121214] bg-[#F7F5F0]' : 'border-[#E8E2D8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'razorpay_card'}
                      onChange={() => setPaymentMethod('razorpay_card')}
                      className="accent-[#121214] mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#18181B]">
                          Credit &amp; Debit Cards (Visa, Mastercard, Amex, RuPay)
                        </span>
                        <CreditCard className="w-4 h-4 text-[#716B64]" />
                      </div>
                      <p className="text-[11px] text-[#716B64] mt-0.5">
                        Encrypted bank tokenization via Razorpay. We never store raw card numbers.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#121214] bg-[#F7F5F0]' : 'border-[#E8E2D8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#121214] mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#18181B]">
                          Cash on Delivery (COD)
                        </span>
                        <Banknote className="w-4 h-4 text-[#716B64]" />
                      </div>
                      <p className="text-[11px] text-[#716B64] mt-0.5">
                        Inspect custom garment seal and pay cash or QR code on delivery.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs space-y-4 sticky top-28">
                <h3 className="font-serif text-lg font-bold text-[#18181B] border-b border-[#F0ECE1] pb-3">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Line items mini preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#18181B] truncate">{item.product.name}</h4>
                        <p className="text-[#716B64] text-[11px]">
                          Qty: {item.quantity} • {item.size} • {item.color}
                        </p>
                      </div>
                      <div className="text-right font-bold text-[#18181B]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2.5 text-xs text-[#52525B] pt-4 border-t border-[#F0ECE1]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#18181B]">₹{cartSubtotal.toLocaleString()}</span>
                  </div>

                  {activeCoupon && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        Voucher ({activeCoupon.code})
                      </span>
                      <span>-₹{cartDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>
                      {shippingMethod === 'express' ? '₹250' : cartShipping === 0 ? (
                        <strong className="text-emerald-700">FREE</strong>
                      ) : (
                        `₹${cartShipping}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#18181B] pt-3 border-t border-[#F0ECE1]">
                    <span>Total Due</span>
                    <span className="font-serif text-xl text-[#121214]">
                      ₹{(cartFinalTotal + (shippingMethod === 'express' ? 250 : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#121214] hover:bg-[#27272A] disabled:bg-[#71717A] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
                >
                  <Lock className="w-4 h-4 text-[#C5A880]" />
                  <span>{isSubmitting ? 'Verifying & Securing Order...' : 'Place Verified Order'}</span>
                </button>

                <div className="text-[10px] text-center text-[#716B64] space-y-1 pt-2">
                  <p className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Protected by Razorpay PCI-DSS Level 1 Security</span>
                  </p>
                  <p>Order confirmation with receipt will be generated instantly.</p>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
