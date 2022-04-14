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
            name: req.body.nombre,
            email: req.body.correo,
            pass: req.body.contrasena,
            phone: req.body.telefono
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
        conectar.verificarUsuario(datos, (usuario) => {
            if (usuario.length == 1) {
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