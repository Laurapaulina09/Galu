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
        let datos = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            telefono: req.body.telefono,
            celular: req.body.celular,
            avatar: '/img/usuario.webp',
            descripcion: '',
            rol: '2'
        }
        conectar.almacenarUsuario(datos, () => {
            res.send('usuario Registrado')
        })


    })
    .post('/Iniciarsesion', (req, res) => {
        let datos = {
            correo: req.body.correo,
            contrasena: req.body.contrasena
        }
        let respuesta;
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
    .get('/verPerfil/:cedula', (req, res) => {
        let datos = {
            cedula: req.params.cedula
        }
        let respuesta={
         perfilbasico:null,
         experiencia: null,
        };
        conectar.mostrarPerfil(datos, (usuario) => {
            respuesta.perfilbasico = usuario[0];           
            if (respuesta.perfilbasico.rol_idrol == 3) {   
                conectar.getExperiencia(datos, (trabajador) => {
                    console.log("DATOS",datos)
                    respuesta.experiencia = trabajador;
                    return res.send(respuesta)            
                })
            }
            else{
                return res.send(respuesta);
            }  
        })
    })

    .post('/Postularse', (req, res) => {
        let datosPosturlarse = {
            cedula: req.body.cedula,
            rol: '3'
        }
        let respuesta;
        conectar.editarRolUsuario(datosPosturlarse, (usuario) => {
            let DatosExperiencia =req.body.experiencia

            for (let i = 0; i < DatosExperiencia.length; i++) {
                
                conectar.agregarExperiencia({categoria:DatosExperiencia[i],cedula:datosPosturlarse.cedula}, (usuario) => {
                    if (i == DatosExperiencia.length-1) {
                        res.send('Experiencia añadida y Postulacion completada')
                    }
                })
            }
            //Datos recibidos cedula y idCategoria como Json

        });


    })
    // Entra al else directamente, pero si realiza la operacion editar
    .put('/editarPerfil', (req, res) => {
        console.log("wwd", req.body)
        let datos = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            telefono: req.body.telefono,
            celular: req.body.celular,
            cedula: req.body.cedula
        }
        let respuesta;
        conectar.editarPerfil(datos, (usuario) => {
            return res.send(respuesta);

        })
    })
    .put('/subirFotoPerfil/:cedula', multer.single('foto'), (req, res) => {
        console.log('entro')
        datos = {
            avatar: `\\\\img\\\\uploads\\\\${req.file.filename}`,
            cedula: req.params.cedula
        }
        console.log(datos)
        conectar.almacenarImagenUsuario(datos, (respuesta) => {
            res.status(200).json({
                respuestaDb: respuesta,
                rutaImagen: datos.avatar
            })
        })
    })


    //Peticiones del documento que me envio laura.

    .post('/agregarExperiencia', (req, res) => {
        let datos = {
            categoria: req.body.id_categoria,
            cedula: req.body.cedula
        }
        conectar.agregarExperiencia(datos, (usuario) => {
            res.send('Experiencia agregada')
        })
    })
    .get('/categoria', (req, res) => {
        conectar.getCategorias(datos, (categoria) => {
            return res.send(categoria);
        })

    })
    .put('/subirTrabajoRealizado/:cedula', multer.single('foto'), (req, res) => {
        console.log('entro')
        datos = {
            foto: `\\\\img\\\\uploads\\\\${req.file.filename}`,
            cedula: req.params.cedula
        }
        console.log(datos)
        conectar.almacenarImagenTrabajoR(datos, (respuesta) => {
            res.status(200).json({
                respuestaDb: respuesta,
                rutaImagen: datos.foto
            })
        })
    })

    .get('/trabajosRealizados/:cedula', (req, res) => {
        conectar.getTrabajosRealizados(datos, (trabajos) => {
            return res.send(trabajos);
        })
    })

    .post('/agregarTrabajo/:cedula', (req, res) => {
        let datos = {
            cedula: req.params.cedula,
            descripcion: req.body.descripcion
        }
        conectar.almacenarTrabRealizado(datos, (trabajo) => {
            res.send('Trabajo agregada')
        })
    })

    .post('/calificar', (req, res) => {
        let datos = {
            puntos: req.body.puntos,
            comentario: req.body.comentario,
            cc_cliente: req.body.cc_cliente,
            cc_profesional:req.body.cc_profesional
        }
        conectar.almacenarCalificacion(datos, (calificacion) => {
            res.send('Calificacion agregada')
        })
    })

    /*

    */
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
//Falta encryptar contraseña con bcrypt
module.exports = router