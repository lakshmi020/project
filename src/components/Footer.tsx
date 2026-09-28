import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenQuiz: () => void;
  onOpenElite: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenQuiz,
  onOpenElite,
}) => {
  return (
    <footer className="bg-[#141211] text-stone-300 border-t border-stone-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Adjacency proof points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800/80 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded-lg text-[#D4AF37] border border-stone-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px]">100% Traceable Actives</h4>
              <p className="text-stone-400 text-[11px]">Clean clinical certification direct from verified labs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded-lg text-stone-300 border border-stone-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px]">Complimentary Shipping</h4>
              <p className="text-stone-400 text-[11px]">Climate-neutral doorstep courier on orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded-lg text-stone-300 border border-stone-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px]">Mindful 15-Day Returns</h4>
              <p className="text-stone-400 text-[11px]">Effortless reverse pickup with guaranteed instant refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-900 rounded-lg text-[#D4AF37] border border-stone-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px]">Dermatologist Verified</h4>
              <p className="text-stone-400 text-[11px]">Hypoallergenic, cruelty-free, and microbiome-safe</p>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-2xl font-normal font-display tracking-tight text-white">
                L’AURA
              </span>
              <span className="text-xs uppercase tracking-widest font-light text-stone-400">
                BEAUTÉ
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px] mb-4">
              An elevated clean beauty and haute perfumery house combining European botanical apothecary traditions with bio-active clinical efficacy.
            </p>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">
              Atelier: Paris · Mumbai · Grasse
            </p>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-3.5">
              The Formulations
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li>
                <button onClick={() => onSelectCategory('skincare')} className="hover:text-white transition-colors">
                  Bio-Active Serums &amp; Crèmes
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('makeup')} className="hover:text-white transition-colors">
                  Satin Velvet Lip &amp; Eye Pigments
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('haircare')} className="hover:text-white transition-colors">
                  Cold-Pressed Rosemary Scalp Elixirs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('fragrance')} className="hover:text-white transition-colors">
                  Extrait de Parfum &amp; Niche Ambers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-3.5">
              Diagnostic &amp; Privé
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors">
                  Skin Ritual Architect (Quiz)
                </button>
              </li>
              <li>
                <button onClick={onOpenElite} className="hover:text-white transition-colors">
                  L’Aura Privé Connoisseur Circle
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Virtual Pigment Swatch Studio
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Active Ingredient Transparency Index
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-3.5">
              Client Concierge
            </h4>
            <div className="space-y-2 text-stone-400 text-[11px]">
              <p>Hotline: 1800-419-AURA (Toll Free)</p>
              <p>Concierge: atelier@laurabeaute.com</p>
              <p>Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 bg-stone-900 text-[#D4AF37] rounded text-[10px] font-semibold border border-stone-800 font-mono">
                  ✦ PCI-DSS Level 1 Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 text-center sm:flex sm:justify-between sm:text-left text-stone-500 text-[11px]">
          <p>© 2026 L’Aura Beauté House Ltd. All rights reserved.</p>
          <div className="flex justify-center sm:justify-end gap-4 mt-2 sm:mt-0 font-medium">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Formulation</span>
            <span>·</span>
            <span className="hover:text-stone-400 cursor-pointer">Track Consignment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
