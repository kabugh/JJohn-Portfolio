<template>
  <header class="hero">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in slides" :key="slide.title">
          <div class="swiper-slide__content">
            <img
              :src="require(`@/assets/images/slides/${slide.frontImage}`)"
              :alt="slide.title"
            />
            <div class="swiper__description">
              <div class="swiper__controls">
                <div class="swiper__counter">
                  <span>{{ currentSlideIndex + 1 }} / {{ slides.length }}</span>
                </div>
                <div class="swiper__arrows">
                  <div
                    class="angel__arrow"
                    @click="() => slider.slidePrev()"
                  ></div>
                  <div
                    class="angel__arrow"
                    @click="() => slider.slideNext()"
                  ></div>
                </div>
              </div>
              <div class="swiper__content--container">
                <div class="swiper__content">
                  <h1>{{ slide.title }}</h1>
                  <p>{{ slide.description }}</p>
                </div>
                <button
                  class="thin"
                  :class="{ dark: !darkMode }"
                  @click="$router.push(slide.slug)"
                >
                  Zobacz więcej
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/swiper.scss";

@Component
export default class Slider extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slider: any = {};
  mounted() {
    this.$store.dispatch("fetchCategories").then(() => {
      this.slider = new Swiper(".swiper-container", {
        direction: "horizontal",
        spaceBetween: 0,
        grabCursor: true,
        speed: 600,
        slidesPerView: 1,
        centeredSlides: true
      });
    });
  }
  slides = [
    {
      title: "Obrazy",
      description:
        "Glamora Collection X develops through themes such as nature.",
      frontImage: "slide1.jpg",
      slug: "/obrazy"
    },
    {
      title: "Rzeźby",
      description: "test",
      frontImage: "slide2.jpg",
      slug: "/rzezby"
    }
    // {
    //   title: "Bizuteria",
    //   description: "test",
    //   image: "3.jpg",
    //   slug: "/bizuteria"
    // }
  ];

  // get slides() {
  //   return this.$store.getters.categories;
  // }

  get currentSlideIndex() {
    return this.slider.activeIndex;
  }

  get darkMode() {
    return this.$store.getters.darkMode;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.hero {
  width: 100%;
  height: 100vh;
  padding-top: $verticalPadding * 2;
  color: black;
  .swiper-container {
    height: 100%;
    .swiper-wrapper {
      height: 100%;
      .swiper-slide {
        .swiper-slide__content {
          @include flex;
          flex-direction: column;
          margin: 0 auto;
          max-width: 90%;
          height: 100%;
          img {
            width: 100%;
            height: 70%;
            max-height: 70%;
            object-fit: cover;
          }
          .swiper__description {
            width: 100%;
            height: 30%;
            @include flex;
            justify-content: flex-start;
            .swiper__controls {
              padding-top: $verticalPadding / 2;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .swiper__arrows {
                @include flex;
                flex-direction: row;
                height: 100%;
                .angel__arrow {
                  @include backgroundDefault;
                  background-size: contain;
                  background-image: url("../assets/images/icons/angel_arrow-black.png");
                  width: 28px;
                  height: 100%;
                  &:hover {
                    cursor: pointer;
                  }
                  &:first-of-type {
                    transform: rotate(180deg);
                  }
                }
              }
            }
            .swiper__content--container {
              margin-top: $verticalPadding / 3;
              width: 100%;
              @include flex;
              justify-content: space-between;
              align-items: flex-start;
              flex-direction: column;
              .swiper__content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: $verticalPadding / 4;
                h1 {
                  font-size: 1.25rem;
                  font-weight: 700;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                }
                p {
                  display: none;
                  padding: 0 $horizontalPadding / 8;
                  @media (min-width: 1024px) {
                    display: block;
                  }
                }
              }
              button {
                font-size: 0.75rem;
                padding: 12px;
                font-weight: 600;
                width: 100%;
              }
              @media (min-width: 360px) {
                .swiper__content h1 {
                  font-size: 1.75rem;
                }
              }
              @media (min-width: 450px) {
                margin-top: $verticalPadding;
                align-items: center;
                flex-direction: row;
                .swiper__content {
                  margin-bottom: 0;
                }
                button {
                  width: auto;
                }
              }
            }
          }
        }

        @media (min-width: 768px) {
          background-size: contain;
          .swiper-slide__content {
            max-width: 70%;
          }
        }
        @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
          .swiper-slide__content {
            max-width: 70%;
            img {
              height: 50%;
              max-height: 50%;
            }
          }
        }
      }
    }
  }
}
.dark
  .hero
  .swiper-container
  .swiper-wrapper
  .swiper-slide
  .swiper-slide__content
  .swiper__description {
  .swiper__controls {
    color: $dark-color;
    .swiper__arrows .angel__arrow {
      background-image: url("../assets/images/icons/angel_arrow.png");
    }
  }

  .swiper__content--container {
    .swiper__content {
      color: $dark-color;
    }
  }
}
</style>
