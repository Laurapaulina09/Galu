var informacion_pefil;
function info_perfil() {
    correo = location.pathname
    fetch('/verperfil/' + location.pathname.split("/").pop())
        .then(response => response.json())
        .then(response => {
            informacion_pefil = response

            document.getElementById("name").value = response.nombre
            document.getElementById("email").value = response.correo
            document.getElementById("password").value = response.contraseña
            document.getElementById("Telefono").value = response.telefono
            if (response.avatar == null) {
                document.getElementById('img_usuario').setAttribute('src', "/img/usuario.webp")
                document.getElementById('img_jr').setAttribute('src', "/img/usuario.webp")
            } else {
                document.getElementById('img_usuario').setAttribute('src', response.avatar)
                document.getElementById('img_jr').setAttribute('src', response.avatar)
            }
        })
}
function actualizarDatos() {
    var actualizar = `
    <div class="actualizar">
    <div class="cuadro">
    <div class="close" onclick="cerrar()">
                <i class="bi bi-x-circle-fill"></i>
            </div>
        <h3 class="text-center mt-3">Actualiza tus datos</h3>
    </section>
    <section class="shadow-sm">
        <form>
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre">
            </div>
            <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" disabled class="form-control" id="correo">
            </div>
            <div class="mb-3">
                <label for="contraseña" class="form-label">Contraseña</label>
                <input type="password"  class="form-control" id="contraseña">
            </div>
            <div class="mb-3">
                <label for="tel" class="form-label">Teléfono</label>
                <input type="number"  class="form-control" id="tel">
            </div>
            <div class="btn btn-primary" onclick="guardarCambios()">Guardar</div>
        </form>
    </section>
    </div>
</div>`


    document.getElementById("actualizar").innerHTML = actualizar
    document.getElementById("nombre").value = informacion_pefil.nombre
    document.getElementById("correo").value = informacion_pefil.correo
    document.getElementById("contraseña").value = informacion_pefil.contraseña
    document.getElementById("tel").value = informacion_pefil.telefono

}
function guardarCambios(){
    datos={
        correo:document.getElementById("correo").value,
        nombre:document.getElementById("nombre").value,
        contrasena:document.getElementById("contraseña").value,
        telefono:document.getElementById("tel").value
    }
    console.log(datos)
    axios.put('/editarPerfil', datos)
    .then(respuesta=>{
        console.log("Respuesta", respuesta)
        alert('Datos actualizados')
        location.reload()
    })

}
function cambioImagen(event) {
    var imagen = event.target.files[0];
    var formData = new FormData();
    formData.append("foto", imagen);
    enviar(formData).then(res=>{
        console.log(res)
    })
}
async function enviar(formData){
    let url = await new Promise((resolve, reject) => {
        axios.put('/subirFotoPerfil/'+informacion_pefil.correo, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => {
            resolve(res.data);
            location.reload()
        })
        .catch((err) => {
            console.log(err);
        });
    })
    return url
}
function cerrar(){
    document.getElementById("actualizar").innerHTML=''
}
info_perfil()