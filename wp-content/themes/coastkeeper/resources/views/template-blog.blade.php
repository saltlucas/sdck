{{--
  Template Name: Blog Template
--}}

@extends('layouts.app')
@section('content')
  @while(have_posts()) @php(the_post())
    @php $post_object = get_field('select_featured_article');
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
    @endphp
    @if( $post_object && $paged <=2 )
      @include('partials.blog-main-header')
    @endif
    @include('partials.blog-menu')
    @include('partials.blog-main')
  @endwhile
@endsection
