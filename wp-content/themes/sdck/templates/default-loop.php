<div class="post_slider_controls">
    <span class="nspPrev">Prev</span>
    <span class="nspNext">Next</span>
</div>

<div class="su-posts su-posts-default-loop cycle-slideshow widget_slider_post" 
     data-cycle-slides="> div"
     data-cycle-fx=scrollHorz
     data-cycle-prev=".nspPrev"
     data-cycle-next=".nspNext"
     data-cycle-auto-height=container
     data-cycle-timeout=0
     >
         <?php
         // Posts are found
         if ($posts->have_posts()) {
             while ($posts->have_posts()) :
                 $posts->the_post();
                 global $post;
                 ?>

            <div id="su-post-<?php the_ID(); ?>" class="su-post">

                <h4 class="su-post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                <?php if (has_post_thumbnail()) : ?>
                    <a class="" href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
                <?php endif; ?>
                <div class="su-post-meta"><?php _e('Posted', 'shortcodes-ultimate'); ?>: <?php the_time(get_option('date_format')); ?></div>
                <div class="su-post-excerpt">
                    <?php the_excerpt(); ?>
                </div>
                <a href="<?php comments_link(); ?>" class="su-post-comments-link"><?php comments_number(__('0 comments', 'shortcodes-ultimate'), __('1 comment', 'shortcodes-ultimate'), '% comments'); ?></a>
            </div>

            <?php
        endwhile;
    }
    // Posts not found
    else {
        echo '<h4>' . __('Posts not found', 'shortcodes-ultimate') . '</h4>';
    }
    ?>
</div>