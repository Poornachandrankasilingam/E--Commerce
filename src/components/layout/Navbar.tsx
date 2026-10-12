import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ShieldAlert,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    navigateToShop, 
    cartTotalCount, 
    setIsCartOpen, 
    wishlist, 
    user, 
    setIsAuthModalOpen,
    setIsSearchModalOpen 
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (view: any, gender?: string, category?: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (gender || category) {
      navigateToShop(gender, category);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#18181B] hover:text-[#C5A880] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Crest */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-3.5 group select-none py-1"
          >
            {/* Elegant Monogram Crest */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#121214] border border-[#C5A880]/60 flex items-center justify-center shadow-md group-hover:border-[#C5A880] transition-all transform group-hover:scale-105">
              <span className="font-serif text-[#C5A880] text-sm sm:text-base font-bold tracking-tighter">
                M&amp;M
              </span>
            </div>
            
            {/* Brand Title and Tagline */}
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.18em] text-[#121214] uppercase leading-tight">
                Mr &amp; Mrs
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A88A60] uppercase font-medium">
                Clothing Store
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs uppercase tracking-[0.18em] font-semibold transition-colors py-2 relative ${
                currentView === 'home' ? 'text-[#121214] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C5A880]' : 'text-[#52525B] hover:text-[#121214]'
              }`}
            >
              Home
            </button>

            {/* Men's Mega Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('men')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('shop', 'men')}
                className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] font-semibold text-[#52525B] group-hover:text-[#121214] transition-colors"
              >
                Men
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === 'men' && (
                <div className="absolute top-full -left-4 w-64 bg-white/95 backdrop-blur-md border border-[#E8E2D8] rounded-xl shadow-xl py-4 px-3 animate-fade-in z-50">
                  <div className="text-[11px] font-bold tracking-wider text-[#A88A60] uppercase px-3 pb-2 border-b border-[#F4EFE6] mb-2">
                    Men's Boutique
                  </div>
                  <div className="space-y-1">
                    <button 
                      onClick={() => handleNavClick('shop', 'men', 'Shirts and formal wear')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Shirts &amp; Formal Suits
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'men', 'T-shirts and polo shirts')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Polo Shirts &amp; Tees
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'men', 'Jeans and trousers')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Selvedge Denim &amp; Trousers
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'men', 'Traditional wear')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Bandhgala &amp; Kurta Sets
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'men', 'Hoodies and jackets')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Cashmere Jackets &amp; Suede
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Women's Mega Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('women')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('shop', 'women')}
                className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] font-semibold text-[#52525B] group-hover:text-[#121214] transition-colors"
              >
                Women
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === 'women' && (
                <div className="absolute top-full -left-4 w-64 bg-white/95 backdrop-blur-md border border-[#E8E2D8] rounded-xl shadow-xl py-4 px-3 animate-fade-in z-50">
                  <div className="text-[11px] font-bold tracking-wider text-[#A88A60] uppercase px-3 pb-2 border-b border-[#F4EFE6] mb-2">
                    Women's Atelier
                  </div>
                  <div className="space-y-1">
                    <button 
                      onClick={() => handleNavClick('shop', 'women', 'Dresses and gowns')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Evening Gowns &amp; Dresses
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'women', 'Sarees and salwar suits')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Pure Banarasi Silk Sarees
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'women', 'Kurtis and ethnic wear')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Chikankari Anarkali Sets
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'women', 'Western wear')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Silk Blazers &amp; Trouser Sets
                    </button>
                    <button 
                      onClick={() => handleNavClick('shop', 'women', 'Tops and T-shirts')}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#27272A] hover:bg-[#FAF9F6] hover:text-[#C5A880] rounded transition-colors"
                    >
                      Mulberry Silk Camisoles &amp; Tops
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Kids */}
            <button
              onClick={() => handleNavClick('shop', 'kids')}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#52525B] hover:text-[#121214] transition-colors py-2"
            >
              Kids
            </button>

            {/* New Arrivals */}
            <button
              onClick={() => handleNavClick('shop', 'all', 'new-arrivals')}
              className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] font-semibold text-[#121214] hover:text-[#C5A880] transition-colors py-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              New Arrivals
            </button>

            {/* Collections */}
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#52525B] hover:text-[#121214] transition-colors py-2"
            >
              Collections
            </button>

            {/* Sale */}
            <button
              onClick={() => handleNavClick('shop', 'all', 'sale')}
              className="text-xs uppercase tracking-[0.18em] font-bold text-[#9E2A2B] hover:text-[#BA181B] transition-colors py-2"
            >
              Sale
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 sm:p-2.5 text-[#27272A] hover:text-[#C5A880] hover:bg-[#F3EFE6]/60 rounded-full transition-colors"
              aria-label="Search clothing catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => {
                if (user) {
                  setCurrentView('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 sm:p-2.5 text-[#27272A] hover:text-[#C5A880] hover:bg-[#F3EFE6]/60 rounded-full transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#9E2A2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-subtle">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account Trigger */}
            <button
              onClick={() => {
                if (user) {
                  setCurrentView('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 sm:p-2.5 text-[#27272A] hover:text-[#C5A880] hover:bg-[#F3EFE6]/60 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="User Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              {user && (
                <span className="hidden xl:inline text-xs font-semibold text-[#18181B] truncate max-w-[90px]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Cart Trigger with Counter Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 bg-[#121214] text-white rounded-full hover:bg-[#27272A] transition-all shadow-md group transform active:scale-95"
              aria-label="Open Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A880]" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#C5A880] text-[#121214] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-bold tracking-wider uppercase pr-1">
                Bag
              </span>
            </button>

            {/* Admin Switch Quick Button */}
            <button
              onClick={() => {
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1 ${
                currentView === 'admin'
                  ? 'bg-[#C5A880] text-white border-[#C5A880]'
                  : 'border-[#DCD4C6] text-[#716B64] hover:text-[#121214] hover:border-[#121214]'
              }`}
              title="Admin Dashboard Portal"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline font-semibold">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D8] bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#121214] hover:bg-[#F3EFE6] rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'men')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#121214] hover:bg-[#F3EFE6] rounded-lg"
            >
              Men's Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', 'women')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#121214] hover:bg-[#F3EFE6] rounded-lg"
            >
              Women's Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', 'kids')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#121214] hover:bg-[#F3EFE6] rounded-lg"
            >
              Kids' Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all', 'new-arrivals')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#C5A880] hover:bg-[#F3EFE6] rounded-lg flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#121214] hover:bg-[#F3EFE6] rounded-lg"
            >
              All Collections
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all', 'sale')}
              className="text-left px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#9E2A2B] hover:bg-[#F3EFE6] rounded-lg"
            >
              End of Season Sale
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#716B64] hover:bg-[#F3EFE6] rounded-lg flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
