<template>
  <div v-if="datos != null">
    <nav-bar :verHamburguesa="datos.rol == 'profesional' ? 'false' : ''"
      :categoria="datos.rol == 'profesional' ? 'false' : ''" :nosotros="datos.rol == 'profesional' ? 'false' : ''"
      :perfil="datos.rol == 'true' ? 'false' : ''" :nombreColaborador="datos.rol == 'profesional' ? datos.nombre : ''">
    </nav-bar>
    <v-container>
      <perfil-usuario :data="datos"></perfil-usuario>
      <v-row v-if="datos.rol == 'profesional'">
        <v-col cols="12" sm="4">
          <div class="d-flex justify-center align-center grey lighten-4 pa-4 rounded-lg flex-wrap"
            style="position:relative">
            <div v-for="(d, i) in datos.experiencia" :key="i" class="ma-2" wid>
              <v-btn class="mx-2 pa-1" fab dark large color="primary">
                <img :src="'http://localhost:3000'+d.icono">
              </v-btn>
              <p class="text-center">{{ d.nombre_categoria }}</p>
            </div>
            <v-btn class="mx-2" fab dark small color="teal accent-4" style="position:absolute;top:6px;right: 0px;"
              @click="editarCategoria = true">
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="">
            <div class="rounded-lg grey lighten-4 pa-4" style="position:relative">
              <v-btn class="mx-2" fab dark small color="teal accent-4" style="position:absolute;top:6px;right: 0px;"
                @click="dialog = true">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <h3>Descripción</h3>
              <p class="ma-1">{{ datos.descripcion }}</p>
            </div>
            <br>
            <div class="rounded-lg grey lighten-4 pa-4" style="width:100%;position:relative">
              <v-btn class="mx-2" fab dark small color="teal accent-4"
                style="position:absolute;top:6px;right: 0px; z-index:1" @click="agregarFotoTrabajo=true"> 
                <v-icon dark>
                  mdi-file-upload
                </v-icon>
              </v-btn>
              <v-card v-for="(d, i) in datos.trabajosRealizados" :key="i" style="width:90%; margin:10px auto">
                <img :src="'http://localhost:3000'+d.foto" width="100%" height="300px" style="object-fit:cover" alt="">
                <div class="pa-3">
                  {{ d.descripcion }}
                </div>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>




<!-- Cambio descripcion -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Descripción
          </v-card-title>

          <v-col cols="12">
            <v-textarea name="input-7-1" label="Descripcion" v-model="datos.descripcion" hint="Editar"></v-textarea>
          </v-col>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="guardarDescripcion">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    
<!-- Cambio a profesional -->
    <cambio-profesional v-if="viewCambioProfesional">
      <template slot="cerrar">
        <v-btn small color="error" fab style="position: absolute;top: 6px;right: 0px;"
          @click="viewCambioProfesional = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </cambio-profesional>


<!-- Editar categorias -->
    <edit-categoria v-if="editarCategoria" :categoriaSelect="datos.experiencia">
      <template slot="cerrar">
        <v-btn small color="error" fab style="position: absolute;top: 6px;right: 0px;" @click="editarCategoria = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </edit-categoria>

    <agregar-foto v-if="agregarFotoTrabajo">
      <template slot="cerrar">
        <v-btn small color="error" fab style="position: absolute;top: 6px;right: 6px;" @click="agregarFotoTrabajo = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </agregar-foto>

  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import PerfilUsuario from '@/components/PerfilUsuario.vue'
import CambioProfesional from '@/components/CambioProfesional.vue'
import EditCategoria from '@/components/EditCategoria.vue'
import AgregarFoto from '@/components/AgregarFoto.vue'
import emmit from '../services/emmit'
export default {
  name: 'IndexUser',
  components: {
    NavBar,
    PerfilUsuario,
    CambioProfesional,
    EditCategoria,
    AgregarFoto
  },
  data() {
    return {
      dialog: false,
      viewCambioProfesional: false,
      editarCategoria: false,
      agregarFotoTrabajo:false,
      datos:null /*{
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
        nombre: 'Edwin Alexander Ibarra',
        email: 'ortizalexander2244@gmail.com',
        cedula: 43490561,
        contrasena: '1010Edwin',
        celular: 3127363552,
        telefonoFijo: 5992200,
        rol: 'profesional',
        descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque praesentium omnis quis pariatur exercitationem explicabo, expedita dignissimos nemo, porro iusto voluptate voluptatum dolore, ipsam voluptates provident aliquam ea fugit placeat!',
        experiencia: [
          {
            idCategoria: 1,
            nombre: 'Pintor',
            icono: 'http://localhost:3000/img/icono_pintor_thumb.svg'
          },
          {
            idCategoria: 2,
            nombre: 'Pintor',
            icono: 'http://localhost:3000/img/icono_pintor_thumb.svg'
          }
        ],
        trabajosRealizados: [
          {
            idtrab_realizado: 3,
            foto: 'https://i.pinimg.com/550x/af/11/3f/af113f436fb5c666454e58bdeeec0361.jpg',
            descripcion: 'Fachada de vivienda ubicada en las afueras de la ciudad de Medellín'
          }
        ]
      }*/
    }
  },
  methods: {
    buscarUsuario(){ 
      fetch('http://localhost:3000/verPerfil/'+localStorage.getItem('usuario'))
      .then(dat=> dat.json())
      .then(dat=>{
        this.datos=dat
        setTimeout(()=>emmit.emit('imagen-avatar-cambio', {rol:dat.rol, avatar:dat.avatar}),500)
      })
    },
    guardarDescripcion(){
      fetch('http://localhost:3000/guardarDescripcion/'+localStorage.getItem('usuario'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({descripcion:this.datos.descripcion})
            })
            .then(() => this.dialog=false)
    }
  },
  created() {
    emmit.on('cambio-usuario-profesional', () => {
      this.viewCambioProfesional = true
    })
  },
  mounted() {
    this.buscarUsuario()
  },
}
</script>
