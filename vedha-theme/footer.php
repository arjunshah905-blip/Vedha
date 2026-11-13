<?php
/**
 * The template for displaying the footer
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
</div><!-- .site-content -->

<footer id="colophon" class="site-footer bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
	<div class="vedha-container space-y-12">
		<!-- Main Footer Grid (4 Columns) -->
		<div class="grid grid-cols-1 md:grid-cols-12 gap-8">
			<!-- Col 1: Brand Info & Manufacturing (4 Cols) -->
			<div class="md:col-span-4 space-y-4">
				<div class="flex items-center gap-2">
					<span class="text-2xl font-bold font-display text-white tracking-wider">VEDHA</span>
					<span class="text-[10px] bg-red-600/90 text-white font-bold px-2 py-0.5 rounded">Bangalore</span>
				</div>
				<p class="text-stone-400 leading-relaxed max-w-sm">
					<?php esc_html_e( 'Vedha Consumer Solutions Pvt. Ltd. manufactures concentrated liquid cleaning solutions for domestic and automotive care in standard 1-Litre dispenser bottles and 5-Litre bulk refill cans. Featuring strictly verified plant-based, biodegradable essentials.', 'vedha' ); ?>
				</p>
				<div class="space-y-1.5 text-stone-400 text-[11px]">
					<div class="flex items-start gap-2">
						<svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
						<span><?php echo esc_html( get_theme_mod( 'vedha_address_line', 'Attibele Industrial Area, Bangalore, Karnataka - 562107' ) ); ?></span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						<span>Grievance: <a href="mailto:<?php echo esc_attr( get_theme_mod( 'vedha_support_email', 'info@vedha.ind.in' ) ); ?>" class="text-emerald-400 hover:underline"><?php echo esc_html( get_theme_mod( 'vedha_support_email', 'info@vedha.ind.in' ) ); ?></a></span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
						<span>Helpline: <?php echo esc_html( get_theme_mod( 'vedha_whatsapp_number', '[OWNER TO PROVIDE PHONE]' ) ); ?></span>
					</div>
				</div>
			</div>

			<!-- Col 2: Home Care Formulations (2.5 Cols) -->
			<div class="md:col-span-3 space-y-3">
				<h3 class="text-white font-bold uppercase tracking-wider text-xs">
					<?php esc_html_e( 'Home Care Range', 'vedha' ); ?>
				</h3>
				<ul class="space-y-2 list-none p-0 m-0 text-stone-400">
					<li><a href="<?php echo esc_url( home_url( '/#plant-based' ) ); ?>" class="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><?php esc_html_e( 'Dishwashing Liquid (Plant-Based)', 'vedha' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/#home-care' ) ); ?>" class="hover:text-white transition-colors"><?php esc_html_e( 'Liquid Laundry Detergent', 'vedha' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/#plant-based' ) ); ?>" class="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><?php esc_html_e( 'Floor Cleaner (Plant-Based)', 'vedha' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/#plant-based' ) ); ?>" class="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><?php esc_html_e( 'Liquid Hand Wash (Plant-Based)', 'vedha' ); ?></a></li>
				</ul>
			</div>

			<!-- Col 3: Automobile Care Range (2.5 Cols) -->
			<div class="md:col-span-2 space-y-3">
				<h3 class="text-white font-bold uppercase tracking-wider text-xs">
					<?php esc_html_e( 'Automobile Care', 'vedha' ); ?>
				</h3>
				<ul class="space-y-2 list-none p-0 m-0 text-stone-400">
					<li><a href="<?php echo esc_url( home_url( '/#automobile-care' ) ); ?>" class="hover:text-sky-400 transition-colors"><?php esc_html_e( 'Car Shampoo (pH 7 Neutral)', 'vedha' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/#automobile-care' ) ); ?>" class="hover:text-sky-400 transition-colors"><?php esc_html_e( 'Car Foam Wash (Snow Foam)', 'vedha' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/dealer-enquiry' ) ); ?>" class="hover:text-white transition-colors text-emerald-400 font-medium"><?php esc_html_e( 'Dealer / Studio Supply', 'vedha' ); ?></a></li>
				</ul>
			</div>

			<!-- Col 4: Statutory Declarations (India) (3 Cols) -->
			<div class="md:col-span-3 space-y-3">
				<h3 class="text-white font-bold uppercase tracking-wider text-xs">
					<?php esc_html_e( 'Statutory Compliance', 'vedha' ); ?>
				</h3>
				<p class="text-stone-400 text-[11px] leading-relaxed">
					<?php esc_html_e( 'Compliant with Indian Legal Metrology (Packaged Commodities) Rules, 2011. Explicit batch coding, MRP declaration, and standard net volume (1000 ml & 5000 ml). GSTIN: [OWNER TO PROVIDE GSTIN].', 'vedha' ); ?>
				</p>
				<div class="pt-2">
					<a href="<?php echo esc_url( home_url( '/dealer-enquiry' ) ); ?>" class="vedha-btn vedha-btn-accent text-xs py-2 px-3.5 inline-flex">
						<?php esc_html_e( 'Bulk & Dealer Enquiry', 'vedha' ); ?>
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom Copyright & Legal Links -->
		<div class="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
			<div>
				&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All rights reserved. Manufactured in Bangalore, India.', 'vedha' ); ?>
			</div>
			<div class="flex items-center flex-wrap gap-4">
				<a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>" class="hover:text-white"><?php esc_html_e( 'Privacy Policy', 'vedha' ); ?></a>
				<a href="<?php echo esc_url( home_url( '/terms-conditions' ) ); ?>" class="hover:text-white"><?php esc_html_e( 'Terms of Service', 'vedha' ); ?></a>
				<a href="<?php echo esc_url( home_url( '/shipping-returns' ) ); ?>" class="hover:text-white"><?php esc_html_e( 'Shipping & Returns', 'vedha' ); ?></a>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
