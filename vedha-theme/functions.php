<?php
/**
 * Vedha Theme Functions & Definitions
 *
 * @package Vedha
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'VEDHA_VERSION', '1.0.0' );
define( 'VEDHA_DIR', get_template_directory() );
define( 'VEDHA_URI', get_template_directory_uri() );

/**
 * 1. Theme Setup
 */
function vedha_theme_setup() {
	// Internationalization
	load_theme_textdomain( 'vedha', VEDHA_DIR . '/languages' );

	// Title tag support
	add_theme_support( 'title-tag' );

	// Post thumbnails / Featured images
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 600, 600, true );
	add_image_size( 'vedha-product-card', 500, 500, true );
	add_image_size( 'vedha-hero', 1200, 630, true );

	// Custom Logo Support with dimensions
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
		'header-text' => array( 'site-title', 'site-description' ),
	) );

	// HTML5 markup support
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
		'navigation-widgets',
	) );

	// Responsive embeds
	add_theme_support( 'responsive-embeds' );

	// Block styles & editor styles
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );
	add_editor_style( 'assets/css/editor-style.css' );

	// Register Navigation Menus
	register_nav_menus( array(
		'primary'   => __( 'Primary Navigation', 'vedha' ),
		'footer_1'  => __( 'Footer Home Care', 'vedha' ),
		'footer_2'  => __( 'Footer Auto Care', 'vedha' ),
		'footer_legal' => __( 'Footer Legal & Policy', 'vedha' ),
	) );

	// WooCommerce Theme Support
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 450,
		'single_image_width'    => 800,
		'product_grid'          => array(
			'default_rows'    => 3,
			'min_rows'        => 1,
			'max_rows'        => 6,
			'default_columns' => 3,
			'min_columns'     => 1,
			'max_columns'     => 4,
		),
	) );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'vedha_theme_setup' );

/**
 * 2. Enqueue Styles & Scripts
 */
function vedha_enqueue_scripts() {
	// Google Fonts (Preconnect and load Manrope + Inter with swap)
	wp_enqueue_style(
		'vedha-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap',
		array(),
		null
	);

	// Core theme stylesheet
	wp_enqueue_style( 'vedha-style', get_stylesheet_uri(), array( 'vedha-fonts' ), VEDHA_VERSION );

	// Custom front-end layout CSS
	wp_enqueue_style( 'vedha-main', VEDHA_URI . '/assets/css/main.css', array( 'vedha-style' ), VEDHA_VERSION );

	// WooCommerce overrides CSS if active
	if ( class_exists( 'WooCommerce' ) ) {
		wp_enqueue_style( 'vedha-woocommerce', VEDHA_URI . '/assets/css/woocommerce.css', array( 'vedha-main' ), VEDHA_VERSION );
	}

	// Navigation & interactive script
	wp_enqueue_script(
		'vedha-navigation',
		VEDHA_URI . '/assets/js/navigation.js',
		array(),
		VEDHA_VERSION,
		true
	);

	// Pass localized data to JavaScript (e.g., AJAX URL, Cart Count)
	wp_localize_script( 'vedha-navigation', 'vedhaData', array(
		'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
		'siteUrl'   => home_url( '/' ),
		'isLoggedIn'=> is_user_logged_in(),
	) );
}
add_action( 'wp_enqueue_scripts', 'vedha_enqueue_scripts' );

/**
 * 3. Content Width
 */
function vedha_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'vedha_content_width', 1240 );
}
add_action( 'after_setup_theme', 'vedha_content_width', 0 );

/**
 * 4. Register Widget Areas
 */
function vedha_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Shop Sidebar', 'vedha' ),
		'id'            => 'shop-sidebar',
		'description'   => __( 'Widgets for product catalogue and archive pages.', 'vedha' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s vedha-card mb-4">',
		'after_widget'  => '</section>',
		'before_title'  => '<h3 class="widget-title text-base font-bold mb-3">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'vedha_widgets_init' );

/**
 * 5. Include Modular Helper Files
 */
require_once VEDHA_DIR . '/inc/seo.php';
require_once VEDHA_DIR . '/inc/template-tags.php';
require_once VEDHA_DIR . '/inc/woocommerce-hooks.php';
require_once VEDHA_DIR . '/inc/customizer.php';
