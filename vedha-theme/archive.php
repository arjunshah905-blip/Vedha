<?php
/**
 * The template for displaying archive pages
 *
 * @package Vedha
 */

get_header();
?>

<main id="primary" class="site-main py-12 bg-[var(--vedha-bg-neutral)]">
	<div class="vedha-container">
		<?php vedha_breadcrumbs(); ?>

		<header class="page-header mb-10 max-w-2xl">
			<h1 class="page-title text-3xl sm:text-4xl font-bold text-stone-900">
				<?php the_archive_title(); ?>
			</h1>
			<?php if ( get_the_archive_description() ) : ?>
				<div class="archive-description text-xs sm:text-sm text-stone-600 mt-2">
					<?php the_archive_description(); ?>
				</div>
			<?php endif; ?>
		</header>

		<?php if ( have_posts() ) : ?>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'vedha-card bg-white border border-stone-200 rounded-[18px] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow' ); ?>>
						<?php if ( has_post_thumbnail() ) : ?>
							<a href="<?php the_permalink(); ?>" class="aspect-[16/10] overflow-hidden bg-stone-100 block">
								<?php the_post_thumbnail( 'medium_large', array( 'class' => 'w-full h-full object-cover hover:scale-105 transition-transform duration-300' ) ); ?>
							</a>
						<?php endif; ?>

						<div class="p-6 space-y-3 flex-1">
							<div class="flex items-center gap-2 text-[11px] text-stone-500">
								<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
									<?php echo esc_html( get_the_date() ); ?>
								</time>
								<span>&bull;</span>
								<span><?php echo esc_html( get_the_author() ); ?></span>
							</div>

							<h2 class="text-lg font-bold text-stone-900 leading-snug">
								<a href="<?php the_permalink(); ?>" class="hover:text-emerald-800 transition-colors">
									<?php the_title(); ?>
								</a>
							</h2>

							<div class="text-xs text-stone-600 leading-relaxed line-clamp-3">
								<?php the_excerpt(); ?>
							</div>
						</div>

						<div class="p-6 pt-0 border-t border-stone-100 mt-auto">
							<a href="<?php the_permalink(); ?>" class="text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors inline-flex items-center gap-1 pt-3">
								<?php esc_html_e( 'Read Article', 'vedha' ); ?> &rarr;
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
				<h2 class="text-xl font-bold text-stone-900"><?php esc_html_e( 'No Records Found', 'vedha' ); ?></h2>
				<p class="text-xs text-stone-600">
					<?php esc_html_e( 'There are no posts currently assigned to this archive.', 'vedha' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="vedha-btn vedha-btn-primary text-xs py-2 px-4 inline-flex">
					<?php esc_html_e( 'Return to Homepage', 'vedha' ); ?>
				</a>
			</div>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
