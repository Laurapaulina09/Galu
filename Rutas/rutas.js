const req = require("express/lib/request");
const res = require("express/lib/response");
var conectar = require("../modelo/datosb");
const fs = require('fs');
const multer = require('../manejoImagen')

var express = require("express"),
    path = require('path'),
    router = express.Router()

router
    //.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname, '../vistas/login.html'))

    //.get('/registro', (req, res) => {
    // res.sendFile(path.join(__dirname, '../vistas/Registro.html'))

    .get('/editar', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/editar.html'))
    })
    .get('/perfil/:correo', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/perfil.html'))
    })
    .post("/datosNuevoUsuario", (req, res) => {
        var datos = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            telefono: req.body.telefono,
            avatar: '/img/usuario.webp',
            rol: '01Cliente'
        }
        conectar.almacenarUsuario(datos, () => {
            res.send('usuario Registrado')
        })


    })
    .post('/Iniciarsesion', (req, res) => {
        var datos = {
            correo: req.body.correo,
            contrasena: req.body.contrasena
        }
        var respuesta;
        conectar.iniciarSession(datos, (usuario) => {
            if (usuario.length >= 1) {
                respuesta = {
                    mensaje: 'usuario si existe'
                }
                console.log('Existe')
                return res.send(respuesta);
            } else {
                console.log("No existe")
                respuesta = { mensaje: 'usuario no existe' }
                return res.send(respuesta)
            }
        })
    })
    .get('/verPerfil/:correo', (req, res) => {
        var datos = {
            correo: req.params.correo
        }
        var respuesta;
        conectar.mostrarPerfil(datos, (usuario) => {
            if (usuario.length >= 1) {
                respuesta = usuario[0]
                return res.send(respuesta);
            } else {
                console.log("El usuario no existe")
                respuesta = { mensaje: 'El usuario no existe' }
                return res.send(respuesta)
            }
        })
    })

    .put('/editarPerfil', (req, res) => {
        console.log("wwd", req.body)
        var datos = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            telefono: req.body.telefono,
        }
        var respuesta;
        conectar.editarPerfil(datos, (usuario) => {
            if (usuario.length >= 1) {
                respuesta = {
                    mensaje: 'usuario editado',
                    nombre: usuario[0].nombre,
                    correo: usuario[0].correo,
                    contrasena: usuario[0].contraseña,
                    telefono: usuario[0].telefono
                }
                console.log('el usuario:' + usuario[0].correo + 'Ha sido editado')
                return res.send(respuesta);
            } else {
                console.log("No Se ha podido modificar el perfil")
                respuesta = { mensaje: 'No Se ha podido modificar el perfil' }
                return res.send(respuesta)
            }
        })
    })

    
    .put('/subirFotoPerfil/:correo', multer.single('foto'), (req, res) => {
        console.log('entro')
        datos={
            avatar:`\\\\img\\\\uploads\\\\${req.file.filename}`,
            correo:req.params.correo
        }
        console.log(datos)
        conectar.almacenarImagenUsuario(datos,(respuesta)=>{
            res.status(200).json({
                respuestaDb:respuesta,
                rutaImagen:datos.avatar
            })
        })
        /*console.log('efescec')
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let imgPath = files.foto.path
            let imgName = files.foto.name
            // Leer archivos de forma sincrónica
            console.log(imgPath)
            console.log(imgName)
            let data = fs.readFileSync(imgPath)
            // Almacene la imagen cargada, obtenga la dirección de la imagen estática al mismo tiempo y devuélvala al cliente
            fs.writeFile("Public/img/uploads" + imgName, data, function (err) {
                if (err) {
                    console.log(err)
                    return;
                }
                let itemUrl = {
                    "path": "static/" + imgName
                };
                let url = "static/" + imgName;
                res.send(url);
            })
        })*/
    })
//No borrar
/*
    .post('/no', (req,res)=>{
        var cuerpo = ''
        req.on('data', data=>{
            cuerpo = JSON.parse(data.toString())
            console.log(cuerpo.nombre)
        })
        res.send('Ok')
    })
*/
/*
fetch('/verperfil/laura.norenaco@gmail.com')
.then(response=> response.json())
.then(response=> console.log(response))

*/

module.exports = router