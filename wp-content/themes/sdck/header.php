<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
    <!--<![endif]-->
    <head>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WG7DKZW');</script>
<!-- End Google Tag Manager -->
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" />
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

        <meta content="<?php bloginfo('template_url'); ?>" name="the_uri" />	
        <?php 
        wp_head();  
        ?>
        <?php
        if (is_singular() && get_option('thread_comments')) {
            wp_enqueue_script('comment-reply');
        }
        ?>
<script src="https://www.google.com/recaptcha/api.js"></script>
<script>
 function timestamp() { var response = document.getElementById("g-recaptcha-response"); if (response == null || response.value.trim() == "") {var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);elems["ts"] = JSON.stringify(new Date().getTime());document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); } } setInterval(timestamp, 500); 
</script> 
<script src="https://www.google.com/recaptcha/api.js"></script>
<script>
 function timestamp() { var response = document.getElementById("g-recaptcha-response"); if (response == null || response.value.trim() == "") {var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);elems["ts"] = JSON.stringify(new Date().getTime());document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); } } setInterval(timestamp, 500); 
</script> 
    </head>

    <body <?php if (function_exists('body_class')) body_class(); ?>>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WG7DKZW"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->        

<script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-4824968-2', 'auto');
          ga('send', 'pageview');

        </script>
        <div id="wrapper" class="full_width  ">
            <div id="wrapper_in" class="full_width  ">
                <header id="header" role="banner" class="full_width ">
                    <div class="container" id="main_header">

                        <div class="row">
                            <div class=" col-xs-12 col-sm-8 col-md-7 col-lg-7 pull-right" id="header-right">
                                <div class=" pull-right">
                                    <div class="wrap_header_menu">
                                        <?php wp_nav_menu(array('theme_location' => 'header-menu', 'menu_class' => 'sf-menu', 'menu_id' => 'header-menu', 'echo' => true, 'fallback_cb' => '')); ?>
                                    </div>
                                    <div class="hidden-xs pull-left"><?php get_search_form(); ?></div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-5 col-lg-5">
                                <h1 id="logo" >
                                    <a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/logo.gif" alt="<?php bloginfo('name'); ?>" /></a>
                                </h1>
                            </div>
                            

                        </div>
                        <nav id="top_menu" role="navigation" class="full_width " >

                            <?php
                            $pagesNav = '';
                            if (function_exists('wp_nav_menu')) {
                                $pagesNav = wp_nav_menu(array('theme_location' => 'top-menu', 'menu_class' => 'nav', 'menu_id' => 'page-nav', 'echo' => false, 'fallback_cb' => ''));
                            }
                            if ($pagesNav == '') {
                                ?>
                                <ul class="nav">
                                    <?php if (is_home()) { ?>
                                        <li class="first"><a href="<?php echo home_url(); ?>">Home</a></li>
                                    <?php } else { ?>
                                        <li><a href="<?php echo home_url(); ?>">Home</a></li>
                                    <?php } ?>
                                    <?php wp_list_pages('title_li='); ?>
                                </ul>
                                <?php
                            } else
                                echo($pagesNav);
                            ?>		

                        </nav>
                    </div>

                </header>
                <?php
                if (is_front_page()):
                    include TEMPLATEPATH . '/includes/slider.php';
                endif;
                ?>
                <div id="container" class="full_width ">
                    <div class="container ">
                        <div class="row">

