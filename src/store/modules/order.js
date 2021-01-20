import Axios from "axios";
import store from "../index";

//   data dari action kirim ke mutation kemudian disimpan dalam state,
// dan dapat digunakan melalui getters
const order = {
  state: {
    order: null,
    orderDetail: null,
  },
  getters: {
    dataOrder: (state) => {
      for (const key in state.order) {
        let date = new Date(state.order[key].createdAt);
        state.order[key].createdAt = date.toLocaleDateString("en-GB", {
          timeZone: "UTC",
        });
      }
      return state.order;
    },
    dataOrderDetail: (state) => {
      return state.orderDetail;
    },
  },
  actions: {
    getOrderDetail({ commit }, id_order) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "orderdetail/order?id_order=" + id_order,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getOrderDetail", res.data.result);
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
        url:
          process.env.VUE_APP_URL +
          "order/user?id_user=" +
          store.getters.dataToken.id,
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
            data.orderDetail.forEach((val) => {
              val.id_order = resOrder.data.result.id;
              let datadetail = {
                id_order: resOrder.data.result.id,
                id_product: val.product.id,
                amount: val.count,
                price: val.countPrice,
              };
              Axios({
                method: "POST",
                url: process.env.VUE_APP_URL + "orderdetail",
                headers: {
                  "Content-Type": "application/json",
                  authtoken: store.getters.dataToken.token,
                },
                data: datadetail,
              })
                .then((res) => {
                  console.log(res);
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
            "Content-Type": "multipart/form-data",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
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
    getOrderDetail(state, data) {
      state.orderDetail = data;
    },

    emptyOrder(state) {
      state.order = null;
    },
  },
};
export default order;
