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

          <v-list-item>
            <router-link to="/reservar" class="d-flex links" exact>
              <v-list-item-icon>
              <v-icon>mdi-airplane</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reservar</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    <footer-app class="mt-6"></footer-app>
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
