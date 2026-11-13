import React, { useState } from 'react';
import { BookOpen, Sparkles, Droplets, ShieldCheck, Car, HelpCircle, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  category: 'Home Care' | 'Automobile Care' | 'Science & Dilution';
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaway: string;
}

const ARTICLES: Article[] = [
  {
    id: 'hard-water-dishwashing',
    category: 'Home Care',
    title: 'Solving Indian Hard-Water Grease: Why Plant-Derived Lime Surfactants Work',
    readTime: '3 min read',
    summary: 'Most tap water across Bengaluru and urban India contains high dissolved calcium and magnesium. Learn how concentrated citric and coconut-derived surfactants lift dried masala without cloudy glass films.',
    content: [
      'Indian cooking frequently utilizes mustard oil, ghee, and coconut oils that polymerize upon heating into tenacious surface residues.',
      'When conventional synthetic dish soaps interact with hard water, the calcium ions bind to the soap molecules, forming insoluble soap scum that leaves water spots on stainless steel and glassware.',
      'Vedha Dishwashing Liquid uses plant-derived non-ionic surfactants combined with real lime extracts. Because non-ionic surfactants carry no ionic charge, hard water minerals cannot bind to them, preserving 100% active grease-cutting power.',
      'A mere 5 ml diluted in 40 ml warm water creates dense micro-emulsification bubbles that dissolve oil films effortlessly.'
    ],
    keyTakeaway: 'Non-ionic plant surfactants cut oil 3x more effectively in hard water than salt-thickened detergents.'
  },
  {
    id: 'two-bucket-wash-guide',
    category: 'Automobile Care',
    title: 'The Two-Bucket Car Wash Protocol: Eliminating Swirl Marks Forever',
    readTime: '4 min read',
    summary: '90% of spider-web scratches and clear coat dulling occur during manual sponge washing. Master the two-bucket grit guard technique using pH-neutral car shampoo.',
    content: [
      'Road dust consists of fine silica quartz particles with Mohs hardness exceeding 7—harder than your car’s clear coat.',
      'Washing with a single bucket repeatedly transfers trapped grit back onto the vehicle surface, abrading the paint like fine sandpaper.',
      'Protocol: Bucket 1 contains soapy water (30 ml Vedha Car Shampoo in 10L water). Bucket 2 contains pure rinse water with a Grit Guard insert at the base.',
      'Dip your microfiber wash mitt into Bucket 1, wash one vehicle panel in straight overlapping lines (never circular swirls), then agitate the mitt in Bucket 2 against the grit guard before recharging.'
    ],
    keyTakeaway: 'pH 7 neutral lubricity preserves ceramic coatings and PPF films while grit guards trap paint-scratching silica particles at the bottom.'
  },
  {
    id: 'snow-foam-canon-ratio',
    category: 'Automobile Care',
    title: 'Pressure Washer Foam Lance Ratios: 1:9 Dilution for Shaving-Cream Snow',
    readTime: '3 min read',
    summary: 'How to dial in your foam cannon nozzle and concentration for touchless pre-wash dirt encapsulation.',
    content: [
      'Touchless pre-washing is the critical first stage of automotive detailing that removes up to 80% of loose grit before your wash mitt ever touches paint.',
      'Vedha Car Foam Wash Concentrate is engineered for pressure washer foam cannons operating between 110 and 150 bar.',
      'Mix 100 ml of concentrate with 900 ml of warm water in your 1-Litre foam cannon reservoir. Adjust the top dial to clockwise maximum for maximum aerated density.',
      'Spray from bottom to top so the foam dwells on panels without sliding off prematurely. Allow 4 to 5 minutes of dwell time before pressure rinsing thoroughly.'
    ],
    keyTakeaway: 'Spray bottom-to-top to maximize foam dwell time and dissolve road film without mechanical scrubbing.'
  },
  {
    id: 'biodegradable-surfactant-science',
    category: 'Science & Dilution',
    title: 'What Does 100% Biodegradable Really Mean? Greenwashing vs True Science',
    readTime: '4 min read',
    summary: 'Understand the biochemical difference between OECD 301B ready biodegradability and deceptive marketing claims in household cleaning liquids.',
    content: [
      'Many commercial cleaners market themselves as "eco-friendly" simply because their plastic packaging is recyclable, even while their internal liquids contain non-degradable petrochemicals like LAS, phosphates, and synthetic optical brighteners.',
      'True biodegradability means the organic cleaning surfactants are consumed by naturally occurring soil bacteria within 28 days, converting into water, CO2, and biomass.',
      'At Vedha, we strictly classify only 3 products as verified plant-based and biodegradable: Dishwashing Liquid, Floor Cleaner, and Hand Wash.',
      'We intentionally avoid greenwashing our Liquid Detergent or Auto Care formulations because their synthetic polymers do not meet OECD 301 ready biodegradation standards.'
    ],
    keyTakeaway: 'Vedha only applies plant-based and biodegradable claims to verified formulations—no greenwashing.'
  }
];

export function KnowledgeCentre() {
  const [activeArticleId, setActiveArticleId] = useState<string>(ARTICLES[0].id);

  const activeArticle = ARTICLES.find((a) => a.id === activeArticleId) || ARTICLES[0];

  return (
    <section id="knowledge-centre" className="bg-[#f5f5f7] py-20 px-4 sm:px-6 lg:px-8 border-b border-black/[0.06] scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-emerald-800">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cleaning Science &amp; Protocols</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-[#1d1d1f] tracking-[-0.03em] leading-tight">
              Vedha Knowledge Centre
            </h2>
            <p className="text-sm text-[#86868b] max-w-2xl font-normal leading-relaxed">
              Professional dilution science, automotive detailing protocols, and ingredient transparency for modern households.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article List / Nav */}
          <div className="lg:col-span-4 space-y-3">
            {ARTICLES.map((art) => {
              const isSelected = art.id === activeArticleId;
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => setActiveArticleId(art.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 ease-apple cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-white border-black/[0.12] shadow-apple-card ring-1 ring-black/5'
                      : 'bg-white/70 border-black/[0.04] hover:bg-white hover:border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-semibold text-emerald-800 uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-[#86868b]">{art.readTime}</span>
                  </div>
                  <h3 className="text-xs font-semibold text-[#1d1d1f] leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-[11px] text-[#86868b] line-clamp-2">
                    {art.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Article Viewer */}
          <div className="lg:col-span-8 p-6 sm:p-9 rounded-3xl bg-white border border-black/[0.06] shadow-apple-card space-y-6">
            <div className="space-y-3 border-b border-black/[0.06] pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  {activeArticle.category}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-[#86868b] font-mono">{activeArticle.readTime}</span>
              </div>
              <h3 className="text-2xl font-semibold font-display text-[#1d1d1f] tracking-tight leading-tight">
                {activeArticle.title}
              </h3>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[#1d1d1f]/80 leading-relaxed font-normal">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaway Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-950 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Vedha Formulation Principle: </span>
                <span>{activeArticle.keyTakeaway}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
