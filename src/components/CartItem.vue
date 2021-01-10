<template>
  <div class="items">
    <div class="image">
      <img :src="data.product.image" :alt="data.name" />
    </div>
    <div class="content">
      <h4 class="text-left">{{ data.product.name }}</h4>
      <h5 class="text-left">{{ data.countPrice }} K</h5>
      <div class="prices">
        <div class="plusminus form-group row">
          <button
            class="btn btn-danger btn-sm mr-1 font-weight-bold"
            @click="decrementCart(index)"
          >
            -
          </button>
          <input
            type="number"
            class="input-pm bg-light form-control p-0 text-center"
            :value="data.count"
          />
          <button
            class="btn btn-success btn-sm ml-1 font-weight-bold"
            @click="addCart(data.product)"
          >
            +
          </button>
        </div>
        <fa-icon
          :icon="['fas', 'trash']"
          size="2x"
          @click="deleteCart(index)"
          class="text-danger"
          style="cursor: pointer;margin:auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "cart-item",
  props: {
    data: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    ...mapActions(["addCart", "decrementCart", "deleteCart"]),
  },
};
</script>

<style scoped>
.items {
  margin: 10px 0px;
  display: grid;
  grid-template-columns: 120px auto;
}

.image {
  width: 6em;
  margin: 10px;
  padding: 0;
}
img {
  max-width: 100%;
  max-height: 100%;
}

.content {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.prices {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.plusminus {
  margin: 0 20px 0 0;
  width: 100px;
}
.input-pm {
  width: 40px;
}
h4 {
  font-size: 1.2rem;
}
h5 {
  font-size: 1rem;
}
</style>