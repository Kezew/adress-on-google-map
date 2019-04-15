var endPoint = "https://maps.googleapis.com/maps/api/geocode/json";
var apiKey = "AIzaSyDSCmtxM00sTEJeEnm0oLerUZAcuhv_A4c";
let latUser;  // given Lat by user
let lngUser;  // given Lng by user
let initlat = 47.528693;   // Progmatic
let initlng = 19.0380161;  // Progmatic
let browserLat;
let browserLng;
// Initialize and add the map
function drawMap(gpsLat, gpsLng) {
  // The location of Progmatic
  var place = {lat: gpsLat, lng: gpsLng};

  // The map, centered at Progmatic
  var map = new google.maps.Map( document.getElementById('map'), {zoom: 9, center: place} );

  // The marker, positioned at Progmatic
  var marker = new google.maps.Marker({position: place, map: map});
  var markerBrowser = new google.maps.Marker({position: {lat: browserLat, lng: browserLng}, map: map});

  // var newBound = new google.maps.LatLngBounds();
  // newBound.extend(position1);
  // newBound.extend(position);
  // map.fitBounds(newBound);
}
drawMap(initlat, initlng);  // call with Progmatic gps coordinates



function success(pos) {
  var crd = pos.coords;
  browserLat = crd.latitude;
  browserLng = crd.longitude;
  // console.log('Your current position is:');
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
}

navigator.geolocation.getCurrentPosition(success);


$('#show-in-map').click( function() {
  var adress = $('#address').val();  // TODO HACKED
  $.ajax(
    endPoint + '?address=' + adress + '&key=' + apiKey,
    {
      success: data => {
        if(data.status == 'OK'){
          latUser = data.results[0].geometry.location.lat;
          lngUser = data.results[0].geometry.location.lng;
          drawMap(latUser, lngUser);

          // elkérjük a gps koord.

        } else if(data.status == 'ZERO_RESULTS') {
          $('#alert-modal').modal('show');
          // TODO nem beazonosítható cím BOOTSTRAP MODAL
        }

      },
      error: () => {
        // hálózazti hibakeresés
      },
      method: 'GET',
      dataType : 'json',
      //xhrFields : { withCredentials: true}
    }
  );

});
