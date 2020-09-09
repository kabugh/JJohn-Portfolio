import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const overlayGuard = (to: Route, from: Route, next: Function) => {
  store.commit("setNav", false);
  next();
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: overlayGuard,
    meta: {
      initialNav: false
    }
  },
  {
    path: "/produkty/:type",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/products/Products.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  },
  {
    path: "/produkty/:type/:id",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "product" */ "../views/products/Product.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;