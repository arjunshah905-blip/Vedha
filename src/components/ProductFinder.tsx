import React, { useState } from 'react';
import { Sparkles, Utensils, Shirt, Grid, Hand, Car, Wind, Droplet, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { VEDHA_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface ProductFinderProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectBuy: (product: Product) => void;
}

interface CleaningScenario {
  id: string;
  category: 'Home Care' | 'Automobile Care';
  title: string;
  spaceIcon: React.ReactNode;
  problem: string;
  productId: string;
  recommendedDosage: string;
  actionReason: string;
  surfaces: string[];
}

const CLEANING_SCENARIOS: CleaningScenario[] = [
  {
    id: 'greasy-cookware',
    category: 'Home Care',
    title: 'Greasy Cookware & Prep',
    spaceIcon: <Utensils className="w-4 h-4 text-emerald-700" />,
    problem: 'Tough Indian oil, burnt turmeric stains, and milk residue on cookware.',
    productId: 'dishwashing-liquid',
    recommendedDosage: '1 teaspoon (5 ml) in a small bowl of water',
    actionReason: 'Pure lime and plant degreasers cut through heavy vegetable oils without leaving bitter chemical film.',
    surfaces: ['Stainless Steel', 'Glassware', 'Ceramic', 'Cast Iron']
  },
  {
    id: 'laundry-sweat',
    category: 'Home Care',
    title: 'Daily Laundry & Collars',
    spaceIcon: <Shirt className="w-4 h-4 text-emerald-700" />,
    problem: 'Sweat odor, collar dirt, and hard-water greyish tint on whites and everyday cottons.',
    productId: 'plant-based-liquid-detergent',
    recommendedDosage: '40–60 ml per standard 6–8 kg washing machine load',
    actionReason: 'Anti-redeposition active surfactants suspend particulates in hard water, leaving zero powdery residue.',
    surfaces: ['Cotton', 'Linen', 'Synthetics', 'Delicates']
  },
  {
    id: 'herbal-floor',
    category: 'Home Care',
    title: 'Toddler & Pet-Safe Floors',
    spaceIcon: <Grid className="w-4 h-4 text-emerald-700" />,
    problem: 'Sticky kitchen floors, muddy paw prints, and barefoot grease streaks on delicate stone.',
    productId: 'plant-based-floor-cleaner',
    recommendedDosage: '1 capful (15–20 ml) in 5 Litres of mopping water',
    actionReason: 'Plant-derived, 100% organic Lavender floor shine that dries streak-free with soothing botanical aroma.',
    surfaces: ['Vitrified Tiles', 'Italian Marble', 'Granite', 'Hardwood']
  },
  {
    id: 'sensitive-hands',
    category: 'Home Care',
    title: 'Hand Wash & Skin Barrier',
    spaceIcon: <Hand className="w-4 h-4 text-emerald-700" />,
    problem: 'Dry, cracked skin caused by repeated hand washing with aggressive chemical sulfates.',
    productId: 'plant-based-liquid-hand-wash',
    recommendedDosage: 'Single pump (1.5 ml) on wet hands',
    actionReason: 'Neem Fresh extract and vegetable glycerin replenish moisture barrier while lifting food odors effortlessly.',
    surfaces: ['Skin Safe', 'Tear-Free', 'pH 5.5 Balanced']
  },
  {
    id: 'commercial-floor',
    category: 'Home Care',
    title: 'High-Traffic Disinfection',
    spaceIcon: <Droplet className="w-4 h-4 text-emerald-700" />,
    problem: 'High foot-traffic dirt, commercial spills, and stubborn stains in entrance lobbies and kitchens.',
    productId: 'floor-cleaner',
    recommendedDosage: '25 ml in half a bucket of water (1:200 dilution)',
    actionReason: 'Concentrated citrus degreaser and disinfectant formulated for heavy daily commercial floor maintenance.',
    surfaces: ['Ceramic Tiles', 'Cement', 'Porcelain', 'Terrazzo']
  },
  {
    id: 'toilet-descaling',
    category: 'Home Care',
    title: 'Toilet Limescale Descaling',
    spaceIcon: <ShieldCheck className="w-4 h-4 text-emerald-700" />,
    problem: 'Hard-water yellow stains, mineral buildup, and stubborn uric acid marks under the toilet bowl rim.',
    productId: 'toilet-cleaner',
    recommendedDosage: 'Direct squeeze via angled neck, 10–15 min dwell before brush scrubbing',
    actionReason: 'High-viscosity clinging formulation that adheres to vertical ceramic walls for maximum lime dissolution.',
    surfaces: ['Ceramic Bowls', 'Urinals', 'Sanitaryware']
  },
  {
    id: 'pressure-washer-snow',
    category: 'Automobile Care',
    title: 'Touchless Snow Foam Soak',
    spaceIcon: <Wind className="w-4 h-4 text-sky-700" />,
    problem: 'Heavy mud, highway insect splatters, and abrasive road film without scratching clear coat.',
    productId: 'car-wash-shampoo',
    recommendedDosage: '100 ml foam concentrate + 900 ml water in foam cannon (1:9 ratio)',
    actionReason: 'Clinging high-density snow foam encapsulates dirt particles and slides them off before mitt contact.',
    surfaces: ['Clear Coats', 'Ceramic Coatings', 'PPF Films', 'Trim']
  },
  {
    id: 'two-bucket-wash',
    category: 'Automobile Care',
    title: 'Swirl-Free Contact Wash',
    spaceIcon: <Car className="w-4 h-4 text-sky-700" />,
    problem: 'Weekly dust, rain water spots, and atmospheric pollution on everyday cars and motorcycles.',
    productId: 'car-shampoo',
    recommendedDosage: '25–30 ml in a 10-Litre wash bucket with grit guard',
    actionReason: 'High-lubricity pH 7 neutral suds glide wash mitt smoothly without stripping carnauba wax or sealant.',
    surfaces: ['Automotive Paint', 'Chrome', 'Glass', 'Alloy Wheels']
  }
];

export function ProductFinder({ onSelectProduct, onAddToCart, onDirectBuy }: ProductFinderProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('greasy-cookware');

  const activeScenario =
    CLEANING_SCENARIOS.find((s) => s.id === selectedScenarioId) || CLEANING_SCENARIOS[0];
  const matchedProduct =
    VEDHA_PRODUCTS.find((p) => p.id === activeScenario.productId) || VEDHA_PRODUCTS[0];

  return (
    <section className="bg-[#f5f5f7] py-20 px-4 sm:px-6 lg:px-8 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Cleaning Advisor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold font-display text-[#1d1d1f] tracking-[-0.03em] leading-tight">
            Find your exact 1-Litre solution.
          </h2>
          <p className="text-sm text-[#86868b] leading-relaxed font-normal">
            Select your specific household or vehicle challenge to identify the optimal Vedha formulation and dilution ratio.
          </p>
        </div>

        {/* 8 Scenario Action Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CLEANING_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-300 ease-apple cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? scenario.category === 'Home Care'
                      ? 'bg-white border-emerald-600 shadow-apple-card ring-2 ring-emerald-600/30'
                      : 'bg-white border-sky-600 shadow-apple-card ring-2 ring-sky-600/30'
                    : 'bg-white/80 border-black/[0.06] hover:border-black/[0.12] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-full bg-stone-100">{scenario.spaceIcon}</div>
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      scenario.category === 'Home Care'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-sky-50 text-sky-800'
                    }`}
                  >
                    {scenario.category === 'Home Care' ? 'Home' : 'Auto'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#1d1d1f] line-clamp-2 leading-tight">
                    {scenario.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Recommendation Card */}
        <div className="p-6 sm:p-9 rounded-3xl bg-white border border-black/[0.06] shadow-apple-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Product Media & Specs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="isolate w-40 h-40 sm:w-44 sm:h-44 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] overflow-hidden shrink-0 p-3 flex items-center justify-center">
              <img
                src={matchedProduct.image}
                alt={generateProductAltText(matchedProduct.name, matchedProduct.packSize, 'bottle')}
                className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">
                Recommended 1-Litre Formulation
              </span>
              <h3 className="text-lg font-semibold font-display text-[#1d1d1f] tracking-tight">
                {matchedProduct.name}
              </h3>
              <div className="text-xs text-[#86868b] font-mono">
                ₹{matchedProduct.estPrice} <span className="text-stone-400">/ 1000 ml</span>
              </div>
              {matchedProduct.isPlantBased && matchedProduct.isBiodegradable && (
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Verified 100% Plant-Based</span>
                </div>
              )}
              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => onSelectProduct(matchedProduct)}
                  className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
                >
                  View Specs
                </button>
                <button
                  type="button"
                  onClick={() => onDirectBuy(matchedProduct)}
                  className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-black rounded-full transition-all duration-300 ease-apple cursor-pointer active:scale-95 shadow-xs"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Right: Challenge Diagnosis & Dilution Protocol */}
          <div className="lg:col-span-7 space-y-4 border-t lg:border-t-0 lg:border-l border-black/[0.06] lg:pl-8 pt-6 lg:pt-0">
            <div>
              <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">Target Cleaning Challenge</div>
              <p className="text-xs text-[#1d1d1f] mt-1 font-medium">{activeScenario.problem}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-black/[0.04] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Droplet className="w-4 h-4 text-emerald-600" />
                <span>Formulated Action Matrix</span>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">{activeScenario.actionReason}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">Recommended Dilution</div>
                <div className="text-xs font-semibold text-[#1d1d1f] mt-0.5">{activeScenario.recommendedDosage}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">Optimal Surfaces</div>
                <div className="text-xs text-stone-600 mt-0.5">{activeScenario.surfaces.join(' · ')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
