<template>
  <div class="history">
    <section class="main-section">
      <header-item
        class="header"
        :text="'History'"
        :searchicon="false"
        :filterEdit="false"
      />
      <main class="row">
        <side-nav :roleAdmin="roleAdmin" />
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
              :items="dataHistory"
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
import SideNav from "../components/SideNav.vue";
import { mapGetters, mapActions } from "vuex";

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
          key: `createdAt`,
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
      roleAdmin: false,
    };
  },
  methods: {
    ...mapActions(["getHistory"]),
    logout() {
      this.$store.dispatch("delToken");
    },
  },
  computed: {
    ...mapGetters(["dataHistory"]),
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    dataToken() {
      return this.$store.getters.dataToken;
    },
  },
  mounted() {
    this.getHistory();
    if (this.$store.getters.dataToken.role === "admin") {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
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
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.card-style {
  max-width: 300px;
  width: 100%;
  height: 15vh;
  margin: 20px 20px;
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

.header {
  z-index: 1;
}
</style>