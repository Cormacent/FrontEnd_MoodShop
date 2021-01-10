import store from "..";

const cart = {
  state: {
    cartList: [],
  },
  mutations: {
    addCart(state, data) {
      state.cartList.push(data);
    },
    incrementCount(state, id) {
      state.cartList[id].count++;
      state.cartList[id].countPrice =
        state.cartList[id].count * state.cartList[id].product.price;
    },
    decrementCount(state, id) {
      state.cartList[id].count--;
      state.cartList[id].countPrice =
      state.cartList[id].count * state.cartList[id].product.price;
    },
    deleteCart(state, id) {
      state.cartList.splice(id, 1);
    },
    emptyCart(state) {
      state.cartList = [];
    },
  },
  actions: {
    addCart({ commit, state }, data) {
      let indexItem;
      let filter = state.cartList.filter((item, index) => {
        if (item.product.id == Number(data.id)) {
          indexItem = index;
          return true;
        } else {
          return false;
        }
      });
      if (filter.length) {
        commit("incrementCount", indexItem);
      } else {
        commit("addCart", { product: data, count: 1, countPrice: data.price });
      }
    },
    decrementCart({ commit, state }, id) {
      if (state.cartList[id].count > 1) {
        commit("decrementCount", id);
      } else {
        commit("deleteCart", id);
      }
    },
    deleteCart({ commit }, id) {
      commit("deleteCart", id);
    },
    emptyCart({ commit }) {
      commit("emptyCart");
    },
  },
  getters: {
    allCart: (state) => {
      return state.cartList;
    },
    calculate: (state) => {
      let harga = 0;
      for (const key in state.cartList) {
        harga = harga + Number(state.cartList[key].countPrice);
      }
      return harga;
    },
    quantity: (state) => {
      let count = 0;
      for (const key in state.cartList) {
        count = count + state.cartList[key].count;
      }
      return count;
    },
    ppn: () => {
      let ppn = (Number(store.getters.calculate) * 10) / 100;
      return ppn;
    },
    total: () => {
      let total = Number(store.getters.calculate) - Number(store.getters.ppn);
      return total;
    },
  },
};
export default cart;
