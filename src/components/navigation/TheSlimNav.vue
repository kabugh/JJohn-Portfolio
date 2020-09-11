<template>
  <nav
    class="slimNav"
    :class="{
      hiddenNavbar:
        (!showNavbar && !isNavOpen && !$route.meta.initialNav) ||
        ($route.path === '/' && !isNavOpen)
    }"
  >
    <div class="back__wrapper" v-if="$route.path !== '/t'">
      <div class="arrow" v-else @click="$router.push('/')"></div>
    </div>
    <div class="burger__wrapper">
      <div
        class="nav-mobile"
        id="nav-icon"
        :class="{ open: isNavOpen }"
        @click="isNavOpen = !isNavOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheSlimNav extends Vue {
  showNavbar = false;

  mounted() {
    if (this.$route.meta.initialNav) this.showNavbar = true;
  }


  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }

  set isNavOpen(value) {
    this.$store.commit("setNav", value);
  }

  get isCreatorActive() {
    return this.$store.getters.isCreatorActive;
  }

  set isCreatorActive(value) {
    this.$store.commit("setCreatorActive", value);
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.slimNav {
  position: fixed;
  width: 100%;
  min-height: 6vh;
  top: $verticalPadding;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  padding: 0 $verticalPadding;
  //   &.hiddenNavbar {
  //     transform: translateY(-100%);
  //   }
  .back__wrapper {
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .arrow,
    .exit {
      background-image: url("../../assets/images/icons/arrow_black.png");
      @include backgroundDefault;
      width: 36px;
      height: 36px;
      margin-right: 15px;
    }
    .arrow:hover,
    .exit:hover {
      cursor: pointer;
    }
    .exit {
      width: 32px;
      height: 32px;
      background-image: url("../../assets/images/icons/exit.png");
    }
  }
  .burger__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    #nav-icon span {
      background-color: black;
    }
  }
}
</style>
