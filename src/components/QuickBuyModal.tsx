import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Zap, Truck, Check } from 'lucide-react';
import { Product } from '../types';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface QuickBuyModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (product: Product, quantity: number) => void;
}

export const QuickBuyModal: React.FC<QuickBuyModalProps> = ({
  product,
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setSelectedSizeIndex(0);
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const availableSizes = product.availableSizes || [
    { size: '1 Litre', label: '1L Bottle', volumeMl: 1000, mrp: product.mrp, estPrice: product.estPrice },
    { size: '5 Litres', label: '5L Bulk Can', volumeMl: 5000, mrp: product.mrp * 4.5, estPrice: Math.round(product.estPrice * 4.2), savingsPercent: 24 }
  ];
  const activeSize = availableSizes[selectedSizeIndex] || availableSizes[0];

  const totalPrice = activeSize.estPrice * quantity;
  const totalMrp = activeSize.mrp * quantity;
  const savings = totalMrp - totalPrice;

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 24));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToCheckout({
      ...product,
      packSize: activeSize.size,
      mrp: activeSize.mrp,
      estPrice: activeSize.estPrice,
    }, quantity);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full border border-black/[0.08] shadow-2xl p-6 sm:p-7 space-y-5 relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900">
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Instant Direct Checkout</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer active:scale-90"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Quick Snapshot & Size Pills */}
        <div className="space-y-3.5 bg-stone-50 p-4 rounded-2xl border border-black/[0.04]">
          <div className="flex items-center gap-4">
            <div className="isolate w-16 h-16 rounded-xl bg-[#f5f5f7] border border-black/[0.06] p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src={product.image}
                alt={generateProductAltText(product.name, activeSize.size, activeSize.size === '5 Litres' ? 'bulk' : 'bottle')}
                className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#1d1d1f] truncate font-display">
                {product.name}
              </div>
              <div className="text-xs text-[#86868b] font-mono mt-0.5">
                {activeSize.size} · ₹{activeSize.estPrice} / unit
              </div>
              {product.isPlantBased && (
                <div className="text-[10px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Verified Plant-Based &amp; Biodegradable</span>
                </div>
              )}
            </div>
          </div>

          {/* Apple-style Segmented Size Switcher */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/[0.04]">
            {availableSizes.map((sz, idx) => (
              <button
                key={sz.size}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                className={`py-2 px-3 rounded-full text-xs font-medium transition-all duration-300 ease-apple cursor-pointer border flex items-center justify-between ${
                  selectedSizeIndex === idx
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-black/[0.06] hover:bg-stone-100'
                }`}
              >
                <span>{sz.label}</span>
                <span className="font-mono font-semibold">₹{sz.estPrice}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stepper & Price Summary */}
        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-black/[0.04]">
          <div className="text-xs text-[#86868b] font-medium">Quantity:</div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-black/[0.06]">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer active:scale-90"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono font-semibold text-xs text-[#1d1d1f]">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer active:scale-90"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total Price Bar */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div>
            <div className="text-[10px] text-[#86868b]">MRP ₹{totalMrp} · Save ₹{savings}</div>
            <div className="text-xl font-semibold font-mono text-[#1d1d1f]">₹{totalPrice}</div>
          </div>
          <div className="text-[11px] text-[#86868b] flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fast Express Dispatch</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleCheckoutSubmit}
            className="w-full py-3 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Proceed to Buy Online (₹{totalPrice})</span>
          </motion.button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
