<template>
  <div class="barang-detail">
    <Navbar />
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
          <form class="mt-4" v-on:submit.prevent="updateBarang">
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

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "BarangDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      barang: {
        barang_nama: '',
        harga_beli: 0,
        harga_jual: 0,
        transaksi: null,
      },
      editMode: false,
    };
  },
  methods: {
    setBarang(data) {
      this.barang = data;
    },
    hapusBarang() {
      axios
        .delete(`http://localhost/PWL_POS/public/api/barangs/${this.$route.params.id}`)
        .then(() => {
          this.$router.push({ path: "/barangs" });
          this.$toast.success("Barang berhasil dihapus", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan saat menghapus barang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        });
    },
    onFileChange(e) {
      this.barang.transaksi = e.target.files[0];
    },
    updateBarang() {
      const params = new URLSearchParams();
      if (this.barang.barang_nama) {
        params.append('barang_nama', this.barang.barang_nama);
      }
      if (this.barang.harga_beli) {
        params.append('harga_beli', this.barang.harga_beli);
      }
      if (this.barang.harga_jual) {
        params.append('harga_jual', this.barang.harga_jual);
      }
      if (this.barang.transaksi) {
        const formData = new FormData();
        formData.append('transaksi', this.barang.transaksi);
        axios
          .put(`http://localhost/PWL_POS/public/api/barangs/${this.$route.params.id}`, formData, { params })
          .then(() => {
            this.editMode = false;
            this.$toast.success("Barang berhasil diperbarui", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error("Terjadi kesalahan saat memperbarui barang", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          });
      } else {
        axios
          .put(`http://localhost/PWL_POS/public/api/barangs/${this.$route.params.id}`, null, { params })
          .then(() => {
            this.editMode = false;
            this.$toast.success("Barang berhasil diperbarui", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error("Terjadi kesalahan saat memperbarui barang", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          });
      }
    },
  },
  mounted() {
    axios
      .get(`http://localhost/PWL_POS/public/api/barangs/${this.$route.params.id}`)
      .then((response) => {
        this.setBarang(response.data);
        this.editMode = false; // Ensure edit form does not automatically open
      })
      .catch((error) => console.log(error));
  },
};
</script>
