import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Award,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateToShop, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    addToast(
      'Welcome to the Privé Circle', 
      'Use code WELCOME10 for 10% off your first luxury order.', 
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#111113] text-[#FAF9F6] border-t border-[#27272A] mt-24">
      {/* Brand Value Pillars */}
      <div className="border-b border-[#27272A] py-10 bg-[#161619]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#202025] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#E5D7C3]">Express White-Glove Delivery</h4>
                <p className="text-xs text-[#A1A1AA] mt-1">Complimentary across India on orders over ₹1,999</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#202025] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#E5D7C3]">Seamless 7-Day Returns</h4>
                <p className="text-xs text-[#A1A1AA] mt-1">Hassle-free doorstep exchanges and reverse pick-up</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#202025] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#E5D7C3]">100% Certified Fabrics</h4>
                <p className="text-xs text-[#A1A1AA] mt-1">Pure Banarasi silk, Supima cotton &amp; Italian wools</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#202025] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#E5D7C3]">Encrypted Razorpay Checkout</h4>
                <p className="text-xs text-[#A1A1AA] mt-1">256-bit bank grade security &amp; Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1F1F24] border border-[#C5A880] flex items-center justify-center shadow-lg">
                <span className="font-serif text-[#C5A880] font-bold text-sm tracking-tighter">M&amp;M</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-[0.16em] uppercase text-white">
                  Mr &amp; Mrs
                </h3>
                <p className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-semibold">
                  Clothing Store
                </p>
              </div>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm">
              <span className="text-[#E5D7C3] font-serif italic text-sm">“Style for Him. Elegance for Her.”</span>
              <br />
              An intimate sartorial house crafting bespoke fashion, festive couture, and everyday luxury essentials tailored to perfection.
            </p>

            <div className="space-y-2.5 text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>The Flagship Atelier, 42 Heritage Promenade, Colaba, Mumbai 400001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>Concierge: +91 (022) 8899-7700 / +91 98200 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>concierge@mrandmrsclothing.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#instagram" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#1F1F24] border border-[#2D2D33] flex items-center justify-center text-[#A1A1AA] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#facebook" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#1F1F24] border border-[#2D2D33] flex items-center justify-center text-[#A1A1AA] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a 
                href="#twitter" 
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-[#1F1F24] border border-[#2D2D33] flex items-center justify-center text-[#A1A1AA] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Collections Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#E5D7C3] border-b border-[#27272A] pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <button onClick={() => navigateToShop('men')} className="hover:text-white transition-colors">
                  Men's Formal Suits &amp; Tuxedos
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('men', 'T-shirts and polo shirts')} className="hover:text-white transition-colors">
                  Bespoke Supima Polos
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('women', 'Dresses and gowns')} className="hover:text-white transition-colors">
                  Aurelia Evening Gowns
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('women', 'Sarees and salwar suits')} className="hover:text-white transition-colors">
                  Pure Banarasi Katan Silk Sarees
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('women', 'Kurtis and ethnic wear')} className="hover:text-white transition-colors">
                  Chikankari Hand-Embroidered
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('kids')} className="hover:text-white transition-colors">
                  Junior Royal Sherwanis &amp; Lehengas
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('all', 'sale')} className="text-[#C5A880] hover:underline transition-colors font-medium">
                  End of Season Festive Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#E5D7C3] border-b border-[#27272A] pb-2">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li><a href="#about" className="hover:text-white transition-colors">About Our Atelier</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact &amp; Personal Styling</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">White-Glove Shipping Policy</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Returns &amp; Refund Policy</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy &amp; Data Protection</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#E5D7C3] border-b border-[#27272A] pb-2">
              Privé VIP Circle
            </h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Subscribe to receive private preview invitations, runway lookbooks, and 10% off your maiden purchase.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#18181C] border border-[#2D2D33] text-white placeholder-[#71717A] focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98"
              >
                <span>Join VIP Circle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-[#71717A]">
              By subscribing, you agree to our privacy policy. Unsubscribe anytime.
            </p>
          </div>

        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="mt-14 pt-8 border-t border-[#202025] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} Mr &amp; Mrs Clothing Store. All rights reserved. Crafted with distinction.</p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-[11px] text-[#A1A1AA] font-medium uppercase tracking-wider">Secured Payments</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#1C1C22] border border-[#2E2E38] rounded text-[10px] font-bold text-[#E5D7C3]">
                RAZORPAY
              </span>
              <span className="px-2.5 py-1 bg-[#1C1C22] border border-[#2E2E38] rounded text-[10px] font-bold text-white">
                UPI / GPay
              </span>
              <span className="px-2.5 py-1 bg-[#1C1C22] border border-[#2E2E38] rounded text-[10px] font-bold text-[#A1A1AA]">
                VISA
              </span>
              <span className="px-2.5 py-1 bg-[#1C1C22] border border-[#2E2E38] rounded text-[10px] font-bold text-[#A1A1AA]">
                MASTERCARD
              </span>
              <span className="px-2.5 py-1 bg-[#1C1C22] border border-[#2E2E38] rounded text-[10px] font-bold text-[#C5A880]">
                COD AVAILABLE
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
