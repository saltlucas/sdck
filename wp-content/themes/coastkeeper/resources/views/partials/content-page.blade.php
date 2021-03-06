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
                    $image = get_sub_field('background_image_hero');
                  ?>
                  <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['hero'] . " " . $hero . "," . $image['url'] . " " . $hero_2x; ?>"
                  src="<?php echo $image['url']; ?> ">
                </div>
          	    <div id="hero-content" class="background-content va-container" role="main">
                  	<div class="grid-x align-middle">
                  		<div class="cell small-12 medium-8 large-5 text-white blue content-cell">
        				          <div class="slide-content">
                            <h2 class="slide-title"><?php the_sub_field('slide_title'); ?></h2>
                            <?php the_sub_field('slide_content'); ?>
                            <div class="slide-button-wrap">
                                <?php $values = get_sub_field('new_tab');	?>
                                <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('button_link'); ?>" class="button blue-highlight slide-button"><?php the_sub_field('button_text'); ?> </a>
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
            <div class="cell small-12 medium-6">
              <h3 class="donate-title"><?php the_sub_field('donate_title'); ?></h3>
              <div class="donate-text"><?php the_sub_field('donate_information'); ?></div>
            </div>
            <div class="cell small-12 medium-6">
              <div class="giving-box">
                <ul class="toggle-giving horizontal-ul">
                  <li data-toggle-id="one-time" class="button active">Donate Once</li>
                  <li data-toggle-id="monthly" class="button">Monthly</li>
                </ul>
                <ul id="one-time" class="one-time donate-amounts horizontal-ul visible">
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=1000" target="_blank" class="button donate-amount">$1,000</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=500" target="_blank" class="button donate-amount">$500</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=200" target="_blank" class="button donate-amount">$200</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=50" target="_blank" class="button donate-amount">$50</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout" target="_blank" class="button donate-amount">Other</a></li>
                </ul>
                <ul id="monthly" class="monthly donate-amounts horizontal-ul">
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=1000&recurring=1" target="_blank" class="button donate-amount">$1,000</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=500&recurring=1" target="_blank" class="button donate-amount">$500</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=200&recurring=1" target="_blank" class="button donate-amount">$200</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout?amount=50&recurring=1" target="_blank" class="button donate-amount">$50</a></li>
                  <li><a href="https://www.classy.org/give/167764/#!/donation/checkout" target="_blank" class="button donate-amount">Other</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'one_column' ): ?>
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="one-column-section @php App\printClass(); @endphp">
          @if(get_sub_field('background_image_aspect_ratio') == '3x1')
            <div class="aspect aspect-3-1">
          @endif
          <?php if(get_sub_field('background_image_hero')): ?>
            <div class="background-image">
            <?php
              $image = get_sub_field('background_image_hero');
            ?>
            <img data-srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['hero'] . " " . $large; ?>"
            data-sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            data-src="<?php echo $image['url']; ?> ">
            </div>
          <?php endif; ?>
            <div class="grid-container">
              @if(get_sub_field('background_image_aspect_ratio') == '3x1')
                <div class="flex-center">
              @endif
              <div class="grid-x">
                <div class="small-12">
                  <?php the_sub_field('content'); ?>
                </div>
              </div>
              @if(get_sub_field('background_image_aspect_ratio') == '3x1')
                </div>
              @endif
            </div>
          @if(get_sub_field('background_image_aspect_ratio') == '3x1')
            </div>
          @endif
				</section>
      <?php elseif( get_row_layout() == 'two_columns' ): ?>
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="two-column-section @php App\printClass(); @endphp">
          <?php if(get_sub_field('background_image_hero')): ?>
            <div class="background-image">
              <?php
                $image = get_sub_field('background_image_hero');
              ?>
              <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
              sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
              src="<?php echo $image['url']; ?> ">
            </div>
          <?php endif; ?>
          <div class="grid-container">
            <?php if(get_sub_field('column')): ?>
              <?php $n = 1; ?>
              <?php while (have_rows('column')) : the_row(); ?>
                <?php if($n==1 || $n%2==1): ?>
                  <div @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="grid-x @if(get_sub_field('padding' != 'no-padding')) grid-padding-x @endif  @php App\printClass(); @endphp">
                <?php endif; ?>
                <div class="cell small-12 medium-6 @if(get_sub_field('background_image_7x5')) cell-background-image @endif">
                  <?php if(get_sub_field('background_image_7x5')): ?>
                    <div class="aspect aspect-7-5">
                      <div class="background-image">
                        <?php
                          $image = get_sub_field('background_image_7x5');
                        ?>
                        <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                        sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                        src="<?php echo $image['url']; ?> ">
                      </div>
                    </div>
                  <?php endif; ?>
                  <div class="column-content">
                    <?php the_sub_field('content'); ?>
                  </div>
                </div>
                <?php if($n%2==0): ?>
                  </div>
                <?php endif; ?>
                <?php $n++; ?>
            <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
				</section>
      <?php elseif( get_row_layout() == 'select_category' ): ?>
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="select-category-section @php App\printClass(); @endphp">
          <?php
          $count = count(get_sub_field('category'));
          if( have_rows('category') ):  ?>
            <div class="category-slider slider" data-slide-count="<?php echo $count; ?>">
              <?php while ( have_rows('category') ) : the_row(); ?>
                <div class="slide clearfix">
                  <div class="aspect aspect-5-7">
                    <?php $values = get_sub_field('new_tab');	?>
                    <?php $blank = ""; ?>
                    <?php if( is_array($values) && in_array("yes", $values )) { $blank = "target='_blank'"; } elseif ('yes' == $values) { $blank = "target='_blank'"; } ?>
                      <div class="background-image @if(!get_sub_field('background_image_5x7')) echo 'blue' @endif">
                        <?php if(get_sub_field('background_image_5x7')): ?>
                        <?php
                          $image = get_sub_field('background_image_5x7');
                        ?>
                        <img src="<?php echo $image['sizes'][ 'category-5x7' ]; ?>">
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
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="tab-section @php App\printClass(); @endphp">
          <?php if(get_sub_field('background_image_hero')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image_hero');
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
              <div class="tabs-content-container <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color') != 'white' && get_sub_field('background_color') != null ) { echo 'text-white'; } ?>" data-tabs-content="section-tabs">
                <?php if( have_rows('tab_content') ):  ?>
                <?php $i = 1; ?>
                <?php while ( have_rows('tab_content') ) : the_row(); ?>
                  <div class="tabs-panel <?php if($i==1) {echo "is-active";}?>" id="panel<?php echo (string)$i; ?>">
                    <?php if(get_sub_field('background_image_hero')): ?>
                    <div class="background-image">
                      <?php
                        $image = get_sub_field('background_image_hero');
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
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="square-grid text-white @php App\printClass(); @endphp">
          <?php if(get_sub_field('background_image_hero')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image_hero');
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
                <div class="cell square <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color') != 'white' && get_sub_field('background_color') != null ) { echo 'text-white'; } ?> @if(get_sub_field('link')) cell-link @endif">
                  <?php $values = get_sub_field('new_tab');	?>
                  @if(get_sub_field('link'))
                  <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('link'); ?>">
                  @endif
                    <div class="aspect aspect-1-1">
                      <?php if(get_sub_field('background_image_square')): ?>
                        <div class="background-image">
                          <?php
                            $image = get_sub_field('background_image_square');
                          ?>
                          <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                          sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                          src="<?php echo $image['url']; ?> ">
                        </div>
                      <?php endif; ?>
                      <?php if(get_sub_field('content')): ?>
                      <div class="background-content va-container" role="main">
                      	<div class="grid-x align-middle">
                      		<div class="cell content-cell">
                            <?php the_sub_field('content'); ?>
                          </div>
                        </div>
                			</div>
                      <?php endif; ?>
                    </div>
                  @if(get_sub_field('link'))
                  </a>
                  @endif
                </div>
                <?php $n++; ?>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'three_square_grid' ): ?>
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="three-square-grid square-grid text-white @php App\printClass(); @endphp">
          <?php if(get_sub_field('background_image_hero')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image_hero');
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
                <div class="cell square <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color') != 'white' && get_sub_field('background_color') != null ) { echo 'text-white'; } ?> @if(get_sub_field('link')) cell-link @endif">
                  <?php $values = get_sub_field('new_tab');	?>
                  <?php if(get_sub_field('link')): ?>
                  <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('link'); ?>">
                  <?php endif; ?>
                    <div class="aspect aspect-1-1">
                      <?php if(get_sub_field('background_image_square')): ?>
                        <div class="background-image">
                          <?php
                            $image = get_sub_field('background_image_square');
                          ?>
                          <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                          sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                          src="<?php echo $image['url']; ?> ">
                        </div>
                      <?php endif; ?>
                      <?php if(get_sub_field('content')): ?>
                      <div class="background-content va-container" role="main">
                      	<div class="grid-x align-middle">
                      		<div class="cell content-cell">
                            <?php the_sub_field('content'); ?>
                          </div>
                        </div>
                			</div>
                      <?php endif; ?>
                    </div>
                  <?php if(get_sub_field('link')): ?>
                  </a>
                  <?php endif; ?>
                </div>
                <?php $n++; ?>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'accomplishments_grid' ): ?>
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="three-square-grid square-grid accomplishment_grid text-white @php App\printClass(); @endphp">
          <?php if(get_sub_field('background_image_hero')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image_hero');
            ?>
            <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
            sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
            src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
            <div id="squares" class="grid-x squares grid-margin-x grid-margin-y medium-up-2 large-up-3">
              <?php $n = 1;
              $child_repeater = get_sub_field('accomplishment');
              foreach($child_repeater as $item):
                $background_color = $item['background_color'];
                $background_image = $item['background_image_square'];
                $accomplishment_title = $item['accomplishment_title'];

              ?>
                <div class="cell square <?php echo $background_color ?> <?php if($background_color != 'white' && $background_color != null ) { echo 'text-white'; } ?>">
                  <a data-open="accomplishmentModal-<?php echo strval($n); ?>">
                    <div class="aspect aspect-1-1">
                      <?php if($background_image): ?>
                        <div class="background-image">
                          <?php
                            $image = $background_image;
                          ?>
                          <img srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
                          sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
                          src="<?php echo $image['url']; ?> ">
                        </div>
                      <?php endif; ?>
                      <div class="background-content va-container" role="main">
                      	<div class="grid-x align-middle">
                      		<div class="cell content-cell text-center">
                            <h5><?php echo $accomplishment_title; ?></h5>
                          </div>
                        </div>
                			</div>
                    </div>
                  </a>
                </div>
                <?php $n++; ?>
              <?php endforeach;
              ?>
            </div>
          <?php
          ?>
        </div>
            <?php $k = 1;
            foreach($child_repeater as $item):
              $accomplishment_title = $item['accomplishment_title'];
              $content= $item['content'];

              ?>
              <div id="accomplishmentModal-<?php echo strval($k); ?>" class="reveal" data-reveal>
                <h3><?php echo $accomplishment_title; ?></h3>
                <?php echo $content; ?>
                <button class="close-button" data-close aria-label="Close modal" type="button">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <?php $k++; ?>
          <?php endforeach; ?>
          <?php if(get_sub_field('include_confetti')): ?>
          <div class="celebrate-wrapper">
            <div class="confetti-149"></div>
            <div class="confetti-148"></div>
            <div class="confetti-147"></div>
            <div class="confetti-146"></div>
            <div class="confetti-145"></div>
            <div class="confetti-144"></div>
            <div class="confetti-143"></div>
            <div class="confetti-142"></div>
            <div class="confetti-141"></div>
            <div class="confetti-140"></div>
            <div class="confetti-139"></div>
            <div class="confetti-138"></div>
            <div class="confetti-137"></div>
            <div class="confetti-136"></div>
            <div class="confetti-135"></div>
            <div class="confetti-134"></div>
            <div class="confetti-133"></div>
            <div class="confetti-132"></div>
            <div class="confetti-131"></div>
            <div class="confetti-130"></div>
            <div class="confetti-129"></div>
            <div class="confetti-128"></div>
            <div class="confetti-127"></div>
            <div class="confetti-126"></div>
            <div class="confetti-125"></div>
            <div class="confetti-124"></div>
            <div class="confetti-123"></div>
            <div class="confetti-122"></div>
            <div class="confetti-121"></div>
            <div class="confetti-120"></div>
            <div class="confetti-119"></div>
            <div class="confetti-118"></div>
            <div class="confetti-117"></div>
            <div class="confetti-116"></div>
            <div class="confetti-115"></div>
            <div class="confetti-114"></div>
            <div class="confetti-113"></div>
            <div class="confetti-112"></div>
            <div class="confetti-111"></div>
            <div class="confetti-110"></div>
            <div class="confetti-109"></div>
            <div class="confetti-108"></div>
            <div class="confetti-107"></div>
            <div class="confetti-106"></div>
            <div class="confetti-105"></div>
            <div class="confetti-104"></div>
            <div class="confetti-103"></div>
            <div class="confetti-102"></div>
            <div class="confetti-101"></div>
            <div class="confetti-100"></div>
            <div class="confetti-99"></div>
            <div class="confetti-98"></div>
            <div class="confetti-97"></div>
            <div class="confetti-96"></div>
            <div class="confetti-95"></div>
            <div class="confetti-94"></div>
            <div class="confetti-93"></div>
            <div class="confetti-92"></div>
            <div class="confetti-91"></div>
            <div class="confetti-90"></div>
            <div class="confetti-89"></div>
            <div class="confetti-88"></div>
            <div class="confetti-87"></div>
            <div class="confetti-86"></div>
            <div class="confetti-85"></div>
            <div class="confetti-84"></div>
            <div class="confetti-83"></div>
            <div class="confetti-82"></div>
            <div class="confetti-81"></div>
            <div class="confetti-80"></div>
            <div class="confetti-79"></div>
            <div class="confetti-78"></div>
            <div class="confetti-77"></div>
            <div class="confetti-76"></div>
            <div class="confetti-75"></div>
            <div class="confetti-74"></div>
            <div class="confetti-73"></div>
            <div class="confetti-72"></div>
            <div class="confetti-71"></div>
            <div class="confetti-70"></div>
            <div class="confetti-69"></div>
            <div class="confetti-68"></div>
            <div class="confetti-67"></div>
            <div class="confetti-66"></div>
            <div class="confetti-65"></div>
            <div class="confetti-64"></div>
            <div class="confetti-63"></div>
            <div class="confetti-62"></div>
            <div class="confetti-61"></div>
            <div class="confetti-60"></div>
            <div class="confetti-59"></div>
            <div class="confetti-58"></div>
            <div class="confetti-57"></div>
            <div class="confetti-56"></div>
            <div class="confetti-55"></div>
            <div class="confetti-54"></div>
            <div class="confetti-53"></div>
            <div class="confetti-52"></div>
            <div class="confetti-51"></div>
            <div class="confetti-50"></div>
            <div class="confetti-49"></div>
            <div class="confetti-48"></div>
            <div class="confetti-47"></div>
            <div class="confetti-46"></div>
            <div class="confetti-45"></div>
            <div class="confetti-44"></div>
            <div class="confetti-43"></div>
            <div class="confetti-42"></div>
            <div class="confetti-41"></div>
            <div class="confetti-40"></div>
            <div class="confetti-39"></div>
            <div class="confetti-38"></div>
            <div class="confetti-37"></div>
            <div class="confetti-36"></div>
            <div class="confetti-35"></div>
            <div class="confetti-34"></div>
            <div class="confetti-33"></div>
            <div class="confetti-32"></div>
            <div class="confetti-31"></div>
            <div class="confetti-30"></div>
            <div class="confetti-29"></div>
            <div class="confetti-28"></div>
            <div class="confetti-27"></div>
            <div class="confetti-26"></div>
            <div class="confetti-25"></div>
            <div class="confetti-24"></div>
            <div class="confetti-23"></div>
            <div class="confetti-22"></div>
            <div class="confetti-21"></div>
            <div class="confetti-20"></div>
            <div class="confetti-19"></div>
            <div class="confetti-18"></div>
            <div class="confetti-17"></div>
            <div class="confetti-16"></div>
            <div class="confetti-15"></div>
            <div class="confetti-14"></div>
            <div class="confetti-13"></div>
            <div class="confetti-12"></div>
            <div class="confetti-11"></div>
            <div class="confetti-10"></div>
            <div class="confetti-9"></div>
            <div class="confetti-8"></div>
            <div class="confetti-7"></div>
            <div class="confetti-6"></div>
            <div class="confetti-5"></div>
            <div class="confetti-4"></div>
            <div class="confetti-3"></div>
            <div class="confetti-2"></div>
            <div class="confetti-1"></div>
            <div class="confetti-0"></div>
          </div>
          <?php endif; ?>
        </section>
      <?php elseif( get_row_layout() == 'staff' ): ?>
				<section @if(get_sub_field('id')) id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" @endif class="three-square-grid square-grid text-white staff @php App\printClass(); @endphp">
          <?php if(get_sub_field('background_image_hero')): ?>
          <div class="background-image">
            <?php
              $image = get_sub_field('background_image_hero');
            ?>
            <img src="<?php echo $image['url']; ?> ">
          </div>
          <?php endif; ?>
          <div class="grid-container">
          <?php if( have_rows('square') ):  ?>
            <div id="squares" class="grid-x squares grid-margin-x grid-margin-y medium-up-2 large-up-3">
              <?php $n = 1; ?>
              <?php while ( have_rows('square') ) : the_row(); ?>
                <div class="cell square <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color') != 'white' && get_sub_field('background_color') != null ) { echo 'text-white'; } ?>">
                  <?php $values = get_sub_field('new_tab');	?>
                  <?php if(get_sub_field('link')): ?>
                  <a <?php if( is_array($values) && in_array("yes", $values )) { echo "target='_blank'"; } elseif ('yes' == $values) { echo "target='_blank'"; } ?> href="<?php the_sub_field('link'); ?>">
                  <?php endif; ?>
                    <div class="aspect aspect-1-1">
                      <?php if(get_sub_field('background_image_staff')): ?>
                        <div class="background-image">
                          <?php
                            $image = get_sub_field('background_image_staff');
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
                  <?php if(get_sub_field('link')): ?>
                  </a>
                  <?php endif; ?>
                </div>
                <?php $n++; ?>
              <?php endwhile; ?>
            </div>
          <?php endif; ?>
          </div>
        </section>
      <?php elseif( get_row_layout() == 'annual_report' ): ?>
        <section class="one-column-section annual-report-single <?php the_sub_field('padding'); ?><?php the_sub_field('margin'); ?>">
          <div class="grid-container">
            <div class="grid-x">
              <div class="small-12 large-10 large-offset-1">
                <?php the_sub_field('content'); ?>
                <div class="report-wrap text-center">
                  <a target="_blank" class="report-single-link" href="<?php the_sub_field('report_link') ?>">
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

      <?php elseif( get_row_layout() == 'sponsors' ): ?>
			<section class="sponsors">
        <div class="grid-container">
          <div class="grid-x grid-padding-x small-up-1 medium-up-3">
          <?php
          if( have_rows('sponsor') ):
              while ( have_rows('sponsor') ) : the_row(); ?>
              <div class="cell sponsor-cell">
                @if(get_sub_field('sponsor_image'))
                  @if(get_sub_field('sponsor_link'))
                    <a style="display:block;" href="@php the_sub_field('sponsor_link'); @endphp" title="@php the_sub_field('sponsor_title'); @endphp">
                  @endif
                      <img class="sponsor-image" src="@php the_sub_field('sponsor_image'); @endphp" alt="@php the_sub_field('sponsor_title'); @endphp">
                  @if(get_sub_field('sponsor_link'))
                    </a>
                  @endif
                @else
                  <h4 class="sponsor-title">@php the_sub_field('sponsor_title'); @endphp</h4>
                @endif
              </div>
              <?php endwhile;
          else :

          endif;
          ?>
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
