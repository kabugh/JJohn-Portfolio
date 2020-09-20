<template>
  <section class="loading__overlay" ref="overlay">
    <div class="loading__overlay--container">
      <div class="loading__details--container">
        <div class="loading__logo"></div>
        <div class="loading__text">
          <h4 class="hidden">
            <span class="loadText">Wczytywanie dzieł sztuki</span>
          </h4>
        </div>
        <div class="spinner" ref="spinner">
          <div class="mask">
            <div class="maskedCircle"></div>
          </div>
        </div>
      </div>
      <div class="title__container">
        <h1 class="hidden" v-for="item in title" :key="item">
          <span class="text">{{ item }}</span>
        </h1>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import gsap from "gsap";
import slideAnimation from "@/utils/animations/slideAnimation";

@Component
export default class LoadingOverlay extends Vue {
  title = ["Barbara", "Jankowska", "John"];
  get overlayLoading() {
    return this.$store.getters.overlayLoading;
  }
  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
  }
  beforeCreate() {
    document.body.style.overflowY = "hidden";
  }
  mounted() {
    this.startAnimations();
    if (this.$route.path !== "/") {
      this.overlayLoading = false;
    }
  }

  startAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".text", { y: 0, duration: 1, stagger: 0.75 });

    tl.to(".title__container", {
      scale: 0.25,
      bottom: "-10%"
    });

    tl.set(".loading__logo", { y: -50 });
    tl.set(".spinner", { y: -50 });

    tl.to(".loading__logo", {
      autoAlpha: 1,
      y: 0
    });

    tl.to(".loadText", { y: 0, duration: 1 });
    tl.to(
      ".spinner",
      {
        autoAlpha: 1,
        y: 0,
        onComplete: () => (this.overlayLoading = false)
      },
      "-=0.5"
    );
  }

  @Watch("overlayLoading")
  hideOverlay() {
    slideAnimation.hideElement(this.$refs.overlay);
    const tl = gsap.timeline({ defaults: { ease: "power4" } });
    tl.to(".title__container", {
      autoAlpha: 0
    });
    tl.to(
      ".loading__details--container",
      {
        autoAlpha: 0
      },
      "-=0.5"
    );

    setTimeout(() => (document.body.style.overflowY = "visible"), 500);
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.loading__overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: black;
  @include flex;
  justify-content: flex-start;
  z-index: 101;
  .loading__overlay--container {
    @include flex;
    flex-direction: column;
    .title__container {
      position: absolute;
      @include flex;
      align-items: flex-start;
      flex-direction: column;
      bottom: 30%;
      h1 {
        font-size: 3.5rem;
        font-weight: 800;

        &.hidden {
          background: black;
          overflow: hidden;
        }

        &.hidden span {
          transform: translateY(100%);
          display: inline-block;
        }

        @media (min-width: 768px) and (min-height: 500px) {
          font-size: 5rem;
        }
        @media (min-width: 1280px) and (min-height: 500px) {
          font-size: 6rem;
        }
        @media (min-width: 1650px) and (min-height: 800px) {
          font-size: 7rem;
        }
      }
    }

    .loading__details--container {
      position: absolute;
      top: 20%;
      @include flex;
      .loading__logo {
        visibility: hidden;
        opacity: 0;
        width: 64px;
        height: 64px;
        background-image: url("../assets/images/logo.png");
        @include backgroundDefault;
        background-size: contain;
        margin-bottom: 5vh;
      }
      .loading__text {
        @include flex;
        h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: $verticalPadding;
          &.hidden {
            background: black;
            overflow: hidden;
          }

          &.hidden span {
            transform: translateY(100%);
            display: inline-block;
          }
        }
      }
      .maskedCircle {
        width: 20px;
        height: 20px;
        border-radius: 12px;
        border: 3px solid white;
      }
      .mask {
        width: 12px;
        height: 12px;
        overflow: hidden;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .spinner {
        visibility: hidden;
        opacity: 0;
        width: 26px;
        height: 26px;
        animation: spin 1s infinite linear;
      }
    }
  }
}
</style>
