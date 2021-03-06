
function initMap() {
  //initial location of the marker
  var roorkee = {lat: 29.858090, lng: 77.885212};

  //creates a map with center at roorkee
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: roorkee,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  //creates a marker which is draggable
  var marker = new google.maps.Marker({
    position: roorkee,
    map: map,
    title: "Hello World",
    draggable: true
  });

  //creates search-box 
  var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));

  //bindes searchbox with places_changed to display related searches
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

  var truckloc;
  var lat = 29.858090, lng = 77.885212, stg;
  var contianer = $('div.contianer');

  //find truck location button is clicked
  $('input#get').click(function(){
    lat = marker.getPosition().lat();
    lng = marker.getPosition().lng();
    stg = '/home?lat=' + lat.toString() + '&lng=' + lng.toString(); //created the url with lat, lng in json format

    //calling ajax get request
    $.ajax({
      type: 'GET',
      url: stg,
      data: truckloc,
      dataType: 'json',
      contentType: 'application/json',
      success: function(data){
        //success function will be called upon receiving response from the server to console the data
        console.log('got response');

        console.log(data);
        // contianer.innerHTML = "";

        // $.each(data, function(index, item){
        //   $.each(item, function(key, value){
        //     contianer.append(key + ': ' + value + '</br>');
        //   });
        //   contianer.append('<br/><br/>');
        // });
        // location.reload();
      },
      error: function(){
        //error is called when there is no response from the server
        alert('error');
      }
    });
  });

}
