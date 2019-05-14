<!doctype html>
<html @php(language_attributes())>
  @include('partials.head')
  <body @php(body_class())>
    <div id="body-reveal"></div>
    @php(do_action('get_header'))
    @include('partials.header')
    @include('partials.off-canvas')
    <div class="content off-canvas-content" role="document" >
      <main class="main">
        @yield('content')
      </main>
    </div>
    @php(do_action('get_footer'))
    @include('partials.footer')
    @php(wp_footer())
  </body>
</html>
