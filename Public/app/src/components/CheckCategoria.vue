<template lang="">
    <div @click="select(categori.idCategorias)" style="cursor:pointer">
        <v-avatar color="white" size="100" >
        <img :src="categori.icono" alt="">
        <v-icon v-if="estado || categori.cedula" class="primary--text" style="position:absolute;font-size:50px">mdi-check-bold</v-icon>
        </v-avatar>
        <p class="align-center" style="text-align:center">{{categori.nombre_categoria}}</p>
    </div>
</template>
<script>
import emmit from '@/services/emmit'
export default {
    name:'CheckCategoria',
    props:['categori'],
    data(){
        return{
            estado:this.categori.cedula ? true : false
        }
    },
    methods: {
        select(id){
            this.estado= !this.estado
            if(this.estado){
                //agregar
                emmit.emit('agregar-categoria', {index:id})
            }else{
                //Quitar
                this.estado=false
                emmit.emit('quitar-categoria', {index:id})
            }
        }
    },
}
</script>
<style lang="">
    
</style>