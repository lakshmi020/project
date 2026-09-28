import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product, shade?: ProductShade) => void;
  onStartShopping: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onStartShopping,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#873E4B] fill-[#873E4B]" />
              <h2 className="text-base font-bold text-stone-900 font-display">
                Saved Formulations ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-4">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-1 font-display">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-stone-500 mb-6 max-w-xs">
                  Tap the heart icon on any formulation to save items to your personal vanity list.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartShopping();
                  }}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex gap-3 pb-4 border-b border-stone-100 last:border-b-0"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg bg-stone-50 border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          aria-label="Remove from wishlist"
                          className="text-stone-400 hover:text-stone-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {product.name}
                      </h4>

                      <div className="flex items-baseline gap-1.5 mt-1 font-mono tabular-nums">
                        <span className="text-xs font-bold text-stone-900">₹{product.price}</span>
                        <span className="text-[10px] text-stone-400 line-through">₹{product.originalPrice}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onMoveToCart(product)}
                      className="mt-2 w-full py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
