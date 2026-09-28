import React from 'react';
import { X, Sparkles, Check, Gift, Zap, Crown, ShieldCheck } from 'lucide-react';

interface EliteClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEliteMember: boolean;
  onToggleElite: () => void;
}

export const EliteClubModal: React.FC<EliteClubModalProps> = ({
  isOpen,
  onClose,
  isEliteMember,
  onToggleElite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full my-6 overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-[#1C1817] text-white p-7 relative border-b border-stone-800">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2.5">
            <Crown className="w-3.5 h-3.5" />
            <span>L’AURA PRIVÉ CIRCLE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-normal font-display leading-tight text-white">
            {isEliteMember ? 'Welcome to L’Aura Privé' : 'The Connoisseur Circle Privileges'}
          </h3>
          <p className="text-xs text-stone-300 mt-1 max-w-sm">
            Experience uncompromised luxury with private batch allocations, complimentary courier, and bespoke consultations.
          </p>
        </div>

        {/* Perks list */}
        <div className="p-6 sm:p-7 space-y-3.5">
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <Zap className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-stone-900">Zero Minimum Order Complimentary Delivery</h4>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Order any single formulation or lip shade with complimentary climate-neutral express shipping.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <Sparkles className="w-4 h-4 text-[#873E4B] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-stone-900">Flat 20% Privé Member Benefit</h4>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Automatically applied across all clinical serums, velvet pigments, and fragrances.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <Gift className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-stone-900">Complimentary Deluxe Mini Flacon</h4>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  A curated 5ml extrait de parfum or 10ml barrier serum sample included in every dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-stone-900">Priority Atelier Concierge</h4>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Direct line with our licensed dermal therapists for ingredient pairing and regimen refinement.
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onToggleElite();
                onClose();
              }}
              className={`w-full py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                isEliteMember
                  ? 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {isEliteMember ? (
                <span>Pause Privé Membership</span>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Activate 1-Year Complimentary Privé Pass</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-stone-400 text-center mt-2 font-mono">
              Instant activation for this session · Zero payment card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
