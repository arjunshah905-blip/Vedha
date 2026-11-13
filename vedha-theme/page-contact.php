<?php
/**
 * Template Name: Contact & Grievance
 * Description: Accessible contact page with statutory Grievance Officer details and direct message form.
 *
 * @package Vedha
 */

// Process form submission
$form_status = '';
if ( 'POST' === $_SERVER['REQUEST_METHOD'] && isset( $_POST['vedha_contact_nonce'] ) && wp_verify_nonce( sanitize_key( $_POST['vedha_contact_nonce'] ), 'vedha_contact_action' ) ) {
	$name    = isset( $_POST['contact_name'] ) ? sanitize_text_field( wp_unslash( $_POST['contact_name'] ) ) : '';
	$email   = isset( $_POST['contact_email'] ) ? sanitize_email( wp_unslash( $_POST['contact_email'] ) ) : '';
	$subject = isset( $_POST['contact_subject'] ) ? sanitize_text_field( wp_unslash( $_POST['contact_subject'] ) ) : 'Customer Enquiry';
	$message = isset( $_POST['contact_message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['contact_message'] ) ) : '';

	if ( ! empty( $name ) && ! empty( $email ) && ! empty( $message ) && is_email( $email ) ) {
		$to      = get_theme_mod( 'vedha_support_email', 'info@vedha.ind.in' );
		$headers = array( 'Content-Type: text/html; charset=UTF-8', 'Reply-To: ' . $name . ' <' . $email . '>' );
		$body    = sprintf(
			'<h2>New Website Message from Vedha Contact Form</h2><p><strong>Name:</strong> %s</p><p><strong>Email:</strong> %s</p><p><strong>Subject:</strong> %s</p><p><strong>Message:</strong><br>%s</p>',
			esc_html( $name ),
			esc_html( $email ),
			esc_html( $subject ),
			nl2br( esc_html( $message ) )
		);

		$mail_sent = wp_mail( $to, 'Vedha Inquiry: ' . $subject, $body, $headers );
		if ( $mail_sent ) {
			$form_status = 'success';
		} else {
			$form_status = 'error';
		}
	} else {
		$form_status = 'missing_fields';
	}
}

get_header();
?>

<main id="primary" class="site-main py-12 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<header class="max-w-2xl mb-12 space-y-3">
			<span class="text-xs font-bold uppercase tracking-wider text-emerald-800">
				<?php esc_html_e( 'Direct Factory Communication', 'vedha' ); ?>
			</span>
			<h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900">
				<?php esc_html_e( 'Contact Vedha & Grievance Cell', 'vedha' ); ?>
			</h1>
			<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
				<?php esc_html_e( 'Connect with our manufacturing team in Bangalore for product technical queries, dilution troubleshooting, order status, or statutory grievance redressal.', 'vedha' ); ?>
			</p>
		</header>

		<?php if ( 'success' === $form_status ) : ?>
			<div class="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs max-w-2xl">
				<strong><?php esc_html_e( 'Thank You!', 'vedha' ); ?></strong> <?php esc_html_e( 'Your message has been dispatched to our support team. We reply within 24 business hours.', 'vedha' ); ?>
			</div>
		<?php elseif ( 'error' === $form_status || 'missing_fields' === $form_status ) : ?>
			<div class="mb-8 p-4 bg-red-50 border border-red-200 text-red-900 rounded-xl text-xs max-w-2xl">
				<strong><?php esc_html_e( 'Submission Error:', 'vedha' ); ?></strong> <?php esc_html_e( 'Please ensure all required fields are accurately filled.', 'vedha' ); ?>
			</div>
		<?php endif; ?>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
			<!-- Contact Form (7 Cols) -->
			<div class="lg:col-span-7">
				<div class="vedha-card p-6 sm:p-8 bg-stone-50 border border-stone-200 rounded-[20px]">
					<h2 class="text-lg font-bold text-stone-900 mb-4"><?php esc_html_e( 'Send a Direct Message', 'vedha' ); ?></h2>

					<form method="post" action="<?php echo esc_url( get_permalink() ); ?>" class="space-y-4">
						<?php wp_nonce_field( 'vedha_contact_action', 'vedha_contact_nonce' ); ?>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="space-y-1 text-xs">
								<label for="contact_name" class="font-bold text-stone-700"><?php esc_html_e( 'Full Name *', 'vedha' ); ?></label>
								<input type="text" id="contact_name" name="contact_name" required class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
							<div class="space-y-1 text-xs">
								<label for="contact_email" class="font-bold text-stone-700"><?php esc_html_e( 'Email Address *', 'vedha' ); ?></label>
								<input type="email" id="contact_email" name="contact_email" required class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
							</div>
						</div>

						<div class="space-y-1 text-xs">
							<label for="contact_subject" class="font-bold text-stone-700"><?php esc_html_e( 'Enquiry Type *', 'vedha' ); ?></label>
							<select id="contact_subject" name="contact_subject" class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900">
								<option value="Product Formulation Query"><?php esc_html_e( 'Product Formulation & Dilution Guide', 'vedha' ); ?></option>
								<option value="Home Delivery Order Status"><?php esc_html_e( 'Home Delivery & Order Status', 'vedha' ); ?></option>
								<option value="5L Bulk Packaging Order"><?php esc_html_e( '5-Litre Bulk Packaging Order', 'vedha' ); ?></option>
								<option value="Automobile Detailing Studio Supply"><?php esc_html_e( 'Automobile Detailing Studio Supply', 'vedha' ); ?></option>
								<option value="Statutory Grievance Redressal"><?php esc_html_e( 'Statutory Grievance Redressal', 'vedha' ); ?></option>
							</select>
						</div>

						<div class="space-y-1 text-xs">
							<label for="contact_message" class="font-bold text-stone-700"><?php esc_html_e( 'Message Details *', 'vedha' ); ?></label>
							<textarea id="contact_message" name="contact_message" rows="5" required placeholder="<?php esc_attr_e( 'Mention your requirements, quantities, or specific enquiry...', 'vedha' ); ?>" class="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900"></textarea>
						</div>

						<button type="submit" class="vedha-btn vedha-btn-primary text-xs py-2.5 px-6">
							<?php esc_html_e( 'Send Enquiry', 'vedha' ); ?>
						</button>
					</form>
				</div>
			</div>

			<!-- Information & Grievance (5 Cols) -->
			<div class="lg:col-span-5 space-y-6">
				<!-- Grievance Card -->
				<div class="vedha-card p-6 bg-white border border-stone-200 rounded-[20px] space-y-4">
					<div class="flex items-center gap-2">
						<span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
						<h2 class="text-sm font-bold uppercase tracking-wider text-stone-900"><?php esc_html_e( 'Statutory Grievance Officer', 'vedha' ); ?></h2>
					</div>
					<p class="text-xs text-stone-600 leading-relaxed">
						<?php esc_html_e( 'In accordance with Consumer Protection (E-Commerce) Rules, 2020 and Information Technology Act, 2000:', 'vedha' ); ?>
					</p>
					<div class="p-3 bg-stone-50 rounded-xl text-xs space-y-1 text-stone-700 border border-stone-100">
						<div><strong>Designation:</strong> <?php esc_html_e( 'Grievance Officer, Vedha Consumer Solutions', 'vedha' ); ?></div>
						<div><strong>Email:</strong> <a href="mailto:info@vedha.ind.in" class="text-emerald-700 hover:underline">info@vedha.ind.in</a></div>
						<div><strong>Phone:</strong> <?php echo esc_html( get_theme_mod( 'vedha_whatsapp_number', '[OWNER TO PROVIDE PHONE]' ) ); ?></div>
						<div><strong>Turnaround Time:</strong> <?php esc_html_e( 'Acknowledgement within 48h, resolution within 30 days', 'vedha' ); ?></div>
					</div>
				</div>

				<!-- Manufacturing Facility Info -->
				<div class="vedha-card p-6 bg-white border border-stone-200 rounded-[20px] space-y-4">
					<h2 class="text-sm font-bold uppercase tracking-wider text-stone-900"><?php esc_html_e( 'Bangalore Facility & Dispatch', 'vedha' ); ?></h2>
					<div class="text-xs text-stone-600 space-y-2">
						<div>
							<strong>Plant Address:</strong><br>
							<?php echo esc_html( get_theme_mod( 'vedha_address_line', 'Attibele Industrial Area, Bangalore, Karnataka - 562107' ) ); ?>
						</div>
						<div>
							<strong>Operational Hours:</strong><br>
							Monday – Saturday: 9:00 AM – 6:00 PM IST<br>
							Sunday: Closed (Manufacturing Maintenance)
						</div>
						<div>
							<strong>GSTIN / Tax ID:</strong><br>
							<span class="font-mono text-stone-800">[OWNER TO PROVIDE GSTIN]</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
