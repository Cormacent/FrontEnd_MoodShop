import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import auth from "./modules/auth";
import product from "./modules/product";
import category from "./modules/category";
import order from "./modules/order";
import cart from "./modules/cart";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
    product,
    category,
    order,
    cart,
  },
  plugins: [vuexLocalStorage.plugin],
});
