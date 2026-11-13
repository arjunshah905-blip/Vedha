<?php
/**
 * Template Name: Privacy Policy
 * Description: Indian IT Act & DPDP Act compliant privacy policy statement.
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
				<span class="text-xs font-bold uppercase tracking-wider text-stone-500"><?php esc_html_e( 'Legal & Compliance', 'vedha' ); ?></span>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900"><?php esc_html_e( 'Privacy Policy', 'vedha' ); ?></h1>
				<p class="text-xs text-stone-500"><?php esc_html_e( 'Effective Date: November 2024 · Compliant with the Information Technology Act, 2000 and Digital Personal Data Protection Act, 2023.', 'vedha' ); ?></p>
			</header>

			<div class="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '1. Introduction', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'Vedha Consumer Solutions Pvt. Ltd. ("Vedha", "we", "us", or "our") respects your personal privacy. This policy outlines our practices concerning the collection, storage, and handling of information collected via vedha.ind.in.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '2. Data We Collect', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'We only collect data necessary to fulfill orders, provide customer support, and comply with Indian legal statutes:', 'vedha' ); ?></p>
					<ul class="list-disc pl-5 space-y-1 text-xs">
						<li><?php esc_html_e( 'Identity & Contact Data: Full name, delivery shipping address, billing address, phone number, and email address.', 'vedha' ); ?></li>
						<li><?php esc_html_e( 'Transaction Data: Order details, GST details for B2B tax invoicing, and bank/UPI payment gateway transaction identifiers. We do NOT store credit/debit card numbers or UPI PINs on our servers.', 'vedha' ); ?></li>
						<li><?php esc_html_e( 'Technical Data: IP address, browser type, and time zone strictly for security fraud prevention and responsive layout rendering.', 'vedha' ); ?></li>
					</ul>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '3. How We Use Your Information', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'Your personal data is used solely to process orders, generate Legal Metrology invoice packages, dispatch shipments via courier partners, and communicate delivery updates. We never sell, rent, or trade customer data to advertising brokers.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '4. Data Security & Storage', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'All transmissions on vedha.ind.in are encrypted via 256-bit Transport Layer Security (TLS/SSL). Data is retained only for the duration required by Indian taxation and company law audits.', 'vedha' ); ?></p>
				</section>

				<section class="space-y-2">
					<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( '5. Grievance Officer', 'vedha' ); ?></h2>
					<p><?php esc_html_e( 'For data protection inquiries or to request correction or deletion of your personal records, contact our designated officer:', 'vedha' ); ?></p>
					<div class="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
						<div><strong>Grievance Officer:</strong> Vedha Consumer Solutions Pvt. Ltd.</div>
						<div><strong>Address:</strong> <?php echo esc_html( get_theme_mod( 'vedha_address_line', 'Attibele Industrial Area, Bangalore, Karnataka - 562107' ) ); ?></div>
						<div><strong>Email:</strong> <a href="mailto:info@vedha.ind.in" class="text-emerald-700 font-bold">info@vedha.ind.in</a></div>
					</div>
				</section>
			</div>
		</article>
	</div>
</main>

<?php
get_footer();
