<?php

$ds_theme_key = 'wp_ao_';
$ds_custom_field_key = '_wp_cf_';

// Enables post and comment RSS feed links to head
include TEMPLATEPATH . '/theme-assets/wp-admin-options/options-0.php';
//include TEMPLATEPATH . '/theme-assets/wp-admin-options/options-1.php';
//include TEMPLATEPATH . '/theme-assets/wp-admin-options/options-2.php';
//include TEMPLATEPATH . '/theme-assets/wp-admin-options/options-3.php';
//include TEMPLATEPATH . '/theme-assets/wp-admin-options/options-5.php';
//include TEMPLATEPATH . '/theme-assets/wp-admin-options/options-4.php';

add_theme_support('automatic-feed-links');
require_once(TEMPLATEPATH . '/theme-assets/functions/custom_functions.php');
//include TEMPLATEPATH . '/theme-assets/wp-custom-fields/page-fields.php';
remove_action('wp_head', 'rel_canonical');

add_action('wp_enqueue_scripts', 'start_load_scripts');

function start_load_scripts() {
    if (!is_admin()) {
        $template_dir = get_template_directory_uri();
        global $is_IE;
        if ($is_IE) {
            wp_enqueue_script('html5shiv', $template_dir . '/js/html5shiv.js', array('jquery'), '1.0', false);
            wp_enqueue_script('respond', $template_dir . '/js/respond.min.js', array('jquery'), '1.0', false);
        }
        wp_enqueue_script('superfish', $template_dir . '/js/superfish.min.js', array('jquery'), '1.0', false);
        wp_enqueue_script('cycle2', $template_dir . '/js/jquery.cycle2.min.js', array('jquery'), '1.0', false);
        wp_enqueue_script('bootstrap', $template_dir . '/js/bootstrap.min.js', array('jquery'), '1.0', false);
        wp_enqueue_script('prettyPhoto', $template_dir . '/js/jquery.prettyPhoto.js', array('jquery'), '1.0', false);
        wp_enqueue_script('custom_scripts', $template_dir . '/js/scripts.jquery.js', array('jquery'), '1.0', false);


        wp_register_style('bootstrap', $template_dir . '/css/bootstrap.min.css', array(), '1.0', 'all');
        //wp_register_style('font-awesome', $template_dir . '/css/font-awesome.min.css', array(), '1.0', 'all');
        wp_register_style('myTheme', get_stylesheet_uri(), array(), '1.0', 'all');
        wp_register_style('prettyPhotoCss', $template_dir . '/css/prettyPhoto.css', array(), '1.0', 'all');
        wp_register_style('printCss', $template_dir . '/css/print.css', array(), '1.0', 'print');

        wp_enqueue_style('layout');
        wp_enqueue_style('bootstrap');
        wp_enqueue_style('font-awesome');
        wp_enqueue_style('myTheme');
        wp_enqueue_style('prettyPhotoCss');
        wp_enqueue_style('printCss');
    }
}
/*
function my_function_admin_bar() {
    return true;
}

add_filter('show_admin_bar', 'my_function_admin_bar');
*/
// Thumbnail function

if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails');
}

// Custom menus

add_action('init', 'myTheme_register_my_menu');

function myTheme_register_my_menu() {

    register_nav_menus(
            array(
                'top-menu' => __('Top Navigation', 'myTheme'),
                'header-menu' => __('Header Navigation', 'myTheme')
            )
    );
}
//Author Display function 
//disable WordPress sanitization to allow more than just $allowedtags from /wp-includes/kses.php
remove_filter('pre_user_description', 'wp_filter_kses');
//add sanitization for WordPress posts
add_filter( 'pre_user_description', 'wp_filter_post_kses');


// Sidebar Function


if (function_exists('register_sidebar')) :

    register_sidebar(array(
        'name' => 'Sidebar',
        'before_widget' => '<div id="%1$s" class="clearfix widget %2$s">',
        'after_widget' => '</div>',
        'description' => 'This sidebar appears on the right side of your site',
        'before_title' => '<h3 class="widgettitle">',
        'after_title' => '</h3>'
    ));

endif;
if (function_exists('register_sidebar')) :

    register_sidebar(array(
        'name' => 'Sidebar-Left',
        'before_widget' => '<div id="%1$s" class="clearfix widget %2$s">',
        'after_widget' => '</div>',
        'description' => 'This sidebar appears on the right side of your site',
        'before_title' => '<h3 class="widgettitle">',
        'after_title' => '</h3>'
    ));

endif;
if (function_exists('register_sidebar')) :

    register_sidebar(array(
        'name' => 'Sidebar-Right',
        'before_widget' => '<div id="%1$s" class="clearfix widget %2$s">',
        'after_widget' => '</div>',
        'description' => 'This sidebar appears on the right side of your site',
        'before_title' => '<h3 class="widgettitle">',
        'after_title' => '</h3>'
    ));

endif;
if (function_exists('register_sidebar')) :
    register_sidebar(array(
        'name' => 'Sidebar-Footer',
        'before_widget' => '<div id="%1$s" class="clearfix full_width  %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widgettitle">',
        'after_title' => '</h3>'
    ));

endif;
if (function_exists('register_sidebar')) :
    register_sidebar(array(
        'name' => 'Sidebar-Bottom-Blog',
        'before_widget' => '<div id="%1$s" class="clearfix full_width  %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widgettitle_bt">',
        'after_title' => '</h3>'
    ));

endif;
if (function_exists('register_sidebar')) :
    register_sidebar(array( 
        'name' => 'Home-Articles',
        'before_widget' => '<div id="%1$s" class="clearfix full_width  %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widgettitle_bt">',
        'after_title' => '</h3>'
    ));

endif;
