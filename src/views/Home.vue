<template>
  <div class="home">
    <section class="main-section">
      <header-item
        class="header"
        :text="'Mood Shop'"
        :searchicon="true"
        :filterEdit="false"
        v-on:searchToHome="onSearch"
        v-on:sortToHome="onSort"
      />
      <main class="row">
        <side-nav :modalAdd="true" />
        <div class="content-wrap col">
          <div class="container">
            <b-modal id="modal-add-cart" class="modal-body" hide-footer>
              <template #modal-title> Checkout </template>
              <div class="modal-cart-align m-3">
                <p>Cashier : Zaki Ganteng</p>
                <h4 class="mr-4">{{ randomInvoice }}</h4>
              </div>
              <b-form class="m-3">
                <div
                  class="modal-cart-align"
                  v-for="item in dataCart"
                  :key="item.id"
                >
                  <p>{{ item.name }} {{ item.count }}</p>
                  <p>Rp. {{ item.price }}</p>
                </div>
                <div class="modal-cart-align">
                  <p>Ppn 10%</p>
                  <p>Rp. {{ ppn }}</p>
                </div>
                <div class="text-right">
                  <p>Total Rp. {{ countModal }}</p>
                </div>
                <br />
                <b-button
                  class="btn-block"
                  variant="danger"
                  @click="modalOrder()"
                  >Print</b-button
                >
                <p class="text-center m-0"><b>OR</b></p>
                <b-button type="reset" class="btn-block" variant="info"
                  >Send Email</b-button
                >
              </b-form>
            </b-modal>
            <div
              class="button-item"
              @click="addCart(item)"
              v-for="item in dataproduct"
              :key="item.id"
            >
              <card-product
                :name="item.name"
                :price="Number(item.price)"
                :image="item.image"
                :category="item.category"
              />
            </div>
          </div>
        </div>
        <b-collapse
          id="cart-collapse"
          style="background-color: white; position: relative"
        >
          <article v-if="dataCart && dataCart.length > 0">
            <div class="cart-wrap">
              <cart-item
                v-for="(item, index) in dataCart"
                :key="item.id"
                :data="item"
                v-on:delete-row="deleteThisRow(index)"
              />
            </div>
            <article class="cart-order">
              <div class="order-total">
                <h4>Total</h4>
                <h4>{{ countCart }} K</h4>
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
          Cart <span class="span-cart">{{ dataCart.length }}</span>
        </h2>
      </div>
      <article v-if="dataCart && dataCart.length > 0">
        <div class="cart-wrap">
          <cart-item
            v-for="(item, index) in dataCart"
            :key="item.id"
            :data="item"
            v-on:delete-row="deleteThisRow(index)"
          />
        </div>
        <article class="cart-order">
          <div class="order-total">
            <h4>Total</h4>
            <h4>{{ countCart }} K</h4>
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
import axios from "axios";
import CartItem from "../components/CartItem.vue";

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
      dataproduct: [],
      dataCart: [],
      formOrder: {
        amount: 0,
        invoice: "",
        cashier: "Zaki Ganteng",
        name_product: "",
      },
      options: [],
      randomInvoice: "",
      ppn: 0,
    };
  },
  methods: {
    onSort(value) {
      let order = "";
      let sort = "";
      if (value == 1) {
        order = "name";
        sort = "asc";
      }
      if (value == 2) {
        order = "category";
        sort = "asc";
      }
      if (value == 3) {
        order = "price";
        sort = "asc";
      }
      if (value == 4) {
        order = "name";
        sort = "desc";
      }
      if (value == 5) {
        order = "category";
        sort = "desc";
      }
      if (value == 6) {
        order = "price";
        sort = "desc";
      }
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product?orderBy=${order}&sort=${sort}`,
        headers: {
          authtoken: this.dataToken,
        },
      })
        .then((res) => {
          this.dataproduct = res.data.result;
        })
        .catch((err) => {
          alert(err.message);
          this.logout();
        });
      // .get(`${process.env.VUE_APP_URL}product?orderBy=${order}&sort=${sort}`)
      // .then((res) => {
      //   this.dataproduct = res.data.result;
      // })
      // .catch((err) => {
      //   alert(err.message);
      // });
    },
    onSearch(value) {
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product?search="${value}`,
        headers: {
          authtoken: this.dataToken,
        },
      })
        .then((res) => {
          if (res.data.result == "tidak ada data di table product") {
            this.dataproduct = [];
          } else {
            this.dataproduct = res.data.result;
          }
        })
        .catch((err) => {
          alert(err.message);
          this.logout();
        });

      // axios
      //   .get(process.env.VUE_APP_URL + "product?search=" + value)
      //   .then((res) => {
      //     if (res.data.result == "tidak ada data di table product") {
      //       this.dataproduct = [];
      //     } else {
      //       this.dataproduct = res.data.result;
      //     }
      //   })
      //   .catch((err) => {
      //     alert(err.message);
      //   });
    },
    deleteThisRow(index) {
      this.dataCart.splice(index, 1);
    },
    addCart(data) {
      let hasil = this.dataCart.find((res) => {
        if (res.name == data.name) {
          return res.name;
        }
      });
      if (hasil) {
        for (let i = 0; i < this.dataCart.length; i++) {
          if (this.dataCart[i].name == data.name) {
            this.dataCart[i].count++;
          }
        }
      } else {
        data.count = 1;
        this.dataCart.push(data);
      }
      this.makeToast(data.name);
    },
    cancelCart() {
      this.dataCart = [];
    },
    randomNumber() {
      this.randomInvoice = "#" + Math.round(Math.random() * 100000000 + 1);
      this.ppn = (this.countCart * 10) / 100;
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
      this.formOrder.amount = this.countModal;
      this.formOrder.invoice = this.randomInvoice;
      let arrayValue = [];
      this.dataCart.forEach((value) => {
        arrayValue.push(value.name);
      });
      this.formOrder.name_product = arrayValue.join(", ").toString();
      axios({
        method: "post",
        url: process.env.VUE_APP_URL + "history",
        headers: {
          "Content-Type": "application/json",
          authtoken: this.dataToken,
        },
        data: JSON.parse(JSON.stringify(this.formOrder)),
      })
        .then((res) => {
          if (
            res.data.result[0].message ==
            "please fill in all the data provided completely"
          ) {
            alert(res.data.result[0].message);
            this.dataCart = [];
            this.hideModal("modal-add-cart");
          }
          this.dataCart = [];
          alert(res.data.description);
          this.hideModal("modal-add-cart");
        })
        .catch((err) => {
          alert(err.message);
          this.logout();
        });
    },
    hideModal(data) {
      if (data == "modal-add-cart") {
        this.$bvModal.hide(data);
      }
    },
    getAllData() {
      axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "product",
        headers: {
          authtoken: this.dataToken,
        },
      })
        .then((res) => {
          this.dataproduct = res.data.result;
        })
        .catch((err) => {
          alert(`Your token has expired say : ${err.message}`);
          this.logout();
        });
    },
    logout() {
      const check = this.$store.dispatch("delToken");
      if (check) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    dataToken() {
      return this.$store.getters.dataToken;
    },
    countCart() {
      let total = 0;
      for (const res of this.dataCart) {
        total += Number(res.price) * Number(res.count);
      }
      return total;
    },
    countModal() {
      let hasil = this.countCart + this.ppn;
      return hasil;
    },
  },
  mounted() {
    this.getAllData();
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
