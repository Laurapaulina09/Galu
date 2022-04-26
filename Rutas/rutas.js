const req = require("express/lib/request")
const res = require("express/lib/response")
var conectar = require("../modelo/datosb")
var express = require("express"),
    path = require('path'),
    router = express.Router()
router
    .get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/login.html'))
    })
    .get('/registro', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/Registro.html'))
    })
    .get('/editar', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/editar.html'))
    })
    .get('/principal', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/principal.html'))
    })
    .post("/datosNuevoUsuario", (req, res) => {
        var datos = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            telefono: req.body.telefono,
            rol: '01Cliente'
        }
        conectar.almacenarUsuario(datos, () => {
            res.send('usuario Registrado')
        })


    })
    .post('/Iniciarsesion', (req, res) => {
        var datos = {
            email: req.body.correo,
            pass: req.body.contrasena
        }
        var respuesta;
        conectar.iniciarSession (datos, (usuario) => {
            if (usuario.length == 1) {
                respuesta = { mensaje: 'usuario si existe' ,
                nombre:usuario[0].nombre
             }
             console.log(respuesta)
                return res.send(respuesta);
            } else {
                console.log("No existe")
                respuesta = { mensaje: 'usuario no existe' }
                return res.send(respuesta)
            }
        })
    })

    //se esta intentado lo de luis que dijo que coloca el correo y sale el nombre y apellidos, 
    //esta funcion tiene un error 
    .get('/mostrar', (req, res) => {
        var datos = {
            email: req.body.correo
        }
        var respuesta;
        conectar.mostrarPerfil (datos, (usuario) => {
            if (usuario.length >= 1) {
                respuesta = { mensaje: 'usuario si existe' }
                return res.send(respuesta);
            } else {
                console.log("No existe")
                respuesta = { mensaje: 'usuario no existe' }
                return res.send(respuesta)
            }
        })
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

module.exports = router