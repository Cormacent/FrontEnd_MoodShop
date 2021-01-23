<template>
  <div class="home">
    <section class="main-section">
      <header-item
        class="header"
        :text="'Mood Shop'"
        :searchicon="true"
        :filterEdit="false"
      />
      <main class="row">
        <side-nav :roleAdmin="roleAdmin" />
        <div class="content-wrap col">
          <div class="container">
            <b-modal id="modal-add-cart" class="modal-body" hide-footer>
              <template #modal-title> Checkout </template>
              <div class="modal-cart-align m-3">
                <p>Cashier : Zaki Ganteng</p>
                <h4 class="mr-4">{{ randomInvoice }}</h4>
              </div>
              <b-form
                class="m-3"
                @submit="modalOrder"
                @submit.stop.prevent
                @reset="hideModal"
              >
                <div
                  class="modal-cart-align"
                  v-for="item in allCart"
                  :key="item.product.id"
                >
                  <p>{{ item.product.name }} x {{ item.count }}</p>
                  <p>{{ item.countPrice }} K</p>
                </div>
                <b-row>
                  <b-col sm="3"><p>Ppn 10%</p></b-col>
                  <b-col sm="9" class="text-right"
                    ><p>{{ ppn }} K</p></b-col
                  >
                </b-row>

                <label class="mr-sm-4" for="input-Payment">Payment</label>
                <b-form-select
                  id="input-Payment"
                  v-model="formOrder.payment"
                  :options="paymentChoice"
                  required
                >
                </b-form-select>
                <br /><br />
                <div class="text-right">
                  <p>Total {{ total }} K</p>
                </div>
                <br />
                <b-button class="btn-block" variant="success" type="submit"
                  >Order</b-button
                >
                <b-button type="reset" class="btn-block" variant="danger"
                  >Cancel</b-button
                >
              </b-form>
            </b-modal>
            <div
              class="button-item"
              @click="addCart(item)"
              v-for="item in dataProduct"
              :key="item.id"
            >
              <card-product
                :name="item.name"
                :price="Number(item.price)"
                :image="item.image"
                :category="item['categorys.name']"
              />
            </div>
          </div>
        </div>

        <!-- MOBILE VIEW -->
        <b-collapse
          id="cart-collapse"
          style="background-color: white; position: relative"
        >
          <article v-if="allCart && allCart.length > 0">
            <div class="cart-wrap">
              <cart-item
                v-for="(item, index) in allCart"
                :key="item.id"
                :data="item"
                :index="index"
              />
            </div>
            <article class="cart-order">
              <div class="order-total">
                <h4>Total : {{ quantity }}</h4>
                <h4>{{ calculate }} K</h4>
              </div>
              <p class="text-left">*Belum termasuk ppn</p>
              <b-button
                class="mt-3"
                variant="info"
                v-b-modal="'modal-add-cart'"
                block
                @click="randomNumber()"
                >Checkout</b-button
              >
              <b-button
                class="mt-2"
                variant="danger"
                @click="cancelCart()"
                block
              >
                Cancel </b-button
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
        </b-collapse>
      </main>
    </section>
    <aside class="shadow-sm dekstop-cart">
      <div class="shadow-sm">
        <h2 class="pt-2 pb-2">
          Cart <span class="span-cart">{{ quantity }}</span>
        </h2>
      </div>
      <article v-if="allCart && allCart.length > 0">
        <div class="cart-wrap">
          <cart-item
            v-for="(item, index) in allCart"
            :key="item.id"
            :data="item"
            :index="index"
          />
        </div>
        <article class="cart-order">
          <div class="order-total">
            <h4>Total : {{ quantity }}</h4>
            <h4>{{ calculate }} K</h4>
          </div>
          <p class="text-left">*Belum termasuk ppn</p>
          <b-button
            class="mt-3"
            variant="info"
            v-b-modal="'modal-add-cart'"
            block
            @click="randomNumber()"
            >Checkout</b-button
          >
          <b-button class="mt-2" variant="danger" @click="cancelCart()" block>
            Cancel </b-button
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
  </div>
</template>

<script>
import CardProduct from "../components/CardProduct.vue";
import HeaderItem from "../components/HeaderItem.vue";
import SideNav from "../components/SideNav.vue";
import CartItem from "../components/CartItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    HeaderItem,
    SideNav,
    CardProduct,
    CartItem,
  },
  data() {
    return {
      formOrder: {
        amount: null,
        price: null,
        payment: null,
        invoice: null,
        id_user: null,
      },
      paymentChoice: [
        {
          value: null,
          text: "Select Payment Method",
        },
        {
          value: "cash",
          text: "Cash",
        },
        {
          value: "debit",
          text: "Debit",
        },
      ],
      randomInvoice: "",
      roleAdmin: false,
    };
  },
  methods: {
    // FOR VUES ACTION
    ...mapActions(["getProduct", "addCart", "emptyCart", "addOrder"]),
    cancelCart() {
      this.emptyCart();
    },
    randomNumber() {
      this.randomInvoice = "#" + Math.round(Math.random() * 100000000 + 1);
    },
    makeToast(name) {
      this.$bvToast.toast(`product name : ${name}`, {
        title: "Item Added !!",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-left",
      });
    },
    modalOrder() {
      this.formOrder.amount = this.quantity;
      this.formOrder.invoice = this.randomInvoice;
      this.formOrder.price = this.quantity;
      this.formOrder.id_user = this.dataToken.id;
      let order = {
        order: this.formOrder,
        orderItem: this.allCart,
      };
      this.$store
        .dispatch("addOrder", order)
        .then((res) => {
          alert(res);
        })
        .catch((e) => {
          alert(e);
        });
      this.hideModal();
    },
    hideModal() {
      this.$bvModal.hide("modal-add-cart");
    },
    logout() {
      this.$store.dispatch("delToken");
    },
  },
  computed: {
    ...mapGetters([
      "dataProduct",
      "calculate",
      "allCart",
      "quantity",
      "ppn",
      "total",
      "dataToken",
    ]),
  },
  mounted() {
    this.getProduct();
    if (this.dataToken.role === "admin") {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
  },
};
</script>

<style scoped>
.main-section {
  background: rgba(190, 195, 202, 0.3);
  box-sizing: border-box;
}
.home {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: auto 400px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.content-wrap {
  height: 94vh;
  overflow: auto;
  margin: 0;
  padding: 0;
}
.button-item {
  cursor: pointer;
}
aside {
  position: relative;
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
  width: 100%;
}
.cart-empty {
  position: sticky;
  top: 60px;
}
h2 {
  margin: auto;
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
.cart-wrap {
  height: 65vh;
  overflow: auto;
}
.modal-cart-align {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.header {
  z-index: 1;
}

main {
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 360px) {
  .home {
    display: grid;
    grid-template-columns: auto auto;
  }
  .cart-wrap {
    height: 50vh;
  }
  .dekstop-cart {
    display: none;
  }
}
@media screen and (min-width: 361px) {
  .home {
    height: 100vh;
    display: block;
  }
  .dekstop-cart {
    display: none;
  }
}
@media screen and (min-width: 1200px) {
  .home {
    display: grid;
    grid-template-columns: auto 400px;
  }

  .dekstop-cart {
    display: block;
  }
}
</style>
