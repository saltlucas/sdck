<?php/** * @package WordPress * @subpackage myTheme * The template for displaying widget areas. */?><div id="sidebar" class="sidebar_col sidebar_col1 col-12 col-sm-12 col-lg-3 col-md-4 pull-right">	<div class="sidebar_in">				<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar') ) : ?>				<?php endif; ?>		</div>		</div><div class="clear"></div>