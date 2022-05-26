<template lang="">
    <v-row>
        <v-col cols="12" sm="4" class="">
          <div class="d-flex justify-center align-center grey lighten-4 pa-4 rounded-lg" style="flex-direction:column">
            <img :src="datos.avatar" width="200px" alt="">
            <div style="position:relative; overflow:hidden; max-width: 175px;">
              <input style="position:absolute;width:100%;height:40px; top:0px; left:0px;z-index: 1; opacity: 0;"
                type="file" name="imagen" id="">
              <v-btn color="primary">
                <v-icon>mdi-camera-account</v-icon>
                Cambiar foto
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="8" class="">
          <div class="grey lighten-4 pa-4 rounded-lg">
            <v-text-field v-model="datos.nombre" :counter="50" label="Nombre" required disabled></v-text-field>
            <v-text-field v-model="datos.email" :counter="30" label="Email" required disabled></v-text-field>
            <v-text-field v-model="datos.cedula" :counter="10" label="Cedula" type="number" required disabled></v-text-field>
            <v-text-field v-model="datos.contrasena" :counter="10" label="Contraseña" type="password" required disabled>
            </v-text-field>
            <v-text-field v-model="datos.telefono" :counter="10" label="Telefono" type="number" required disabled>
            </v-text-field>
          </div>
        </v-col>
      </v-row>
</template>
<script>
export default {
    props:['data'],
    data(){
        return {
            datos:this.data
        }
    }
}
</script>
<style lang="">
    
</style>