import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Barang from '../views/Barang.vue'
import BarangDetail from '../views/BarangDetail.vue'
import CreateBarang from '../views/CreateBarang.vue'
//import PesananSukses from '../views/PesananSukses.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/barangs',
    name: 'Barang',
    component: Barang
  },
  {
    path: '/barangs/:id',
    name: 'BarangDetail',
    component: BarangDetail
  },
  {
    path: '/createbarang',
    name: 'CreateBarang',
    component: CreateBarang
  },
 /* {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: PesananSukses
  },*/
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
