<template lang="">
    <div>
        <nav-bar verHamburguesa="true" categoria="false" nosotros="false" perfil="false"></nav-bar>
        <v-container class="my-2" v-if="datos != null">
            <v-row>
                <v-col cols="12" sm="4">
                    <div class="d-flex justify-center align-center grey lighten-4 pa-4 rounded-lg" style="flex-direction:column">
                        <v-avatar size="200">
                            <img :src="'http://localhost:3000'+datos.avatar" width="200px" alt="">
                        </v-avatar>
                        <v-rating
                        :value="datos.puntaje"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="24"
                        ></v-rating>
                        <div class="grey--text ms-1">{{datos.puntaje}} ({{datos.numVotantes}})</div>
                    </div>
                </v-col>
                <v-col cols="12" sm="8">
                    <div class="grey lighten-4 pa-4 rounded-lg">
                        <h2 class="text-center">{{datos.nombre}}</h2>
                        <v-list class="my-1">
                            <v-list-item style="display:grid; grid-template-columns:50px 1fr 1px">
                                <v-img width="40px" src="https://cdn-icons-png.flaticon.com/512/174/174879.png"></v-img>
                                <div>{{datos.celular}}</div>
                            </v-list-item>
                            <br>
                            <v-list-item style="display:grid; grid-template-columns:50px 1fr 1px">
                                <v-img width="40px" src="https://colegiocardenalsancha.edu.co/web_2020/images/Telefono-Icono.fw.png"></v-img>
                                <div>{{datos.telefono}}</div>
                            </v-list-item>
                            <br>
                            <v-list-item style="display:grid; grid-template-columns:50px 1fr 1px">
                                <v-img width="40px" src="https://www.philippes.com/wp-content/uploads/2017/01/email-icon.png"></v-img>
                                <div>{{datos.correo}}</div>
                            </v-list-item>
                        </v-list>
                        <div>
                            
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col  cols="12" sm="4" class="">
                    <div class="d-flex justify-center align-center grey lighten-4 pa-4 rounded-lg " style="flex-direction:column">
                        <div v-for="(d, i) in datos.experiencia" :key="i" class="ma-2" wid>
                            <v-btn class="mx-2 pa-1" fab dark large color="primary" >
                                <img :src="'http://localhost:3000'+d.icono">
                            </v-btn>
                            <p class="text-center">{{d.nombre_categoria}}</p>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" sm="8" class="">
                    <div class="">
                        <div class="rounded-lg grey lighten-4 pa-4">
                            <h3>Descripción</h3>
                            <p class="ma-1">{{datos.descripcion}}</p>
                        </div>
                        <br>
                        <div class="rounded-lg grey lighten-4 pa-4" style="width:100%">
                            <v-card v-for="(d, i) in datos.trabajosRealizados" :key="i" style="width:90%; margin:10px auto">
                                <img :src="'http://localhost:3000'+d.foto" width="100%" height="300px" style="object-fit:cover" alt="">
                                <div class="pa-3">
                                    {{d.descripcion}}
                                </div>
                            </v-card>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <div class="text-center">
    <v-btn v-if="vistaBtn" color="blue" dark @click="sheet = !sheet">
      Calificar al profesional
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <div class="py-3">
            <h3>CALIFICA MI TRABAJO</h3>
          <v-rating
            v-model="rating"
            background-color="indigo lighten-3"
            color="light-blue lighten-2"
            size="50"
            ></v-rating>
            <div class="my-1">
                <v-btn color="primary" @click="agregarCalificacion">
                    Guardar
                </v-btn>
            </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
export default {
    name: 'vistaColaboradorCliente',
    components: {
        NavBar
    },
    data() {
        return {
            vistaBtn: this.$route.params.profesional != localStorage.getItem('usuario'),
            rating: 0,
            sheet: false,
            datos: null/*{
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
                nombre: 'Edwin Alexander Ibarra Ortiz',
                email: 'ortizalexander2244@gmail.com',
                puntaje: 3.5,
                numVotantes: 20,
                celular: '3127362625',
                telefono: '4992200',
                descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque praesentium omnis quis pariatur exercitationem explicabo, expedita dignissimos nemo, porro iusto voluptate voluptatum dolore, ipsam voluptates provident aliquam ea fugit placeat!',
                experiencia: [
                    {
                        nombre: 'Pintor',
                        icono: 'http://localhost:3000/img/icono_pintor_thumb.svg'
                    },
                    {
                        nombre: 'Pintor',
                        icono: 'http://localhost:3000/img/icono_pintor_thumb.svg'
                    }
                ],
                trabajosRealizados: [
                    {
                        foto: 'https://i.pinimg.com/550x/af/11/3f/af113f436fb5c666454e58bdeeec0361.jpg',
                        descripcion: 'Fachada de vivienda ubicada en las afueras de la ciudad de Medellín'
                    }
                ]
            }*/
        }
    },
    methods: {
        buscarUsuario() {
            fetch('http://localhost:3000/verPerfil/' + this.$route.params.profesional)
                .then(dat => dat.json())
                .then(dat => this.datos = dat)
        },
        agregarCalificacion(){
            let datosCalificacion = {
                puntos: this.rating,
                comentario: '',
                cc_cliente: localStorage.getItem('usuario'),
                cc_profesional: this.$route.params.profesional
            }
            fetch('http://localhost:3000/calificar', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosCalificacion)
            })
            .then(()=> this.buscarUsuario())
        }
    },
    created() {
        this.buscarUsuario()
    },
}
</script>
<style lang="">
    
</style>