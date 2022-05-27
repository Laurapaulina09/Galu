//llamar paquetes
const express=require("express"),
    cors = require('cors'),
    rutas = require('./Rutas/rutas.js'),
    app=express(),
    puerto=3000
    
app.use(cors())
//Se pone al descubierto la carpeta publica
app.use(express.static(__dirname+'/Public'))

app.use(express.json())
//app.use(bodyParser.json())

//Express usa las rutas creadas en el archivo rutas.js
app.use(rutas)

//Reload para refrescar cambios
app.listen(puerto,()=>{
    console.log("Servidor inicializado")
    })




