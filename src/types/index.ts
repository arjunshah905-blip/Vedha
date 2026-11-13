export type ProductCategory = 'home-care' | 'automobile-care';
export type PackSize = '1 Litre' | '5 Litres';

export interface SizeOption {
  size: PackSize;
  label: string; // "1L" or "5L"
  volumeMl: number;
  mrp: number;
  estPrice: number;
  savingsPercent?: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  tagline: string;
  packSize: string; // Default size e.g. "1 Litre"
  availableSizes: SizeOption[];
  isPlantBased: boolean;
  isBiodegradable: boolean;
  mrp: number;
  estPrice: number;
  image: string;
  accentColor: string; // for label & UI accents
  secondaryColor: string;
  shortDescription: string;
  heroBenefit: string;
  benefits: string[];
  recommendedApplications: string[];
  directionsForUse: string[];
  dilutionRatio: string;
  safetyInstructions: string[];
  storageInstructions: string;
  compositionNotes: string; // Verified transparent note
  bestBeforeMonths: number;
  labelSpec: {
    frontConcept: string;
    backLayoutNotes: string;
    pantoneApprox: string;
    iconFeatures: string[];
  };
}

export interface CuratedBundle {
  id: string;
  name: string;
  subtitle: string;
  productIds: string[];
  regularTotal: number;
  bundlePrice: number;
  savings: number;
  description: string;
  badge: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LastOrderItem {
  productId: string;
  productName?: string;
  quantity: number;
  packSize?: string;
  price?: number;
  image?: string;
}

export interface LastOrderSummary {
  orderId: string;
  orderNumber: string;
  date: string;
  items: LastOrderItem[];
  totalAmount?: number;
  deliveryAddress?: string;
}

export interface LastOrderCalculations {
  orderId: string;
  orderNumber: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    product: Product;
    quantity: number;
    unitPrice: number;
    itemTotal: number;
    packSize: string;
    image: string;
  }[];
  totalQuantity: number;
  calculatedTotal: number;
  originalTotal: number;
  itemCount: number;
}
