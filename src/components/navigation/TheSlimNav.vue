<template>
  <nav
    class="slimNav"
    :class="{
      hiddenNavbar: !displaySlimNav && !$route.meta.displaySlimNav
    }"
  >
    <div class="back__wrapper" v-if="$route.path !== '/t'">
      <div class="exit" v-if="isCreatorActive" @click="closeCreator"></div>
      <div class="arrow" v-else @click="$router.go(-1)"></div>
    </div>
    <div class="burger__wrapper" v-if="!isCreatorActive">
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
  closeCreator() {
    this.$store.dispatch("closeCreator");
  }

  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }

  set isNavOpen(value) {
    this.$store.commit("setNav", value);
  }

  get displaySlimNav() {
    return this.$store.getters.displaySlimNav;
  }

  set displaySlimNav(value) {
    this.$store.commit("setSlimNav", value);
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
  top: $verticalPadding / 2;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  padding: 0 $verticalPadding / 2;
  transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1),
    opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  @media (min-width: 1024px) {
    padding: 0 $verticalPadding;
  }
  &.hiddenNavbar {
    transform: translateY(2vh);
    opacity: 0;
  }
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
    }
    .arrow:hover,
    .exit:hover {
      cursor: pointer;
    }
    .exit {
      width: 28px;
      height: 28px;
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
