<template>
  <div>
    <NavbarView />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong>Barang</strong>
          </h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Barang..."
              aria-label="Cari"
              aria-describedby="basic-addon1"
              @keyup="searchBarang"
            />
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <b-icon-search></b-icon-search>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div 
          class="col-md-4 mt-4" 
          v-for="barang in barangs" 
          :key="barang.barang_id"
        >
          <CardProduct :barang="barang" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NavbarView from '@/components/Navbar.vue'
import CardProduct from '@/components/CardProduct.vue'
import type { Barang } from '@/types/Barang'

const barangs = ref<Barang[]>([])

const originalBarangs = ref<Barang[]>([])
const search = ref('')

const searchBarang = () => {
  const query = search.value.toLowerCase()
  barangs.value = originalBarangs.value.filter((barang: { barang_nama: string }) =>
    barang.barang_nama.toLowerCase().includes(query)
  )
}

onMounted(() => {
  axios
    .get<Barang[]>('http://localhost/PWL_POS/public/api/barangs')
    .then((response: { data: any }) => {
      originalBarangs.value = response.data
      barangs.value = response.data
    })
    .catch((error: any) => console.error(error))
})
</script>
