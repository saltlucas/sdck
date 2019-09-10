<?php
$article_s = "cell posts-cell";
if(get_field('blog_archive_image')) {
  $article_s .= " cell-top-image";
}
if(get_field('highlighted_article')) {
  $article_s .= " article-highlighted";
}
?>

@if(get_field('highlighted_article'))
  @if($n%2 == 1)
<article @php(post_class($article_s))>
    <?php if(has_post_thumbnail()): ?>
      <div class="aspect aspect-2-1">
        <div class="top-image">
          <?php
            $small_url = get_the_post_thumbnail_url($id, 'small');
            $large_url = get_the_post_thumbnail_url($id, 'large');
          ?>
          <a href="{{ get_permalink() }}">
          <img data-srcset="<?php  echo $small_url . " " . $small . ", " . $large_url . " " . $large; ?>"
          data-sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
          data-src="<?php get_the_post_thumbnail_url(); ?> ">
          </a>
        </div>
      </div>
    <?php endif; ?>
    <div class="article-content">
      <header>
        <h3 class="entry-title text-center"><a href="{{ get_permalink() }}">{{ get_the_title() }}</a></h3>
        @include('partials/entry-meta')
      </header>
      <div class="entry-summary">
        @php(the_excerpt())
      </div>
    </div>
  </article>
    @else
      <?php
      $post_to_display = true;
      $ptd_post_class = get_post_class($article_s);
      $ptd_image_url = '';
      if(has_post_thumbnail()):
        $ptd_small_url = get_the_post_thumbnail_url($id, 'small');
        $ptd_large_url = get_the_post_thumbnail_url($id, 'large');
        $ptd_image_url = get_the_post_thumbnail_url();
      endif;
      $ptd_permalink = get_permalink();
      $ptd_title = get_the_title();
      $ptd_excerpt = get_the_excerpt();
      $ptd_date = get_the_date('M j, Y');
      $ptd_author = get_the_author();
      $ptd_author_link = get_author_posts_url(get_the_author_meta('ID'));
      ?>

    @endif
  @else
  <article @php(post_class($article_s))>
    <?php if(get_field('blog_archive_image')): ?>
      <div class="aspect aspect-2-1">
        <div class="top-image">
          <?php
            $image = get_field('blog_archive_image');
          ?>
          <a href="{{ get_permalink() }}">
          <img data-srcset="<?php  echo $image['sizes'][ 'small' ] . " " . $small . "," . $image['sizes']['large'] . " " . $large; ?>"
          data-sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
          data-src="<?php echo $image['url']; ?> ">
          </a>
        </div>
      </div>
    <?php endif; ?>
    <div class="article-content">
      <header>
        <h3 class="entry-title text-center"><a href="{{ get_permalink() }}">{{ get_the_title() }}</a></h3>
        @include('partials/entry-meta')
      </header>
      <div class="entry-summary">
        @php(the_excerpt())
      </div>
    </div>
    <a href="{{ get_permalink() }}" class="read-more">Read More</a>
  </article>
    @if($post_to_display)
      @php($post_to_display= false)
      <article class="<?php foreach($ptd_post_class as $class) {
        echo "$class ";
      } ?>">
      @if($ptd_image_url)
      <div class="aspect aspect-2-1">
        <div class="top-image">
          <a href="<?php echo $ptd_permalink; ?>">
            <img data-srcset="<?php  echo $ptd_small_url . " " . $small . ", " . $ptd_large_url . " " . $large; ?>"
          data-sizes="(max-width: 640px) 640px, (min-width: 641px) 1300px"
          data-src="<?php echo $ptd_image_url; ?> ">
          </a>
        </div>
      </div>
      @endif
      <div class="article-content">
        <header>
          <h3 class="entry-title text-center"><a href="<?php echo $ptd_permalink; ?>"><?php echo $ptd_title; ?></a></h3>
          <time class="updated"><?php echo $ptd_date; ?></time>
          <p class="byline author vcard">
            By <a href="<?php echo $ptd_author_link; ?>" rel="author" class="fn">
              <?php echo $ptd_author; ?>
            </a>
          </p>
        </header>
        <div class="entry-summary">
          <?php echo $ptd_excerpt; ?>
        </div>
      </div>
      <a href="<?php echo $ptd_permalink; ?>" class="read-more">Read More</a>
    </article>
    @endif
  @endif
<?php
  $n++;
?>
