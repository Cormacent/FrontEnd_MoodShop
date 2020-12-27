import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faUtensils,
  faHistory,
  faPlusCircle,
  faTrash,
  faEdit,
  faEnvelope,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VModal from "vue-js-modal";
import store from "./store/store";

library.add(
  faShoppingCart,
  faUtensils,
  faHistory,
  faPlusCircle,
  faTrash,
  faEnvelope,
  faUser,
  faEdit,
  faLock
);
Vue.component("fa-icon", FontAwesomeIcon);
Vue.use(VModal);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");

