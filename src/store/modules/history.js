import Axios from "axios";
import store from "../index";

//   data dari action kirim ke mutation kemudian disimpan dalam state,
// dan dapat digunakan melalui getters
const history = {
  state: {
    history: null,
  },
  getters: {
    dataHistory: (state) => {
      for (const key in state.history) {
        let date = new Date(state.history[key].createdAt);
        state.history[key].createdAt = date.toLocaleDateString("en-GB", {
          timeZone: "UTC",
        });
      }
      return state.history;
    },
  },
  actions: {
    getHistory({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "history",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getHistory", res.data.result);
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

    addHistory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "history",
          headers: {
            "Content-Type": "application/json",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
        })
          .then((res) => {
            alert(res.data.description);
            store.dispatch("emptyCart");
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
    updateHistory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "PUT",
          url: process.env.VUE_APP_URL + "history",
          headers: {
            "Content-Type": "multipart/form-data",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
        })
          .then((res) => {
            console.log(res).data;
            resolve(res);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              console.log("from history1 store : ");
              console.log(err);
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
    deleteHistory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "DELETE",
          url: process.env.VUE_APP_URL + "history/?id=" + data,
          headers: {
            authtoken: store.getters.dataToken.token,
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              console.log("from history1 store : ");
              console.log(err);
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
    getHistory(state, data) {
      state.history = data;
    },
  },
};
export default history;
