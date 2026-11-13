import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { VEDHA_PRODUCTS, VEDHA_BUNDLES } from './data/products';
import { Product, CuratedBundle, CartItem, LastOrderSummary, LastOrderCalculations } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { PlantBasedSpotlight } from './components/PlantBasedSpotlight';
import { AutoCareSpotlight } from './components/AutoCareSpotlight';
import { DilutionCalculator } from './components/DilutionCalculator';
import { BundleSection } from './components/BundleSection';
import { PackagingStudioView } from './components/PackagingStudioView';
import { AuditView } from './components/AuditView';
import { StrategyView } from './components/StrategyView';
import { SustainabilityImpact } from './components/SustainabilityImpact';
import { CheckoutModal } from './components/CheckoutModal';
import { WordPressKitView } from './components/WordPressKitView';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ProductFinder } from './components/ProductFinder';
import { ProductComparison } from './components/ProductComparison';
import { KnowledgeCentre } from './components/KnowledgeCentre';
import { ReviewsSection } from './components/ReviewsSection';
import { BrandIdentityModal } from './components/BrandIdentityModal';
import { WishlistModal } from './components/WishlistModal';
import { QuickBuyModal } from './components/QuickBuyModal';
import { QuickReorderModal, MOCK_PAST_ORDERS, PastOrder } from './components/QuickReorderModal';
import { SeoHead, SeoProps } from './components/SeoHead';
import { Footer } from './components/Footer';
import { Leaf, Car, ShieldCheck, Droplet, ArrowRight, MessageCircle, HelpCircle, Check, Award, RotateCcw, CheckCircle2 } from 'lucide-react';

const SEO_BY_TAB: Record<'store' | 'audit' | 'strategy' | 'wordpress' | 'packaging', SeoProps> = {
  store: {
    title: 'VEDHA – Premium Home Care & Automobile Care (1-Litre Liquid Range)',
    description: 'Explore Vedha 1000ml liquid cleaning formulations. Featuring verified plant-based & biodegradable dishwash, floor cleaner, hand wash, alongside high-performance automobile care.',
    keywords: ['Vedha', 'plant-based dishwash', 'biodegradable floor cleaner', 'car foam wash', 'liquid detergent', 'Bengaluru'],
  },
  packaging: {
    title: '1-Litre & 5-Litre Packaging Studio – VEDHA Formulations',
    description: 'Full front & back label specs, dilution panels, and statutory declarations under Legal Metrology Rules, 2011 for all 8 Vedha liquid cleaning formulations.',
    keywords: ['Vedha packaging', '1 litre bottle labels', 'legal metrology cleaning products', 'label design system'],
  },
  audit: {
    title: 'Comprehensive Website & E-commerce Audit – VEDHA (https://vedha.ind.in/)',
    description: 'Deep UI/UX, WooCommerce, conversion, mobile responsiveness, and SEO architecture audit matrix of the existing WordPress platform.',
    keywords: ['Vedha audit', 'WordPress WoodMart review', 'cleaning product ecommerce audit'],
  },
  strategy: {
    title: 'Brand Positioning & Division Strategy – VEDHA',
    description: 'Distinctive brand positioning for Vedha: Refined botanical warmth for Home Care and high-precision slate/sky styling for Automobile Care.',
    keywords: ['Vedha brand strategy', 'home care branding', 'automotive care identity'],
  },
  wordpress: {
    title: 'WordPress & WooCommerce Implementation Kit – VEDHA',
    description: 'Production-ready PHP snippets, child theme additions, WhatsApp catalogue mode functions, and Gutenberg CSS blocks for vedha.ind.in.',
    keywords: ['Vedha WordPress kit', 'WooCommerce code snippets', 'Woodmart theme customisation'],
  },
};

// Apple-style nuanced staggerChildren configuration for product filtering transitions
const productGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // Nuanced 60ms progressive cascade
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const productCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const, // Apple signature cubic-bezier deceleration
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'store' | 'audit' | 'strategy' | 'wordpress' | 'packaging'>('store');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'home-care' | 'automobile-care' | 'plant-based'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [packagingProductId, setPackagingProductId] = useState<string>('dishwashing-liquid');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('VEDHA-1042');
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);

  // Automated Quick Reorder State & Cache
  const [lastOrder, setLastOrder] = useState<LastOrderSummary>(() => {
    try {
      const saved = localStorage.getItem('vedha_last_order');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to parse vedha_last_order from localStorage', err);
    }
    // Default to the most recent completed order from MOCK_PAST_ORDERS
    const defaultRecent = MOCK_PAST_ORDERS[0];
    return {
      orderId: defaultRecent.id,
      orderNumber: defaultRecent.orderNumber,
      date: defaultRecent.date,
      items: defaultRecent.items.map((it) => ({
        productId: it.productId,
        productName: it.productName,
        quantity: it.quantity,
        packSize: it.packSize,
        price: it.price,
        image: it.image,
      })),
      totalAmount: defaultRecent.totalAmount,
      deliveryAddress: defaultRecent.deliveryAddress,
    };
  });

  // Calculate user's last total order, mapping product IDs directly to current VEDHA_PRODUCTS catalogue
  const lastOrderCalculations: LastOrderCalculations | null = useMemo(() => {
    if (!lastOrder || !lastOrder.items || lastOrder.items.length === 0) return null;

    const mappedItems: {
      productId: string;
      productName: string;
      product: Product;
      quantity: number;
      unitPrice: number;
      itemTotal: number;
      packSize: string;
      image: string;
    }[] = [];

    lastOrder.items.forEach((item) => {
      const matched = VEDHA_PRODUCTS.find((p) => p.id === item.productId);
      if (matched) {
        const qty = Math.max(1, item.quantity || 1);
        const targetPack = item.packSize || matched.packSize || '1 Litre';
        const matchedSize = matched.availableSizes?.find((s) => s.size === targetPack);
        const unitPrice = matchedSize ? matchedSize.estPrice : matched.estPrice;
        const productVariant: Product = matchedSize
          ? { ...matched, packSize: matchedSize.size, mrp: matchedSize.mrp, estPrice: matchedSize.estPrice }
          : matched;
        const itemTotal = unitPrice * qty;
        mappedItems.push({
          productId: matched.id,
          productName: matched.name,
          product: productVariant,
          quantity: qty,
          unitPrice,
          itemTotal,
          packSize: targetPack,
          image: matched.image,
        });
      }
    });

    if (mappedItems.length === 0) return null;

    const totalQuantity = mappedItems.reduce((acc, it) => acc + it.quantity, 0);
    const calculatedTotal = mappedItems.reduce((acc, it) => acc + it.itemTotal, 0);
    const originalTotal = lastOrder.totalAmount || calculatedTotal;

    return {
      orderId: lastOrder.orderId,
      orderNumber: lastOrder.orderNumber,
      date: lastOrder.date,
      items: mappedItems,
      totalQuantity,
      calculatedTotal,
      originalTotal,
      itemCount: mappedItems.length,
    };
  }, [lastOrder]);

  // Toast confirmation for automated bulk add
  const [reorderToast, setReorderToast] = useState<{
    show: boolean;
    orderNumber: string;
    totalQuantity: number;
    totalAmount: number;
  } | null>(null);

  // Automated Quick Reorder: Maps IDs to current catalogue and triggers bulk-add-to-cart for one-click re-purchasing
  const handleTriggerQuickReorder = (targetOrder?: LastOrderSummary | PastOrder) => {
    const orderToUse = targetOrder || lastOrder;
    if (!orderToUse || !orderToUse.items || orderToUse.items.length === 0) return;

    // Map IDs & pack sizes to current catalogue formulations
    const itemsToBulkAdd: { product: Product; quantity: number }[] = [];
    orderToUse.items.forEach((it) => {
      const matchedProduct = VEDHA_PRODUCTS.find((p) => p.id === it.productId);
      if (matchedProduct) {
        const targetPack = it.packSize || matchedProduct.packSize || '1 Litre';
        const matchedSize = matchedProduct.availableSizes?.find((s) => s.size === targetPack);
        itemsToBulkAdd.push({
          product: matchedSize
            ? { ...matchedProduct, packSize: matchedSize.size, mrp: matchedSize.mrp, estPrice: matchedSize.estPrice }
            : matchedProduct,
          quantity: Math.max(1, it.quantity || 1),
        });
      }
    });

    if (itemsToBulkAdd.length === 0) return;

    // Atomic bulk add into App cart state (composite match on id + packSize)
    setCartItems((prev) => {
      const updated = [...prev];
      itemsToBulkAdd.forEach(({ product, quantity }) => {
        const targetPack = product.packSize || '1 Litre';
        const idx = updated.findIndex(
          (cartIt) => cartIt.product.id === product.id && (cartIt.product.packSize || '1 Litre') === targetPack
        );
        if (idx >= 0) {
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + quantity,
          };
        } else {
          updated.push({ product, quantity });
        }
      });
      return updated;
    });

    // Calculate real totals for feedback
    const bulkTotalAmount = itemsToBulkAdd.reduce((sum, it) => sum + it.product.estPrice * it.quantity, 0);
    const bulkTotalQuantity = itemsToBulkAdd.reduce((sum, it) => sum + it.quantity, 0);

    // Open Cart Drawer for immediate checkout/review
    setIsCartOpen(true);

    // Show instant floating confirmation toast
    setReorderToast({
      show: true,
      orderNumber: orderToUse.orderNumber || (orderToUse as any).id || 'VEDHA',
      totalQuantity: bulkTotalQuantity,
      totalAmount: bulkTotalAmount,
    });

    setTimeout(() => {
      setReorderToast(null);
    }, 4500);
  };

  const handleSaveLastOrder = (newOrder: LastOrderSummary | PastOrder) => {
    const rawOrderId = 'orderId' in newOrder ? newOrder.orderId : newOrder.id;
    const formatted: LastOrderSummary = {
      orderId: rawOrderId || newOrder.orderNumber,
      orderNumber: newOrder.orderNumber,
      date: newOrder.date,
      items: newOrder.items.map((it) => ({
        productId: it.productId,
        productName: it.productName,
        quantity: it.quantity,
        packSize: it.packSize,
        price: it.price,
        image: it.image,
      })),
      totalAmount: newOrder.totalAmount,
      deliveryAddress: newOrder.deliveryAddress,
    };
    setLastOrder(formatted);
    try {
      localStorage.setItem('vedha_last_order', JSON.stringify(formatted));
    } catch (err) {
      console.error('Failed to save last order to localStorage', err);
    }
  };

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vedha_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem('vedha_wishlist', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save wishlist to localStorage', err);
      }
      return updated;
    });
  };

  const productSectionRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOpenTrackingEvent = (e: any) => {
      if (e.detail) {
        setTrackingOrderId(e.detail);
        setIsTrackingOpen(true);
      }
    };
    const handleOpenBrandModalEvent = () => {
      setIsBrandModalOpen(true);
    };
    window.addEventListener('open-order-tracking', handleOpenTrackingEvent);
    window.addEventListener('open-brand-modal', handleOpenBrandModalEvent);
    return () => {
      window.removeEventListener('open-order-tracking', handleOpenTrackingEvent);
      window.removeEventListener('open-brand-modal', handleOpenBrandModalEvent);
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Filter products for the main catalogue grid
  const filteredProducts = VEDHA_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'plant-based') return prod.isPlantBased && prod.isBiodegradable;
    return prod.category === selectedCategory;
  });

  const handleScrollToProducts = () => {
    if (activeTab !== 'store') {
      setActiveTab('store');
      setTimeout(() => {
        productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    const targetPack = product.packSize || '1 Litre';
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && (item.product.packSize || '1 Litre') === targetPack
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && (item.product.packSize || '1 Litre') === targetPack
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: { ...product, packSize: targetPack }, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleAddBundleToCart = (bundle: CuratedBundle) => {
    const bundledProducts = VEDHA_PRODUCTS.filter((p) => bundle.productIds.includes(p.id));
    setCartItems((prev) => {
      const updated = [...prev];
      bundledProducts.forEach((p) => {
        const targetPack = p.packSize || '1 Litre';
        const existingIndex = updated.findIndex(
          (item) => item.product.id === p.id && (item.product.packSize || '1 Litre') === targetPack
        );
        if (existingIndex >= 0) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1
          };
        } else {
          updated.push({ product: { ...p, packSize: targetPack }, quantity: 1 });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, packSize = '1 Litre') => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && (item.product.packSize || '1 Litre') === packSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, packSize = '1 Litre') => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && (item.product.packSize || '1 Litre') === packSize))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectBuy = (product?: Product, quantity = 1) => {
    if (product) {
      // Trigger compact Quick Buy overlay to choose quantity and preview price
      setQuickBuyProduct(product);
    } else {
      if (cartItems.length === 0) {
        handleAddToCart(VEDHA_PRODUCTS[0], 1);
      }
      setIsCheckoutOpen(true);
    }
  };

  const handleProceedFromQuickBuy = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleOpenPackagingForProduct = (productId: string) => {
    setPackagingProductId(productId);
    setActiveTab('packaging');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans">
      {/* Reusable Dynamic SEO Metadata Controller */}
      <SeoHead
        title={
          selectedProduct
            ? `${selectedProduct.name} (1 Litre) – VEDHA Formulation & Specs`
            : SEO_BY_TAB[activeTab]?.title || 'VEDHA – Premium Cleaning Formulations'
        }
        description={
          selectedProduct
            ? `${selectedProduct.shortDescription} High-active 1-Litre pack. Dilution: ${selectedProduct.dilutionRatio}.`
            : SEO_BY_TAB[activeTab]?.description || 'Premium liquid cleaning formulations for home and automobile care.'
        }
        keywords={SEO_BY_TAB[activeTab]?.keywords}
        ogType={selectedProduct ? 'product' : 'website'}
        ogImage={selectedProduct ? selectedProduct.image : undefined}
      />

      {/* Universal Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setActiveTab('store');
        }}
        onAddToCart={(product) => handleAddToCart(product, 1)}
        lastOrderCalculations={lastOrderCalculations}
        onQuickReorder={() => handleTriggerQuickReorder()}
        onOpenReorderModal={() => setIsReorderOpen(true)}
      />

      {/* Main View Router with Global Apple-style Route Transition */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1], // Apple signature cubic-bezier deceleration curve
            }}
            className="w-full"
          >
            {activeTab === 'audit' && <AuditView />}

            {activeTab === 'strategy' && <StrategyView />}

            {activeTab === 'wordpress' && <WordPressKitView />}

            {activeTab === 'packaging' && (
              <PackagingStudioView initialProductId={packagingProductId} />
            )}

            {activeTab === 'store' && (
              <>
            {/* Hero Section */}
            <Hero
              onScrollToProducts={handleScrollToProducts}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              lastOrderCalculations={lastOrderCalculations}
              onQuickReorder={() => handleTriggerQuickReorder()}
            />

            {/* Main Product Showcase Section */}
            <section ref={productSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {/* Category Header & Apple-style Segmented Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-800">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>The Complete Collection</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-semibold font-display text-[#1d1d1f] tracking-[-0.03em] mt-1.5">
                    Precision Liquid Care. 1L &amp; 5L Lineup.
                  </h2>
                  <p className="text-sm text-[#86868b] mt-1 max-w-2xl font-normal">
                    Standard 1-Litre dispenser bottles and economical 5-Litre bulk refill cans across all 8 verified formulations.
                  </p>
                </div>

                {/* Filter Controls (Apple Segmented Pill Switcher) */}
                <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-full border border-black/[0.04] self-start md:self-auto overflow-x-auto text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap ${
                      selectedCategory === 'all'
                        ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    All 8 Products
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('plant-based')}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCategory === 'plant-based'
                        ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Leaf className="w-3 h-3 text-emerald-400" />
                    <span>Plant-Based (4)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('home-care')}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap ${
                      selectedCategory === 'home-care'
                        ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Home Care (6)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('automobile-care')}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 ease-apple cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCategory === 'automobile-care'
                        ? 'bg-sky-800 text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Car className="w-3 h-3 text-sky-400" />
                    <span>Auto Care (2)</span>
                  </button>
                </div>
              </div>

              {/* Product Grid with Apple-style Staggered Cascade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  variants={productGridVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={productCardVariants}
                      className="h-full"
                    >
                      <ProductCard
                        product={product}
                        onSelect={(p) => setSelectedProduct(p)}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onDirectBuy={(p) => handleDirectBuy(p, 1)}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </section>

            {/* Interactive Cleaning Solution Advisor */}
            <ProductFinder
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onDirectBuy={(p) => handleDirectBuy(p, 1)}
            />

            {/* Plant-Based Dedicated Section */}
            <PlantBasedSpotlight
              products={VEDHA_PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />

            {/* Dynamic Sustainability Impact Component (Plastic Saved vs Market Sizes) */}
            <SustainabilityImpact
              onDirectBuy={(productId) => {
                if (productId) {
                  const prod = VEDHA_PRODUCTS.find((p) => p.id === productId);
                  if (prod) handleAddToCart(prod, 1);
                } else if (cartItems.length === 0) {
                  // Add verified plant-based dishwash as starter
                  handleAddToCart(VEDHA_PRODUCTS[0], 1);
                }
                setIsCheckoutOpen(true);
              }}
            />

            {/* Automobile Care Dedicated Section */}
            <AutoCareSpotlight
              products={VEDHA_PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />

            {/* Interactive Dilution Calculator */}
            <DilutionCalculator />

            {/* Side-by-Side Product Comparison Matrix */}
            <ProductComparison
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />

            {/* Suggested Bundles */}
            <BundleSection
              onAddBundleToCart={handleAddBundleToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Brand Philosophy & Trust Section */}
            <section className="bg-[#f5f5f7] py-10 lg:py-12 px-4 sm:px-6 lg:px-8 border-b border-black/[0.06]">
              <div className="max-w-7xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-[#013828] shadow-apple-hover group lg:min-h-[470px] flex flex-col-reverse lg:flex-row lg:items-center">
                  {/* Left Editorial & Quality Spec Zone */}
                  <div className="relative z-10 w-full lg:w-[46%] p-6 sm:p-8 lg:p-10 xl:p-12 space-y-4 text-white">
                    <div className="text-xs font-medium uppercase tracking-widest text-emerald-300">
                      The Vedha Quality Standard
                    </div>

                    <h2 className="text-2xl sm:text-3xl xl:text-[2.25rem] font-semibold font-display text-white tracking-[-0.03em] leading-[1.12]">
                      Concentrated liquid science designed for Indian water and households.
                    </h2>

                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
                      Most commercial cleaners are heavily diluted with water and synthetic fillers. Vedha formulates high-active concentrates that tackle hard-water scale, Indian cooking oils, and automotive road films with precision.
                    </p>

                    <div className="pt-1 space-y-2 text-xs text-emerald-100/90">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Consistent 1-Litre &amp; 5-Litre packs across all 8 formulations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Direct WhatsApp concierge &amp; instant checkout for retail &amp; bulk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Full Indian Legal Metrology Packaged Commodities compliance</span>
                      </div>
                    </div>

                    {/* Compact Integrated Trust Metrics */}
                    <div className="pt-2 grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-2xl bg-black/25 border border-emerald-400/20 backdrop-blur-md space-y-0.5">
                        <div className="text-xs font-bold text-white font-mono">1L &amp; 5L PACKS</div>
                        <p className="text-[11px] text-emerald-100/75 leading-snug">
                          Uniform standard sizing across all 8 SKUs.
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-black/25 border border-emerald-400/20 backdrop-blur-md space-y-0.5">
                        <div className="text-xs font-bold text-emerald-300 font-mono">100% FACTORY</div>
                        <p className="text-[11px] text-emerald-100/75 leading-snug">
                          Formulated &amp; bottled at Attibele, Bengaluru.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Uncropped 3:2 Product Banner (Blends seamlessly into left #013828 emerald canvas) */}
                  <div className="relative w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%] overflow-hidden pointer-events-none">
                    <img
                      src="./assets/aistudio/therd_hero_banner_68dc433c.jpeg"
                      alt="Vedha Neem Fresh Hand Wash 1L and Lemon Fresh Dishwashing Liquid 1L with natural neem leaves and citrus splash"
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[3/2] lg:aspect-auto lg:h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-apple"
                    />
                    <div className="hidden lg:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#013828] via-[#013828]/90 to-transparent" />
                  </div>
                </div>
              </div>
            </section>

            {/* Knowledge Centre & Educational Guides */}
            <KnowledgeCentre />

            {/* Genuine Review Interface & Submission Section */}
            <ReviewsSection />

            {/* Frequently Asked Questions */}
            <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <HelpCircle className="w-4 h-4" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                    Questions & Product Clarity
                  </h2>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm">
                      Which Vedha products are 100% plant-based and biodegradable?
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Four specific formulations are verified plant-based and biodegradable: <strong>Dishwashing Liquid (Lemon Fresh)</strong>, <strong>Neem Liquid Detergent</strong>, <strong>Lavender Floor Cleaner</strong>, and <strong>Neem Fresh Hand Wash</strong>. Our standard <strong>Lemon Fresh Floor Cleaner</strong>, <strong>Ocean Fresh Toilet Cleaner</strong>, <strong>Car Shampoo</strong>, and <strong>Car Foam Wash</strong> utilize specialized active surfactants engineered for high-traffic floor hygiene, limescale removal, and clear-coat auto detailing.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm">
                      Why does Vedha package all products in 1-Litre bottles?
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      The 1-Litre bottle provides the ideal balance between household longevity, shipping economy, and value for money. By standardizing bottle dimensions, Vedha reduces manufacturing tooling overhead and passes these savings directly to customers.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm">
                      How do I place an order or buy wholesale quantities?
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      You can add items to your Cart and proceed to instant online checkout, or send your order directly to our WhatsApp Business concierge, or email us at <strong>info@vedha.ind.in</strong>. We support both direct consumer orders and bulk supply for clinics, detailing studios, and commercial cleaning facilities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Call to Action */}
            <section className="bg-emerald-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
              <div className="max-w-3xl mx-auto space-y-5 relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold font-display">
                  Experience Vedha Cleaning Care in Your Home or Detailing Bay
                </h2>
                <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                  Connect with our team directly on WhatsApp for direct purchases, bulk supply, or sample pack requests.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="px-6 py-3 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer shadow-xs"
                  >
                    Open Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                  </button>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Vedha%20Care,%20I%20would%20like%20to%20order%20your%201-Litre%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-800 text-white border border-emerald-700 hover:bg-emerald-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct Concierge</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenOrderTracking={(orderId) => {
          if (orderId) setTrackingOrderId(orderId);
          setIsTrackingOpen(true);
        }}
        onOpenQuickReorder={() => setIsReorderOpen(true)}
        cartItems={cartItems}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectBuy={handleDirectBuy}
        cartItems={cartItems}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        lastOrderCalculations={lastOrderCalculations}
        onQuickReorder={() => handleTriggerQuickReorder()}
      />

      {/* Direct Website Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(orderId, orderDetails) => {
          setTrackingOrderId(orderId);
          if (orderDetails) {
            handleSaveLastOrder(orderDetails);
          }
        }}
        onClearCart={handleClearCart}
      />

      {/* Mock Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

      {/* Brand Identity Guidelines & SVG Lockups Modal */}
      <BrandIdentityModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />

      {/* LocalStorage-based Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Compact Quick Buy Overlay Modal */}
      <AnimatePresence>
        {quickBuyProduct && (
          <QuickBuyModal
            isOpen={true}
            product={quickBuyProduct}
            onClose={() => setQuickBuyProduct(null)}
            onProceedToCheckout={handleProceedFromQuickBuy}
          />
        )}
      </AnimatePresence>

      {/* Quick Reorder Dashboard Modal */}
      <QuickReorderModal
        isOpen={isReorderOpen}
        onClose={() => setIsReorderOpen(false)}
        onReorderItems={(items) => {
          items.forEach((it) => handleAddToCart(it.product, it.quantity));
          setIsCheckoutOpen(true);
        }}
        onOpenTracking={(orderId) => {
          setTrackingOrderId(orderId);
          setIsReorderOpen(false);
          setIsTrackingOpen(true);
        }}
        onSelectOrderAsLast={(order) => {
          handleSaveLastOrder(order);
        }}
      />

      {/* Floating 1-Click Quick Reorder Confirmation Toast */}
      {reorderToast?.show && (
        <aside
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-4 rounded-2xl shadow-2xl border border-stone-800 flex items-center gap-4 animate-in slide-in-from-bottom duration-300 max-w-md ring-1 ring-emerald-500/30"
        >
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Order #{reorderToast.orderNumber} Reordered</span>
              <span className="text-[10px] bg-emerald-900 text-emerald-300 border border-emerald-700/60 px-1.5 py-0.5 rounded font-mono">1-Click</span>
            </div>
            <p className="text-[11px] text-stone-300 truncate mt-0.5">
              Loaded {reorderToast.totalQuantity} items into cart (₹{reorderToast.totalAmount}) at live catalogue rates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setReorderToast(null);
              setIsCheckoutOpen(true);
            }}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-xs"
          >
            Checkout
          </button>
        </aside>
      )}
    </div>
  );
}
