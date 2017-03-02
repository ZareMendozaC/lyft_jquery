function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getObjectLocalStorage(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}
function regresarIndex(){
    window.location = "login.html";
}
$("#regresar").click(regresarIndex);

function isAlphabetic(cadena)
{
      if (cadena.match(/^[a-zA-Z]+$/))
      {
        return true;
      }
      else
      {
        return false;
      }
}
function isEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
    {
        return false;
    }
    return true;
}

function borrarEspacios(frase){
  var contador=0;
  for(var i=0; i<=frase.length; i++){
     frase = frase.replace(" ",'');
    contador++;
    }
  if(contador>0){
    return frase;
  }else{
    return frase;
  }
}

function vistaMapa(){

  var nombreApe= $("#nombreApe");
  var email= $("#mail").val();
  var cadena= nombreApe.val();
  var check= $("#check");
  cadena= borrarEspacios(cadena); // CADENA SIN ESPACIOS


  var isvalid= true;
  if(isAlphabetic(cadena))
  {
    var nombreApe= $("#nombreApe").val();
    var misDatos=nombreApe.split(" "); // SACAR LOS DATOS
    var datos="";
    for(var i=0; i<misDatos.length; i++)
    {
      if(misDatos[i]!=" ")
      {
        datos= datos+misDatos[i];
        datos= datos+" ";
      }

      var nombreValido= $("#nombre-valid");
      nombreValido.css('display','block');
      var nombreValido= $("#nombre-invalid");
      nombreValido.css('display','none');
    }
    setObjectLocalStorage('nombre',datos);
  }
  else
  {
    isvalid=false;
    var nombreValido= $("#nombre-invalid");
      nombreValido.css('display', 'block');
    var nombreValido= $("#nombre-valid");
      nombreValido.css('display','none');
      alert("nombre inválido");
  }

  if(isEmail(email))
  {
      var email= $("#mail-valid");
      email.css('display','block');
      var email= $("#mail-invalid");
      email.css('display','none');
  }else
  {
      isvalid=false;
      var email= $("#mail-valid");
      email.css('display','none');
      var email= $("#mail-invalid");
      email.css('display','block');
      alert("email inválido");
  }
if(check.is(':checked')){}
else
{
  isvalid=false;
  alert("Debe aceptar los terminos y condiciones");
}
  if (isvalid==true) {
    setTimeout(function(){
      window.location= "mapa.html";
     }, 2000);

  }
  else
  {
  var next= $("#next");
  }
}
$('#next').on('click',vistaMapa);
