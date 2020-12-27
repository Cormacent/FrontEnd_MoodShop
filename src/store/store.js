import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    role: localStorage.getItem("access_role") || null,
    email: "",
    username: "",
  },
  mutations: {
    getToken(state, data) {
      state.token = data.token;
      state.role = data.role;
    },
    delToken(state) {
      (state.token = null), (state.role = null);
    },
  },
  actions: {
    getToken(context, auth) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "post",
          url: process.env.VUE_APP_URL + "auth",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(JSON.stringify(auth)),
        })
          .then((res) => {
            if (res.data.result[0].result === undefined) {
              reject(res.data.result[0].message);
            }
            const data = res.data.result[0].result;
            localStorage.setItem("access_token", data.token);
            localStorage.setItem("access_role", data.role);
            context.commit("getToken", data);
            resolve(res.data.result[0].result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    delToken(context) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_role");
      context.commit("delToken");
      return true;
    },
    createAccount(context, form) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "post",
          url: process.env.VUE_APP_URL + "users",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(JSON.stringify(form)),
        })
          .then((res) => {
            if (
              res.message == "please fill in all the data provided completely"
            ) {
              reject(res.message);
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    dataToken(state) {
      if (state.token != null && state.role != null) {
        return state;
      }
    },
  },
});
export default store;
