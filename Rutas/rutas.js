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
    .post("/datosNuevoUsuario", (req, res) => {
        var datos = {
            name: req.body.nombre,
            email: req.body.correo,
            pass: req.body.contrasena,
            phone: req.body.telefono
        }
        conectar.almacenarUsuario(dato,() => {
            res.send('usuario Registrado')
        }
        )


    })
    .post('/Iniciarsesion', (req, res) => {
        var datos = {
            email: req.body.correo,
            pass: req.body.contrasena
        }
        console.log(datos)
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


