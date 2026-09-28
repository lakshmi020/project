import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product, SkinType, SkinConcern } from '../types';

interface BeautyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddBundleToCart: (products: Product[]) => void;
}

export const BeautyQuizModal: React.FC<BeautyQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddBundleToCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType>('combination');
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern>('glow');
  const [bundleAdded, setBundleAdded] = useState(false);

  const skinTypes: { id: SkinType; title: string; desc: string }[] = [
    { id: 'oily', title: 'Sebum-Rich (Oily)', desc: 'Pronounced midday shine, enlarged pores, prone to congestion' },
    { id: 'dry', title: 'Lipid-Depleted (Dry)', desc: 'Persistent tightness, micro-flaking, dullness, needs deep ceramide lipids' },
    { id: 'combination', title: 'Dual-Zone (Combination)', desc: 'T-zone shine with normal or dehydrated cheek areas' },
    { id: 'sensitive', title: 'Reactive (Sensitive)', desc: 'Easily develops erythema/redness, reactive to harsh surfactants or synthetic fragrance' },
  ];

  const skinConcerns: { id: SkinConcern; title: string; desc: string }[] = [
    { id: 'glow', title: 'Pigmentation & Melanin Balance', desc: 'Desire radiant illumination, fading UV sunspots and post-acne erythema' },
    { id: 'acne', title: 'Follicular Blemishes & Congestion', desc: 'Active whiteheads, persistent inflammation, excess sebum oxidation' },
    { id: 'hydration', title: 'Compromised Acid Mantle', desc: 'Damaged skin barrier, retinoid irritation, loss of suppleness' },
    { id: 'aging', title: 'Cellular Density & Elasticity', desc: 'Micro-lines, dehydration crepiness, loss of bounce and firm tone' },
  ];

  const recommendedRoutine = React.useMemo(() => {
    const toner = products.find(p => p.subCategory.includes('Toner') || p.id === 'laura-toner-tea-03') || products[2];
    const serum = products.find(p => p.subCategory.includes('Serum') || p.id === 'laura-serum-vitc-01') || products[0];
    const cream = products.find(p => p.subCategory.includes('Crème') || p.id === 'laura-cream-ceramide-04') || products[3];

    return [
      { step: 1, label: '01. Clarify & Prepare', product: toner, reason: 'Stabilizes natural skin pH with antioxidant polyphenols without alcohol.' },
      { step: 2, label: '02. Clinical Bio-Active', product: serum, reason: '15% Stabilized Vitamin C & Ferulic to stimulate pro-collagen and erase dark spots.' },
      { step: 3, label: '03. Biomimetic Seal', product: cream, reason: 'Rebuilds intercellular lipid brickwork with 5 essential ceramides and peptides.' }
    ];
  }, [products]);

  const bundleTotal = recommendedRoutine.reduce((sum, item) => sum + item.product.price, 0);
  const bundleDiscountedPrice = Math.round(bundleTotal * 0.80);

  const handleAddBundle = () => {
    onAddBundleToCart(recommendedRoutine.map(r => r.product));
    setBundleAdded(true);
    setTimeout(() => {
      setBundleAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full my-6 overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1C1817] text-white p-6 relative border-b border-stone-800">
          <button
            onClick={onClose}
            aria-label="Close ritual builder"
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>L’Aura Diagnostic Lab</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal font-display">
            The Bespoke 3-Step Skin Ritual Architect
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Answer 2 diagnostic questions to formulate an individualized AM/PM regimen based on molecular synergy.
          </p>

          {/* Stepper lines */}
          <div className="flex items-center gap-2 mt-4">
            <span className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#D4AF37]' : 'bg-stone-800'}`} />
            <span className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#D4AF37]' : 'bg-stone-800'}`} />
            <span className={`h-1 flex-1 rounded-full ${step === 3 ? 'bg-[#D4AF37]' : 'bg-stone-800'}`} />
          </div>
        </div>

        {/* Diagnostic Steps */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-stone-400">Step 1 of 2</span>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5 mb-1 font-display">
                What describes your physiological lipid profile?
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Calibrates molecular weight and carrier oil absorption speed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSkinType(type.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedSkinType === type.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-stone-900">{type.title}</span>
                      {selectedSkinType === type.id && (
                        <Check className="w-4 h-4 text-stone-900" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{type.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <span>Proceed to Target Calibration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-stone-400">Step 2 of 2</span>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5 mb-1 font-display">
                What is your primary clinical objective?
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Directs the selection of primary botanical bio-actives and antioxidants.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {skinConcerns.map((con) => (
                  <button
                    key={con.id}
                    onClick={() => setSelectedConcern(con.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedConcern === con.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-stone-900">{con.title}</span>
                      {selectedConcern === con.id && (
                        <Check className="w-4 h-4 text-stone-900" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{con.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 uppercase tracking-wider"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <span>Formulate Prescription</span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest font-mono">
                    ✦ 99.6% Bio-Compatibility Score
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-display">
                    Your Personalized AM &amp; PM Synergy Suite
                  </h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-600 underline font-medium hover:text-stone-900"
                >
                  Re-evaluate
                </button>
              </div>

              {/* 3 Step Prescription */}
              <div className="space-y-3 mb-6">
                {recommendedRoutine.map((item) => (
                  <div key={item.step} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-md bg-white border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#873E4B] uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-[10px] text-stone-500 uppercase font-semibold">{item.product.brand}</span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {item.reason}
                      </p>
                    </div>
                    <div className="text-right font-mono tabular-nums shrink-0">
                      <span className="text-xs font-bold text-stone-900">
                        ₹{item.product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Card */}
              <div className="p-4 bg-stone-100 rounded-xl border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-950 uppercase tracking-wider">
                      Complete 3-Step Synergy Regimen
                    </span>
                    <span className="bg-emerald-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                      20% PRIVILEGE
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1 font-mono tabular-nums">
                    <span className="text-lg font-bold text-stone-900">
                      ₹{bundleDiscountedPrice}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{bundleTotal}
                    </span>
                    <span className="text-xs text-emerald-800 font-semibold font-sans">
                      You save ₹{bundleTotal - bundleDiscountedPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className={`w-full sm:w-auto px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
                    bundleAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Prescription Acquired!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acquire All 3 (Save 20%)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
