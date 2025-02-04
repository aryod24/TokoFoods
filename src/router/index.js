import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import BarangView from '../views/Barang.vue'
import BarangDetail from '../views/BarangDetail.vue'
import CreateBarang from '../views/CreateBarang.vue'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/barangs', name: 'BarangView', component: BarangView },
  { path: '/barangs/:id', name: 'BarangDetail', component: BarangDetail },
  { path: '/createbarang', name: 'CreateBarang', component: CreateBarang }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
