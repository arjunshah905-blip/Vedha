<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Accessible Skip Navigation Link -->
<a class="screen-reader-text" href="#primary">
	<?php esc_html_e( 'Skip to main content', 'vedha' ); ?>
</a>

<header id="masthead" class="site-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
	<!-- Top Announcement Strip -->
	<div class="vedha-announcement-bar bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center">
		<div class="vedha-container flex items-center justify-between">
			<span class="truncate"><?php esc_html_e( 'Manufactured in Bangalore · Standard 1-Litre & 5-Litre High-Active Formulations', 'vedha' ); ?></span>
			<span class="hidden sm:inline font-mono text-[11px] text-emerald-400"><?php esc_html_e( 'Grievance: info@vedha.ind.in', 'vedha' ); ?></span>
		</div>
	</div>

	<!-- Main Header Bar -->
	<div class="vedha-container">
		<div class="flex items-center justify-between gap-6 h-18">
			<!-- Zone 1: Brand Logo / Wordmark -->
			<div class="site-branding shrink-0">
				<?php vedha_the_custom_logo(); ?>
			</div>

			<!-- Zone 2: Primary Accessible Navigation -->
			<nav id="site-navigation" class="main-navigation hidden md:flex items-center gap-6 text-sm font-semibold" aria-label="<?php esc_attr_e( 'Primary Menu', 'vedha' ); ?>">
				<?php
				if ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu( array(
						'theme_location' => 'primary',
						'menu_id'        => 'primary-menu',
						'container'      => false,
						'menu_class'     => 'flex items-center gap-6 list-none m-0 p-0',
						'fallback_cb'    => false,
					) );
				} else {
					// Fallback dynamic links based on categories & pages
					echo '<ul class="flex items-center gap-6 list-none m-0 p-0 text-stone-700">';
					echo '<li><a href="' . esc_url( home_url( '/#home-care' ) ) . '" class="hover:text-emerald-800 transition-colors">' . esc_html__( 'Home Care', 'vedha' ) . '</a></li>';
					echo '<li><a href="' . esc_url( home_url( '/#automobile-care' ) ) . '" class="hover:text-sky-800 transition-colors">' . esc_html__( 'Auto Care', 'vedha' ) . '</a></li>';
					echo '<li><a href="' . esc_url( home_url( '/#plant-based' ) ) . '" class="hover:text-emerald-800 transition-colors flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>' . esc_html__( 'Plant-Based', 'vedha' ) . '</a></li>';
					if ( class_exists( 'WooCommerce' ) ) {
						echo '<li><a href="' . esc_url( wc_get_page_permalink( 'shop' ) ) . '" class="hover:text-stone-900 transition-colors">' . esc_html__( 'Shop Catalogue', 'vedha' ) . '</a></li>';
					}
					echo '<li><a href="' . esc_url( home_url( '/#why-vedha' ) ) . '" class="hover:text-stone-900 transition-colors">' . esc_html__( 'About', 'vedha' ) . '</a></li>';
					echo '<li><a href="' . esc_url( home_url( '/contact' ) ) . '" class="hover:text-stone-900 transition-colors">' . esc_html__( 'Contact', 'vedha' ) . '</a></li>';
					echo '</ul>';
				}
				?>
			</nav>

			<!-- Zone 3: Actions (Search & Cart) -->
			<div class="header-actions flex items-center gap-3 shrink-0">
				<!-- Search Toggle Button -->
				<button type="button" class="vedha-search-toggle p-2 text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer" aria-label="<?php esc_attr_e( 'Search Formulations', 'vedha' ); ?>" id="vedha-search-btn">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
				</button>

				<?php if ( class_exists( 'WooCommerce' ) ) : ?>
					<!-- Native WooCommerce Cart Button with Live Counter Badge -->
					<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="vedha-cart-button vedha-btn vedha-btn-primary text-xs py-2 px-3.5 relative" aria-label="<?php esc_attr_e( 'View Cart', 'vedha' ); ?>">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
						<span class="hidden sm:inline"><?php esc_html_e( 'Cart', 'vedha' ); ?></span>
						<span class="vedha-cart-count" id="vedha-cart-badge">
							<?php echo esc_html( WC()->cart ? WC()->cart->get_cart_contents_count() : 0 ); ?>
						</span>
					</a>
				<?php endif; ?>

				<!-- Mobile Hamburger Toggle -->
				<button type="button" class="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg cursor-pointer" id="vedha-mobile-toggle" aria-controls="mobile-navigation" aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle Menu', 'vedha' ); ?>">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Drawer Menu -->
	<div id="mobile-navigation" class="mobile-navigation hidden md:hidden bg-white border-t border-stone-200 px-4 py-4" aria-hidden="true">
		<?php
		if ( has_nav_menu( 'primary' ) ) {
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'menu_class'     => 'flex flex-col gap-3 list-none m-0 p-0 text-sm font-semibold',
				'container'      => false,
			) );
		} else {
			echo '<ul class="flex flex-col gap-3 list-none m-0 p-0 text-sm font-semibold text-stone-800">';
			echo '<li><a href="' . esc_url( home_url( '/#home-care' ) ) . '">' . esc_html__( 'Home Care Formulations', 'vedha' ) . '</a></li>';
			echo '<li><a href="' . esc_url( home_url( '/#automobile-care' ) ) . '">' . esc_html__( 'Automobile Detailing Formulations', 'vedha' ) . '</a></li>';
			echo '<li><a href="' . esc_url( home_url( '/#plant-based' ) ) . '" class="text-emerald-700">' . esc_html__( 'Plant-Based & Biodegradable', 'vedha' ) . '</a></li>';
			if ( class_exists( 'WooCommerce' ) ) {
				echo '<li><a href="' . esc_url( wc_get_page_permalink( 'shop' ) ) . '">' . esc_html__( 'All 1L & 5L Products', 'vedha' ) . '</a></li>';
			}
			echo '<li><a href="' . esc_url( home_url( '/#why-vedha' ) ) . '">' . esc_html__( 'Why Vedha', 'vedha' ) . '</a></li>';
			echo '<li><a href="' . esc_url( home_url( '/contact' ) ) . '">' . esc_html__( 'Contact & Grievance', 'vedha' ) . '</a></li>';
			echo '</ul>';
		}
		?>
	</div>

	<!-- Slide-down Search Bar -->
	<div id="vedha-header-search" class="hidden bg-stone-50 border-t border-stone-200 py-3 px-4">
		<div class="vedha-container">
			<?php get_search_form(); ?>
		</div>
	</div>
</header>
<div class="site-content">
