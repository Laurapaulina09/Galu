<template>
  <div>
    <v-app-bar app color="white" dark class="px-4" height="85px">
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain :src="logo" transition="scale-transition" width="80" />
      </div>

      <v-spacer></v-spacer>
      <div :class="verHamburguesa == 'false' ? 'd-none' : 'd-sm-none'">
        <v-app-bar-nav-icon @click="cambioBarra" class=" black--text"></v-app-bar-nav-icon>
      </div>
      <div :class="verHamburguesa == 'false' ? '' : 'd-sm-block d-sm-none d-none'">
        <div class="d-flex">
          <div style="align-self:center" v-for="dat in InfoLink" :key="dat.id">
            <div v-if="dat.id == 3">
              <router-link class="black--text d-flex align-center mx-1" style="text-decoration:none" :to="dat.link">
                <div v-if="dat.vista">
                  <img width="48px" :src="dat.imagen" alt="">
                </div>
                <div v-if="dat.show && dat.vista" class="mx-1">
                  {{ dat.show }}
                </div>
              </router-link>
            </div>
            <div v-if="dat.id == 2">
              <div class="black--text d-flex align-center mx-1" style="text-decoration:none; cursor:pointer" @click="cambioUsuarioProfesional()">
                <div v-if="dat.vista">
                  <img width="48px" :src="dat.imagen" alt="">
                </div>
                <div v-if="dat.show && dat.vista" class="mx-1">
                  {{ dat.show }}
                </div>
              </div>
            </div>
            <div v-if="dat.id == 1">
              <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on" class="d-flex black--text" style="align-items:center">
                    <div v-if="dat.vista">
                      <img width="48px" :src="dat.imagen" alt="">
                    </div>
                    <div v-if="dat.show && dat.vista" class="mx-1">
                      {{ dat.show }}
                    </div>
                  </div>
                </template>

                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(item, i) in listCategorias" :key="i">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import emit from '@/services/emmit'
export default {
  name: 'NavBar',
  props: ['categoria', 'nosotros', 'perfil', 'verHamburguesa', 'nombreColaborador'],
  data() {
    return {
      showMenu: false,
      drawer: false,
      logo: 'http://localhost:3000/GalúAzul.png',
      InfoLink: [
        {
          id: 1,
          vista: this.categoria == 'false' ? false : true,
          show: 'Categorias',
          imagen: 'https://c0.klipartz.com/pngpicture/685/811/gratis-png-iconos-de-computadora-etiqueta-de-precio-diseno-de-icono-etiqueta.png',
          link: ''
        },
        {
          id: 2,
          vista: this.nosotros == 'false' ? false : true,
          show: this.nombreColaborador ? this.nombreColaborador : 'Trabaja con nosotros',
          imagen: 'https://cdn-icons-png.flaticon.com/512/237/237382.png',
          link: ''
        },
        {
          id: 3,
          show:  this.nombreColaborador ? this.nombreColaborador : '',
          vista: this.perfil == 'false' ? false : true,
          imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
          link: ''
        },
      ],
      listCategorias: [
        {
          title: 'Carpintero',
          icon:'mdi-alpha-c-circle'
        },
        {
          title: 'Carpintero',
          icon:'mdi-alpha-c-circle'
        },
        {
          title: 'Carpintero',
          icon:'mdi-alpha-c-circle'
        },
      ]
    }
  },
  methods: {
    cambioUrl() {
      location.href = '/#/inicioSesion'
    },
    cambioBarra() {
      emit.emit('cambio-barra', { cambio: true })
    },
    cambioUsuarioProfesional(){
      emit.emit('cambio-usuario-profesional', {cambio:true})
    }
  },
}
</script>
<style lang="">
    
</style>