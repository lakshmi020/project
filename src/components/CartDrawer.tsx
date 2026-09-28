import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, shadeId?: string) => void;
  onRemoveItem: (productId: string, shadeId?: string) => void;
  onProceedToCheckout: (discountAmount: number, couponCode: string) => void;
  onStartShopping: () => void;
  isEliteMember: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping,
  isEliteMember,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawMrpTotal = items.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const discountedTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const productSavings = rawMrpTotal - discountedTotal;

  let couponDiscount = 0;
  if (appliedCoupon === 'LUMIERE15') {
    couponDiscount = Math.round(discountedTotal * 0.15);
  } else if (appliedCoupon === 'FIRSTGLOW') {
    couponDiscount = Math.min(150, discountedTotal);
  } else if (appliedCoupon === 'PRIVE' || isEliteMember) {
    couponDiscount = Math.round(discountedTotal * 0.20);
  }

  const freeShippingThreshold = 499;
  const isFreeShipping = isEliteMember || discountedTotal >= freeShippingThreshold;
  const deliveryFee = items.length === 0 || isFreeShipping ? 0 : 49;
  const finalTotal = Math.max(0, discountedTotal - couponDiscount + deliveryFee);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - discountedTotal);
  const progressPercent = Math.min(100, (discountedTotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (code === 'LUMIERE15' || code === 'FIRSTGLOW' || code === 'PRIVE') {
      setAppliedCoupon(code);
      setCouponCode('');
    } else {
      setCouponError('Invalid code. Try LUMIERE15 or FIRSTGLOW');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout(couponDiscount, appliedCoupon || (isEliteMember ? 'PRIVE_AUTO' : ''));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-base font-bold text-stone-900 font-display">
                Your Selection ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Progress */}
          <div className="bg-[#1C1817] text-stone-200 px-4 py-3 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                {isFreeShipping ? (
                  <span className="text-[#D4AF37] font-semibold">
                    ✦ Complimentary Express Delivery Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#D4AF37]">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-stone-400 font-mono text-[11px]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#D4AF37] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-1 font-display">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-stone-500 mb-6 max-w-xs">
                  Discover curated bio-active serums, velvet cloud pigments, and artisanal fragrances.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartShopping();
                  }}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              items.map((item) => {
                const shadeKey = item.selectedShade ? item.selectedShade.id : '';
                return (
                  <div 
                    key={`${item.product.id}-${shadeKey}`}
                    className="flex gap-3 pb-4 border-b border-stone-100 last:border-b-0"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg bg-stone-50 border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                            {item.product.brand}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id, shadeKey)}
                            aria-label="Remove formulation"
                            className="text-stone-400 hover:text-stone-700 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 leading-snug">
                          {item.product.name}
                        </h4>

                        {item.selectedShade && (
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-stone-600">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: item.selectedShade.hex }}
                            />
                            <span>Pigment: {item.selectedShade.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center border border-stone-200 rounded bg-stone-50 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, shadeKey)}
                            className="px-2 py-0.5 hover:bg-stone-200 text-stone-600 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-semibold font-mono tabular-nums text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, shadeKey)}
                            className="px-2 py-0.5 hover:bg-stone-200 text-stone-600 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right font-mono tabular-nums">
                          <span className="text-xs font-bold text-stone-900">
                            ₹{item.product.price * item.quantity}
                          </span>
                          <span className="text-[10px] text-stone-400 line-through ml-1">
                            ₹{item.product.originalPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Billing Details */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
              {/* Coupon Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-md text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Privilege <strong>{appliedCoupon}</strong> Applied</span>
                    </div>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-emerald-800 hover:text-emerald-950 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Code: LUMIERE15 or FIRSTGLOW"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:border-stone-500 uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-2 font-mono tabular-nums">
                <div className="flex justify-between">
                  <span>Standard Value</span>
                  <span>₹{rawMrpTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-800">
                  <span>Atelier Privilege Savings</span>
                  <span>-₹{productSavings}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Promotional Deduction</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-800 font-sans">COMPLIMENTARY</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 border-t border-stone-200 pt-2">
                  <span>Total Payable</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Proceed to Checkout · ₹{finalTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
