<script src="./TheFooter.js"></script>
<i18n src="./TheFooter.txt"></i18n>
<style lang="scss" src="./TheFooter.scss"></style>

<template>
  <!-- <BaseFooter style="display:none">
    <div class="footer">
      <div id="footer" class="container">
        <div class="row text-uppercase">
          <FooterLinks/>
          <FooterMarketing/>
        </div>
      </div>
    </div>
  </BaseFooter> -->

  <footer class="footer-area border-top-2 pt-50">
    <div class="footer-top">
      <div class="custom-container">
        <div class="row">
          <div class="footer-column footer-column-1">
            <div class="footer-widget footer-about-2 mb-30">
              <div class="footer-logo">
                <a href="index.html"
                  ><img src="../../../assets/img/logo.svg" alt="logo"
                /></a>
              </div>
              <div class="footer-info">
                <ul>
                  <li><a href="#">+49 (899) 9829960</a></li>
                  <li><a href="#">info@example.com</a></li>
                  <li>PO Box 1622 Colins Street West</li>
                </ul>
              </div>
              <div class="footer-map">
                <a href="contact-us.html">Google maps</a>
              </div>
            </div>
          </div>
          <div class="footer-column footer-column-2">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>{{ $t("company") }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="#">{{ $t("aboutUs") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("jobs") }}</a>
                  </li>
                  <li><a href="#">Press</a></li>
                  <li>
                    <a href="#">{{ $t("contact") }}</a>
                  </li>
                  <li><a href="#">Blog</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-column footer-column-3">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>{{ $t("community") }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="#">{{ $t("community2") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("facebook") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("forums") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("meetup") }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-column footer-column-4">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>LEGAL</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="#">{{ $t("privacy") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("terms") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("license") }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-column footer-column-5">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>{{ $t("profile") }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="#">{{ $t("account") }}</a>
                  </li>
                  <li><a href="#">Checkout</a></li>
                  <li>
                    <a href="#">{{ $t("tracking") }}</a>
                  </li>
                  <li>
                    <a href="#">{{ $t("help") }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-column footer-column-6">
            <div class="footer-widget subscribe-right mb-30">
              <div class="widget-title">
                <h3>{{ $t("newsletter") }}</h3>
              </div>
              <div id="mc_embed_signup" class="subscribe-form-2 mt-20">
                <form class="validate subscribe-form-style" novalidate="">
                  <div id="mc_embed_signup_scroll" class="mc-form-2">
                    <input
                      class="email"
                      type="email"
                      required=""
                      :placeholder="$t('email')"
                      name="EMAIL"
                      value=""
                    />
                    <div class="mc-news-2" aria-hidden="true">
                      <input
                        type="text"
                        value=""
                        tabindex="-1"
                        name="b_6bbb9b6f5827bd842d9640c82_05d85f18ef"
                      />
                    </div>
                    <div class="clear-2">
                      <input
                        class="button"
                        type="submit"
                        name="subscribe"
                        :value="$t('submit')"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom pt-25 pb-15">
      <div class="custom-container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-6 col-12">
            <!-- <div class="footer-widget footer-social-2">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-pinterest-p"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
            </div> -->
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="footer-widget copyright-2 text-center">
              <p>© 2020 SUNRISE</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-12">
            <div class="footer-widget payments-img">
              <a
                ><img
                  class="payments"
                  src="../../../assets/img/payments.png"
                  alt="payments"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
