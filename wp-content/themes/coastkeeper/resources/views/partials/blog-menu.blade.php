<section class="post-menu text-blue">
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell small-6">
        <header>
          <h3 id="blog-scroll" class="shake">{{ get_the_archive_title( '', false ) }}</h3>
        </header>
      </div>
      <div class="cell small-6">
        <div class="post-menu-wrap">
          <h4 class="categories-toggle" data-toggle="post-menu-dropdown">Categories
            <button class="control">
            <span class="control-box">
              <span class="control-inner"></span>
            </span>
            </button>
          </h4>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="post-menu-dropdown" data-toggler=".expanded">
<?php
$terms = get_terms([
  'taxonomy' => 'blog_category',
]);
?>
<ul id="post-categories" >
@foreach ( $terms as $term)
  <li><a href="{{ get_term_link($term) }}">{{ $term->name }}</a></li>
@endforeach
</ul>

</section>
