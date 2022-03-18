
var form = document.getElementById('form')
function validateEmail(email) {
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  if (emailRegex.test(email)) {
  return true;
  } else {
    return false;
  }
};
function validatePassword(passwd) {
  var passwdFormat=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (passwd.lenght < 7) {
    return false;
  }
  if (!passwd.match(passwdFormat)) {
    return false;
  }
  return true;
}
form.addEventListener("submit",function(event){
    event.preventDefault()
    var correo = document.getElementById('email'),
        contrasena = document.getElementById("password")
        Correo_ok=validateEmail(correo.value.trim());
        Contrasena_ok=validatePassword(contrasena.value.trim())

        if (!Correo_ok){
          alert('introduzca un correo válido')   
        }
        if (!Contrasena_ok){
          alert('Introduzca una contraseña con 8 y 15 carácteres que tenga una letra en minúscula, mayuscula y un caracter')   
        }
    if(Correo_ok && Contrasena_ok){
     CreateJson(correo,contrasena)          
    }
  })
  function CreateJson(email,passwd){ 
    var formSucessfull={"correo":email.value,"contrasena":passwd.value}
   // console.log(FormSucessfull);
    var inicio_Sesion=enviarFormulario('/Iniciarsesion',formSucessfull);
    if (inicio_Sesion=='usuario si existe')
    {
      alert("Registro Completado");
      return;
    } 
    if (inicio_Sesion='usuario no existe'){
      alert("el usuario no se encuentra registrado")
    }
    
    
  }

  async function enviarFormulario(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }