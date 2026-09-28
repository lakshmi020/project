import React, { useState } from 'react';
import { X, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface ShadeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lipstickProduct: Product;
  onAddToCart: (product: Product, shade: ProductShade) => void;
}

export const ShadeFinderModal: React.FC<ShadeFinderModalProps> = ({
  isOpen,
  onClose,
  lipstickProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const shades = lipstickProduct.shades || [];
  const [selectedShade, setSelectedShade] = useState<ProductShade>(shades[0]);
  const [toneFilter, setToneFilter] = useState<'all' | 'fair' | 'medium' | 'deep'>('all');
  const [undertoneFilter, setUndertoneFilter] = useState<'all' | 'warm' | 'cool' | 'neutral'>('all');
  const [added, setAdded] = useState(false);

  const filteredShades = shades.filter((s) => {
    if (toneFilter !== 'all' && s.tone !== toneFilter) return false;
    if (undertoneFilter !== 'all' && s.undertone !== undertoneFilter) return false;
    return true;
  });

  const skinToneCanvasBg: Record<string, string> = {
    fair: '#f6d9cb',
    medium: '#d39e78',
    deep: '#7a4b35',
    all: '#d39e78',
  };

  const handleAdd = () => {
    onAddToCart(lipstickProduct, selectedShade);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
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
            aria-label="Close swatch studio"
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Atelier Rosewood</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal font-display">
            Virtual Pigment Swatch Studio
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Simulate satin velvet pigments against calibrated Indian and global complexion tones.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Tone Filters */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              <span>Select Skin Complexion Tone:</span>
              <span className="text-stone-400 font-mono capitalize">{toneFilter}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['all', 'fair', 'medium', 'deep'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setToneFilter(t)}
                  className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-md border transition-all ${
                    toneFilter === t
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Undertone Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              <span>Select Undertone:</span>
              <span className="text-stone-400 font-mono capitalize">{undertoneFilter}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['all', 'warm', 'cool', 'neutral'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUndertoneFilter(u)}
                  className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-md border transition-all ${
                    undertoneFilter === u
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Live Swatch Preview */}
          <div className="p-5 rounded-xl border border-stone-200 mb-6 bg-stone-50">
            <div className="text-xs font-semibold text-stone-700 mb-3 flex items-center justify-between uppercase tracking-wider">
              <span>Calibrated Arm Swatch Test:</span>
              <span className="text-stone-950 font-bold">{selectedShade.name}</span>
            </div>

            <div 
              className="h-24 w-full rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner transition-colors duration-300"
              style={{ backgroundColor: skinToneCanvasBg[toneFilter] || '#d39e78' }}
            >
              {/* Velvet Swatch Brush Stroke */}
              <div 
                className="w-44 h-10 rounded-full shadow-lg transform -rotate-2 flex items-center justify-center transition-all duration-300 border border-white/20"
                style={{ backgroundColor: selectedShade.hex }}
              >
                <span className="text-[10px] text-white/95 font-bold uppercase tracking-widest drop-shadow">
                  {selectedShade.name}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 text-center mt-2.5">
              Reflective of 1-swipe opaque pigment saturation with satin matte drydown.
            </p>
          </div>

          {/* Shades grid */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
              Available Atelier Shades ({filteredShades.length}):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredShades.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-100 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/10 shrink-0 shadow-sm"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">
                        {shade.name}
                      </p>
                      <p className="text-[10px] text-stone-400 capitalize">
                        {shade.undertone} undertone
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider">Formula Price:</span>
              <div className="text-base font-bold text-stone-950 font-mono">
                ₹{lipstickProduct.price}
                <span className="text-xs text-stone-400 line-through ml-1.5 font-normal">
                  ₹{lipstickProduct.originalPrice}
                </span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {selectedShade.name}!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire {selectedShade.name}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
