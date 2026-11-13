<?php
/**
 * Custom Template Tags and Helpers
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Display Breadcrumbs with Microdata markup
 */
function vedha_breadcrumbs() {
	if ( is_front_page() ) {
		return;
	}

	echo '<nav aria-label="' . esc_attr__( 'Breadcrumbs', 'vedha' ) . '" class="vedha-breadcrumbs py-3 text-xs text-stone-600 border-b border-stone-200 mb-6">';
	echo '<div class="vedha-container flex items-center flex-wrap gap-2">';
	echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="hover:text-stone-900">' . esc_html__( 'Home', 'vedha' ) . '</a>';
	echo '<span class="text-stone-400" aria-hidden="true">/</span>';

	if ( is_singular( 'product' ) ) {
		$terms = get_the_terms( get_the_ID(), 'product_cat' );
		if ( $terms && ! is_wp_error( $terms ) ) {
			echo '<a href="' . esc_url( get_term_link( $terms[0] ) ) . '" class="hover:text-stone-900">' . esc_html( $terms[0]->name ) . '</a>';
			echo '<span class="text-stone-400" aria-hidden="true">/</span>';
		}
		echo '<span class="text-stone-900 font-semibold" aria-current="page">' . esc_html( get_the_title() ) . '</span>';
	} elseif ( is_tax( 'product_cat' ) ) {
		$term = get_queried_object();
		echo '<span class="text-stone-900 font-semibold" aria-current="page">' . esc_html( $term->name ) . '</span>';
	} elseif ( is_page() ) {
		echo '<span class="text-stone-900 font-semibold" aria-current="page">' . esc_html( get_the_title() ) . '</span>';
	} elseif ( is_single() ) {
		$categories = get_the_category();
		if ( ! empty( $categories ) ) {
			echo '<a href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
			echo '<span class="text-stone-400" aria-hidden="true">/</span>';
		}
		echo '<span class="text-stone-900 font-semibold" aria-current="page">' . esc_html( get_the_title() ) . '</span>';
	} elseif ( is_search() ) {
		/* translators: %s: search query */
		echo '<span class="text-stone-900 font-semibold" aria-current="page">' . sprintf( esc_html__( 'Search: "%s"', 'vedha' ), get_search_query() ) . '</span>';
	} elseif ( is_404() ) {
		echo '<span class="text-stone-900 font-semibold" aria-current="page">' . esc_html__( 'Page Not Found', 'vedha' ) . '</span>';
	}

	echo '</div>';
	echo '</nav>';
}

/**
 * Check if a product ID is one of the 3 strictly verified plant-based & biodegradable products
 */
function vedha_is_verified_plant_based( $product_id ) {
	$product = wc_get_product( $product_id );
	if ( ! $product ) {
		return false;
	}

	$slug = $product->get_slug();
	$name = strtolower( $product->get_name() );

	// Only Dishwashing Liquid, Floor Cleaner and Hand Wash are plant-based and biodegradable
	if ( strpos( $slug, 'dish' ) !== false || strpos( $name, 'dishwash' ) !== false ) {
		return true;
	}
	if ( ( strpos( $slug, 'floor' ) !== false || strpos( $name, 'floor cleaner' ) !== false ) && strpos( $name, 'plant' ) !== false ) {
		return true;
	}
	if ( strpos( $slug, 'hand' ) !== false || strpos( $name, 'hand wash' ) !== false ) {
		return true;
	}

	return false;
}

/**
 * Output verified sustainability badge
 */
function vedha_sustainability_badge( $product_id = null ) {
	if ( ! $product_id ) {
		$product_id = get_the_ID();
	}
	if ( vedha_is_verified_plant_based( $product_id ) ) {
		echo '<span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-[var(--vedha-green-light)] text-[var(--vedha-green)] px-2.5 py-0.5 rounded-full" title="' . esc_attr__( 'Verified plant-based surfactant system. 100% biodegradable.', 'vedha' ) . '">';
		echo '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
		echo ' ' . esc_html__( 'Plant-Based & Biodegradable', 'vedha' );
		echo '</span>';
	}
}

/**
 * Fallback Custom Logo SVG Output (Red #D4161C + Clean Type)
 */
function vedha_the_custom_logo() {
	if ( has_custom_logo() ) {
		the_custom_logo();
	} else {
		echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="custom-logo-link flex items-center gap-2" rel="home">';
		echo '<svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vedha Home & Automobile Care Logo">';
		echo '<rect width="36" height="36" rx="8" fill="#D4161C"/>';
		echo '<path d="M10 12L18 28L26 12H21.5L18 21.5L14.5 12H10Z" fill="#FFFFFF"/>';
		echo '<circle cx="18" cy="10" r="2.5" fill="#14602F"/>';
		echo '<text x="44" y="26" fill="#1A1A1A" font-family="Manrope, sans-serif" font-weight="800" font-size="20" letter-spacing="1">VEDHA</text>';
		echo '</svg>';
		echo '</a>';
	}
}
