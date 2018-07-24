<?php get_header(); ?>

<section id="content" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <?php while (have_posts()) : the_post(); ?>
        <div id="post-<?php the_ID(); ?>" <?php post_class(); ?> >

            <h2 class="post-title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>

            <div class="postmeta"><?php the_time(get_option('date_format')) ?> - Posted in <?php the_category(', ') ?> - <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>">Permalink</a></div>


            <div class="entry">

                <?php the_excerpt(); ?>

            </div>



            <div class="clear"></div>

        </div>

    <?php endwhile; ?>



    <div class="navigation">

        <?php if (!function_exists('wp_pagenavi') || wp_pagenavi()): ?>

            <div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>

            <div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>

        <?php endif ?>

    </div>
</section>



<?php get_footer(); ?>
