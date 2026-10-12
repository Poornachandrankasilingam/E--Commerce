import React, { useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Printer, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  Truck, 
  Sparkles,
  Clock
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { selectedOrderId, orders, setCurrentView, navigateToShop } = useShop();

  const order = orders.find(o => o.id === selectedOrderId || o.orderNumber === selectedOrderId) || orders[0];

  useEffect(() => {
    // Trigger celebratory confetti animation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#121214', '#D4AF37', '#FAF9F6']
      });
    } catch (e) {
      console.log('Confetti rendered');
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">No Order Found</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-2 bg-[#121214] text-white text-xs font-bold uppercase rounded-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const steps = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = steps.indexOf(order.orderStatus);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 text-left print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Celebration Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E2D8] shadow-md text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFE6] text-[#A88A60] text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Verified Couture Order Confirmed</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B]">
              Thank You, {order.customerName}
            </h1>
            <p className="text-xs sm:text-sm text-[#716B64] mt-1 max-w-md mx-auto">
              Your garments are now being prepared at our master atelier. A detailed confirmation and receipt has been sent to <strong className="text-[#18181B]">{order.customerEmail}</strong>.
            </p>
          </div>

          {/* Order Details Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-3 bg-[#FAF9F6] border border-[#E8E2D8] rounded-2xl text-xs">
            <div>
              <span className="text-[#716B64] block text-[10px] uppercase font-bold tracking-wider">Order Reference:</span>
              <span className="font-mono font-bold text-sm text-[#18181B]">#{order.orderNumber}</span>
            </div>
            <span className="text-[#DCD4C6] hidden sm:inline">•</span>
            <div>
              <span className="text-[#716B64] block text-[10px] uppercase font-bold tracking-wider">Courier Consignment:</span>
              <span className="font-mono font-bold text-sm text-[#A88A60]">{order.trackingNumber || 'TRK-MM-910248'}</span>
            </div>
            <span className="text-[#DCD4C6] hidden sm:inline">•</span>
            <div>
              <span className="text-[#716B64] block text-[10px] uppercase font-bold tracking-wider">Est. Arrival:</span>
              <span className="font-bold text-sm text-emerald-800">{order.estimatedDeliveryDate}</span>
            </div>
          </div>
        </div>

        {/* Order Status Timeline Tracker */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs mb-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#F0ECE1] pb-3">
            <h3 className="font-serif text-lg font-bold text-[#18181B] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span>Atelier Order Progress Tracker</span>
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#121214] text-[#E5D7C3]">
              Status: {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 relative">
            {steps.map((st, idx) => {
              const isPast = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={st} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      isCurrent
                        ? 'bg-[#C5A880] text-[#121214] ring-4 ring-[#C5A880]/30 shadow-md'
                        : isPast
                        ? 'bg-[#121214] text-white'
                        : 'bg-[#F0ECE1] text-[#A1A1AA]'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-semibold tracking-wider uppercase ${
                      isPast ? 'text-[#18181B]' : 'text-[#A1A1AA]'
                    }`}
                  >
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Itemized Receipt & Delivery Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Order Items List (7 cols) */}
          <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#18181B] border-b border-[#F0ECE1] pb-3">
              Itemized Garment Manifest
            </h3>

            <div className="space-y-4 divide-y divide-[#F0ECE1]">
              {order.items.map((it, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex gap-4 text-xs">
                  <img
                    src={it.productImage}
                    alt={it.productName}
                    className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#18181B] text-sm truncate">{it.productName}</h4>
                    <p className="text-[#716B64] mt-0.5">
                      Size: <strong className="text-[#18181B]">{it.size}</strong> • Color:{' '}
                      <strong className="text-[#18181B]">{it.color}</strong>
                    </p>
                    <p className="text-[11px] text-[#A88A60] font-mono mt-0.5">SKU: {it.sku}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#716B64]">Qty: {it.quantity}</span>
                      <span className="font-bold text-sm text-[#18181B]">
                        ₹{it.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#F0ECE1] space-y-2 text-xs text-[#52525B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#18181B]">₹{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Voucher Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                  <span className="font-semibold">-₹{order.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span>{order.shippingFee === 0 ? <strong className="text-emerald-800">FREE</strong> : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#18181B] pt-2 border-t border-[#F0ECE1]">
                <span>Total Amount Paid / Due</span>
                <span className="font-serif text-lg text-[#121214]">₹{order.finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Details (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Delivery address */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#A88A60] font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Delivery Address</span>
              </div>
              <p className="font-bold text-sm text-[#18181B]">{order.shippingAddress.fullName}</p>
              <p className="text-[#52525B] leading-relaxed">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                <br />
                {order.shippingAddress.country}
              </p>
              <p className="text-[#52525B] pt-1">
                Phone: <strong className="text-[#18181B]">{order.shippingAddress.phone}</strong>
              </p>
            </div>

            {/* Payment Summary */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#A88A60] font-bold uppercase tracking-wider mb-1">
                <CreditCard className="w-4 h-4" />
                <span>Payment Verification</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B64]">Method:</span>
                <span className="font-bold text-[#18181B] uppercase">{order.paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B64]">Status:</span>
                <span className="font-bold text-emerald-700 uppercase">{order.paymentStatus}</span>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-[#716B64]">Transaction ID:</span>
                  <span className="font-mono text-[11px] text-[#18181B]">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E8E2D8] text-[#18181B] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#FAF9F6] transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#A88A60]" />
            <span>Print Invoice &amp; Receipt</span>
          </button>

          <button
            onClick={() => navigateToShop('all')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-xl hover:bg-[#27272A] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

      </div>
    </div>
  );
};
