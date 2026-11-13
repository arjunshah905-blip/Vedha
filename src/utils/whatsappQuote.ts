import { CartItem, Product } from '../types';

const VEDHA_WHATSAPP_NUMBER = '919876543210';

export interface BulkQuoteOptions {
  product?: Product;
  quantity?: number;
  cartItems?: CartItem[];
}

/**
 * Builds a pre-filled WhatsApp URL (`https://wa.me/...`) for wholesale / bulk
 * quote inquiries from either a ProductModal selection or the Footer (with
 * active cart items when present).
 */
export function buildBulkQuoteWhatsAppUrl({
  product,
  quantity = 1,
  cartItems = [],
}: BulkQuoteOptions): string {
  const lines: string[] = [
    'Hello Vedha Wholesale Team,',
    'I would like to request a *Bulk / Wholesale Quote* for the following:',
    '',
  ];

  if (product) {
    const packLabel = product.packSize || '1 Litre';
    const estSubtotal = product.estPrice * quantity;
    lines.push(`• *Product:* ${product.name} (${packLabel})`);
    lines.push(`• *Requested Quantity:* ${quantity} unit(s)`);
    lines.push(`• *Catalog Reference Value:* ₹${estSubtotal}`);
  } else if (cartItems.length > 0) {
    let totalUnits = 0;
    let totalValue = 0;

    cartItems.forEach((item, index) => {
      const packLabel = item.product.packSize || '1 Litre';
      const lineTotal = item.product.estPrice * item.quantity;
      totalUnits += item.quantity;
      totalValue += lineTotal;
      lines.push(
        `${index + 1}. ${item.product.name} (${packLabel}) — Qty: ${item.quantity} (₹${lineTotal})`
      );
    });

    lines.push('');
    lines.push(`• *Total Units:* ${totalUnits}`);
    lines.push(`• *Catalog Subtotal:* ₹${totalValue}`);
  } else {
    lines.push('• *Products / SKUs of Interest:* [e.g. Dishwashing Liquid 5L, Floor Cleaner 5L, Car Foam Wash]');
    lines.push('• *Estimated Order Quantity:* [e.g. 20+ units / cartons]');
  }

  lines.push('');
  lines.push('*Business / Institutional Details:*');
  lines.push('- Business / Facility Name:');
  lines.push('- Delivery City & Pin Code:');
  lines.push('- GSTIN (if B2B invoice required):');
  lines.push('');
  lines.push('Please share bulk slab pricing, MOQ, and dispatch lead time.');

  return `https://wa.me/${VEDHA_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
