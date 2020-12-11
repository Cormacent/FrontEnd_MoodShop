import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faSearch,
  faShoppingCart,
  faUtensils,
  faHistory,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VModal from 'vue-js-modal'


library.add(
  faBars,
  faSearch,
  faShoppingCart,
  faUtensils,
  faHistory,
  faPlusCircle
);
Vue.component("fa-icon", FontAwesomeIcon);
Vue.use(VModal)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
