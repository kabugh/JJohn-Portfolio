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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
