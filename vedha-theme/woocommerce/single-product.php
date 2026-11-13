<?php
/**
 * The Template for displaying all single products
 *
 * Override for WooCommerce single-product.php
 *
 * @package Vedha
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 */
do_action( 'woocommerce_before_main_content' );
?>

<div class="vedha-single-product-page py-10 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<?php
		while ( have_posts() ) :
			the_post();
			global $product;
			?>
			<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'vedha-product-layout grid grid-cols-1 lg:grid-cols-12 gap-12 items-start', $product ); ?>>

				<!-- Product Image Gallery (6 Cols) -->
				<div class="lg:col-span-6 space-y-4">
					<div class="vedha-gallery-container bg-stone-50 rounded-[20px] p-6 border border-stone-200">
						<?php
						/**
						 * Hook: woocommerce_before_single_product_summary.
						 *
						 * @hooked woocommerce_show_product_sale_flash - 10
						 * @hooked woocommerce_show_product_images - 20
						 */
						do_action( 'woocommerce_before_single_product_summary' );
						?>
					</div>
				</div>

				<!-- Product Summary / Purchasing (6 Cols) -->
				<div class="lg:col-span-6 space-y-6">
					<!-- Badges & Category -->
					<div class="flex items-center justify-between gap-2 flex-wrap">
						<span class="text-xs font-bold uppercase tracking-wider text-stone-500">
							<?php echo wc_get_product_category_list( $product->get_id(), ', ', '<span class="category-name">', '</span>' ); ?>
						</span>
						<?php vedha_sustainability_badge(); ?>
					</div>

					<!-- Title -->
					<h1 class="product_title entry-title text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
						<?php the_title(); ?>
					</h1>

					<!-- Pack Sizes Highlight -->
					<div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
						<span class="font-bold text-stone-800"><?php esc_html_e( 'Available Pack Sizes:', 'vedha' ); ?></span>
						<span class="font-mono text-emerald-800 font-semibold"><?php esc_html_e( '1-Litre Bottle & 5-Litre Bulk Can', 'vedha' ); ?></span>
					</div>

					<!-- Price -->
					<div class="vedha-single-price text-2xl font-bold font-mono text-stone-900">
						<?php
						$price_html = $product->get_price_html();
						if ( ! empty( $price_html ) ) {
							echo wp_kses_post( $price_html );
						} else {
							echo '<span class="text-sm text-stone-500">' . esc_html__( 'Price: [OWNER TO SET PRICE]', 'vedha' ) . '</span>';
						}
						?>
					</div>

					<!-- Short Description / Key Active Mechanism -->
					<div class="woocommerce-product-details__short-description text-xs sm:text-sm text-stone-600 leading-relaxed">
						<?php woocommerce_template_single_excerpt(); ?>
					</div>

					<!-- Add to Cart / Variations -->
					<div class="pt-4 border-t border-stone-100">
						<?php woocommerce_template_single_add_to_cart(); ?>
					</div>

					<!-- Direct Factory Trust Bar -->
					<div class="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-[11px] text-stone-600">
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
							<span>Direct Bangalore Lab Dispatch</span>
						</div>
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
							<span>Induction Heat-Sealed Bottle</span>
						</div>
					</div>

					<!-- Meta -->
					<div class="product_meta pt-2 text-[11px] text-stone-500 space-y-1">
						<?php woocommerce_template_single_meta(); ?>
					</div>
				</div>
			</div>

			<!-- Product Details & Custom Tabs (Dilution, Legal Metrology, Reviews) -->
			<div class="mt-16 pt-10 border-t border-stone-200">
				<?php
				/**
				 * Hook: woocommerce_after_single_product_summary.
				 *
				 * @hooked woocommerce_output_product_data_tabs - 10
				 * @hooked woocommerce_upsell_display - 15
				 * @hooked woocommerce_output_related_products - 20
				 */
				do_action( 'woocommerce_after_single_product_summary' );
				?>
			</div>
		<?php endwhile; ?>
	</div>
</div>

<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );

get_footer( 'shop' );
