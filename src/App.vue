<template>
  <div id="app">
    <!-- <LoadingOverlay /> -->
    <TheNavbar />
    <TheSlimNav />
    <transition name="navOverlay">
      <NavOverlay v-if="isNavOpen" />
    </transition>
    <div class="overlay__mask" :class="{ visible: isNavOpen }"></div>
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    <!-- <TheFooter
      data-aos="fade-in"
      data-aos-delay="400"
      data-aos-offset="-1000"
    /> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import TheNavbar from "./components/navigation/TheNavbar.vue";
import TheSlimNav from "./components/navigation/TheSlimNav.vue";
import NavOverlay from "./components/navigation/NavOverlay.vue";
// import TheFooter from "./components/TheFooter.vue";

@Component({
  components: { LoadingOverlay, TheNavbar, TheSlimNav, NavOverlay }
})
export default class App extends Vue {
  mounted() {
    this.setMode();
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addListener(e => {
      const darkModeOn = e.matches;
      console.log(`Dark mode is ${darkModeOn ? "🌒 on" : "☀️ off"}.`);
      if (darkModeOn) this.darkMode = true;
      else this.darkMode = false;
    });
  }
  @Watch("darkMode")
  setMode() {
    const body = document.querySelector("body");
    if (body) {
      if (this.darkMode) {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    }
  }

  get isNavOpen(): boolean {
    return this.$store.getters.isNavOpen;
  }

  get darkMode(): boolean {
    return this.$store.getters.darkMode;
  }

  set darkMode(value) {
    this.$store.commit("setDarkMode", value);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";
@media (min-width: 1280px) and (min-height: 500px) {
  .overlay__mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    z-index: 10;
    transition: background-color 0.3s ease-in-out 0.3s,
      opacity 0.3s ease-in-out 0.3s;
    &.visible {
      opacity: 1;
      visibility: visible;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
