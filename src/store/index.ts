import Vue from "vue";
import Vuex from "vuex";
import utils from "./modules/utils";
import art from "./modules/art";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    utils,
    art
  }
});
