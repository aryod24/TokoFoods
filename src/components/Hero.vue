<template>
  <div class="hero">
    <!-- Hero Section -->
    <div class="hero-background">
      <div class="overlay">
        <div class="card text-center p-4">
          <h2>
            <strong>Toko Laptop</strong>
            <br />Terpercaya di Kediri
          </h2>
          <p>Ayo segera pilih Laptop idaman Anda</p>
          <router-link class="btn btn-lg btn-success" to="/barangs">
            <b-icon-arrow-right></b-icon-arrow-right> Pesan
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroView",
};
</script>

<style scoped>
.hero-background {
  position: relative;
  background-image: url('../assets/images/acerlah.png'); 
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 50vh; 
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1); 
}

.card {
  position: absolute;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}
</style>
