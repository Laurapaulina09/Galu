var conectar = require("./conectdb")

function Conexion() {}

Conexion.almacenarUsuario = (datos, cb) => {
    conectar.query(`INSERT INTO usuarios VALUES ("${datos.name}","${datos.email}","${datos.pass}","${datos.phone}")`, function(err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}

Conexion.verificarUsuario = (datos, cb) => {
    var sql = `SELECT * FROM usuarios WHERE correo ="${datos.email}"  and contraseña="${datos.pass}"`;
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

module.exports = Conexion;