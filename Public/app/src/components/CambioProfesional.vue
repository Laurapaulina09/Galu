<template>
    <div class="cambio-profesional d-flex justify-center ">
        <v-card class="pa-5">
            <v-card-title class="justify-center">Elige tu categoria</v-card-title>
            <v-row class="d-flex justify-center">
                <check-categoria v-for="categoria in categorias" class="ma-2" :key="categoria.id_categoria"
                    :categori="categoria"></check-categoria>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-btn tile color="primary" @click="guardar()">
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
    name: 'CambioProfesional',
    components: {
        CheckCategoria
    },
    data() {
        return {
            categorias: null,
            categoriasSelect: []
        }
    },
    methods: {
        guardar() {
            let dat = {
                cedula: localStorage.getItem('usuario'),
                experiencia: this.categoriasSelect
            }
            if (this.categoriasSelect.length >= 1) {
                fetch('http://localhost:3000/postularse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dat)
                })
                    .then(response => response.json())
                    .then(response => console.log(response))
            }
        },
        //location.reload()
        buscaListaCategorias() {
            fetch('http://localhost:3000/listCategorias/')
                .then(respuesta => respuesta.json())
                .then((respuesta) => this.categorias=respuesta)
        }
    },
    created() {
        emmit.on('agregar-categoria', (data) => {
            this.categoriasSelect.push(data.index)
        }),
            emmit.on('quitar-categoria', (data) => {
                let indice = this.categoriasSelect.indexOf(data.index)
                if (indice != -1) this.categoriasSelect.splice(indice, 1)
            })
        this.buscaListaCategorias()
    }
}
</script>
<style scoped>
.cambio-profesional {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.3);
}

.cambio-profesional>div {
    width: 90%;
    max-width: 450px;
    align-self: center;
    background-color: #6DBFE2;
    max-height: 500px;
    overflow-y: scroll;
}

.cambio-profesional>div::-webkit-scrollbar {
    width: 8px
}
</style>