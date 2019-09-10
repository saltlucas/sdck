// import external dependencies
import 'jquery';

// Import everything from autoload
import "./autoload/**/*";

//Import yarn packages
import 'slick-carousel/slick/slick.min';
import 'vanilla-lazyload/dist/lazyload.min';
import 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js';


// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.

});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
