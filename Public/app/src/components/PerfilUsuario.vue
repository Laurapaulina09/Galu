<template lang="">
    <v-row>
        <v-col cols="12" sm="4" class="">
          <div class="d-flex justify-center align-center grey lighten-4 pa-4 rounded-lg" style="flex-direction:column">
            <v-avatar  size="200" class="my-1">
              <img :src="datos.avatar" width="200px" alt="">
            </v-avatar>
            <div style="position:relative; overflow:hidden; max-width: 175px;">
              <input @change="changeFoto" style="position:absolute;width:100%;height:40px; top:0px; left:0px;z-index: 1; opacity: 0;" type="file" name="imagen" id="">
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
            <v-text-field v-model="datos.correo" :counter="30" label="Email" required disabled></v-text-field>
            <v-text-field v-model="datos.cedula" :counter="10" label="Cedula" type="number" required disabled></v-text-field>
            <v-text-field v-model="datos.contraseña" :counter="10" label="Contraseña" type="password" required disabled>
            </v-text-field>
            <v-text-field v-model="datos.telefono" :counter="10" label="Telefono" type="number" required disabled>
            </v-text-field>
            <div class="text-center">
              <v-btn color="primary" @click="dialog= !dialog">
                Editar <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2 text-center">
                Editar Perfil
              </v-card-title>
              <div class="grey lighten-4 pa-4 rounded-lg">
                <v-text-field v-model="datos.nombre" :counter="50" label="Nombre" required></v-text-field>
                <v-text-field v-model="datos.correo" :counter="30" label="Email" required></v-text-field>
                <v-text-field v-model="datos.cedula" :counter="10" label="Cedula" type="number" required></v-text-field>
                <v-text-field v-model="datos.telefono" :counter="10" label="Telefono" type="number" required>
                </v-text-field>
                <v-text-field v-model="datos.celular" :counter="10" label="Celular" type="number" required>
                </v-text-field>
                <v-text-field v-model="datos.contraseña" :counter="10" label="Contraseña" type="password" required>
                </v-text-field>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="almacenarCambios">
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      dialog: false,
      datos: this.data
    }
  },
  methods: {
    changeFoto() {
      let foto = event.target.files[0]
      let formData = new FormData()
      formData.append('foto', foto)
      fetch('http://localhost:3000/subirFotoPerfil/' + localStorage.getItem('usuario'), {
        method: "PUT",
        body: formData
      }).then(() => location.reload())
    },
    almacenarCambios(){
      let dat = JSON.stringify(this.datos)
      fetch('http://localhost:3000/editarPerfil', {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:dat
      })
      .then(()=>this.dialog=false)
    }
  },
}
</script>
<style lang="">
    
</style>