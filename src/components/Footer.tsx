import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Truck, Search, ArrowRight, MessageCircle, RotateCcw, PackagePlus } from 'lucide-react';
import { CartItem } from '../types';
import { buildBulkQuoteWhatsAppUrl } from '../utils/whatsappQuote';

interface FooterProps {
  onSelectTab?: (tab: 'store' | 'audit' | 'strategy' | 'wordpress' | 'packaging') => void;
  onOpenOrderTracking: (orderId?: string) => void;
  onOpenQuickReorder?: () => void;
  cartItems?: CartItem[];
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenOrderTracking, onOpenQuickReorder, cartItems = [] }) => {
  const [quickOrderId, setQuickOrderId] = useState('');

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickOrderId.trim()) {
      onOpenOrderTracking(quickOrderId.trim());
    } else {
      onOpenOrderTracking('VEDHA-1042');
    }
  };

  return (
    <footer className="bg-[#f5f5f7] text-[#86868b] pt-16 pb-12 border-t border-black/[0.08] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Apple-style Legal & Statutory Intro Note */}
        <div className="text-[11px] text-[#86868b] leading-relaxed border-b border-black/[0.06] pb-6 space-y-1.5">
          <p>
            1. All Vedha formulations are manufactured in compliance with the Legal Metrology (Packaged Commodities) Rules, 2011 (India). Standardized 1-Litre (1000 ml) and economical 5-Litre (5000 ml) high-density polyethylene packaging with tamper-evident induction heat seals.
          </p>
          <p>
            2. Verified Plant-Based &amp; Biodegradable claim applies specifically to our 4 certified botanical formulations: Vedha Dishwashing Liquid, Vedha Neem Liquid Detergent, Vedha Lavender Floor Cleaner, and Vedha Neem Fresh Hand Wash. Active commercial floor, toilet, and automobile care solutions utilize targeted synthetic surfactant matrices.
          </p>
        </div>

        {/* Apple-style Multi-column Navigation Directory */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          {/* Col 1: Brand & Factory (4 cols) */}
          <div className="md:col-span-4 space-y-3.5">
            <div className="text-base font-semibold text-[#1d1d1f] font-display">
              VEDHA
            </div>
            <p className="text-[#86868b] max-w-sm leading-relaxed text-[11px]">
              Precision liquid cleaning formulations for home and automotive care in standard 1-Litre and 5-Litre bulk packs. Formulated and packaged directly at Attibele, Bengaluru.
            </p>
            <div className="text-[11px] space-y-1 text-[#86868b]">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                <span>Vedha Consumer Solutions Pvt Ltd, Attibele, Bengaluru 562107</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>Consumer Care: info@vedha.ind.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Formulations (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-semibold text-[#1d1d1f] text-[11px] uppercase tracking-wider">
              Formulations &amp; Packs
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1d1d1f] transition-colors cursor-pointer text-left"
                >
                  All 1L &amp; 5L Formulations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('plant-based-spotlight')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left text-emerald-800 font-medium"
                >
                  Verified Plant-Based Line
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('auto-care-spotlight')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#0071e3] transition-colors cursor-pointer text-left"
                >
                  Automobile Detailing Range
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('bundles-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#1d1d1f] transition-colors cursor-pointer text-left"
                >
                  Curated Synergy Bundles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('dilution-calculator')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#1d1d1f] transition-colors cursor-pointer text-left"
                >
                  Dilution Ratio Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Tracking (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-semibold text-[#1d1d1f] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-700" />
              <span>Track &amp; Support</span>
            </div>
            
            <form onSubmit={handleQuickTrackSubmit} className="space-y-1.5 pt-0.5">
              <div className="flex rounded-full overflow-hidden border border-black/[0.1] bg-white focus-within:border-black/[0.25] shadow-2xs">
                <input
                  type="text"
                  placeholder="Order ID (e.g. VEDHA-1042)"
                  value={quickOrderId}
                  onChange={(e) => setQuickOrderId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-transparent text-[#1d1d1f] placeholder-stone-400 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-3 bg-stone-900 hover:bg-black text-white text-xs font-medium flex items-center justify-center cursor-pointer transition-colors"
                  title="Track order"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <ul className="space-y-2 text-[11px] pt-1">
              {onOpenQuickReorder && (
                <li>
                  <button
                    onClick={onOpenQuickReorder}
                    className="hover:text-emerald-800 transition-colors cursor-pointer text-left flex items-center gap-1.5 text-emerald-800 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Quick Reorder Dashboard</span>
                  </button>
                </li>
              )}
              <li className="pt-0.5">
                <a
                  href={buildBulkQuoteWhatsAppUrl({ cartItems })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-900 hover:bg-black text-white text-[11px] font-medium transition-colors shadow-2xs"
                  title="Send a wholesale inquiry on WhatsApp including your current cart items"
                >
                  <PackagePlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Request Bulk Quote
                    {cartItems.length > 0 ? ` (${cartItems.reduce((sum, i) => sum + i.quantity, 0)} in Bag)` : ''}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Vedha%20Customer%20Support,%20I%20need%20assistance%20with%20my%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1d1d1f] transition-colors inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp Care Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vedha.ind.in"
                  className="hover:text-[#1d1d1f] transition-colors"
                >
                  Email: info@vedha.ind.in
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality Standard (2 cols) */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-semibold text-[#1d1d1f] text-[11px] uppercase tracking-wider">
              Quality Assurance
            </div>
            <div className="space-y-2 text-[11px] text-[#86868b]">
              <div className="flex items-start gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Factory Direct Bottles</span>
              </div>
              <p>Tamper-evident seals on every bottle. Batch tested for surface and fiber safety.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#86868b] text-[11px]">
          <div>
            Copyright © {new Date().getFullYear()} Vedha Consumer Solutions Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenOrderTracking('VEDHA-1042')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Order Tracking
            </button>
            <span>·</span>
            <a href="https://vedha.ind.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d1d1f] transition-colors">
              Live Website: vedha.ind.in
            </a>
            <span>·</span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
