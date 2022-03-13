const req = require("express/lib/request")

var express=require("express"),
path = require('path'),
router=express.Router()
router
    .get('/login', (req,res)=>{
        res.sendFile(path.join(__dirname, '../vistas/login.html'))
    })
    .get ('/registro',(req,res)=>{
        res.sendFile(path.join(__dirname,'../vistas/Registro.html'))
    })
    .post("/datosNuevoUsuario",()=>{
        
    } )


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


