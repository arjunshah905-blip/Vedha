<?php
/**
 * SEO & Structured Data Functions
 * Compatible with Rank Math & Yoast SEO (checks for their presence before outputting fallback tags).
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 1. Output Open Graph, Meta and Canonical Tags (if no SEO plugin active)
 */
function vedha_seo_meta_tags() {
	// If Yoast or Rank Math is active, let them handle standard meta tags to prevent duplication
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}

	$site_title = get_bloginfo( 'name' );
	$site_desc  = get_bloginfo( 'description' );
	$canonical  = wp_get_canonical_url();

	if ( ! $canonical ) {
		$canonical = home_url( add_query_arg( array(), $GLOBALS['wp']->request ) );
	}

	$meta_desc = $site_desc ? $site_desc : __( 'Vedha manufactures premium home care and automobile care liquid formulations in Bangalore. Featuring verified plant-based and biodegradable household essentials alongside high-performance vehicle care.', 'vedha' );

	if ( is_singular() ) {
		$post = get_queried_object();
		if ( $post && has_excerpt( $post->ID ) ) {
			$meta_desc = wp_strip_all_tags( get_the_excerpt( $post->ID ) );
		}
	}

	echo '<meta name="description" content="' . esc_attr( $meta_desc ) . '">' . "\n";
	echo '<link rel="canonical" href="' . esc_url( $canonical ) . '">' . "\n";

	// Open Graph Tags
	echo '<meta property="og:locale" content="' . esc_attr( get_locale() ) . '">' . "\n";
	echo '<meta property="og:site_name" content="' . esc_attr( $site_title ) . '">' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( wp_get_document_title() ) . '">' . "\n";
	echo '<meta property="og:description" content="' . esc_attr( $meta_desc ) . '">' . "\n";
	echo '<meta property="og:url" content="' . esc_url( $canonical ) . '">' . "\n";
	echo '<meta property="og:type" content="' . ( is_singular() ? 'article' : 'website' ) . '">' . "\n";

	if ( is_singular() && has_post_thumbnail() ) {
		$img_src = wp_get_attachment_image_src( get_post_thumbnail_id(), 'vedha-hero' );
		if ( $img_src ) {
			echo '<meta property="og:image" content="' . esc_url( $img_src[0] ) . '">' . "\n";
			echo '<meta property="og:image:width" content="' . esc_attr( $img_src[1] ) . '">' . "\n";
			echo '<meta property="og:image:height" content="' . esc_attr( $img_src[2] ) . '">' . "\n";
		}
	}

	// Twitter Cards
	echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr( wp_get_document_title() ) . '">' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr( $meta_desc ) . '">' . "\n";
}
add_action( 'wp_head', 'vedha_seo_meta_tags', 1 );

/**
 * 2. Output Schema.org JSON-LD (Organization, LocalBusiness, Breadcrumbs)
 */
function vedha_schema_jsonld() {
	$site_url  = home_url( '/' );
	$site_name = get_bloginfo( 'name' );

	$schema = array(
		'@context' => 'https://schema.org',
		'@graph'   => array(
			// Organization
			array(
				'@type'            => 'Organization',
				'@id'              => esc_url( $site_url ) . '#organization',
				'name'             => $site_name,
				'url'              => esc_url( $site_url ),
				'logo'             => array(
					'@type'      => 'ImageObject',
					'url'        => esc_url( get_theme_mod( 'vedha_logo_url', home_url( '/wp-content/themes/vedha/assets/images/vedha-logo.svg' ) ) ),
					'caption'    => esc_attr( $site_name ),
				),
				'email'            => 'info@vedha.ind.in',
				'telephone'        => '[OWNER TO PROVIDE PHONE]',
				'address'          => array(
					'@type'           => 'PostalAddress',
					'addressLocality' => 'Attibele, Bangalore',
					'addressRegion'   => 'Karnataka',
					'postalCode'      => '562107',
					'addressCountry'  => 'IN',
				),
			),
			// LocalBusiness
			array(
				'@type'        => 'LocalBusiness',
				'@id'          => esc_url( $site_url ) . '#localbusiness',
				'name'         => $site_name,
				'url'          => esc_url( $site_url ),
				'priceRange'   => '₹₹',
				'address'      => array(
					'@type'           => 'PostalAddress',
					'streetAddress'   => '[OWNER TO PROVIDE STREET ADDRESS]',
					'addressLocality' => 'Attibele, Bangalore',
					'addressRegion'   => 'Karnataka',
					'postalCode'      => '562107',
					'addressCountry'  => 'IN',
				),
			),
			// WebSite
			array(
				'@type'      => 'WebSite',
				'@id'        => esc_url( $site_url ) . '#website',
				'url'        => esc_url( $site_url ),
				'name'       => $site_name,
				'publisher'  => array(
					'@id' => esc_url( $site_url ) . '#organization',
				),
				'potentialAction' => array(
					'@type'       => 'SearchAction',
					'target'      => esc_url( $site_url ) . '?s={search_term_string}',
					'query-input' => 'required name=search_term_string',
				),
			),
		),
	);

	// BreadcrumbList if not front page
	if ( ! is_front_page() ) {
		$breadcrumbs = array(
			'@type'           => 'BreadcrumbList',
			'itemListElement' => array(
				array(
					'@type'    => 'ListItem',
					'position' => 1,
					'name'     => __( 'Home', 'vedha' ),
					'item'     => esc_url( home_url( '/' ) ),
				),
			),
		);

		$position = 2;
		if ( is_singular( 'product' ) && function_exists( 'wc_get_product' ) ) {
			$terms = get_the_terms( get_the_ID(), 'product_cat' );
			if ( $terms && ! is_wp_error( $terms ) ) {
				$main_term = $terms[0];
				$breadcrumbs['itemListElement'][] = array(
					'@type'    => 'ListItem',
					'position' => $position++,
					'name'     => $main_term->name,
					'item'     => get_term_link( $main_term ),
				);
			}
			$breadcrumbs['itemListElement'][] = array(
				'@type'    => 'ListItem',
				'position' => $position,
				'name'     => get_the_title(),
				'item'     => get_permalink(),
			);
		} elseif ( is_page() ) {
			$breadcrumbs['itemListElement'][] = array(
				'@type'    => 'ListItem',
				'position' => $position,
				'name'     => get_the_title(),
				'item'     => get_permalink(),
			);
		}

		$schema['@graph'][] = $breadcrumbs;
	}

	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
}
add_action( 'wp_head', 'vedha_schema_jsonld', 10 );
