function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getObjectLocalStorage(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}
var miMapa;
var latLongPazPeru={
    lat: -16.457389199999998,
    lng: -71.5315308
}
var opcionesMapa = {
    enableHighAccuracy: true
}

function initMap() {
    miMapa = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: latLongPazPeru.lat,
            lng: latLongPazPeru.lng},
            zoom: 16
        });
};
var miubicacion='nada';
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
    var marker = new google.maps.Marker({
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
    geocodeLatLng(geocoder,marker.position,'direccion');
};

function AnadirDestino(){
    
    google.maps.event.addListener(miMapa, 'click', function( event ){
        var geocoder = new google.maps.Geocoder;
        geocodeLatLng(geocoder, new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()), 'destino');
    });
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