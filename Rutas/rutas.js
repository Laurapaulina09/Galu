var express=require("express"),
path = require('path'),
router=express.Router()
router
    .get('/login', (req,res)=>{
        res.sendFile(path.join(__dirname, '../vistas/login.html'))
    })
    .get('/registro',(req,res)=>{
         res.sendFile(path.join(__dirname, '../vistas/registro.html'))
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


