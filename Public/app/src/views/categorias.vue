<template lang="">
    <div>
        <nav-bar verHamburguesa="true" categoria="true" nosotros="false" perfil="true"></nav-bar>
        <v-container class="my-4" v-if="colaboradores !=null">
            <v-row>
                <v-col v-for="(c, i) in colaboradores" :key="i" md="4" sm="6" cols="12">
                    <v-card elevation="2" class="pa-4">
                        <div class="d-flex">
                            <v-avatar color="primary" size="80">
                                    <img :src="'http://localhost:3000'+c.avatar" alt="">
                            </v-avatar>
                            <div class="ms-2" style="align-self:center">
                                <router-link :to="'/profesional/'+c.cedula" style="text-decoration:none">
                                    <v-card-title>{{c.nombre}}</v-card-title>
                                </router-link>
                                <div>
                                    <v-rating
                                    :value="c.puntaje"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="18"
                                    ></v-rating>
                                </div>
                                <div class="grey--text ms-1 caption">{{c.puntaje}} ({{c.numVotantes}})</div>
                            </div>
                        </div>
                        <div>
                            <div class="my-1 text-subtitle-1">
                                Descripción
                            </div>
                            <div class="caption">{{c.descripcion}}</div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import NavBar from '../components/NavBar'
export default {
    name: 'CategoriaSearch',
    components: {
        NavBar
    },
    data() {
        return {
            colaboradores: null/*[
                {
                    nombre: 'Edwin Ibarra',
                    puntaje: 3.5,
                    numVotantes: 20,
                    avatar: 'https://lh3.googleusercontent.com/-Ek8OBk_hdfc/Wpak83xz7fI/AAAAAAAAOts/uydkIuQNjG8XnNhzP3_BI8440ivghagdwCHMYCw/avatares-perfil-generico%255B3%255D?imgmax=800',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate fuga asperiores expedita! Quasi modi non, deleniti asperiores ullam neque placeat cupiditate aliquam velit quibusdam assumenda impedit incidunt voluptate, similique nemo!'
                },
                {
                    nombre: 'Edwin Ibarra',
                    puntaje: 3.5,
                    numVotantes: 20,
                    avatar: 'https://lh3.googleusercontent.com/-Ek8OBk_hdfc/Wpak83xz7fI/AAAAAAAAOts/uydkIuQNjG8XnNhzP3_BI8440ivghagdwCHMYCw/avatares-perfil-generico%255B3%255D?imgmax=800',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate fuga asperiores expedita! Quasi modi non, deleniti asperiores ullam neque placeat cupiditate aliquam velit quibusdam assumenda impedit incidunt voluptate, similique nemo!'
                },
                {
                    nombre: 'Edwin Ibarra',
                    puntaje: 3.5,
                    numVotantes: 20,
                    avatar: 'https://lh3.googleusercontent.com/-Ek8OBk_hdfc/Wpak83xz7fI/AAAAAAAAOts/uydkIuQNjG8XnNhzP3_BI8440ivghagdwCHMYCw/avatares-perfil-generico%255B3%255D?imgmax=800',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate fuga asperiores expedita! Quasi modi non, deleniti asperiores ullam neque placeat cupiditate aliquam velit quibusdam assumenda impedit incidunt voluptate, similique nemo!'
                },
            ]*/
        }
    },
    methods: {
        getCategoria(){
            fetch('http://localhost:3000/getUserCategoria/'+this.$route.params.categoria)
            .then(response=> response.json())
            .then(response=> {
                this.colaboradores=response
            })
        }
    },
    mounted() {
        this.getCategoria()
    },
    watch:{
        '$route.params.categoria':{
           handler:function(){
               this.getCategoria()
           }
        }
    }
}
</script>
<style lang="">
    
</style>