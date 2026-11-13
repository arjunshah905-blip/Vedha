<?php
/**
 * The template for displaying product content within loops
 *
 * Override for WooCommerce content-product.php
 *
 * @package Vedha
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}
?>
<li <?php wc_product_class( 'vedha-product-card vedha-card bg-white border border-stone-200 rounded-[18px] p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative list-none m-0', $product ); ?>>

	<div>
		<!-- Card Top: Badge -->
		<div class="flex items-center justify-between gap-2 mb-3">
			<span class="text-[10px] font-bold uppercase tracking-wider text-stone-500">
				<?php echo wc_get_product_category_list( $product->get_id(), ', ', '<span class="category-name">', '</span>' ); ?>
			</span>

			<?php vedha_sustainability_badge(); ?>
		</div>

		<!-- Product Image -->
		<a href="<?php the_permalink(); ?>" class="aspect-square rounded-xl overflow-hidden bg-stone-50 flex items-center justify-center mb-4 block group">
			<?php
			if ( has_post_thumbnail() ) {
				the_post_thumbnail( 'woocommerce_thumbnail', array(
					'class'   => 'w-full h-full object-contain group-hover:scale-105 transition-transform duration-300',
					'loading' => 'lazy',
					'alt'     => the_title_attribute( array( 'echo' => false ) ),
				) );
			} else {
				echo '<div class="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 text-xs font-mono">1L / 5L Pack</div>';
			}
			?>
		</a>

		<!-- Product Title -->
		<h2 class="woocommerce-loop-product__title text-base font-bold text-stone-900 leading-snug mb-2">
			<a href="<?php the_permalink(); ?>" class="hover:text-emerald-800 transition-colors">
				<?php the_title(); ?>
			</a>
		</h2>

		<!-- Pack Sizes Supported -->
		<div class="text-[11px] text-stone-500 mb-3 flex items-center gap-1.5 font-mono">
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/></svg>
			<span><?php esc_html_e( '1-Litre & 5-Litre Formats', 'vedha' ); ?></span>
		</div>
	</div>

	<!-- Price & Add to Cart -->
	<div class="pt-4 mt-auto border-t border-stone-100 flex items-center justify-between gap-3">
		<div class="vedha-card-price">
			<?php
			$price_html = $product->get_price_html();
			if ( ! empty( $price_html ) ) {
				echo '<span class="text-sm font-bold text-stone-900 font-mono">' . wp_kses_post( $price_html ) . '</span>';
			} else {
				echo '<span class="text-xs font-mono font-bold text-stone-600">' . esc_html__( '[OWNER TO SET PRICE]', 'vedha' ) . '</span>';
			}
			?>
		</div>

		<div class="vedha-loop-action">
			<?php woocommerce_template_loop_add_to_cart(); ?>
		</div>
	</div>
</li>
