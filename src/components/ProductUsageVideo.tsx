import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  CheckCircle2,
  Sparkles,
  Droplets,
  Gauge,
  Clock,
  Shield,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface ProductUsageVideoProps {
  product: Product;
}

interface VideoStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  durationSec: number;
  proTip: string;
  metricLabel: string;
  metricValue: string;
  visualType: 'dilution' | 'pressure' | 'foam-spray' | 'dwell' | 'rinse' | 'mop' | 'lather' | 'soak';
}

const PRODUCT_VIDEO_SCRIPTS: Record<string, VideoStep[]> = {
  'car-foam-shampoo': [
    {
      stepNumber: 1,
      title: 'Precision Dilution in Foam Cannon (1:9)',
      subtitle: 'Pour 100 ml Vedha Car Foam Wash into a 1-Litre foam cannon bottle, top up with 900 ml warm water.',
      durationSec: 6,
      proTip: 'Using warm tap water accelerates active surfactant dissolution for 25% denser foam blankets.',
      metricLabel: 'Dilution Ratio',
      metricValue: '1:9 Concentrate',
      visualType: 'dilution'
    },
    {
      stepNumber: 2,
      title: 'Pressure Washer & Air Dial Calibration',
      subtitle: 'Connect cannon to pressure washer (110–150 bar). Turn top brass knob clockwise for maximum snow thickness.',
      durationSec: 6,
      proTip: 'Ensure operating pressure does not drop below 110 bar to maintain continuous air-liquid emulsification.',
      metricLabel: 'Working Pressure',
      metricValue: '110 – 150 BAR',
      visualType: 'pressure'
    },
    {
      stepNumber: 3,
      title: 'Dense Snow Foam Application (Bottom to Top)',
      subtitle: 'Coat the vehicle in a thick shaving-cream lather, sweeping horizontally from bottom rocker panels up to the roof.',
      durationSec: 7,
      proTip: 'Applying from bottom to top prevents foam from running down prematurely and ensures maximum dwell on heavy dirt.',
      metricLabel: 'Foam Consistency',
      metricValue: 'Hyper-Cling Snow',
      visualType: 'foam-spray'
    },
    {
      stepNumber: 4,
      title: 'Dwell & Encapsulation Soak (4–6 Mins)',
      subtitle: 'Allow foam to dwell undisturbed for 5 minutes. Watch the lather encapsulate and loosen stubborn road grit.',
      durationSec: 6,
      proTip: 'Never apply in direct scorching sunlight; do not let snow foam dry onto the clear coat.',
      metricLabel: 'Dwell Time',
      metricValue: '4–6 Minutes',
      visualType: 'dwell'
    },
    {
      stepNumber: 5,
      title: 'High-Pressure Touchless Rinse',
      subtitle: 'Pressure rinse thoroughly from bottom to top, followed by a final top-down sweep to clear all suspended grime.',
      durationSec: 6,
      proTip: '90% of abrasive surface grit is removed before your wash mitt ever touches the clear coat, preventing swirl marks.',
      metricLabel: 'Swirl Prevention',
      metricValue: '100% Touchless Lift',
      visualType: 'rinse'
    }
  ],
  'car-shampoo': [
    {
      stepNumber: 1,
      title: 'Two-Bucket Wash Preparation',
      subtitle: 'Add 25–30 ml Vedha Car Shampoo into 10 Litres of water in Bucket 1. Fill Bucket 2 with clean rinse water.',
      durationSec: 6,
      proTip: 'Use grit guards at the bottom of both buckets to trap abrasive dirt away from your wash mitt.',
      metricLabel: 'Bucket Dilution',
      metricValue: '1:400 Ratio',
      visualType: 'dilution'
    },
    {
      stepNumber: 2,
      title: 'High-Lubricity Contact Wash',
      subtitle: 'Glide clean microfiber wash mitt across panels in straight overlapping lines from roof downwards.',
      durationSec: 6,
      proTip: 'Never wash in circular motions. Straight passes eliminate swirl marks on dark clear coats.',
      metricLabel: 'Surface Lubricity',
      metricValue: 'pH 7.0 Neutral',
      visualType: 'lather'
    },
    {
      stepNumber: 3,
      title: 'Spot-Free Rinse & Microfiber Drying',
      subtitle: 'Rinse with gentle open water flow and dry immediately using a plush 1200 GSM drying towel.',
      durationSec: 6,
      proTip: 'Spot-free optical rinsing agents leave zero mineral haze or drying streaks.',
      metricLabel: 'Finish Gloss',
      metricValue: 'Deep Mirror Sheen',
      visualType: 'rinse'
    }
  ],
  'floor-cleaner': [
    {
      stepNumber: 1,
      title: 'Measure 1 Capful (20 ml)',
      subtitle: 'Add 1 capful of Vedha Herbal Floor Cleaner into half a bucket (4–5 Litres) of ambient tap water.',
      durationSec: 6,
      proTip: '1 bottle provides 50 entire home mopping sessions at just ~₹4.20 per wash.',
      metricLabel: 'Yield Capacity',
      metricValue: '50 Mopping Cycles',
      visualType: 'dilution'
    },
    {
      stepNumber: 2,
      title: 'Mopping & Surface Emulsification',
      subtitle: 'Wring mop damp and wipe across tiles, marble, granite, or wood flooring in smooth figure-8 motions.',
      durationSec: 6,
      proTip: 'Safe for barefoot toddlers and domestic pets immediately after drying.',
      metricLabel: 'Natural Hygiene',
      metricValue: '99.9% Plant-Active',
      visualType: 'mop'
    },
    {
      stepNumber: 3,
      title: 'Natural Gloss & Bug-Repellent Dwell',
      subtitle: 'Allow to air dry naturally. Zero rinsing required; releases continuous herbal pine and citronella aroma.',
      durationSec: 6,
      proTip: 'Essential oils naturally discourage indoor insects, ants, and flies.',
      metricLabel: 'Surface Residue',
      metricValue: 'Zero Sticky Residue',
      visualType: 'dwell'
    }
  ],
  'dishwashing-liquid': [
    {
      stepNumber: 1,
      title: '1 Teaspoon Dilution Bowl (5 ml)',
      subtitle: 'Dilute 1 teaspoon (5 ml) in 50 ml water. Dip scrubber to generate dense active plant-derived micro-lather.',
      durationSec: 6,
      proTip: 'A single 5ml dose cleans up to 25 plates and greasy cooking vessels.',
      metricLabel: 'Active Yield',
      metricValue: '200 Wash Bowls / 1L',
      visualType: 'dilution'
    },
    {
      stepNumber: 2,
      title: 'Stubborn Burnt Grease Spot Treatment',
      subtitle: 'For burnt kadhais or heavy oil pans, apply 2 drops undiluted directly onto the surface and rest 3 minutes.',
      durationSec: 6,
      proTip: 'Plant-derived surfactants break ester grease bonds without corrosive acids.',
      metricLabel: 'Grease Release',
      metricValue: 'Fast-Acting Enzyme',
      visualType: 'soak'
    },
    {
      stepNumber: 3,
      title: 'Crystal Clear Water Rinse',
      subtitle: 'Rinse under running water. Leaves utensils sparkling with zero chemical after-taste or detergent film.',
      durationSec: 6,
      proTip: '100% food-contact safe and certified safe for infant feeding bottles.',
      metricLabel: 'Safety Standard',
      metricValue: 'Food-Contact Safe',
      visualType: 'rinse'
    }
  ],
  'hand-wash': [
    {
      stepNumber: 1,
      title: '250ml Dispenser Economical Refill',
      subtitle: 'Pour Vedha Hand Wash concentrate directly into your existing tabletop pump dispenser.',
      durationSec: 6,
      proTip: '1-Litre bulk refill bottle provides 4 full dispenser replenishments, cutting plastic waste by 75%.',
      metricLabel: 'Plastic Reduction',
      metricValue: '4x Refill Value',
      visualType: 'dilution'
    },
    {
      stepNumber: 2,
      title: '20-Second Botanical Micro-Lather',
      subtitle: 'Dispense one pump (1.5 ml) on wet hands and lather palms, knuckles, and fingernails for 20 seconds.',
      durationSec: 6,
      proTip: 'Enriched with vegetable glycerin to maintain natural lipid barrier during frequent hand hygiene.',
      metricLabel: 'Skin Balance',
      metricValue: 'pH 5.5 Derm Safe',
      visualType: 'lather'
    }
  ],
  'liquid-detergent': [
    {
      stepNumber: 1,
      title: 'Front & Top Load Drum Dosage',
      subtitle: 'Pour 40 ml (1 full cap) into machine drawer for normal 6–8 kg loads (or 60 ml for heavy soil).',
      durationSec: 6,
      proTip: 'Low-foaming enzyme formula prevents optical sensor errors in modern front-load washers.',
      metricLabel: 'Load Capacity',
      metricValue: '40 ml / Standard Load',
      visualType: 'dilution'
    },
    {
      stepNumber: 2,
      title: 'Deep Fiber Penetration & Color Lock',
      subtitle: 'Active polymers lift collar grease and food stains while locking dyes inside the textile weave.',
      durationSec: 6,
      proTip: 'Zero chalky residue means garments dry softer with a clean fresh linen fragrance.',
      metricLabel: 'Fiber Care',
      metricValue: 'Anti-Graying Shield',
      visualType: 'dwell'
    }
  ]
};

export const ProductUsageVideo: React.FC<ProductUsageVideoProps> = ({ product }) => {
  const resolvedId =
    product.id === 'car-wash-shampoo'
      ? 'car-foam-shampoo'
      : product.id === 'plant-based-liquid-hand-wash'
      ? 'hand-wash'
      : product.id === 'plant-based-liquid-detergent'
      ? 'liquid-detergent'
      : product.id === 'plant-based-floor-cleaner'
      ? 'floor-cleaner'
      : product.id;
  const script = PRODUCT_VIDEO_SCRIPTS[resolvedId] || PRODUCT_VIDEO_SCRIPTS[product.id] || PRODUCT_VIDEO_SCRIPTS['car-foam-shampoo'];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5>(1);
  const [stepProgress, setStepProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const currentStep = script[currentStepIndex];

  // Auto-advance step timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      const stepDurationMs = (currentStep.durationSec * 1000) / playbackSpeed;
      const tickIntervalMs = 50;
      const stepIncrement = (tickIntervalMs / stepDurationMs) * 100;

      interval = setInterval(() => {
        setStepProgress((prev) => {
          if (prev >= 100) {
            // Advance to next step or loop
            if (currentStepIndex < script.length - 1) {
              setCurrentStepIndex((curr) => curr + 1);
            } else {
              setCurrentStepIndex(0); // loop back
            }
            return 0;
          }
          return prev + stepIncrement;
        });
      }, tickIntervalMs);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, playbackSpeed, currentStep.durationSec, script.length]);

  const handleStepSelect = (index: number) => {
    setCurrentStepIndex(index);
    setStepProgress(0);
  };

  const handleNext = () => {
    if (currentStepIndex < script.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setStepProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setStepProgress(0);
    }
  };

  const handleReplay = () => {
    setCurrentStepIndex(0);
    setStepProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-4">
      {/* Video Studio Container */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 text-white shadow-xl aspect-video flex flex-col justify-between p-4 sm:p-6 group select-none">
        {/* Animated Background Canvas based on visualType */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {currentStep.visualType === 'foam-spray' && (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950">
              {/* Animated foam expansion visual */}
              <div className="absolute inset-0 opacity-25">
                <div
                  className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-sky-200/10 to-transparent transition-all duration-700"
                  style={{ transform: `scale(${1 + stepProgress * 0.005})` }}
                ></div>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-32 bg-white/20 blur-2xl rounded-full"></div>
            </div>
          )}

          {currentStep.visualType === 'pressure' && (
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/40 via-stone-950 to-stone-900">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-sky-500/20 rounded-full animate-pulse"></div>
            </div>
          )}

          {currentStep.visualType === 'dilution' && (
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-stone-950 to-stone-900">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
            </div>
          )}

          {currentStep.visualType === 'dwell' && (
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-stone-950 to-stone-900">
              <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-amber-500/10 blur-3xl rounded-full"></div>
            </div>
          )}

          {currentStep.visualType === 'rinse' && (
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 via-stone-950 to-stone-900">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent"></div>
            </div>
          )}
        </div>

        {/* Top Header Bar inside Video Canvas */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 font-mono">
              VEDHA MASTERCLASS REEL
            </span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-[10px] text-stone-300 font-medium">
              4K Simulation · 1-Litre Application
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono font-semibold">
              STEP {currentStep.stepNumber} OF {script.length}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-mono font-bold">
              {currentStep.metricValue}
            </span>
          </div>
        </div>

        {/* Center Animated Stage Visualization */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-2">
          {/* Animated Graphical Badge */}
          <div className="relative mb-3">
            {currentStep.visualType === 'dilution' && (
              <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-950/50">
                <Droplets className="w-8 h-8 animate-bounce duration-1000" />
              </div>
            )}
            {currentStep.visualType === 'pressure' && (
              <div className="w-16 h-16 rounded-2xl bg-sky-900/60 border border-sky-500/40 flex items-center justify-center text-sky-300 shadow-lg shadow-sky-950/50">
                <Gauge className="w-8 h-8 animate-spin duration-3000" />
              </div>
            )}
            {currentStep.visualType === 'foam-spray' && (
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-lg shadow-black/50">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
            )}
            {currentStep.visualType === 'dwell' && (
              <div className="w-16 h-16 rounded-2xl bg-amber-900/60 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-950/50">
                <Clock className="w-8 h-8" />
              </div>
            )}
            {currentStep.visualType === 'rinse' && (
              <div className="w-16 h-16 rounded-2xl bg-cyan-900/60 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-950/50">
                <Shield className="w-8 h-8" />
              </div>
            )}
            {(currentStep.visualType === 'mop' || currentStep.visualType === 'lather' || currentStep.visualType === 'soak') && (
              <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-950/50">
                <Layers className="w-8 h-8" />
              </div>
            )}
          </div>

          <h3 className="text-base sm:text-xl font-bold font-display text-white max-w-lg leading-snug">
            {currentStep.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed line-clamp-2">
            {currentStep.subtitle}
          </p>

          {/* Dynamic Closed Captions / Pro Tip Banner */}
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-emerald-300 max-w-lg flex items-center gap-2">
            <span className="font-bold text-white uppercase text-[9px] bg-emerald-700 px-1.5 py-0.2 rounded shrink-0">
              Pro Tip
            </span>
            <span className="truncate">{currentStep.proTip}</span>
          </div>
        </div>

        {/* Bottom Playback & Timeline Controls */}
        <div className="relative z-10 space-y-2 pt-2 border-t border-white/10">
          {/* Timeline Scrubber / Progress Bar */}
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden flex cursor-pointer">
            {script.map((s, idx) => (
              <div
                key={idx}
                onClick={() => handleStepSelect(idx)}
                className="flex-1 h-full border-r border-stone-900 relative"
              >
                <div
                  className={`h-full transition-all duration-100 ${
                    idx < currentStepIndex
                      ? 'bg-emerald-500 w-full'
                      : idx === currentStepIndex
                      ? 'bg-emerald-400'
                      : 'bg-transparent'
                  }`}
                  style={idx === currentStepIndex ? { width: `${stepProgress}%` } : undefined}
                ></div>
              </div>
            ))}
          </div>

          {/* Control Bar Actions */}
          <div className="flex items-center justify-between text-xs text-stone-300">
            {/* Left Controls: Play, Prev, Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="p-1 text-stone-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex === script.length - 1}
                className="p-1 text-stone-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReplay}
                className="p-1 text-stone-400 hover:text-white cursor-pointer"
                title="Replay from start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Controls: Speed & Step Indicators */}
            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : 1)}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-stone-300 font-mono font-semibold cursor-pointer"
                title="Toggle playback speed"
              >
                {playbackSpeed}x SPEED
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 text-stone-400 hover:text-white cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
        {script.map((step, idx) => (
          <button
            key={idx}
            onClick={() => handleStepSelect(idx)}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              idx === currentStepIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-1 ring-emerald-300 font-medium'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
              <span>STEP {step.stepNumber}</span>
              {idx === currentStepIndex && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              )}
            </div>
            <div className="font-bold text-[11px] truncate text-stone-900">
              {step.title.split('(')[0]}
            </div>
            <div className="text-[10px] text-stone-500 font-mono mt-0.5">
              {step.metricValue}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
