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
    /*
    .get('/editar', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/editar.html'))
    })
    .get('/perfil/:correo', (req, res) => {
        res.sendFile(path.join(__dirname, '../vistas/perfil.html'))
    })*/
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
                    mensaje: 'usuario si existe',
                    usuario: usuario[0].cedula
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
    .post('/guardarDescripcion/:cedula', (req,res)=>{
        conectar.guardarDescripcion({usuario: req.params.cedula, descripcion:req.body.descripcion}, ()=>{
            res.send('Edicion almacenada')
        })
    })
    .get('/verPerfil/:cedula', (req, res) => {
        let datos = {
            cedula: req.params.cedula
        }
        let respuesta = null;
        conectar.mostrarPerfil(datos, (usuario) => {
            respuesta = usuario[0];
            if (respuesta.rol_idrol == 3) {
                conectar.getExperiencia(datos, (trabajador) => {
                    respuesta.experiencia = trabajador;
                    conectar.getTrabajosRealizados(datos, (trab)=>{
                        respuesta.trabajosRealizados=trab
                        return res.send(respuesta)
                    })
                })
            }
            else {
                return res.send(respuesta);
            }
        })
    })

    .post('/postularse', (req, res) => {
        let datosPosturlarse = {
            cedula: req.body.cedula,
            rol: '3'
        }
        console.log(req.body)
        let respuesta;
        conectar.editarRolUsuario(datosPosturlarse, (usuario) => {
            let DatosExperiencia = req.body.experiencia

            for (let i = 0; i < DatosExperiencia.length; i++) {

                conectar.agregarExperiencia({ categoria: DatosExperiencia[i], cedula: datosPosturlarse.cedula }, (usuario) => {
                    if (i == DatosExperiencia.length - 1) {
                        res.send('Experiencia añadida y Postulacion completada')
                    }
                })
            }
        });
    })
    // Entra al else directamente, pero si realiza la operacion editar
    .put('/editarPerfil', (req, res) => {
        console.log("wwd", req.body)
        let datos = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contraseña,
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
        datos = {
            avatar: `\\\\img\\\\uploads\\\\${req.file.filename}`,
            cedula: req.params.cedula
        }
        conectar.almacenarImagenUsuario(datos, (respuesta) => {
            res.status(200).json({
                respuestaDb: respuesta,
                rutaImagen: datos.avatar
            })
        })
    })


    //Peticiones del documento que me envio laura.

    .post('/agregarExperiencia', (req, res) => {
        console.log(req.body)
        let respuesta;
        conectar.eliminarCategoria(req.body.cedula, () => {
            let DatosExperiencia = req.body.experiencia
            for (let i = 0; i < DatosExperiencia.length; i++) {
                conectar.agregarExperiencia({ categoria: DatosExperiencia[i], cedula: req.body.cedula }, () => {
                    if (i == DatosExperiencia.length - 1) {
                        res.send('Experiencia añadida')
                    }
                })
            }
        });
    })
    .get('/categoria', (req, res) => {
        conectar.getCategorias(datos, (categoria) => {
            return res.send(categoria);
        })
    })
    .put('/subirTrabajoRealizado/:cedula', multer.single('foto'), (req, res) => {
        datos = {
            foto: `\\\\img\\\\uploads\\\\${req.file.filename}`,
            comentario:req.body.comentario,
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
    /*
    .post('/agregarTrabajo/:cedula', (req, res) => {
        let datos = {
            cedula: req.params.cedula,
            descripcion: req.body.descripcion
        }
        conectar.almacenarTrabRealizado(datos, (trabajo) => {
            res.send('Trabajo agregada')
        })
    })*/

    .post('/calificar', (req, res) => {
        let datos = {
            puntos: req.body.puntos,
            comentario: req.body.comentario,
            cc_cliente: req.body.cc_cliente,
            cc_profesional: req.body.cc_profesional
        }
        conectar.almacenarCalificacion(datos, (calificacion) => {
            res.send('Calificacion agregada')
        })
    })
    .get('/listCategorias', (req, res) => {
        conectar.getCategorias(respuesta => res.status(200).send(respuesta))
    })

//Falta encryptar contraseña con bcrypt
module.exports = router