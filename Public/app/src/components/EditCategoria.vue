<template lang="">
    <div class="cambio-profesional d-flex justify-center ">
        <v-card class="pa-5">
            <v-card-title class="justify-center">Elige tu categoria</v-card-title>
            <v-row class="d-flex justify-center">
                    <check-categoria v-for="categoria in categorias" class="ma-2" :key="categoria.id_categoria" :categori="categoria"></check-categoria>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-btn  tile  color="primary" @click="guardar()">
                    Continuar
                    <v-icon right>
                    mdi-send
                    </v-icon>
                </v-btn>
            </v-row>
            <slot name="cerrar"></slot>
        </v-card>
    </div>
</template>
<script>
import CheckCategoria from './CheckCategoria.vue'
import emmit from '@/services/emmit'
export default {
    name:'EditCategoria',
    components:{
        CheckCategoria
    },
    data(){
        return{
            categorias:[
                {
                    id_categoria:1,
                    nombre_categoria:'Pintor',
                    icono:'https://cdn-icons-png.flaticon.com/512/360/360484.png',
                    usuarios_cedula:12132
                },
                {
                    id_categoria:2,
                    nombre_categoria:'Pintor',
                    icono:'https://cdn-icons-png.flaticon.com/512/360/360484.png',
                    usuarios_cedula:12132
                },
                {
                    id_categoria:3,
                    nombre_categoria:'Constructor',
                    icono:'https://cdn-icons-png.flaticon.com/512/360/360484.png',
                },
            ],
            categoriasSelect:[
                1,2
            ]
        }
    },
    methods:{
        guardar(){
            location.reload()
        },
        eliminarCategoria(id){
            let indice =this.categorias.findIndex((ele)=>{
                return ele.id_categoria == id
            })
            if(indice != -1){
                this.categorias[indice].usuarios_cedula=null
            }
        }
    },
    created(){
        emmit.on('agregar-categoria', (data)=>{
            this.categoriasSelect.push(data.index)
        }),
        emmit.on('quitar-categoria', (data)=>{
            let indice = this.categoriasSelect.indexOf(data.index)
            if(indice != -1 ) {
                this.categoriasSelect.splice(indice, 1)
                this.eliminarCategoria(data.index)
            }
        })
    }
}
</script>
<style scoped>
    .cambio-profesional{
        position:fixed;
        top: 0px;
        left:0px;
        width:100%;
        height:100vh;
        z-index:5;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .cambio-profesional>div{
        width:90%;
        max-width:450px;
        align-self: center;
        background-color: #6DBFE2;
        max-height: 500px;
        overflow-y: scroll;
    }
    .cambio-profesional>div::-webkit-scrollbar{
        width:8px
    }
</style>