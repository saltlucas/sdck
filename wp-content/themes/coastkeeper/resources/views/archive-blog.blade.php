@extends('layouts.app')

@section('content')
  @if (!have_posts())
    <div class="alert alert-warning">
      {{ __('Sorry, no results were found.', 'sage') }}
    </div>
    {!! get_search_form(false) !!}
  @endif
  <?php
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
   ?>
  @if($paged == 1)
  <?php
    // args
    $featured_args = array(
    	'posts_per_page'	=> 1,
    	'post_type'		=> 'blog',
    	'meta_key'		=> 'featured_article',
    	'meta_value'	=> true
    );

    // query
    $the_query = new WP_Query( $featured_args );

    ?>
    <?php if( $the_query->have_posts() ): ?>
    	@include('partials.archive-blog-header')
    <?php endif; ?>

    <?php wp_reset_query();	 // Restore global post data stomped by the_post(). ?>
  @endif


  @if(get_post_type() == 'blog')
    @include('partials.blog-menu')
  @endif
  <section id="posts-main-content" class="two-column-section">
    <div class="grid-container">
        <div class="grid-x grid-margin-x grid-margin-y large-up-2">
        @while (have_posts()) @php(the_post())
          @include('partials.content-'.get_post_type())
        @endwhile
        </div>
        <div class="pagination">
          <?php
            global $wp_query;
            $big = 999999999; // need an unlikely integer
            echo paginate_links( array(
              'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
              'format' => '?paged=%#%',
              'current' => max( 1, get_query_var('paged') ),
              'prev_text'          => __(''),
              'next_text'          => __(''),
              'total' => $wp_query->max_num_pages
            ) );
          ?>
        </div>
    </div>
  </section>
@endsection
