<template>
  <div class="history">
    <section class="main-section">
      <header-item :text="'History'" :searchicon="false" :filterEdit="false" />
      <main class="row">
        <side-nav :modalAdd="false" />
        <div class="content-wrap col">
          <div class="container">
            <section class="card-info">
              <b-card
                overlay
                bg-variant="info"
                text-variant="white"
                sub-title="Today's Income"
                sub-title-text-variant="white"
                class="card-style text-left shadow-sm"
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
                class="card-style text-left shadow-sm"
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
                class="card-style text-left shadow-sm"
              >
                <b-card-text>
                  <h3>Rp. 100.000.000.000</h3>
                  <p>+10% Last Year</p>
                </b-card-text>
              </b-card>
            </section>
            <img src="../assets/icon/Chart.png" width="100%" alt="" />
            <b-table
              class="shadow-sm"
              striped
              hover
              :items="items"
              :fields="fields"
            ></b-table>
          </div>
        </div>
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
  methods: {
    getAllData() {
      axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "history",
        headers: {
          authtoken: this.dataToken,
        },
      })
        .then((res) => {
          this.items = res.data.result;
        })
        .catch((err) => {
          alert(err.message);
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
  },
  mounted() {
    this.getAllData();
  },
};
</script>

<style scoped>
.history {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: block;
}
.content-wrap {
  height: 94vh;
  overflow: auto;
  margin: 0;
  padding: 0;
}
.card-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.card-style {
  max-width: 18vw;
  width: 50%;
  height: 15vh;
  margin: 20px 0;
}
.chart {
  height: 300px;
  margin: 20px 0;
  padding: 20px 40px;
  border-radius: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
}
main {
  margin: 0;
  padding: 0;
}
</style>