<footer id="footer" class="content-info">
  <section class="footer-email text-center margin-top-extra-large margin-bottom-extra-large">
    <div class="grid-container">
    <h2 class="margin-bottom-medium">Get Your Water News</h2>
      <form class="newsletter-lead" action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
        <input type=hidden name='captcha_settings' value='{"keyname":"website_lead","fallback":"true","orgId":"00DG0000000C1g3","ts":""}'>
        <input type=hidden name="oid" value="00DG0000000C1g3">
        <input type=hidden name="retURL" value="https://www.sdcoastkeeper.org/newsletter-sign-up">
        <div class="grid-x grid-padding-x">
          <div class="cell small-12 medium-4">
            <input class="text-field" placeholder="First Name" id="first_name" maxlength="40" name="first_name" size="20" type="text" />
          </div>
          <div class="cell small-12 medium-4">
            <input class="text-field" placeholder="Last Name" id="last_name" maxlength="80" name="last_name" size="20" type="text" />

            <div class="g-recaptcha" data-sitekey="6LemROkSAAAAAK1LHaoyST4UTJ49nUMZTTBkK7kM"></div>
          </div>
          <div class="cell small-12 medium-4">
            <input class="text-field" placeholder="Email Address"  id="email" maxlength="80" name="email" size="20" type="text" />
          </div>
        </div>
        <input type="submit" class="button blue-highlight" value="Sign Up" name="submit">
      </form>
    </div>
  </section>
  <section class="footer-utilities margin-top-large margin-bottom-large">
    <div class="grid-container">
      <div class="grid-x grid-padding-x">
        <div class="cell small-12 medium-6 large-4">
          <h4>Join</h4>
          @if (has_nav_menu('footer_1'))
              {!! wp_nav_menu(['theme_location' => 'footer_1', 'menu_class' => 'nav vertical menu footer-menu', 'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>']) !!}
          @endif
        </div>
        <div class="cell small-12 medium-6 large-4">
          <h4>Get Involved</h4>
          @if (has_nav_menu('footer_2'))
              {!! wp_nav_menu(['theme_location' => 'footer_2', 'menu_class' => 'nav vertical menu footer-menu', 'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>']) !!}
          @endif
        </div>
        <div class="cell small-12 medium-6 large-3">
          <h4>Follow Us</h4>
            <ul class="inline-list social-list">
                <li>
                <a class="social-icon" target="_blank" href="//www.instagram.com/sd_coastkeeper/" title="San Diego Coastkeeper Instagram">
                  <svg class="instagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.48 19.48"><defs><style>.cls-1{fill:#006797;}</style></defs><title>instagram</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M15.72,0h-12A3.77,3.77,0,0,0,0,3.77v12a3.76,3.76,0,0,0,3.77,3.76h12a3.76,3.76,0,0,0,3.76-3.76v-12A3.77,3.77,0,0,0,15.72,0ZM16.8,2.25h.43V5.55H13.94V2.25ZM7,7.74a3.42,3.42,0,0,1,5.56,0,3.43,3.43,0,1,1-6.21,2A3.49,3.49,0,0,1,7,7.74Zm10.63,8a1.87,1.87,0,0,1-1.87,1.87h-12A1.87,1.87,0,0,1,1.9,15.72v-8H4.81a5.33,5.33,0,1,0,9.87,0h2.91Z"></path></g></g></svg>
                </a>
                </li>
                <li>
                <a class="social-icon" target="_blank" href="//www.facebook.com/SanDiegoCoastkeeper" title="San Diego Coastkeeper Facebook">
                    <svg class="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.35 18"><defs><style>.cls-1{fill:#006797;}</style></defs><title>facebook</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M6.07,18V9.79H8.82l.42-3.2H6.07v-2C6.07,3.62,6.32,3,7.65,3h1.7V.13A22,22,0,0,0,6.88,0,3.86,3.86,0,0,0,2.76,4.23V6.59H0v3.2H2.76V18Z"/></g></g></svg>
                </a>
                </li>
                <li>
                  <a class="social-icon" target="_blank" href="//www.linkedin.com/company/san-diego-coastkeeper" title="San Diego Coastkeeper LinkedIn">
                    <svg version="1.1" id="linkedin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                    <style type="text/css">
                    	.st0{fill:#006797;}
                    </style>
                    <title>linkedin</title>
                    <rect x="0.4" y="8" class="st0" width="5" height="16"/>
                    <circle class="st0" cx="2.9" cy="2.9" r="2.9"/>
                    <path class="st0" d="M24,24h-5v-7.8c0-1.9,0-4.2-2.6-4.2s-3,2-3,4.1V24h-5V8h4.8v2.2h0.1c1-1.7,2.8-2.7,4.7-2.6c5,0,6,3.3,6,7.6V24z
                    	"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="social-icon" target="_blank" href="//www.pinterest.com/sdcoastkeeper/" title="San Diego Coastkeeper Pinterest">
                    <svg version="1.1" id="pinterest" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                    <style type="text/css">
                    	.st0{fill:#006797;}
                    </style>
                    <path class="st0" d="M12,2C6.5,2,2,6.5,2,12c0,4,2.3,7.6,6,9.2c0-0.7,0-1.5,0.2-2.3s1.3-5.4,1.3-5.4s-0.3-0.6-0.3-1.6
                    	c0-1.5,0.9-2.6,1.9-2.6c0.9,0,1.3,0.7,1.3,1.5c0,0.9-0.6,2.3-0.9,3.6c-0.2,1.1,0.5,1.9,1.6,1.9c1.9,0,3.2-2.4,3.2-5.3
                    	c0-2.2-1.5-3.8-4.2-3.8c-3,0-4.9,2.3-4.9,4.8c0,0.9,0.3,1.5,0.7,2C8,14,8.1,14.1,8,14.4c0,0.2-0.2,0.6-0.2,0.8
                    	c-0.1,0.3-0.3,0.3-0.5,0.2c-1.4-0.6-2-2.1-2-3.8c0-2.8,2.4-6.2,7.1-6.2c3.8,0,6.3,2.8,6.3,5.7c0,3.9-2.2,6.9-5.4,6.9
                    	c-1.1,0-2.1-0.6-2.4-1.2c0,0-0.6,2.3-0.7,2.7c-0.2,0.8-0.6,1.5-1,2.1C10.1,21.9,11,22,12,22c5.5,0,10-4.5,10-10S17.5,2,12,2"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="social-icon" target="_blank" href="//twitter.com/sd_coastkeeper" title="San Diego Coastkeeper Twitter">
                    <svg version="1.1" id="Twitter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                    <style type="text/css">
                    	.st0{fill:#006797;}
                    </style>
                    <title>twitter</title>
                    <path class="st0" d="M23.1,5.1c-0.8,0.4-1.7,0.6-2.6,0.7c1-0.6,1.7-1.5,2-2.5c-0.9,0.5-1.9,0.9-2.9,1.1c-1.7-1.8-4.6-1.9-6.4-0.2
                    	c-0.9,0.9-1.4,2-1.4,3.3l0,0c0,0.3,0,0.7,0.1,1C8.2,8.4,4.8,6.7,2.5,3.8C1.3,5.9,1.9,8.6,3.9,9.9c-0.7,0-1.4-0.2-2.1-0.6v0.1
                    	c0,2.2,1.5,4,3.7,4.5c-0.7,0.2-1.3,0.2-2,0.1c0.6,1.9,2.3,3.1,4.2,3.2c-1.9,1.5-4.4,2.2-6.8,1.9c2.1,1.3,4.5,2,7,2
                    	c7.1,0,12.9-5.7,12.9-12.8c0,0,0,0,0,0c0-0.1,0-0.1,0-0.1V7.5C21.7,6.8,22.5,6,23.1,5.1"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="social-icon" target="_blank" href="//www.youtube.com/user/sandiegocoastkeeper" title="San Diego Coastkeeper YouTube">
                    <svg version="1.1" id="youtube" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 28 24" style="enable-background:new 0 0 28 24;" xml:space="preserve">
                    <style type="text/css">
                    	.st0{fill:#006797;}
                    </style>
                    <path class="st0" d="M26.5,6.9c0,0-0.2-1.8-1-2.5c-1-1-2.1-1-2.6-1.1C19.4,3,14,3,14,3l0,0c0,0-5.4,0-9,0.3c-0.5,0-1.6,0-2.5,1
                    	c-0.8,0.8-1,2.5-1,2.5S1.2,9,1.2,11v2c0,2.1,0.3,4.1,0.3,4.1s0.2,1.8,1,2.5c1,1,2.3,1,2.8,1.1C7.3,20.9,14,21,14,21s5.4,0,9-0.3
                    	c0.5-0.1,1.6-0.1,2.6-1.1c0.8-0.8,1-2.5,1-2.5s0.3-2.1,0.3-4.1v-2C26.8,9,26.5,6.9,26.5,6.9 M11.4,15.3V8.1l6.9,3.6
                    	C18.3,11.7,11.4,15.3,11.4,15.3z"/>
                    <path class="st0" d="M26.5,6.9c0,0-0.2-1.8-1-2.5c-1-1-2.1-1-2.6-1.1C19.4,3,14,3,14,3l0,0c0,0-5.4,0-9,0.3c-0.5,0-1.6,0-2.5,1
                    	c-0.8,0.8-1,2.5-1,2.5S1.2,9,1.2,11v2c0,2.1,0.3,4.1,0.3,4.1s0.2,1.8,1,2.5c1,1,2.3,1,2.8,1.1C7.3,20.9,14,21,14,21s5.4,0,9-0.3
                    	c0.5-0.1,1.6-0.1,2.6-1.1c0.8-0.8,1-2.5,1-2.5s0.3-2.1,0.3-4.1v-2C26.8,9,26.5,6.9,26.5,6.9 M11.4,15.3V8.1l6.9,3.6
                    	C18.3,11.7,11.4,15.3,11.4,15.3z"/>
                    </svg>
                  </a>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="footer-bottom blue text-center text-white">
    <div class="h2">Thank You Supporters</div>
    <div id="copyright">&copy;<?php echo date("Y"); ?> San Diego Coastkeeper</div>
  </section>
  <div class="container">

    @php(dynamic_sidebar('sidebar-footer'))
  </div>
</footer>
@php(wp_footer())
