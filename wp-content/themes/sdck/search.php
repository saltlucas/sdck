<?php/** * @package WordPress * @subpackage myTheme * The template for displaying Search Results pages. */?><?php get_header(); ?><?php if (have_posts()) : ?>    <section class="clearfix col-12 col-sm-12 col-lg-9" id="content">          <?php include TEMPLATEPATH . '/includes/breadcrumb.php'; ?>        <h1 class="post-title"><?php printf(( 'Search Results for: %s'), '<span>' . get_search_query() . '</span>'); ?></h1>        <?php while (have_posts()) : the_post(); ?>            <div id="post-<?php the_ID(); ?>" <?php post_class('post_listing'); ?> >                <h2 class="post-title"><?php the_title(); ?></h2>                <div class="entry">                    <?php the_excerpt(); ?>                    <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php _e('Read more...'); ?></a>                </div>                <div class="clear"></div>            </div>        <?php endwhile; ?>        <div class="navigation">            <?php if (!function_exists('wp_pagenavi') || wp_pagenavi()): ?>                <div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>                <div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>            <?php endif ?>        </div>    </section><?php else : ?>    <section id="content">        <h2 class="center">Not Found</h2>        <p class="center">Sorry, but you are looking for something that isn't here.</p>    </section>	<?php endif; ?><?php get_sidebar(); ?><?php get_footer(); ?>