import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Verify from "../views/verifyCheckSum.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/verify-checksum",
    name: "Verify",
    component: Verify,
  },
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.VUE_APP_API_ROOT,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === from.name) {
    return next();
  }
  next();
});

export default router;
