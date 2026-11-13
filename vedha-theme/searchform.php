<?php
/**
 * Template for displaying search forms
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<form role="search" method="get" class="vedha-search-form flex items-center gap-2 max-w-xl mx-auto" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label for="vedha-search-field" class="screen-reader-text">
		<?php esc_html_e( 'Search Vedha Formulations', 'vedha' ); ?>
	</label>
	<div class="relative w-full">
		<input
			type="search"
			id="vedha-search-field"
			class="w-full px-4 py-2.5 pl-10 text-xs text-stone-900 bg-white border border-stone-300 rounded-[var(--vedha-input-radius)] focus:outline-none focus:border-stone-900"
			placeholder="<?php echo esc_attr_x( 'Search products, dilutions (e.g. Dishwashing, Car Shampoo)...', 'placeholder', 'vedha' ); ?>"
			value="<?php echo get_search_query(); ?>"
			name="s"
		/>
		<svg class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
		</svg>
	</div>
	<button type="submit" class="vedha-btn vedha-btn-primary text-xs py-2.5 px-4 shrink-0">
		<?php esc_html_e( 'Search', 'vedha' ); ?>
	</button>
</form>
