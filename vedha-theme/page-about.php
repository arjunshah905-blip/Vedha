<?php
/**
 * Template Name: About Vedha
 * Description: Company background, Bangalore manufacturing story, and formulation standards.
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-12 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<!-- Header -->
		<header class="max-w-3xl mb-12 space-y-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--vedha-green-light)] text-[var(--vedha-green)] text-xs font-bold uppercase tracking-wider">
				<?php esc_html_e( 'Bangalore Liquid Science', 'vedha' ); ?>
			</div>
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
				<?php esc_html_e( 'Formulating high-active liquid care with total consumer transparency.', 'vedha' ); ?>
			</h1>
			<p class="text-sm sm:text-base text-stone-600 leading-relaxed">
				<?php esc_html_e( 'Vedha was established in Bangalore to challenge the status quo of modern commercial cleaning: water-diluted formulas packaged in disposable single-use plastic, sold with vague environmental claims.', 'vedha' ); ?>
			</p>
		</header>

		<!-- 3-Pillar Mission Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
			<div class="vedha-card p-6 bg-stone-50 border border-stone-200 rounded-[18px] space-y-3">
				<div class="w-10 h-10 rounded-xl bg-[var(--vedha-green-light)] text-[var(--vedha-green)] flex items-center justify-center font-bold">
					01
				</div>
				<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( 'Concentrated Formulas', 'vedha' ); ?></h2>
				<p class="text-xs text-stone-600 leading-relaxed">
					<?php esc_html_e( 'We do not sell pre-diluted water. Every litre of Vedha formulation is packed with active degreasers, multi-enzymes, or surface surfactants that you dilute at home according to specific task requirements.', 'vedha' ); ?>
				</p>
			</div>

			<div class="vedha-card p-6 bg-stone-50 border border-stone-200 rounded-[18px] space-y-3">
				<div class="w-10 h-10 rounded-xl bg-red-50 text-[var(--vedha-red)] flex items-center justify-center font-bold">
					02
				</div>
				<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( 'Strict Eco Honesty', 'vedha' ); ?></h2>
				<p class="text-xs text-stone-600 leading-relaxed">
					<?php esc_html_e( 'We refuse greenwashing. We explicitly certify that ONLY our Dishwashing Liquid, Floor Cleaner, and Liquid Hand Wash are plant-based and biodegradable. Our heavy-duty automotive and laundry products are formulated with specialized performance polymers.', 'vedha' ); ?>
				</p>
			</div>

			<div class="vedha-card p-6 bg-stone-50 border border-stone-200 rounded-[18px] space-y-3">
				<div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
					03
				</div>
				<h2 class="text-lg font-bold text-stone-900"><?php esc_html_e( 'Indian Water Science', 'vedha' ); ?></h2>
				<p class="text-xs text-stone-600 leading-relaxed">
					<?php esc_html_e( 'Indian tap water ranges from 300 to over 1000 PPM TDS. Our formulations incorporate advanced chelating agents that bond with calcium and magnesium ions, ensuring zero soap scum or water-spotting on utensils and car paint.', 'vedha' ); ?>
				</p>
			</div>
		</div>

		<!-- Facility & Packaging Section -->
		<div class="vedha-card p-8 md:p-12 bg-[var(--vedha-bg-neutral)] border border-stone-200 rounded-[24px] mb-16">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<div class="lg:col-span-7 space-y-5">
					<span class="text-xs font-bold uppercase tracking-wider text-emerald-800"><?php esc_html_e( 'Manufacturing Operations', 'vedha' ); ?></span>
					<h2 class="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
						<?php esc_html_e( 'Bottled in Attibele, Bangalore for residential and professional users.', 'vedha' ); ?>
					</h2>
					<p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
						<?php esc_html_e( 'By manufacturing directly in Bangalore, Vedha eliminates multiple tiers of distributor markup. We standardize all production on two reliable packaging standards: 1-Litre ergonomic bottles for regular countertop use, and 5-Litre high-density polyethylene cans for economical bulk replenishment.', 'vedha' ); ?>
					</p>
					<div class="grid grid-cols-2 gap-4 pt-2">
						<div class="border-l-2 border-stone-300 pl-4 space-y-1">
							<span class="font-bold text-stone-900 text-sm">1-Litre Dispenser</span>
							<p class="text-[11px] text-stone-500">Includes safety cap and precise volumetric graduation.</p>
						</div>
						<div class="border-l-2 border-emerald-600 pl-4 space-y-1">
							<span class="font-bold text-stone-900 text-sm">5-Litre Refill Can</span>
							<p class="text-[11px] text-stone-500">Cuts packaging plastic by over 60% per litre.</p>
						</div>
					</div>
				</div>

				<div class="lg:col-span-5 space-y-4">
					<div class="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
						<h3 class="text-xs font-bold uppercase tracking-wider text-stone-900"><?php esc_html_e( 'Statutory Facility Details', 'vedha' ); ?></h3>
						<div class="space-y-2 text-xs text-stone-600">
							<div><strong>Entity:</strong> Vedha Consumer Solutions Pvt. Ltd.</div>
							<div><strong>Plant Location:</strong> <?php echo esc_html( get_theme_mod( 'vedha_address_line', 'Attibele Industrial Area, Bangalore, Karnataka - 562107' ) ); ?></div>
							<div><strong>Grievance Email:</strong> <?php echo esc_html( get_theme_mod( 'vedha_support_email', 'info@vedha.ind.in' ) ); ?></div>
							<div><strong>GSTIN:</strong> <span class="font-mono text-stone-800">[OWNER TO PROVIDE GSTIN]</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Action Callout -->
		<div class="text-center max-w-xl mx-auto space-y-4">
			<h2 class="text-2xl font-bold text-stone-900"><?php esc_html_e( 'Experience the Formulations', 'vedha' ); ?></h2>
			<p class="text-xs text-stone-600">
				<?php esc_html_e( 'Explore our home care essentials or high-performance vehicle detailing line.', 'vedha' ); ?>
			</p>
			<div class="flex items-center justify-center gap-3">
				<a href="<?php echo esc_url( home_url( '/#bestsellers' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-5">
					<?php esc_html_e( 'View Formulations', 'vedha' ); ?>
				</a>
				<a href="<?php echo esc_url( home_url( '/dealer-enquiry' ) ); ?>" class="vedha-btn vedha-btn-secondary text-xs py-2 px-5">
					<?php esc_html_e( 'Bulk / Dealer Enquiry', 'vedha' ); ?>
				</a>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
