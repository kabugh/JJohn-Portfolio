<template>
  <header class="hero">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in slides" :key="slide.title">
          <div class="swiper-slide__content">
            <img
              :src="require(`@/assets/images/paintings/${slide.image}`)"
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
                <button class="dark thin" @click="$router.push(slide.slug)">
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
  slider: any = {};
  mounted() {
    this.slider = new Swiper(".swiper-container", {
      direction: "horizontal",
      spaceBetween: 0,
      grabCursor: true,
      speed: 600,
      slidesPerView: 1,
      centeredSlides: true
    });
  }
  slides = [
    {
      title: "Obrazy",
      description:
        "Glamora Collection X develops through themes such as nature.",
      image: "1.jpg",
      slug: "/obrazy"
    },
    {
      title: "Rzeźby",
      description: "test",
      image: "1.jpg",
      slug: "/rzezby"
    },
    {
      title: "Bizuteria",
      description: "test",
      image: "1.jpg",
      slug: "/bizuteria"
    }
  ];

  get currentSlideIndex() {
    return this.slider.activeIndex;
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
          max-width: 70%;
          margin: 0 auto;
          height: 100%;

          img {
            width: 100%;
            min-height: 70%;
            height: 70%;
            max-height: 70%;
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
                  background-image: url("../assets/images/icons/angel_arrow.png");
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
              margin-top: $verticalPadding;
              width: 100%;
              @include flex;
              justify-content: space-between;
              flex-direction: row;
              .swiper__content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                h1 {
                  font-size: 1.75rem;
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
              }
            }
          }
        }
      }
    }
  }
}
</style>
