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
  @endif
  <section id="posts-main-content" class="two-column-section">
    <div class="grid-container">
        <div class="grid-x grid-margin-x grid-margin-y large-up-2">
  @while (have_posts()) @php(the_post())
          @include('partials.content-'.get_post_type())
  @endwhile
        </div>
    </div>
  </section>
  {!! get_the_posts_navigation() !!}
@endsection
