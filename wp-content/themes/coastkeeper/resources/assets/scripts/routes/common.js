export default {
  init() {
    // JavaScript to be fired on all pages
    // Prevent small screen page refresh sticky bug
    $(window).on('sticky.zf.unstuckfrom:bottom', function(e) {
      if (!Foundation.MediaQuery.atLeast('large')) {
        $(e.target).removeClass('is-anchored is-at-bottom').attr('style', '');
      }
    });
    //Dropdown Slideout
    /*
    $(window).on('show.zf.dropdownmenu', function(e) {
      if (Foundation.MediaQuery.atLeast('large')) {
        var i = 0;
        $(e.target).find('.submenu.js-dropdown-active .menu-item').each(function( ) {
          i += $(this).outerHeight();
        });

        var height = i + 'px';
        $(e.target).find('.submenu.js-dropdown-active').css( 'height', height);
      }
    });

    $(window).on('hide.zf.dropdownmenu', function(e) {
      if (Foundation.MediaQuery.atLeast('large')) {
        $(e.target).find('.submenu').css( 'height', '0');
      }
    });
    */

    //Menu Control Activate
    $('#nav-primary').on('on.zf.toggler', function(e) {
      alert('here we go');
      $('#nav-primary-control').addClass('active');
    });

    $('#nav-primary').on('off.zf.toggler', function(e) {
      $('#nav-primary-control').removeClass('active');
    });

    //Toggle off canvas search
    $('.menu-item.search-icon').on('click', function (e) {
      e.preventDefault();
      $('#off-canvas-search').foundation('toggle');
    });

    //Toggle Donate Options
    $('.toggle-giving li').on('click', function (e) {
      e.preventDefault();
      $('.toggle-giving li').toggleClass('active');
      $('.donate-amounts').toggleClass('visible');
    });

    //Activate Post Categories Toggler when menu is Activate
    $('#post-menu-dropdown').on('on.zf.toggler', function(e) {
      $('.categories-toggle').addClass('active');
      $('.categories-toggle .control').addClass('active');
    });

    $('#post-menu-dropdown').on('off.zf.toggler', function(e) {
      $('.categories-toggle').removeClass('active');
      $('.categories-toggle .control').removeClass('active');
    });

    //Blog scroll
    if($("#blog-scroll").length) {
      $('#blog-scroll').on('click', function(e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(this).offset().top - 84
        }, 500);
        $(this).removeClass('shake');
      });

      let blogStart = $('#blog-scroll').offset().top;

      $(window).scroll(function() {
        let height = $(window).scrollTop();
        if(height  > blogStart) {
            $('#blog-scroll').removeClass('shake');
        }
      });
    }
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired

    //launch slick slider
    $('.full-screen-slider').slick();

    //launch category slider
    let count = parseInt($('.category-slider').data('slide-count'));
    if(count > 5) {
      count = 5;
    }

    $('.category-slider').slick({
      slidesToShow: count,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      centerMode: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });
  },
};
