<template>
  <header class="shadow-sm">
    <div class="title">
      <h2>{{ text }}</h2>
      <fa-icon
        :class="searchicon ? 'icon' : 'hide'"
        :icon="['fas', 'search']"
        size="2x"
      />
    </div>
    <div class="cart-mobile">
      <div :class="'{{ searchicon }}' ? 'vl' : 'hide'"></div>
      <fa-icon
        :class="'{{ searchicon }}' ? 'icon' : 'hide'"
        :icon="['fas', 'shopping-cart']"
        size="2x"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "header-item",
  props: {
    searchicon: {
      type: Boolean,
      required: true,
    },
    text:{
      type: String,
      required: true,
    }
  },
};
</script>

<style scoped>
header {
  display: flex;
  position: sticky;
  background: white;
  top: 0;
  height: 54px;
}
h2 {
  margin: auto;
}

.icon {
  margin: 10px 20px;
}
.hide {
  display: none;
}
.cart-mobile {
  display: none;
}
.vl {
  border-left: 2px solid black;
  height: auto;
  margin: 5px 20px;
}
.title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  font-size: 1rem;
}
</style>