import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight
} from 'lucide-react';
import { CartItem, Product, LastOrderSummary } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string, orderDetails?: LastOrderSummary) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onClearCart
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pinCode, setPinCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.estPrice * item.quantity, 0);
  const shippingCharge = totalAmount >= 499 ? 0 : 50;
  const grandTotal = totalAmount + shippingCharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !address.trim() || !pinCode.trim()) {
      setErrorMessage('Please fill in all mandatory delivery fields (Name, Phone, Address, PIN code).');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your bag is empty. Please select at least one formulation.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `VEDHA-${randomNum}`;

    setTimeout(() => {
      const orderSummary: LastOrderSummary = {
        orderId: newOrderId,
        orderNumber: newOrderId,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        items: items.map((it) => ({
          productId: it.product.id,
          productName: it.product.name,
          quantity: it.quantity,
          packSize: it.product.packSize || '1 Litre',
          price: it.product.estPrice,
          image: it.product.image,
        })),
        totalAmount: grandTotal,
        deliveryAddress: `${address}, ${city}, ${state} - ${pinCode}`,
      };

      setIsSubmitting(false);
      setConfirmedOrderId(newOrderId);
      onOrderSuccess(newOrderId, orderSummary);
      onClearCart();
    }, 1000);
  };

  const handleResetAndClose = () => {
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden my-6 animate-in zoom-in-95 duration-300 ease-apple">
        {/* Apple-style Frosted Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1d1d1f]" />
            <h2 className="text-base font-semibold text-[#1d1d1f] font-display">
              {confirmedOrderId ? 'Order Confirmed' : 'Checkout & Express Delivery'}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer active:scale-90"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {confirmedOrderId ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200/60">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-semibold font-display text-[#1d1d1f] tracking-tight">
                  Thank you. Your order is confirmed.
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] max-w-md mx-auto leading-relaxed">
                  Your liquid formulations are being inspected and packed in tamper-evident bottles at our Attibele plant.
                </p>
              </div>

              {/* Order ID Badge */}
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-stone-50 border border-black/[0.06] text-center">
                <div className="text-[10px] uppercase font-medium tracking-widest text-[#86868b]">
                  Your Official Vedha Order ID
                </div>
                <div className="text-2xl font-semibold font-mono text-emerald-900 mt-1 select-all">
                  {confirmedOrderId}
                </div>
                <div className="text-[11px] text-[#86868b] mt-1">
                  Updates will be shared with {phoneNumber} and info@vedha.ind.in
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-xs text-left">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-black/[0.04]">
                  <span className="text-[10px] text-[#86868b] uppercase font-medium block">Delivery Address</span>
                  <span className="text-[#1d1d1f] font-medium truncate block mt-0.5">{address}, {city} - {pinCode}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-black/[0.04]">
                  <span className="text-[10px] text-[#86868b] uppercase font-medium block">Payment Method</span>
                  <span className="text-[#1d1d1f] font-medium uppercase mt-0.5">{paymentMethod} (₹{grandTotal})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleResetAndClose();
                    const event = new CustomEvent('open-order-tracking', { detail: confirmedOrderId });
                    window.dispatchEvent(event);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-black text-white font-medium text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
                >
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Track Live Dispatch</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-full transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Order Item Preview */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-black/[0.04] space-y-2.5">
                <div className="text-[10px] uppercase font-medium tracking-widest text-[#86868b] flex justify-between">
                  <span>Selected Formulations</span>
                  <span className="font-mono">{items.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
                </div>
                <div className="divide-y divide-black/[0.04] max-h-36 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.product.packSize || '1 Litre'}`} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-[#1d1d1f]">{item.product.name}</span>
                        <span className="text-[#86868b] ml-1.5 font-mono">× {item.quantity} ({item.product.packSize || '1L'})</span>
                      </div>
                      <span className="font-mono font-semibold text-[#1d1d1f]">
                        ₹{item.product.estPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-black/[0.04] flex justify-between text-xs font-semibold text-[#1d1d1f]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-sm">₹{totalAmount}</span>
                </div>
                {shippingCharge === 0 ? (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    ✓ Complimentary Free Dispatch (Order exceeds ₹499)
                  </div>
                ) : (
                  <div className="text-[11px] text-[#86868b] flex justify-between">
                    <span>Shipping (Bengaluru):</span>
                    <span className="font-mono">₹50</span>
                  </div>
                )}
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                  1. Shipping &amp; Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#86868b] font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-black/[0.08] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#86868b] font-medium mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-black/[0.08] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#86868b] font-medium mb-1">
                      Street Address / Flat / Building *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 302, Green Glen Layout, Bellandur"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-black/[0.08] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#86868b] font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-black/[0.08] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#86868b] font-medium mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 560103"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-black/[0.08] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                  2. Select Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-center transition-all duration-300 ease-apple cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white border-black/[0.08] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-center transition-all duration-300 ease-apple cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white border-black/[0.08] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1" />
                    <span>Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-center transition-all duration-300 ease-apple cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white border-black/[0.08] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1" />
                    <span>Card / Net Banking</span>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-50 text-white font-medium text-sm rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Complete Purchase (₹{grandTotal})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="text-center text-[10px] text-[#86868b] mt-2 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct dispatch from Attibele, Bengaluru</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
