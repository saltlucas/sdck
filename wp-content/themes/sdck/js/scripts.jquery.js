

jQuery(document).ready(function () {
    jQuery("ul.sf-menu").superfish({
        delay: 100,
        cssArrows: false,
        animation: {opacity: 'show', height: 'show'}, // fade-in and slide-down animation
        speed: 'fast'
    });
    jQuery('.menu_btn').click(function () {
        jQuery('#mobile-menu-wrap').slideToggle();
    });
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({social_tools: '', deeplinking: false});
});