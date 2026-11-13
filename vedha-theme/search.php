<?php
/**
 * The template for displaying search results pages
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-12 bg-[var(--vedha-bg-neutral)]">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<header class="page-header mb-8 max-w-2xl">
			<span class="text-xs font-bold uppercase tracking-wider text-stone-500">
				<?php esc_html_e( 'Search Results', 'vedha' ); ?>
			</span>
			<h1 class="page-title text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
				<?php
				/* translators: %s: search query. */
				printf( esc_html__( 'Results for: "%s"', 'vedha' ), '<span class="text-emerald-800">' . esc_html( get_search_query() ) . '</span>' );
				?>
			</h1>
			<p class="text-xs text-stone-600 mt-2">
				<?php
				global $wp_query;
				/* translators: %d: number of results */
				printf( esc_html__( 'Found %d matching item(s).', 'vedha' ), (int) $wp_query->found_posts );
				?>
			</p>
		</header>

		<div class="mb-10 max-w-xl">
			<?php get_search_form(); ?>
		</div>

		<?php if ( have_posts() ) : ?>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'vedha-card p-6 bg-white border border-stone-200 rounded-[18px] flex flex-col justify-between hover:shadow-md transition-shadow' ); ?>>
						<div class="space-y-3">
							<span class="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full inline-block">
								<?php echo esc_html( get_post_type_object( get_post_type() )->labels->singular_name ); ?>
							</span>

							<h2 class="text-lg font-bold text-stone-900 leading-snug">
								<a href="<?php the_permalink(); ?>" class="hover:text-emerald-800 transition-colors">
									<?php the_title(); ?>
								</a>
							</h2>

							<div class="text-xs text-stone-600 leading-relaxed line-clamp-3">
								<?php the_excerpt(); ?>
							</div>
						</div>

						<div class="pt-4 mt-4 border-t border-stone-100">
							<a href="<?php the_permalink(); ?>" class="text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors inline-flex items-center gap-1">
								<?php esc_html_e( 'View Details', 'vedha' ); ?> &rarr;
							</a>
						</div>
					</article>
				<?php endwhile; ?>
			</div>

			<div class="mt-12">
				<?php
				the_posts_pagination( array(
					'mid_size'  => 2,
					'prev_text' => __( '&larr; Previous', 'vedha' ),
					'next_text' => __( 'Next &rarr;', 'vedha' ),
					'class'     => 'vedha-pagination flex justify-center gap-2 text-xs font-bold',
				) );
				?>
			</div>
		<?php else : ?>
			<div class="vedha-card p-12 bg-white border border-stone-200 rounded-[20px] text-center max-w-xl mx-auto space-y-4">
				<div class="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
				</div>
				<h2 class="text-xl font-bold text-stone-900"><?php esc_html_e( 'No Matching Formulations Found', 'vedha' ); ?></h2>
				<p class="text-xs text-stone-600">
					<?php esc_html_e( 'Sorry, but nothing matched your search terms. Please check your spelling or try searching for keywords like "Floor Cleaner", "Dishwashing", or "Car Shampoo".', 'vedha' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-4 inline-flex">
					<?php esc_html_e( 'Back to Homepage', 'vedha' ); ?>
				</a>
			</div>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
