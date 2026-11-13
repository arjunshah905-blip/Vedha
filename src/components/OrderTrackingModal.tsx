import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, Copy, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { VEDHA_PRODUCTS } from '../data/products';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

interface MockOrderRecord {
  orderId: string;
  orderDate: string;
  customerName: string;
  deliveryLocation: string;
  pinCode: string;
  status: 'Order Placed' | 'Packed at Attibele' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  courierPartner: string;
  awbNumber: string;
  estimatedDelivery: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    size: string;
    price: number;
  }>;
  timeline: Array<{
    title: string;
    timestamp: string;
    location: string;
    completed: boolean;
    current: boolean;
  }>;
}

const PRESET_ORDERS: Record<string, MockOrderRecord> = {
  'VEDHA-1042': {
    orderId: 'VEDHA-1042',
    orderDate: '10 Nov 2026, 04:30 PM',
    customerName: 'Ananya Sharma',
    deliveryLocation: 'Indiranagar, Bengaluru, Karnataka',
    pinCode: '560038',
    status: 'Out for Delivery',
    courierPartner: 'BlueDart Express Air',
    awbNumber: 'BLR-984210',
    estimatedDelivery: 'Today by 06:30 PM',
    items: [
      {
        productId: 'dishwashing-liquid',
        name: 'Plant-based Dish washing liquid',
        quantity: 2,
        size: '1 Litre',
        price: 199
      },
      {
        productId: 'plant-based-floor-cleaner',
        name: 'Plant-based Floor cleaner',
        quantity: 1,
        size: '1 Litre',
        price: 219
      }
    ],
    timeline: [
      {
        title: 'Order Confirmed & Batch Assigned',
        timestamp: '10 Nov, 04:35 PM',
        location: 'Vedha Online Commerce',
        completed: true,
        current: false
      },
      {
        title: 'Formulation Packed & Seal Inspected',
        timestamp: '11 Nov, 08:45 AM',
        location: 'Attibele Manufacturing Facility, Bengaluru',
        completed: true,
        current: false
      },
      {
        title: 'Handed Over to Courier Partner',
        timestamp: '11 Nov, 11:20 AM',
        location: 'Bengaluru South Hub',
        completed: true,
        current: false
      },
      {
        title: 'Out for Delivery',
        timestamp: '11 Nov, 01:15 PM',
        location: 'Indiranagar Delivery Station',
        completed: true,
        current: true
      },
      {
        title: 'Delivery Confirmation',
        timestamp: 'Expected Today by 06:30 PM',
        location: 'Customer Address',
        completed: false,
        current: false
      }
    ]
  },
  'VEDHA-2089': {
    orderId: 'VEDHA-2089',
    orderDate: '09 Nov 2026, 11:15 AM',
    customerName: 'Karthik Raja',
    deliveryLocation: 'Jayanagar, Bengaluru, Karnataka',
    pinCode: '560041',
    status: 'In Transit',
    courierPartner: 'Delhivery Surface Logistics',
    awbNumber: 'DEL-774129',
    estimatedDelivery: 'Tomorrow by 02:00 PM',
    items: [
      {
        productId: 'car-wash-shampoo',
        name: 'Car foam wash',
        quantity: 1,
        size: '1 Litre',
        price: 449
      },
      {
        productId: 'car-shampoo',
        name: 'Car shampoo',
        quantity: 1,
        size: '1 Litre',
        price: 379
      }
    ],
    timeline: [
      {
        title: 'Order Confirmed',
        timestamp: '09 Nov, 11:20 AM',
        location: 'Vedha Online Commerce',
        completed: true,
        current: false
      },
      {
        title: 'Packed & Tamper-Evident Capped',
        timestamp: '09 Nov, 03:40 PM',
        location: 'Attibele Facility, Bengaluru',
        completed: true,
        current: false
      },
      {
        title: 'In Transit Between Regional Hubs',
        timestamp: '10 Nov, 07:00 PM',
        location: 'Hosur Road Sorting Center',
        completed: true,
        current: true
      },
      {
        title: 'Out for Delivery',
        timestamp: 'Pending Dispatch to Local Hub',
        location: 'Jayanagar Station',
        completed: false,
        current: false
      },
      {
        title: 'Delivered',
        timestamp: 'Expected 12 Nov',
        location: 'Customer Address',
        completed: false,
        current: false
      }
    ]
  },
  'VEDHA-3041': {
    orderId: 'VEDHA-3041',
    orderDate: '06 Nov 2026, 02:20 PM',
    customerName: 'Priya Narayanan',
    deliveryLocation: 'Koramangala, Bengaluru, Karnataka',
    pinCode: '560034',
    status: 'Delivered',
    courierPartner: 'Shadowfax Quick Delivery',
    awbNumber: 'SHD-551920',
    estimatedDelivery: 'Delivered on 08 Nov 2026',
    items: [
      {
        productId: 'dishwashing-liquid',
        name: 'Plant-based Dish washing liquid',
        quantity: 1,
        size: '1 Litre',
        price: 199
      },
      {
        productId: 'plant-based-floor-cleaner',
        name: 'Plant-based Floor cleaner',
        quantity: 1,
        size: '1 Litre',
        price: 219
      },
      {
        productId: 'plant-based-liquid-hand-wash',
        name: 'Plant-based Liquid hand wash',
        quantity: 1,
        size: '1 Litre',
        price: 239
      }
    ],
    timeline: [
      {
        title: 'Order Confirmed',
        timestamp: '06 Nov, 02:25 PM',
        location: 'Vedha Commerce',
        completed: true,
        current: false
      },
      {
        title: 'Dispatched from Attibele Plant',
        timestamp: '07 Nov, 09:15 AM',
        location: 'Attibele Unit',
        completed: true,
        current: false
      },
      {
        title: 'Out for Delivery',
        timestamp: '08 Nov, 10:45 AM',
        location: 'Koramangala Delivery Hub',
        completed: true,
        current: false
      },
      {
        title: 'Successfully Delivered',
        timestamp: '08 Nov, 01:40 PM',
        location: 'Delivered · Received & Verified',
        completed: true,
        current: true
      }
    ]
  }
};

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = 'VEDHA-1042'
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<MockOrderRecord | null>(
    PRESET_ORDERS[initialOrderId.toUpperCase()] || PRESET_ORDERS['VEDHA-1042']
  );
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = searchInput.trim().toUpperCase();
    if (!cleanId) {
      setErrorMessage('Please enter a valid Vedha Order ID (e.g., VEDHA-1042).');
      return;
    }

    if (PRESET_ORDERS[cleanId]) {
      setActiveOrder(PRESET_ORDERS[cleanId]);
      setErrorMessage(null);
    } else {
      // Dynamic fallback for any custom user input
      setActiveOrder({
        orderId: cleanId,
        orderDate: 'Today, 09:15 AM',
        customerName: 'Valued Customer',
        deliveryLocation: 'Bengaluru Metropolitian Area, Karnataka',
        pinCode: '560100',
        status: 'Packed at Attibele',
        courierPartner: 'BlueDart Express Logistics',
        awbNumber: `AWB-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: 'Estimated in 2-3 Business Days',
        items: [
          {
            productId: 'dishwashing-liquid',
            name: 'Plant-based Dish washing liquid',
            quantity: 1,
            size: '1 Litre',
            price: 199
          },
          {
            productId: 'plant-based-floor-cleaner',
            name: 'Plant-based Floor cleaner',
            quantity: 1,
            size: '1 Litre',
            price: 219
          }
        ],
        timeline: [
          {
            title: 'Order Confirmed & Processed',
            timestamp: 'Today, 09:20 AM',
            location: 'Vedha Central Commerce',
            completed: true,
            current: false
          },
          {
            title: 'Formulation Packed at Attibele Plant',
            timestamp: 'Today, 11:30 AM',
            location: 'Attibele Unit, Bengaluru',
            completed: true,
            current: true
          },
          {
            title: 'Dispatch to Logistics Sorting Hub',
            timestamp: 'Scheduled Today Evening',
            location: 'South Bengaluru Transit',
            completed: false,
            current: false
          },
          {
            title: 'Out for Local Delivery',
            timestamp: 'Pending Transit',
            location: 'Local Delivery Facility',
            completed: false,
            current: false
          }
        ]
      });
      setErrorMessage(null);
    }
  };

  const handleCopyAwb = () => {
    if (!activeOrder) return;
    navigator.clipboard.writeText(activeOrder.awbNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const whatsappSupportUrl = activeOrder
    ? `https://wa.me/919876543210?text=${encodeURIComponent(
        `Hello Vedha Customer Support,\nI would like an update regarding my Order ID: *${activeOrder.orderId}*.\nTracking Number: ${activeOrder.awbNumber}\nDelivery Pincode: ${activeOrder.pinCode}\n\nPlease share current dispatch status.`
      )}`
    : 'https://wa.me/919876543210';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-stone-900 font-display">
              Vedha Order Tracking & Logistics Care
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close tracking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
          {/* Search Box & Quick Sample IDs */}
          <div className="space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g., VEDHA-1042)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono focus:outline-emerald-600 focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Track Order
              </button>
            </form>

            {/* Quick Demo Pre-sets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Quick Demo Samples:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('VEDHA-1042');
                  setActiveOrder(PRESET_ORDERS['VEDHA-1042']);
                  setErrorMessage(null);
                }}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-mono cursor-pointer transition-colors ${
                  activeOrder?.orderId === 'VEDHA-1042'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                VEDHA-1042 (Out for Delivery)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('VEDHA-2089');
                  setActiveOrder(PRESET_ORDERS['VEDHA-2089']);
                  setErrorMessage(null);
                }}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-mono cursor-pointer transition-colors ${
                  activeOrder?.orderId === 'VEDHA-2089'
                    ? 'bg-sky-50 border-sky-300 text-sky-800 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                VEDHA-2089 (In Transit)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('VEDHA-3041');
                  setActiveOrder(PRESET_ORDERS['VEDHA-3041']);
                  setErrorMessage(null);
                }}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-mono cursor-pointer transition-colors ${
                  activeOrder?.orderId === 'VEDHA-3041'
                    ? 'bg-stone-200 border-stone-400 text-stone-900 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                VEDHA-3041 (Delivered)
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Active Order Details Panel */}
          {activeOrder && (
            <div className="space-y-6">
              {/* Order Status Banner */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                      Order Reference
                    </div>
                    <div className="text-lg font-bold font-mono text-stone-900 flex items-center gap-2 mt-0.5">
                      <span>{activeOrder.orderId}</span>
                      <span className="text-xs font-sans px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                        {activeOrder.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                      Estimated Delivery
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      {activeOrder.estimatedDelivery}
                    </div>
                  </div>
                </div>

                {/* Secondary Meta Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Order Placed</span>
                    <span className="text-stone-800 font-medium">{activeOrder.orderDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Logistics Carrier</span>
                    <span className="text-stone-800 font-medium">{activeOrder.courierPartner}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Tracking AWB</span>
                    <div className="flex items-center gap-1 font-mono font-semibold text-stone-900">
                      <span>{activeOrder.awbNumber}</span>
                      <button
                        onClick={handleCopyAwb}
                        className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                        title="Copy AWB number"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Recipient Pin Code</span>
                    <span className="text-stone-800 font-mono font-semibold">{activeOrder.pinCode}</span>
                  </div>
                </div>
              </div>

              {/* Visual Logistics Stepper */}
              <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-4 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-emerald-700" />
                  <span>Shipment Milestone History</span>
                </div>

                <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {activeOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div
                        className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] ${
                          step.completed
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {step.completed ? <Check className="w-3 h-3" /> : idx + 1}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <div
                            className={`font-semibold ${
                              step.current
                                ? 'text-emerald-800 text-sm font-bold'
                                : step.completed
                                ? 'text-stone-900'
                                : 'text-stone-400'
                            }`}
                          >
                            {step.title}
                            {step.current && (
                              <span className="ml-2 text-[10px] px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase font-bold tracking-wider">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {step.location}
                          </div>
                        </div>

                        <div className="text-[11px] text-stone-400 font-mono">
                          {step.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this Dispatch */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-3 text-xs">
                <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Consignment Contents (1-Litre Standard Packaging)
                </div>

                <div className="space-y-2">
                  {activeOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-stone-200/80"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <div>
                          <span className="font-bold text-stone-900">{item.name}</span>
                          <span className="text-[11px] text-stone-500 ml-2">Pack: {item.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-stone-700">
                        <span>Qty: <strong>{item.quantity}</strong></span>
                        <span className="font-mono font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Care Escalation */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-950">
                <div className="space-y-0.5">
                  <div className="font-bold">Need assistance with your delivery or factory dispatch?</div>
                  <div className="text-emerald-800 text-[11px]">
                    Vedha Dispatch Team is available 9:00 AM – 7:00 PM IST via WhatsApp or email (info@vedha.ind.in).
                  </div>
                </div>

                <a
                  href={whatsappSupportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Care</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
