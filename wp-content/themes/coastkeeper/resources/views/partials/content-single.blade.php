<?php
  $small = '640w';
  $large = '1300w';
  // override $post
?>
<div class="page-header blog-hero-header">
<?php if(has_post_thumbnail($id)): ?>
  <section id="featured-blog-image" class="one-column-section">
    <div class="aspect aspect-2-1">
      <div class="background-image">
        <?php
          $small_url = get_the_post_thumbnail_url($id, 'small');
          $large_url = get_the_post_thumbnail_url($id, 'large');
        ?>
        <img srcset="<?php  echo $small_url . " " . $small . ", " . $large_url . " " . $large; ?>"
        sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
        src="<?php get_the_post_thumbnail_url(); ?> ">
      </div>
    </div>
  </section>
<?php endif; ?>
  <section class="overlap-section grid-container <?php if(has_post_thumbnail($id)) { echo "background-header"; } else { echo "text-header"; } ?>">
    <div class="overlap-content text-white">
        <div class="grid-x">
          <div class="cell small-12 medium-8 large-9">
            <h1 class="title hero-title"><span><?php the_title(); ?></span></h1>
          </div>
          <div class="cell small-12 medium-4 large-3 article-meta text-center">
            <div class="meta-wrap text-blue">
            <?php
            $user_id = strval(get_the_author_id());
            $user_id = "user_" . $user_id;
            if ( $user_id ) :
              $author_image_url = get_field('author_image', $user_id);
              if($author_image_url): ?>
                <div class="author-image-wrap">
                  <img class="author-image" src="<?php echo esc_url( $author_image_url ); ?>" />
                </div>
              <?php endif; ?>
            <?php endif; ?>
            <?php if(!is_category(2180)): ?>
            <p class="author"><?php echo get_the_author_meta('display_name'); ?></p>
            <?php endif; ?>
            <p class="date"><?php the_date(); ?></p>
            </div>
          </div>
        </div>
    </div>
  </section>
</div>
<article @php(post_class())>
  <div class="entry-content">
    @php(the_content())
  </div>
  <footer>
    {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}
  </footer>
  @php(comments_template('/partials/comments.blade.php'))
</article>
