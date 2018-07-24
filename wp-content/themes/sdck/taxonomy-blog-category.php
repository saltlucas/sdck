<?php/**  Template Name: Blog */?><?php get_header(); ?><section class="clearfix col-xs-12 col-sm-12 col-md-8 col-lg-9" id="content">    <?php include TEMPLATEPATH . '/includes/breadcrumb.php'; ?>    <div class="subcontent">            <div class="entry">                <?php if (have_posts()) : ?>                    <?php                    while (have_posts()) : the_post();                        ?>                        <div class="blog_item">                            <h3 class="catItemTitle"> <a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h3>                            <div class="blog_meta"><?php _e('Written by'); ?> <!<a href="<?php echo get_author_posts_url(get_the_author_meta('ID'), get_the_author_meta('user_nicename')); ?>"> <?php the_author(); ?><!--</a>--></div>                            <?php the_content(); ?>                            <div class="bottom_meta"><strong><?php _e('Published in') ?></strong> <?php echo get_custom_taxonomies($post, 'blog-category'); ?></div>                        </div>                        <?php                    endwhile;                    ?>                    <div class="navigation">                        <?php if (!function_exists('wp_pagenavi') || wp_pagenavi()): ?>                            <div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>                            <div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>                        <?php endif ?>                    </div>                <?php endif; ?>                <div class="bottom_widget">                    <?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar-Bottom-Blog')) : ?>                    <?php endif; ?>                </div>         				        </div>     </div></section><?php get_sidebar(); ?><?php get_footer(); ?>