
function initMap() {
  var roorkee = {lat: 29.862916, lng: 77.896410};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: roorkee,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = new google.maps.Marker({
    position: roorkee,
    map: map,
    title: "Hello World",
    draggable: true
  });

  var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));

  google.maps.event.addListener(searchBox, 'places_changed', function(){

    var places = searchBox.getPlaces();

    //bound
    var bounds = new google.maps.LatLngBounds();
    var i, places;

    for(i = 0; place = places[i]; i++){
      bounds.extend(place.geometry.location);
      marker.setPosition(place.geometry.location);
    }

    map.fitBounds(bounds);
    map.setZoom(10);
  });

  var lat, lng, stg;
  var contianer = $('div.contianer');

  $('input#get').click(function(){
    lat = marker.getPosition().lat();
    lng = marker.getPosition().lng();
    stg = '/home?lat=' + lat.toString() + '&lng=' + lng.toString();

    $.ajax({
      type: 'GET',
      url: stg,
      dataType: 'json',
      success: function(data){
        console.log('request get');
        contianer.append('<h1>Hi There</h1>');
      }
    });
  });

}
