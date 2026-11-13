import React, { useState } from 'react';
import { VEDHA_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Check, AlertCircle, FileText, QrCode, Layers, ShieldCheck, Printer } from 'lucide-react';

interface PackagingStudioViewProps {
  initialProductId?: string;
}

export const PackagingStudioView: React.FC<PackagingStudioViewProps> = ({ initialProductId }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId || 'dishwashing-liquid');
  const [labelSide, setLabelSide] = useState<'both' | 'front' | 'back'>('both');

  const product = VEDHA_PRODUCTS.find(p => p.id === selectedProductId) || VEDHA_PRODUCTS[0];

  return (
    <div className="bg-stone-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Studio Header */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Phase 5 Deliverable · 1-Litre Label Design Architecture</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                Vedha 1-Litre Packaging & Label Specification Studio
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                Consistent visual identity, product-specific color coding, and mandatory Indian Legal Metrology (Packaged Commodities) compliance for all six 1-Litre liquid cleaning products.
              </p>
            </div>

            {/* Label Side View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 self-start md:self-auto">
              <button
                onClick={() => setLabelSide('both')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  labelSide === 'both' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Front & Back
              </button>
              <button
                onClick={() => setLabelSide('front')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  labelSide === 'front' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Front Only
              </button>
              <button
                onClick={() => setLabelSide('back')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  labelSide === 'back' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Back Only
              </button>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-2">
            {VEDHA_PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  selectedProductId === p.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-200/60 border border-stone-200'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: p.accentColor }}
                ></span>
                <span>{p.name}</span>
                <span className="text-[10px] opacity-70">1L</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Spec Overview Strip */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-stone-400 font-semibold uppercase text-[10px]">Selected SKU</div>
            <div className="text-stone-900 font-bold text-sm mt-0.5">{product.name} (1 Litre)</div>
          </div>
          <div>
            <div className="text-stone-400 font-semibold uppercase text-[10px]">Category & Sustainability</div>
            <div className="text-stone-800 font-medium mt-0.5">
              {product.categoryLabel} · {product.isPlantBased ? 'Verified Plant-Based' : 'Standard Formula'}
            </div>
          </div>
          <div>
            <div className="text-stone-400 font-semibold uppercase text-[10px]">Color Palette & Pantone</div>
            <div className="text-stone-800 font-medium mt-0.5 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded" style={{ backgroundColor: product.accentColor }}></span>
              <span>{product.labelSpec.pantoneApprox}</span>
            </div>
          </div>
          <div>
            <div className="text-stone-400 font-semibold uppercase text-[10px]">Container Compatibility</div>
            <div className="text-stone-800 font-medium mt-0.5">1L HDPE / PET Cylindrical Bottle</div>
          </div>
        </div>

        {/* Label Visual Mockup Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Label Panels */}
          <div className={`${labelSide === 'both' ? 'lg:col-span-8' : 'lg:col-span-8'} space-y-6`}>
            <div className={`grid grid-cols-1 ${labelSide === 'both' ? 'md:grid-cols-2' : 'max-w-md mx-auto'} gap-6`}>
              {/* FRONT LABEL */}
              {(labelSide === 'both' || labelSide === 'front') && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500 text-center">
                    Front Label Specification (100mm × 140mm)
                  </div>
                  <div
                    className="bg-white rounded-2xl border-2 shadow-md p-6 flex flex-col justify-between aspect-[1/1.4] transition-all"
                    style={{ borderColor: product.accentColor }}
                  >
                    {/* Front Header */}
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-black tracking-widest text-stone-900 font-display">
                        VEDHA
                      </div>
                      <div className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold">
                        PURE CLEANING SOLUTIONS
                      </div>
                    </div>

                    {/* Front Center Identity */}
                    <div className="text-center space-y-2 py-4">
                      {product.isPlantBased && product.isBiodegradable ? (
                        <div
                          className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${product.accentColor}15`, color: product.accentColor }}
                        >
                          100% Biodegradable & Plant-Derived
                        </div>
                      ) : (
                        <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                          High-Efficiency Active Formula
                        </div>
                      )}

                      <h2 className="text-xl font-black text-stone-900 font-display uppercase tracking-tight">
                        {product.name}
                      </h2>

                      <p className="text-[11px] text-stone-500 font-medium leading-tight max-w-[220px] mx-auto">
                        {product.heroBenefit}
                      </p>

                      {/* Icon Features */}
                      <div className="pt-3 grid grid-cols-2 gap-1.5 text-left text-[9px] text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-200/60">
                        {product.labelSpec.iconFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1 font-medium">
                            <Check className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Front Bottom Callout */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[9px] text-stone-400 uppercase font-semibold">Net Quantity</div>
                        <div className="text-sm font-black text-stone-900 font-mono">1 LITRE</div>
                      </div>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: product.accentColor }}
                        title="Category Color Accent"
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* BACK LABEL */}
              {(labelSide === 'both' || labelSide === 'back') && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500 text-center">
                    Back Label (Statutory & Directions, 100mm × 140mm)
                  </div>
                  <div className="bg-stone-50 rounded-2xl border border-stone-300 shadow-md p-5 flex flex-col justify-between aspect-[1/1.4] text-[9px] text-stone-700 space-y-2 leading-tight">
                    {/* Title & Directions */}
                    <div>
                      <div className="font-bold text-stone-900 text-[11px] border-b border-stone-200 pb-1 flex justify-between">
                        <span>DIRECTIONS FOR USE</span>
                        <span className="font-mono text-stone-500 text-[9px]">1000 ml</span>
                      </div>
                      <p className="text-stone-600 mt-1 line-clamp-3">
                        {product.directionsForUse[0]}
                      </p>
                      <div className="mt-1 p-1 bg-white rounded border border-stone-200 text-stone-800 font-mono">
                        <strong>DILUTION:</strong> {product.dilutionRatio}
                      </div>
                    </div>

                    {/* Composition & Safety */}
                    <div className="border-t border-stone-200 pt-1.5 space-y-1">
                      <div>
                        <strong className="text-stone-900">COMPOSITION:</strong> {product.compositionNotes}
                      </div>
                      <div>
                        <strong className="text-stone-900">PRECAUTIONS:</strong> {product.safetyInstructions[0]} Keep away from eyes.
                      </div>
                      <div>
                        <strong className="text-stone-900">STORAGE:</strong> {product.storageInstructions}
                      </div>
                    </div>

                    {/* Mandatory Indian Legal Metrology Grid */}
                    <div className="border-t border-stone-200 pt-1.5 bg-white p-2 rounded border border-stone-200 space-y-0.5 text-[8.5px]">
                      <div className="font-bold text-stone-900 uppercase text-[8px] text-center pb-0.5 border-b border-stone-100">
                        Statutory Declarations (India)
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Commodity:</span>
                        <span className="font-semibold text-stone-800">{product.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Net Quantity:</span>
                        <span className="font-bold text-stone-900">1 Litre (1000 ml)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">MRP (Incl. of all taxes):</span>
                        <span className="font-bold font-mono">₹{product.mrp}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Mfd & Packed by:</span>
                        <span className="truncate max-w-[120px]">Vedha Consumer Solutions</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Customer Care:</span>
                        <span className="text-emerald-800 font-medium">info@vedha.ind.in</span>
                      </div>
                      <div className="flex justify-between text-[8px] text-stone-400 pt-0.5 border-t border-stone-100">
                        <span>Batch: [INKJET AREA]</span>
                        <span>Mfg: [MM/YYYY]</span>
                        <span>Best Before: 24M</span>
                      </div>
                    </div>

                    {/* Barcode & Eco Symbol */}
                    <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-[8px] text-stone-400">
                      <span>Made in India</span>
                      <div className="font-mono text-[9px] tracking-widest text-stone-800 font-bold">
                        ||||| |||| |||| ||||
                      </div>
                      <span>HDPE 2 (Recyclable)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Compliance Audit & Checklist */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-stone-900 font-bold font-display text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Statutory Compliance Checklist</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Under the <em>Legal Metrology (Packaged Commodities) Rules, 2011</em> (India), every 1-Litre retail package must declare:
              </p>

              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Generic Name of Commodity:</strong> Explicit on front & back.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Net Quantity (1 Litre):</strong> Font size at least 4mm height for standard 1L bottles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>MRP declaration:</strong> Inclusive of all taxes format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Customer Care Email:</strong> info@vedha.ind.in declared with contact person.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Month & Year of Manufacture:</strong> Pre-allocated blank box for high-speed online inkjet printing.</span>
                </li>
              </ul>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Information to Confirm with Client</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  1. Official registered factory address in Bengaluru / Attibele.<br />
                  2. Consumer Care helpline phone number.<br />
                  3. Exact physical bottle dimensions (height & circumference) to finalize label cut dies.
                </p>
              </div>
            </div>

            {/* Print Tech Specifications */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs text-xs text-stone-600">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Printer className="w-4 h-4 text-stone-700" />
                <span>Printing Technical Guidelines</span>
              </div>
              <div>
                <strong>Material:</strong> 60 Micron Synthetic PP / BOPP Film (Water & Chemical Resistant)
              </div>
              <div>
                <strong>Lamination:</strong> Matte Thermal Lamination with Spot UV on Vedha wordmark
              </div>
              <div>
                <strong>Adhesive:</strong> Permanent Acrylic Emulsion (prevents peeling in wet bathrooms or oily garage environments)
              </div>
              <div>
                <strong>Ink:</strong> UV Flexo Printing, lightfast inks
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
