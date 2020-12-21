import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import History from "../views/History.vue";
import Edit from "../views/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
