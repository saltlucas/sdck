@php
  $small = '640w';
  $large = '1300w';
@endphp
<?php
  $pageTitle = get_field_object('header_style');
  if ($pageTitle['value'] == 'One Column'): ?>
  <?php if( have_rows('one_column') ):
  	while( have_rows('one_column') ): the_row(); ?>
    <div class="page-header">
  <section id="<?php echo sanitize_title_with_dashes(get_sub_field('id')); ?>" class="one-column-section <?php the_sub_field('class'); ?>  <?php the_sub_field('padding'); ?> <?php the_sub_field('margin'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
    <div class="aspect aspect-2-1">
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
    </div>
  </section>
  <section class="overlap-section grid-container">
    <div class="overlap-content  <?php the_sub_field('background_color'); ?> <?php if(get_sub_field('background_color')!='white') { echo 'text-white';} ?>">
        <?php the_sub_field('content'); ?>
    </div>
  </section>
</div>
    <?php endwhile; ?>
  <?php endif; ?>
<?php
elseif($pageTitle['value'] == 'Show Title'): ?>
<div class="page-header">
  <h1>{!! App::title() !!}</h1>
</div>

<?php else: ?>

<?php endif; ?>
