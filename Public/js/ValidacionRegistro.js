var form = document.getElementById('RegistroForm');
function validateEmail(email) {
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
}
);
function validateName(name) {
  if (name == "" || name.lenght < 3) {
    return false;
  }
  return true;
}
function validatePassword(passwd) {
  var passwdFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (passwd.lenght < 7) {
    return false;
  }
  if (!passwd.match(passwdFormat)) {
    return false;
  }
  return true;
}
function validateTlf(phone) {
  var phoneformat = /^\d{10}$/;
  if (phone.lenght < 6) {
    return false;
  }
  if (!phone.match(phoneformat)) {
    return false;
  }
  return true;
}
function checkInputs() {
  button = document.getElementById('RegButtom');
  nombre = document.getElementById('Regnombre');
  correo = document.getElementById('RegCorreo');
  password = document.getElementById('RegPassword');
  Telefono = document.getElementById('RegTlf');
  Error_element = document.getElementById('Error');
  const username = nombre.value;
  const email = correo.value;
  const passwd = password.value;
  const tlf = Telefono.value.trim();
  let NombreOK = validateName(nombre.value.trim());
  let emailOk = validateEmail(correo.value.trim());
  let passwdOk = validatePassword(password.value.trim());
  let tlfOK = validateTlf(Telefono.value.trim());
  if (!NombreOK) {
    setErrorForm(nombre, "Nombre debe tener 3 carácteres o más")
  } else {
    setSucessForm(nombre);
  }
  if (!emailOk) {
    setErrorForm(correo, "Introduzca un email válido")
  } else {
    setSucessForm(correo)
  }
  if (!passwdOk) {
    setErrorForm(password, "Introduzca una contraseña con 8 y 15 carácteres que tenga una letra en minúscula, mayuscula y un caracter ")
  } else {
    setSucessForm(password)
  }
  if (!tlfOK) {
    setErrorForm(Telefono, "un número de teléfono válido")
  } else {
    setSucessForm(Telefono)
  }
  if (NombreOK && emailOk && passwdOk && tlfOK) {
    CreateJson(nombre, correo, password, Telefono)
  }
}
function CreateJson(username, email, passwd, phone) {
  var FormSucessfull = {
    nombre: username.value,
    correo: email.value,
    contrasena: passwd.value,
    telefono: phone.value
  }
  // console.log(FormSucessfull);
  var send_Form=enviarFormulario(FormSucessfull);
  if (send_Form='usuario Registrado')
  {
    window.location="/login.html"
  } else{
    alert("No se pudo completar el registro")
  } 
}
function setErrorForm(input, message) {
  const formControl = input.parentElement;
  const smallError = document.querySelector('small');
  //smallError.innerText = message;
  alert(message);
  formControl.classList.add('input-contenedor');
  formControl.className = 'input-contenedor small';
}
function setSucessForm(input) {
  const formControl = input.parentElement;
  formControl.classList.add('input-contenedor');
  formControl.className = 'input-contenedor sucess';
}
async function enviarFormulario(data) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch('/datosNuevoUsuario', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // opcional
    cache: 'no-cache', // opcional
    credentials: 'same-origin', // opcional
    headers: {
      'Content-Type': 'application/json'
    },
    // Hacer redirect cuando el backend obtenga la respuesta redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
