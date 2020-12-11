<template>
  <div class="home">
    <side-nav />
    <section class="main-section">
      <header-item :text="'Mood Shop'" :searchicon="true" />
      <main class="container">
        <b-modal id="modal-add">
          <template #modal-title> Add Item </template>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="m-3">
            <b-row>
              <b-col sm="3">
                <label for="input-name">Name :</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="input-name" v-model="form.name"> </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="3">
                <label class="mr-sm-4" for="input-image">Image : </label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="input-image"> </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="3">
                <label class="mr-sm-4" for="input-price">Prices : </label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="input-price"> </b-form-input>
              </b-col> </b-row
            ><br />
            <b-row>
              <b-col sm="3">
                <label class="mr-sm-4" for="input-category">category</label>
              </b-col>
              <b-col sm="9">
                <b-form-select
                  id="input-name"
                  :options="[
                    { text: 'Choose...', value: null },
                    'One',
                    'Two',
                    'Three',
                  ]"
                >
                </b-form-select> </b-col></b-row
            ><br />
            <template #modal-footer="{ok, cancel}"> 
            <b-button type="submit" class="btn-block" variant="danger" @click="ok()"
              >Print</b-button
            >
            <p class="text-center m-0"><b>OR</b></p>
            <b-button type="reset" class="btn-block" variant="info" @click="cancel()"
              >Send Email</b-button
            >
            </template>

          </b-form>
        </b-modal>

        <card-product
          v-for="item in dataproduct"
          :key="item.id"
          :name="item.name"
          :price="Number(item.price)"
          :image="item.image"
        />
      </main>
    </section>
    <cart-aside />
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
      dataproduct: {},
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
      // title:"Food Item"
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_URL + "product")
      .then((res) => {
        this.dataproduct = res.data.result;
      })
      .catch((err) => {
        alert(err.message);
        // this.$router.push({ path: "/" });
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
</style>
