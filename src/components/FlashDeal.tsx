import React, { useState, useEffect } from 'react';
import { Clock, Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FlashDealProps {
  dealProduct: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FlashDeal: React.FC<FlashDealProps> = ({
  dealProduct,
  onQuickView,
  onAddToCart,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 38,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#211B1A] rounded-2xl p-6 sm:p-10 text-stone-100 relative overflow-hidden shadow-2xl border border-stone-800">
        
        {/* Warm ambient glow accents */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 -top-20 w-80 h-80 bg-[#873E4B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          
          {/* Left Column: Spotlight Narrative & Ticking Counter */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#332A28] border border-[#524441] rounded-full text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curator’s Limited Formulation Drop</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-display text-white mb-3 leading-tight">
              {dealProduct.name}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed">
              {dealProduct.description}
            </p>

            {/* Countdown Clock with Micro-Ticking */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="text-xs text-stone-400 flex items-center gap-1.5 uppercase tracking-wider font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Reserved Batch Window:</span>
              </span>

              <div className="flex items-center gap-1.5 font-mono tabular-nums text-xs font-bold">
                <div className="bg-[#141110] border border-stone-700 px-2.5 py-1 rounded text-[#D4AF37]">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </div>
                <span className="text-stone-500">:</span>
                <div className="bg-[#141110] border border-stone-700 px-2.5 py-1 rounded text-[#D4AF37]">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </div>
                <span className="text-stone-500">:</span>
                <div className="bg-[#141110] border border-stone-700 px-2.5 py-1 rounded text-[#D4AF37]">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onAddToCart(dealProduct)}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C29D30] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire for ₹{dealProduct.price}</span>
              </button>

              <button
                onClick={() => onQuickView(dealProduct)}
                className="px-5 py-3 bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold tracking-wider uppercase rounded-md border border-stone-700 transition-colors flex items-center gap-2"
              >
                <span>Full Specification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Product Card Stage */}
          <div 
            onClick={() => onQuickView(dealProduct)}
            className="w-full max-w-xs bg-[#FAF8F5] text-stone-900 rounded-xl p-4 shadow-2xl cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-stone-300/60"
          >
            <div className="relative aspect-[4/3] bg-stone-100 rounded-lg overflow-hidden mb-3">
              <img
                src={dealProduct.imageUrl}
                alt={dealProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 right-2.5 bg-[#873E4B] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide font-mono">
                {dealProduct.discountPercent}% OFF
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="uppercase tracking-wider font-semibold text-stone-800 text-[11px]">{dealProduct.brand}</span>
              <span className="flex items-center gap-1 font-semibold text-amber-700 text-[11px]">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{dealProduct.rating}</span>
              </span>
            </div>

            <h4 className="text-xs font-bold text-stone-900 line-clamp-1 mb-2">
              {dealProduct.name}
            </h4>

            <div className="flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-base font-bold text-stone-950">₹{dealProduct.price}</span>
              <span className="text-xs text-stone-400 line-through">₹{dealProduct.originalPrice}</span>
              <span className="text-[11px] font-semibold text-emerald-800 ml-auto font-sans">
                Privilege Save ₹{dealProduct.originalPrice - dealProduct.price}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
