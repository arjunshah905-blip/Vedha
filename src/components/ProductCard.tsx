import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { Leaf, Eye, Droplet, Plus, ShoppingBag, Check, Heart, ImageOff, Zap, ShieldCheck } from 'lucide-react';
import { generateProductAltText, generateProductLqip, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectBuy?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onDirectBuy,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [isPopping, setIsPopping] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  // Layout stability & LQIP image loading states
  const imgRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const availableSizes = product.availableSizes || [
    { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: product.mrp, estPrice: product.estPrice },
    { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: product.mrp * 4.5, estPrice: Math.round(product.estPrice * 4.2), savingsPercent: 24 }
  ];
  const activeSize = availableSizes[selectedSizeIndex] || availableSizes[0];

  // Dynamic Low-Quality Image Placeholder (LQIP)
  const lqipUri = useMemo(() => {
    const isBulk = activeSize.size === '5 Litres';
    return generateProductLqip(product.accentColor, product.secondaryColor, isBulk);
  }, [product.accentColor, product.secondaryColor, activeSize.size]);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setIsImageLoaded(true);
      setImageError(false);
    } else {
      setIsImageLoaded(false);
      setImageError(false);
    }
  }, [product.id, product.image]);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopping(true);
    setIsAdded(true);
    onAddToCart({
      ...product,
      packSize: activeSize.size,
      mrp: activeSize.mrp,
      estPrice: activeSize.estPrice,
    });

    setTimeout(() => {
      setIsPopping(false);
    }, 400);

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const handleDirectBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDirectBuy) {
      onDirectBuy({
        ...product,
        packSize: activeSize.size,
        mrp: activeSize.mrp,
        estPrice: activeSize.estPrice,
      });
    } else {
      onAddToCart(product);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-white rounded-3xl border border-black/[0.06] overflow-hidden hover:border-black/[0.12] shadow-apple-card hover:shadow-apple-hover transition-all duration-500 ease-apple flex flex-col h-full transform-gpu relative ${
        isPopping
          ? 'scale-[1.02] -translate-y-1 ring-2 ring-emerald-500/30'
          : 'scale-100 translate-y-0'
      }`}
    >
      {/* Product Image Stage */}
      <div
        onClick={() => onSelect(product)}
        className="relative isolate bg-[#f5f5f7] aspect-[4/3] w-[calc(100%-1.25rem)] m-2.5 rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center p-4 border border-black/[0.03] select-none"
      >
        {/* Low-Quality Image Placeholder (LQIP) Layer */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none transition-opacity duration-500 ease-out ${
            isImageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src={lqipUri}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-105 filter blur-xs"
            width="400"
            height="300"
          />
        </div>

        {/* High-Resolution Main Product Image */}
        {!imageError ? (
          <img
            ref={imgRef}
            src={product.image}
            alt={generateProductAltText(product.name, activeSize.size, activeSize.size === '5 Litres' ? 'bulk' : 'bottle')}
            decoding="async"
            referrerPolicy="no-referrer"
            width="400"
            height="300"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`relative z-10 w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS} transition-all duration-700 ease-apple group-hover:scale-105 ${
              isImageLoaded
                ? 'opacity-100 scale-100 blur-0'
                : 'opacity-0 scale-95 blur-xs'
            }`}
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 text-stone-400 p-4 text-center">
            <ImageOff className="w-8 h-8 text-stone-300" />
            <span className="text-[11px] font-medium text-stone-600 line-clamp-1">{product.name}</span>
          </div>
        )}

        {/* Dynamic Pack Size Tag */}
        <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full shadow-2xs border border-black/[0.06] uppercase">
          {activeSize.label}
        </div>

        {/* Wishlist Heart Toggle */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full transition-all duration-300 active:scale-75 cursor-pointer shadow-2xs flex items-center justify-center border ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border-rose-200 scale-105'
                : 'bg-white/90 text-stone-400 hover:text-stone-700 border-black/[0.06] hover:bg-white'
            }`}
            title={isWishlisted ? 'Remove from Saved' : 'Save for Later'}
            aria-label={isWishlisted ? `Remove ${product.name} from Saved` : `Save ${product.name} for Later`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-600' : ''}`} />
          </button>
        )}

        {/* Verified Plant-based indicator */}
        {product.isPlantBased && product.isBiodegradable && (
          <div className="absolute top-3 right-3 z-20 bg-emerald-50/90 backdrop-blur-md text-emerald-800 border border-emerald-200/80 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Leaf className="w-3 h-3 text-emerald-600" />
            <span>Plant-Based</span>
          </div>
        )}

        {/* Active Home Hygiene indicator (Standard non-plant-based Home Care) */}
        {product.category === 'home-care' && !(product.isPlantBased && product.isBiodegradable) && (
          <div className="absolute top-3 right-3 z-20 bg-amber-50/90 backdrop-blur-md text-amber-800 border border-amber-200/80 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            <span>Active Hygiene</span>
          </div>
        )}

        {/* Automobile Care indicator */}
        {product.category === 'automobile-care' && (
          <div className="absolute top-3 right-3 z-20 bg-sky-50/90 backdrop-blur-md text-sky-800 border border-sky-200/80 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Droplet className="w-3 h-3 text-sky-600" />
            <span>Auto Detailing</span>
          </div>
        )}

        {/* Floating Apple-Style Quick Buy Trigger on Hover */}
        <AnimatePresence>
          {isHovered && onDirectBuy && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleDirectBuyClick}
              className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-stone-900/90 hover:bg-black text-white text-xs font-medium backdrop-blur-md shadow-apple-card flex items-center gap-1.5 cursor-pointer whitespace-nowrap border border-white/20 transition-colors"
              aria-label={`Quick Buy ${product.name}`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Quick Buy · ₹{activeSize.estPrice}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Card Content */}
      <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata & Apple-style Segmented Size Switcher */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs text-[#86868b] font-medium">
              {product.categoryLabel}
            </span>

            {/* Apple-style Segmented Size Toggle */}
            <div className="flex items-center p-0.5 bg-stone-100 rounded-full border border-black/[0.04]">
              {availableSizes.map((sz, idx) => (
                <button
                  key={sz.size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSizeIndex(idx);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ease-apple cursor-pointer ${
                    selectedSizeIndex === idx
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  aria-label={`Select ${sz.size}`}
                >
                  {sz.size === '1 Litre' ? '1L' : '5L Bulk'}
                </button>
              ))}
            </div>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="text-lg font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors cursor-pointer font-display leading-tight"
          >
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-[#86868b] line-clamp-2 leading-relaxed">
            {product.heroBenefit}
          </p>

          <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
            <span className="font-medium text-stone-700">Dilution:</span>
            <span className="truncate">{product.dilutionRatio}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-5 pt-3.5 border-t border-black/[0.04] flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-[#86868b] font-medium flex items-center gap-1.5">
              <span>MRP ₹{activeSize.mrp}</span>
              {activeSize.savingsPercent && (
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                  Save {activeSize.savingsPercent}%
                </span>
              )}
            </div>
            <div className="text-base font-semibold text-[#1d1d1f] font-mono tabular-nums tracking-tight">
              ₹{activeSize.estPrice} <span className="text-xs text-[#86868b] font-normal">/ {activeSize.size}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelect(product)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-600 transition-colors cursor-pointer flex items-center justify-center active:scale-90"
              title="View full specs"
              aria-label="View specifications"
            >
              <Eye className="w-4 h-4" />
            </button>

            <motion.button
              type="button"
              onClick={handleAddToCartClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.88 }}
              animate={
                isPopping
                  ? { scale: [1, 1.24, 0.95, 1] }
                  : { scale: 1 }
              }
              transition={{
                duration: 0.36,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`w-8 h-8 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                isAdded
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/25'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
              title={isAdded ? 'Added to Cart' : 'Add to Cart'}
              aria-label={isAdded ? 'Added to cart' : 'Add to cart'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isAdded ? (
                  <motion.span
                    key="added-check"
                    initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Check className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="add-plus"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleDirectBuyClick}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-black rounded-full cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
