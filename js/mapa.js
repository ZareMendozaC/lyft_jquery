function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getObjectLocalStorage(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}
var miMapa;
var directionsService = null;
var latLongPazPeru={
    lat: -16.457389199999998,
    lng: -71.5315308
}
var opcionesMapa = {
    enableHighAccuracy: true
}

var destino = null;

function initMap() {
    miMapa = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: latLongPazPeru.lat,
            lng: latLongPazPeru.lng},
            zoom: 16
        });
};
var miubicacion='nada';
var currentMarker = null;
var directionsDisplay = null;

function geocodeLatLng(geocoder, position, id) {

  var latlng = position;
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        $('#'+id).html(results[0].formatted_address);
        miubicacion= results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function centrarMapa(position){
    miMapa.setZoom(16);
    miMapa.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    currentMarker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: miMapa,
        title:"Aqui estoy!!!",
        icon: "img/persona.png"
    });
     var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude+0.002, position.coords.longitude),
        map: miMapa,
        title:"auto1",
        icon: "img/carro.png"
    });
     var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude+0.005, position.coords.longitude),
        map: miMapa,
        title:"auto2",
        icon: "img/carro.png"
    });
      var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude+0.005),
        map: miMapa,
        title:"auto3",
        icon: "img/carro.png"
    });

    var geocoder = new google.maps.Geocoder;
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    geocodeLatLng(geocoder, currentMarker.position,'direccion');
};

function AnadirDestino(){

    google.maps.event.addListener(miMapa, 'click', function( event ){
        var geocoder = new google.maps.Geocoder;

        if(destino == null) {
            destino =  new google.maps.Marker({
                position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
                map: miMapa,
                title:"Destino!!!",
                icon: "img/persona.png"
            });
        } else {
            changeMarkerPosition(destino, event.latLng.lat(), event.latLng.lng());
        }
        geocodeLatLng(geocoder, new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()), 'destino');
        calcRoute(currentMarker.position, destino.position);
    });
}

function calcRoute(start, end) { //lat, long
    var bounds = new google.maps.LatLngBounds();
    //bounds.extend(start);
   // bounds.extend(end);
    miMapa.fitBounds(bounds);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(miMapa);
        } else {
            alert("Direction Requested failed: " + status);
        }
    });
}

function changeMarkerPosition(marker, lat, long) {
    var latlng = new google.maps.LatLng(lat, long);
    marker.setPosition(latlng);
}

function init(){
    if(navigator.geolocation){
        console.log('Navigation supported');
        navigator.geolocation.getCurrentPosition(centrarMapa);
    }
    else
    {
        console.log('Navigation NOT supported');
    }
    $("#listaCarros li").mouseover(function(){
            $(this).addClass("active");
            $(this).addClass("morado");
        });
    $("#listaCarros li").mouseleave(function(){
            $(this).removeClass("active");
            $(this).removeClass("morado");
    });
    $("#listaCarros li").click(function(){
            var direccion= $('#direccion').text();
            var auto=  $(this).text();
            setObjectLocalStorage('midireccion',direccion);
            setObjectLocalStorage('auto',auto);
        });
    $("#pick").click(function(){
        $('.dropup').css("display", "none");
        $('#pick').css("display", "none");
        $('#request').css("display", "block");
        $('#info-auto').css("display", "block");
        $('#midireccion').html(miubicacion);
        AnadirDestino();
        });

     $.ajax({
        url:'https://clientes.geekadvice.pe/api/carrera',
        data: {tipo:'3'}
        }).success(function(_data){console.log(_data)}).fail(function(){alert("error")});
}

//recibir
/*
 $.ajax({
        url:'https://clientes.geekadvice.pe/api/carrera',
        data: {tipo:'1'}
        }).success(function(_data){console.log(_data)}).fail(function(){alert("error")});*/
