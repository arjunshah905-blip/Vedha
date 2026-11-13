import React from 'react';
import { STRATEGY_PILLARS } from '../data/auditData';
import { Compass, Layers, CheckCircle2, ShieldCheck, Palette, Target, Network, Sparkles } from 'lucide-react';

export const StrategyView: React.FC = () => {
  return (
    <div className="bg-stone-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800 font-semibold">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Phase 2 Deliverable · Brand, Product & UX Strategy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            Brand Identity, Navigation & Information Architecture Blueprint
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
            How to position a concentrated 6-product catalogue so it projects the authority, depth, and prestige of a premium direct-to-consumer brand without resorting to phantom products or artificial filler.
          </p>
        </div>

        {/* 4 Core Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STRATEGY_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 p-6 space-y-3 shadow-xs hover:border-stone-300 transition-colors"
            >
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-mono">
                  {idx + 1}
                </span>
                <span>{pillar.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {pillar.description}
              </p>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800">
                <strong className="text-stone-900">Implementation:</strong> {pillar.keyAction}
              </div>
            </div>
          ))}
        </div>

        {/* Ideal Sitemap & Information Architecture */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-lg font-display">
            <Network className="w-5 h-5 text-emerald-700" />
            <span>Recommended Streamlined Sitemap & Navigation Tree</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 text-sm pb-1 border-b border-stone-200">
                1. Home Care Hub (4 SKUs)
              </div>
              <ul className="space-y-1.5 text-stone-600 pl-2">
                <li>• Dishwashing Liquid (Plant-Based, 1L)</li>
                <li>• Lavender Floor Cleaner (Plant-Based, 1L)</li>
                <li>• Neem Fresh Hand Wash (Plant-Based, 1L)</li>
                <li>• Neem Liquid Detergent (Plant-Based, 1L)</li>
              </ul>
              <div className="text-[11px] text-stone-500 pt-1">
                <em>Action: Group on one high-converting category page with sub-filtering for verified plant-based items.</em>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 text-sm pb-1 border-b border-stone-200">
                2. Automobile Care Hub (2 SKUs)
              </div>
              <ul className="space-y-1.5 text-stone-600 pl-2">
                <li>• Car Shampoo (pH 7 Neutral, 1L)</li>
                <li>• Car Foam Wash (Snow Foam Cannon, 1L)</li>
                <li>• Two-Step Detailing Guide</li>
                <li>• Pressure Washer Dilution Calculator</li>
              </ul>
              <div className="text-[11px] text-stone-500 pt-1">
                <em>Action: Distinct performance visual language (midnight slate & electric blue).</em>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 text-sm pb-1 border-b border-stone-200">
                3. Brand & Legal Trust Hub
              </div>
              <ul className="space-y-1.5 text-stone-600 pl-2">
                <li>• About Vedha (Manufacturing Philosophy)</li>
                <li>• Verified Botanical Credentials</li>
                <li>• Statutory Declarations & Legal Metrology</li>
                <li>• Direct WhatsApp Concierge & Support</li>
              </ul>
              <div className="text-[11px] text-stone-500 pt-1">
                <em>Action: Replaces barren multiple pages with authoritative, trustworthy content modules.</em>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Visual Identity & Color System */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-lg font-display">
            <Palette className="w-5 h-5 text-emerald-700" />
            <span>Dual-Personality Visual Direction</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Home Care */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="font-bold text-emerald-950 text-sm uppercase tracking-wider">
                Home Care: Nature-Inspired & Calming
              </div>
              <p className="text-stone-700 leading-relaxed">
                Reflects family wellness, non-toxic living, and pure botanical freshness. Uses warm white travertine backdrops, soft morning light, and lush green accents.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#059669]"></span>
                  <span className="font-mono text-[11px]">#059669 (Emerald)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#0d9488]"></span>
                  <span className="font-mono text-[11px]">#0d9488 (Teal)</span>
                </div>
              </div>
            </div>

            {/* Automobile Care */}
            <div className="p-5 rounded-xl border border-stone-800 bg-stone-900 text-white space-y-3">
              <div className="font-bold text-sky-400 text-sm uppercase tracking-wider">
                Automobile Care: High-Performance & Detailing
              </div>
              <p className="text-stone-300 leading-relaxed">
                Reflects automotive precision, high-lubricity clear-coat protection, and snow-foam cannon efficiency. Uses midnight slate, polished industrial concrete, and electric blue/orange accents.
              </p>
              <div className="flex items-center gap-3 pt-2 text-stone-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#0284c7]"></span>
                  <span className="font-mono text-[11px]">#0284c7 (Detail Blue)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#f97316]"></span>
                  <span className="font-mono text-[11px]">#f97316 (Foam Orange)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
