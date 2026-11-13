import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, X, ExternalLink, Calendar, Truck } from 'lucide-react';
import { VEDHA_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

export interface PastOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    packSize: string;
    image: string;
  }[];
  totalAmount: number;
  deliveryAddress: string;
}

export interface QuickReorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReorderItems: (items: { product: Product; quantity: number }[]) => void;
  onOpenTracking: (orderId: string) => void;
  onSelectOrderAsLast?: (order: PastOrder) => void;
}

export const MOCK_PAST_ORDERS: PastOrder[] = [
  {
    id: 'ord-1042',
    orderNumber: 'VEDHA-1042',
    date: '14 Oct 2026',
    status: 'Delivered',
    items: [
      {
        productId: 'dishwashing-liquid',
        productName: 'Vedha Dishwashing Liquid',
        quantity: 2,
        price: 199,
        packSize: '1 Litre',
        image: './assets/aistudio/dishwashing_bottle_isolated.jpg',
      },
      {
        productId: 'floor-cleaner',
        productName: 'Vedha Floor Cleaner',
        quantity: 1,
        price: 149,
        packSize: '1 Litre',
        image: './assets/aistudio/Leamo_floor_cleaner_Front_1L_8d4a72f1.jpeg',
      },
    ],
    totalAmount: 547,
    deliveryAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru - 560103',
  },
  {
    id: 'ord-2089',
    orderNumber: 'VEDHA-2089',
    date: '02 Nov 2026',
    status: 'Delivered',
    items: [
      {
        productId: 'car-wash-shampoo',
        productName: 'Vedha Car Foam Wash',
        quantity: 1,
        price: 449,
        packSize: '1 Litre',
        image: './assets/aistudio/Car_foam_wash_fornt_1L_05dfef92.jpeg',
      },
      {
        productId: 'car-shampoo',
        productName: 'Vedha Car Shampoo',
        quantity: 1,
        price: 379,
        packSize: '1 Litre',
        image: './assets/aistudio/Car_shampoo_front_1L_649220c1.jpeg',
      },
    ],
    totalAmount: 828,
    deliveryAddress: 'Villa 18, Palm Meadows, Whitefield, Bengaluru - 560066',
  },
  {
    id: 'ord-3011',
    orderNumber: 'VEDHA-3011',
    date: '28 Oct 2026',
    status: 'Delivered',
    items: [
      {
        productId: 'plant-based-liquid-hand-wash',
        productName: 'Vedha Hand Wash Refill',
        quantity: 3,
        price: 239,
        packSize: '1 Litre',
        image: './assets/aistudio/Plant_base_hand_wash_font_1L_493421d1.jpeg',
      },
      {
        productId: 'plant-based-liquid-detergent',
        productName: 'Vedha Liquid Detergent',
        quantity: 2,
        price: 299,
        packSize: '1 Litre',
        image: './assets/aistudio/1L_Detergent_front_image_7f0bfb1d.jpeg',
      },
    ],
    totalAmount: 1315,
    deliveryAddress: 'Apt 12B, Prestige Sanctuary, Attibele, Bengaluru - 562107',
  },
];

export const QuickReorderModal: React.FC<QuickReorderModalProps> = ({
  isOpen,
  onClose,
  onReorderItems,
  onOpenTracking,
  onSelectOrderAsLast,
}) => {
  const [reorderSuccessMsg, setReorderSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReorderOrder = (order: PastOrder) => {
    if (onSelectOrderAsLast) {
      onSelectOrderAsLast(order);
    }
    const itemsToAdd: { product: Product; quantity: number }[] = [];
    order.items.forEach((item) => {
      const matched = VEDHA_PRODUCTS.find((p) => p.id === item.productId);
      if (matched) {
        const matchedSize = matched.availableSizes?.find((s) => s.size === item.packSize);
        const variant = matchedSize
          ? { ...matched, packSize: matchedSize.size, mrp: matchedSize.mrp, estPrice: matchedSize.estPrice }
          : matched;
        itemsToAdd.push({ product: variant, quantity: item.quantity });
      }
    });

    if (itemsToAdd.length > 0) {
      onReorderItems(itemsToAdd);
      setReorderSuccessMsg(`Re-ordered ${itemsToAdd.length} items from ${order.orderNumber}! Items loaded into your checkout.`);
      setTimeout(() => {
        setReorderSuccessMsg(null);
        onClose();
      }, 1400);
    }
  };

  const handleReorderSingleProduct = (productId: string, quantity: number = 1, packSize: string = '1 Litre') => {
    const matched = VEDHA_PRODUCTS.find((p) => p.id === productId);
    if (matched) {
      const matchedSize = matched.availableSizes?.find((s) => s.size === packSize);
      const variant = matchedSize
        ? { ...matched, packSize: matchedSize.size, mrp: matchedSize.mrp, estPrice: matchedSize.estPrice }
        : matched;
      onReorderItems([{ product: variant, quantity }]);
      setReorderSuccessMsg(`Added ${matched.name} (${quantity} × ${variant.packSize || '1 Litre'}) to your checkout!`);
      setTimeout(() => {
        setReorderSuccessMsg(null);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-800">
                Customer Care & Replenishment
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                Quick Reorder Dashboard
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {reorderSuccessMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{reorderSuccessMsg}</span>
          </div>
        )}

        {/* Customer Profile Banner */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-stone-500 font-mono">Verified Customer: </span>
            <span className="font-bold text-stone-900">Dr. Rajeshwari K. (Bengaluru)</span>
            <span className="text-stone-400 mx-2">·</span>
            <span className="text-emerald-700 font-medium">3 Past Dispatches</span>
          </div>
          <div className="text-stone-500 flex items-center gap-1.5 font-mono text-[11px]">
            <Truck className="w-3.5 h-3.5 text-stone-400" />
            <span>Default Destination: Bengaluru (Free Delivery)</span>
          </div>
        </div>

        {/* Order History Cards */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
          {MOCK_PAST_ORDERS.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-xl border border-stone-200 bg-white hover:border-emerald-300 transition-all space-y-4 shadow-2xs"
            >
              {/* Top Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold font-mono text-stone-900 text-sm">{order.orderNumber}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {order.status}
                  </span>
                  <span className="text-stone-400 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {order.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTracking(order.orderNumber)}
                    className="text-stone-500 hover:text-stone-800 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Tracking</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleReorderOrder(order)}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder Entire Box (₹{order.totalAmount})</span>
                  </button>
                </div>
              </div>

              {/* Items in this order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="isolate w-10 h-10 rounded-md bg-[#f5f5f7] border border-stone-200 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={generateProductAltText(item.productName, item.packSize, 'thumbnail')}
                          className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-stone-900 truncate">{item.productName}</div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {item.quantity} × {item.packSize} · ₹{item.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleReorderSingleProduct(item.productId, item.quantity, item.packSize)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded transition-colors cursor-pointer shrink-0"
                      title="Reorder just this formulation"
                    >
                      +1 Click
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & close */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200 text-xs text-stone-500">
          <span>Factory direct batch dispatch within 24 hours from Attibele, Bengaluru.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold transition-colors cursor-pointer self-end sm:self-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
