<template>
  <v-app>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <router-link to="/" class-active="" class="d-flex links" exact>
              <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
            </router-link>
          </v-list-item>
          <!-- <v-list-item v-for="(c,i) in InfoLink" :key="i">
            <router-link to="/" class-active="" class="d-flex links" exact>
              <v-list-item-icon>
              <v-avatar size="30">
                <img :src="c.imagen" alt="" srcset="">
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title>{{c.show}}</v-list-item-title>
            </router-link>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    <footer-app class="mt-6" v-if="$route.path != '/inicioSesion'"></footer-app>
  </v-app>
</template>
<script>
  import FooterApp from './components/FooterApp.vue'
  import emmit from './services/emmit';
export default {
    components:{
      FooterApp
    },
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    InfoLink: [
        {
          id: 1,
          vista: true,
          show: 'Categorias',
          imagen: 'https://c0.klipartz.com/pngpicture/685/811/gratis-png-iconos-de-computadora-etiqueta-de-precio-diseno-de-icono-etiqueta.png',
          link: ''
        },
        {
          id: 2,
          vista: true,
          show: 'Trabaja con nosotros',
          imagen: 'https://cdn-icons-png.flaticon.com/512/237/237382.png',
          link: ''
        }
      ],
  }),
  methods: {
    cambioUrl(){
      location.href='/#/inicioSesion'
    },
  },
  created() {
    emmit.on('cambio-barra', ()=>{
      this.drawer = !this.drawer
    })
    if(!localStorage.getItem('usuario')){
      location.href="/#/inicioSesion"
    }
  },
};
</script>
<style>
nav li:hover,
nav li:active {
  background-color: indianred;
  cursor: pointer;
}
.links{
  text-decoration: none;
}
</style>
