<template lang="">
    <div>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <div class="img_login"><img width="170px" src="http://localhost:3000/GalúAzul.png" alt=""></div>

        <div id="form" class="formulario">

            <h1>Iniciar sesión</h1>
            <div class="contenedor">

                <div class="input-contenedor-one">
                    <div>
                        <v-icon>
                            mdi-at
                        </v-icon>
                    </div>

                    <input type="email" v-model="datos.correo" id="email" autocomplete="off" placeholder="Correo electrónico">

                </div>
                <div id="alerta"></div>
                <div class="input-contenedor-one">
                    <div>
                        <v-icon>
                            mdi-lock
                        </v-icon>
                    </div>
                    <input type="password" v-model="datos.contrasena" id="password" autocomplete="off" placeholder="Contraseña">

                </div>
                <input type="submit" value="Iniciar sesión" class="button" @click="envioInfo">
                <p>¿No tienes una cuenta? <a class="link" href="http://localhost:3000/Registro.html">Regístrate </a></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'InicioSesion',
    data() {
        return {
            datos: {
                correo: '',
                contrasena: ''
            }
        }
    },
    methods: {
        envioInfo() {
            fetch('http://localhost:3000/Iniciarsesion', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(this.datos) // body data type must match "Content-Type" header
            })
            .then(response=> response.json())
            .then(response=> {
                    console.log(response)
                if(response.usuario){
                    localStorage.setItem('usuario',response.usuario)
                    location.href='/#/'
                }else{
                    alert('Usuario no existe en nuestra base de datos')
                }
            })

        }
    },
}
</script>
<style scoped>
.bg {
    animation: slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, rgb(238, 235, 235) 50%, rgb(199, 228, 248) 50%);
    bottom: 0;
    left: -50%;
    opacity: .5;
    position: fixed;
    right: -50%;
    top: 0;
    z-index: -1;
}

.bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 10s;
}

.bg3 {
    animation-duration: 10s;
}

@keyframes slide {
    0% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(25%);
    }
}

* {
    box-sizing: border-box;
}

.contenedor {
    width: 100%;
    padding: 15px;
}

.formulario {
    background: #fff;
    margin-top: 50px;
    padding: 3px;
}

h1 {
    text-align: center;
    color: #1a2537;
    font-size: 40px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
    font-size: 20px;
    width: 82%;
    padding: 10px;
    border: none;
}

.input-contenedor {
    margin-bottom: 15px;
    border: 1px solid #aaa;
}

.input-contenedor small {
    visibility: hidden;
    position: absolute;
    bottom: 0;
    left: 0
}

.input-contenedor sucess {
    visibility: hidden;
    position: absolute;
    bottom: 0;
    left: 0
}

.input-contenedor-one sucess {
    visibility: hidden;
    position: absolute;
    bottom: 0;
    left: 0
}

.input-contenedor-one {
    display: grid;
    grid-template-columns: 50px 1fr;
    margin-bottom: 15px;
    border: 1px solid #aaa;
}

.input-contenedor-one input {
    width: 100%
}

.input-contenedor-one>div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-contenedor-one small {
    visibility: hidden;
    position: absolute;
    bottom: 0;
    left: 0
}

.icon {
    min-width: 50px;
    text-align: center;
    color: #999;
}

.button {
    border: none;
    width: 100%;
    color: white;
    font-size: 20px;
    background: #1a2537;
    padding: 15px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.button:hover {
    background: cadetblue;
}

p {
    text-align: center;
}

.link {
    text-decoration: none;
    color: #1a2537;
    font-weight: 600;
}

.link:hover {
    color: cadetblue;
}

@media(min-width:768px) {
    .formulario {
        margin: auto;
        width: 500px;
        margin-top: 50px;
        border-radius: 2%;
    }
}

.img_login {
    text-align: center;
    margin-top: 20px;
}
</style>