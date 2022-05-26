<template lang="">
    <div class="cambio-profesional d-flex justify-center ">
        <v-card class="pa-5">
            <v-card-title class="justify-center">Elige tu categoria</v-card-title>
            <v-row class="d-flex justify-center">
                    <check-categoria class="ma-2"></check-categoria>
                    <check-categoria class="ma-2"></check-categoria>
                    <check-categoria class="ma-2"></check-categoria>
                    <check-categoria class="ma-2"></check-categoria>
                    <check-categoria class="ma-2"></check-categoria>
                    <check-categoria class="ma-2"></check-categoria>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-btn  tile  color="primary">
                    Continuar
                    <v-icon right>
                    mdi-send
                    </v-icon>
                </v-btn>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import CheckCategoria from './CheckCategoria.vue'
export default {
    name:'CambioProfesional',
    components:{
        CheckCategoria
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