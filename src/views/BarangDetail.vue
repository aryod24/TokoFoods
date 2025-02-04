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
              <li class="breadcrumb-item active" aria-current="page">Detail Barang</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img :src="barang.transaksi" class="img-fluid shadow" alt="Gambar Barang" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ barang.barang_nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga Beli:
            <strong>Rp. {{ barang.harga_beli }}</strong>
          </h4>
          <h4>
            Harga Jual:
            <strong>Rp. {{ barang.harga_jual }}</strong>
          </h4>
          <button class="btn btn-secondary mt-4" @click="editMode = true">
            <b-icon-pencil></b-icon-pencil> Edit Barang
          </button>
          <button class="btn btn-danger mt-4" @click="hapusBarang">
            <b-icon-trash></b-icon-trash> Hapus Barang
          </button>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-if="editMode" class="row mt-3">
        <div class="col-md-6">
          <form class="mt-4" @submit.prevent="updateBarang">
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
            <button type="submit" class="btn btn-success me-2">
              <b-icon-check></b-icon-check> Simpan Perubahan
            </button>
            <button type="button" class="btn btn-secondary" @click="editMode = false">
              <b-icon-x></b-icon-x> Batal
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavbarView from "@/components/Navbar.vue"
import axios from "axios"
import { useToast } from 'vue-toast-notification'
import type { Barang } from '@/types/Barang'

const router = useRouter()
const route = useRoute()
const toast = useToast()

interface BarangState extends Barang {
  transaksi: File | string | null
}

const barang = ref<BarangState>({
  barang_id: 0,
  barang_nama: '',
  harga_beli: 0,
  harga_jual: 0,
  transaksi: null,
})
const editMode = ref(false)

const setBarang = (data: BarangState) => {
  barang.value = data
}

const hapusBarang = async () => {
  try {
    await axios.delete(`http://localhost/PWL_POS/public/api/barangs/${route.params.id}`)
    router.push({ path: "/barangs" })
    toast.success("Barang berhasil dihapus", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    })
  } catch (err) {
    console.log(err)
    toast.error("Terjadi kesalahan saat menghapus barang", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    })
  }
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    barang.value.transaksi = target.files[0]
  }
}

const updateBarang = async () => {
  const params = new URLSearchParams()
  if (barang.value.barang_nama) {
    params.append('barang_nama', barang.value.barang_nama)
  }
  if (barang.value.harga_beli) {
    params.append('harga_beli', barang.value.harga_beli.toString())
  }
  if (barang.value.harga_jual) {
    params.append('harga_jual', barang.value.harga_jual.toString())
  }

  try {
    if (barang.value.transaksi instanceof File) {
      const formData = new FormData()
      formData.append('transaksi', barang.value.transaksi)
      await axios.put<Barang>(
        `http://localhost/PWL_POS/public/api/barangs/${route.params.id}`,
        formData,
        { params }
      )
    } else {
      await axios.put<Barang>(
        `http://localhost/PWL_POS/public/api/barangs/${route.params.id}`,
        null,
        { params }
      )
    }
    editMode.value = false
    toast.success("Barang berhasil diperbarui", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    })
  } catch (err) {
    console.log(err)
    toast.error("Terjadi kesalahan saat memperbarui barang", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    })
  }
}

onMounted(async () => {
  try {
    const response = await axios.get<Barang>(`http://localhost/PWL_POS/public/api/barangs/${route.params.id}`)
    setBarang(response.data as BarangState)
    editMode.value = false
  } catch (error) {
    console.log(error)
    toast.error("Terjadi kesalahan saat memuat data barang")
  }
})
</script>
