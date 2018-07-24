<?php
/**

 * @package WordPress

 * @subpackage myTheme

 * The template for displaying all pages.

 */
?>

<?php get_header(); ?>





<?php if (have_posts()) : while (have_posts()) : the_post(); ?>



        <section class="clearfix col-xs-12 col-sm-12 col-md-8 col-lg-9" id="content">
            <?php include TEMPLATEPATH . '/includes/breadcrumb.php'; ?>
            <div class="subcontent">
                <h1 class="post-title"><?php the_title(); ?></h1>
                <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                    <div class="entry">
                        <?php the_content(); ?>

<?php edit_post_link( __( 'edit', 'textdomain' ), '<p>', '</p>' ); ?>
                    </div>					
                </div> 

            </div>
        <?php endwhile; ?>

    </section>

<?php endif; ?>

<?php get_sidebar(); ?>



<?php get_footer(); ?>