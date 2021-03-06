@extends('layouts.app')

@section('content')
  @if (!have_posts())
    <div class="alert alert-warning">
      {{ __('Sorry, no results were found.', 'sage') }}
    </div>
    {!! get_search_form(false) !!}
  @endif
  @if(get_post_type() == 'blog')
    @include('partials.blog-menu')
  @else
    @include('partials.archive-header')
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
