import React from 'react';
import { Check, ShieldCheck, Leaf, Car, Sparkles, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';
import { LastOrderCalculations } from '../types';
import kitchenCareImg from '../assets/images/live_vedha_kitchencare.webp';
import laundryCareImg from '../assets/images/live_vedha_laundrycare.webp';
import bathroomCareImg from '../assets/images/live_vedha_bathroomcare.webp';
import carCareImg from '../assets/images/live_vedha_carcare.webp';

interface HeroProps {
  onScrollToProducts: () => void;
  onSelectCategory: (cat: 'all' | 'home-care' | 'automobile-care' | 'plant-based') => void;
  lastOrderCalculations?: LastOrderCalculations | null;
  onQuickReorder?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToProducts,
  onSelectCategory,
  lastOrderCalculations,
  onQuickReorder
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-black/[0.06] pt-6 pb-10 lg:pt-8 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Single Unified Apple Keynote Hero Banner (Text on Left Canvas, Lineup Uncropped on Right) */}
        <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] bg-[#edf4fe] shadow-apple-hover group lg:min-h-[440px] flex flex-col-reverse lg:flex-row lg:items-center">
          {/* Left Text & CTA Zone */}
          <div className="relative z-10 w-full lg:w-[46%] p-6 sm:p-8 lg:p-10 xl:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] text-stone-700 text-xs font-medium tracking-tight shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>1-Litre &amp; 5-Litre Liquid Care Lineup</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-[2.75rem] font-semibold tracking-[-0.035em] text-[#1d1d1f] font-display leading-[1.08] text-balance">
              Pro cleaning power. Everyday simplicity.
            </h1>

            <p className="text-sm sm:text-[15px] text-[#4b5563] leading-relaxed max-w-md font-normal">
              Precision liquid formulations for modern homes and automotive care—combining verified plant-based essentials with pro detailing performance.
            </p>

            {/* Apple-style CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onScrollToProducts}
                className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium tracking-tight active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>Buy 1L &amp; 5L Lineup</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectCategory('plant-based');
                  onScrollToProducts();
                }}
                className="px-5 py-2.5 rounded-full bg-white/85 hover:bg-white text-[#1d1d1f] border border-black/[0.08] text-sm font-medium tracking-tight active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 backdrop-blur-md"
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Explore Plant-Based</span>
              </button>
            </div>

            {/* Quiet Unboxed Trust Markers */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#52525b]">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                Verified Plant-Based
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                1L &amp; 5L Formats
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-sky-600" />
                pH-Neutral Auto
              </span>
            </div>

            {/* Quick Reorder Pill (only when available) */}
            {onQuickReorder && lastOrderCalculations && (
              <div className="pt-1">
                <div className="inline-flex items-center gap-2.5 p-2 px-3 rounded-2xl bg-white/90 backdrop-blur-md border border-black/[0.06] hover:border-black/[0.12] shadow-2xs transition-all duration-300 max-w-sm text-left">
                  <div className="w-7 h-7 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-[#1d1d1f] truncate">
                      Repeat #{lastOrderCalculations.orderNumber} · ₹{lastOrderCalculations.calculatedTotal}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onQuickReorder}
                    className="px-3 py-1 bg-stone-900 hover:bg-black text-white text-[11px] font-medium rounded-full active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
                  >
                    1-Click Buy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Product Lineup Photograph (Blends seamlessly into left #edf4fe backdrop) */}
          <div className="relative w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[72%] overflow-hidden pointer-events-none">
            <img
              src="./assets/aistudio/Hero_banner_for_the_home_page_7ca2bbfb.jpeg"
              alt="Vedha 1-Litre household and automobile liquid cleaning collection featuring Hand Wash, Dishwashing Liquid, Car Wash Shampoo, Car Foam Wash, Lavender Floor Cleaner, and Toilet Bowl Cleaner"
              className="w-full aspect-[2/1] lg:aspect-auto lg:h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-apple"
            />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#edf4fe] via-[#edf4fe]/90 to-transparent" />
          </div>
        </div>

        {/* Apple-style Compact Bento Category Tiles */}
        <div className="pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Kitchen Care */}
            <button
              type="button"
              onClick={() => {
                onSelectCategory('home-care');
                onScrollToProducts();
              }}
              className="group w-full text-left rounded-2xl border border-black/[0.06] bg-[#f5f5f7] hover:bg-white hover:border-black/[0.12] hover:shadow-apple-card transition-all duration-300 ease-apple cursor-pointer p-2.5 flex items-center gap-3.5 active:scale-[0.985]"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/[0.06] bg-white">
                <img
                  src={kitchenCareImg}
                  alt="Kitchen Care formulations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-apple"
                />
              </div>
              <div className="min-w-0 flex-1 pr-1">
                <div className="text-[10px] font-semibold uppercase text-emerald-700 tracking-wider">
                  Plant-Powered
                </div>
                <div className="text-sm font-semibold text-[#1d1d1f] font-display flex items-center justify-between gap-1 mt-0.5">
                  <span className="truncate">Kitchen Care</span>
                  <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                </div>
                <div className="text-[11px] text-[#6e6e73] truncate mt-0.5">
                  Dishwash &amp; degreasers
                </div>
              </div>
            </button>

            {/* 2. Laundry Care */}
            <button
              type="button"
              onClick={() => {
                onSelectCategory('home-care');
                onScrollToProducts();
              }}
              className="group w-full text-left rounded-2xl border border-black/[0.06] bg-[#f5f5f7] hover:bg-white hover:border-black/[0.12] hover:shadow-apple-card transition-all duration-300 ease-apple cursor-pointer p-2.5 flex items-center gap-3.5 active:scale-[0.985]"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/[0.06] bg-white">
                <img
                  src={laundryCareImg}
                  alt="Laundry Care formulations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-apple"
                />
              </div>
              <div className="min-w-0 flex-1 pr-1">
                <div className="text-[10px] font-semibold uppercase text-[#0071e3] tracking-wider">
                  Fabric Science
                </div>
                <div className="text-sm font-semibold text-[#1d1d1f] font-display flex items-center justify-between gap-1 mt-0.5">
                  <span className="truncate">Laundry Care</span>
                  <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                </div>
                <div className="text-[11px] text-[#6e6e73] truncate mt-0.5">
                  Liquid detergent &amp; color lock
                </div>
              </div>
            </button>

            {/* 3. Surface & Hygiene */}
            <button
              type="button"
              onClick={() => {
                onSelectCategory('plant-based');
                onScrollToProducts();
              }}
              className="group w-full text-left rounded-2xl border border-black/[0.06] bg-[#f5f5f7] hover:bg-white hover:border-black/[0.12] hover:shadow-apple-card transition-all duration-300 ease-apple cursor-pointer p-2.5 flex items-center gap-3.5 active:scale-[0.985]"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/[0.06] bg-white">
                <img
                  src={bathroomCareImg}
                  alt="Surface and Hygiene formulations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-apple"
                />
              </div>
              <div className="min-w-0 flex-1 pr-1">
                <div className="text-[10px] font-semibold uppercase text-teal-700 tracking-wider">
                  99.9% Hygiene
                </div>
                <div className="text-sm font-semibold text-[#1d1d1f] font-display flex items-center justify-between gap-1 mt-0.5">
                  <span className="truncate">Surface &amp; Hygiene</span>
                  <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                </div>
                <div className="text-[11px] text-[#6e6e73] truncate mt-0.5">
                  Herbal floor &amp; hand wash
                </div>
              </div>
            </button>

            {/* 4. Automobile Care */}
            <button
              type="button"
              onClick={() => {
                onSelectCategory('automobile-care');
                onScrollToProducts();
              }}
              className="group w-full text-left rounded-2xl border border-black/[0.06] bg-[#f5f5f7] hover:bg-white hover:border-black/[0.12] hover:shadow-apple-card transition-all duration-300 ease-apple cursor-pointer p-2.5 flex items-center gap-3.5 active:scale-[0.985]"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/[0.06] bg-white">
                <img
                  src={carCareImg}
                  alt="Automobile Care formulations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-apple"
                />
              </div>
              <div className="min-w-0 flex-1 pr-1">
                <div className="text-[10px] font-semibold uppercase text-sky-700 tracking-wider">
                  Pro Detailing
                </div>
                <div className="text-sm font-semibold text-[#1d1d1f] font-display flex items-center justify-between gap-1 mt-0.5">
                  <span className="truncate">Automobile Care</span>
                  <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                </div>
                <div className="text-[11px] text-[#6e6e73] truncate mt-0.5">
                  pH 7 shampoo &amp; snow foam
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
