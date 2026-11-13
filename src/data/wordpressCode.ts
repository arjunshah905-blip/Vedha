export const WORDPRESS_IMPLEMENTATION_DATA = {
  customCss: `/* ==============================================================
   VEDHA BRAND REVAMP: Additional CSS (WordPress & WooCommerce)
   Add to: WordPress Admin > Appearance > Customize > Additional CSS
   ============================================================== */

/* 1. Global Typography & Clean Neutral Canvas */
body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  color: #1d1d1f;
  background-color: #f5f5f7;
  line-height: 1.6;
}

h1, h2, h3, h4, .entry-title, .product-title {
  font-family: 'Outfit', sans-serif !important;
  letter-spacing: -0.02em;
  font-weight: 600;
  color: #1d1d1f;
}

/* 2. Universal Product Image Blending (Seamless White-BG Studio Bottles on Any Theme Stage) */
.vedha-product-card .image-wrapper,
.woocommerce ul.products li.product a img,
.woocommerce div.product div.images img {
  isolation: isolate;
}

.vedha-product-card .image-wrapper {
  background: #f5f5f7;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  border-radius: 14px;
}

.vedha-product-card img,
.woocommerce ul.products li.product a img,
.woocommerce div.product div.images img {
  mix-blend-mode: multiply;
  filter: brightness(1.02) contrast(1.02);
  object-fit: contain;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 3. Premium 1L & 5L Product Card Architecture */
.vedha-product-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.vedha-product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px -10px rgba(0, 0, 0, 0.08);
}

.vedha-product-card img {
  max-height: 280px;
  margin: 0 auto;
}

.vedha-product-card:hover img {
  transform: scale(1.03);
}

/* 4. Plant-Based & Biodegradable Verification Badge */
.vedha-badge-plant {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

/* 5. Direct WhatsApp & Wholesale Bulk Quote CTA Buttons */
.vedha-btn-whatsapp {
  background-color: #059669 !important;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.75rem 1.25rem;
  border-radius: 999px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none !important;
  transition: background-color 0.2s ease, transform 0.2s ease;
  width: 100%;
  margin-top: 0.75rem;
}

.vedha-btn-whatsapp:hover {
  background-color: #047857 !important;
}

.vedha-btn-bulk-quote {
  background-color: #1d1d1f !important;
  color: #ffffff !important;
  border: 1px solid rgba(5, 150, 105, 0.35);
  font-weight: 600;
  font-size: 0.825rem;
  padding: 0.65rem 1.15rem;
  border-radius: 999px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none !important;
  transition: background-color 0.2s ease;
  width: 100%;
  margin-top: 0.5rem;
}

.vedha-btn-bulk-quote:hover {
  background-color: #000000 !important;
}

/* 6. Statutory Declarations Table */
.vedha-statutory-panel {
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.vedha-statutory-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.vedha-statutory-table td {
  padding: 0.5rem 0.35rem;
  border-bottom: 1px solid #e2e8f0;
}

/* 7. Mobile Sticky Bottom Action Bar (<15% viewport) */
@media (max-width: 768px) {
  .vedha-mobile-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    border-top: 1px solid #e2e8f0;
    padding: 0.75rem 1rem;
    z-index: 999;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  }
}`,

  functionsPhp: `<?php
/**
 * Vedha Brand Revamp - Safe WordPress & WooCommerce Snippets
 * Location: wp-content/themes/your-child-theme/functions.php (or Code Snippets plugin)
 * Compatible with: Astra, GeneratePress, Kadence, WoodMart & Block Themes (PHP 7.4 - 8.3+)
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Prevent direct file access
}

/**
 * Helper: Build properly percent-encoded WhatsApp click-to-chat URL.
 * Uses rawurlencode() once on the full UTF-8 message so spaces/asterisks/newlines work reliably.
 */
if ( ! function_exists( 'vedha_build_whatsapp_url' ) ) {
    function vedha_build_whatsapp_url( $message, $phone_number = '919876543210' ) {
        $clean_phone = preg_replace( '/[^0-9]/', '', (string) $phone_number );
        return 'https://wa.me/' . $clean_phone . '?text=' . rawurlencode( (string) $message );
    }
}

// 1. Direct WhatsApp Quick Order + Wholesale Bulk Quote on Single Product Pages
add_action( 'woocommerce_after_add_to_cart_button', 'vedha_add_single_product_whatsapp_actions' );
if ( ! function_exists( 'vedha_add_single_product_whatsapp_actions' ) ) {
    function vedha_add_single_product_whatsapp_actions() {
        global $product;
        if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
            return;
        }

        $product_name = wp_strip_all_tags( $product->get_name() );
        $product_url  = get_permalink( $product->get_id() );

        $order_message = sprintf(
            "Hello Vedha Care,\nI would like to order *%s* (1L / 5L pack).\nPlease share availability and delivery timeline.\nProduct Link: %s",
            $product_name,
            $product_url
        );

        $bulk_message = sprintf(
            "Hello Vedha Wholesale Desk,\nI would like to *Request a Bulk Quote* for:\n• %s (1L / 5L Wholesale Cases)\n\nPlease share B2B tier pricing, GST invoice details, and dispatch timeline from Attibele, Bengaluru.",
            $product_name
        );

        echo '<div class="vedha-wc-actions">';
        echo '<a href="' . esc_url( vedha_build_whatsapp_url( $order_message ) ) . '" target="_blank" rel="noopener noreferrer" class="vedha-btn-whatsapp button">'
            . esc_html__( 'Buy / Order on WhatsApp (1L / 5L)', 'vedha' )
            . '</a>';
        echo '<a href="' . esc_url( vedha_build_whatsapp_url( $bulk_message ) ) . '" target="_blank" rel="noopener noreferrer" class="vedha-btn-bulk-quote button">'
            . esc_html__( 'Request Bulk Quote (Wholesale)', 'vedha' )
            . '</a>';
        echo '</div>';
    }
}

// 2. Quick WhatsApp Order Button on Shop / Category Archive Cards
add_action( 'woocommerce_after_shop_loop_item', 'vedha_add_whatsapp_archive_button', 15 );
if ( ! function_exists( 'vedha_add_whatsapp_archive_button' ) ) {
    function vedha_add_whatsapp_archive_button() {
        global $product;
        if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
            return;
        }

        $product_name = wp_strip_all_tags( $product->get_name() );
        $message      = sprintf( 'Hi Vedha Care, I would like to buy *%s* (1L / 5L).', $product_name );
        $wa_url       = vedha_build_whatsapp_url( $message );

        echo '<a href="' . esc_url( $wa_url ) . '" target="_blank" rel="noopener noreferrer" class="button alt" style="margin-top:8px; font-size:12px;">'
            . esc_html__( 'WhatsApp Quick Order', 'vedha' )
            . '</a>';
    }
}

// 3. Wholesale Bulk Quote Generator on WooCommerce Cart + [vedha_bulk_quote] Shortcode
if ( ! function_exists( 'vedha_get_bulk_quote_url' ) ) {
    function vedha_get_bulk_quote_url() {
        $lines = array(
            'Hello Vedha Wholesale Desk,',
            'I would like to *Request a Bulk Quote* for wholesale quantities:',
            '',
        );

        if ( function_exists( 'WC' ) && WC()->cart && ! WC()->cart->is_empty() ) {
            foreach ( WC()->cart->get_cart() as $cart_item ) {
                $item_product = isset( $cart_item['data'] ) ? $cart_item['data'] : null;
                if ( $item_product && is_a( $item_product, 'WC_Product' ) ) {
                    $qty     = isset( $cart_item['quantity'] ) ? absint( $cart_item['quantity'] ) : 1;
                    $lines[] = '• ' . wp_strip_all_tags( $item_product->get_name() ) . ' × ' . $qty;
                }
            }
        } else {
            $lines[] = '• Mixed 1L & 5L Vedha Cleaning Range (Home Care / Automobile Care)';
        }

        $lines[] = '';
        $lines[] = 'Please share wholesale tier pricing, GST invoice details, and dispatch timeline from Attibele, Bengaluru.';

        return vedha_build_whatsapp_url( implode( "\\n", $lines ) );
    }
}

add_action( 'woocommerce_after_cart_totals', 'vedha_render_cart_bulk_quote_button' );
if ( ! function_exists( 'vedha_render_cart_bulk_quote_button' ) ) {
    function vedha_render_cart_bulk_quote_button() {
        echo '<a href="' . esc_url( vedha_get_bulk_quote_url() ) . '" target="_blank" rel="noopener noreferrer" class="vedha-btn-bulk-quote button">'
            . esc_html__( 'Request Bulk Quote via WhatsApp', 'vedha' )
            . '</a>';
    }
}

add_shortcode( 'vedha_bulk_quote', 'vedha_bulk_quote_shortcode' );
if ( ! function_exists( 'vedha_bulk_quote_shortcode' ) ) {
    function vedha_bulk_quote_shortcode( $atts ) {
        $atts = shortcode_atts(
            array(
                'label' => __( 'Request Bulk Quote on WhatsApp', 'vedha' ),
            ),
            $atts,
            'vedha_bulk_quote'
        );

        return '<a href="' . esc_url( vedha_get_bulk_quote_url() ) . '" target="_blank" rel="noopener noreferrer" class="vedha-btn-bulk-quote">'
            . esc_html( $atts['label'] )
            . '</a>';
    }
}

// 4. Add Indian Legal Metrology Statutory Declarations Tab to WooCommerce Product Tabs
add_filter( 'woocommerce_product_tabs', 'vedha_add_statutory_metrology_tab' );
if ( ! function_exists( 'vedha_add_statutory_metrology_tab' ) ) {
    function vedha_add_statutory_metrology_tab( $tabs ) {
        $tabs['vedha_metrology'] = array(
            'title'    => __( 'Legal Metrology & Packaging', 'vedha' ),
            'priority' => 30,
            'callback' => 'vedha_metrology_tab_content',
        );
        return $tabs;
    }
}

if ( ! function_exists( 'vedha_metrology_tab_content' ) ) {
    function vedha_metrology_tab_content() {
        ?>
        <div class="vedha-statutory-panel">
            <h4 style="margin-top:0;"><?php esc_html_e( 'Statutory Declarations (Legal Metrology Rules, India)', 'vedha' ); ?></h4>
            <table class="vedha-statutory-table">
                <tr><td><strong><?php esc_html_e( 'Generic Commodity', 'vedha' ); ?></strong></td><td><?php esc_html_e( 'Liquid Household / Vehicle Cleaning Formulation', 'vedha' ); ?></td></tr>
                <tr><td><strong><?php esc_html_e( 'Net Quantity', 'vedha' ); ?></strong></td><td><?php esc_html_e( '1 Litre (1000 ml) & 5 Litre (5000 ml)', 'vedha' ); ?></td></tr>
                <tr><td><strong><?php esc_html_e( 'Country of Origin', 'vedha' ); ?></strong></td><td><?php esc_html_e( 'India (Formulated & Bottled at Attibele, Bengaluru)', 'vedha' ); ?></td></tr>
                <tr><td><strong><?php esc_html_e( 'Customer Grievance Cell', 'vedha' ); ?></strong></td><td>info@vedha.ind.in | +91 98765 43210</td></tr>
                <tr><td><strong><?php esc_html_e( 'Shelf Life / Best Before', 'vedha' ); ?></strong></td><td><?php esc_html_e( '24 Months from Month of Packaging', 'vedha' ); ?></td></tr>
            </table>
        </div>
        <?php
    }
}`,

  adminChecklist: [
    {
      step: '1. Embed This Interactive App OR Enhance WooCommerce',
      action: 'This Vite app builds with relative asset paths (base: "./"), so you can upload the dist/ folder directly to any WordPress subfolder (e.g. /shop-app/) or embed it via iframe without broken image links—or copy the CSS & PHP kit below straight into your WooCommerce theme.'
    },
    {
      step: '2. 8 Focused SKUs with 1L & 5L Bulk Quote Flow',
      action: 'Use WooCommerce in Direct Order + Wholesale Inquiry mode across all 8 formulations (1 Litre bottles & 5 Litre cans). The [vedha_bulk_quote] shortcode and Cart hook automatically read active cart items into a clean WhatsApp message.'
    },
    {
      step: '3. White-Background Studio Bottle Blending',
      action: 'The updated Additional CSS applies isolation: isolate and mix-blend-mode: multiply to WooCommerce product grids so white-background studio bottle JPEGs blend transparently onto gray or tinted WordPress themes.'
    },
    {
      step: '4. Image Optimization (WebP)',
      action: 'Export bottle photos to WebP under 150 KB each or enable "Converter for Media" (free) in WordPress so archives and gallery zoom load quickly on mobile.'
    },
    {
      step: '5. Caching & Conflict-Free PHP Snippets',
      action: 'All PHP helpers include ABSPATH & function_exists() guards and single-pass rawurlencode() WhatsApp links, safe to paste via the Code Snippets plugin or child theme functions.php.'
    }
  ]
};
