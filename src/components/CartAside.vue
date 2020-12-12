<template>
  <aside class="shadow-sm">
    <div class="shadow-sm header-cart">
      <h2>
        Cart <span class="span-cart">{{ data.length }}</span>
      </h2>
    </div>
    <article v-if="data && data.length > 0">
      <div class="item-loop" v-for="items in data" :key="items.id">
        <div class="items row">
          <div class="image">
            <img :src="items.image" :alt="items.name" />
          </div>
          <div class="content text-left">
            <h5>{{ items.name }}</h5>
            <div class="prices">
              <div class="plusminus form-group row">
                <button class="btn btn-danger btn-sm mr-1" @click="minus()">
                  -
                </button>
                <input
                  type="number"
                  class="input-pm bg-light form-control p-0 text-center"
                  :value="items.count"
                />
                <button class="btn btn-success btn-sm ml-1" @click="plus()">
                  +
                </button>
              </div>
              <h5>{{ items.price }}</h5>
            </div>
          </div>
        </div>
      </div>
      <article class="cart-order">
        <div class="order-total">
          <h4>Total</h4>
          <h4>Rp. 150.000</h4>
        </div>
        <p class="text-left">*Belum termasuk ppn</p>
        <b-button class="mt-3" variant="info" block>Checkout</b-button>
        <b-button class="mt-2" variant="danger" block> Cancel </b-button
        ><br /><br />
      </article>
    </article>
    <article v-else class="cart-empty">
      <img
        src="../assets/icon/food-and-restaurant.png"
        class="icon-cartempty"
        alt=""
      />
      <h4>Your cart is empty</h4>
      <p class="empty-desc">Please add some items from the menu</p>
    </article>
  </aside>
</template>

<script>
export default {
  name: "cart-items",
  props: {
    data: {
      type: Array,
    },
  },
  mounted() {},
  components: {},
  computed: {},
};
</script>

<style scoped>
aside {
  position: relative;
}
.item,
.row {
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
article {
  padding: 10px;
}
.header-cart {
  display: flex;
  position: sticky;
  top: 0;
  padding: 7px;
  background: white;
}
.cart-empty {
  position: sticky;
  top: 60px;
}
h2 {
  margin: auto;
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
  /* display: inline-block; */
  margin-right: 20px;
  width: 100px;
}
.input-pm {
  width: 40px;
  /* border-color: greenyellow; */
}

.cart-order {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.order-total {
  display: flex;
  justify-content: space-between;
}
h4 {
  font-size: 1.3rem;
}
p {
  font-size: 1rem;
}
.span-cart {
  background-color: cyan;
  border-radius: 50%;
  padding: 1px 8px;
  color: white;
  font-size: 1.5rem;
}
</style>