<template>
  <b-collapse id="navbar-collapse" class="shadow-sm collapse">
    <router-link to="/" class="router button">
      <fa-icon class="icon" :icon="['fas', 'utensils']" size="2x" />
    </router-link>

    <router-link to="/history" class="router button">
      <fa-icon class="icon" :icon="['fas', 'history']" size="2x" />
    </router-link>
    <router-link to="/edit" class="router button">
      <fa-icon
        class="icon text-success"
        :icon="['fas', 'plus-circle']"
        size="2x"
      />
    </router-link>
  </b-collapse>
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
.collapse {
  width: 60px;
  display: flex;
  flex-direction: column;
  height: auto;
  background: white;
  position: sticky;
  top: 60px;
  margin: 0;
  z-index: 1;
}
</style>