import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingBag, Heart, Search, X, Leaf, Car, Plus, ArrowRight, RotateCcw } from 'lucide-react';
import { VEDHA_PRODUCTS } from '../data/products';
import { Product, LastOrderCalculations } from '../types';
import { generateProductAltText, PRODUCT_STUDIO_IMG_CLASS } from '../utils/imageAccessibility';
import vedhaLogoImg from '../assets/images/live_vedha_logo.png';

interface NavbarProps {
  activeTab: 'store' | 'audit' | 'strategy' | 'wordpress' | 'packaging';
  setActiveTab: (tab: 'store' | 'audit' | 'strategy' | 'wordpress' | 'packaging') => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  lastOrderCalculations?: LastOrderCalculations | null;
  onQuickReorder?: () => void;
  onOpenReorderModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  onSelectProduct,
  onAddToCart,
  lastOrderCalculations,
  onQuickReorder,
  onOpenReorderModal,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBadgeBouncing, setIsBadgeBouncing] = useState(false);
  const prevCountRef = React.useRef(cartCount);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState<'all' | 'home-care' | 'automobile-care' | 'plant-based'>('all');
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cart bounce spring physics
  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setIsBadgeBouncing(true);
      const timer = setTimeout(() => setIsBadgeBouncing(false), 500);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  // Subtle scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside & keyboard global shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
        searchInputRef.current?.focus();
      } else if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileSearchActive(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Real-time filtered search results across Home Care & Automobile Care catalogues
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const query = searchQuery.toLowerCase().trim();

    return VEDHA_PRODUCTS.filter((prod) => {
      // Category filter check
      if (searchCategory === 'home-care' && prod.category !== 'home-care') return false;
      if (searchCategory === 'automobile-care' && prod.category !== 'automobile-care') return false;
      if (searchCategory === 'plant-based' && (!prod.isPlantBased || !prod.isBiodegradable)) return false;

      // Text matching across names, tags, descriptions, applications, and pack sizes
      const nameMatch = prod.name.toLowerCase().includes(query);
      const taglineMatch = prod.tagline.toLowerCase().includes(query);
      const descMatch = prod.shortDescription.toLowerCase().includes(query);
      const catMatch = prod.categoryLabel.toLowerCase().includes(query);
      const benefitMatch = (prod.benefits || []).some((b) => b.toLowerCase().includes(query));
      const appMatch = (prod.recommendedApplications || []).some((a) => a.toLowerCase().includes(query));
      const dilutionMatch = prod.dilutionRatio?.toLowerCase().includes(query);

      return nameMatch || taglineMatch || descMatch || catMatch || benefitMatch || appMatch || dilutionMatch;
    });
  }, [searchQuery, searchCategory]);

  // Default suggestions when query is empty but search is open
  const defaultSuggestions = useMemo(() => {
    if (searchCategory === 'home-care') return VEDHA_PRODUCTS.filter((p) => p.category === 'home-care');
    if (searchCategory === 'automobile-care') return VEDHA_PRODUCTS.filter((p) => p.category === 'automobile-care');
    if (searchCategory === 'plant-based') return VEDHA_PRODUCTS.filter((p) => p.isPlantBased && p.isBiodegradable);
    return VEDHA_PRODUCTS.slice(0, 4);
  }, [searchCategory]);

  const displayedList = searchQuery.trim() ? searchResults : defaultSuggestions;

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, searchCategory]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation handler (ArrowDown, ArrowUp, Enter, Escape)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsSearchOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (displayedList.length === 0) return;
      setSelectedIndex((prev) => (prev < displayedList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (displayedList.length === 0) return;
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayedList.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < displayedList.length) {
        handleSelectProduct(displayedList[selectedIndex]);
      } else if (displayedList.length > 0) {
        handleSelectProduct(displayedList[0]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsSearchOpen(false);
      setIsMobileSearchActive(false);
      setSelectedIndex(-1);
      searchInputRef.current?.blur();
      mobileSearchInputRef.current?.blur();
    }
  };

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setIsMobileSearchActive(false);
    setSearchQuery('');
    setSelectedIndex(-1);
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.08] transition-all duration-300">
      {/* Subtle Hairline Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/[0.03] overflow-hidden pointer-events-none z-50">
        <div
          className="h-full bg-stone-900 transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-6 h-14 sm:h-16">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => {
              setActiveTab('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-stone-900 shrink-0 hover:opacity-80 transition-opacity text-left cursor-pointer group"
          >
            <img
              src={vedhaLogoImg}
              alt="Vedha Brand Logo"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-semibold text-sm sm:text-base tracking-tight font-display text-stone-900 hidden xs:inline">
              VEDHA
            </span>
          </button>

          {/* Apple-style Interactive Search Bar (Desktop / Tablet) */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-sm lg:max-w-md hidden sm:block mx-2 lg:mx-4">
            <div className="relative group">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search 1L & 5L formulations..."
                className="w-full pl-9 pr-14 py-1.5 sm:py-2 text-xs bg-stone-100/80 hover:bg-stone-100 focus:bg-white border border-transparent focus:border-black/[0.12] rounded-full text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all duration-300"
                aria-label="Search Vedha Formulations"
                role="combobox"
                aria-expanded={isSearchOpen}
                aria-autocomplete="list"
                aria-controls="navbar-search-results"
                aria-activedescendant={selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined}
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-stone-900" />
              
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndex(-1);
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono text-stone-400 bg-white/70 px-1.5 py-0.5 rounded border border-stone-200">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>

            {/* Apple-style Real-time Dropdown */}
            {isSearchOpen && (
              <div
                id="navbar-search-results"
                role="listbox"
                aria-label="Product search suggestions"
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-apple-dropdown border border-black/[0.08] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* Segmented Filter Control */}
                <div className="p-2 bg-stone-50/80 border-b border-black/[0.05] flex items-center gap-1 overflow-x-auto text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchCategory('all');
                      searchInputRef.current?.focus();
                    }}
                    className={`px-3 py-1 rounded-full font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      searchCategory === 'all'
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    All ({VEDHA_PRODUCTS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchCategory('home-care');
                      searchInputRef.current?.focus();
                    }}
                    className={`px-3 py-1 rounded-full font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                      searchCategory === 'home-care'
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    <Leaf className="w-2.5 h-2.5" />
                    Home Care
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchCategory('automobile-care');
                      searchInputRef.current?.focus();
                    }}
                    className={`px-3 py-1 rounded-full font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                      searchCategory === 'automobile-care'
                        ? 'bg-sky-800 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    <Car className="w-2.5 h-2.5" />
                    Auto Care
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchCategory('plant-based');
                      searchInputRef.current?.focus();
                    }}
                    className={`px-3 py-1 rounded-full font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      searchCategory === 'plant-based'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    Plant-Based
                  </button>
                </div>

                {/* Results List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-black/[0.04] p-1.5">
                  {searchQuery.trim() ? (
                    searchResults.length > 0 ? (
                      <>
                        <div className="px-3 py-1 text-[10px] uppercase font-semibold tracking-wider text-stone-400 flex items-center justify-between">
                          <span>Formulations ({searchResults.length})</span>
                          <span className="font-mono text-[9px] text-stone-400">1L &amp; 5L Available</span>
                        </div>
                        {searchResults.map((product, idx) => {
                          const isSelected = selectedIndex === idx;
                          return (
                            <div
                              key={product.id}
                              id={`search-option-${idx}`}
                              role="option"
                              aria-selected={isSelected}
                              ref={(el) => {
                                itemRefs.current[idx] = el;
                              }}
                              onClick={() => handleSelectProduct(product)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group ${
                                isSelected
                                  ? 'bg-stone-100/90 text-stone-900'
                                  : 'hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="isolate w-10 h-10 rounded-lg bg-[#f5f5f7] border border-black/[0.06] p-1 shrink-0 flex items-center justify-center">
                                  <img
                                    src={product.image}
                                    alt={generateProductAltText(product.name, product.packSize, 'thumbnail')}
                                    loading="lazy"
                                    decoding="async"
                                    className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-semibold text-stone-500">
                                      {product.categoryLabel}
                                    </span>
                                    {product.isPlantBased && product.isBiodegradable && (
                                      <span className="text-[9px] font-medium text-emerald-700 bg-emerald-50 px-1 rounded">
                                        Eco
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs font-semibold text-stone-900 truncate">
                                    {product.name}
                                  </div>
                                  <div className="text-[11px] text-stone-500 truncate">
                                    {product.tagline}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5 shrink-0">
                                <div className="text-right font-mono">
                                  <span className="text-xs font-semibold text-stone-900 block">
                                    ₹{product.estPrice}
                                  </span>
                                  <span className="text-[10px] text-stone-400 line-through block">
                                    ₹{product.mrp}
                                  </span>
                                </div>

                                {onAddToCart && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleQuickAdd(e, product)}
                                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 transition-colors flex items-center justify-center active:scale-90 cursor-pointer"
                                    title={`Add ${product.name} to Cart`}
                                    aria-label={`Add ${product.name} to cart`}
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="p-6 text-center space-y-2">
                        <p className="text-xs font-medium text-stone-700">
                          No formulations found for "{searchQuery}"
                        </p>
                        <p className="text-[11px] text-stone-400">
                          Try "Dishwash", "Car Foam", "Floor Cleaner", or "Laundry"
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="space-y-1">
                      <div className="px-3 py-1 text-[10px] uppercase font-semibold tracking-wider text-stone-400">
                        Featured Formulations
                      </div>
                      {defaultSuggestions.map((product, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <div
                            key={product.id}
                            id={`search-option-${idx}`}
                            role="option"
                            aria-selected={isSelected}
                            ref={(el) => {
                              itemRefs.current[idx] = el;
                            }}
                            onClick={() => handleSelectProduct(product)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group ${
                              isSelected
                                ? 'bg-stone-100/90 text-stone-900'
                                : 'hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="isolate w-10 h-10 rounded-lg bg-[#f5f5f7] border border-black/[0.06] p-1 shrink-0 flex items-center justify-center">
                                <img
                                  src={product.image}
                                  alt={generateProductAltText(product.name, product.packSize, 'thumbnail')}
                                  loading="lazy"
                                  decoding="async"
                                  className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              </div>

                              <div className="min-w-0">
                                <div className="text-[10px] font-semibold text-stone-500">
                                  {product.categoryLabel}
                                </div>
                                <div className="text-xs font-semibold text-stone-900 truncate">
                                  {product.name}
                                </div>
                                <div className="text-[11px] text-stone-500 truncate">
                                  {product.tagline}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0">
                              <div className="text-right font-mono">
                                <span className="text-xs font-semibold text-stone-900 block">
                                  ₹{product.estPrice}
                                </span>
                                <span className="text-[10px] text-stone-400 line-through block">
                                  ₹{product.mrp}
                                </span>
                              </div>

                              {onAddToCart && (
                                <button
                                  type="button"
                                  onClick={(e) => handleQuickAdd(e, product)}
                                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 transition-colors flex items-center justify-center active:scale-90 cursor-pointer"
                                  title={`Add ${product.name} to Cart`}
                                  aria-label={`Add ${product.name} to cart`}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="px-3.5 py-2 bg-stone-50 border-t border-black/[0.04] flex items-center justify-between text-[11px] text-stone-400">
                  <span>Use ↑↓ arrows to navigate, ↵ to select</span>
                  <span className="font-mono text-[10px]">esc to close</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Zone: Search Toggle (Mobile) + Saved + Reorder + Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchActive(!isMobileSearchActive);
                setIsSearchOpen(true);
              }}
              className="sm:hidden p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Wishlist Button */}
            {onOpenWishlist && (
              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative p-2 sm:px-3 sm:py-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                title="View Saved Products"
                aria-label={`View ${wishlistCount} saved products`}
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`} />
                <span className="hidden md:inline text-xs font-medium text-stone-700">Saved</span>
                {wishlistCount > 0 && (
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            {/* 1-Click Quick Reorder */}
            {onQuickReorder && lastOrderCalculations && (
              <button
                type="button"
                onClick={onQuickReorder}
                className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 group"
                title={`Quick Reorder last purchase of ₹${lastOrderCalculations.calculatedTotal}`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-700 group-hover:-rotate-45 transition-transform duration-300" />
                <span className="text-xs font-medium hidden lg:inline">Reorder</span>
                <span className="text-[11px] font-bold font-mono text-emerald-800">
                  ₹{lastOrderCalculations.calculatedTotal}
                </span>
              </button>
            )}

            {/* Apple-style Cart Bag Button */}
            <button
              onClick={onOpenCart}
              className={`relative px-4 py-1.5 sm:py-2 text-xs font-medium text-white bg-stone-900 hover:bg-black rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                isBadgeBouncing ? 'ring-2 ring-emerald-500 scale-105' : ''
              }`}
              aria-label="View Cart"
            >
              <ShoppingBag className={`w-3.5 h-3.5 transition-transform ${isBadgeBouncing ? 'rotate-[-8deg] text-emerald-400' : ''}`} />
              <span className="hidden xs:inline">Bag</span>
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className={`w-4 h-4 flex items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white tabular-nums transition-all ${
                    isBadgeBouncing ? 'scale-125 bg-emerald-500' : 'scale-100'
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {isMobileSearchActive && (
        <div className="sm:hidden px-4 py-3 bg-white/95 backdrop-blur-xl border-t border-black/[0.08] animate-in fade-in duration-200">
          <div className="relative">
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search formulations..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-stone-100 rounded-full text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-900"
              autoFocus
              role="combobox"
              aria-expanded={true}
              aria-controls="mobile-search-results"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndex(-1);
                  mobileSearchInputRef.current?.focus();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Clear mobile search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Category Filter Pills */}
          <div className="mt-2 flex items-center gap-1.5 overflow-x-auto text-[10px] pb-1">
            <button
              type="button"
              onClick={() => setSearchCategory('all')}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                searchCategory === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              All ({VEDHA_PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setSearchCategory('home-care')}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap flex items-center gap-1 ${
                searchCategory === 'home-care'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              <Leaf className="w-2.5 h-2.5" />
              Home Care
            </button>
            <button
              type="button"
              onClick={() => setSearchCategory('automobile-care')}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap flex items-center gap-1 ${
                searchCategory === 'automobile-care'
                  ? 'bg-sky-800 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              <Car className="w-2.5 h-2.5" />
              Auto Care
            </button>
            <button
              type="button"
              onClick={() => setSearchCategory('plant-based')}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                searchCategory === 'plant-based'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              Plant-Based
            </button>
          </div>

          {/* Mobile Results Dropdown */}
          <div
            id="mobile-search-results"
            role="listbox"
            className="mt-2 bg-white rounded-xl shadow-lg border border-black/[0.08] max-h-72 overflow-y-auto divide-y divide-black/[0.04] p-1"
          >
            {displayedList.length > 0 ? (
              displayedList.map((prod, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={prod.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectProduct(prod)}
                    className={`p-2 rounded-lg flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                      isSelected ? 'bg-stone-100' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="isolate w-9 h-9 rounded-lg bg-[#f5f5f7] border border-black/[0.06] p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={generateProductAltText(prod.name, prod.packSize, 'thumbnail')}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full object-contain ${PRODUCT_STUDIO_IMG_CLASS}`}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-stone-900 text-xs truncate">
                          {prod.name}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate">
                          {prod.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="text-right font-mono">
                        <div className="text-xs font-semibold text-stone-900">
                          ₹{prod.estPrice}
                        </div>
                      </div>
                      {onAddToCart && (
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, prod)}
                          className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center active:scale-90"
                          title="Add to Cart"
                          aria-label={`Add ${prod.name} to cart`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-stone-500">
                No formulations found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
