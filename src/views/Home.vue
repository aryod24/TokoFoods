<template>
  <div class="home">
    <NavbarView />
    <div class="container">
      <HeroView />

      <div class="row mt-4">
        <div class="col">
          <h2>
            List
            <strong>Barang</strong>
          </h2>
        </div>
        <div class="col">
          <router-link to="/barangs" class="btn btn-success float-right">
            <b-icon-eye></b-icon-eye>Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarView from "@/components/Navbar.vue";
import HeroView from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";

export default {
  name: "HomeView",
  components: {
    NavbarView,
    HeroView,
    CardProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
};
</script>
