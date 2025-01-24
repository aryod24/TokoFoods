<template>
  <div id="app">
    <router-view/>
    <FooterView />
  </div>
</template>

<script>
import FooterView from "@/components/Footer.vue"

export default {
  components: {
    FooterView
  }
}
</script>
