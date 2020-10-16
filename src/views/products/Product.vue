<template>
  <section class="product">
    <div class="product__container" v-if="product">
      <div class="product__content">
        <div class="product__background--container">
          <div
            class="product__background"
            :style="{
              backgroundImage:
                'url(' +
                require(`@/assets/images/walls/${activeBackground.image}`) +
                ')'
            }"
            ref="background"
          >
            <div
              class="product__info--container"
              :class="{ active: productInfo && !isCreatorActive }"
            >
              <div class="product__info--content">
                <img :src="availabilityIconSource(true, darkMode)" alt="" />
                <p>{{ true ? "dostępny" : "niedostępny" }}</p>
              </div>
              <div class="product__info--content">
                <button
                  type="button"
                  class="creatorButton dark"
                  @click="startCreator"
                >
                  Uruchom wizualizator
                </button>
              </div>
              <div class="product__info--content">
                <img
                  :src="
                    require(darkMode
                      ? '@/assets/images/icons/printerBlack.png'
                      : '@/assets/images/icons/printerWhite.png')
                  "
                  alt="printer"
                />
                <p>Zamów reprodukcję</p>
              </div>
            </div>
          </div>
          <div
            class="product__image--wrapper"
            :class="dimensions(product.image.fields.file.details.image)"
          >
            <div
              class="product__image"
              ref="image"
              :class="{
                transitions__active: isCreatorActive,
                passe__active: activePasse !== null,
                frame__active: activeFrame !== null
              }"
              :style="{
                transform: `scale(${1 - passeRange * 0.05})`,
                backgroundImage: `url(${product.image.fields.file.url})`
              }"
            ></div>
            <div
              class="passe-partout"
              :class="{
                frame__active: activeFrame !== null,
                transitions__active: activeFrame !== null
              }"
              :style="{
                backgroundColor: this.activePasse
              }"
            ></div>
            <div class="frame__container" v-if="activeFrame !== null">
              <div
                v-for="(direction, index) in frameDirections"
                :key="index"
                :class="direction"
                :style="{
                  backgroundImage:
                    'url(' +
                    require(`@/assets/images/frames/f${activeFrame.id}/${direction}.png`) +
                    ')'
                }"
              ></div>
            </div>
            <div
              class="scroll__indicator"
              :class="{ active: displayScrollIndicator }"
              v-scroll-to="{ el: '.product__description', offset: 50 }"
            >
              <img src="@/assets/images/icons/mouse.png" alt="mouse" />
              <p>Scrolluj lub kliknij</p>
            </div>
          </div>
          <div
            class="product__description"
            :class="{ active: productDescription }"
          >
            <h2>{{ product.title }}</h2>
            <h4>Numer katalogowy: {{ product.catalogId }}</h4>
          </div>
          <!-- <div class="creatorPopUp__container">
            <p>Sprawdź dzieło w wizualizatorze</p>
          </div> -->
        </div>
        <div class="creator__container" ref="creator">
          <div class="creator__content">
            <div class="previews__container">
              <p class="title">Wybierz tło</p>
              <ul class="background__previews">
                <li
                  class="preview"
                  v-for="preview in backgroundPreviews"
                  :key="preview.title"
                  @click="activeBackground = preview"
                  :class="{
                    active: activeBackground === preview,
                    dark: darkMode
                  }"
                >
                  <img
                    :src="require(`@/assets/images/walls/${preview.image}`)"
                    :alt="preview.title"
                  />
                </li>
              </ul>
            </div>

            <div class="frames__container">
              <p class="title">Dostosuj ramkę</p>
              <ul class="background__previews border__previews">
                <li
                  class="preview empty"
                  @click="activeFrame = null"
                  :class="{ active: activeFrame === null, dark: darkMode }"
                >
                  brak
                </li>
                <li
                  class="preview"
                  v-for="frame in frames"
                  :key="frame.title"
                  @click="activeFrame = frame"
                  :class="{ active: activeFrame === frame, dark: darkMode }"
                >
                  <img
                    :src="
                      require(`@/assets/images/frames/f${frame.id}/top.png`)
                    "
                    :alt="frame.title"
                  />
                </li>
              </ul>
            </div>
            <div class="passe__container">
              <div class="passeTitle__container">
                <p class="title">Dostosuj passe-partout</p>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  v-model="passeRange"
                  v-if="activePasse !== null"
                />
              </div>
              <ul class="background__previews passe__previews">
                <li
                  class="preview empty"
                  @click="
                    activePasse = null;
                    passeRange = 0;
                  "
                  :class="{ active: activePasse === null, dark: darkMode }"
                >
                  brak
                </li>
                <li
                  class="preview"
                  v-for="(passe, j) in passes"
                  :key="j"
                  @click="activePasse = passe"
                  :class="{ active: activePasse === passe, dark: darkMode }"
                  :style="{ backgroundColor: passe }"
                ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product__details">
      <div
        class="detailed__description author"
        v-if="product && (product.author || product.dealer)"
      >
        <ul>
          <li v-if="product.author">
            <p><span>Autor</span> {{ product.author }}</p>
          </li>
          <li v-if="product.dealer">
            <p><span>Marszand</span> {{ product.dealer }}</p>
          </li>
        </ul>
      </div>
      <div class="detailed__description" v-if="product && product.details">
        <h3>Szczegóły</h3>
        <ul>
          <li v-if="product.details.fields.material">
            <p><span>Materiał</span> {{ product.details.fields.material }}</p>
          </li>
          <li v-if="product.details.fields.artType">
            <p><span>Styl</span> {{ product.details.fields.artType }}</p>
          </li>
          <li v-if="product.details.fields.technique">
            <p><span>Technika</span> {{ product.details.fields.technique }}</p>
          </li>
          <li v-if="product.details.fields.width">
            <p><span>Szerokość</span> {{ product.details.fields.width }}</p>
          </li>
          <li v-if="product.details.fields.height">
            <p><span>Wysokość</span> {{ product.details.fields.height }}</p>
          </li>
          <li v-if="product.details.fields.releaseYear">
            <p>
              <span>Rok wydania</span>
              {{ product.details.fields.releaseYear }}
            </p>
          </li>
        </ul>
      </div>
      <div
        class="detailed__description featuredOn"
        v-if="product && product.featuredOn"
      >
        <h3>Prezentowany na wystawach</h3>
        <ul>
          <li v-for="(item, index) in product.featuredOn" :key="index">
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ProductModel from "@/utils/typings/ProductModel";
import gsap from "gsap";

import VueDraggableResizable from "vue-draggable-resizable";

@Component({
  components: { VueDraggableResizable }
})
export default class Product extends Vue {
  @Prop() product!: ProductModel;

  frameDirections = ["top", "bottom", "left", "right", "tl", "tr", "bl", "br"];
  backgroundPreviews = [
    {
      title: "Czerwona",
      image: "wall2.jpg"
    },
    {
      title: "Czarna",
      image: "wall3.jpg"
    }
  ];
  frames = [
    { title: "Ramka 1", id: 1 },
    { title: "Ramka 2", id: 2 },
    { title: "Ramka 3", id: 3 },
    { title: "Ramka 4", id: 4 }
  ];

  passes = ["#cfbeb1", "#051767", "#000000", "#cccccc"];

  activeArt = "";
  activeBackground = this.backgroundPreviews[0];
  activeFrame = null;
  activePasse = null;
  passeRange = 0;

  displayScrollIndicator = true;
  productDescription = false;
  productInfo = false;
  isActive = false;

  created() {
    this.isCreatorActive = false;
  }

  async mounted() {
    if (this.product === undefined) {
      await this.$store.dispatch("fetchWork", {
        category: this.$route.params.category,
        catalogId: this.$route.params.id
      });
      this.product = this.currentWork;
      this.scrollAnimation();
    } else this.scrollAnimation();

    this.isCreatorActive = false;
  }

  @Watch("isCreatorActive")
  blockOverflow() {
    this.isCreatorActive
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  scrollAnimation() {
    const verticalMobile = window.matchMedia("(max-width: 450px)");

    // const imageWrapper = document.querySelector(".product__image--wrapper");
    // const verticalBiggerScreen = window.matchMedia("(min-width: 768px)");

    gsap.set(".product__background", {
      transformOrigin: "center 25%",
      scale: 2.5
    });

    gsap.to(".product__image--wrapper", {
      scrollTrigger: {
        start: "top top",
        end: "bottom .product__content",
        scrub: 0.4,
        pin: ".product__content"
      },
      scale: 0.2
    });

    gsap.to(".product__background", {
      scrollTrigger: {
        start: "top .product__content",
        end: "bottom .product__content",
        toggleClass: {
          targets: ".product__description",
          className: "inactive"
        },
        onUpdate: ({ progress }) => {
          console.log(progress);
          const scrollThreshold = 0.05;
          const navThreshold = verticalMobile.matches ? 0.8 : 0.6;
          const descThreshold = verticalMobile.matches ? 0.8 : 0.85;
          const productInfoThreshold = verticalMobile.matches ? 0.85 : 0.9;

          if (progress >= scrollThreshold && this.displayScrollIndicator) {
            this.displayScrollIndicator = false;
          } else if (
            progress < scrollThreshold &&
            !this.displayScrollIndicator
          ) {
            this.displayScrollIndicator = true;
          }

          if (progress >= navThreshold && !this.displaySlimNav) {
            this.displaySlimNav = true;
          } else if (progress < navThreshold && this.displaySlimNav) {
            this.displaySlimNav = false;
          }

          if (progress >= descThreshold && !this.productDescription) {
            this.productDescription = true;
          } else if (progress < descThreshold && this.productDescription) {
            this.productDescription = false;
          }

          if (progress >= productInfoThreshold && !this.productInfo) {
            this.productInfo = true;
          } else if (progress < productInfoThreshold && this.productInfo) {
            this.productInfo = false;
          }
        },
        scrub: 0.4,
        pin: ".product__content"
      },
      scale: 0.6
    });
  }

  startCreator() {
    if (!this.isCreatorActive) {
      const mobileView = window.matchMedia("(max-width: 450px)");
      this.$scrollTo(".product__description", 2000, {
        offset: 50
      });
      this.isCreatorActive = true;
      const tl = gsap.timeline();
      if (!mobileView.matches) {
        tl.to(".product__background--container", {
          position: "absolute",
          top: "-10%",
          left: "-15%",
          scale: 0.75
        });
      }

      tl.set(".creator__container", {
        autoAlpha: 0,
        y: -50,
        display: "block"
      });

      tl.to(".creator__container", {
        duration: mobileView ? 0.75 : 1.5,
        ease: "power4",
        y: 0,
        autoAlpha: 1
      });
    }
  }

  dimensions(image: { width: number; height: number }) {
    return image.width > image.height ? "horizontal" : "vertical";
  }

  availabilityIconSource(isAvailable: boolean, darkMode: boolean) {
    if (isAvailable)
      return darkMode
        ? require("../../assets/images/icons/availableWhite.png")
        : require("../../assets/images/icons/availableBlack.png");
    else
      return darkMode
        ? require("../../assets/images/icons/unavailableWhite.png")
        : require("../../assets/images/icons/unavailableBlack.png");
  }

  get currentWork() {
    return this.$store.getters.currentWork;
  }

  set currentWork(value) {
    this.$store.commit("setCurrentWork", value);
  }

  get darkMode() {
    return this.$store.getters.darkMode;
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
<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.product {
  width: 100%;
  color: black;
  // overflow: hidden;
  .product__container {
    width: 100%;
    height: 200vh;
    .product__content {
      width: 100%;
      height: 100vh;
      position: relative;
      .exit {
        width: 48px;
        height: 48px;
        position: absolute;
        left: 4vh;
        top: 4vh;
        font-size: 3rem;
        z-index: 10;
      }
      .product__background--container {
        position: relative;
        width: 100%;
        height: 100vh;
        z-index: 1;
        @include flex;
        .creatorPopUp__container {
          background-color: $bg-dark-light;
          color: white;
          max-width: $verticalPadding * 3;
          position: absolute;
          right: $verticalPadding;
          bottom: $verticalPadding;
          @include flex;
          border-radius: 10px;
          padding: $verticalPadding / 4;
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
          p {
            text-align: center;
            line-height: 1.25;
            font-size: 0.875rem;
          }
        }
      }
      .product__background {
        z-index: 2;
        width: 100%;
        height: 100%;
        @include backgroundDefault;
        background-image: url("../../assets/images/walls/wall1.jpg");
        position: relative;
        .product__image--container {
          width: 100%;
          height: 100vh;
        }
        .product__info--container {
          position: absolute;
          bottom: -$verticalPadding * 3 / 2;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: $verticalPadding / 3;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1);
          &.active {
            opacity: 1;
          }
          .product__info--content {
            flex: 1;
            @include flex;
            flex-direction: row;
            &:first-of-type {
              justify-content: flex-start;
            }
            &:last-of-type {
              justify-content: flex-end;
            }
            img {
              width: 32px;
              height: 32px;
            }
            p {
              font-size: 1.5rem;
              margin-left: 1rem;
            }
          }
        }
      }
      .product__image--wrapper {
        z-index: 3;
        width: 100%;
        height: 100vh;
        position: absolute;
        @include flex;
        top: 0;
        $frameSize: 3vw;
        $mobileFrameSize: 8vw;
        transform-origin: center 25%;
        transition: background-color 0.15s linear 0.3s;
        &.vertical {
        }
        .product__image {
          z-index: 2;
          width: 100%;
          height: 100%;
          @include backgroundDefault;
          background-image: url("../../assets/images/paintings/1.jpg");
          &.transitions__active {
            transition: width 0.3s cubic-bezier(0.65, 0, 0.35, 1),
              height 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          }

          &.frame__active,
          &.passe__active {
            width: calc(100% - 2 * #{$frameSize});
            height: calc(100% - 2 * #{$frameSize});
          }
          &.passe__active.frame__active {
            width: calc(100% - 4 * #{$frameSize});
            height: calc(100% - 4 * #{$frameSize});
          }
          @media (max-width: 768px) and (min-height: 650px) {
            &.frame__active,
            &.passe__active {
              width: calc(100% - 2 * #{$mobileFrameSize});
              height: calc(100% - 2 * #{$mobileFrameSize});
            }
            &.passe__active.frame__active {
              width: calc(100% - 4 * #{$mobileFrameSize});
              height: calc(100% - 4 * #{$mobileFrameSize});
            }
          }
        }
        .passe-partout {
          z-index: 1;
          position: absolute;
          background-color: #cfbeb1;
          width: 100%;
          height: 100%;
          transition: width 0.3s cubic-bezier(0.65, 0, 0.35, 1),
            height 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          &.frame__active {
            width: calc(100% - 2 * #{$frameSize});
            height: calc(100% - 2 * #{$frameSize});
            @media (max-width: 768px) and (min-height: 650px) {
              width: calc(100% - 2 * #{$mobileFrameSize});
              height: calc(100% - 2 * #{$mobileFrameSize});
            }
          }
        }
        .frame__container {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          > div {
            position: absolute;
            background-position: center;
            background-repeat: repeat;
          }
          .top,
          .bottom {
            width: 100%;
            height: $frameSize;
            background-size: auto 100%;
          }
          .top {
            top: 0;
          }
          .bottom {
            bottom: 0;
          }
          .left,
          .right {
            width: $frameSize;
            height: 100%;
            background-size: 100% auto;
          }
          .left {
            left: 0;
          }
          .right {
            right: 0;
          }
          .tl,
          .tr,
          .bl,
          .br {
            width: $frameSize;
            height: $frameSize;
            background-size: 100% 100%;
          }
          .tl {
            top: 0;
            left: 0;
          }
          .tr {
            top: 0;
            right: 0;
          }
          .bl {
            bottom: 0;
            left: 0;
          }
          .br {
            bottom: 0;
            right: 0;
          }

          @media (max-width: 768px) and (min-height: 650px) {
            .top,
            .bottom {
              height: $mobileFrameSize;
            }

            .left,
            .right {
              width: $mobileFrameSize;
            }
            .tl,
            .tr,
            .bl,
            .br {
              width: $mobileFrameSize;
              height: $mobileFrameSize;
            }
          }
        }
        .scroll__indicator {
          position: absolute;
          bottom: 0;
          opacity: 0;
          z-index: 2;
          padding-bottom: $verticalPadding / 4;
          @include flex;
          flex-direction: row;
          transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          transform: translateY(10px);
          &.active {
            transform: translateY(0);
            opacity: 1;
          }
          &:hover {
            cursor: pointer;
          }
          img {
            width: 28px;
            height: 28px;
            object-fit: cover;
            -webkit-animation: bounce 1.5s infinite
              cubic-bezier(0.65, 0, 0.35, 1);
            animation: bounce 1.5s infinite cubic-bezier(0.65, 0, 0.35, 1);
          }
          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-8px);
            }
            50% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @-webkit-keyframes bounce {
            0% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-8px);
            }
            50% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          p {
            font-size: 0.6rem;
            font-weight: 600;
            text-transform: uppercase;
            color: white;
            margin-left: 5px;
          }
        }
      }
      .product__description {
        z-index: 1;
        position: absolute;
        min-width: 80%;
        left: 50%;
        bottom: 0;
        padding: $verticalPadding / 4;
        transform: translate(-50%, -50%);
        @include flex;
        text-align: center;
        opacity: 0;
        transition: opacity 0.2s cubic-bezier(0.65, 0, 0.35, 1);
        h2 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1;
        }
        h4 {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1;
          margin-top: $verticalPadding / 2;
        }
        &.active {
          transform: translate(-50%, -50%);
          opacity: 1;
        }
      }
      .creator__container {
        display: none;
        position: fixed;
        bottom: 0;
        background-color: white;
        max-width: 100%;
        height: 100%;
        padding: $verticalPadding * 2 $horizontalPadding / 4 $verticalPadding
          $horizontalPadding / 4;
        z-index: 2;
        margin-left: auto;
        @media (min-width: 768px) and (min-height: 500px),
          (max-width: 850px) and (max-height: 450px) and (orientation: landscape),
          (min-width: 700px) and (max-width: 720px) and (max-height: 540px) {
          position: absolute;
          background-color: transparent;
          right: 0;
          max-width: 35%;
          padding: $verticalPadding $horizontalPadding / 4;
        }
        .creator__content {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: auto auto 1fr;
          column-gap: $verticalPadding / 2;
          row-gap: $verticalPadding / 2;
          .title {
            width: max-content;
          }

          .previews__container,
          .frames__container,
          .passe__container {
            height: 100%;
          }

          .background__previews {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(auto-fit, minmax(4rem, 8rem));
            column-gap: 2vh;
            row-gap: 2vh;
            padding: $verticalPadding / 4 0;
            align-items: center;
            justify-content: center;
            &.border__previews,
            &.passe__previews {
              height: 100%;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(auto-fit, 2rem);
            }
            .preview {
              width: 100%;
              height: 100%;
              border: 2px solid white;
              transition: border-color 0.25s ease-in-out;
              @include flex;
              text-transform: uppercase;
              font-size: 0.875rem;
              &.active {
                border-color: black;
              }
              &.empty {
                background-color: #eee;
              }
              &:hover {
                border-color: black;
                cursor: pointer;
              }

              &.dark {
                border-color: $bg-dark-light;
                &.active {
                  border-color: $dark-color;
                }
                &.empty {
                  background-color: $bg-dark-light;
                }
                &:hover {
                  border-color: $dark-color;
                }
              }

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }

      @media (min-width: 360px) {
        .product__description {
          h2 {
            font-size: 1.75rem;
          }
          h4 {
            font-size: 1.25rem;
          }
        }
      }

      @media (min-width: 768px) and (min-height: 500px) {
        .product__description {
          min-width: auto;
          bottom: 3vh;
          padding: 0;
          h2 {
            font-size: 2rem;
          }
          h4 {
            font-size: 1.5rem;
          }
        }
        .product__image--wrapper.vertical {
          max-width: 100%;
          @media (min-width: 960px) {
            max-width: 40%;
          }
          @media (min-width: 1024px) {
            max-width: 35%;
          }
        }
      }

      @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
        .product__description {
          @media (min-width: 800px) and (max-height: 400px) {
            min-width: 100%;
            bottom: 1vh;
            padding: 0;
          }
          @media (max-width: 700px) and (max-height: 400px) {
            bottom: -2vh;
          }
          @media (max-width: 650px) and (max-height: 350px) {
            min-width: 100%;
            bottom: 0;
            padding: 0;
            h2 {
              font-size: 1.5rem;
            }
            h4 {
              font-size: 1rem;
            }
          }
        }

        .product__image--wrapper {
          transform: scale(2);
          max-width: 50%;
        }

        .creator__container {
          .creator__content {
            .background__previews {
              grid-template-rows: repeat(auto-fit, minmax(2rem, 4rem));
            }
            @media (max-height: 400px) {
              .background__previews:not(.border__previews):not(.passe__previews) {
                grid-template-rows: repeat(auto-fit, minmax(1rem, 2rem));
              }
              .title {
                font-size: 0.875rem;
              }
            }
            @media (max-height: 350px) {
              .background__previews.border__previews,
              .background__previews.passe__previews {
                grid-template-rows: repeat(auto-fit, 1.5rem);
              }
            }
          }
        }
      }
      @media (max-width: 1024px) and (orientation: portrait) {
        .product__background {
          min-width: 120%;
        }
        .product__image--wrapper.horizontal {
          min-width: 200%;
        }
      }
      @media (max-width: 450px) and (orientation: portrait) {
        .product__background {
          min-width: 150%;
        }
        .product__image--wrapper.horizontal {
          min-width: 300%;
        }
      }

      @media (min-width: 1024px) and (min-height: 500px) {
        .product__description {
          min-width: 100%;
          bottom: 1vh;
          h2 {
            font-size: 2.5rem;
          }
        }
      }
      @media (min-width: 1280px) and (min-height: 500px) {
        .product__description {
          min-width: auto;
        }
      }
    }
  }
  .product__details {
    @include flex;
    justify-content: flex-start;
    min-height: 100vh;
    padding: $verticalPadding / 2 $horizontalPadding;
    .detailed__description {
      width: 100%;
      @include flex;
      margin: $verticalPadding / 2 0;
      h3 {
        font-size: 2rem;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
      }
      ul {
        display: grid;
        grid-template-columns: auto;
        column-gap: $horizontalPadding / 2;
        width: max-content;
        margin: $verticalPadding / 2 auto;

        li {
          line-height: 18px;
          margin-bottom: 15px;
          padding: 0 0 10px 0;
          border-bottom: 1px solid;
          p {
            font-size: 0.875rem;
            white-space: nowrap;
            span {
              font-size: 0.75rem;
              font-weight: 600;
              text-transform: uppercase;
              width: 120px;
              display: inline-block;
            }
          }
          @media (min-width: 360px) {
            padding: 0 $horizontalPadding / 2 10px $horizontalPadding / 8;
            p span {
              width: 150px;
            }
          }
        }
      }
      &.featuredOn,
      &.author {
        ul {
          grid-template-columns: auto;
          max-width: 100%;
          margin: $verticalPadding / 2 0;
          li {
            padding: $verticalPadding / 4 $horizontalPadding / 4;
            p {
              white-space: normal;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (min-height: 500px) {
    .product__details {
      .detailed__description {
        ul {
          grid-template-columns: repeat(2, auto);
        }
      }
    }
  }
}
.dark .product {
  color: $dark-color;
  .product__container .product__content .creator__container {
    background-color: $bg-dark;
  }
}
</style>
