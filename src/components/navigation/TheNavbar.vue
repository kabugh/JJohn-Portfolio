<template>
  <nav
    class="navbar"
    :class="{
      hiddenNavbar:
        (!showNavbar && !isNavOpen && !$route.meta.initialNav) ||
        (!$route.meta.displayNav && !isNavOpen)
    }"
  >
    <div class="back__wrapper" v-if="$route.path !== '/'">
      <div class="arrow" @click="$router.push('/')"></div>
    </div>
    <div class="back__wrapper" v-else>
      <ul>
        <li
          v-for="(item, index) in navItems"
          @click="$router.push(item.slug)"
          :key="index"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
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
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavItem from "@/utils/typings/NavItem";

@Component
export default class TheNavbar extends Vue {
  offset = 5;
  lastScrollPosition = 0;
  scrollValue = 0;
  showNavbar = false;

  navItems: NavItem[] = [
    { title: "obrazy", slug: "/obrazy" },
    { title: "rzeźby", slug: "/rzezby" },
    { title: "biżuteria", slug: "/bizuteria" }
  ];

  mounted() {
    if (this.$route.meta.initialNav) this.showNavbar = true;
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anchorPoint: any = document.querySelector("body");
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
  background-color: white;
  position: fixed;
  padding: 15px 6vw;
  z-index: 100;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1),
    background-color 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.hiddenNavbar {
    transform: translateY(-100%);
  }
  .logo {
    max-width: 36px;
    max-height: 36px;
    @media (min-width: 360px) {
      max-width: 48px;
      max-height: 48px;
    }
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
    color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .arrow {
      background-image: url("../../assets/images/icons/arrow_black.png");
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
    ul {
      @include flex;
      display: none;
      justify-content: flex-start;
      flex-direction: row;
      li {
        text-transform: uppercase;
        margin: 0 $horizontalPadding / 12;
        &:hover {
          cursor: pointer;
        }
      }
    }

    @media (min-width: 1280px) {
      ul {
        display: flex;
      }
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
    #nav-icon span {
      background-color: black;
    }
    p {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.dark .navbar {
  background-color: $bg-dark-secondary;
  .back__wrapper {
    .arrow {
      background-image: url("../../assets/images/icons/arrow.png");
    }
    ul {
      color: $dark-color;
    }
  }
  .burger__wrapper {
    #nav-icon span {
      background-color: $dark-color;
    }
  }
}
</style>
