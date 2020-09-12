import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
Vue.component("vue-draggable-resizable", VueDraggableResizable);

import VueScrollTo from "vue-scrollto";
Vue.use(VueScrollTo, {
  easing: [0.86, 0, 0.07, 1],
  duration: 2000,
  onStart: () => {
    if (store.getters.isNavOpen) store.commit("setNav", false);
    if(store.getters.isCreatorActive) store.commit("setCreatorActive", false);
  }
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
