<section id="home-slider-section" class="full-width hero-header">
  <?php if( have_rows('slider_fields') ): ?>
	<div id="home-slider" class="page-header-slider slider full-height">
		<?php while ( have_rows('slider_fields') ) : the_row(); ?>
		<div class="slide">
			<div class="scroll-in fade-in" id="hero-background" style="background-image:url(<?php the_sub_field('image'); ?>);"></div>
	    	<div id="hero-content" class="va-container" role="main">
          <section class="va-middle" itemprop="articleBody">
          	<div class="row">
          		<div class="column small-12 medium-9 medium-offset-1 large-6 large-offset-3 text-center text-white">
              	<div class="hero-slider-content-wrap">
              	<div>
              		<h2 class="scroll-in fade-in-up underline"><?php the_sub_field('title'); ?></h2>
				<p class="scroll-in fade-in-up"><?php the_sub_field('description'); ?></p>
                  </div>
                  <div id="header-cta-row" class="">
                      <?php
						$values = get_sub_field('new_tab');					?>
                      <a <?php if( is_array($values) && in_array("Yes", $values )) { echo "target='_blank'"; } elseif ('Yes' == $values) { echo "target='_blank'"; } ?>href="<?php the_sub_field('button_link'); ?>" class="button button-outline"><?php the_sub_field('button_text'); ?></a>
                  </div>
              </div>
              </div>
            </div>
          </section>
			</div>
		</div>
		<?php endwhile; ?>
	</div>
	<?php endif; ?>
	<div class="text-center scroll-button-container">
		<a id="scroll" class="scroll-button" href="#events-section">
		</a>
	</div>
</section>
