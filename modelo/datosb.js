var conectar = require("./conectdb")

function Conexion() { }
Conexion.almacenarUsuario = (datos, cb) => {
    console.log(datos)
    let sql = `INSERT INTO usuarios VALUES (
        ${datos.cedula},"${datos.nombre}","${datos.correo}",
        "${datos.contrasena}","${datos.telefono}","${datos.celular}",
        "${datos.avatar}","${datos.descripcion}",  "${datos.rol}")`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.iniciarSession = (datos, cb) => {
    let sql = `SELECT cedula FROM usuarios WHERE correo ="${datos.correo}"  and contraseña="${datos.contrasena}"`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ALERTA ERROR EN VERIFICAR USUARIO")
            console.log(err);
            throw err;
        } else {
            console.log(res)
            cb(res)
        }
    })

}

Conexion.mostrarPerfil = (datos, cb) => {
    let sql = `SELECT a.*, b.rol FROM usuarios a inner join rol b on a.rol_idrol=b.idrol WHERE cedula  =${datos.cedula}`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("CORREO NO ENCONTRADO")
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}
//Preguntarle a Edwin
Conexion.mostrarPerfilTrabajador = (datos, cb) => {
    let sql = `SELECT * FROM usuarios left join  experiencia
    ON usuarios.cedula=experiencia.usuarios_cedula
    left join categorias
    on experiencia.idexperiencia=categorias.experiencia_idexperiencia;
    left join trab_realizado
    on trab_realizado.usuarios_cedula=usuarios.cedula`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("CORREO NO ENCONTRADO")
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}
/*
SELECT * 
    FROM experiencia  
    inner join Categorias
    on experiencia.Categorias_idCategorias=categorias.idCategorias
    Where usuarios_cedula=${datos.cedula}
*/
Conexion.getExperiencia = (datos, cb) => {
    let sql = `SELECT * 
    FROM experiencia  
    inner join Categorias
    on experiencia.Categorias_idCategorias=categorias.idCategorias
    Where usuarios_cedula=${datos.cedula}`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("No hay coincidencias")
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}
Conexion.editarPerfil = (datos, cb) => {
    let sql = `UPDATE usuarios
    SET nombre="${datos.nombre}", 
    correo= "${datos.correo}",
    contraseña= "${datos.contrasena}",
    telefono= "${datos.telefono}",
    celular= "${datos.celular}"
    WHERE cedula ="${datos.cedula}"`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("Error al actualizar");
            console.log(err);
            throw err;
        } else {
            cb(res);
        }
    })
}
Conexion.editarRolUsuario = (datos, cb) => {
    let sql = `UPDATE usuarios
    SET rol_idrol=${datos.rol}
    WHERE cedula =${datos.cedula}`;
    console.log("SQL")
    console.log(sql)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("Error al actualizar");
            console.log(err);
            throw err;
        } else {
            cb(res);
        }
    })
}
Conexion.agregarExperiencia = (datosPosturlarse, cb) => {
    let sql = `INSERT INTO experiencia(usuarios_cedula,Categorias_idCategorias) VALUES (
        "${datosPosturlarse.cedula}","${datosPosturlarse.categoria}" )`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.getCategorias = (cb) => {
    let sql = `SELECT idCategorias,nombre_categoria,icono
    FROM categorias`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })
}
Conexion.eliminarCategoria = (cedula, cb)=>{
    conectar.query(`delete from experiencia where usuarios_cedula=${cedula}`, (err, respuesta)=>{
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            cb(respuesta)
        }
    })
}
Conexion.guardarDescripcion = (datos, cb)=>{
    conectar.query(`update usuarios set descripcion="${datos.descripcion}" where cedula=${datos.usuario}`, (err, respuesta)=>{
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            console.log('respuesta')
            cb(respuesta)
        }
    })
}
Conexion.getCategoriasParaTrabajador = (datos, cb) => {
    let sql = `SELECT idCategorias,nombre_categoria,icono
    FROM experiencia
    inner join categoria
    on experiencia.Categoria_idCategorias=categorias.idCategorias
    Where usuarios_cedula=${datos.cedula}`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })

}

Conexion.VerPerfilTrabajador = (datos, cb) => {
    let sql = `SELECT idCategorias,nombre_categoria,icono
    FROM categorias INNER JOIN experiencia
    on experiencia_idexperiencia=categorias.idexperiencia  
    WHERE cedula =${datos.cedula}`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })

}

Conexion.getTrabajoRealizado = (datos, cb) => {
    let sql = `SELECT idtrab_realizado,foto,descripcion
    WHERE cedula =${datos.cedula}`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })
}
Conexion.addTrabajoRealizado = (datos, cb) => {
    let sql = `INSERT descripcion
    WHERE usuarios_cedula =${datos.cedula}`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ALERTA OCURRIÓ UN ERROR BUSCANDO LAS CATEGORIAS")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })
}
Conexion.almacenarImagenUsuario = (datos, cb) => {
    var sql = `UPDATE usuarios SET avatar="${datos.avatar}" WHERE cedula ="${datos.cedula}"`;
    console.log(sql)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("Error al subir foto de perfil")
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}

Conexion.almacenarImagenTrabajoR = (datos, cb) => {
    var sql = `INSERT INTO trab_realizado(foto,descripcion,usuarios_cedula) 
    VALUES ("${datos.foto}","${datos.comentario}",${datos.cedula})`;
    console.log(sql)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("Error al subir foto de del trabajo realizado")
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}

Conexion.getTrabajosRealizados = (datos, cb) => {
    var sql = `SELECT idtrab_realizado,foto,descripcion 
    FROM trab_realizado  
    WHERE usuarios_cedula =${datos.cedula}`;
    console.log(sql)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("Error al subir foto de del trabajo realizado")
            console.log(err);
            throw err;
        } else {
            console.log(res);
            cb(res)
        }
    })
}

Conexion.almacenarTrabRealizado = (datos, cb) => {
    let sql = `UPDATE trab_realizado
    SET descripcion="${datos.descripcion}"
    WHERE usuarios_cedula=${datos.cedula}`;
    console.log(sql)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}
/*/ 
          puntos: req.body.puntos,
            comentario: req.body.comentario,
            cc_cliente: req.body.cc_cliente,
            cc_profesional:req.body.cc_profesional
*/
Conexion.almacenarCalificacion = (datos, cb) => {
    let sql = `INSERT INTO calificacion (puntos,comentario,cc_cliente,cc_profesional) 
    VALUES (
    ${datos.puntos},"${datos.comentario}",
    ${datos.cc_cliente},${datos.cc_profesional})`;
    console.log(sql)
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}
module.exports = Conexion;