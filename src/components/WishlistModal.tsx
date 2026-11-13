import React from 'react';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { VEDHA_PRODUCTS } from '../data/products';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const savedProducts = VEDHA_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600 border border-rose-200">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Saved Formulations ({savedProducts.length})</h3>
              <p className="text-xs text-stone-500">Your personalized shortlist saved in your browser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product List or Empty State */}
        {savedProducts.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-stone-800">No Saved Formulations Yet</div>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Click the heart icon on any 1-Litre bottle in the catalogue to save it to your wishlist for later.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {savedProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white flex items-center justify-between gap-4 transition-colors"
              >
                <div
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="isolate w-12 h-12 rounded-lg bg-[#f5f5f7] border border-stone-200 p-1 shrink-0 overflow-hidden">
                    <img
                      src={p.image}
                      alt={generateProductAltText(p.name, p.packSize, 'thumbnail')}
                      className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-stone-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      1000 ml · ₹{p.estPrice}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(p);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(p.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
