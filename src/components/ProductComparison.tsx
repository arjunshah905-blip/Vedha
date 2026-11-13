import React, { useState } from 'react';
import { Table, Check, X, Shield, Droplets, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { VEDHA_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface ProductComparisonProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductComparison({ onSelectProduct, onAddToCart }: ProductComparisonProps) {
  const [filter, setFilter] = useState<'all' | 'home' | 'auto'>('all');

  const displayedProducts = VEDHA_PRODUCTS.filter((p) => {
    if (filter === 'home') return p.category === 'home-care';
    if (filter === 'auto') return p.category === 'automobile-care';
    return true;
  });

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-emerald-800">
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>Specification Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-[#1d1d1f] tracking-[-0.03em] leading-tight">
              Compare all formulations.
            </h2>
            <p className="text-sm text-[#86868b] max-w-2xl font-normal leading-relaxed">
              Transparent chemical profiles, active pH values, and certified plant-based classification for all 8 Vedha formulations in 1-Litre and 5-Litre formats.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-full border border-black/[0.04] text-xs font-medium self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All 8 Formulations
            </button>
            <button
              type="button"
              onClick={() => setFilter('home')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer ${
                filter === 'home'
                  ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Home Care (6)
            </button>
            <button
              type="button"
              onClick={() => setFilter('auto')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer ${
                filter === 'auto'
                  ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Auto Care (2)
            </button>
          </div>
        </div>

        {/* Responsive Apple Specs Table Wrapper */}
        <div className="overflow-x-auto border border-black/[0.06] rounded-3xl shadow-apple-card bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/80 border-b border-black/[0.06] text-[#1d1d1f] font-semibold">
                <th className="p-4 sm:p-5 min-w-[220px]">Product &amp; Category</th>
                <th className="p-4 sm:p-5 min-w-[110px]">Net Volume</th>
                <th className="p-4 sm:p-5 min-w-[130px]">Plant-Based Claim</th>
                <th className="p-4 sm:p-5 min-w-[120px]">Biodegradable</th>
                <th className="p-4 sm:p-5 min-w-[120px]">Active pH</th>
                <th className="p-4 sm:p-5 min-w-[180px]">Standard Dilution</th>
                <th className="p-4 sm:p-5 min-w-[140px]">Primary Active</th>
                <th className="p-4 sm:p-5 min-w-[110px] text-right">Specs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {displayedProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Name */}
                  <td className="p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="isolate w-10 h-10 rounded-xl bg-[#f5f5f7] border border-black/[0.04] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={p.image}
                          alt={generateProductAltText(p.name, p.packSize, 'thumbnail')}
                          className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-[#1d1d1f]">{p.name}</div>
                        <div className="text-[10px] text-[#86868b] capitalize">
                          {p.category.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Volume */}
                  <td className="p-4 sm:p-5 font-mono text-[#1d1d1f]">
                    <span className="font-semibold">1L</span> &amp; <span className="text-emerald-700 font-semibold">5L</span>
                  </td>

                  {/* Plant-based */}
                  <td className="p-4 sm:p-5">
                    {p.isPlantBased ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        <Leaf className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#86868b] bg-stone-100 px-2 py-0.5 rounded-full">
                        <X className="w-3 h-3 text-stone-400" />
                        Synthetic
                      </span>
                    )}
                  </td>

                  {/* Biodegradable */}
                  <td className="p-4 sm:p-5">
                    {p.isBiodegradable ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        <Check className="w-3 h-3 text-emerald-600" />
                        100% Eco
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#86868b] font-mono">—</span>
                    )}
                  </td>

                  {/* pH */}
                  <td className="p-4 sm:p-5 font-mono text-[#1d1d1f]">
                    {p.isPlantBased ? 'pH 6.5–7.2' : 'pH 7.0–8.0'}
                  </td>

                  {/* Dilution */}
                  <td className="p-4 sm:p-5 text-[#86868b] font-mono text-[11px]">
                    {p.dilutionRatio}
                  </td>

                  {/* Primary Active */}
                  <td className="p-4 sm:p-5 text-[#1d1d1f] text-[11px]">
                    {p.benefits[0] || p.compositionNotes}
                  </td>

                  {/* Action */}
                  <td className="p-4 sm:p-5 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="px-3.5 py-1.5 text-xs font-medium text-[#1d1d1f] bg-stone-100 hover:bg-stone-200/80 rounded-full transition-colors cursor-pointer active:scale-95"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
