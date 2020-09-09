<template>
  <section class="overlay">
    <div ref="overlay" class="overlay__container">
      <div class="overlay__wrapper">
        <ul class="navItems">
          <li class="item" v-for="item in filteredNavItems" :key="item.link">
            <span @click="$router.push(item.link)">{{ item.title }}</span>
          </li>
          <!-- <li class="socials__container item">
            <a
              :href="item.link"
              v-for="item in socialsItems"
              :key="item.link"
              target="_blank"
            >
              <img
                :src="require(`@/assets/images/icons/${item.icon}`)"
                alt="icon"
                class="unselectable"
              />
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface NavItem {
  title: string;
  link: string;
}

@Component
export default class NavOverlay extends Vue {
  navItems: NavItem[] = [
    {
      title: "Start",
      link: "/"
    },
    {
      title: "Produkty",
      link: "/products/test"
    }
  ];
  get filteredNavItems() {
    const fitleredItems: NavItem[] = [];
    this.navItems.forEach(item => {
      if (this.$route.path !== item.link) {
        fitleredItems.push(item);
      }
    });
    return fitleredItems;
  }

  get socialsItems() {
    return this.$store.getters.socialsItems;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
// enter/leave overlay animation
.navOverlay-enter-active,
.navOverlay-leave-active {
  transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.navOverlay-enter,
.navOverlay-leave-to {
  transform: translateY(100%);
}

.navOverlay-enter-to,
.navOverlay-leave {
  transform: translateY(0);
}

.overlay {
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  .overlay__container {
    height: 100%;
    width: 100%;
    color: white;
    background-color: $secondaryColor;
    .overlay__wrapper {
      padding: $verticalPadding * 2 4vh 4vh 4vh;
      @include flex;
      .navItems {
        padding: $verticalPadding / 2 0;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: $verticalPadding / 2;
        .item {
          font-size: 1.75rem;
          line-height: 1.5;
          :hover {
            cursor: pointer;
          }
        }
        .socials__container {
          @include flex;
          justify-content: flex-start;
          flex-direction: row;
          > a {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            padding: 1vh;
            transition: background-color 0.2s linear 0s;
            margin: 0 10px;
            &:hover {
              background-color: rgba(255, 255, 255, 0.1);
            }
            &:first-of-type {
              margin-left: -1vh;
            }
            &:last-of-type {
              margin-right: 0;
            }

            img {
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }

    @media (min-width: 360px) {
      .overlay__wrapper .navItems .item {
        font-size: 2.25rem;
      }
    }

    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      .overlay__wrapper {
        padding-top: $verticalPadding * 4;
        .navItems {
          grid-template-columns: repeat(2, 1fr);
          column-gap: $horizontalPadding;
          row-gap: $verticalPadding;
          .item {
            font-size: 2.25rem;
          }
        }
      }
    }
    @media (min-width: 800px) and (max-width: 850px) and (max-height: 400px) and (orientation: landscape) {
      .overlay__wrapper .navItems .item {
        font-size: 1.75rem;
      }
    }
    @media (max-width: 750px) and (max-height: 450px) and (orientation: landscape) {
      .overlay__wrapper .navItems .item {
        font-size: 2rem;
      }
    }
    @media (max-width: 650px) and (max-height: 450px) and (orientation: landscape) {
      .overlay__wrapper .navItems {
        row-gap: 4vh;
        .item {
          font-size: 1.75rem;
        }
      }
    }
  }
}
@media (min-width: 1280px) and (min-height: 500px) {
  .overlay {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .overlay__container {
      width: 100%;
      z-index: 0;
      grid-column: 2;
      .overlay__wrapper {
        align-items: flex-start;
        padding-left: 8vw;
        padding-right: 8vw;
        .navItems {
          .item {
            text-align: left;
            &:not(.socials__container) {
              display: inline;
              span {
                position: relative;
                &:hover:after {
                  width: 100%;
                }
                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  left: 0px;
                  background-color: white;
                  height: 0.2rem;
                  margin-top: 0.2rem;
                  transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
                  width: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  .navOverlay-enter,
  .navOverlay-leave-to {
    transform: translateX(100%);
  }

  .navOverlay-enter-to,
  .navOverlay-leave {
    transform: translateX(0);
  }
}
@media (min-width: 1650px) and (min-height: 500px) {
  .overlay .overlay__container .overlay__wrapper .navItems .item {
    font-size: 3rem;
    &.socials__container > a img {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
