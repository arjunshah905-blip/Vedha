import React, { useState } from 'react';
import { Leaf, Recycle, Scale, TrendingDown, Sparkles, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface SustainabilityImpactProps {
  onDirectBuy: (productId?: string) => void;
}

export const SustainabilityImpact: React.FC<SustainabilityImpactProps> = ({ onDirectBuy }) => {
  // Interactive state
  const [bottlesPerMonth, setBottlesPerMonth] = useState<number>(3); // 3 1-Litre bottles/month for typical household
  const [timeframeYears, setTimeframeYears] = useState<number>(1);
  const [comparisonSize, setComparisonSize] = useState<'250ml' | '500ml'>('250ml');

  // Math models:
  // 1x 1000ml Vedha HDPE container = ~52 grams of plastic (1 cap).
  // 4x 250ml market containers + 4 pumps = ~32g * 4 = 128 grams of plastic.
  // Savings per 1000ml vs 250ml = 128g - 52g = 76 grams saved per 1L (59.4% reduction).
  // 2x 500ml market containers + 2 caps/triggers = ~48g * 2 = 96 grams of plastic.
  // Savings per 1000ml vs 500ml = 96g - 52g = 44 grams saved per 1L (45.8% reduction).

  const gramsSavedPerLitre = comparisonSize === '250ml' ? 76 : 44;
  const smallBottlesPerLitre = comparisonSize === '250ml' ? 4 : 2;

  const totalLitresPurchased = bottlesPerMonth * 12 * timeframeYears;
  const totalPlasticSavedGrams = totalLitresPurchased * gramsSavedPerLitre;
  const totalPlasticSavedKg = (totalPlasticSavedGrams / 1000).toFixed(2);
  const totalSmallBottlesSaved = totalLitresPurchased * (smallBottlesPerLitre - 1);
  const co2EmissionsSavedKg = ((totalPlasticSavedGrams * 3.5) / 1000).toFixed(1); // 1kg HDPE ~ 3.5kg CO2e
  const estimatedRupeeSavings = totalLitresPurchased * (comparisonSize === '250ml' ? 140 : 85);

  return (
    <section className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800 relative overflow-hidden">
      {/* Background organic glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>Environmental Math · The 1-Litre Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Dynamic Sustainability Impact Calculator
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            By eliminating tiny 250ml pump bottles and standardizing on concentrated 1-Litre bulk containers, Vedha radically decreases plastic packaging, transportation fuel, and household disposal waste.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="mt-10 bg-stone-950/80 rounded-2xl border border-stone-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Slider 1: Monthly 1L Bottles */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-2">
                  <span>Household Consumption (1-Litre Bottles / Month):</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">
                    {bottlesPerMonth} {bottlesPerMonth === 1 ? 'Bottle' : 'Bottles'} ({bottlesPerMonth} Litres)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={bottlesPerMonth}
                  onChange={(e) => setBottlesPerMonth(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
                  <span>1 Bottle (Solo)</span>
                  <span>3 Bottles (Avg Family)</span>
                  <span>10 Bottles (Large Home / Studio)</span>
                </div>
              </div>

              {/* Comparison Market Size Buttons */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Compare Vedha 1L Against Market Size:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setComparisonSize('250ml')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      comparisonSize === '250ml'
                        ? 'bg-emerald-950 border-emerald-500 text-white shadow-xs'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">250 ml Small Pump Bottles</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">4 plastic bottles replaced per 1L</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setComparisonSize('500ml')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      comparisonSize === '500ml'
                        ? 'bg-emerald-950 border-emerald-500 text-white shadow-xs'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">500 ml Retail Trigger Bottles</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">2 plastic bottles replaced per 1L</div>
                  </button>
                </div>
              </div>

              {/* Time Horizon Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Impact Time Horizon:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 5].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTimeframeYears(yr)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        timeframeYears === yr
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                      }`}
                    >
                      {yr} {yr === 1 ? 'Year' : 'Years'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metrics Display */}
            <div className="lg:col-span-6 bg-gradient-to-br from-stone-900 to-emerald-950/70 border border-emerald-800/60 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Your Net Environmental Reduction
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Over {timeframeYears} {timeframeYears === 1 ? 'Year' : 'Years'}
                </span>
              </div>

              {/* 4 Metric Callout Blocks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/60 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                    <Scale className="w-3 h-3 text-emerald-400" />
                    <span>Plastic Prevented</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-300 tabular-nums">
                    {totalPlasticSavedKg} kg
                  </div>
                  <div className="text-[10px] text-stone-400">
                    High-density polymer eliminated
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/60 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                    <Recycle className="w-3 h-3 text-teal-400" />
                    <span>Bottles Avoided</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    {totalSmallBottlesSaved} units
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {comparisonSize} single-use market containers
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/60 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-sky-400" />
                    <span>CO₂e Avoided</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-sky-300 tabular-nums">
                    {co2EmissionsSavedKg} kg
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Production & freight emissions
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/60 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Estimated Savings</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
                    ₹{estimatedRupeeSavings.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Vs buying recurring retail bottles
                  </div>
                </div>
              </div>

              {/* Direct Purchase CTA Banner */}
              <div className="pt-2">
                <button
                  onClick={() => onDirectBuy()}
                  className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-950/80 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Directly Buy 1-Litre Sustainable Formulations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-center text-[10px] text-stone-400 mt-2">
                  Free factory dispatch in Bengaluru for orders over ₹499 · Attibele Manufacturing Hub
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
