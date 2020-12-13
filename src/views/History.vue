<template>
  <div class="history">
    <side-nav :modalAdd="false" />

    <section class="main-section">
      <header-item :text="'History'" :searchicon="false" />
      <main class="container">
        <section class="card-info">
          <b-card
            overlay
            bg-variant="info"
            text-variant="white"
            sub-title="Today's Income"
            sub-title-text-variant="white"
            class="card-style text-left"
          >
            <b-card-text> 
             <h3>Rp. 1.000.000</h3>
             <p>+2% Yesterday</p>
            </b-card-text>
          </b-card>
          <b-card
            overlay
            bg-variant="primary"
            text-variant="white"
            sub-title="Order"
            sub-title-text-variant="white"
            class="card-style text-left"
          >
            <b-card-text>
             <h3>3.270</h3>
             <p>+5% Last Week</p>
            </b-card-text>
          </b-card>
          <b-card
            overlay
            bg-variant="warning"
            text-variant="white"
            sub-title="This Year's Income"
            sub-title-text-variant="white"
            class="card-style text-left"
          >
            <b-card-text>
             <h3>Rp. 100.000.000.000</h3>
             <p>+10% Last Year</p>
            </b-card-text>
          </b-card>
        </section>
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </main>
    </section>
  </div>
</template>

<script>
import HeaderItem from "../components/HeaderItem.vue";
import axios from "axios";
import SideNav from "../components/SideNav.vue";
export default {
  name: "History",
  components: {
    HeaderItem,
    SideNav,
  },
  data() {
    return {
      fields: [
        {
          key: "invoice",
          label: "INVOICES",
          sortable: true,
        },
        {
          key: "cashier",
          label: "CASHIER",
          sortable: true,
        },
        {
          key: "date",
          label: "DATES",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "name_product",
          label: "ORDER",
          sortable: true,
        },
        {
          key: "amount",
          label: "AMOUNT (Rp)",
          sortable: true,
          variant: "success",
        },
      ],
      items: [],
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_URL + "history")
      .then((res) => {
        this.items = res.data.result;
      })
      .catch((err) => {
        alert(err.message);
      });
  },
};
</script>

<style scoped>
.history {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 80px auto;
}
.card-info {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px 50px;
}
.card-style {
  max-width: 25vw;
  height: 15vh;
  margin: 20px 0;
}
</style>