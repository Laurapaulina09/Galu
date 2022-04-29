var informacion_pefil;
function info_perfil(){
    correo = location.pathname
    fetch('/verperfil/' + location.pathname.split("/").pop())
        .then(response => response.json())
        .then(response => {
            informacion_pefil=response

            document.getElementById("name").value = response.nombre
            document.getElementById("email").value = response.correo
            document.getElementById("password").value = response.contrasena
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
function actualizarDatos(){
   var actualizar=`
    <div class="actualizar">
    <div class="cuadro">
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
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    </section>
    </div>
</div>`


document.getElementById("actualizar").innerHTML=actualizar
document.getElementById("nombre").value = informacion_pefil.nombre
document.getElementById("correo").value = informacion_pefil.correo
document.getElementById("contraseña").value = informacion_pefil.contrasena
document.getElementById("tel").value = informacion_pefil.telefono

}

info_perfil()



