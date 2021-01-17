import Axios from "axios";
import store from "../index";

//   data dari action kirim ke mutation kemudian disimpan dalam state,
// dan dapat digunakan melalui getters
const category = {
  state: {
    category: null,
  },
  getters: {
    dataCategory: (state) => {
      return state.category;
    },
    listCategory: (state) => {
      let options = [
        {
          value: null,
          text: "Please Select Category",
        },
      ];
      if (state.category) {
        state.category.forEach((val) => {
          options.push({
            value: val.id,
            text: val.name,
          });
        });
        return options;
      }
    },
  },
  actions: {
    getCategory({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "category",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getCategory", res.data.result);
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

    addCategory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "category",
          headers: {
            "Content-Type": "application/json",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
        })
          .then((res) => {
             resolve(res)
            return true
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
    updateCategory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "PUT",
          url: process.env.VUE_APP_URL + "category",
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
    deleteCategory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "DELETE",
          url: process.env.VUE_APP_URL + "category/?id=" + data,
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
    getCategory(state, data) {
      state.category = data;
    },
    emptyCategory(state){
      state.category = null
    }
  },
};
export default category;
