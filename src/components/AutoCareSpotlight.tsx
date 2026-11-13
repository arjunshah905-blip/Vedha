import React from 'react';
import { Product } from '../types';
import { Car, Droplets, Shield, Sparkles, Check, Flame, ShoppingBag, Eye } from 'lucide-react';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface AutoCareSpotlightProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const AutoCareSpotlight: React.FC<AutoCareSpotlightProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const autoProducts = products.filter(p => p.category === 'automobile-care');

  return (
    <section id="auto-care-spotlight" className="bg-[#0b0b0c] text-stone-100 py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-t border-b border-white/5 relative overflow-hidden">
      {/* Apple-style ambient blue/sky lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.1),_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Keynote Headline & Regimen */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sky-400 font-medium">
              <Car className="w-3.5 h-3.5 text-sky-400" />
              <span>Precision Vehicle Detailing</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-semibold font-display text-white tracking-[-0.03em] leading-tight">
              Auto detailing. Zero compromise.
            </h2>

            <p className="text-[#a1a1a6] text-base leading-relaxed font-normal">
              Engineered for ceramic coatings, clear coats, and matte wraps. High-lubricity dirt encapsulation prevents wash-induced swirl marks and clear-coat marring.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 backdrop-blur-md">
              <div className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                Two-Step Wash Regimen
              </div>
              <div className="space-y-2 text-xs text-[#a1a1a6]">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-sky-400 font-bold">01</span>
                  <span><strong>Car Foam Wash</strong> — Touchless snow foam soak (1:9 cannon ratio) to loosen road grime prior to mitt contact.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-sky-400 font-bold">02</span>
                  <span><strong>Car Shampoo</strong> — High-lubricity pH 7 neutral bucket wash to lift film safely with zero paint marring.</span>
                </div>
              </div>
            </div>

            {/* Performance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-sm font-semibold text-sky-400 font-mono">pH 7.0</div>
                <div className="text-[10px] text-[#86868b] mt-0.5">Wax &amp; Coat Safe</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-sm font-semibold text-sky-400 font-mono">1:400</div>
                <div className="text-[10px] text-[#86868b] mt-0.5">Bucket Ratio</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-sm font-semibold text-sky-400 font-mono">1:9</div>
                <div className="text-[10px] text-[#86868b] mt-0.5">Cannon Ready</div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Auto Products in Apple Pro Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {autoProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#161617]/90 border border-white/10 rounded-3xl p-6 hover:border-sky-500/40 hover:shadow-[0_20px_50px_rgba(14,165,233,0.12)] transition-all duration-500 ease-apple flex flex-col justify-between group"
              >
                <div>
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

                  <div className="flex items-center justify-between text-xs text-sky-400 font-medium mb-1.5">
                    <span>Automobile Grade</span>
                    <span className="text-[#86868b]">1L &amp; 5L Available</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-xl font-semibold text-white hover:text-sky-300 transition-colors cursor-pointer font-display tracking-tight"
                  >
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#a1a1a6] line-clamp-2 leading-relaxed">
                    {product.heroBenefit}
                  </p>

                  <div className="mt-4 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-sky-200">
                    <span className="font-medium text-white">Dilution: </span>
                    {product.dilutionRatio}
                  </div>
                </div>

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
      </div>
    </section>
  );
};
