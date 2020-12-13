<template>
  <div class="home">
    <side-nav :modalAdd="true" />
    <section class="main-section">
      <header-item
        :text="'Mood Shop'"
        :searchicon="true"
        v-on:searchToHome="onSearch"
        v-on:sortToHome="onSort"
      />
      <main class="container">
        <b-modal id="modal-add" hide-footer>
          <template #modal-title> Add Item </template>
          <b-form class="m-3">
            <b-row>
              <b-col sm="3">
                <label for="input-name">Name :</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="input-name" v-model="form.name">
                </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="3">
                <label class="mr-sm-4" for="input-image">Image : </label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="input-image" v-model="form.image">
                </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="3">
                <label class="mr-sm-4" for="input-price">Prices : </label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="input-price" v-model="form.price">
                </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="3">
                <label class="mr-sm-4" for="input-category">category</label>
              </b-col>
              <b-col sm="9">
                <b-form-select
                  id="input-name"
                  v-model="form.id_category"
                  :options="options"
                >
                </b-form-select> </b-col></b-row
            ><br />
            <b-button class="btn-block" variant="danger" @click="addData()"
              >Print</b-button
            >
            <p class="text-center m-0"><b>OR</b></p>
            <b-button
              type="reset"
              class="btn-block"
              variant="info"
              @click="resetData()"
              >Send Email</b-button
            >
          </b-form>
        </b-modal>
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
            <b-button class="btn-block" variant="danger" @click="modalOrder()"
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
      </main>
    </section>
    <!-- <cart-aside :data="dataCart" /> -->
    <aside class="shadow-sm">
      <div class="shadow-sm header-cart">
        <h2>
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
            <h4>{{ countCart }}</h4>
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
// import CartAside from "../components/CartAside.vue";
import HeaderItem from "../components/HeaderItem.vue";
import SideNav from "../components/SideNav.vue";
import axios from "axios";
import CartItem from "../components/CartItem.vue";

export default {
  name: "Home",
  components: {
    HeaderItem,
    SideNav,
    // CartAside,
    CardProduct,
    CartItem,
  },
  data() {
    return {
      dataproduct: [],
      dataCart: [],
      form: {
        image: "",
        name: "",
        price: null,
        id_category: "",
      },
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
      axios
        .get(`${process.env.VUE_APP_URL}product?orderBy=${order}&sort=${sort}`)
        .then((res) => {
            this.dataproduct = res.data.result;
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    onSearch(value) {
      axios
        .get(process.env.VUE_APP_URL + "product?search=" + value)
        .then((res) => {
          if (res.data.result == "tidak ada data di table product") {
            this.dataproduct = [];
          } else {
            this.dataproduct = res.data.result;
          }
        })
        .catch((err) => {
          alert(err.message);
        });
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
        },
        data: JSON.parse(JSON.stringify(this.formOrder)),
      })
        .then((res) => {
          alert(res.data.description);
          this.hideModal("modal-add-cart");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    hideModal(data) {
      if (data == "modal-add-cart") {
        this.$bvModal.hide(data);
      }
    },
    addData() {
      if (
        this.form.name &&
        this.form.price &&
        this.form.id_category &&
        this.form.image
      ) {
        axios({
          method: "post",
          url: process.env.VUE_APP_URL + "product",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(JSON.stringify(this.form)),
        })
          .then((res) => {
            alert(res.data.description);
            // this.form.image = "";
            // this.form.name = "";
            // this.form.price = null;
            // this.form.id_category = "";
            // this.$refs["modal-add"].hide();
            location.reload();
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        alert("Please fill out the entire form, and fill it out correctly");
      }
    },
  },
  computed: {
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
    axios
      .get(process.env.VUE_APP_URL + "product")
      .then((res) => {
        this.dataproduct = res.data.result;
      })
      .catch((err) => {
        alert(err.message);
      });
    axios
      .get(process.env.VUE_APP_URL + "category")
      .then((res) => {
        this.options = [
          {
            value: null,
            text: "Please Select Category",
          },
        ];
        res.data.result.forEach((item) => {
          this.options.push({
            value: item.id,
            text: item.name,
          });
        });
      })
      .catch((err) => {
        alert(err.message);
      });
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
  grid-template-columns: 80px auto 400px;
}
.container {
  display: flex;
  flex-wrap: wrap;
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
.container {
  height: 92vh;
  overflow: auto;
}
</style>
