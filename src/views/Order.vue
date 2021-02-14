<template>
  <div class="order">
    <section class="main-section">
      <header-item
        class="header"
        :text="'Order Information'"
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
              :items="dataOrder"
              :fields="fields"
              v-if="dataToken.role == 'admin'"
            >
              <template #cell(actions)="row">
                <b-button
                  size="sm"
                  @click="openOrderItem(row.item.id)"
                  class="mr-1"
                  variant="primary"
                >
                  <fa-icon :icon="['fas', 'eye']" size="lg" />
                </b-button>
                <b-button
                  size="sm"
                  @click="openOrderStatus(row.item)"
                  class="mr-1"
                  variant="success"
                >
                  <fa-icon :icon="['fas', 'sync']" size="lg" />
                </b-button> </template
            ></b-table>
            <b-table
              class="shadow-sm"
              striped
              hover
              :items="dataOrderUser"
              :fields="fields"
              v-if="dataToken.role == 'customer'"
            >
              <template #cell(actions)="row">
                <b-button
                  size="sm"
                  @click="openOrderItem(row.item.id)"
                  class="mr-1"
                  variant="primary"
                >
                  <fa-icon :icon="['fas', 'eye']" size="lg" />
                </b-button> </template
            ></b-table>
            <b-modal id="modal-open-detail" hide-footer>
              <template #modal-title> Order Detail </template>
              <div
                class="modal-cart-align m-3"
                v-for="item in dataOrderItem"
                :key="item.id"
              >
                <p>{{ item["products.name"] }} x {{ item.amount }}</p>
                <p>{{ item.price }} K</p>
              </div>
            </b-modal>
            <b-modal id="modal-open-status" hide-footer>
              <template #modal-title> Order Detail </template>
              <b-form
                class="m-3"
                @submit="changeStatusOrder"
                @submit.stop.prevent
              >
                <label class="mr-sm-4" for="input-Status">Status</label>
                <b-form-select
                  id="input-Status"
                  v-model="formStatus.status"
                  :options="statusChoice"
                  required
                >
                </b-form-select
                ><br /><br />
                <b-button class="btn-block" variant="success" type="submit"
                  >Order</b-button
                >
              </b-form>
            </b-modal>
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
  name: "Order",
  components: {
    HeaderItem,
    SideNav,
  },
  data() {
    return {
      statusChoice: [
        {
          value: null,
          text: "Select Payment Method",
        },
        {
          value: "1",
          text: "Unpaid",
        },
        {
          value: "2",
          text: "Process",
        },
        {
          value: "3",
          text: "Ready",
        },
        {
          value: "4",
          text: "Done",
        },
      ],
      fields: [
        {
          key: "invoice",
          label: "INVOICES",
          sortable: true,
        },
        {
          key: "status",
          label: "STATUS",
          sortable: true,
          variant: "info",
        },
        {
          key: "payment",
          label: "PAYMENT",
          sortable: true,
        },
        {
          key: "amount",
          label: "AMOUNT (K)",
          sortable: true,
        },
        {
          key: `createdAt`,
          label: "DATES",
          sortable: true,
        },
        { key: "actions", label: "ACTIONS" },
      ],
      formStatus: {
        id: null,
        status: null,
      },
      roleAdmin: false,
    };
  },
  methods: {
    ...mapActions([
      "getOrder",
      "getOrderItem",
      "getOrderUser",
      "updateOrder",
    ]),
    logout() {
      this.$store.dispatch("delToken");
    },
    changeStatusOrder() {
      this.updateOrder(this.formStatus)
        .then((res) => {
          alert(res.statusText);
          this.formStatus = {
            id: null,
            status: null,
          };
          this.$bvModal.hide("modal-open-status");
          this.getOrder();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openOrderItem(id) {
      this.getOrderItem(id);
      this.$bvModal.show("modal-open-detail");
    },
    openOrderStatus(data) {
      this.formStatus.id = data.id;
      if (data.status == "unpaid") {
        this.formStatus.status = 1;
      } else if (data.status == "process") {
        this.formStatus.status = 2;
      } else if (data.status == "ready") {
        this.formStatus.status = 3;
      } else if (data.status == "done") {
        this.formStatus.status = 4;
      }
      this.$bvModal.show("modal-open-status");
    },
  },
  computed: {
    ...mapGetters(["dataOrder", "dataOrderItem", "dataOrderUser"]),
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    dataToken() {
      return this.$store.getters.dataToken;
    },
  },
  mounted() {
    this.getOrder();
    this.getOrderUser();
    if (this.$store.getters.dataToken.role === "admin") {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
  },
};
</script>

<style scoped>
.order {
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
.modal-cart-align {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
</style>