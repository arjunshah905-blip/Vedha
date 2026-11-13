<?php
/**
 * The Template for displaying product archives, including the main shop page
 *
 * Loops through the 8 Vedha product categories using native WordPress query loops,
 * and ensures the shop page and category headers are fully editable via the Gutenberg editor.
 *
 * @package Vedha
 * @version 1.0.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10
 */
do_action( 'woocommerce_before_main_content' );
?>

<div class="vedha-shop-archive py-8">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<!-- Archive Header -->
		<header class="woocommerce-products-header mb-8 pb-6 border-b border-stone-200">
			<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
				<h1 class="woocommerce-products-header__title page-title text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
					<?php woocommerce_page_title(); ?>
				</h1>
			<?php endif; ?>

			<?php
			/**
			 * Hook: woocommerce_archive_description.
			 *
			 * @hooked woocommerce_taxonomy_archive_description - 10
			 * @hooked woocommerce_product_archive_description - 10
			 */
			do_action( 'woocommerce_archive_description' );
			?>

			<!-- Division Filter Navigation -->
			<nav class="flex items-center gap-2 flex-wrap pt-4" aria-label="<?php esc_attr_e( 'Category Divisions', 'vedha' ); ?>">
				<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="px-3.5 py-1.5 rounded-full text-xs font-semibold <?php echo ( is_shop() && ! is_product_category() ) ? 'bg-stone-900 text-white' : 'bg-white border border-stone-300 text-stone-700 hover:border-stone-900'; ?> transition-colors">
					<?php esc_html_e( 'All 8 Formulations', 'vedha' ); ?>
				</a>
				<a href="<?php echo esc_url( home_url( '/product-category/home-care' ) ); ?>" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:border-emerald-800 hover:text-emerald-800 transition-colors">
					<?php esc_html_e( 'Home Care Range', 'vedha' ); ?>
				</a>
				<a href="<?php echo esc_url( home_url( '/product-category/automobile-care' ) ); ?>" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:border-sky-800 hover:text-sky-800 transition-colors">
					<?php esc_html_e( 'Automobile Care Range', 'vedha' ); ?>
				</a>
			</nav>
		</header>

		<?php
		/**
		 * 1. GUTENBERG BLOCK CONTENT INTEGRATION
		 * If the shop page is edited in the Gutenberg editor, render block content here.
		 * Supports Gutenberg Block Query Loops, Gutenberg Cover/Hero banners, Media & Text, etc.
		 */
		if ( is_shop() && ! is_search() ) {
			$shop_page_id = wc_get_page_id( 'shop' );
			if ( $shop_page_id > 0 ) {
				$shop_post = get_post( $shop_page_id );
				if ( $shop_post && ! empty( trim( $shop_post->post_content ) ) ) {
					echo '<div class="vedha-gutenberg-editor-area entry-content mb-12 prose prose-stone max-w-none">';
					// Runs through Gutenberg block parser and shortcodes
					echo apply_filters( 'the_content', $shop_post->post_content );
					echo '</div>';
				}
			}
		}
		?>

		<?php
		/**
		 * 2. 8 VEDHA PRODUCT CATEGORIES SECTION
		 * The 8 canonical product categories manufactured by Vedha in Bangalore (1L & 5L sizes).
		 */
		$vedha_8_categories = array(
			array(
				'slug'        => 'plant-based-dishwashing-liquid',
				'name'        => __( 'Plant-based Dish washing liquid', 'vedha' ),
				'division'    => __( 'Home Care', 'vedha' ),
				'plant_based' => true,
				'description' => __( 'Concentrated natural degreaser derived from coconut & sugarcane surfactants. Leaves glassware and stainless steel streak-free.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Refill Can',
				'dilution'    => '1:10 (5 ml in 50 ml water)',
			),
			array(
				'slug'        => 'plant-based-liquid-detergent',
				'name'        => __( 'Plant-based Liquid detergent', 'vedha' ),
				'division'    => __( 'Home Care', 'vedha' ),
				'plant_based' => false, // Only Dishwashing, Floor cleaner and Hand wash are verified plant-based & biodegradable
				'description' => __( 'High-efficiency enzymatic detergent engineered for top and front load washing machines. Tough on turmeric and curry stains.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Refill Can',
				'dilution'    => '40 ml for regular laundry load (6–8 kg)',
			),
			array(
				'slug'        => 'plant-based-floor-cleaner',
				'name'        => __( 'Plant-based Floor cleaner', 'vedha' ),
				'division'    => __( 'Home Care', 'vedha' ),
				'plant_based' => true,
				'description' => __( 'Herbal surface shine formulation safe for toddlers and pets. Suitable for marble, granite, vitrified tile, and hardwood.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Refill Can',
				'dilution'    => '1:250 (20 ml per 5L mop bucket)',
			),
			array(
				'slug'        => 'plant-based-liquid-hand-wash',
				'name'        => __( 'Plant-based Liquid hand wash', 'vedha' ),
				'division'    => __( 'Home Care', 'vedha' ),
				'plant_based' => true,
				'description' => __( 'Moisturizing formula with vegetable glycerin and skin-compatible pH 5.5. Prevents epidermal barrier dryness.', 'vedha' ),
				'sizes'       => '1L Dispenser & 5L Refill Can',
				'dilution'    => 'Ready to use via pump dispenser',
			),
			array(
				'slug'        => 'floor-cleaner',
				'name'        => __( 'Floor cleaner', 'vedha' ),
				'division'    => __( 'Home Care', 'vedha' ),
				'plant_based' => false,
				'description' => __( 'Heavy-traffic citrus disinfectant and degreasing liquid formulation for commercial lobbies and kitchens.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Refill Can',
				'dilution'    => '1:200 for regular mopping',
			),
			array(
				'slug'        => 'toilet-cleaner',
				'name'        => __( 'Toilet cleaner', 'vedha' ),
				'division'    => __( 'Home Care', 'vedha' ),
				'plant_based' => false,
				'description' => __( 'High-viscosity limescale and uric acid descaling formulation with precision curved dispensing neck for rim coverage.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Bulk Can',
				'dilution'    => 'Direct application, 10 min dwell before brushing',
			),
			array(
				'slug'        => 'car-shampoo',
				'name'        => __( 'Car shampoo', 'vedha' ),
				'division'    => __( 'Automobile Care', 'vedha' ),
				'plant_based' => false,
				'description' => __( 'pH 7 neutral high-lubricity contact wash shampoo. Encapsulates road grit to prevent wash marring on clear coats and ceramic coatings.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Studio Can',
				'dilution'    => '1:300 (30 ml in 10L wash bucket)',
			),
			array(
				'slug'        => 'car-wash-shampoo',
				'name'        => __( 'Car foam wash', 'vedha' ),
				'division'    => __( 'Automobile Care', 'vedha' ),
				'plant_based' => false,
				'description' => __( 'Hyper-cling snow foam cannon wash formulated for pressure lances. High dwell time loosens traffic film before contact washing.', 'vedha' ),
				'sizes'       => '1L Bottle & 5L Studio Can',
				'dilution'    => '1:9 in foam lance (100 ml + 900 ml water)',
			),
		);
		?>

		<!-- 8 Category Grid with Native WordPress Query Loops -->
		<section class="vedha-category-loops-section space-y-12">
			<div class="border-b border-stone-200 pb-4">
				<h2 class="text-xl sm:text-2xl font-bold text-stone-900">
					<?php esc_html_e( 'Formulation Categories (1-Litre & 5-Litre Formats)', 'vedha' ); ?>
				</h2>
				<p class="text-xs text-stone-600 mt-1">
					<?php esc_html_e( 'Browse all 8 dedicated liquid care lines formulated at our Bangalore facility.', 'vedha' ); ?>
				</p>
			</div>

			<div class="space-y-12">
				<?php foreach ( $vedha_8_categories as $cat_index => $cat_data ) : ?>
					<?php
					// Query native WooCommerce products assigned to this category
					$cat_query_args = array(
						'post_type'      => 'product',
						'posts_per_page' => 4,
						'status'         => 'publish',
						'tax_query'      => array(
							array(
								'taxonomy'         => 'product_cat',
								'field'            => 'slug',
								'terms'            => array( $cat_data['slug'], sanitize_title( $cat_data['name'] ) ),
								'operator'         => 'IN',
								'include_children' => true,
							),
						),
					);

					$cat_query = new WP_Query( $cat_query_args );
					?>

					<div class="vedha-category-block bg-white p-6 sm:p-8 rounded-[20px] border border-stone-200">
						<!-- Category Header Row -->
						<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
							<div class="space-y-1">
								<div class="flex items-center gap-2">
									<span class="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
										<?php echo esc_html( $cat_data['division'] ); ?>
									</span>

									<?php if ( $cat_data['plant_based'] ) : ?>
										<span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-[var(--vedha-green-light)] text-[var(--vedha-green)] px-2.5 py-0.5 rounded-full">
											<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
											<?php esc_html_e( 'Plant-Based & Biodegradable', 'vedha' ); ?>
										</span>
									<?php endif; ?>
								</div>

								<h3 class="text-xl font-bold text-stone-900">
									<?php echo esc_html( $cat_data['name'] ); ?>
								</h3>
								<p class="text-xs text-stone-600 max-w-2xl leading-relaxed">
									<?php echo esc_html( $cat_data['description'] ); ?>
								</p>
							</div>

							<div class="text-left sm:text-right text-xs shrink-0">
								<div class="font-mono font-bold text-stone-800"><?php echo esc_html( $cat_data['sizes'] ); ?></div>
								<div class="text-[11px] text-stone-500 font-mono"><?php echo esc_html( $cat_data['dilution'] ); ?></div>
							</div>
						</div>

						<!-- Native WordPress Query Loop -->
						<?php if ( $cat_query->have_posts() ) : ?>
							<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								<?php
								while ( $cat_query->have_posts() ) :
									$cat_query->the_post();
									wc_get_template_part( 'content', 'product' );
								endwhile;
								wp_reset_postdata();
								?>
							</div>
						<?php else : ?>
							<!-- Graceful Fallback Card when Products have not yet been published in WP Dashboard -->
							<div class="vedha-card p-6 bg-stone-50 border border-stone-200 rounded-[16px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
								<div class="space-y-2">
									<div class="text-sm font-bold text-stone-900">
										<?php echo esc_html( $cat_data['name'] ); ?> — <?php esc_html_e( '1000 ml & 5000 ml Packs', 'vedha' ); ?>
									</div>
									<div class="text-xs text-stone-600 flex flex-wrap items-center gap-4">
										<span><strong><?php esc_html_e( 'Active Dilution:', 'vedha' ); ?></strong> <span class="font-mono"><?php echo esc_html( $cat_data['dilution'] ); ?></span></span>
										<span>&bull;</span>
										<span><strong><?php esc_html_e( 'Packaging:', 'vedha' ); ?></strong> <?php echo esc_html( $cat_data['sizes'] ); ?></span>
									</div>
								</div>

								<div class="flex items-center gap-4 shrink-0">
									<div class="text-left md:text-right">
										<span class="text-[10px] uppercase text-stone-400 block font-bold"><?php esc_html_e( 'Price (MRP)', 'vedha' ); ?></span>
										<span class="text-xs font-mono font-bold text-stone-700"><?php esc_html_e( '[OWNER TO SET PRICE]', 'vedha' ); ?></span>
									</div>
									<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-4">
										<?php esc_html_e( 'Enquire / Order', 'vedha' ); ?>
									</a>
								</div>
							</div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</section>

		<!-- General WooCommerce Archive Loop if on Category Taxonomy Page -->
		<?php if ( is_product_category() ) : ?>
			<div class="mt-16 pt-10 border-t border-stone-200">
				<h2 class="text-xl font-bold text-stone-900 mb-6"><?php esc_html_e( 'Category Products', 'vedha' ); ?></h2>
				<?php if ( woocommerce_product_loop() ) : ?>
					<?php
					woocommerce_product_loop_start();
					if ( wc_get_loop_prop( 'total' ) ) {
						while ( have_posts() ) {
							the_post();
							wc_get_template_part( 'content', 'product' );
						}
					}
					woocommerce_product_loop_end();
					do_action( 'woocommerce_after_shop_loop' );
					?>
				<?php else : ?>
					<?php do_action( 'woocommerce_no_products_found' ); ?>
				<?php endif; ?>
			</div>
		<?php endif; ?>

	</div>
</div>

<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10
 */
do_action( 'woocommerce_after_main_content' );

get_footer( 'shop' );
