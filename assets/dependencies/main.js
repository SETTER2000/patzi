var map;

function initMap() {
  if (document.getElementById('map') !== null) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 55.636564706, lng: 37.516969567},
      zoom: 16
    });
  }
}


$(document).ready(function () {
  "use strict";


  (function () {
/*
    document.onreadystatechange = () => {

      if (document.readyState === 'complete') {

        /!**
         * Setup your Lazy Line element.
         * see README file for more settings
         *!/
        let haha = document.querySelector('#haha');
        console.log('EL1L haha::; ', haha);
        if(!_.isNull(haha)) {
          let hahaAnimation = new LazyLinePainter(haha, {
            "ease": "easeInOutQuart",
            "strokeWidth": 16,
            "strokeOpacity": 1,
            "strokeColor": "#67cac7",
            "strokeCap": "square"
          });
          hahaAnimation.paint();
        }
        let el = document.querySelector('#wow');
        if(!_.isNull(el)) {
          let myAnimation = new LazyLinePainter(el, {
            "ease": "easeInOutQuad",
            "strokeWidth": 6.9,
            "strokeOpacity": 1,
            "strokeColor": "#F2C511",
            "strokeCap": "square"
          });
          myAnimation.paint();
        }

        let sup = document.querySelector('#super');
        if(!_.isNull(sup)) {
          console.log('ELLL super::; ', sup);
          let superAnimation = new LazyLinePainter(sup, {
            'ease': 'easeInOutSine',
            'strokeWidth': 19.0,
            'strokeOpacity': 0.9,
            'strokeColor': '#E84B3C',
            'strokeCap': 'square'
          });
          superAnimation.paint();
        }
        let like = document.querySelector('#like');
        if(!_.isNull(like)) {
        let likeAnimation = new LazyLinePainter(like, {
          'ease': 'easeOutBounce',
          'strokeWidth': 19,
          'strokeOpacity': 1,
          'strokeColor': '#2980B9',
          'strokeCap': 'square'
        });
        likeAnimation.paint();
      }
      }
    }*/

  })();


  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  //   $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);

  //------- Wow JS Initialized --------//
  new WOW().init();

  //------- Go to Top --------//
  //------- Header Scroll Class  js --------//
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
      $("#back-top").addClass("back-top-animation");
    } else {
      $("#header").removeClass("header-scrolled");
      $("#back-top").removeClass("back-top-animation");
    }
  });

  /* ---------------------------------------------
        scroll body to 0px on click
     --------------------------------------------- */
  $("#back-top a").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      1000
    );
    return false;
  });

  //------- Niceselect  js --------//

  if (document.getElementById("default-select")) {
    $("select").niceSelect();
  }

  //------- Pre Loader --------//
  $(window).on("load", function () {
    $(".preloader-area")
      .delay(200)
      .fadeOut(500);
  });

  //------- Lightbox  js --------//
  $(".img-gal").magnificPopup({
    type: "image",
    gallery: {
      enabled: true
    }
  });

  $(".play-btn").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  //------- Filter  js --------//
  $(window).on("load", function () {
    $(".filters ul li").on("click", function () {
      $(".filters ul li").removeClass("active");
      $(this).addClass("active");

      var data = $(this).attr("data-filter");
      $grid.isotope({
        filter: data
      });
    });

    // if (document.getElementById("work")) {
    //   // var $grid = $(".grid").isotope({
    //   //   itemSelector: ".grid-item",
    //   //   percentPosition: true,
    //   //   masonry: {
    //   //     columnWidth: ".grid-sizer"
    //   //   }
    //   // });
    // }
  });

  //------- Accordion  js --------//

  jQuery(document).ready(function ($) {
    if (document.getElementById("accordion")) {
      var accordion_1 = new Accordion(document.getElementById("accordion"), {
        collapsible: false,
        slideDuration: 500
      });
    }
  });

  //------- Superfist nav menu  js --------//

  $(".nav-menu").superfish({
    animation: {
      opacity: "show"
    },
    speed: 400
  });

  //------- Mobile Nav  js --------//

  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container")
      .clone()
      .prop({
        id: "mobile-nav"
      });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: ""
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="ti-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="ti-angle-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this)
        .next()
        .toggleClass("menu-item-active");
      $(this)
        .nextAll("ul")
        .eq(0)
        .slideToggle();
      $(this).toggleClass("ti-angle-up ti-angle-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("ti-close ti-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("ti-close ti-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  //------- Smooth Scroll  js --------//

  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this)
            .closest("li")
            .addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("ti-menu ti-menu");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function () {
    $("html, body").hide();

    if (window.location.hash) {
      setTimeout(function () {
        $("html, body")
          .scrollTop(0)
          .show();

        $("html, body").animate(
          {
            // scrollTop: $(window.location.hash).offset().top - 108
          },
          1000
        );
      }, 0);
    } else {
      $("html, body").show();
    }
  });

  //------- Google Map  js --------//


  //------- Mailchimp js --------//
  $(document).ready(function () {
    $("#mc_embed_signup")
      .find("form")
      .ajaxChimp();


  });


  //----------- Datepicker js ----------------//
  $(document).ready(function () {
    if (!!SAILS_LOCALS.me) {
      $.datepicker.setDefaults($.datepicker.regional[SAILS_LOCALS.me.preferredLocale]);
    }


    const langGet = function () {
      let language = $(this).attr('data-language');
      $.ajax({
        url: "/api/v1/account/update-language",
        global: false,
        type: "POST",
        data: ({language: language}),
        dataType: "html",
        success: function (msg) {
          location.reload();
        }
      });
    };
    $('#flag').hide();
    if ($(window).height() < 800) {
      $('#flag').show();
    }
    $('#mobile-nav #language').click(langGet);
    $('#language').click(langGet);

    // var language = $(this).attr("data-language");
    var $container = $('masonry-container');
    $container.imagesLoaded(function () {
      $container.masonry({
        columnWidth: ".item",
        itemSelector: ".item"
      });
      $('.item').imagefill();
    });
  });

  //----------- Datepicker js ----------------//
  // $(document).ready(function () {
  //   if($(document).width()<1024) {$('.container').addClass('container-fluid').removeClass('container');}
  //   if($(document).width()>1025) {$('.container-fluid').addClass('container').removeClass('container-fluid');}
  // });
  if ($(document).width() < 1024) {
    $('.container').addClass('container-fluid').removeClass('container');
  }
  if ($(document).width() > 1025) {
    $('.container-fluid').addClass('container').removeClass('container-fluid');
  }

  $('.your-class').slick({});


  let lang = ELEMENT.lang.en;
  lang = (SAILS_LOCALS.me && SAILS_LOCALS.me.preferredLocale === 'ru') ? ELEMENT.lang.ruRU : lang;

  ELEMENT.locale(lang);
  (!!SAILS_LOCALS.me) ? moment.locale(SAILS_LOCALS.me.preferredLocale) : '';
});


