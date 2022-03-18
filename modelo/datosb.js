var conectar = require ("./conectdb")
function Conexion (){
}

Conexion.almacenarUsuario= (datos,cb) => {
    conectar.query(`INSERT INTO usuarios VALUES ("${datos.name}","${datos.email}","${datos.pass}","${datos.phone}")`, function(err, res){
        if(err)
        {
            console.log(err)
        }
        else{
            cb()

        }
    })
}

module.exports = Conexion;
