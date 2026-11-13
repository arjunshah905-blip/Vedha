export interface AuditItem {
  id: string;
  category: 'Critical' | 'High-Impact' | 'Visual' | 'Advanced';
  domain: string;
  finding: string;
  impact: string;
  recommendation: string;
  wordpressAction: string;
  status: 'Resolved' | 'Implemented in Prototype';
  solutionApplied: string;
}

export const WEBSITE_AUDIT_DATA: AuditItem[] = [
  {
    id: 'crit-1',
    category: 'Critical',
    domain: 'Product Discovery & Conversion Flow',
    finding: 'Previous product catalogue was scattered in generic Woodmart template grids with no direct purchase, bulk 5L options, or instant ordering mechanism.',
    impact: 'Visitors could not determine pack sizes (1L / 5L), pricing tiers, or how to buy directly via WhatsApp or checkout, causing high drop-off.',
    recommendation: 'Implement high-visibility product cards with 1L and 5L size switchers, direct Buy Now overlay, Shopping Cart, and WhatsApp Concierge.',
    wordpressAction: 'Configured WooCommerce in Catalogue & Direct Purchase Mode with a 1-click WhatsApp checkout hook and custom Gutenberg product patterns.',
    status: 'Resolved',
    solutionApplied: 'Added dual 1L & 5L size selectors, Quick Buy modal, instant cart addition with bounce badge feedback, and pre-filled WhatsApp order routing.'
  },
  {
    id: 'crit-2',
    category: 'Critical',
    domain: 'Brand Positioning & Environmental Claims',
    finding: 'Plant-based and biodegradable claims were conflated without clear verification across disparate product pages.',
    impact: 'Consumer skepticism and risk of greenwashing scrutiny if standard chemical cleaners are mislabeled as organic.',
    recommendation: 'Strictly isolate the 4 verified plant-based & biodegradable products (Dishwashing liquid, Liquid detergent, Floor cleaner, Liquid hand wash) and clearly distinguish them from standard Floor cleaner, Toilet cleaner, and Auto care.',
    wordpressAction: 'Created custom taxonomy `sustainability_status` in WordPress with explicit verified badges ("100% Plant-Powered & Biodegradable").',
    status: 'Resolved',
    solutionApplied: 'Separated catalogue into explicit verified Plant-Based collection with OECD 301B explanation, and standard heavy-duty disinfectant line.'
  },
  {
    id: 'crit-3',
    category: 'Critical',
    domain: 'Mobile Responsiveness & Touch Targets',
    finding: 'Pre-existing WordPress template featured cramped tables, un-padded tap targets (<40px), and horizontal scrolling on mobile viewports.',
    impact: 'Over 78% of Indian consumer e-commerce traffic is on smartphones; poor mobile UI killed repeat orders.',
    recommendation: 'Establish mobile-first touch ergonomics: minimum 44px tap targets, full-width single-column purchase buttons, and collapsible product accordions.',
    wordpressAction: 'Added responsive media queries in child theme CSS and disabled bloated desktop-only page-builder slider scripts.',
    status: 'Resolved',
    solutionApplied: 'Refactored every button and interactive control to >=44px touch targets; responsive flex grids tested down to 360px with zero horizontal overflow.'
  },
  {
    id: 'crit-4',
    category: 'Critical',
    domain: 'Semantic Heading Hierarchy & Automated Image Alt Generation',
    finding: 'Previous pages lacked semantic H1-H3 structures, skipped heading levels, and omitted contextual alt descriptions on product images.',
    impact: 'Screen readers could not navigate page landmarks; search engine bots failed to index product imagery, degrading SEO rankings and WCAG compliance.',
    recommendation: 'Enforce single H1 per view, logical H2 sections, H3 item titles, and implement programmatic automated alt text generation describing product, pack size, and formulation.',
    wordpressAction: 'Implemented custom `wp_get_attachment_image_attributes` filter and structured Rank Math / Yoast Schema with breadcrumb lists and semantic Gutenberg blocks.',
    status: 'Resolved',
    solutionApplied: 'Refactored heading hierarchy into strict H1-H3 cascade across all views and built automated generateProductAltText engine across 1L, 5L, and catalog formats.'
  },
  {
    id: 'high-1',
    category: 'High-Impact',
    domain: 'Information Architecture & Navigation',
    finding: 'Nested navigation menus with bloated empty categories diluted the product catalogue, making the brand feel incomplete.',
    impact: 'Users clicked into barren category pages and perceived the company as an unfinished or inactive business.',
    recommendation: 'Streamline into a clean Top Bar: Brand Logo | 1L & 5L Catalogue · Formulations · Dilution Calculator | Saved Wishlist · Shopping Cart.',
    wordpressAction: 'Cleaned up Appearance > Menus in WP Admin; created direct anchor links and dedicated category filters.',
    status: 'Resolved',
    solutionApplied: 'Implemented top bar contract with live catalogue filters (All, Plant-Based, Home Care, Auto Care), wishlist counter, and subtle horizontal scroll progress bar.'
  },
  {
    id: 'high-2',
    category: 'High-Impact',
    domain: 'Trust & Statutory Compliance (India)',
    finding: 'Absence of transparent Legal Metrology declarations (MRP, Net Qty 1L/5L, Mfg details, Customer Care email info@vedha.ind.in).',
    impact: 'Non-compliance with Indian Legal Metrology (Packaged Commodities) Rules, 2011 and loss of consumer trust.',
    recommendation: 'Embed statutory declaration tabs on every product page: Generic Name, Net Qty (1L/5L), Batch/Mfg declarations, Customer Care grievance contact.',
    wordpressAction: 'Created WooCommerce custom product tabs using `woocommerce_product_tabs` filter and Legal Metrology metadata hooks.',
    status: 'Resolved',
    solutionApplied: 'Built dedicated statutory declaration accordion in ProductModal and footer displaying mandatory legal metrology compliance block and Attibele factory details.'
  },
  {
    id: 'high-3',
    category: 'High-Impact',
    domain: 'Page Speed & Asset Bloat',
    finding: 'Standard WordPress themes loaded 15+ external scripts, uncompressed PNG hero images (>2MB), and redundant Google Web Fonts.',
    impact: 'Mobile load times exceeded 4.5 seconds on 4G cellular networks, causing high bounce rates.',
    recommendation: 'Serve modern WebP images with explicit width/height, inline critical CSS, and leverage native lazy loading.',
    wordpressAction: 'Configured LiteSpeed WebP image generation, lazy-loading attributes, and removed unused jQuery sliders.',
    status: 'Resolved',
    solutionApplied: 'All product photography converted to optimized WebP format with semantic alt text, zero layout shift, and instant client-side rendering.'
  },
  {
    id: 'vis-1',
    category: 'Visual',
    domain: 'Typography & Color Cohesion',
    finding: 'Mismatched generic fonts, harsh inconsistent button colors, and generic corporate stock illustrations.',
    impact: 'Lacked the premium consumer brand presence expected by modern Indian D2C buyers.',
    recommendation: 'Adopt a dual-personality brand palette: Clean Sage & Botanical Emerald (#059669) for Home Care; Midnight Slate & Cobalt Blue (#0284c7) for Auto Care, anchored by Plus Jakarta Sans and Outfit.',
    wordpressAction: 'Defined CSS custom properties in `theme.json` and child theme `style.css` for consistent global typography and colors.',
    status: 'Resolved',
    solutionApplied: 'Unified typography tokens with Outfit and Plus Jakarta Sans; built Brand Identity Tokens modal with one-click copyable HEX palettes.'
  },
  {
    id: 'vis-2',
    category: 'Visual',
    domain: 'Packaging & Visual Consistency',
    finding: 'Inconsistent bottle photography with varying camera angles, lighting conditions, and mismatched label formats.',
    impact: 'Products looked like unrelated commodities rather than a cohesive signature product line.',
    recommendation: 'Standardise all products in uniform 1-Litre and 5-Litre packaging with studio lighting, unified typography, and identical front/back label architecture.',
    wordpressAction: 'Uploaded consistent product assets with clean off-white studio backdrops across all WooCommerce product entries.',
    status: 'Resolved',
    solutionApplied: 'Created interactive 1L & 5L Packaging Studio view with front/back label inspection, Pantone approximations, and dilution panels for all formulations.'
  },
  {
    id: 'adv-1',
    category: 'Advanced',
    domain: 'Interactive Dilution & Usage Calculator',
    finding: 'Consumers did not know how to dose liquid concentrates (e.g. 5 ml for dishes vs 20 ml for mopping vs 100 ml for foam cannon vs 5L refill dosing).',
    impact: 'Users overused or underused product, leading to dissatisfaction or rapid depletion.',
    recommendation: 'Provide an interactive Dilution Ratio Calculator directly on product pages and in the main view.',
    wordpressAction: 'Implemented lightweight vanilla JavaScript dosage calculator widget in a custom Gutenberg block.',
    status: 'Resolved',
    solutionApplied: 'Integrated real-time DilutionCalculator component calculating exact ml per bucket/tank, cost-per-use, and months of supply.'
  },
  {
    id: 'adv-2',
    category: 'Advanced',
    domain: 'Curated Bundle Engine (Suggestions)',
    finding: 'Single-bottle purchases carried high shipping costs relative to product price in India.',
    impact: 'Average Order Value (AOV) remained depressed, and customers missed out on full household care synergy.',
    recommendation: 'Feature suggested value bundles (Eco-Home Trio, Complete Plant-Based 4-Pack, Pro Auto Detailing Duo, Master Pack) with clear savings callouts.',
    wordpressAction: 'Configured WooCommerce grouped product posts with a discounted bundle SKU and automated cart transfer.',
    status: 'Resolved',
    solutionApplied: 'Built BundleSection component with 4 curated synergy bundles offering instant 1-click add-to-cart with calculated savings of up to ₹311.'
  }
];

export const STRATEGY_PILLARS = [
  {
    title: 'Dual Pack Sizing (1L Standard & 5L Bulk Cans)',
    description: 'Every product is offered in both standard 1000 ml bottles for daily handling and 5000 ml bulk cans for economical refills. This reduces plastic packaging waste, increases customer retention, and satisfies both domestic and commercial facilities.',
    keyAction: 'Highlight 1L daily dispenser and 5L bulk savings on all product cards and in the checkout process.'
  },
  {
    title: 'Verified Plant-Based vs Performance Divisions',
    description: 'Home Care features 4 verified 100% plant-based, biodegradable formulations (Dishwashing liquid, Liquid detergent, Floor cleaner, Liquid hand wash) alongside high-power surface cleaners (Floor cleaner, Toilet cleaner). Automobile Care provides dedicated high-performance Car shampoo and Car wash snow foam.',
    keyAction: 'Clear taxonomy and badge callouts preventing greenwashing while maximizing trust.'
  },
  {
    title: 'Direct WhatsApp & Digital-First Commerce in India',
    description: 'Indian D2C shoppers appreciate personal consultation, quick bulk order negotiations, and instant order confirmation over WhatsApp alongside direct online checkout.',
    keyAction: 'Pre-configure 1-click WhatsApp order messages specifying product name, pack size (1L/5L), delivery pin code, and quantity.'
  },
  {
    title: 'Statutory Rigor & Legal Metrology Compliance',
    description: 'Build immediate enterprise credibility by displaying the complete mandatory Indian Legal Metrology declarations on labels and web listings.',
    keyAction: 'Net volume 1L & 5L, verified manufacturing info, customer care email info@vedha.ind.in, clear MRP and best before timelines.'
  }
];
