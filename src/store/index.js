import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import auth from "./modules/auth";
import product from "./modules/product";
import category from "./modules/category";
import history from "./modules/history";
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
    history,
    cart,
  },
  plugins: [vuexLocalStorage.plugin],
});
