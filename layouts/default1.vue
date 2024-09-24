<template>
  <div>
    <NavBar />
    <Nuxt />
    <!-- This renders the page content -->
  </div>
</template>

<script>
import NavBar from "/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
/* Optional: Add any layout-specific styles here */
</style>
