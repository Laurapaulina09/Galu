<template lang="">
    <div class="agregar-imagen" >
        <v-card class="pa-4">
            <div class="text-center">
                <img v-if="informacion.urlImagen" :src="informacion.urlImagen" width="100%" alt="">
            </div>
            <v-file-input
                class="my-1"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Imagen"
                @change="cambios"
            ></v-file-input>
            <v-col cols="12" class="my-1">
                <v-textarea height="10px" rows="2" name="input-1-1" label="Descripcion" :value="informacion.descripcion" hint="Describe el trabajo"></v-textarea>
            </v-col>
            <div class="text-center">
                <v-btn color="primary">
                    Agregar
                </v-btn>
            </div>
        <slot name="cerrar"></slot>
        </v-card>
    </div>
</template>
<script>
export default {
    name:'AgregarTrabajo',
    data(){
        return{
            informacion:{
                urlImagen:'',
                foto:null,
                descripcion:''
            }
        }
    },
    methods: {
        cambios(){
            console.log('cambios')
            if(event.target.files && event.target.files[0]){
                this.informacion.foto=event.target.files[0];
                this.informacion.urlImagen=URL.createObjectURL(this.informacion.foto)
            }else{
                this.informacion.urlImagen='';
                this.informacion.foto=null
            }
        }
    },
}
</script>
<style>
    .agregar-imagen{
        position:fixed;
        top:0px;
        left:0px;
        width:100%;
        height: 100vh;
        z-index:5;
        background-color: rgba(0, 0, 0, 0.404);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .agregar-imagen>div{
        width: 90%;
        max-width: 600px;
    }
    .agregar-imagen img{
        width:80%;
        height: 300px;
        object-fit: cover;
        margin: auto;
    }
</style>