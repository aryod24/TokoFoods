<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container d-flex justify-content-between align-items-center">
        <router-link to="/" class="navbar-brand">Laptops</router-link>
        
        <div class="d-flex align-items-center">
          <router-link to="/" class="nav-link me-3">Home</router-link>
          <router-link to="/barangs" class="nav-link me-3">Pesanan</router-link>
          <router-link to="/createbarang" class="nav-link">Create Barang</router-link>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavbarView",
  data() {
    return {
      jumlah_pesanans: [],
    };
  },
  props: ["updateKeranjang"],
  methods: {
    setJumlah(data) {
      this.jumlah_pesanans = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((response) => this.setJumlah(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
