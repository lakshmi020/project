import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedShade?: ProductShade) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
}) => {
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedShade);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-xl border border-stone-200/90 hover:border-stone-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-[#f6f3ee] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Minimal text badge for deal / best seller */}
        {product.isDealOfDay ? (
          <span className="absolute top-2.5 left-2.5 bg-[#873E4B] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            Curator Drop
          </span>
        ) : product.isBestSeller ? (
          <span className="absolute top-2.5 left-2.5 bg-stone-900 text-stone-100 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            Atelier Classic
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all ${
            isWishlisted 
              ? 'bg-rose-50 text-[#873E4B] shadow-sm' 
              : 'bg-white/90 text-stone-400 hover:text-[#873E4B] hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#873E4B] text-[#873E4B]' : ''}`} />
        </button>

        {/* Hover Quick Look Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
          <span className="text-white text-xs font-medium tracking-wide">
            View Actives &amp; Clinical Notes
          </span>
        </div>
      </div>

      {/* Product Body Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Volume Header */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-1">
            <span className="uppercase tracking-widest text-[10px] font-bold text-stone-800">
              {product.brand}
            </span>
            <span className="text-[11px] font-mono text-stone-400">{product.volumeOrWeight}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-900 transition-colors mb-2">
            {product.name}
          </h3>

          {/* Star Rating & Verified Count */}
          <div className="flex items-center gap-1.5 text-xs mb-3">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-stone-100 text-stone-800 border border-stone-200 rounded font-semibold text-[11px]">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            </span>
            <span className="text-stone-400 text-[11px]">({product.reviewCount.toLocaleString()})</span>
            {product.pHLevel && (
              <>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-500 text-[11px] font-mono">
                  pH {product.pHLevel.split(' ')[0]}
                </span>
              </>
            )}
          </div>

          {/* Interactive Shade Swatches */}
          {product.shades && product.shades.length > 0 && (
            <div className="mb-3" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1">
                <span>Shade: <strong className="text-stone-900">{selectedShade?.name}</strong></span>
                <span className="text-stone-400 text-[10px]">{product.shades.length} tones</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    title={shade.name}
                    onClick={() => setSelectedShade(shade)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      selectedShade?.id === shade.id
                        ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: shade.hex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
          {/* Price Block */}
          <div>
            <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
              <span className="text-base font-bold text-stone-900">
                ₹{product.price}
              </span>
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-800 tracking-wider uppercase font-sans">
              Save {product.discountPercent}%
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap ${
              isAdded
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Bagged</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
