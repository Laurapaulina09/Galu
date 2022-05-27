import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexUser from '../views/IndexUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'IndexUser',
    component: IndexUser
  },
  {
    path: '/categoria/:categoria',
    name: 'CategoriaSearch',
    component: () => import(/* webpackChunkName: "about" */ '../views/categorias.vue')
  },
  {
    path: '/profesional/:profesional',
    name: 'vistaColaboradorCliente',
    component: () => import(/* webpackChunkName: "about" */ '../views/vistaColaboradorCliente.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
