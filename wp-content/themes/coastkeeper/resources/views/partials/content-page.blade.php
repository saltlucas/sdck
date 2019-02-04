@php
  /**
   * Template Variables
   */
  $small = '640w';
  $large = '1300w';
@endphp
<article>
<?php /*Flexible content section */ ?>
	@if ( have_rows('sections') )
		<?php while ( have_rows('sections') ) : the_row(); ?>
        <?php if( get_row_layout() == 'slider' ): ?>
          <section id="home-slider-section" class="full-width hero-header">
          	<div class="page-header-slider full-screen-slider slider">
          		<?php while ( have_rows('slide') ) : the_row(); ?>
          		<div class="slide">
          			<div class="background-image">
                  <?php
                    $image = get_sub_field('background_image');
                  ?>
                  <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                  sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                  src="<?php echo $image['url']; ?> ">
                </div>
          	    <div id="hero-content" class="background-content va-container" role="main">
                  	<div class="grid-x align-middle">
                  		<div class="cell small-12 medium-8 large-5 text-center text-white blue content-cell">
        				          <div class="slide-content">
                            <h2 class="slide-title"><?php the_sub_field('slide_title'); ?></h2>
                            <?php the_sub_field('slide_content'); ?>
                            <div id="footer-cta-row">
                                <?php $values = get_sub_field('new_tab');	?>
                                <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('button_link'); ?>" class="button blue-highlight"><?php the_sub_field('button_text'); ?> </a>
                           </div>
                         </div>
                      </div>
                    </div>
          			</div>
          		</div>
          		<?php endwhile; ?>
          	</div>
          <div class="text-center scroll-button-container">
        		<a id="scroll" class="scroll-button" href="#events-section">
        		</a>
        	</div>
        </section>
      <?php elseif( get_row_layout() == 'donation' ): ?>
        <section id="donation-section" class="donate-section grid-container <?php echo sanitize_title_with_dashes(get_sub_field('class')); ?>">
          <div class="grid-x">
            <div class="cell small-12 medium-7">
              <h3 class="donate-title"><?php the_sub_field('donate_title'); ?></h3>
              <div class="donate-text"><?php the_sub_field('donate_information'); ?></div>
            </div>
            <div class="cell small-12 medium-5">
              <form method="get">
                <label for="amout">Quick Donate</label>
                <div class="grid-x">
                  <div class="cell small-8">
                    <div class="input-currency">
                      <input id="amount" type="text" name="amount" placeholder="50">
                    </div>
                  </div>
                  <div class="cell small-4 donate-cell">
                    <input type="submit" class="button blue-highlight" value="Submit">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'one_column' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="one-column-section <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?>
          <?php if(get_sub_field('background_color') != 'white') { echo 'text-white'; } ?>">
          <?php if(get_sub_field('background_image')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
            <div class="grid-x">
              <div class="small-12 large-10 large-offset-1">
                <?php the_sub_field('content'); ?>
              </div>
            </div>
          </div>
				</section>
      <?php elseif( get_row_layout() == 'two_columns' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="two-column-section <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
          <?php if(get_sub_field('background_image')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
            <?php if(get_sub_field('column')): ?>
              <div id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="grid-x grid-padding-x <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
              <?php while (have_rows('column')) : the_row(); ?>
                <div class="cell small-12 medium-6">
                  <?php if(get_sub_field('background_image')): ?>
                  <div class="background-image">
                    <?php
                      $image = get_sub_field('background_image');
                    ?>
                    <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                    sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                    src="<?php echo $image['url']; ?> ">
                  </div>
                  <?php endif; ?>
                  <div class="column-content">
                    <?php the_sub_field('content'); ?>
                  </div>
                </div>
            <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
				</section>
      <?php elseif( get_row_layout() == 'select_category' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="select-category-section <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
          <?php
          $count = count(get_sub_field('category'));
          if( have_rows('category') ):  ?>
            <div class="category-slider slider" data-slide-count="<?php echo $count; ?>">
              <?php while ( have_rows('category') ) : the_row(); ?>
                <div class="slide">
                  <div class="aspect aspect-5-7">
                    <?php $values = get_sub_field('new_tab');	?>
                    <?php $blank = ""; ?>
                    <?php if( is_array($values) && in_array("yes", $values )) { $blank = "target='_blank'"; } elseif ('yes' == $values) { $blank = "target='_blank'"; } ?>
                      <div class="background-image blue">
                        <?php if(get_sub_field('background_image')): ?>
                        <?php
                          $image = get_sub_field('background_image');
                        ?>
                        <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                        sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                        src="<?php echo $image['url']; ?> ">
                        <?php endif; ?>
                      </div>
                      <div class="background-content">
                        <a title="<?php the_sub_field('button_text'); ?>" <?php if($blank != "") { echo $blank; } ?> class="category-link" href="<?php the_sub_field('button_link'); ?>"></a>
                        <div class="grid-x align-middle align-center text-center">
                          <div class="cell small-12">
                            <div class="content-align">
                              <h4><?php the_sub_field('category_title'); ?></h4>
                              <?php the_sub_field('category_content'); ?>
                              <?php if(get_sub_field('button_text')): ?>
                                <div class="category-select-button">
                                  <a <?php if($blank != "") { echo $blank; } ?> title="<?php the_sub_field('button_text'); ?>" href="<?php the_sub_field('button_link'); ?>"><?php the_sub_field('button_text'); ?></a>
                                </div>
                              <?php endif; ?>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              <?php endwhile; ?>
            </div>
            <?php
          else :

              // no rows found

          endif; ?>
				</section>
      <?php elseif( get_row_layout() == 'tabs' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="tab-section <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?>
          <?php if(get_sub_field('background_color') != 'white') { echo 'text-white';} ?>">
          <?php if(get_sub_field('background_image')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>

          <div class="grid-container">
            <div class="grid-x">
              <div class="small-12">
          <?php if( have_rows('tab_titles') ):  ?>
            <ul class="tabs" data-tabs id="section-tabs">
              <?php $n = 1; ?>
              <?php while ( have_rows('tab_titles') ) : the_row(); ?>
                <li class="tabs-title <?php if($n==1) {echo "is-active";}?>"><a href="#panel<?php echo (string)$n; ?>" aria-selected="true"><?php the_sub_field('tab_title'); ?></a></li>
                <?php $n++; ?>
              <?php endwhile; ?>
            </ul>
          <?php endif; ?>
          <?php if( have_rows('tab_content_holder') ):  ?>
            <?php while ( have_rows('tab_content_holder') ) : the_row(); ?>
              <div class="tabs-content <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>" data-tabs-content="section-tabs">
                <?php if( have_rows('tab_content') ):  ?>
                <?php $i = 1; ?>
                <?php while ( have_rows('tab_content') ) : the_row(); ?>
                  <div class="tabs-panel <?php if($i==1) {echo "is-active";}?>" id="panel<?php echo (string)$i; ?>">
                    <?php if(get_sub_field('background_image')): ?>
                    <div class="background-image">
                      <?php
                        $image = get_sub_field('background_image');
                      ?>
                      <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                      sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                      src="<?php echo $image['url']; ?> ">
                    </div>
                    <?php endif; ?>
                    <div class="background-content tabs-content">
                      <?php the_sub_field('tab_content'); ?>
                    </div>
                  </div>
                  <?php $i++; ?>
              <?php endwhile; ?>
          <?php endif; ?>
            </div>
          <?php endwhile; ?>
        <?php endif; ?>
              </div>
            </div>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'square_grid' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="square-grid text-white <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
          <?php if(get_sub_field('background_image')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
          <?php if( have_rows('square') ):  ?>
            <div id="squares" class="grid-x squares grid-margin-x grid-margin-y large-up-2">
              <?php $n = 1; ?>
              <?php while ( have_rows('square') ) : the_row(); ?>
                <div class="cell square <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
                  <?php $values = get_sub_field('new_tab');	?>
                  <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('link'); ?>">
                    <div class="aspect-1-1">
                      <?php if(get_sub_field('background_image')): ?>
                        <div class="background-image">
                          <?php
                            $image = get_sub_field('background_image');
                          ?>
                          <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                          sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                          src="<?php echo $image['url']; ?> ">
                        </div>
                      <?php endif; ?>
                      <div class="background-content va-container" role="main">
                      	<div class="grid-x align-middle">
                      		<div class="cell content-cell">
                            <?php the_sub_field('content'); ?>
                          </div>
                        </div>
                			</div>
                    </div>
                  </a>
                </div>
                <?php $n++; ?>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'three_square_grid' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="three-square-grid square-grid text-white <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
          <?php if(get_sub_field('background_image')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
          <?php if( have_rows('square') ):  ?>
            <div id="squares" class="grid-x squares grid-margin-x grid-margin-y medium-up-2 large-up-3">
              <?php $n = 1; ?>
              <?php while ( have_rows('square') ) : the_row(); ?>
                <div class="cell square <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
                  <?php $values = get_sub_field('new_tab');	?>
                  <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('link'); ?>">
                    <div class="aspect-1-1">
                      <?php if(get_sub_field('background_image')): ?>
                        <div class="background-image">
                          <?php
                            $image = get_sub_field('background_image');
                          ?>
                          <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                          sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                          src="<?php echo $image['url']; ?> ">
                        </div>
                      <?php endif; ?>
                      <div class="background-content va-container" role="main">
                      	<div class="grid-x align-middle">
                      		<div class="cell content-cell">
                            <?php the_sub_field('content'); ?>
                          </div>
                        </div>
                			</div>
                    </div>
                  </a>
                </div>
                <?php $n++; ?>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'staff' ): ?>
				<section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="three-square-grid square-grid text-white staff <?php the_sub_field('class'); ?> <?php the_sub_field('background_color'); ?> <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
          <?php if(get_sub_field('background_image')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
          <?php if( have_rows('square') ):  ?>
            <div id="squares" class="grid-x squares grid-margin-x grid-margin-y medium-up-2 large-up-3">
              <?php $n = 1; ?>
              <?php while ( have_rows('square') ) : the_row(); ?>
                <div class="cell square <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
                  <?php $values = get_sub_field('new_tab');	?>
                  <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('link'); ?>">
                    <div class="aspect-1-1">
                      <?php if(get_sub_field('background_image')): ?>
                        <div class="background-image">
                          <?php
                            $image = get_sub_field('background_image');
                          ?>
                          <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                          sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                          src="<?php echo $image['url']; ?> ">
                        </div>
                      <?php endif; ?>
                      <div class="background-content va-container" role="main">
                      	<div class="grid-x align-bottom">
                      		<div class="cell content-cell staff-cell">
                            <h3 class="staff-name"><?php the_sub_field('staff_name'); ?></h3>
                            <p class="staff-title"><?php the_sub_field('staff_title'); ?></p>
                            <?php /*the_sub_field('content'); */ ?>
                          </div>
                        </div>
                			</div>
                    </div>
                  </a>
                </div>
                <?php $n++; ?>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'annual_report' ): ?>
        <section class="one-column-section annual-report-single  <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> ">
          <div class="grid-container">
            <div class="grid-x">
              <div class="small-12 large-10 large-offset-1">
                <?php the_sub_field('content'); ?>
                <?php $report = get_sub_field('report_link') ?>
                <div class="report-wrap text-center">
                  <a target="_blank" class="report-single-link" href="<?php echo $report['url']; ?>">
                    <?php
                      $image = get_sub_field('report_image');
                    ?>
                    <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                    sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                    src="<?php echo $image['url']; ?> ">
                    <p class="report-title"><?php the_sub_field('report_title'); ?></p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


			<?php else:
				// no layouts found
			?>
			<?php endif; ?>
		<?php endwhile; ?>
	@endif
@php(the_content())
</article>

{!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}
