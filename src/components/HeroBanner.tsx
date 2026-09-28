import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, ArrowRight } from 'lucide-react';
import heroImg from '@/src/assets/images/aura_editorial_hero_1790581675812.jpg';

interface HeroBannerProps {
  onShopNow: () => void;
  onOpenQuiz: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onOpenQuiz }) => {
  return (
    <section className="relative overflow-hidden bg-[#181514] text-stone-100">
      {/* Background Editorial Visual with Precision Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="L’Aura Beauté high-fashion editorial campaign with glass serums and warm silk podiums"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 scale-100 transition-transform duration-1000"
        />
        {/* Measured dark gradient scrim for WCAG AA text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181514] via-[#181514]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181514] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          
          {/* Subtle editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-4">
            <span>Autumn Collection 2026</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Clinical Precision & Fine Perfumery</span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white font-display leading-[1.1] mb-5" style={{ textWrap: 'balance' }}>
            The Alchemy of Pure Botanicals & <span className="italic font-serif text-[#E8C5B8]">Clinical Precision</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-9 max-w-xl font-normal">
            Formulated without fillers, parabens, or harsh sulfates. Discover photostable bio-active serums, velvet cloud lip pigments, and cold-pressed botanical extractions.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onShopNow}
              className="px-7 py-3.5 bg-stone-100 hover:bg-white text-stone-950 font-semibold text-xs tracking-wider uppercase rounded-md shadow-xl transition-all flex items-center gap-2 whitespace-nowrap active:scale-[0.98]"
            >
              <span>Explore The Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="px-6 py-3.5 bg-[#251D1D]/80 hover:bg-[#2F2424] text-stone-200 hover:text-white border border-[#524444] font-medium text-xs tracking-wider uppercase rounded-md backdrop-blur-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Diagnostic Ritual Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Claim-to-Proof Adjacency Bar */}
      <div className="relative z-10 border-t border-stone-800/80 bg-[#141110]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="truncate">100% Certified Clean Actives</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="truncate">Free Express Courier on ₹499+</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="truncate">Mindful 15-Day Hassle-Free Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="truncate">Ecocert Verified & Cruelty-Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
