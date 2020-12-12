<template>
  <div class="home">
    <side-nav :modalAdd="true" />
    <section class="main-section">
      <header-item :text="'Mood Shop'" :searchicon="true" />
      <main class="container">
        <div class="modalShow">
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
              <b-button
                type="submit"
                class="btn-block"
                variant="danger"
                @click="addData()"
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
        </div>

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
          />
        </div>
      </main>
    </section>
    <cart-aside :data="dataCart" />
  </div>
</template>

<script>
import CardProduct from "../components/CardProduct.vue";
import CartAside from "../components/CartAside.vue";
import HeaderItem from "../components/HeaderItem.vue";
import SideNav from "../components/SideNav.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HeaderItem,
    SideNav,
    CartAside,
    CardProduct,
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
      // options: [
      //   { value: null, text: "Please Select Category" },
      //   { value: "2", text: "Food" },
      //   { value: "3", text: "Drink" },
      // ],
      options: [],
    };
  },
  methods: {
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
    makeToast(name) {
      this.$bvToast.toast(`product name : ${name}`, {
        title: "Item Added !!",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
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
    resetData() {
      console.log("masuk 2");
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
  /* overflow: hidden; */
  display: flex;
  flex-wrap: wrap;
}
.button-item {
  cursor: pointer;
}
</style>
