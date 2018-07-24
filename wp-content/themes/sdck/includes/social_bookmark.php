<div class="full_width top_page">
    <div class="fl_left breadcrumb">
        <?php
        if (function_exists('bcn_display')) {
            bcn_display();
        }
        ?>
    </div>

    <?php if (is_category()) { ?>	
        <div class="fl_right social_bookmark">
            <div class="">
                <span class='st_pinterest_hcount' st_title='<?php single_cat_title(); ?>' st_url='<?php echo get_category_link(get_query_var('cat')); ?>' >
                </span>
                <span class='st_facebook_hcount' st_title='<?php single_cat_title(); ?>' st_url='<?php echo get_category_link(get_query_var('cat')); ?>' >
                </span><span class='st_fblike_hcount' st_title='<?php single_cat_title(); ?>' st_url='<?php echo get_category_link(get_query_var('cat')); ?>' ></span>
                <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript">stLight.options({publisher: "faabbfad-6d30-47b6-9da5-0bd318c7d27d", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
            </div>
        </div>
    <?php } else { ?>
        <div class="fl_right social_bookmark">
            <div class="">
                <span class='st_pinterest_hcount' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' ></span>
                <span class='st_facebook_hcount' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' ></span>
                <span class='st_fblike_hcount' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' ></span>
                <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript">stLight.options({publisher: "faabbfad-6d30-47b6-9da5-0bd318c7d27d", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
            </div>
        </div>
    <?php } ?>
</div>
<div class="clearfix"></div>
