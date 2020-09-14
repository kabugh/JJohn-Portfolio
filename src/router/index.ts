import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const overlayGuard = (to: Route, from: Route, next: Function) => {
  store.commit("setNav", false);
  store.commit("setCreatorActive", false);
  next();
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "products" */ "../views/Home.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true,
      displayNav: true,
      displaySlimNav: false,
    }
  },
  {
    path: "/:category",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/products/Products.vue"),
    beforeEnter: overlayGuard,
    props: true,
    meta: {
      initialNav: true,
      displayNav: true,
      displaySlimNav: false,
    }
  },
  {
    path: "/:category/:id",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "product" */ "../views/products/Product.vue"),
    beforeEnter: overlayGuard,
    props: true,
    meta: {
      initialNav: false,
      displayNav: false,
      displaySlimNav: false,
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