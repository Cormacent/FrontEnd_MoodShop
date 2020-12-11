<template>
  <aside class="shadow-sm">
    <div class="shadow-sm header-cart">
      <h2>Cart</h2>
    </div>
    <article v-if="datas.length > 0">
      <div class="item-loop" v-for="items in datas" :key="items.id">
        <div class="items row">
          <div class="image">
            <img :src="items.image" :alt="items.name" />
          </div>
          <div class="content text-left">
            <h5>Coffee Latte</h5>
            <div class="prices">
              <div class="plusminus form-group row">
                <button class="btn btn-danger btn-sm mr-1" @click="minus()">
                  -
                </button>
                <input
                  type="number"
                  class="input-pm bg-light form-control p-0 text-center"
                  value="0"
                />
                <button class="btn btn-success btn-sm ml-1" @click="plus()">
                  +
                </button>
              </div>
              <h5>Rp. 20000</h5>
            </div>
          </div>
        </div>
      </div>
    </article>
    <article v-else>
      <img
        src="../assets/icon/food-and-restaurant.png"
        class="icon-cartempty"
        alt=""
      />
      <h4>Your cart is empty</h4>
      <p class="empty-desc">Please add some items from the menu</p>
    </article>

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
  </aside>
</template>

<script>
const data = [
  {
    id: "532",
    name: "Slicker Jacket",
    description:
      "Wind and rain are no match for our organic bamboo slicker jacket for men and women. Triple stitched seams, zippered pockets, and a stay-tight hood are just a few features of our best-selling jacket.",
    price: "125",
    image_title: "slicker-jacket_lynda_29941",
    image:
      "https://hplussport.com/wp-content/uploads/2016/12/slicker-jacket_LYNDA_29941.jpg",
  },
  {
    id: "530",
    name: "Bamboo Thermal Ski Coat",
    description:
      "You'll be the most environmentally conscious skier on the slopes - and the most stylish - wearing our fitted bamboo thermal ski coat, made from organic bamboo with recycled plastic down filling.",
    price: "99",
    image_title: "ski-coat_lynda_29940",
    image:
      "https://hplussport.com/wp-content/uploads/2016/12/ski-coat_LYNDA_29940.jpg",
  },
  {
    id: "516",
    name: "Unisex Thermal Vest",
    description:
      "Our thermal vest, made from organic bamboo with recycled plastic down filling, is a favorite of both men and women. You'll help the environment, and have a wear-easy piece for many occasions.",
    price: "95",
    image_title: "unisex-thermal-vest_lynda_29944",
    image:
      "https://hplussport.com/wp-content/uploads/2016/12/unisex-thermal-vest_LYNDA_29944.jpg",
  },
];
export default {
  name: "cart-items",
  data() {
    return {
      datas: data,
    };
  },
  mounted() {},
  components: {},
  computed: {},
};
</script>

<style scoped>
aside{
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
</style>