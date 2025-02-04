<template>
  <div class="barang-detail">
    <NavbarView />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/barangs" class="text-dark">Barangs</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Create Barang</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <form class="mt-4" @submit.prevent="createBarang">
            <div class="form-group">
              <label for="barang_nama">Nama Barang</label>
              <input type="text" class="form-control" v-model="barang.barang_nama" />
            </div>
            <div class="form-group">
              <label for="harga_beli">Harga Beli</label>
              <input type="number" class="form-control" v-model="barang.harga_beli" />
            </div>
            <div class="form-group">
              <label for="harga_jual">Harga Jual</label>
              <input type="number" class="form-control" v-model="barang.harga_jual" />
            </div>
            <div class="form-group">
              <label for="transaksi">Upload Gambar</label>
              <input type="file" class="form-control" @change="onFileChange" />
            </div>
            <button type="submit" class="btn btn-success">
              <b-icon-cart></b-icon-cart>Buat Barang
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import NavbarView from "@/components/Navbar.vue"
import axios from "axios"
import type { Barang } from '@/types/Barang'


const router = useRouter()
const toast = useToast()

interface CreateBarangState extends Barang {
  transaksi: File | null
}

const barang = ref<CreateBarangState>({
  barang_id: 0,
  barang_nama: '',
  harga_beli: 0,
  harga_jual: 0,
  transaksi: null,
})

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    barang.value.transaksi = target.files[0]
  }
}

const createBarang = async () => {
  const formData = new FormData()
  formData.append('barang_nama', barang.value.barang_nama)
  formData.append('harga_beli', barang.value.harga_beli.toString())
  formData.append('harga_jual', barang.value.harga_jual.toString())
  
  if (barang.value.transaksi) {
    formData.append('transaksi', barang.value.transaksi)
  }

  try {
    await axios.post<Barang>("http://localhost/PWL_POS/public/api/barangs", formData)
    router.push({ path: "/barangs" })
    toast.success("Barang berhasil dibuat", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    })
  } catch (err) {
    console.log(err)
    toast.error("Terjadi kesalahan saat membuat barang", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    })
  }
}
</script>

<style scoped>
.card {
  margin: 12px;
}

.card-product {
  width: 18rem;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
