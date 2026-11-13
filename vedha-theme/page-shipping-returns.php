<?php
/**
 * Template Name: Shipping & Returns
 * Description: Transparent shipping timelines, courier handling of liquids, and transit damage policy.
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-12 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<header class="max-w-3xl mb-12 space-y-3">
			<span class="text-xs font-bold uppercase tracking-wider text-stone-500">
				<?php esc_html_e( 'Fulfilment & Policies', 'vedha' ); ?>
			</span>
			<h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900">
				<?php esc_html_e( 'Shipping, Delivery & Returns Policy', 'vedha' ); ?>
			</h1>
			<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
				<?php esc_html_e( 'How we pack, seal, and dispatch liquid formulations directly from our Bangalore production facility to your doorstep.', 'vedha' ); ?>
			</p>
		</header>

		<div class="max-w-3xl space-y-10 text-xs sm:text-sm text-stone-700 leading-relaxed">
			<!-- Section 1 -->
			<section class="space-y-3">
				<h2 class="text-xl font-bold text-stone-900"><?php esc_html_e( '1. Dispatch & Delivery Timelines', 'vedha' ); ?></h2>
				<p>
					<?php esc_html_e( 'All orders are processed and dispatched within 24 to 48 hours from our plant in Attibele, Bangalore (excluding Sundays and national holidays).', 'vedha' ); ?>
				</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
					<div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
						<span class="font-bold text-stone-900 block">Bangalore & Karnataka</span>
						<p class="text-xs text-stone-500">Delivered within 1 to 2 business days via local surface express.</p>
					</div>
					<div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
						<span class="font-bold text-stone-900 block">Rest of India</span>
						<p class="text-xs text-stone-500">Delivered within 3 to 6 business days depending on tier-1 or tier-2 pin codes.</p>
					</div>
				</div>
			</section>

			<!-- Section 2 -->
			<section class="space-y-3">
				<h2 class="text-xl font-bold text-stone-900"><?php esc_html_e( '2. Liquid Transit Packaging Standards', 'vedha' ); ?></h2>
				<p>
					<?php esc_html_e( 'Shipping concentrated liquid formulations requires rigorous spill prevention. Every Vedha package is prepared with:', 'vedha' ); ?>
				</p>
				<ul class="space-y-2 list-none p-0 m-0 text-xs">
					<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Induction Heat-Sealed Mouths:</strong> Prevents cap loosening during vibration.</li>
					<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>Heavy-Duty Polyolefin Sleeving:</strong> Secondary barrier around bottle necks.</li>
					<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><strong>5-Ply Corrugated Outer Cartons:</strong> High-burst factor packaging rated for courier handling.</li>
				</ul>
			</section>

			<!-- Section 3 -->
			<section class="space-y-3">
				<h2 class="text-xl font-bold text-stone-900"><?php esc_html_e( '3. Transit Damage & Replacement Guarantee', 'vedha' ); ?></h2>
				<p>
					<?php esc_html_e( 'Due to hygiene and chemical purity regulations, opened bottles cannot be returned for restock. However, if your bottle or can arrives cracked, punctured, or leaked during transit:', 'vedha' ); ?>
				</p>
				<ol class="list-decimal pl-5 space-y-1.5 text-xs">
					<li><?php esc_html_e( 'Take clear photographs or a short video of the outer carton and damaged bottle showing the seal condition.', 'vedha' ); ?></li>
					<li><?php esc_html_e( 'Email the photos along with your Order ID to info@vedha.ind.in within 48 hours of receipt.', 'vedha' ); ?></li>
					<li><?php esc_html_e( 'We will dispatch an immediate replacement at zero cost or issue a 100% refund to your original payment method.', 'vedha' ); ?></li>
				</ol>
			</section>

			<!-- Section 4 -->
			<section class="space-y-3">
				<h2 class="text-xl font-bold text-stone-900"><?php esc_html_e( '4. Cancellations', 'vedha' ); ?></h2>
				<p>
					<?php esc_html_e( 'Orders may be cancelled before shipment by emailing our dispatch team. Once an order is assigned an AWB tracking number and handed to the surface logistics partner, cancellation is no longer possible.', 'vedha' ); ?>
				</p>
			</section>

			<!-- Contact Help Box -->
			<div class="p-6 bg-[var(--vedha-bg-neutral)] rounded-2xl border border-stone-200 space-y-2">
				<h3 class="font-bold text-stone-900 text-sm"><?php esc_html_e( 'Need Assistance with an Order?', 'vedha' ); ?></h3>
				<p class="text-xs text-stone-600">
					<?php esc_html_e( 'Our support team is available Monday to Saturday, 9:00 AM to 6:00 PM IST.', 'vedha' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-4 inline-flex mt-2">
					<?php esc_html_e( 'Contact Dispatch Team', 'vedha' ); ?>
				</a>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
