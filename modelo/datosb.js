var conectar = require ("./conectdb")
//funcion anonima 
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

Conexion.verificarUsuario = (datos,cb) => {
//conectar.query(`SELECT * from usuarios WHERE correo = "${datos.email}" and contraseña = "${datos.pass}"` , function(err, res){
    var sql=`SELECT * FROM usuarios WHERE correo ="${datos.email}"  and contraseña="${datos.pass}"`;
    conectar.query(sql,function(err,res){
    if(err){
        console.log("ALERTA ERROR EN VERIFICAR USUARIO")
        console.log(err);
        throw err;
    }
    else{
     
            cb(res)
           
        
    }
})

}

module.exports = Conexion;
