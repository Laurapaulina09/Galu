var form = document.getElementById('RegistroForm');
button = document.getElementById('RegButtom');
nombre = document.getElementById('Regnombre');
correo = document.getElementById('RegCorreo');
password = document.getElementById('RegPassword');
Telefono = document.getElementById('RegTlf');
Error_element = document.getElementById('Error');

function validateEmail(email) {
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  if (emailRegex.test(email.value)) {
    alert("Email correcto");
  } else {
    alert("Introduzca un email válido");
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
}
);
function validateName(name) {
  if (name.value.lenght <= 2) {
    return false;
  }
  return true;
}
function validatePassword(passwd) {
  if (passwd.lenght < 7) {
    return false;
  }
  return true;
}
function validateTlf(phone) {
  var phone_ok = false;
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
  const username = nombre.value.trim();
  const email = correo.value.trim();
  const passwd = password.value.trim();
  const tlf = Telefono.value.trim();
  let NombreOK = validateName(nombre);
  let emailOk = validateEmail(correo);
  let passwdOk = validatePassword(password);
  let tlfOK = validateTlf(tlf);
  if (!NombreOK) {
    setErrorForm(nombre, "Nombre requerido")
  } else {
    setSucessForm(nombre);
  }
  if (!emailOk) {
    setErrorForm(correo, "Introduzca un email válido")
  } else {
    setSucessForm(correo)
  }
  if (!passwdOk) {
    setErrorForm(password, "Introduzca una contraseña con 6 o más carácteres")
  } else {
    setSucessForm(password)
  }
  if (!tlfOK) {
    setErrorForm(Telefono, "un número de teléfono válido")
  } else {
    setSucessForm(Telefono)
  }
  if (NombreOK && emailOk && passwdOk && tlfOK) {
    alert("Registro Completado");
  }
}
//var form = document.getElementById('RegistroForm');
//button=document.getElementById('RegButtom');
//nombre=document.getElementById('Regnombre');
//correo=document.getElementById('RegCorreo');
//password=document.getElementById('RegPassword');
//Telefono=document.getElementById('RegTlf');
//Error_element=document.getElementById('Error');
function setErrorForm(input, message) {
  const formControl = input.parentElement;
  const smallError = document.querySelector('small');
  smallError.innerText = message;
  formControl.classList.add('input-contenedor');
  formControl.className='input-contenedor small';
}
function setSucessForm(input) {
  const formControl = input.parentElement;
  formControl.classList.add('input-contenedor');
   formControl.className='input-contenedor sucess';
   input.value="";
   var FormSucessfull={name:nombre.value,email:correo.value,telefono:Telefono,contraseña:password.value}
}
async function enviarFormulario(data ) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch('/iniciarSesion', {
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

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });