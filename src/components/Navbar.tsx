import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Sparkles, X, Menu, Crown } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onOpenShadeFinder: () => void;
  onOpenEliteModal: () => void;
  isEliteMember: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  selectedCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onOpenShadeFinder,
  onOpenEliteModal,
  isEliteMember,
  searchQuery,
  onSearchChange,
}) => {
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Editorial Announcement Banner (<= 40px) */}
      {showTopBanner && (
        <div className="bg-[#1C1917] text-stone-200 text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-widest uppercase font-semibold text-[11px]">L’AURA ATELIER</span>
            </span>
            <span className="hidden sm:inline text-stone-600">·</span>
            <span className="hidden sm:inline text-stone-300">Complimentary Doorstep Shipping on ₹499+</span>
            <span className="text-stone-600">·</span>
            <span>Use code <strong className="text-[#D4AF37] tracking-wider font-mono">LUMIERE15</strong> for 15% off first order</span>
          </div>
          <button 
            onClick={() => setShowTopBanner(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar (3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Zone 1: Distinct Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onSelectCategory('all')} 
              className="text-left group focus:outline-none"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                  L’AURA
                </span>
                <span className="text-xs uppercase tracking-widest font-sans font-light text-stone-500">
                  BEAUTÉ
                </span>
              </div>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-stone-400 -mt-1 font-sans">
                Paris · Mumbai · Grasse
              </span>
            </button>
          </div>

          {/* Zone 2: Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-stone-700">
            <button 
              onClick={() => onSelectCategory('skincare')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                selectedCategory === 'skincare' ? 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900' : ''
              }`}
            >
              Skincare
            </button>
            <button 
              onClick={() => onSelectCategory('makeup')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                selectedCategory === 'makeup' ? 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900' : ''
              }`}
            >
              Makeup
            </button>
            <button 
              onClick={() => onSelectCategory('haircare')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                selectedCategory === 'haircare' ? 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900' : ''
              }`}
            >
              Haircare
            </button>
            <button 
              onClick={() => onSelectCategory('fragrance')}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                selectedCategory === 'fragrance' ? 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900' : ''
              }`}
            >
              Fragrances
            </button>
            <button 
              onClick={onOpenQuiz}
              className="text-[#9E4732] hover:text-stone-950 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Skin Ritual Architect</span>
            </button>
            <button 
              onClick={onOpenShadeFinder}
              className="text-stone-700 hover:text-stone-950 flex items-center gap-1.5 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#873E4B] inline-block shadow-sm"></span>
              <span>Swatch Studio</span>
            </button>
          </nav>

          {/* Zone 3: Search, Privé Badge, Wishlist & Bag */}
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search actives, lipsticks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 text-xs bg-stone-100/80 border border-stone-200 rounded-md focus:outline-none focus:border-stone-500 focus:bg-white transition-all text-stone-900 placeholder-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* L'Aura Privé VIP Club */}
            <button
              onClick={onOpenEliteModal}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium tracking-wide uppercase transition-all ${
                isEliteMember
                  ? 'bg-amber-100/80 text-amber-950 border border-amber-300'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] font-semibold">{isEliteMember ? 'Privé Member' : 'Join Privé'}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="View Saved Wishlist"
              className="relative p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#873E4B] text-white rounded-full text-[10px] font-bold flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="relative flex items-center gap-2 px-3.5 py-2 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-[#D4AF37] text-stone-950 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-stone-700 hover:text-stone-900 rounded-md"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search botanical formulas, serums..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 border border-stone-200 rounded-md focus:outline-none focus:border-stone-500 text-stone-900"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Mobile drawer menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-3 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button 
                onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded bg-stone-100 text-stone-900 font-semibold"
              >
                All Formulas
              </button>
              <button 
                onClick={() => { onSelectCategory('skincare'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded hover:bg-stone-100 text-stone-700"
              >
                Skincare
              </button>
              <button 
                onClick={() => { onSelectCategory('makeup'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded hover:bg-stone-100 text-stone-700"
              >
                Makeup
              </button>
              <button 
                onClick={() => { onSelectCategory('haircare'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded hover:bg-stone-100 text-stone-700"
              >
                Haircare
              </button>
              <button 
                onClick={() => { onSelectCategory('fragrance'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded hover:bg-stone-100 text-stone-700"
              >
                Fragrances
              </button>
              <button 
                onClick={() => { onOpenEliteModal(); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded bg-amber-50 text-amber-900 font-semibold flex items-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>L’Aura Privé Club</span>
              </button>
            </div>

            <div className="flex gap-2 pt-2 border-t border-stone-200">
              <button 
                onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
                className="flex-1 py-2 text-xs font-medium text-stone-900 bg-stone-100 rounded text-center"
              >
                ✨ Ritual Diagnostic
              </button>
              <button 
                onClick={() => { onOpenShadeFinder(); setMobileMenuOpen(false); }}
                className="flex-1 py-2 text-xs font-medium text-[#873E4B] bg-rose-50 rounded text-center"
              >
                💄 Swatch Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
