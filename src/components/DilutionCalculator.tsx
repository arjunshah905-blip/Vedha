import React, { useState } from 'react';
import { VEDHA_PRODUCTS } from '../data/products';
import { Droplets, Calculator, Check, ArrowRight } from 'lucide-react';
import { PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

export const DilutionCalculator: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('floor-cleaner');
  const [cleaningUnits, setCleaningUnits] = useState<number>(1);

  const currentProduct = VEDHA_PRODUCTS.find(p => p.id === selectedProductId) || VEDHA_PRODUCTS[0];

  const doseSpecs: Record<string, { unitName: string; mlPerUnit: number; tip: string; containerText: string }> = {
    'floor-cleaner': {
      unitName: 'Half Buckets (5 Litres water)',
      mlPerUnit: 25,
      tip: '25 ml (1:200 dilution) cleans high-traffic tile and kitchen floors thoroughly.',
      containerText: '5-Litre Mopping Bucket'
    },
    'plant-based-floor-cleaner': {
      unitName: 'Mopping Buckets (5 Litres water)',
      mlPerUnit: 20,
      tip: '1 capful (20 ml) cleans up to 1,500 sq.ft of delicate marble, granite, or wooden flooring.',
      containerText: '5-Litre Mopping Bucket'
    },
    'dishwashing-liquid': {
      unitName: 'Sink Bowls (50 ml water)',
      mlPerUnit: 5,
      tip: '1 teaspoon (5 ml) diluted in a small bowl washes up to 25 plates and greasy cookware items.',
      containerText: '50 ml Dilution Bowl'
    },
    'plant-based-liquid-detergent': {
      unitName: 'Washing Machine Loads (6-8 kg)',
      mlPerUnit: 40,
      tip: '1 full cap (40 ml) provides high-efficiency enzyme stain release for an entire family wash cycle.',
      containerText: 'Front / Top Load Drum'
    },
    'plant-based-liquid-hand-wash': {
      unitName: 'Tabletop Dispenser Refills (250 ml)',
      mlPerUnit: 250,
      tip: 'Refills your existing bathroom or kitchen pump bottle 4 full times with 1L.',
      containerText: '250 ml Pump Dispenser'
    },
    'toilet-cleaner': {
      unitName: 'Toilet Clean Cycles (Angled Nozzle)',
      mlPerUnit: 30,
      tip: '30 ml directed under the rim clings to porcelain walls to break down heavy mineral limescale.',
      containerText: 'Toilet Bowl Rim'
    },
    'car-shampoo': {
      unitName: 'Car Wash Buckets (10 Litres water)',
      mlPerUnit: 25,
      tip: '25 ml creates silky suds for a complete swirl-free SUV or sedan hand wash.',
      containerText: '10-Litre Wash Bucket'
    },
    'car-wash-shampoo': {
      unitName: 'Foam Cannon Reservoirs (1 Litre)',
      mlPerUnit: 100,
      tip: '100 ml concentrate + 900 ml water coats the entire vehicle in dense clinging snow foam.',
      containerText: '1-Litre Pressure Foam Cannon'
    }
  };

  const spec = doseSpecs[selectedProductId] || doseSpecs['floor-cleaner'];
  const totalMlNeeded = spec.mlPerUnit * cleaningUnits;
  const totalUsesPerBottle = Math.floor(1000 / spec.mlPerUnit);
  const costPerUse = (currentProduct.estPrice / totalUsesPerBottle).toFixed(2);

  return (
    <section id="dilution-calculator" className="bg-[#f5f5f7] py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-800">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dosage &amp; Yield Meter</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold font-display text-[#1d1d1f] tracking-[-0.03em] leading-tight">
            Interactive Dilution &amp; Yield Calculator
          </h2>

          <p className="text-sm text-[#86868b] leading-relaxed font-normal">
            Select any Vedha formulation below to calculate exact concentrate dosage, remaining bottle volume, and true cost per wash.
          </p>
        </div>

        {/* Structured Apple 4x2 Formulation Picker Grid */}
        <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {VEDHA_PRODUCTS.map((prod) => {
            const isSelected = selectedProductId === prod.id;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedProductId(prod.id)}
                className={`group text-left p-2.5 rounded-2xl border transition-all duration-200 ease-apple cursor-pointer flex items-center gap-3 active:scale-[0.985] ${
                  isSelected
                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-apple-card'
                    : 'bg-white text-[#1d1d1f] border-black/[0.06] hover:border-black/[0.14] hover:shadow-2xs'
                }`}
              >
                <div className="isolate w-10 h-10 rounded-xl bg-[#f5f5f7] border border-black/[0.06] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS} group-hover:scale-105 transition-transform duration-300`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-[#1d1d1f]'}`}>
                    {prod.name}
                  </div>
                  <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-emerald-400' : 'text-[#86868b]'}`}>
                    ₹{prod.estPrice} · 1L
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Calculator Interactive Box */}
        <div className="mt-5 bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-apple-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sliders & Controls */}
            <div className="md:col-span-7 space-y-5">
              {/* Selected SKU Banner */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="isolate w-11 h-11 rounded-xl bg-[#f5f5f7] border border-black/[0.06] p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#1d1d1f] font-display truncate">
                      {currentProduct.name}
                    </div>
                    <div className="text-[11px] text-[#86868b]">
                      Concentrate dosage: <span className="font-mono font-semibold text-emerald-700">{spec.mlPerUnit} ml</span> per load
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-mono font-medium shrink-0">
                  {totalUsesPerBottle} washes / 1L
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#1d1d1f] mb-3">
                  <span>How many {spec.unitName} to prepare?</span>
                  <span className="font-mono text-sm bg-stone-100 px-2.5 py-0.5 rounded-full">{cleaningUnits} {cleaningUnits === 1 ? 'unit' : 'units'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={cleaningUnits}
                  onChange={(e) => setCleaningUnits(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                />
                <div className="flex justify-between text-[11px] text-[#86868b] mt-1.5 font-mono">
                  <span>1 Unit</span>
                  <span>5 Units</span>
                  <span>10 Units</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-black/[0.04] space-y-1.5">
                <div className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Standard Application Tip</span>
                </div>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  {spec.tip}
                </p>
                <div className="text-[11px] text-stone-600 pt-0.5">
                  <strong>Recommended Vessel:</strong> {spec.containerText}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Yield Breakdown */}
            <div className="md:col-span-5 bg-[#161617] text-white rounded-2xl p-6 space-y-4 border border-white/10 shadow-lg">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                1-Litre Bottle Yield
              </div>

              <div>
                <div className="text-xs text-stone-400">Total Concentrate Needed:</div>
                <div className="text-3xl font-semibold font-mono text-white mt-1 tabular-nums tracking-tight">
                  {totalMlNeeded} ml
                </div>
                <div className="text-[11px] text-[#86868b] mt-1">
                  Leaves {1000 - totalMlNeeded > 0 ? 1000 - totalMlNeeded : 0} ml remaining in your 1L bottle.
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] uppercase text-[#86868b]">Total Yield / 1L</div>
                  <div className="text-lg font-semibold font-mono text-emerald-300 tabular-nums">
                    {totalUsesPerBottle} washes
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase text-[#86868b]">Cost Per Cleaning</div>
                  <div className="text-lg font-semibold font-mono text-white tabular-nums">
                    ₹{costPerUse}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#86868b] pt-1 leading-normal border-t border-white/10">
                Based on ₹{currentProduct.estPrice} for 1 Litre (1000 ml) Net Quantity.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
