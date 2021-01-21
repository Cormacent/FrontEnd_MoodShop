import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
import Edit from "../views/Edit.vue";
import Login from "../views/Login.vue";
import store from "../store";
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
      meta: { requiresAuth: true },
    },
    {
      path: "/edit",
      name: "Edit",
      component: Edit,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "*",
      redirect: "/404",
    },
    {
      path: "/404",
      name: "notfound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "Login",
      });
    } else if (
      store.getters.loggedIn &&
      store.getters.dataToken.role == "customer" &&
      to.matched.some((record) => record.name == "Edit")
    ) {
      next(router.replace(from));
    } else {
      next();
    }
  } else if (
    store.getters.loggedIn &&
    to.matched.some((record) => record.name == "Login")
  ) {
    console.log("sii");
    next(router.replace(from));
  } else {
    next();
  }
});

export default router;
