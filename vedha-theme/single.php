<?php
/**
 * The template for displaying all single posts
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
			<article id="post-<?php the_ID(); ?>" <?php post_class( 'max-w-3xl mx-auto space-y-8' ); ?>>
				<header class="entry-header space-y-4 border-b border-stone-200 pb-6">
					<div class="flex items-center gap-2 text-xs text-stone-500">
						<span class="font-bold uppercase tracking-wider text-emerald-800">
							<?php the_category( ', ' ); ?>
						</span>
						<span>&bull;</span>
						<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
							<?php echo esc_html( get_the_date() ); ?>
						</time>
					</div>

					<h1 class="entry-title text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
						<?php the_title(); ?>
					</h1>

					<div class="flex items-center gap-3 pt-2">
						<div class="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center font-bold text-xs text-stone-700">
							<?php echo esc_html( substr( get_the_author(), 0, 1 ) ); ?>
						</div>
						<div class="text-xs">
							<span class="font-bold text-stone-900 block"><?php echo esc_html( get_the_author() ); ?></span>
							<span class="text-stone-500"><?php esc_html_e( 'Vedha Formulations Lab', 'vedha' ); ?></span>
						</div>
					</div>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
						<?php the_post_thumbnail( 'large', array( 'class' => 'w-full h-full object-cover' ) ); ?>
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

				<?php if ( has_tag() ) : ?>
					<div class="entry-tags pt-6 border-t border-stone-100 flex items-center gap-2 flex-wrap text-xs">
						<span class="font-bold text-stone-700"><?php esc_html_e( 'Tags:', 'vedha' ); ?></span>
						<?php the_tags( '<span class="bg-stone-100 px-2.5 py-1 rounded-md text-stone-600">', '</span> <span class="bg-stone-100 px-2.5 py-1 rounded-md text-stone-600">', '</span>' ); ?>
					</div>
				<?php endif; ?>

				<!-- Author Bio / Lab Sign-off -->
				<div class="p-6 bg-[var(--vedha-bg-neutral)] rounded-2xl border border-stone-200 space-y-2 text-xs">
					<div class="font-bold text-stone-900"><?php esc_html_e( 'About Vedha Technical Insights', 'vedha' ); ?></div>
					<p class="text-stone-600 leading-relaxed">
						<?php esc_html_e( 'Articles published by the Vedha team are written by product chemists and detailing technicians based in Bangalore, committed to safe dilution chemistry, surface protection, and authentic consumer transparency.', 'vedha' ); ?>
					</p>
				</div>

				<!-- Prev / Next Navigation -->
				<nav class="navigation post-navigation py-6 border-t border-stone-200 flex justify-between gap-4 text-xs font-semibold" aria-label="<?php esc_attr_e( 'Post navigation', 'vedha' ); ?>">
					<div class="nav-previous">
						<?php previous_post_link( '%link', '&larr; %title' ); ?>
					</div>
					<div class="nav-next text-right">
						<?php next_post_link( '%link', '%title &rarr;' ); ?>
					</div>
				</nav>

				<?php
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;
				?>
			</article>
		<?php endwhile; ?>
	</div>
</main>

<?php
get_footer();
