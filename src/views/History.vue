<template>
  <div class="history">
    <side-nav />
    <section class="main-section">
      <header-item :text="'History'" :searchicon="false" />
      <main class="container">
        <card-product />
      </main>
    </section>
  </div>
</template>

<script>
import HeaderItem from "../components/HeaderItem.vue";
import SideNav from "../components/SideNav.vue";
export default {
  name: "History",
  components: {
    HeaderItem,
    SideNav,
  },
};
</script>

<style scoped>
.history {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 80px auto;
}
</style>