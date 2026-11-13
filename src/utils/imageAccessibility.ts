/**
 * Generates descriptive, contextual alt text for Vedha product photography
 * complying with WCAG 2.2 AA accessibility requirements.
 */
export function generateProductAltText(
  productName: string,
  packSize?: string,
  context?: 'bottle' | 'catalog' | 'macro' | 'bulk' | 'thumbnail' | 'comparison' | 'hero'
): string {
  const cleanName = productName.trim();
  const sizeText = packSize ? ` in ${packSize} packaging` : '';

  switch (context) {
    case 'bulk':
      return `Vedha ${cleanName} 5-Litre high-capacity bulk refill container with ergonomic handle and pour spout`;
    case 'macro':
      return `Close-up shot of Vedha ${cleanName}${sizeText} bottle label and dispensing nozzle`;
    case 'thumbnail':
      return `Miniature thumbnail view of Vedha ${cleanName}${sizeText}`;
    case 'comparison':
      return `Comparative specification view of Vedha ${cleanName}${sizeText}`;
    case 'hero':
      return `Studio photograph of Vedha ${cleanName}${sizeText} cleaning liquid formulation`;
    case 'bottle':
    case 'catalog':
    default:
      return `Official bottle photograph of Vedha ${cleanName}${sizeText} concentrated liquid cleaning formulation`;
  }
}

/**
 * Generates an inline SVG-based Low-Quality Image Placeholder (LQIP) data URI
 * tailored to each product's primary accent color and pack format (1L Bottle vs 5L Bulk Can).
 * Ensures zero Cumulative Layout Shift (CLS) and smooth cross-fade upon high-res load.
 */
export function generateProductLqip(
  accentColor: string = '#059669',
  secondaryColor: string = '#10b981',
  isBulk: boolean = false
): string {
  const primary = accentColor || '#059669';
  const secondary = secondaryColor || '#10b981';

  const svg = isBulk
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="100%" height="100%">
        <defs>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <linearGradient id="canGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primary}" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="${secondary}" stop-opacity="0.16"/>
          </linearGradient>
        </defs>
        <rect width="160" height="120" fill="#fafaf9" />
        <g filter="url(#blur)">
          <rect x="44" y="38" width="72" height="66" rx="10" fill="url(#canGrad)" />
          <rect x="54" y="24" width="20" height="16" rx="4" fill="${primary}" fill-opacity="0.28" />
          <rect x="88" y="22" width="18" height="16" rx="3" fill="${primary}" fill-opacity="0.35" />
        </g>
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="100%" height="100%">
        <defs>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primary}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="${secondary}" stop-opacity="0.18"/>
          </linearGradient>
        </defs>
        <rect width="160" height="120" fill="#fafaf9" />
        <g filter="url(#blur)">
          <rect x="73" y="16" width="14" height="10" rx="2" fill="${primary}" fill-opacity="0.35" />
          <path d="M70 26 L90 26 L95 44 L65 44 Z" fill="url(#bottleGrad)" />
          <rect x="58" y="42" width="44" height="64" rx="12" fill="url(#bottleGrad)" />
        </g>
      </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Utility classes that knock out pure/near-white (#fdfdfd–#ffffff) studio JPEG
 * backgrounds via multiply blending + micro highlight clipping, making uploaded
 * white-background product photos blend seamlessly onto any light/gray stage.
 */
export const PRODUCT_STUDIO_IMG_CLASS = 'mix-blend-multiply brightness-[1.02] contrast-[1.02]';

