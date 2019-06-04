var map;

function initMap() {
  if (document.getElementById('map') !== null) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 55.636564706, lng: 37.516969567},
      zoom: 16
    });
  }
}
