import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { X, Check, Leaf, ShieldAlert, Droplets, Info, MessageCircle, ShoppingBag, Sparkles, Play, Plus, Minus, PackagePlus } from 'lucide-react';
import { ProductUsageVideo } from './ProductUsageVideo';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';
import { buildBulkQuoteWhatsAppUrl } from '../utils/whatsappQuote';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectBuy?: (product: Product, quantity: number) => void;
  onOpenPackagingProduct?: (productId: string) => void;
  cartItems?: CartItem[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectBuy,
  cartItems = []
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'benefits' | 'directions' | 'video' | 'safety' | 'statutory'>('benefits');

  useEffect(() => {
    setQuantity(1);
    setSelectedSizeIndex(0);
    setActiveTab('benefits');
  }, [product?.id]);

  if (!product) return null;

  const availableSizes = product.availableSizes || [
    { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: product.mrp, estPrice: product.estPrice },
    { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: product.mrp * 4.5, estPrice: Math.round(product.estPrice * 4.2), savingsPercent: 15 }
  ];
  const activeSize = availableSizes[selectedSizeIndex] || availableSizes[0];
  const sizedProduct: Product = {
    ...product,
    packSize: activeSize.size,
    mrp: activeSize.mrp,
    estPrice: activeSize.estPrice,
  };

  const bulkQuoteUrl = buildBulkQuoteWhatsAppUrl({
    product: sizedProduct,
    quantity,
    cartItems,
  });

  const whatsappOrderUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Vedha Care,\nI would like to place an order for:\n- Product: ${product.name} (${activeSize.size} Pack)\n- Quantity: ${quantity} unit(s)\n- Delivery Pin Code:\n\nPlease confirm order dispatch and payment options.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden my-8 animate-in zoom-in-95 duration-300 ease-apple">
        {/* Apple-style Frosted Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#1d1d1f] font-semibold">1L Standard &amp; 5L Bulk Available</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer active:scale-90"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Top Split: Image & Primary Buy Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 isolate bg-[#f5f5f7] rounded-2xl p-4 flex items-center justify-center aspect-[4/3] overflow-hidden border border-black/[0.04]">
              <img
                src={product.image}
                alt={generateProductAltText(product.name, product.packSize, 'bottle')}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              {product.isPlantBased && product.isBiodegradable ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified 100% Plant-Based &amp; Biodegradable</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-black/[0.06]">
                  <span>High-Efficiency Formulation</span>
                </div>
              )}

              <h2 className="text-2xl font-semibold text-[#1d1d1f] font-display tracking-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#86868b] leading-relaxed">
                "{product.tagline}"
              </p>

              <div className="pt-2 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#1d1d1f] font-mono tabular-nums tracking-tight">
                  ₹{activeSize.estPrice}
                </span>
                <span className="text-xs text-[#86868b] line-through">
                  MRP ₹{activeSize.mrp}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Save ₹{activeSize.mrp - activeSize.estPrice}
                </span>
              </div>

              {/* Pack Size Toggle */}
              <div className="inline-flex items-center p-1 bg-stone-100 rounded-full border border-black/[0.04]">
                {availableSizes.map((sz, idx) => (
                  <button
                    key={sz.size}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-apple cursor-pointer ${
                      selectedSizeIndex === idx
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {sz.label} · ₹{sz.estPrice}
                  </button>
                ))}
              </div>

              {/* Apple-style Stepper & Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-black/[0.04]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer active:scale-90"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-[#1d1d1f] font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer active:scale-90"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onDirectBuy) onDirectBuy(sizedProduct, quantity);
                    else onAddToCart(sizedProduct, quantity);
                    onClose();
                  }}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#0071e3] hover:bg-[#0077ed] rounded-full transition-all duration-300 ease-apple cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy Now (₹{activeSize.estPrice * quantity})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(sizedProduct, quantity);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-all duration-300 ease-apple cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>+ Bag ({quantity})</span>
                </button>

                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors flex items-center gap-1"
                  title="WhatsApp Concierge Order"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={bulkQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-medium text-stone-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-full transition-colors flex items-center gap-1.5"
                  title="Request wholesale / bulk pricing for this formulation on WhatsApp"
                >
                  <PackagePlus className="w-3.5 h-3.5 text-amber-700" />
                  <span>Request Bulk Quote</span>
                </a>
              </div>
            </div>
          </div>

          {/* Apple-style Segmented Tabs */}
          <div className="border-t border-black/[0.06] pt-5">
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-full border border-black/[0.04] overflow-x-auto text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('benefits')}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap ${
                  activeTab === 'benefits' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Key Benefits
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('directions')}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap ${
                  activeTab === 'directions' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Directions &amp; Dilution
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'video' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Play className="w-3 h-3 text-emerald-500 fill-current" />
                <span>Usage Guide Video</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('safety')}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap ${
                  activeTab === 'safety' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Safety &amp; Storage
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('statutory')}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap ${
                  activeTab === 'statutory' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Statutory Declarations
              </button>
            </div>

            {/* Tab 1: Benefits */}
            {activeTab === 'benefits' && (
              <div className="pt-5 space-y-4 text-xs text-[#1d1d1f] leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-sm mb-2.5">Verified Benefits</h4>
                  <ul className="space-y-2">
                    {product.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-[#1d1d1f] text-sm mb-2.5">Recommended Applications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.recommendedApplications.map((app, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-stone-50 border border-black/[0.04]">
                        {app}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('video')}
                    className="w-full p-3.5 rounded-2xl bg-stone-900 text-white hover:bg-black transition-all duration-300 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-xs">Watch Step-by-Step Usage Visualizer</div>
                        <div className="text-[10px] text-stone-400">Interactive simulation for {product.name}</div>
                      </div>
                    </div>
                    <span className="text-xs text-white font-medium">Play →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Directions & Dilution */}
            {activeTab === 'directions' && (
              <div className="pt-5 space-y-4 text-xs text-[#1d1d1f]">
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
                  <div className="font-medium text-emerald-900 mb-0.5">Recommended Dilution Ratio:</div>
                  <div className="text-emerald-800 font-mono text-sm font-semibold">{product.dilutionRatio}</div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-sm mb-2.5">Application Steps</h4>
                  <ol className="space-y-2 list-decimal pl-4">
                    {product.directionsForUse.map((step, i) => (
                      <li key={i} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('video')}
                    className="w-full p-3.5 rounded-2xl bg-stone-900 text-white hover:bg-black transition-all duration-300 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-xs">Watch Animated Usage Video</div>
                        <div className="text-[10px] text-stone-400">Visual demonstration of dilution and technique</div>
                      </div>
                    </div>
                    <span className="text-xs text-white font-medium">Play Reel →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Usage Video */}
            {activeTab === 'video' && (
              <div className="pt-5 space-y-3">
                <ProductUsageVideo product={product} />
              </div>
            )}

            {/* Tab 3: Safety & Storage */}
            {activeTab === 'safety' && (
              <div className="pt-5 space-y-4 text-xs text-[#1d1d1f]">
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-sm mb-2.5 flex items-center gap-1.5 text-amber-800">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Safety Precautions
                  </h4>
                  <ul className="space-y-2">
                    {product.safetyInstructions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-sm mb-1">Storage Condition</h4>
                  <p className="text-[#86868b]">{product.storageInstructions}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-sm mb-1">Composition Transparency</h4>
                  <p className="text-[#86868b] bg-stone-50 p-3 rounded-2xl border border-black/[0.04]">
                    {product.compositionNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: Statutory Declarations (India) */}
            {activeTab === 'statutory' && (
              <div className="pt-5 text-xs space-y-3">
                <div className="p-4 bg-stone-50 rounded-2xl border border-black/[0.06]">
                  <div className="font-semibold text-[#1d1d1f] mb-3">
                    Mandatory Indian Legal Metrology (Packaged Commodities) Rules, 2011:
                  </div>
                  <table className="w-full text-stone-700">
                    <tbody>
                      <tr className="border-b border-black/[0.04]">
                        <td className="py-1.5 font-medium text-[#1d1d1f] w-1/3">Commodity Name</td>
                        <td className="py-1.5">{product.name} (Liquid Formulation)</td>
                      </tr>
                      <tr className="border-b border-black/[0.04]">
                        <td className="py-1.5 font-medium text-[#1d1d1f]">Net Quantity</td>
                        <td className="py-1.5">1 Litre (1000 ml) &amp; 5 Litres (5000 ml)</td>
                      </tr>
                      <tr className="border-b border-black/[0.04]">
                        <td className="py-1.5 font-medium text-[#1d1d1f]">MRP (Incl. of all taxes)</td>
                        <td className="py-1.5 font-mono">₹{product.mrp}</td>
                      </tr>
                      <tr className="border-b border-black/[0.04]">
                        <td className="py-1.5 font-medium text-[#1d1d1f]">Shelf Life / Best Before</td>
                        <td className="py-1.5">{product.bestBeforeMonths} months from date of manufacture</td>
                      </tr>
                      <tr className="border-b border-black/[0.04]">
                        <td className="py-1.5 font-medium text-[#1d1d1f]">Manufacturer &amp; Packer</td>
                        <td className="py-1.5">Vedha Consumer Solutions Pvt Ltd, Attibele, Bengaluru, Karnataka</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-medium text-[#1d1d1f]">Consumer Grievance Cell</td>
                        <td className="py-1.5">Email: info@vedha.ind.in | Attibele, Bengaluru</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
