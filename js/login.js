function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getObjectLocalStorage(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}

 $(document).ready(function() {

    String.prototype.replaceAll = function(str1, str2, ignore)
    {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    }
    //$("#phone").intlTelInput();
     $('#phone-selector').intlTelInput({
            //utilsScript: 'js/utils.js',
            autoPlaceholder: true,
            preferredCountries: ['us', 'pe'],
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                $("#phone-selector").attr('maxlength','');
                $("#phone-selector").attr('maxlength',selectedCountryPlaceholder.length);
                 return selectedCountryPlaceholder;
            }
        });

    $('.flag-container').append("<span id='code-dial' class='code-dial'>+1</span>");
    $('.flag-container').after("<i id='number-valid' class='number-valid fa'></span>");

    function validar(){
        if( $("#phone-selector").val() == '' ) {
                $('.number-valid').removeClass('fa-times');
                $('.number-valid').removeClass('fa-check');
                $('.btn-next').hide();
        } else {
            if( $("#phone-selector").intlTelInput("isValidNumber") ) {
                $('.number-valid').addClass('fa-check');
                $('.number-valid').removeClass('fa-times');
                $('.btn-next').show();
            } else {
                $('.number-valid').addClass('fa-times');
                $('.number-valid').removeClass('fa-check');
                $('.btn-next').hide();
            }
        }
    }
    $('#phone-selector').keyup( function(){
        validar();
     });

    $("#phone-selector").on("countrychange", function(e, countryData) {
        $('#code-dial').html( "+" + countryData.dialCode );
        setObjectLocalStorage('country',countryData.name);
        setObjectLocalStorage('dial',countryData.dialCode);
        validar();
    });
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function next(){
        var lab= "LAB-"
        var numAle= getRandomArbitrary(100,999);
        var codeGenerado= lab+Math.floor(numAle);

        setObjectLocalStorage('tel',$('#phone-selector').val());
        setObjectLocalStorage('codigo',codeGenerado);
        alert("su codigo es: "+codeGenerado);
        window.location = "datos.html";
    };
    
    $('#next').click(next);

});

function regresarIndex(){
    window.location = "index.html";
}
$('#regresar').click(regresarIndex);
