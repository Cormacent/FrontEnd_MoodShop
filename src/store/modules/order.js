import Axios from "axios";
import store from "../index";

const order = {
  state: {
    order: null,
    orderUser: null,
    orderItem: null,
  },
  getters: {
    dataOrder: (state) => {
      for (const key in state.order) {
        let date = new Date(state.order[key].createdAt);
        state.order[key].createdAt = date.toLocaleDateString("en-GB", {
          timeZone: "UTC",
        });
        if (state.order[key].status == 1) {
          state.order[key].status = "unpaid";
        } else if (state.order[key].status == 2) {
          state.order[key].status = "process";
        } else if (state.order[key].status == 3) {
          state.order[key].status = "ready";
        } else if (state.order[key].status == 4) {
          state.order[key].status = "done";
        }
      }
      return state.order;
    },
    dataOrderUser: (state) => {
      for (const key in state.orderUser) {
        let date = new Date(state.orderUser[key].createdAt);
        state.orderUser[key].createdAt = date.toLocaleDateString("en-GB", {
          timeZone: "UTC",
        });
        if (state.orderUser[key].status == 1) {
          state.orderUser[key].status = "unpaid";
        } else if (state.orderUser[key].status == 2) {
          state.orderUser[key].status = "process";
        } else if (state.orderUser[key].status == 3) {
          state.orderUser[key].status = "ready";
        } else if (state.orderUser[key].status == 4) {
          state.orderUser[key].status = "done";
        }
      }
      return state.orderUser;
    },
    dataOrderItem: (state) => {
      return state.orderItem;
    },
  },
  actions: {
    getOrderItem({ commit }, id_order) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "orderitem/order?id_order=" + id_order,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getOrderItem", res.data.result);
        })
        .catch((e) => {
          if (e.message === "Network Error") {
            alert(e.message);
          } else if (e.message == "Request failed with status code 401") {
            alert(`Your token has expired!`);
            store.dispatch("delToken");
          } else {
            console.log(e);
          }
        });
    },
    getOrder({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "order",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getOrder", res.data.result);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            alert(err.message);
          } else if (err.message == "Request failed with status code 401") {
            alert(`Your token has expired!`);
            store.dispatch("delToken");
          } else {
            console.log(err);
          }
        });
    },

    getOrderUser({ commit }) {
      Axios({
        method: "GET",
        url:
          process.env.VUE_APP_URL +
          "order/user?id_user=" +
          store.getters.dataToken.id,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getOrderUser", res.data.result);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            alert(err.message);
          } else if (err.message == "Request failed with status code 401") {
            alert(`Your token has expired!`);
            store.dispatch("delToken");
          } else {
            console.log(err);
          }
        });
    },

    addOrder(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "order",
          headers: {
            "Content-Type": "application/json",
            authtoken: store.getters.dataToken.token,
          },
          data: data.order,
        })
          .then((resOrder) => {
            data.orderItem.forEach((val) => {
              val.id_order = resOrder.data.result.id;
              let datadetail = {
                id_order: resOrder.data.result.id,
                id_product: val.product.id,
                amount: val.count,
                price: val.countPrice,
              };
              Axios({
                method: "POST",
                url: process.env.VUE_APP_URL + "orderitem",
                headers: {
                  "Content-Type": "application/json",
                  authtoken: store.getters.dataToken.token,
                },
                data: datadetail,
              })
                .then(() => {
                  alert("Success")
                })
                .catch((e) => {
                  if (e.message === "Network Error") {
                    alert(e.message);
                  } else if (
                    e.message == "Request failed with status code 401"
                  ) {
                    alert(`Your token has expired!`);
                    store.dispatch("delToken");
                  } else {
                    console.log(e);
                  }
                });
            });
            store.dispatch("emptyCart");
            resolve("Order Success!");
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              reject(err.message);
            } else if (err.message == "Request failed with status code 401") {
              store.dispatch("delToken");
              reject(`Your token has expired!`);
            } else {
              reject(err.message);
            }
          });
      });
    },
    updateOrder(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "PUT",
          url: process.env.VUE_APP_URL + "order",
          headers: {
            "Content-Type": "application/json",
            authtoken: store.getters.dataToken.token,
          },
          data: JSON.parse(JSON.stringify(data)),
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              reject(err.message);
              alert(err.message + "try to reconnect");
            } else if (err.message == "Request failed with status code 401") {
              alert(`Your token has expired!`);
              store.dispatch("delToken");
            } else {
              reject(err);
            }
          });
      });
    },
    deleteOrder(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "DELETE",
          url: process.env.VUE_APP_URL + "order/?id=" + data,
          headers: {
            authtoken: store.getters.dataToken.token,
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              reject(err.message);
              alert(err.message + "try to reconnect");
            } else if (err.message == "Request failed with status code 401") {
              alert(`Your token has expired!`);
              store.dispatch("delToken");
            } else {
              reject(err);
            }
          });
      });
    },
  },
  mutations: {
    getOrder(state, data) {
      state.order = data;
    },
    getOrderUser(state, data) {
      state.orderUser = data;
    },
    getOrderItem(state, data) {
      state.orderItem = data;
    },

    emptyOrder(state) {
      state.order = null;
    },
  },
};
export default order;
