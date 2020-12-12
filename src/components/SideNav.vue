<template>
  <aside class="shadow-sm">
    <div class="header-nav">
      <fa-icon class="icon" :icon="['fas', 'bars']" size="2x" />
    </div>
    <nav>
      <router-link to="/" class="router button">
        <fa-icon class="icon" :icon="['fas', 'utensils']" size="2x" />
      </router-link>

      <router-link to="/history" class="router button">
        <fa-icon class="icon" :icon="['fas', 'history']" size="2x" />
      </router-link>
      <div v-b-modal="'modal-add'" class="button" v-if="modalAdd == true">
        <fa-icon class="icon" :icon="['fas', 'plus-circle']" size="2x" />
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "side-nav",
  props: {
    modalAdd: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  height: auto;
  background: white;
  position: sticky;
  top: 60px;
}
.button,
:focus {
  margin: 15px;
  cursor: pointer;
  outline: none;
}
.header-nav {
  margin: 10px 0;
  position: sticky;
  top: 10px;
}
.router {
  color: black;
}
</style>