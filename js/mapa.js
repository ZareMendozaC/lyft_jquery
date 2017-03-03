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
};


function init(){
    if(navigator.geolocation){
        console.log('Navigation supported');
        navigator.geolocation.watchPosition(centrarMapa);
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