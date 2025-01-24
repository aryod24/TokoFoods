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
          <form class="mt-4" v-on:submit.prevent="createBarang">
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

<script>
import NavbarView from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "BarangDetail",
  components: {
    NavbarView,
  },
  data() {
    return {
      barang: {
        barang_nama: '',
        harga_beli: 0,
        harga_jual: 0,
        transaksi: null,
      },
    };
  },
  methods: {
    onFileChange(e) {
      this.barang.transaksi = e.target.files[0];
    },
    createBarang() {
      const formData = new FormData();
      formData.append('barang_nama', this.barang.barang_nama);
      formData.append('harga_beli', this.barang.harga_beli);
      formData.append('harga_jual', this.barang.harga_jual);
      formData.append('transaksi', this.barang.transaksi);

      axios
        .post("http://localhost/PWL_POS/public/api/barangs", formData)
        .then(() => {
          this.$router.push({ path: "/barangs" });  // Mengubah path ke /foods
          this.$toast.success("Barang berhasil dibuat", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan saat membuat barang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        });
    },
  },
};
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
