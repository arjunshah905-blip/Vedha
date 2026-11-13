<?php
/**
 * WooCommerce Custom Hooks & Integration
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WooCommerce' ) ) {
	return;
}

/**
 * Remove default WooCommerce wrappers and replace with Vedha responsive container
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );

function vedha_woocommerce_wrapper_before() {
	echo '<main id="primary" class="site-main vedha-shop-main py-8">';
	echo '<div class="vedha-container">';
	vedha_breadcrumbs();
}
add_action( 'woocommerce_before_main_content', 'vedha_woocommerce_wrapper_before', 10 );

function vedha_woocommerce_wrapper_after() {
	echo '</div>'; // .vedha-container
	echo '</main>';
}
add_action( 'woocommerce_after_main_content', 'vedha_woocommerce_wrapper_after', 10 );

/**
 * Custom product card hook in loop: add plant-based badge above title
 */
function vedha_wc_loop_plant_badge() {
	global $product;
	if ( $product ) {
		vedha_sustainability_badge( $product->get_id() );
	}
}
add_action( 'woocommerce_shop_loop_item_title', 'vedha_wc_loop_plant_badge', 5 );

/**
 * AJAX update for header cart count fragment
 */
function vedha_header_add_to_cart_fragment( $fragments ) {
	ob_start();
	$count = WC()->cart->get_cart_contents_count();
	?>
	<span class="vedha-cart-count" id="vedha-cart-badge"><?php echo esc_html( $count ); ?></span>
	<?php
	$fragments['#vedha-cart-badge'] = ob_get_clean();
	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'vedha_header_add_to_cart_fragment' );

/**
 * Add custom Legal Metrology statutory declaration tab to single product pages
 */
function vedha_custom_product_tabs( $tabs ) {
	$tabs['vedha_statutory'] = array(
		'title'    => __( 'Statutory & Packaging Info', 'vedha' ),
		'priority' => 30,
		'callback' => 'vedha_statutory_tab_content',
	);
	$tabs['vedha_how_to_use'] = array(
		'title'    => __( 'Directions for Use', 'vedha' ),
		'priority' => 20,
		'callback' => 'vedha_how_to_use_tab_content',
	);
	return $tabs;
}
add_filter( 'woocommerce_product_tabs', 'vedha_custom_product_tabs' );

function vedha_statutory_tab_content() {
	global $product;
	?>
	<div class="vedha-statutory-panel text-xs text-stone-700 space-y-3">
		<h3 class="text-base font-bold text-stone-900"><?php esc_html_e( 'Legal Metrology Declarations (Packaged Commodities Rules, 2011)', 'vedha' ); ?></h3>
		<p><?php esc_html_e( 'Manufactured & Packaged by: Vedha Consumer Solutions Pvt. Ltd., Attibele Industrial Area, Bangalore, Karnataka - 562107.', 'vedha' ); ?></p>
		<ul class="list-disc pl-5 space-y-1">
			<li><strong><?php esc_html_e( 'Net Volume / Quantity:', 'vedha' ); ?></strong> 1 Litre (1000 ml) standard / 5 Litres bulk refill can.</li>
			<li><strong><?php esc_html_e( 'Country of Origin:', 'vedha' ); ?></strong> India</li>
			<li><strong><?php esc_html_e( 'Consumer Grievance Care:', 'vedha' ); ?></strong> info@vedha.ind.in</li>
			<li><strong><?php esc_html_e( 'Best Before:', 'vedha' ); ?></strong> 24 months from manufacturing date</li>
		</ul>
	</div>
	<?php
}

function vedha_how_to_use_tab_content() {
	?>
	<div class="vedha-usage-panel text-xs text-stone-700 space-y-2">
		<h3 class="text-base font-bold text-stone-900"><?php esc_html_e( 'Recommended Application & Dilution', 'vedha' ); ?></h3>
		<p><?php esc_html_e( 'Follow recommended dilutions for optimal surface safety and highest yield per bottle.', 'vedha' ); ?></p>
		<p class="text-stone-500 italic"><?php esc_html_e( 'Refer to product bottle label for specific batch-level dilution instructions.', 'vedha' ); ?></p>
	</div>
	<?php
}
