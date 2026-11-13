import React, { useState } from 'react';
import { CartItem, LastOrderCalculations } from '../types';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, RotateCcw, Plus, Minus } from 'lucide-react';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, packSize?: string) => void;
  onRemoveItem: (productId: string, packSize?: string) => void;
  onClearCart: () => void;
  onOpenCheckout?: () => void;
  lastOrderCalculations?: LastOrderCalculations | null;
  onQuickReorder?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
  lastOrderCalculations,
  onQuickReorder
}) => {
  const [customerName, setCustomerName] = useState('');
  const [pinCode, setPinCode] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + (item.product.estPrice * item.quantity), 0);
  const totalMrp = items.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
  const totalSavings = totalMrp - totalAmount;

  const buildWhatsAppOrderHref = () => {
    let message = `*NEW ORDER: VEDHA CLEANING CARE*\n\n`;
    if (customerName) message += `Customer Name: ${customerName}\n`;
    if (pinCode) message += `Delivery PIN Code: ${pinCode}\n`;
    message += `\n*Selected Items:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (${item.product.packSize || '1 Litre'}) — Qty: ${item.quantity} (₹${item.product.estPrice * item.quantity})\n`;
    });

    message += `\n*Estimated Total: ₹${totalAmount}* (Savings: ₹${totalSavings})\n`;
    message += `\nPlease confirm dispatch schedule and payment account.`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-md flex justify-end animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-400 ease-apple">
        {/* Apple-style Frosted Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#1d1d1f]" />
            <h2 className="text-base font-semibold text-[#1d1d1f] font-display">
              Review Bag
            </h2>
            <span className="text-xs bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-full font-mono tabular-nums">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer flex items-center justify-center active:scale-90"
            aria-label="Close bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="py-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="text-base font-semibold text-[#1d1d1f]">Your bag is empty</p>
                <p className="text-xs text-[#86868b] max-w-xs mx-auto">
                  Explore our verified 1-Litre and economical 5-Litre liquid cleaning care formulations.
                </p>
              </div>

              {/* 1-Click Quick Reorder Box for Last Order */}
              {lastOrderCalculations && onQuickReorder && (
                <div className="p-4 rounded-3xl border border-emerald-200/80 bg-emerald-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Repeat Previous Order</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono">
                      #{lastOrderCalculations.orderNumber}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600">
                    Instantly re-purchase {lastOrderCalculations.totalQuantity} items from your previous order at current catalogue rates:
                  </p>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {lastOrderCalculations.items.map((it) => (
                      <div
                        key={it.productId}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white border border-emerald-100 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="isolate w-8 h-8 rounded p-0.5 bg-[#f5f5f7] shrink-0 overflow-hidden flex items-center justify-center">
                            <img
                              src={it.image}
                              alt={it.productName}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-stone-900 truncate text-[11px]">
                              {it.productName}
                            </div>
                            <div className="text-[10px] text-stone-500">
                              Qty: {it.quantity} · {it.packSize}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-stone-900 shrink-0 text-xs">
                          ₹{it.itemTotal}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider">Total</div>
                      <div className="text-base font-semibold font-mono text-emerald-900">
                        ₹{lastOrderCalculations.calculatedTotal}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onQuickReorder}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>1-Click Reorder</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Optional Quick Reorder Banner above items */}
              {lastOrderCalculations && onQuickReorder && (
                <div className="p-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-1.5 text-stone-700 min-w-0">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">Repeat #{lastOrderCalculations.orderNumber} ({lastOrderCalculations.totalQuantity} items · ₹{lastOrderCalculations.calculatedTotal})</span>
                  </div>
                  <button
                    type="button"
                    onClick={onQuickReorder}
                    className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer shrink-0 ml-2"
                  >
                    + Add
                  </button>
                </div>
              )}

              {items.map((item) => {
                const packSize = item.product.packSize || '1 Litre';
                return (
                <div
                  key={`${item.product.id}-${packSize}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-black/[0.06] bg-stone-50/70"
                >
                  <div className="isolate w-14 h-14 rounded-xl bg-[#f5f5f7] p-1 border border-black/[0.04] shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={generateProductAltText(item.product.name, packSize, 'thumbnail')}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1d1d1f] truncate">
                      {item.product.name}
                    </div>
                    <div className="text-[11px] text-[#86868b] font-mono">
                      {packSize} · ₹{item.product.estPrice}
                    </div>

                    {/* Apple-style circular stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1.5 bg-white p-0.5 rounded-full border border-black/[0.08]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), packSize)}
                          className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, packSize)}
                          className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, packSize)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-[#1d1d1f] font-mono tabular-nums">
                      ₹{item.product.estPrice * item.quantity}
                    </div>
                  </div>
                </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer & Apple-style Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-black/[0.06] bg-stone-50 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#86868b]">
                <span>Total MRP:</span>
                <span className="line-through font-mono">₹{totalMrp}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Savings:</span>
                <span className="font-mono">-₹{totalSavings}</span>
              </div>
              <div className="flex justify-between text-[#1d1d1f] font-semibold text-sm border-t border-black/[0.06] pt-2">
                <span>Subtotal:</span>
                <span className="font-mono text-base font-bold">₹{totalAmount}</span>
              </div>
            </div>

            {/* Direct Buy / Checkout Button */}
            {onOpenCheckout && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3 px-4 bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Check Out Online (₹{totalAmount})</span>
              </button>
            )}

            <a
              href={buildWhatsAppOrderHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-[#1d1d1f] font-medium text-xs rounded-full flex items-center justify-center gap-2 transition-colors border border-black/[0.08]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Order via WhatsApp Concierge</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#86868b]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct factory dispatch · Attibele, Bengaluru</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
