<?php
/**
 * Template Name: Dealer Enquiry
 * Description: Dedicated B2B & Detailing Studio bulk supply quotation request template.
 *
 * @package Vedha
 */

$b2b_status = '';
if ( 'POST' === $_SERVER['REQUEST_METHOD'] && isset( $_POST['vedha_dealer_nonce'] ) && wp_verify_nonce( sanitize_key( $_POST['vedha_dealer_nonce'] ), 'vedha_dealer_action' ) ) {
	$business_name = isset( $_POST['b2b_business'] ) ? sanitize_text_field( wp_unslash( $_POST['b2b_business'] ) ) : '';
	$contact_person= isset( $_POST['b2b_person'] ) ? sanitize_text_field( wp_unslash( $_POST['b2b_person'] ) ) : '';
	$email         = isset( $_POST['b2b_email'] ) ? sanitize_email( wp_unslash( $_POST['b2b_email'] ) ) : '';
	$phone         = isset( $_POST['b2b_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['b2b_phone'] ) ) : '';
	$city          = isset( $_POST['b2b_city'] ) ? sanitize_text_field( wp_unslash( $_POST['b2b_city'] ) ) : '';
	$volume        = isset( $_POST['b2b_volume'] ) ? sanitize_text_field( wp_unslash( $_POST['b2b_volume'] ) ) : '';
	$details       = isset( $_POST['b2b_details'] ) ? sanitize_textarea_field( wp_unslash( $_POST['b2b_details'] ) ) : '';

	if ( ! empty( $business_name ) && ! empty( $email ) && ! empty( $phone ) && is_email( $email ) ) {
		$to      = get_theme_mod( 'vedha_support_email', 'info@vedha.ind.in' );
		$headers = array( 'Content-Type: text/html; charset=UTF-8', 'Reply-To: ' . $contact_person . ' <' . $email . '>' );
		$body    = sprintf(
			'<h2>B2B Dealer / Detailing Studio Enquiry</h2><p><strong>Business:</strong> %s</p><p><strong>Contact:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Phone:</strong> %s</p><p><strong>City/State:</strong> %s</p><p><strong>Estimated Monthly Volume:</strong> %s</p><p><strong>Requirements:</strong><br>%s</p>',
			esc_html( $business_name ),
			esc_html( $contact_person ),
			esc_html( $email ),
			esc_html( $phone ),
			esc_html( $city ),
			esc_html( $volume ),
			nl2br( esc_html( $details ) )
		);

		if ( wp_mail( $to, 'New B2B Lead: ' . $business_name, $body, $headers ) ) {
			$b2b_status = 'success';
		} else {
			$b2b_status = 'error';
		}
	} else {
		$b2b_status = 'missing';
	}
}

get_header();
?>

<main id="primary" class="site-main py-12 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<header class="max-w-3xl mb-12 space-y-3">
			<span class="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
				<?php esc_html_e( 'B2B & Studio Supply', 'vedha' ); ?>
			</span>
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
				<?php esc_html_e( 'Commercial Supply & Detailing Studio Partnership', 'vedha' ); ?>
			</h1>
			<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
				<?php esc_html_e( 'We partner directly with automotive detailing studios, professional car washes, corporate facility managers, and residential associations across India. Direct manufacturer pricing in 5-Litre bulk containers and master cartons.', 'vedha' ); ?>
			</p>
		</header>

		<?php if ( 'success' === $b2b_status ) : ?>
			<div class="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs max-w-2xl">
				<strong><?php esc_html_e( 'Enquiry Received!', 'vedha' ); ?></strong> <?php esc_html_e( 'Our commercial accounts manager will contact you with wholesale tiers and freight estimates within 24 hours.', 'vedha' ); ?>
			</div>
		<?php endif; ?>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
			<!-- Form (7 Cols) -->
			<div class="lg:col-span-7">
				<div class="vedha-card p-6 sm:p-8 bg-stone-50 border border-stone-200 rounded-[20px]">
					<h2 class="text-lg font-bold text-stone-900 mb-4"><?php esc_html_e( 'Request Wholesale Rate Card & Samples', 'vedha' ); ?></h2>

					<form method="post" action="<?php echo esc_url( get_permalink() ); ?>" class="space-y-4">
						<?php wp_nonce_field( 'vedha_dealer_action', 'vedha_dealer_nonce' ); ?>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="space-y-1 text-xs">
								<label for="b2b_business" class="font-bold text-stone-700"><?php esc_html_e( 'Company / Detailing Studio Name *', 'vedha' ); ?></label>
								<input type="text" id="b2b_business" name="b2b_business" required class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
							<div class="space-y-1 text-xs">
								<label for="b2b_person" class="font-bold text-stone-700"><?php esc_html_e( 'Contact Person Name *', 'vedha' ); ?></label>
								<input type="text" id="b2b_person" name="b2b_person" required class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="space-y-1 text-xs">
								<label for="b2b_email" class="font-bold text-stone-700"><?php esc_html_e( 'Corporate Email *', 'vedha' ); ?></label>
								<input type="email" id="b2b_email" name="b2b_email" required class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
							<div class="space-y-1 text-xs">
								<label for="b2b_phone" class="font-bold text-stone-700"><?php esc_html_e( 'Phone / WhatsApp *', 'vedha' ); ?></label>
								<input type="tel" id="b2b_phone" name="b2b_phone" required class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="space-y-1 text-xs">
								<label for="b2b_city" class="font-bold text-stone-700"><?php esc_html_e( 'City & State *', 'vedha' ); ?></label>
								<input type="text" id="b2b_city" name="b2b_city" required placeholder="e.g. Bangalore, Hyderabad, Chennai" class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
							<div class="space-y-1 text-xs">
								<label for="b2b_volume" class="font-bold text-stone-700"><?php esc_html_e( 'Estimated Monthly Consumption', 'vedha' ); ?></label>
								<select id="b2b_volume" name="b2b_volume" class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
									<option value="50 - 100 Litres">50 – 100 Litres / month</option>
									<option value="100 - 500 Litres">100 – 500 Litres / month</option>
									<option value="500+ Litres">500+ Litres / month (Bulk drum)</option>
								</select>
							</div>
						</div>

						<div class="space-y-1 text-xs">
							<label for="b2b_details" class="font-bold text-stone-700"><?php esc_html_e( 'Products of Interest & Special Requirements', 'vedha' ); ?></label>
							<textarea id="b2b_details" name="b2b_details" rows="4" placeholder="<?php esc_attr_e( 'Specify products (e.g., Car Foam Wash 5L cans, Plant-Based Floor Cleaner 5L, or Dishwashing 1L master cartons)...', 'vedha' ); ?>" class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900"></textarea>
						</div>

						<button type="submit" class="vedha-btn vedha-btn-primary text-xs py-2.5 px-6">
							<?php esc_html_e( 'Submit Wholesale Request', 'vedha' ); ?>
						</button>
					</form>
				</div>
			</div>

			<!-- Benefits & Bulk Tiers (5 Cols) -->
			<div class="lg:col-span-5 space-y-6">
				<div class="vedha-card p-6 bg-stone-900 text-white rounded-[20px] space-y-4">
					<h2 class="text-sm font-bold uppercase tracking-wider text-sky-400"><?php esc_html_e( 'Why Studios Choose Vedha', 'vedha' ); ?></h2>
					<ul class="space-y-3 text-xs text-stone-300 list-none p-0 m-0">
						<li class="flex items-start gap-2.5">
							<svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
							<span><strong>Direct Bangalore Dispatches:</strong> Fresh batches bottled on demand with zero long-transit degradation.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
							<span><strong>True High Dilution:</strong> Up to 1:300 bucket wash and 1:9 foam lance dilution lowers per-wash overhead to pennies.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
							<span><strong>GST Invoicing & Input Credit:</strong> Complete 18% GST invoice supplied for business tax offset.</span>
						</li>
					</ul>
				</div>

				<div class="vedha-card p-6 bg-white border border-stone-200 rounded-[20px] space-y-2 text-xs">
					<div class="font-bold text-stone-900"><?php esc_html_e( 'Direct B2B Desk', 'vedha' ); ?></div>
					<p class="text-stone-600">Email: <a href="mailto:info@vedha.ind.in" class="text-emerald-700 font-bold">info@vedha.ind.in</a></p>
					<p class="text-stone-600">WhatsApp / Helpline: <span class="font-mono"><?php echo esc_html( get_theme_mod( 'vedha_whatsapp_number', '[OWNER TO PROVIDE PHONE]' ) ); ?></span></p>
				</div>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
