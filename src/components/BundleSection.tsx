import React from 'react';
import { VEDHA_BUNDLES, VEDHA_PRODUCTS } from '../data/products';
import { CuratedBundle, Product } from '../types';
import { Sparkles, Check, ArrowRight, ShoppingBag } from 'lucide-react';

interface BundleSectionProps {
  onAddBundleToCart: (bundle: CuratedBundle) => void;
  onSelectProduct: (product: Product) => void;
}

export const BundleSection: React.FC<BundleSectionProps> = ({
  onAddBundleToCart,
  onSelectProduct
}) => {
  return (
    <section id="bundles-section" className="bg-[#f5f5f7] py-20 px-4 sm:px-6 lg:px-8 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Curated Synergy Bundles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold font-display text-[#1d1d1f] tracking-[-0.03em] leading-tight">
            Curated combinations. Built to work together.
          </h2>

          <p className="text-[#86868b] text-base leading-relaxed font-normal">
            Designed to address routine household and vehicle needs in bundled 1-Litre sets with built-in bundle savings.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {VEDHA_BUNDLES.map((bundle) => {
            const bundledItems = VEDHA_PRODUCTS.filter(p => bundle.productIds.includes(p.id));

            return (
              <div
                key={bundle.id}
                className="bg-white rounded-3xl border border-black/[0.06] p-7 flex flex-col justify-between hover:border-black/[0.12] shadow-apple-card hover:shadow-apple-hover transition-all duration-500 ease-apple group"
              >
                <div>
                  <div className="inline-block text-[11px] font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                    {bundle.badge}
                  </div>

                  <h3 className="text-xl font-semibold text-[#1d1d1f] font-display tracking-tight">
                    {bundle.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#86868b]">
                    {bundle.subtitle}
                  </p>

                  <p className="mt-3 text-xs text-[#1d1d1f]/80 leading-relaxed font-normal">
                    {bundle.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-black/[0.04] space-y-2.5">
                    <div className="text-[10px] font-medium uppercase text-[#86868b] tracking-wider">
                      Included 1-Litre Bottles:
                    </div>
                    <ul className="space-y-2 text-xs text-[#1d1d1f]">
                      {bundledItems.map((item) => (
                        <li key={item.id} className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(item)}
                            className="hover:text-[#0071e3] transition-colors text-left flex items-center gap-2 cursor-pointer"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{item.name} (1L)</span>
                          </button>
                          <span className="text-[#86868b] font-mono text-[11px]">₹{item.estPrice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-black/[0.04]">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#86868b] line-through mr-2">
                        ₹{bundle.regularTotal}
                      </span>
                      <span className="text-2xl font-semibold font-mono text-[#1d1d1f] tabular-nums tracking-tight">
                        ₹{bundle.bundlePrice}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      Save ₹{bundle.savings}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddBundleToCart(bundle)}
                    className="w-full py-2.5 px-4 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-medium tracking-tight active:scale-[0.98] transition-all duration-300 ease-apple cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Bundle to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
