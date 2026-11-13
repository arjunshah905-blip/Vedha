<?php
/**
 * The template for displaying the Homepage
 *
 * Sections:
 * 1. Hero
 * 2. Home Care / Auto Care category cards
 * 3. Plant-based and biodegradable strip
 * 4. Bestsellers (Products loop)
 * 5. Combo offers (Bundles loop)
 * 6. Why Vedha
 * 7. How to use (Dilution & application guides)
 * 8. Real reviews area (Empty-state, zero fake reviews)
 * 9. FAQ accordion
 * 10. Newsletter subscription
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main vedha-front-page">

	<!-- SECTION 1: HERO -->
	<section class="vedha-hero py-12 lg:py-20 bg-gradient-to-b from-white to-[var(--vedha-bg-neutral)] border-b border-stone-200">
		<div class="vedha-container">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<div class="lg:col-span-7 space-y-6">
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--vedha-green-light)] text-[var(--vedha-green)] text-xs font-bold uppercase tracking-wider">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
						<span><?php esc_html_e( 'Bangalore Liquid Formulations', 'vedha' ); ?></span>
					</div>

					<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
						<?php esc_html_e( 'High-performance liquid care for your home and vehicle.', 'vedha' ); ?>
					</h1>

					<p class="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
						<?php esc_html_e( 'Vedha manufactures concentrated liquid cleaning solutions in standard 1-Litre bottles and 5-Litre bulk refill cans. Formulated with verified plant-based and biodegradable actives for the home, alongside high-lubricity detailing formulas for your drive.', 'vedha' ); ?>
					</p>

					<div class="flex flex-wrap items-center gap-4 pt-2">
						<a href="#home-care" class="vedha-btn vedha-btn-primary">
							<?php esc_html_e( 'Explore Home Care', 'vedha' ); ?>
						</a>
						<a href="#automobile-care" class="vedha-btn vedha-btn-secondary">
							<?php esc_html_e( 'Explore Auto Care', 'vedha' ); ?>
						</a>
					</div>
				</div>

				<div class="lg:col-span-5">
					<div class="vedha-card relative p-6 bg-white border border-stone-200/90 rounded-[20px] shadow-sm">
						<div class="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden flex items-center justify-center p-4">
							<?php
							// Output featured image or clean hero fallback
							if ( has_post_thumbnail() ) {
								the_post_thumbnail( 'vedha-hero', array(
									'class'   => 'w-full h-full object-cover rounded-lg',
									'loading' => 'eager',
									'alt'     => esc_attr( get_bloginfo( 'name' ) . ' Lineup' ),
								) );
							} else {
								echo '<img src="' . esc_url( get_template_directory_uri() . '/assets/images/vedha-lineup.svg' ) . '" alt="' . esc_attr__( 'Vedha Liquid Formulations Lineup in 1-Litre and 5-Litre packs', 'vedha' ) . '" class="w-full h-full object-contain" width="600" height="450" loading="eager">';
							}
							?>
						</div>
						<div class="mt-4 flex items-center justify-between text-xs text-stone-600">
							<span class="font-bold text-stone-900"><?php esc_html_e( '1L Bottles & 5L Cans', 'vedha' ); ?></span>
							<span class="text-emerald-700 font-semibold"><?php esc_html_e( 'Zero Diluted Water Fillers', 'vedha' ); ?></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 2: CATEGORY CARDS (Home Care & Auto Care) -->
	<section id="categories" class="py-16 bg-[var(--vedha-bg-neutral)]">
		<div class="vedha-container">
			<div class="text-center max-w-2xl mx-auto mb-12">
				<h2 class="text-2xl sm:text-3xl font-bold text-stone-900">
					<?php esc_html_e( 'Two Dedicated Divisions. Unified Precision.', 'vedha' ); ?>
				</h2>
				<p class="text-xs sm:text-sm text-stone-600 mt-2">
					<?php esc_html_e( 'Every product is engineered with active ingredients formulated for hard Indian tap water and intensive surface cleaning.', 'vedha' ); ?>
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Category Card: Home Care -->
				<div id="home-care" class="vedha-card p-8 bg-white border border-stone-200 rounded-[20px] flex flex-col justify-between hover:shadow-md transition-shadow">
					<div class="space-y-4">
						<div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--vedha-green)] bg-[var(--vedha-green-light)] px-3 py-1 rounded-full">
							<span><?php esc_html_e( 'Home Care Division', 'vedha' ); ?></span>
						</div>
						<h3 class="text-2xl font-bold text-stone-900">
							<?php esc_html_e( 'Domestic Liquid Formulations', 'vedha' ); ?>
						</h3>
						<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
							<?php esc_html_e( 'Designed for Indian cookware, tile floors, and everyday family laundry. Includes 3 verified plant-based & biodegradable solutions that rinse clean without toxic fumes or residue.', 'vedha' ); ?>
						</p>
						<ul class="text-xs text-stone-700 space-y-2 list-none p-0 m-0">
							<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Dishwashing Liquid</strong> (Plant-Based & Biodegradable)</li>
							<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Liquid Laundry Detergent</strong> (Multi-Enzyme Fabric Care)</li>
							<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Floor Cleaner</strong> (Plant-Based & Biodegradable)</li>
							<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Liquid Hand Wash</strong> (Plant-Based & Biodegradable)</li>
						</ul>
					</div>
					<div class="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
						<span class="text-xs text-stone-500 font-mono">Available in 1L & 5L packs</span>
						<a href="#bestsellers" class="vedha-btn vedha-btn-primary text-xs py-2 px-4">
							<?php esc_html_e( 'View Products', 'vedha' ); ?>
						</a>
					</div>
				</div>

				<!-- Category Card: Auto Care -->
				<div id="automobile-care" class="vedha-card p-8 bg-stone-900 text-white border border-stone-800 rounded-[20px] flex flex-col justify-between hover:shadow-lg transition-shadow">
					<div class="space-y-4">
						<div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
							<span><?php esc_html_e( 'Automobile Care Division', 'vedha' ); ?></span>
						</div>
						<h3 class="text-2xl font-bold text-white">
							<?php esc_html_e( 'Vehicle Detailing Formulations', 'vedha' ); ?>
						</h3>
						<p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
							<?php esc_html_e( 'Formulated for Indian road film, abrasive mud, and harsh sun. High-lubricity pH 7 neutral technology safe for clear coats, carnauba waxes, ceramic coatings, and PPF wraps.', 'vedha' ); ?>
						</p>
						<ul class="text-xs text-stone-300 space-y-2 list-none p-0 m-0">
							<li class="flex items-center gap-2"><svg class="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Car Shampoo</strong> (pH 7 Neutral, Anti-Swirl Contact Wash)</li>
							<li class="flex items-center gap-2"><svg class="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Car Foam Wash</strong> (Hyper-Cling Snow Foam Cannon Wash)</li>
						</ul>
					</div>
					<div class="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between">
						<span class="text-xs text-stone-400 font-mono">1L Bottles & 5L Garage Cans</span>
						<a href="#bestsellers" class="vedha-btn vedha-btn-secondary text-xs py-2 px-4">
							<?php esc_html_e( 'View Auto Range', 'vedha' ); ?>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 3: PLANT-BASED & BIODEGRADABLE STRIP -->
	<section id="plant-based" class="py-12 bg-[var(--vedha-green)] text-white">
		<div class="vedha-container">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
				<div class="md:col-span-8 space-y-3">
					<div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
						<span><?php esc_html_e( 'Strict Eco-Transparency', 'vedha' ); ?></span>
					</div>
					<h2 class="text-2xl sm:text-3xl font-extrabold text-white">
						<?php esc_html_e( 'Verified Plant-Based & Biodegradable Formulations', 'vedha' ); ?>
					</h2>
					<p class="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
						<?php esc_html_e( 'We do not engage in greenwashing. Only our Dishwashing Liquid, Floor Cleaner, and Liquid Hand Wash are formulated with verified plant-derived, biodegradable surfactant systems. Our Liquid Laundry Detergent and Automobile products utilize specialized performance surfactants.', 'vedha' ); ?>
					</p>
				</div>
				<div class="md:col-span-4 flex flex-col gap-3">
					<div class="p-3 bg-white/10 rounded-xl text-xs text-white border border-white/20">
						<strong>Dishwashing Liquid:</strong> Natural coconut & sugarcane degreaser.
					</div>
					<div class="p-3 bg-white/10 rounded-xl text-xs text-white border border-white/20">
						<strong>Floor Cleaner:</strong> Toddler & pet-safe herbal surface shine.
					</div>
					<div class="p-3 bg-white/10 rounded-xl text-xs text-white border border-white/20">
						<strong>Liquid Hand Wash:</strong> Vegetable glycerin & derm-gentle pH 5.5.
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 4: BESTSELLERS / PRODUCT CATALOGUE LOOP -->
	<section id="bestsellers" class="py-16 bg-white border-b border-stone-200">
		<div class="vedha-container">
			<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
				<div>
					<span class="text-xs font-bold uppercase tracking-wider text-stone-500"><?php esc_html_e( 'Product Catalogue', 'vedha' ); ?></span>
					<h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mt-1"><?php esc_html_e( '1-Litre & 5-Litre Formulations', 'vedha' ); ?></h2>
				</div>
				<?php if ( class_exists( 'WooCommerce' ) ) : ?>
					<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="text-xs font-bold text-[var(--vedha-green)] hover:underline flex items-center gap-1">
						<?php esc_html_e( 'View All Products in Shop', 'vedha' ); ?> &rarr;
					</a>
				<?php endif; ?>
			</div>

			<?php
			if ( class_exists( 'WooCommerce' ) ) {
				// Query native WooCommerce products
				$args = array(
					'post_type'      => 'product',
					'posts_per_page' => 8,
					'status'         => 'publish',
				);
				$products = new WP_Query( $args );

				if ( $products->have_posts() ) {
					echo '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">';
					while ( $products->have_posts() ) {
						$products->the_post();
						wc_get_template_part( 'content', 'product' );
					}
					echo '</div>';
					wp_reset_postdata();
				} else {
					// Fallback when WooCommerce is active but products haven't been seeded yet
					get_template_part( 'template-parts/product-static-cards' );
				}
			} else {
				// Fallback static cards preview
				get_template_part( 'template-parts/product-static-cards' );
			}
			?>
		</div>
	</section>

	<!-- SECTION 5: COMBO OFFERS / BUNDLES -->
	<section id="combo-offers" class="py-16 bg-[var(--vedha-bg-neutral)] border-b border-stone-200">
		<div class="vedha-container">
			<div class="text-center max-w-2xl mx-auto mb-10">
				<span class="text-xs font-bold uppercase tracking-wider text-red-700"><?php esc_html_e( 'Value Bundles', 'vedha' ); ?></span>
				<h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mt-1"><?php esc_html_e( 'Replenishment Combo Packs', 'vedha' ); ?></h2>
				<p class="text-xs sm:text-sm text-stone-600 mt-2"><?php esc_html_e( 'Save on shipping and packaging by purchasing complete household or detailing kits.', 'vedha' ); ?></p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- Combo 1 -->
				<div class="vedha-card p-6 bg-white border border-stone-200 rounded-[16px] flex flex-col justify-between">
					<div class="space-y-3">
						<span class="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200"><?php esc_html_e( 'Plant-Based Trio', 'vedha' ); ?></span>
						<h3 class="text-lg font-bold text-stone-900"><?php esc_html_e( 'Eco Home Trio (3 × 1L)', 'vedha' ); ?></h3>
						<p class="text-xs text-stone-600"><?php esc_html_e( 'Dishwashing Liquid + Floor Cleaner + Liquid Hand Wash. 100% verified plant-based surfactants.', 'vedha' ); ?></p>
					</div>
					<div class="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
						<span class="text-xs text-stone-500 font-mono"><?php esc_html_e( '[OWNER TO SET PRICE]', 'vedha' ); ?></span>
						<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-1.5 px-3"><?php esc_html_e( 'Enquire Pack', 'vedha' ); ?></a>
					</div>
				</div>

				<!-- Combo 2 -->
				<div class="vedha-card p-6 bg-white border border-stone-200 rounded-[16px] flex flex-col justify-between">
					<div class="space-y-3">
						<span class="text-[10px] font-bold uppercase bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200"><?php esc_html_e( 'Auto Care Duo', 'vedha' ); ?></span>
						<h3 class="text-lg font-bold text-stone-900"><?php esc_html_e( 'Pro Detailing Duo (2 × 1L)', 'vedha' ); ?></h3>
						<p class="text-xs text-stone-600"><?php esc_html_e( 'Car Foam Wash for touchless pre-wash lift + Car Shampoo for high-lubricity contact wash.', 'vedha' ); ?></p>
					</div>
					<div class="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
						<span class="text-xs text-stone-500 font-mono"><?php esc_html_e( '[OWNER TO SET PRICE]', 'vedha' ); ?></span>
						<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-1.5 px-3"><?php esc_html_e( 'Enquire Pack', 'vedha' ); ?></a>
					</div>
				</div>

				<!-- Combo 3 -->
				<div class="vedha-card p-6 bg-white border border-stone-200 rounded-[16px] flex flex-col justify-between">
					<div class="space-y-3">
						<span class="text-[10px] font-bold uppercase bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200"><?php esc_html_e( 'Master Household Pack', 'vedha' ); ?></span>
						<h3 class="text-lg font-bold text-stone-900"><?php esc_html_e( 'Complete Care Set (All 6)', 'vedha' ); ?></h3>
						<p class="text-xs text-stone-600"><?php esc_html_e( 'Full replenishment across kitchen, laundry, floors, bathroom and garage care.', 'vedha' ); ?></p>
					</div>
					<div class="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
						<span class="text-xs text-stone-500 font-mono"><?php esc_html_e( '[OWNER TO SET PRICE]', 'vedha' ); ?></span>
						<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-1.5 px-3"><?php esc_html_e( 'Enquire Pack', 'vedha' ); ?></a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 6: WHY VEDHA -->
	<section id="why-vedha" class="py-16 bg-white border-b border-stone-200">
		<div class="vedha-container">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<div class="lg:col-span-6 space-y-4">
					<span class="text-xs font-bold uppercase tracking-wider text-emerald-800"><?php esc_html_e( 'The Vedha Standard', 'vedha' ); ?></span>
					<h2 class="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
						<?php esc_html_e( 'Concentrated liquid science formulated for Indian households.', 'vedha' ); ?>
					</h2>
					<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
						<?php esc_html_e( 'Commercial market cleaning products are frequently diluted with excess water, salt thickeners, and harsh chemical fillers. Vedha formulates high-active liquid concentrates manufactured at our Bangalore facility, providing maximum surface yield and high-efficiency dilution.', 'vedha' ); ?>
					</p>
					<div class="space-y-2 pt-2 text-xs text-stone-700">
						<div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Standard 1-Litre dispenser bottles & 5-Litre bulk refill cans</div>
						<div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Strictly verified plant-based and biodegradable classification</div>
						<div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Full Legal Metrology compliance with transparent manufacturing data</div>
					</div>
				</div>

				<div class="lg:col-span-6 grid grid-cols-2 gap-4">
					<div class="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
						<div class="text-2xl font-bold font-mono text-stone-900">1000 ml</div>
						<h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider"><?php esc_html_e( 'Standard 1L Size', 'vedha' ); ?></h3>
						<p class="text-[11px] text-stone-500"><?php esc_html_e( 'Generous long-lasting volume preventing constant plastic re-buys.', 'vedha' ); ?></p>
					</div>
					<div class="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
						<div class="text-2xl font-bold font-mono text-emerald-700">5000 ml</div>
						<h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider"><?php esc_html_e( '5L Bulk Option', 'vedha' ); ?></h3>
						<p class="text-[11px] text-stone-500"><?php esc_html_e( 'Economical bulk refilling for residences and commercial studios.', 'vedha' ); ?></p>
					</div>
					<div class="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
						<div class="text-2xl font-bold font-mono text-red-700">100%</div>
						<h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider"><?php esc_html_e( 'Factory Direct', 'vedha' ); ?></h3>
						<p class="text-[11px] text-stone-500"><?php esc_html_e( 'Manufactured & bottled in Attibele, Bangalore.', 'vedha' ); ?></p>
					</div>
					<div class="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
						<div class="text-2xl font-bold font-mono text-sky-700">pH 7</div>
						<h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider"><?php esc_html_e( 'Neutral Tech', 'vedha' ); ?></h3>
						<p class="text-[11px] text-stone-500"><?php esc_html_e( 'Safe for delicate kitchen hands & ceramic-coated cars.', 'vedha' ); ?></p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 7: HOW TO USE / DILUTION GUIDE -->
	<section id="how-to-use" class="py-16 bg-[var(--vedha-bg-neutral)] border-b border-stone-200">
		<div class="vedha-container">
			<div class="text-center max-w-2xl mx-auto mb-12">
				<span class="text-xs font-bold uppercase tracking-wider text-stone-500"><?php esc_html_e( 'Application Instructions', 'vedha' ); ?></span>
				<h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mt-1"><?php esc_html_e( 'How to Use Vedha Formulations', 'vedha' ); ?></h2>
				<p class="text-xs sm:text-sm text-stone-600 mt-2"><?php esc_html_e( 'Because Vedha products are concentrated, proper dilution guarantees optimal results while extending bottle lifespan.', 'vedha' ); ?></p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
				<div class="vedha-card p-5 bg-white border border-stone-200 rounded-xl space-y-2">
					<div class="font-bold text-emerald-800 uppercase tracking-wider"><?php esc_html_e( 'Dishwashing Liquid', 'vedha' ); ?></div>
					<div class="font-mono text-stone-900 font-bold"><?php esc_html_e( '1:10 (5 ml in 50 ml water)', 'vedha' ); ?></div>
					<p class="text-stone-600 leading-relaxed"><?php esc_html_e( 'Dilute 1 teaspoon in a small bowl of water. Dip scrubber to generate thick degreasing suds. Rinse clean with fresh water.', 'vedha' ); ?></p>
				</div>

				<div class="vedha-card p-5 bg-white border border-stone-200 rounded-xl space-y-2">
					<div class="font-bold text-emerald-800 uppercase tracking-wider"><?php esc_html_e( 'Floor Cleaner', 'vedha' ); ?></div>
					<div class="font-mono text-stone-900 font-bold"><?php esc_html_e( '1:250 (20 ml in 5L water)', 'vedha' ); ?></div>
					<p class="text-stone-600 leading-relaxed"><?php esc_html_e( 'Add 1 capful to half a bucket of water. Mop surface evenly. No rinsing needed; dries to a streak-free natural sheen.', 'vedha' ); ?></p>
				</div>

				<div class="vedha-card p-5 bg-white border border-stone-200 rounded-xl space-y-2">
					<div class="font-bold text-sky-800 uppercase tracking-wider"><?php esc_html_e( 'Car Shampoo', 'vedha' ); ?></div>
					<div class="font-mono text-stone-900 font-bold"><?php esc_html_e( '1:300 (30 ml in 10L water)', 'vedha' ); ?></div>
					<p class="text-stone-600 leading-relaxed"><?php esc_html_e( 'Agitate in wash bucket to create slick suds. Wash vehicle panel-by-panel with microfiber mitt, then rinse and towel dry.', 'vedha' ); ?></p>
				</div>

				<div class="vedha-card p-5 bg-white border border-stone-200 rounded-xl space-y-2">
					<div class="font-bold text-sky-800 uppercase tracking-wider"><?php esc_html_e( 'Car Foam Wash', 'vedha' ); ?></div>
					<div class="font-mono text-stone-900 font-bold"><?php esc_html_e( '1:9 in Foam Cannon (100 ml + 900 ml)', 'vedha' ); ?></div>
					<p class="text-stone-600 leading-relaxed"><?php esc_html_e( 'Spray bottom-to-top with pressure washer (110–150 bar). Allow snow foam to dwell 5 mins to loosen dirt before rinsing.', 'vedha' ); ?></p>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 8: REAL REVIEWS AREA (Empty state, zero fake reviews) -->
	<section id="customer-reviews" class="py-16 bg-white border-b border-stone-200">
		<div class="vedha-container">
			<div class="max-w-2xl mx-auto text-center space-y-4">
				<span class="text-xs font-bold uppercase tracking-wider text-stone-500"><?php esc_html_e( 'Verified Customer Feedback', 'vedha' ); ?></span>
				<h2 class="text-2xl sm:text-3xl font-bold text-stone-900"><?php esc_html_e( 'Customer Experiences', 'vedha' ); ?></h2>
				<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
					<?php esc_html_e( 'We uphold a strict zero-fabrication policy. We never publish invented reviews, fabricated testimonials, or artificially inflated star ratings. Real buyer evaluations will appear here as orders are fulfilled.', 'vedha' ); ?>
				</p>

				<!-- Transparent Empty State Box -->
				<div class="p-8 rounded-2xl bg-stone-50 border border-dashed border-stone-300 space-y-3 mt-6">
					<div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
					</div>
					<h3 class="text-sm font-bold font-mono uppercase text-emerald-800 tracking-wider">
						<?php esc_html_e( '[VERIFIED BUYER REVIEWS WILL BE DISPLAYED HERE]', 'vedha' ); ?>
					</h3>
					<p class="text-xs text-stone-500 max-w-md mx-auto">
						<?php esc_html_e( 'Are you an existing Vedha customer? Connect with our team to submit your authentic review and share your dilution experience.', 'vedha' ); ?>
					</p>
					<div class="pt-2">
						<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-secondary text-xs py-2 px-4">
							<?php esc_html_e( 'Submit Feedback', 'vedha' ); ?>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 9: FREQUENTLY ASKED QUESTIONS -->
	<section id="faq" class="py-16 bg-[var(--vedha-bg-neutral)] border-b border-stone-200">
		<div class="vedha-container max-w-3xl">
			<div class="text-center mb-10">
				<span class="text-xs font-bold uppercase tracking-wider text-stone-500"><?php esc_html_e( 'Clarity & Formulation', 'vedha' ); ?></span>
				<h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mt-1"><?php esc_html_e( 'Frequently Asked Questions', 'vedha' ); ?></h2>
			</div>

			<div class="space-y-4 text-xs">
				<details class="vedha-card p-5 bg-white border border-stone-200 rounded-xl cursor-pointer group">
					<summary class="font-bold text-stone-900 text-sm flex items-center justify-between">
						<span><?php esc_html_e( 'Which Vedha products are plant-based and biodegradable?', 'vedha' ); ?></span>
						<span class="text-stone-400 group-open:rotate-180 transition-transform">&darr;</span>
					</summary>
					<p class="mt-3 text-stone-600 leading-relaxed">
						<?php esc_html_e( 'Only 3 specific formulations are verified plant-based and biodegradable: Dishwashing Liquid, Floor Cleaner, and Liquid Hand Wash. Our Liquid Laundry Detergent, Car Shampoo, and Car Foam Wash utilize specialized synthetic surfactants and polymers to achieve high stain lifting and clear coat lubricity.', 'vedha' ); ?>
					</p>
				</details>

				<details class="vedha-card p-5 bg-white border border-stone-200 rounded-xl cursor-pointer group">
					<summary class="font-bold text-stone-900 text-sm flex items-center justify-between">
						<span><?php esc_html_e( 'Why does Vedha offer 1-Litre and 5-Litre formats?', 'vedha' ); ?></span>
						<span class="text-stone-400 group-open:rotate-180 transition-transform">&darr;</span>
					</summary>
					<p class="mt-3 text-stone-600 leading-relaxed">
						<?php esc_html_e( 'The 1-Litre bottle serves as a comfortable daily dispensing container, while the 5-Litre bulk refill can reduces packaging plastic waste by up to 60% and provides significant per-litre savings for homes, clinics, and detailing studios.', 'vedha' ); ?>
					</p>
				</details>

				<details class="vedha-card p-5 bg-white border border-stone-200 rounded-xl cursor-pointer group">
					<summary class="font-bold text-stone-900 text-sm flex items-center justify-between">
						<span><?php esc_html_e( 'Is the Car Shampoo safe for ceramic coatings and waxes?', 'vedha' ); ?></span>
						<span class="text-stone-400 group-open:rotate-180 transition-transform">&darr;</span>
					</summary>
					<p class="mt-3 text-stone-600 leading-relaxed">
						<?php esc_html_e( 'Yes. Vedha Car Shampoo is 100% pH 7 neutral and free from harsh caustic builders or petroleum distillates. It will not strip carnauba waxes, synthetic paint sealants, ceramic coatings, or PPF films.', 'vedha' ); ?>
					</p>
				</details>
			</div>
		</div>
	</section>

	<!-- SECTION 10: NEWSLETTER / BATCH ANNOUNCEMENTS -->
	<section id="newsletter" class="py-14 bg-white">
		<div class="vedha-container max-w-xl text-center space-y-4">
			<h2 class="text-2xl font-bold text-stone-900"><?php esc_html_e( 'Stay Updated on Fresh Factory Batches', 'vedha' ); ?></h2>
			<p class="text-xs text-stone-600">
				<?php esc_html_e( 'Receive direct production notices, bulk dilution guides, and dealer announcements directly from our Bangalore facility.', 'vedha' ); ?>
			</p>
			<form action="<?php echo esc_url( home_url( '/#newsletter' ) ); ?>" method="post" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
				<input type="email" name="vedha_email" required placeholder="<?php esc_attr_e( 'Enter your email address', 'vedha' ); ?>" class="flex-1 px-4 py-2.5 text-xs rounded-[var(--vedha-input-radius)] border border-stone-300 focus:outline-none focus:border-stone-900">
				<button type="submit" class="vedha-btn vedha-btn-primary text-xs py-2.5 px-5">
					<?php esc_html_e( 'Subscribe', 'vedha' ); ?>
				</button>
			</form>
			<span class="text-[10px] text-stone-400 block"><?php esc_html_e( 'Zero spam. Unsubscribe anytime with 1 click.', 'vedha' ); ?></span>
		</div>
	</section>

</main>

<?php
get_footer();
