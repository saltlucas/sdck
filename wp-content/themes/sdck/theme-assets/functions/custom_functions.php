<?php

function get_related_author_posts() {
    global $authordata, $post;
    $authors_posts = get_posts(array('author' => $authordata->ID, 'post__not_in' => array($post->ID), 'post_type' => 'blog', 'posts_per_page' => 5));
    $output = '<h3>Latest from ' . get_the_author().'</h3>';
    $output .= '<ul class="list_related">';
    foreach ($authors_posts as $authors_post) {
        $output .= '<li><a href="' . get_permalink($authors_post->ID) . '">' . apply_filters('the_title', $authors_post->post_title, $authors_post->ID) . '</a></li>';
    }
    $output .= '</ul>';
    wp_reset_query();
    return $output;

}

function get_custom_taxonomies($post, $taxonomy = "") {
    $str = "";
    $terms = get_the_terms($post->ID, $taxonomy);
    $i = 0;
    foreach ($terms as $term) {
        if ($i == 0) {
            $str .="<a href='" . get_term_link($term, $taxonomy) . "'>" . $term->name . "</a>";
        } else {
            $str .= ", " . "<a href='" . get_term_link($term, $taxonomy) . "'>" . $term->name . "</a>";
        }
        $i++;
    }
    return $str;
}

/* add_action('init', 'html_page_permalink', -1); */
register_activation_hook(__FILE__, 'cvf_active');
register_deactivation_hook(__FILE__, 'cvf_deactive');

/* function html_page_permalink() {

    global $wp_rewrite;

    if (!strpos($wp_rewrite->get_page_permastruct(), '.html')) {
        $wp_rewrite->page_structure = $wp_rewrite->page_structure . '.html';
    }
} */

add_filter('user_trailingslashit', 'no_page_slash', 66, 2);

function no_page_slash($string, $type) {

    global $wp_rewrite;

    if ($wp_rewrite->using_permalinks() && $wp_rewrite->use_trailing_slashes == true && $type == 'page') {
        return untrailingslashit($string);
    } else {
        return $string;
    }
}

function cvf_active() {

    global $wp_rewrite;

    if (!strpos($wp_rewrite->get_page_permastruct(), '.html')) {
        $wp_rewrite->page_structure = $wp_rewrite->page_structure . '.html';
    }
    $wp_rewrite->flush_rules();
}

function cvf_deactive() {

    global $wp_rewrite;

    $wp_rewrite->page_structure = str_replace(".html", "", $wp_rewrite->page_structure);
    $wp_rewrite->flush_rules();
}

add_filter('post_link', 'brand_permalink', 1, 3);
add_filter('post_type_link', 'brand_permalink', 1, 3);

function brand_permalink($permalink, $post_id, $leavename) {
    //con %brand% catturo il rewrite del Custom Post Type
    if (strpos($permalink, '%blog_category%') === FALSE)
        return $permalink;
    // Get post
    $post = get_post($post_id);
    if (!$post)
        return $permalink;

    // Get taxonomy terms
    $terms = wp_get_object_terms($post->ID, 'blog_category');
    if (!is_wp_error($terms) && !empty($terms) && is_object($terms[0]))
        $taxonomy_slug = $terms[0]->slug;
    else
        $taxonomy_slug = 'no-blog-category';

    return str_replace('%blog_category%', $taxonomy_slug, $permalink);
}


add_action('init', 'create_book_taxonomies', 0);

// create two taxonomies, genres and writers for the post type "book"
function create_book_taxonomies() {
    // Add new taxonomy, make it hierarchical (like categories)
    $labels = array(
        'name' => _x('Blog Category', 'taxonomy general name'),
        'singular_name' => _x('Blog Category', 'taxonomy singular name'),
        'search_items' => __('Search Blog Category'),
        'all_items' => __('All Blog Category'),
        'parent_item' => __('Parent Blog Category'),
        'parent_item_colon' => __('Parent Blog Category:'),
        'edit_item' => __('Edit Blog Category'),
        'update_item' => __('Update Blog Category'),
        'add_new_item' => __('Add New Blog Category'),
        'new_item_name' => __('New Blog Category'),
        'menu_name' => __('Blog Category'),
    );

    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'show_admin_column' => true,
        'public' => true,
        'query_var' => 'blog_category',
        'rewrite' => array("slug" => "blog/category", 'with_front'=>true),
        '_builtin' => false,
    );

    register_taxonomy('blog_category', array('blog'), $args);

    // Add new taxonomy, NOT hierarchical (like tags)
    $labels = array(
        'name' => _x('tags', 'taxonomy general name'),
        'singular_name' => _x('Tag', 'taxonomy singular name'),
        'search_items' => __('Search Tags'),
        'popular_items' => __('Popular Tags'),
        'all_items' => __('All Tags'),
        'parent_item' => null,
        'parent_item_colon' => null,
        'edit_item' => __('Edit Tag'),
        'update_item' => __('Update Tag'),
        'add_new_item' => __('Add New Tag'),
        'new_item_name' => __('New Writer Name'),
        'separate_items_with_commas' => __('Separate Tag with commas'),
        'add_or_remove_items' => __('Add or remove Tag'),
        'choose_from_most_used' => __('Choose from the most used Tag'),
        'not_found' => __('No Tag found.'),
        'menu_name' => __('Tags'),
    );

    $args = array(
        'hierarchical' => false,
        'labels' => $labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var' => true,
        'rewrite' => array('slug' => 'blog-tag'),
    );

    register_taxonomy('blog_tag', 'blog', $args);
}

function post_type_slider() {
    register_post_type('slider', array(
        'label' => __('Slider'),
        'public' => true,
        'show_ui' => true,
        '_builtin' => false, // It's a custom post type, not built in
        '_edit_link' => 'post.php?post=%d',
        'capability_type' => 'post',
        'hierarchical' => false,
        'orderby' => 'menu_order',
        'rewrite' => array("slug" => "slider"), // Permalinks
        'query_var' => "slider",
        'menu_position' => null,
        'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
    ));
    register_post_type('blog', array(
        'label' => __('Blog'),
        'public' => true,
        'show_ui' => true,
        '_builtin' => false, // It's a custom post type, not built in
        '_edit_link' => 'post.php?post=%d',
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'rewrite' => array('slug' => 'blog', 'with_front' => true, 'pages'=> true), // Permalinks
        'query_var' => "blog",
        'menu_position' => null,
        'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky'),
    ));
    flush_rewrite_rules(false);
}

add_action('init', 'post_type_slider');
add_action('after_setup_theme', 'my_theme_setup');




function my_theme_setup() {
    add_image_size('edit-screen-thumbnail', 100, 100, true);
}

add_filter('manage_edit-slider_columns', 'my_columns_filter', 10, 2);

function my_columns_filter($columns) {

    $column_thumbnail = array('thumbnail' => 'Thumbnail');

    //$column_wordcount = array( 'wordcount' => 'Word count' );

    $columns = array_slice($columns, 0, 2, true) + $column_thumbnail + array_slice($columns, 1, NULL, true);

    //$columns = array_slice( $columns, 0, 3, true ) + $column_wordcount + array_slice( $columns, 3, NULL, true );

    return $columns;
}

add_action('manage_posts_custom_column', 'my_column_action', 10, 1);

function my_column_action($column) {

    global $post;

    switch ($column) {

        case 'thumbnail':

            echo get_the_post_thumbnail($post->ID, 'edit-screen-thumbnail');

            break;

        //case 'wordcount':
        //echo str_word_count( $post->post_content );
        //break;
    }
}

function truncate_post($amount, $quote_after = false, $readmore = true) {

    $truncate = get_the_content();

    $truncate = apply_filters('the_content', $truncate);

    $truncate = preg_replace('@<script[^>]*?>.*?</script>@si', '', $truncate);

    $truncate = preg_replace('@<style[^>]*?>.*?</style>@si', '', $truncate);

    $truncate = strip_tags($truncate);

    $truncate = substr($truncate, 0, strrpos(substr($truncate, 0, $amount), ' '));

    echo $truncate . '...';

    if ($readmore == true) {

        echo "<a class='clearfix read-more' href='" . get_permalink() . "'>Read more.</a>";
    }
    if ($quote_after)
        echo ('"');
}

function ds_get_ao($the_value) { //Get the value of an admin option
    global $ds_theme_key;
    $the_value_raw = get_option($ds_theme_key . $the_value);
    return $the_value_raw;
}

function ds_ao($the_value) { //Print the value of an admin option
    global $ds_theme_key;
    $the_value_raw = get_option($ds_theme_key . $the_value);
    echo $the_value_raw;
}

function ds_get_cf($the_meta_key) { //Get post custom field
    global $post, $ds_custom_field_key;
    $raw_meta_key = get_post_meta($post->ID, $ds_custom_field_key . $the_meta_key . '_value', true);
    return $raw_meta_key;
}

function ds_cf($the_meta_key) { //Print post custom field
    global $post, $ds_custom_field_key;
    $raw_meta_key = get_post_meta($post->ID, $ds_custom_field_key . $the_meta_key . '_value', true);
    if ($the_meta_key == 'price') :
        echo number_format($raw_meta_key, 0);
    else :
        echo $raw_meta_key;
    endif;
}

function ds_timthumb_image_url($the_url, $the_width = 500, $the_height = 250, $the_alt = '', $default = '/images/default_empty_image_featured.jpg', $the_class = '', $no_def = 0) { //Timthumb function
    if (!$the_url) :
        if ($no_def) :
            return false;
        else :
            return get_bloginfo('template_url') . '/theme-assets/php/timthumb.php?src=' . get_bloginfo('template_url') . $default . '&amp;h=' . $the_height . '&amp;w=' . $the_width;
        endif;
    else :
        global $blog_id;

        if (isset($blog_id) && $blog_id > 0) :
            $url_parts = explode('/files/', $the_url);
            if (isset($url_parts[1])) {
                $the_url = '/blogs.dir/' . $blog_id . '/files/' . $url_parts[1];
            }
            return get_bloginfo('template_url') . '/theme-assets/php/timthumb.php?src=' . $the_url . '&amp;h=' . $the_height . '&amp;w=' . $the_width;
        else:
            return get_bloginfo('template_url') . '/theme-assets/php/timthumb.php?src=' . $the_url . '&amp;h=' . $the_height . '&amp;w=' . $the_width;
        endif;
    endif;
}

function ds_timthumb_image($the_url, $the_width = 500, $the_height = 250, $the_alt = '', $default = '/images/default_empty_image_featured.jpg', $the_class = '', $no_def = 0) { //Timthumb function
    if (!$the_url) :
        if ($no_def) :
            return false;
        else :
            echo '<img alt="' . $the_alt . '" src="' . get_bloginfo('template_url') . '/theme-assets/php/timthumb.php?src=' . get_bloginfo('template_url') . $default . '&amp;h=' . $the_height . '&amp;w=' . $the_width . '"  class="' . $the_class . '" width="' . $the_width . '" height="' . $the_height . '" />';
        endif;
    else :
        global $blog_id;
        if (isset($blog_id) && $blog_id > 0) :
            $url_parts = explode('/files/', $the_url);
            if (isset($url_parts[1])) {
                $the_url = '/blogs.dir/' . $blog_id . '/files/' . $url_parts[1];
            }
            echo '<img alt="' . $the_alt . '"  src="' . get_bloginfo('template_url') . '/theme-assets/php/timthumb.php?src=' . $the_url . '&amp;h=' . $the_height . '&amp;w=' . $the_width . '"  class="' . $the_class . '"  width="' . $the_width . '" height="' . $the_height . '" />';
        else:
            echo '<img alt="' . $the_alt . '"  src="' . get_bloginfo('template_url') . '/theme-assets/php/timthumb.php?src=' . $the_url . '&amp;h=' . $the_height . '&amp;w=' . $the_width . '"  class="' . $the_class . '"  width="' . $the_width . '" height="' . $the_height . '" />';
        endif;
    endif;
}

?>
