<?php
/**
 * Vedha Customizer Settings
 *
 * @package Vedha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function vedha_customize_register( $wp_customize ) {
	// Brand Info Section
	$wp_customize->add_section( 'vedha_brand_options', array(
		'title'    => __( 'Vedha Brand & Contacts', 'vedha' ),
		'priority' => 30,
	) );

	// WhatsApp Concierge Number
	$wp_customize->add_setting( 'vedha_whatsapp_number', array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'vedha_whatsapp_number', array(
		'label'       => __( 'WhatsApp Helpline Number (e.g. 919876543210)', 'vedha' ),
		'description' => __( 'Used for the direct WhatsApp customer care button.', 'vedha' ),
		'section'     => 'vedha_brand_options',
		'type'        => 'text',
	) );

	// Customer Care Email
	$wp_customize->add_setting( 'vedha_support_email', array(
		'default'           => 'info@vedha.ind.in',
		'sanitize_callback' => 'sanitize_email',
	) );
	$wp_customize->add_control( 'vedha_support_email', array(
		'label'   => __( 'Customer Grievance Email', 'vedha' ),
		'section' => 'vedha_brand_options',
		'type'    => 'email',
	) );

	// Facility City / Address
	$wp_customize->add_setting( 'vedha_address_line', array(
		'default'           => 'Attibele Industrial Area, Bangalore, Karnataka, India',
		'sanitize_callback' => 'sanitize_textarea_field',
	) );
	$wp_customize->add_control( 'vedha_address_line', array(
		'label'   => __( 'Factory / Facility Address', 'vedha' ),
		'section' => 'vedha_brand_options',
		'type'    => 'textarea',
	) );
}
add_action( 'customize_register', 'vedha_customize_register' );
