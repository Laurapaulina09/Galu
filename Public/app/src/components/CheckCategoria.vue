<template lang="">
    <div @click="estado=!estado" style="cursor:pointer">
        <v-avatar color="white" size="100" >
        <img src="https://cdn-icons-png.flaticon.com/512/360/360484.png" alt="">
        <v-icon v-if="estado" class="primary--text" style="position:absolute;font-size:50px">mdi-check-bold</v-icon>
        </v-avatar>
        <p class="align-center" style="text-align:center">Categoria</p>
    </div>
</template>
<script>
export default {
    name:'CheckCategoria',
    props:['categoria'],
    data(){
        return{
            estado:false
        }
    }
}
</script>
<style lang="">
    
</style>