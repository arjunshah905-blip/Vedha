import React from 'react';
import { Product } from '../types';
import { Leaf, ShieldCheck, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface PlantBasedSpotlightProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const PlantBasedSpotlight: React.FC<PlantBasedSpotlightProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const verifiedEcoProducts = products.filter(p => p.isPlantBased && p.isBiodegradable);

  return (
    <section id="plant-based-spotlight" className="bg-[#000000] text-white py-12 lg:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Apple-style subtle radial ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Single Unified Botanical Keynote Banner (Text on Left Emerald Space, Bottles Uncropped on Right) */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-[#013b2d] shadow-2xl group lg:min-h-[430px] flex flex-col-reverse lg:flex-row lg:items-center">
          {/* Left Editorial Overlay Zone */}
          <div className="relative z-10 w-full lg:w-[48%] p-6 sm:p-8 lg:p-10 xl:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 font-medium">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Botanical Science · Zero Greenwashing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-[2.65rem] font-semibold font-display text-white tracking-[-0.03em] leading-[1.08]">
              Plant science. Pure performance.
            </h2>

            <p className="text-emerald-100/80 text-sm sm:text-[15px] leading-relaxed max-w-md font-normal">
              Formulated from renewable coconut bio-surfactants, pure essential oils, and skin-conditioning botanical actives—100% biodegradable and safe for aquatic ecosystems.
            </p>

            <div className="text-xs text-emerald-100/90 bg-black/25 border border-emerald-400/20 p-3.5 rounded-2xl flex items-start gap-2.5 backdrop-blur-md max-w-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Transparency Guarantee:</strong> Only these 4 verified formulations carry our plant-based &amp; biodegradable seal; heavy-duty &amp; auto lines use targeted active compounds.
              </span>
            </div>
          </div>

          {/* Right Botanical Product Banner (Blends seamlessly into left #013b2d emerald backdrop) */}
          <div className="relative w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[78%] overflow-hidden pointer-events-none">
            <img
              src="./assets/aistudio/Seconder_hero_banner_bcc02b6b.jpeg"
              alt="Vedha 100% Plant-Based Neem Fresh Hand Wash 1L and 100% Organic Lavender Floor Cleaner 1000ml with fresh botanical extracts"
              className="w-full aspect-[2/1] lg:aspect-auto lg:h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-apple"
            />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#013b2d] via-[#013b2d]/90 to-transparent" />
          </div>
        </div>

        {/* 4-Product Apple Pro Showcase Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedEcoProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#161617]/90 border border-white/10 rounded-3xl p-6 hover:border-emerald-500/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] transition-all duration-500 ease-apple flex flex-col justify-between group"
            >
              <div>
                {/* Visual Stage */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="isolate bg-[#f5f5f7] rounded-2xl aspect-[4/3] p-4 flex items-center justify-center cursor-pointer overflow-hidden mb-5 border border-white/10"
                >
                  <img
                    src={product.image}
                    alt={generateProductAltText(product.name, product.packSize, 'bottle')}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS} group-hover:scale-105 transition-transform duration-700 ease-apple`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-1.5">
                  <span>100% Biodegradable</span>
                  <span className="text-[#86868b]">1 Litre Pack</span>
                </div>

                <h3
                  onClick={() => onSelectProduct(product)}
                  className="text-xl font-semibold text-white hover:text-emerald-300 transition-colors cursor-pointer font-display tracking-tight"
                >
                  {product.name}
                </h3>

                <p className="mt-2 text-xs text-[#a1a1a6] leading-relaxed line-clamp-2">
                  {product.heroBenefit}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-[#86868b] space-y-1">
                  <div className="font-medium text-stone-300">Active Formulation:</div>
                  <div className="text-[11px] line-clamp-2 text-[#a1a1a6]">
                    {product.compositionNotes}
                  </div>
                </div>
              </div>

              {/* Price and actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-[#86868b] font-mono">MRP ₹{product.mrp}</div>
                  <div className="text-xl font-semibold font-mono text-white tabular-nums tracking-tight">
                    ₹{product.estPrice}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
                    title="View Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 text-xs font-medium text-black bg-white hover:bg-stone-200 rounded-full transition-all duration-300 ease-apple cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
