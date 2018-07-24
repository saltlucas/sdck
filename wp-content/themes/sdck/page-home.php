<?php/**  Template Name: Home-Page */?>
<?php get_header(); ?>
<div id="sidebar-left" class="sidebar_col sidebar_col1 col-xs-12 col-sm-12 col-md-3 col-lg-3 hidden-xs hidden-sm pull-left">    
	<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar-Left')) : ?>    
	<?php endif; ?>
</div>
	<section class=" col-xs-12 col-sm-12 col-md-6 col-lg-6 pull-left" id="content">            
		<div class="subcontent">
			<h1 class="home-title">Features</h1>
			<?php dynamic_sidebar( 'Home-Articles' ); ?>
		</div> 
	</section>

<div id="sidebar-left-mobile" class="sidebar_col sidebar_col1 visible-sm visible-xs col-xs-12 col-sm-12 col-md-3 col-lg-3  pull-left">    <?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar-Left')) : ?>    <?php endif; ?></div><div id="sidebar-sidebar" class="sidebar_col col-xs-12 col-sm-12 col-md-3 col-lg-3  pull-right">	<div class="sidebar_in">    <?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar-Right')) : ?>    <?php endif; ?>	</div></div><?php get_footer(); ?>