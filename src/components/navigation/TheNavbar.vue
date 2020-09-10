<template>
  <nav
    class="navbar"
    :class="{
      hiddenNavbar:
        (!showNavbar && !isNavOpen && !$route.meta.initialNav) ||
        ($route.path === '/' && !isNavOpen)
    }"
  >
    <div class="back__wrapper" v-if="$route.path !== '/'">
      <div class="arrow" @click="$router.push('/')"></div>
      <div class="back" @click="$router.push('/')">Powrót</div>
    </div>
    <div class="back__wrapper" v-else></div>
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/images/logo.png" alt="logo" />
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
export default class TheNavbar extends Vue {
  offset = 5;
  lastScrollPosition = 0;
  scrollValue = 0;
  showNavbar = false;

  mounted() {
    if (this.$route.meta.initialNav) this.showNavbar = true;
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    const anchorPoint = document.querySelector("body");
    if (this.$route.path === "/") {
      if (this.lastScrollPosition > anchorPoint.pageYOffset) {
        if (window.pageYOffset < 0) return;
        if (
          Math.abs(window.pageYOffset - this.lastScrollPosition) < this.offset
        )
          return;

        this.showNavbar = window.pageYOffset < this.lastScrollPosition;
        this.lastScrollPosition = window.pageYOffset;
      }
    } else {
      if (window.pageYOffset < 0) return;
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.offset)
        return;

      this.showNavbar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    }
  }

  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }

  set isNavOpen(value) {
    this.$store.commit("setNav", value);
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.fadeDown-enter-active,
.fadeDown-leave-active {
  transition: opacity 0.5s;
}
.fadeDown-enter,
.fadeDown-leave-to {
  opacity: 0;
}
.navbar {
  width: 100%;
  min-height: 6vh;
  background-color: black;
  position: fixed;
  padding: 15px 6vw;
  z-index: 100;
  transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.hiddenNavbar {
    transform: translateY(-100%);
  }
  .logo {
    max-width: 40vw;
    max-height: 8vh;
    color: white;
    @include backgroundDefault;
    @include flex;
    flex-direction: row;
    text-align: center;
    flex: 2;
    &:hover {
      cursor: pointer;
    }
    h3 {
      text-transform: uppercase;
      font-size: 24px;
      letter-spacing: 2px;
      font-weight: bolder;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  .back__wrapper {
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .arrow {
      background-image: url("../../assets/images/icons/arrow.png");
      @include backgroundDefault;
      width: 36px;
      height: 36px;
      margin-right: 15px;
    }
    .arrow:hover,
    .back:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    @media (max-width: 700px) {
      .back {
        display: none;
      }
    }
  }
  .burger__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    height: 100%;
    p {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media (min-width: 450px) {
    .logo {
      max-width: 30vw;
    }
  }
  @media (min-width: 768px) {
    .logo {
      max-width: 25vw;
    }
  }
  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    .logo {
      max-width: 30vw;
      max-height: 10vh;
    }
  }
  @media (min-width: 1024px) {
    .logo {
      max-width: 20vw;
    }
  }
  @media (min-width: 1280px) {
    .logo {
      max-width: 15vw;
    }
  }
  @media (min-width: 1650px) {
    .logo {
      max-width: 10vw;
    }
  }
}
</style>
