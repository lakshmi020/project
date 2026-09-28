/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FlashDeal } from './components/FlashDeal';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { BeautyQuizModal } from './components/BeautyQuizModal';
import { ShadeFinderModal } from './components/ShadeFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { EliteClubModal } from './components/EliteClubModal';
import { Footer } from './components/Footer';

import { Product, ProductCategory, ProductShade, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Check, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Pre-populated with 2 elegant signature items)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
    },
    {
      product: PRODUCTS[1],
      quantity: 1,
      selectedShade: PRODUCTS[1].shades ? PRODUCTS[1].shades[0] : undefined,
    }
  ]);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['laura-serum-vitc-01', 'laura-cream-ceramide-04'])
  );

  // L'Aura Privé Member status
  const [isEliteMember, setIsEliteMember] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isShadeFinderOpen, setIsShadeFinderOpen] = useState(false);
  const [isEliteModalOpen, setIsEliteModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, shade?: ProductShade, quantity: number = 1) => {
    setCartItems((prev) => {
      const shadeId = shade ? shade.id : undefined;
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && (item.selectedShade?.id === shadeId)
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedShade: shade }];
      }
    });

    const shadeInfo = shade ? ` (${shade.name})` : '';
    showToast(`Added ${product.name.slice(0, 32)}...${shadeInfo} to bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, shadeId?: string) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, shadeId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        const matchShade = (!shadeId && !item.selectedShade) || item.selectedShade?.id === shadeId;
        if (item.product.id === productId && matchShade) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string, shadeId?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => {
        const matchProduct = item.product.id === productId;
        const matchShade = (!shadeId && !item.selectedShade) || item.selectedShade?.id === shadeId;
        return !(matchProduct && matchShade);
      })
    );
    showToast('Formulation removed from bag');
  };

  const handleAddBundleToCart = (bundleProducts: Product[]) => {
    setCartItems((prev) => {
      const next = [...prev];
      bundleProducts.forEach((p) => {
        const existingIdx = next.findIndex((item) => item.product.id === p.id);
        if (existingIdx > -1) {
          next[existingIdx].quantity += 1;
        } else {
          next.push({ product: p, quantity: 1 });
        }
      });
      return next;
    });
    showToast('✦ 3-Step Synergy Suite added with 20% privilege savings!');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed from vanity wishlist`);
      } else {
        next.add(product.id);
        showToast(`Saved ${product.name.slice(0, 26)}... to vanity`);
      }
      return next;
    });
  };

  const handleMoveWishlistToCart = (product: Product, shade?: ProductShade) => {
    handleAddToCart(product, shade);
    handleToggleWishlist(product);
  };

  // Checkout flow
  const handleProceedToCheckout = (discountAmount: number, couponCode: string) => {
    setCheckoutDiscount(discountAmount);
    setAppliedCoupon(couponCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    showToast('✦ Order confirmed! Dispatch notification sent via SMS & Email.');
  };

  const scrollToCatalog = () => {
    const catalog = document.getElementById('product-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lipstickProduct = PRODUCTS.find((p) => p.shades && p.shades.length > 0) || PRODUCTS[1];
  const dealOfTheDayProduct = PRODUCTS.find((p) => p.isDealOfDay) || PRODUCTS[0];
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-rose-100 selection:text-rose-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1817] text-white text-xs font-medium py-3 px-4 rounded-xl shadow-2xl flex items-center gap-2.5 border border-stone-700 animate-in slide-in-from-bottom-5 duration-200">
          <span className="p-1 bg-[#D4AF37] rounded-full text-stone-950">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenShadeFinder={() => setIsShadeFinderOpen(true)}
        onOpenEliteModal={() => setIsEliteModalOpen(true)}
        isEliteMember={isEliteMember}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            scrollToCatalog();
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Editorial Campaign Hero Banner */}
        <HeroBanner
          onShopNow={scrollToCatalog}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Limited Batch Formulation Drop (Flash Deal Ticker) */}
        <FlashDeal
          dealProduct={dealOfTheDayProduct}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
        />

        {/* Core Product Catalog with Clinical Filter & Sort */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickView={(p) => setQuickViewProduct(p)}
          searchQuery={searchQuery}
        />

        {/* Editorial Feature Showcase Banners */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Routine Finder Card */}
            <div className="bg-[#1C1817] text-white rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-xl border border-stone-800">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dermatological Diagnostics</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal font-display leading-tight mb-2.5 text-white">
                  The Bespoke 3-Step Synergy Regimen
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                  Confused about layering vitamin C, ferulic acid, and biomimetic ceramides? Take our 2-minute diagnostic assessment to calibrate your personalized AM/PM suite and enjoy 20% privilege savings.
                </p>
              </div>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="self-start px-6 py-3 bg-[#FAF8F5] text-stone-900 font-bold text-xs uppercase tracking-wider rounded-md hover:bg-white transition-colors shadow-sm"
              >
                Begin Diagnostic Ritual →
              </button>
            </div>

            {/* Virtual Swatch Studio Card */}
            <div className="bg-[#24191D] text-white rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-xl border border-stone-800">
              <div>
                <span className="text-[#E8C5B8] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 mb-2.5">
                  <Heart className="w-3.5 h-3.5 text-[#873E4B]" />
                  <span>Atelier Rosewood</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal font-display leading-tight mb-2.5 text-white">
                  Virtual Pigment Swatch Studio
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                  Test satin velvet liquid pigments and cloud stains against your precise undertone: Warm, Cool, or Neutral. Eliminate guesswork and shop with 100% confidence.
                </p>
              </div>
              <button
                onClick={() => setIsShadeFinderOpen(true)}
                className="self-start px-6 py-3 bg-[#873E4B] hover:bg-[#732F3C] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm"
              >
                Enter Swatch Studio →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenElite={() => setIsEliteModalOpen(true)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onStartShopping={() => {
          setIsCartOpen(false);
          scrollToCatalog();
        }}
        isEliteMember={isEliteMember}
      />

      {/* Vanity Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onStartShopping={() => {
          setIsWishlistOpen(false);
          scrollToCatalog();
        }}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
      />

      {/* Beauty Routine Diagnostic Quiz */}
      <BeautyQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={PRODUCTS}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Virtual Pigment Swatch Studio Modal */}
      <ShadeFinderModal
        isOpen={isShadeFinderOpen}
        onClose={() => setIsShadeFinderOpen(false)}
        lipstickProduct={lipstickProduct}
        onAddToCart={handleAddToCart}
      />

      {/* L'Aura Privé Connoisseur Circle Modal */}
      <EliteClubModal
        isOpen={isEliteModalOpen}
        onClose={() => setIsEliteModalOpen(false)}
        isEliteMember={isEliteMember}
        onToggleElite={() => {
          setIsEliteMember(!isEliteMember);
          showToast(
            !isEliteMember
              ? '✦ L’Aura Privé Activated! Complimentary courier & 20% privilege unlocked.'
              : 'Privé membership paused.'
          );
        }}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={checkoutDiscount}
        couponCode={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
