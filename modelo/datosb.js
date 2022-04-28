var conectar = require("./conectdb")

function Conexion() {}
Conexion.almacenarUsuario = (datos, cb) => {
    conectar.query(`INSERT INTO usuarios VALUES ("${datos.nombre}","${datos.correo}","${datos.contrasena}","${datos.telefono}","${datos.avatar}","${datos.rol}")`, function(err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.iniciarSession = (datos, cb) => {
    var sql = `SELECT * FROM usuarios WHERE correo ="${datos.correo}"  and contraseña="${datos.contrasena}"`;
    conectar.query(sql, function(err, res) {
        if (err) {
            console.log("ALERTA ERROR EN VERIFICAR USUARIO")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })

}

//se esta intentado lo de luis que dijo que coloca el correo y sale el nombre y apellidos
//esta funcion tiene un error
Conexion.mostrarPerfil = (datos, cb) => {
    var sql = `SELECT * FROM usuarios WHERE correo ="${datos.correo}"`;
    conectar.query(sql, function(err, res) {
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

module.exports = Conexion;