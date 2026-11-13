<?php
/**
 * Template part for displaying static product cards
 * Used on front-page.php and shop fallback when WooCommerce products are not yet seeded.
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$static_products = array(
	array(
		'title'       => __( 'Dishwashing Liquid', 'vedha' ),
		'category'    => __( 'Home Care', 'vedha' ),
		'sizes'       => '1L Bottle & 5L Refill Can',
		'badge'       => __( 'Plant-Based & Biodegradable', 'vedha' ),
		'badge_type'  => 'green',
		'description' => __( 'Concentrated natural degreaser derived from coconut and sugarcane extracts. Tough on Indian oil and turmeric stains, gentle on hands.', 'vedha' ),
		'dilution'    => '1:10 (5 ml in 50 ml water)',
		'price'       => '₹199 (MRP ₹299)',
	),
	array(
		'title'       => __( 'Liquid Laundry Detergent', 'vedha' ),
		'category'    => __( 'Home Care', 'vedha' ),
		'sizes'       => '1L Bottle & 5L Refill Can',
		'badge'       => __( 'Multi-Enzyme Care', 'vedha' ),
		'badge_type'  => 'neutral',
		'description' => __( 'High-efficiency liquid detergent for top & front load washing machines. Dissolves grease, tea, and curry stains without color fading or salt residue.', 'vedha' ),
		'dilution'    => '40 ml for regular load (6–8 kg)',
		'price'       => '₹299 (MRP ₹349)',
	),
	array(
		'title'       => __( 'Floor Cleaner', 'vedha' ),
		'category'    => __( 'Home Care', 'vedha' ),
		'sizes'       => '1L Bottle & 5L Refill Can',
		'badge'       => __( 'Plant-Based & Biodegradable', 'vedha' ),
		'badge_type'  => 'green',
		'description' => __( 'Herbal multi-surface liquid cleaner for marble, granite, vitrified tile, and hardwood floors. Toddler & pet-safe formulation that dries streak-free.', 'vedha' ),
		'dilution'    => '1:250 (20 ml per 5L bucket)',
		'price'       => '₹219 (MRP ₹249)',
	),
	array(
		'title'       => __( 'Liquid Hand Wash', 'vedha' ),
		'category'    => __( 'Home Care', 'vedha' ),
		'sizes'       => '1L Bottle & 5L Refill Can',
		'badge'       => __( 'Plant-Based & Biodegradable', 'vedha' ),
		'badge_type'  => 'green',
		'description' => __( 'Gentle moisturizing hand wash formulated with vegetable glycerin and plant surfactants. pH 5.5 skin-balanced to prevent dryness after frequent washes.', 'vedha' ),
		'dilution'    => 'Ready to use via pump dispenser',
		'price'       => '₹239 (MRP ₹279)',
	),
	array(
		'title'       => __( 'Car Shampoo', 'vedha' ),
		'category'    => __( 'Automobile Care', 'vedha' ),
		'sizes'       => '1L Bottle & 5L Studio Can',
		'badge'       => __( 'pH 7 Neutral / Anti-Swirl', 'vedha' ),
		'badge_type'  => 'blue',
		'description' => __( 'High-lubricity pH-neutral contact wash shampoo. Encapsulates road grime and brake dust to prevent wash marring on clear coats, PPF, and ceramic coatings.', 'vedha' ),
		'dilution'    => '1:300 (30 ml per 10L wash bucket)',
		'price'       => '₹379 (MRP ₹449)',
	),
	array(
		'title'       => __( 'Car Foam Wash', 'vedha' ),
		'category'    => __( 'Automobile Care', 'vedha' ),
		'sizes'       => '1L Bottle & 5L Studio Can',
		'badge'       => __( 'Snow Foam Cannon Wash', 'vedha' ),
		'badge_type'  => 'blue',
		'description' => __( 'Dense hyper-cling snow foam formulation designed for pressure washers and foam lances. Lifts mud, road film, and bugs before contact washing.', 'vedha' ),
		'dilution'    => '1:9 in foam cannon lance (100 ml + 900 ml)',
		'price'       => '₹449 (MRP ₹549)',
	),
);
?>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
	<?php foreach ( $static_products as $item ) : ?>
		<article class="vedha-card p-6 bg-white border border-stone-200 rounded-[18px] flex flex-col justify-between hover:shadow-md transition-shadow">
			<div class="space-y-3">
				<!-- Category & Eco Badge -->
				<div class="flex items-center justify-between gap-2 flex-wrap">
					<span class="text-[11px] font-bold uppercase tracking-wider text-stone-500">
						<?php echo esc_html( $item['category'] ); ?>
					</span>
					<?php if ( 'green' === $item['badge_type'] ) : ?>
						<span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-[var(--vedha-green-light)] text-[var(--vedha-green)] px-2 py-0.5 rounded-full">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<?php echo esc_html( $item['badge'] ); ?>
						</span>
					<?php elseif ( 'blue' === $item['badge_type'] ) : ?>
						<span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-sky-50 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<?php echo esc_html( $item['badge'] ); ?>
						</span>
					<?php else : ?>
						<span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full">
							<?php echo esc_html( $item['badge'] ); ?>
						</span>
					<?php endif; ?>
				</div>

				<!-- Product Title -->
				<h3 class="text-xl font-bold text-stone-900 leading-snug">
					<?php echo esc_html( $item['title'] ); ?>
				</h3>

				<!-- Description -->
				<p class="text-xs text-stone-600 leading-relaxed">
					<?php echo esc_html( $item['description'] ); ?>
				</p>

				<!-- Pack Sizes & Dilution Spec Box -->
				<div class="p-3 bg-stone-50 rounded-xl space-y-1.5 text-[11px] text-stone-600 border border-stone-100">
					<div><strong class="text-stone-800"><?php esc_html_e( 'Sizes:', 'vedha' ); ?></strong> <?php echo esc_html( $item['sizes'] ); ?></div>
					<div><strong class="text-stone-800"><?php esc_html_e( 'Dilution:', 'vedha' ); ?></strong> <span class="font-mono"><?php echo esc_html( $item['dilution'] ); ?></span></div>
				</div>
			</div>

			<!-- Price & Order Action -->
			<div class="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-3">
				<div>
					<span class="text-[10px] uppercase text-stone-400 block font-bold"><?php esc_html_e( 'Price (MRP)', 'vedha' ); ?></span>
					<span class="text-xs font-mono font-bold text-stone-700"><?php echo esc_html( $item['price'] ); ?></span>
				</div>
				<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-3.5">
					<?php esc_html_e( 'Buy / Order Now', 'vedha' ); ?>
				</a>
			</div>
		</article>
	<?php endforeach; ?>
</div>
