import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingBag, Heart, Check, MapPin, Sparkles } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedShade?: ProductShade, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'actives' | 'benefits' | 'ingredients' | 'how-to' | 'reviews'>('actives');
  const [pinCode, setPinCode] = useState('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
      setPinStatus('⚡ Express Courier Available: Estimated delivery in 24–48 hours via Climate-Neutral Dispatch');
    } else {
      setPinStatus('Please provide a valid 6-digit postal PIN code.');
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedShade, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/90 hover:bg-white rounded-full shadow-sm border border-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Visual Presentation */}
          <div className="relative bg-[#FAF7F2] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-80 w-auto object-contain rounded-lg shadow-sm"
            />

            {/* Certifications row */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5 justify-center">
                {product.certifications.map((cert, idx) => (
                  <span key={idx} className="text-[10px] font-medium tracking-wide uppercase bg-stone-200/80 text-stone-700 px-2 py-0.5 rounded">
                    {cert}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Certified Direct from Formulation Lab</span>
            </div>
          </div>

          {/* Right Column: Spec & Purchase Engine */}
          <div className="p-6 sm:p-7 flex flex-col justify-between max-h-[82vh] overflow-y-auto">
            <div>
              {/* House and Volume */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-widest text-[11px] font-bold text-stone-900">
                  {product.brand}
                </span>
                <span className="font-mono text-stone-400">{product.volumeOrWeight}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-normal text-stone-900 leading-snug mb-2 font-display">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs mb-3">
                <div className="flex items-center gap-0.5 px-2 py-0.5 bg-stone-100 text-stone-900 border border-stone-200 rounded font-semibold">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                </div>
                <span className="text-stone-500">
                  {product.reviewCount.toLocaleString()} Verified Client Reviews
                </span>
                {product.pHLevel && (
                  <span className="text-[11px] text-[#873E4B] font-mono font-medium ml-auto">
                    {product.pHLevel}
                  </span>
                )}
              </div>

              {/* Price Module */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 mb-4">
                <div className="flex items-baseline gap-2 font-mono tabular-nums">
                  <span className="text-2xl font-bold text-stone-950">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-sans uppercase">
                    Save {product.discountPercent}%
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  All taxes included · Earn 35 L’Aura Privé Reward Points
                </p>
              </div>

              {/* Shades (if any) */}
              {product.shades && product.shades.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
                    <span>Selected Pigment: <strong className="text-stone-950 font-semibold">{selectedShade?.name}</strong></span>
                    <span className="text-stone-400 text-[11px] capitalize">Undertone: {selectedShade?.undertone}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.shades.map((shade) => (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(shade)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedShade?.id === shade.id
                            ? 'ring-2 ring-stone-900 ring-offset-2 scale-110'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                        title={shade.name}
                      >
                        {selectedShade?.id === shade.id && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Pin Code Checker */}
              <div className="mb-4 p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <form onSubmit={handleCheckPin} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="Check postal PIN code (e.g. 500034)"
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-200 rounded focus:outline-none focus:border-stone-600 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-200 hover:bg-stone-300 rounded transition-colors whitespace-nowrap"
                  >
                    Estimate
                  </button>
                </form>
                {pinStatus && (
                  <p className={`text-[11px] mt-1.5 ${pinStatus.includes('⚡') ? 'text-emerald-800 font-medium' : 'text-rose-600'}`}>
                    {pinStatus}
                  </p>
                )}
              </div>

              {/* Specification Tabs */}
              <div className="border-b border-stone-200 mb-3 flex gap-3 text-xs font-medium uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('actives')}
                  className={`pb-1.5 border-b-2 transition-colors ${
                    activeTab === 'actives'
                      ? 'border-stone-900 text-stone-900 font-bold'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Actives
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-1.5 border-b-2 transition-colors ${
                    activeTab === 'benefits'
                      ? 'border-stone-900 text-stone-900 font-bold'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Efficacy
                </button>
                <button
                  onClick={() => setActiveTab('how-to')}
                  className={`pb-1.5 border-b-2 transition-colors ${
                    activeTab === 'how-to'
                      ? 'border-stone-900 text-stone-900 font-bold'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Ritual
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1.5 border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-stone-900 text-stone-900 font-bold'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              {/* Tab Body */}
              <div className="text-xs text-stone-600 mb-5 leading-relaxed">
                {activeTab === 'actives' && (
                  <div className="space-y-2">
                    {product.activeIngredientsDetail ? (
                      product.activeIngredientsDetail.map((item, idx) => (
                        <div key={idx} className="p-2 bg-stone-50 rounded border border-stone-200/80">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-stone-900">{item.name}</span>
                            {item.percentage && (
                              <span className="font-mono text-[11px] font-bold text-[#873E4B]">{item.percentage}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500">{item.purpose}</p>
                        </div>
                      ))
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>
                )}
                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5 list-disc pl-4">
                    {product.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'how-to' && (
                  <ol className="list-decimal pl-4 space-y-1.5">
                    {product.howToUse.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1">
                    {product.reviews.map((r) => (
                      <div key={r.id} className="p-2 bg-stone-50 rounded border border-stone-200">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-stone-900">{r.author}</span>
                          <span className="text-stone-400 font-mono">{r.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 mb-1">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-[11px] text-stone-600">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-200 flex items-center gap-3">
              <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 overflow-hidden text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-2 hover:bg-stone-200 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-3 font-semibold font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-2 hover:bg-stone-200 transition-colors font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Save to Wishlist"
                className={`p-2.5 border rounded-md transition-colors ${
                  isWishlisted
                    ? 'border-rose-300 bg-rose-50 text-[#873E4B]'
                    : 'border-stone-200 text-stone-600 hover:text-[#873E4B]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#873E4B] text-[#873E4B]' : ''}`} />
              </button>

              <button
                onClick={handleAdd}
                className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-md'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag (₹{product.price * quantity})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
