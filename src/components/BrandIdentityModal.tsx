import React, { useState } from 'react';
import { Palette, Copy, Check, Eye, Download, ShieldCheck, Layers } from 'lucide-react';
import vedhaLogoImg from '../assets/images/live_vedha_logo.png';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandIdentityModal({ isOpen, onClose }: BrandIdentityModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyHex = (hex: string, key: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const COLOR_TOKENS = [
    { name: 'Botanical Emerald', hex: '#059669', role: 'Primary Home Care / Sustainability', class: 'bg-emerald-600' },
    { name: 'Deep Forest', hex: '#064e3b', role: 'Home Care Text & Accent Shadows', class: 'bg-emerald-900' },
    { name: 'Precision Sky', hex: '#0284c7', role: 'Primary Automobile Care division', class: 'bg-sky-600' },
    { name: 'Automotive Slate', hex: '#0f172a', role: 'Auto Care Backgrounds & Headers', class: 'bg-slate-900' },
    { name: 'Warm Off-White', hex: '#fafaf9', role: 'Primary Canvas Background', class: 'bg-[#fafaf9] border border-stone-300' },
    { name: 'Pure Carbon', hex: '#1c1917', role: 'Primary Typography & Headings', class: 'bg-stone-900' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>Brand Guidelines & Assets</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
              VEDHA Brand Identity System
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Brand Narrative & Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div>
            <span className="font-bold text-stone-900">Strict Orthography: </span>
            <p className="mt-0.5">
              Always capitalize as <strong>VEDHA</strong> (never Veda, Vedha’s, or lower-case in headings).
            </p>
          </div>
          <div>
            <span className="font-bold text-stone-900">Official Brand Tagline: </span>
            <p className="mt-0.5 italic">
              "Care for every space. Care for every drive."
            </p>
          </div>
        </div>

        {/* Logo Marks Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Vector Identity Variations & Lockups
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Official Live Site Wordmark & Emblem */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
              <img
                src={vedhaLogoImg}
                alt="VEDHA Official Logo"
                className="max-h-12 object-contain"
              />
              <span className="text-[10px] font-mono text-stone-400">Official Production Emblem</span>
            </div>

            {/* 2. Geometric V Monogram (Light) */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white flex flex-col items-center justify-center gap-2 text-center min-h-[140px]">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <polygon points="50,15 85,80 65,80 50,50 35,80 15,80" fill="#059669" />
                <circle cx="50" cy="32" r="6" fill="#0284c7" />
              </svg>
              <div className="font-display font-bold text-stone-900 tracking-widest text-sm">VEDHA</div>
              <span className="text-[10px] font-mono text-stone-400">Botanical + Auto Synergy Mark</span>
            </div>

            {/* 3. Dark Theme Lockup */}
            <div className="p-4 rounded-xl border border-stone-800 bg-stone-900 flex flex-col items-center justify-center gap-2 text-center min-h-[140px]">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <polygon points="50,15 85,80 65,80 50,50 35,80 15,80" fill="#34d399" />
                <circle cx="50" cy="32" r="6" fill="#38bdf8" />
              </svg>
              <div className="font-display font-bold text-white tracking-widest text-sm">VEDHA</div>
              <span className="text-[10px] font-mono text-stone-400">Automotive Dark Studio Mode</span>
            </div>
          </div>
        </div>

        {/* Color Palette Tokens */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Brand Color Token Palette
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COLOR_TOKENS.map((c) => (
              <div key={c.hex} className="p-3 rounded-xl border border-stone-200 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md ${c.class}`} />
                  <div>
                    <div className="text-xs font-bold text-stone-900">{c.name}</div>
                    <div className="text-[10px] font-mono text-stone-500">{c.hex}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                  <span className="text-[10px] text-stone-500 truncate mr-2">{c.role}</span>
                  <button
                    onClick={() => copyHex(c.hex, c.hex)}
                    className="p-1 rounded text-stone-400 hover:text-stone-700 transition-colors cursor-pointer shrink-0"
                    title="Copy HEX"
                  >
                    {copiedKey === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white font-semibold text-xs rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
