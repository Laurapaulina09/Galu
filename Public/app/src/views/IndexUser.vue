<template>
  <div>
    <nav-bar :verHamburguesa="datos.rol=='profesional' ? 'false' : ''" :categoria="datos.rol=='profesional' ? 'false' : ''" :nosotros="datos.rol=='profesional' ? 'false' : ''" :perfil="datos.rol=='true' ? 'false' : ''" :nombreColaborador="datos.rol=='profesional' ? datos.nombre : ''"></nav-bar>
    <v-container>
      <perfil-usuario :data="datos"></perfil-usuario>
      <v-row v-if="datos.rol == 'profesional'">
        <v-col cols="12" sm="4">
          <div class="d-flex justify-center align-center grey lighten-4 pa-4 rounded-lg flex-wrap" style="position:relative">
            <div v-for="(d, i) in datos.experiencia" :key="i" class="ma-2" wid>
              <v-btn class="mx-2 pa-1" fab dark large color="primary">
                <img :src="d.icono">
              </v-btn>
              <p class="text-center">{{ d.nombre }}</p>
            </div>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="teal accent-4"
              style="position:absolute;top:6px;right: 0px;"
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="">
            <div class="rounded-lg grey lighten-4 pa-4" style="position:relative">
              <v-btn
              class="mx-2"
              fab
              dark
              small
              color="teal accent-4"
              style="position:absolute;top:6px;right: 0px;"
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
              <h3>Descripción</h3>
              <p class="ma-1">{{ datos.descripcion }}</p>
            </div>
            <br>
            <div class="rounded-lg grey lighten-4 pa-4" style="width:100%;position:relative">
              <v-btn
              class="mx-2"
              fab
              dark
              small
              color="teal accent-4"
              style="position:absolute;top:6px;right: 0px; z-index:1">
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
              <v-card v-for="(d, i) in datos.trabajosRealizados" :key="i" style="width:90%; margin:10px auto">
                <img :src="d.foto" width="100%" height="300px" style="object-fit:cover" alt="">
                <div class="pa-3">
                  {{ d.descripcion }}
                </div>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <cambio-profesional></cambio-profesional>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import PerfilUsuario from '@/components/PerfilUsuario.vue'
import CambioProfesional from '@/components/CambioProfesional.vue'
export default {
  name: 'IndexUser',
  components: {
    NavBar,
    PerfilUsuario,
    CambioProfesional
  },
  data() {
    return {
      datos: {
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
        nombre: 'Edwin Alexander Ibarra',
        email: 'ortizalexander2244@gmail.com',
        cedula: 43490561,
        contrasena: '1010Edwin',
        celular: 3127363552,
        telefonoFijo:5992200,
        rol: 'usuario',
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
      }
    }
  },
}
</script>
