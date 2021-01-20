import Axios from "axios";
import router from "../../router";

const auth = {
  state: {
    token: null,
    role: null,
    email: null,
    username: null,
    id: null,
  },
  mutations: {
    getToken(state, data) {
      state.token = data.token;
      state.role = data.role;
      state.email = data.email;
      state.username = data.username;
      state.id = data.id;
    },
    delToken(state) {
      (state.token = null), (state.role = null);
    },
  },
  actions: {
    getToken({ commit }, auth) {
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
            if (!res.data.result[0].status) {
              reject(res.data.result[0].message);
            }
            const data = res.data.result[0].result;
            commit("getToken", data);
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    delToken({ commit }) {
      commit("delToken");
      commit("deleteProduct");
      commit("emptyCategory");
      commit("emptyCart");
      commit("emptyOrder");

      router.replace({ name: "Login" });
    },
    
    createAccount(_, form) {
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
};

export default auth;
