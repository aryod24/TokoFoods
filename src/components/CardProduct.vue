<template>
  <div class="card shadow card-product">
    <img :src="barang.transaksi" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ barang.barang_nama }}</h5>
      <p class="card-text">Harga Beli: Rp. {{ barang.harga_beli }}</p>
      <p class="card-text">Harga Jual: Rp. {{ barang.harga_jual }}</p>
      <router-link class="btn btn-success" :to="'/barangs/' + barang.barang_id"><b-icon-cart></b-icon-cart> Detail</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["barang"],
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
