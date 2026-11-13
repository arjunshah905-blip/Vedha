<?php
/**
 * Template Name: Terms & Conditions
 * Description: Commercial terms, Legal Metrology notices, and jurisdiction in Bangalore, India.
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-12 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<article class="max-w-3xl space-y-8">
			<header class="border-b border-stone-200 pb-6 space-y-2">
				<span class="text-xs font-bold uppercase tracking-wider text-stone-500"><?php esc_html_e( 'Legal & Terms', 'vedha' ); ?></span>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900"><?php esc_html_e( 'Terms and Conditions', 'vedha' ); ?></h1>
				<p class="text-xs text-stone-500"><?php esc_html_e( 'Last Updated: November 2024 · Governed by the Laws of India', 'vedha' ); ?></p>
			</header>

			<div class="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '1. Contractual Agreement', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'By accessing, browsing, or purchasing formulations through vedha.ind.in, you agree to be bound by these terms. If you do not agree with any provision, please discontinue using this website.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '2. Legal Metrology & Pricing', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'All consumer prices displayed on the website are Maximum Retail Prices (MRP) inclusive of applicable Goods and Services Tax (GST) unless explicitly noted as wholesale commercial B2B quotation. All packaged commodities comply with the Legal Metrology (Packaged Commodities) Rules, 2011, detailing net quantity (1000 ml or 5000 ml), manufacturer name, and customer care contact.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '3. Usage Instructions & Dilution Safety', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'Vedha manufactures high-active liquid concentrates. Buyers are responsible for reading label directions and recommended dilution ratios prior to use. Always perform a small patch test on uncommon stone floors or aftermarket painted surfaces. Vedha shall not be liable for damage resulting from unapproved dilutions or application on incompatible surfaces.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '4. Intellectual Property', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'The trademark "VEDHA", brand assets, product descriptions, photography, and website design are proprietary to Vedha Consumer Solutions Pvt. Ltd. Unauthorized reproduction or commercial imitation is prohibited.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '5. Governing Law & Jurisdiction', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'These Terms are governed by the laws of India. Any disputes arising out of purchases, representations, or website usage shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru (Bangalore), Karnataka, India.', 'vedha' ); ?></p>
				</section>
			</div>
		</article>
	</div>
</main>

<?php
get_footer();
