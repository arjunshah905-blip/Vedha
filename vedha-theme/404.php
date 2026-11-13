<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-20 bg-[var(--vedha-bg-neutral)]">
	<div class="vedha-container max-w-2xl text-center space-y-8">
		<div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-[var(--vedha-red)] text-3xl font-bold font-mono">
			404
		</div>

		<div class="space-y-3">
			<h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900">
				<?php esc_html_e( 'Page or Formulation Not Found', 'vedha' ); ?>
			</h1>
			<p class="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
				<?php esc_html_e( 'The page you requested may have been moved, renamed, or is temporarily unavailable. Try searching our catalogue or navigate to our core divisions below.', 'vedha' ); ?>
			</p>
		</div>

		<div class="max-w-md mx-auto">
			<?php get_search_form(); ?>
		</div>

		<div class="pt-6 border-t border-stone-200">
			<span class="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-4">
				<?php esc_html_e( 'Quick Links', 'vedha' ); ?>
			</span>
			<div class="flex items-center justify-center flex-wrap gap-3">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-4">
					<?php esc_html_e( 'Home', 'vedha' ); ?>
				</a>
				<a href="<?php echo esc_url( home_url( '/#home-care' ) ); ?>" class="vedha-btn vedha-btn-secondary text-xs py-2 px-4">
					<?php esc_html_e( 'Home Care Range', 'vedha' ); ?>
				</a>
				<a href="<?php echo esc_url( home_url( '/#automobile-care' ) ); ?>" class="vedha-btn vedha-btn-secondary text-xs py-2 px-4">
					<?php esc_html_e( 'Auto Care Range', 'vedha' ); ?>
				</a>
				<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="vedha-btn vedha-btn-secondary text-xs py-2 px-4">
					<?php esc_html_e( 'Contact Us', 'vedha' ); ?>
				</a>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
