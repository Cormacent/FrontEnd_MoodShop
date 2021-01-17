import Axios from "axios";
import store from "../index";
import router from "../../router";
//   data dari action kirim ke mutation kemudian disimpan dalam state,
// dan dapat digunakan melalui getters
const product = {
  state: {
    product: null,
  },
  getters: {
    dataProduct: (state) => {
      return state.product;
    },
  },
  actions: {
    getProduct({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "product",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getProduct", res.data.result);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            alert(err.message);
          } else if (err.message == "Request failed with status code 401") {
            alert(`Your token has expired!`);
            store.dispatch("delToken");
            router.resolve("/");
          } else {
            console.log(err);
          }
        });
    },
    sortProduct({ commit }, data) {
      Axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product/sort?orderBy=${data.order}&sort=${data.sort}`,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getProduct", res.data.result);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            alert(err.message + "try to reconnect");
          } else if (err.message == "Request failed with status code 401") {
            alert(`Your token has expired!`);
            store.dispatch("delToken");
          } else {
            console.log(err);
          }
        });
    },
    searchProduct({ commit }, value) {
      Axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product/search?name=${value}`,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getProduct", res.data.result);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            alert(err.message + "try to reconnect");
          } else if (err.message == "Request failed with status code 401") {
            alert(`Your token has expired!`);
            store.dispatch("delToken");
          } else {
            console.log(err);
          }
        });
    },
    addProduct(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "product",
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
    updateProduct(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "PUT",
          url: process.env.VUE_APP_URL + "product",
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
    deleteProduct(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "DELETE",
          url: process.env.VUE_APP_URL + "product/?id=" + data,
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
    getProduct(state, data) {
      state.product = data;
    },
    deleteProduct(state) {
      state.product = null;
    },
  },
};
export default product;
