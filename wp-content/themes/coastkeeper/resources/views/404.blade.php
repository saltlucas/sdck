@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  @if (!have_posts())
    <div class="alert alert-warning div-404">
      <section class="one-column-section blue background-image-present text-white">
        <div class="background-image">
          <img srcset="@asset('images/404-page.jpg') 1200w, @asset('images/404-page.jpg') 2800w"
            src="@asset('images/404-page.jpg')">
        </div>
        <div class="grid-container">
          <div class="flex-center">
            <div class="grid-x">
              <div class="small-12 text-center">
                <h1 class="blink">Oops!</h1>
                <h3>{{ __('Sorry, but the page you were trying to view does not exist.', 'sage') }}</h3>
                {!! get_search_form(false) !!}
              </div>
            </div>
          </div>
        </div>
	    </section>
    </div>
  @endif
@endsection
