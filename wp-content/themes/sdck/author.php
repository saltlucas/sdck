<?php
/**

 * @package WordPress

 * @subpackage myTheme

 * The template for displaying Archive pages.

 */
?>

<?php get_header(); ?>

<?php 
$curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
?>


<?php /* if (have_posts()) : */ ?>

    <section class="clearfix col-xs-12 col-sm-12 col-md-8 col-lg-9" id="content">    
    <?php include TEMPLATEPATH . '/includes/breadcrumb.php'; ?>
        <?php $post = $posts[0]; ?>
        <h3><?php echo $curauth->display_name; ?></h3>
        <p><?php echo $curauth->description; ?></p>

        <?php echo get_related_author_posts(); ?>

        <?php /*
        <h1 class="post-title">Author Archive</h1>

        <?php while (have_posts()) : the_post(); ?>



            <div id="post-<?php the_ID(); ?>" <?php post_class('post_listing'); ?> >

                <h2 class="post-title"><?php the_title(); ?></h2>
                <div class="entry">
                    <?php the_excerpt(); ?>
                    <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php _e('Read more...'); ?></a>
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
        */ ?>


    </section>
<?php /*
<?php else : ?>

    <section class="clearfix col-xs-12 col-sm-12 col-md-8 col-lg-9" id="content">

        <h2>Not Found</h2>
        <p>This author doesn't have any articles.</p>

    </section>

<?php endif; ?>
*/?>





<?php get_sidebar(); ?>



<?php get_footer(); ?>