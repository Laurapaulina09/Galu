const req = require("express/lib/request");
const res = require("express/lib/response");
var conectar = require("../modelo/datosb");
const fse = require('fs-extra');

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
.post('/subirFotoPerfil/:correo',(req,res)=>{

       fecha=Date.new();
       ruta_img='Public/img/uploads'+fecha+'.jpeg'
     datos={
        ruta:ruta_img,
        correo:req.params.correo
    }
        fse.move(req.file.path, ruta_img, (err)=>{
            if(err){
                console.log(err)
            }else{
                conectar.almacenarImagenUsuario(datos, function(imagen){
                    res.send('Se ha subido la foto!')
                })
            }
        })
    }
  )  

.put('/editarPerfil',(req,res)=>{
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
                nombre:usuario[0].nombre,
                correo:usuario[0].correo,
                contrasena:usuario[0].contraseña,
                telefono:usuario[0].telefono
            }
            console.log('el usuario:'+usuario[0].correo+'Ha sido editado')
            return res.send(respuesta);
        } else {
            console.log("No Se ha podido modificar el perfil")
            respuesta = {mensaje: 'No Se ha podido modificar el perfil' }
            return res.send(respuesta)
        }
    })
});

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