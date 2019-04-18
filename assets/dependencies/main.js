$(document).ready(function() {
  "use strict";

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
  $(window).on("scroll", function() {
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
  $("#back-top a").on("click", function() {
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
  $(window).on("load", function() {
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
  $(window).on("load", function() {
    $(".filters ul li").on("click", function() {
      $(".filters ul li").removeClass("active");
      $(this).addClass("active");

      var data = $(this).attr("data-filter");
      $grid.isotope({
        filter: data
      });
    });

    if (document.getElementById("work")) {
      var $grid = $(".grid").isotope({
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-sizer"
        }
      });
    }
  });

  //------- Accordion  js --------//

  jQuery(document).ready(function($) {
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

    $(document).on("click", ".menu-has-children i", function(e) {
      $(this)
        .next()
        .toggleClass("menu-item-active");
      $(this)
        .nextAll("ul")
        .eq(0)
        .slideToggle();
      $(this).toggleClass("ti-angle-up ti-angle-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function(e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("ti-close ti-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function(e) {
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

  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function() {
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

  $(document).ready(function() {
    $("html, body").hide();

    if (window.location.hash) {
      setTimeout(function() {
        $("html, body")
          .scrollTop(0)
          .show();

        $("html, body").animate(
          {
            scrollTop: $(window.location.hash).offset().top - 108
          },
          1000
        );
      }, 0);
    } else {
      $("html, body").show();
    }
  });

  //------- Google Map  js --------//


 /* if (document.getElementById("map")) {
    initMap();
  }*/

 /* if (document.getElementById("map")) {
    google.maps.event.addDomListener(window, "load", init);

    function init() {
      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(40.67, -73.94), // New York
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#e9e9e9"
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5"
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 29
              },
              {
                weight: 0.2
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 18
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 16
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5"
              },
              {
                lightness: 21
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#dedede"
              },
              {
                lightness: 21
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "on"
              },
              {
                color: "#ffffff"
              },
              {
                lightness: 16
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                saturation: 36
              },
              {
                color: "#333333"
              },
              {
                lightness: 40
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#f2f2f2"
              },
              {
                lightness: 19
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#fefefe"
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#fefefe"
              },
              {
                lightness: 17
              },
              {
                weight: 1.2
              }
            ]
          }
        ]
      };
      var mapElement = document.getElementById("map");
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.67, -73.94),
        map: map,
        title: "Snazzy!"
      });
    }
  }*/

  //------- Mailchimp js --------//
  $(document).ready(function() {
    $("#mc_embed_signup")
      .find("form")
      .ajaxChimp();
  });

/*  $(".fancybox-thumb").fancybox({
    prevEffect	: 'none',
    nextEffect	: 'none',
    helpers	: {
      title	: {
        type: 'outside'
      },
      thumbs	: {
        width	: 50,
        height	: 50
      }
    }
  });*/

 /*   $(".fancybox").fancybox({
      openEffect	: 'none',
      closeEffect	: 'none'
    });*/
  $(".fancybox").fancybox({
    prevEffect		: 'none',
    nextEffect		: 'none',
    closeBtn		: false,
    helpers		: {
      title	: { type : 'inside' },
      buttons	: {}
    }
  });
});



/*function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.636564706, lng: 37.516969567},
    zoom: 16 /!* Уровни масштабирования от 0 - Земля. 10 - Город, 15 - это примерно улица, 20 - здание! *!/
  });

  // Чтобы настроить местоположение на карте можно раскомментировать
  // и посмортеть точные координаты в консоли
  var coordsDiv = document.getElementById('coords');
  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
  map.addListener('mouseup', function(event) {
    /!*console.log('event.latLng.lat(): ', event.latLng.lat());
    console.log('event.latLng.lng():', event.latLng.lng());*!/
    coordsDiv.textContent =
      'lat: ' + Math.round(event.latLng.lat()) + ', ' +
      'lng: ' + Math.round(event.latLng.lng());
  });
}*/


// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// // init Masonry
// var grid = document.querySelector('.grid');
//
// var msnry = new Masonry( grid, {
//   itemSelector: '.grid-item',
//   columnWidth: '.grid-sizer',
//   percentPosition: true
// });
//
// imagesLoaded( grid ).on( 'progress', function() {
//   // layout Masonry after each image loads
//   msnry.layout();
// });



// This example defines an image map type using the Gall-Peters
// projection.
// https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection
/* function initMap() {
   // Create a map. Use the Gall-Peters map type.
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 0,
     center: {lat: 0, lng: 0},
     mapTypeControl: false
   });

   initGallPeters();
   map.mapTypes.set('gallPeters', gallPetersMapType);
   map.setMapTypeId('gallPeters');

   // Show the lat and lng under the mouse cursor.
   var coordsDiv = document.getElementById('coords');
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
   map.addListener('mousemove', function(event) {
     console.log('event.latLng.lat(): ', event.latLng.lat());
     console.log('event.latLng.lng():', event.latLng.lng());
     coordsDiv.textContent =
       'lat: ' + Math.round(event.latLng.lat()) + ', ' +
       'lng: ' + Math.round(event.latLng.lng());
   });

   // Add some markers to the map.
   map.data.setStyle(function(feature) {
     return {
       title: feature.getProperty('name'),
       optimized: false
     };
   });
   map.data.addGeoJson(cities);
 }

 var gallPetersMapType;
 function initGallPeters() {
   var GALL_PETERS_RANGE_X = 800;
   var GALL_PETERS_RANGE_Y = 512;

   // Fetch Gall-Peters tiles stored locally on our server.
   gallPetersMapType = new google.maps.ImageMapType({
     getTileUrl: function(coord, zoom) {
       var scale = 1 << zoom;

       // Wrap tiles horizontally.
       var x = ((coord.x % scale) + scale) % scale;

       // Don't wrap tiles vertically.
       var y = coord.y;
       if (y < 0 || y >= scale) return null;

       return 'https://developers.google.com/maps/documentation/' +
         'javascript/examples/full/images/gall-peters_' + zoom +
         '_' + x + '_' + y + '.png';
     },
     tileSize: new google.maps.Size(GALL_PETERS_RANGE_X, GALL_PETERS_RANGE_Y),
     minZoom: 0,
     maxZoom: 1,
     name: 'Gall-Peters'
   });

   // Describe the Gall-Peters projection used by these tiles.
   gallPetersMapType.projection = {
     fromLatLngToPoint: function(latLng) {
       var latRadians = latLng.lat() * Math.PI / 180;
       return new google.maps.Point(
         GALL_PETERS_RANGE_X * (0.5 + latLng.lng() / 360),
         GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin(latRadians)));
     },
     fromPointToLatLng: function(point, noWrap) {
       var x = point.x / GALL_PETERS_RANGE_X;
       var y = Math.max(0, Math.min(1, point.y / GALL_PETERS_RANGE_Y));

       return new google.maps.LatLng(
         Math.asin(1 - 2 * y) * 180 / Math.PI,
         -180 + 360 * x,
         noWrap);
     }
   };
 }

 // GeoJSON, describing the locations and names of some cities.
 var cities = {
   type: 'FeatureCollection',
   features: [{
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [-87.650, 41.850]},
     properties: {name: 'Chicago'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [-149.900, 61.218]},
     properties: {name: 'Anchorage'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [-99.127, 19.427]},
     properties: {name: 'Mexico City'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [-0.126, 51.500]},
     properties: {name: 'London'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [28.045, -26.201]},
     properties: {name: 'Johannesburg'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [15.322, -4.325]},
     properties: {name: 'Kinshasa'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [151.207, -33.867]},
     properties: {name: 'Sydney'}
   }, {
     type: 'Feature',
     geometry: {type: 'Point', coordinates: [0, 0]},
     properties: {name: '0°N 0°E'}
   }]
 };*/
