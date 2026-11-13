<?php
/**
 * The template for displaying all pages
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-12 bg-white">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( 'max-w-4xl mx-auto space-y-8' ); ?>>
				<header class="entry-header border-b border-stone-200 pb-6">
					<h1 class="entry-title text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
						<?php the_title(); ?>
					</h1>
					<?php if ( has_excerpt() ) : ?>
						<p class="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
							<?php echo get_the_excerpt(); ?>
						</p>
					<?php endif; ?>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="aspect-[21/9] rounded-2xl overflow-hidden bg-stone-100">
						<?php the_post_thumbnail( 'full', array( 'class' => 'w-full h-full object-cover' ) ); ?>
					</div>
				<?php endif; ?>

				<div class="entry-content prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
					<?php
					the_content();

					wp_link_pages( array(
						'before' => '<div class="page-links py-4 text-xs font-bold">' . esc_html__( 'Pages:', 'vedha' ),
						'after'  => '</div>',
					) );
					?>
				</div>
			</article>
		<?php endwhile; ?>
	</div>
</main>

<?php
get_footer();
