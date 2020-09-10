<template>
  <section class="product">
    <div class="product__container">
      <div class="product__content">
        <!-- <VueDragResize
          :isActive="isActive"
          :w="imageWidth"
          :h="imageHeight"
          @dragging="resize"
          :parentLimitation="true"
        > -->
        <div class="exit" @click="closeCreator" v-if="isCreatorActive">
          x
        </div>
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
            <!-- <vue-draggable-resizable
            :w="imageWidth"
            :h="imageHeight"
            @dragging="onDrag"
            @resizing="onResize"
            :parent="true"
            :draggable="isActive"
            :resizable="false"
            :active="isActive"
            class="product__image--container"
          >
            <div class="product__image--wrapper">
              <div class="product__image" ref="image"></div>
            </div>
          </vue-draggable-resizable> -->
          </div>
          <div
            class="product__image--wrapper"
            :style="{ borderWidth: `${activeFrame.size}px` }"
          >
            <div class="product__image" ref="image"></div>
          </div>
          <div
            class="product__description"
            :class="{ active: productDescription }"
            @click="startCreator"
          >
            <h2>{{ product.title }}</h2>
            <h4>Numer katalogowy: {{ product.catalogId }}</h4>
          </div>
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
                  :class="{ active: activeBackground === preview }"
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
                  class="preview active"
                  v-for="frame in frames"
                  :key="frame.title"
                  @click="activeFrame = frame"
                  :class="{ active: activeFrame === frame }"
                >
                  <!-- <img
                    :src="require(`@/assets/images/frames/${frame.image}`)"
                    :alt="frame.title"
                  /> -->
                </li>
              </ul>
            </div>
            <div class="passe__container">
              <p class="title">Dostosuj Passe-out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product__details">
      <div class="detailed__description author" v-if="product.credits">
        <ul>
          <li>
            <p><span>Autor</span> {{ product.credits.author }}</p>
          </li>
          <li>
            <p><span>Marszand</span> {{ product.credits.dealer }}</p>
          </li>
        </ul>
      </div>
      <div class="detailed__description">
        <h3>Szczegóły</h3>
        <ul>
          <li>
            <p><span>Materiał</span> {{ product.details.material }}</p>
          </li>
          <li>
            <p><span>Styl</span> {{ product.details.artType }}</p>
          </li>
          <li>
            <p><span>Technika</span> {{ product.details.technique }}</p>
          </li>
          <li>
            <p><span>Szerokość</span> {{ product.details.width }}</p>
          </li>
          <li>
            <p><span>Wysokość</span> {{ product.details.height }}</p>
          </li>
          <li>
            <p><span>Rok wydania</span> {{ product.details.releaseYear }}</p>
          </li>
        </ul>
      </div>
      <div
        class="detailed__description featuredOn"
        v-if="product.featuredOn.length > 0"
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
import { Component, Vue, Watch } from "vue-property-decorator";
import ProductModel from "@/utils/typings/ProductModel";
import gsap from "gsap";

import VueDraggableResizable from "vue-draggable-resizable";

@Component({
  components: { VueDraggableResizable }
})
export default class Product extends Vue {
  product: ProductModel = {
    title: "Zamieniony w skałę poruszam ustami",
    image: "wall2.jpg",
    catalogId: 155,
    description: "obraz",
    details: {
      material: "Płótno",
      artType: "Abstrakcja",
      technique: "akryl na płótnie",
      width: "100 cm",
      height: "100 cm",
      releaseYear: 2019
    },
    credits: {
      author: "Barbara Jankowska John",
      dealer: "Dariusz Adamowicz: +48604906519 galeria@sztukainspiracji.pl"
    },
    featuredOn: [
      "Wystawa towarzysząca Międzynarodowej Konferencji Germanistycznej 2019 Miejsce: Uniwersytet Wrocławski",
      "Wernisaż z muzyką // Barbara Jankowska-John & Avi Jazzar, Wrocławski Klub FORMATY, Wrocław 2019"
    ]
  };

  backgroundPreviews = [
    {
      title: "Czerwona",
      image: "wall2.jpg"
    },
    {
      title: "Biała",
      image: "wall1.jpg"
    },
    {
      title: "Czarna",
      image: "wall3.jpg"
    }
  ];
  frames = [
    { title: "Brak", image: "", size: 0 },
    { title: "Ramka 1", image: "", size: 5 },
    { title: "Ramka 2", image: "", size: 10 },
    { title: "Ramka 3", image: "", size: 20 },
    { title: "Ramka 4", image: "", size: 30 }
  ];

  activeArt = "";
  activeBackground = this.backgroundPreviews[0];
  activeFrame = this.frames[0];
  productDescription = false;
  isActive = false;
  isCreatorActive = false;

  width = 0;
  height = 0;
  x = 0;
  y = 0;

  imageWidth = 200;
  imageHeight = 200;

  created() {
    this.isCreatorActive = false;
  }

  mounted() {
    this.isCreatorActive = false;
    this.scrollAnimation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image = (this.$refs.image as any).getBoundingClientRect();
    this.imageWidth = image.width;
    this.imageHeight = image.height;

    window.addEventListener("resize", () => {
      this.imageWidth = image.width;
      this.imageHeight = image.height;
    });
  }

  onResize(x: number, y: number, width: number, height: number) {
    const initialWidth = this.width;
    const initialHeight = this.height;
    this.x = x;
    this.y = y;
    this.width = width > 0 ? width : initialWidth;
    this.height = height > 0 ? height : initialHeight;
  }

  onDrag(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  changeSize() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image = (this.$refs.image as any).getBoundingClientRect();
    this.imageWidth = image.width;
    this.imageHeight = image.height;
  }

  @Watch("isCreatorActive")
  blockOverflow() {
    this.isCreatorActive
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  scrollAnimation() {
    gsap.set(".product__image--wrapper", {
      transformOrigin: "center 25%"
    });
    gsap.to(".product__image--wrapper", {
      scrollTrigger: {
        start: "top top",
        end: "bottom .product__content",
        scrub: 0.4,
        pin: ".product__content"
      },
      scale: 0.2
      // onUpdate: this.changeSize
    });

    gsap.set(".product__background", {
      transformOrigin: "center 25%",
      scale: 2.5
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
          const progressThreshold = 0.85;
          if (progress >= progressThreshold && !this.productDescription) {
            this.productDescription = true;
          } else if (progress < progressThreshold && this.productDescription) {
            this.productDescription = false;
          }
        },
        scrub: 0.4,
        pin: ".product__content"
      },
      scale: 0.6,
      onLeave: this.isActive = true
    });
  }

  startCreator() {
    if (!this.isCreatorActive) {
      this.isCreatorActive = true;
      const tl = gsap.timeline();

      tl.to(".product__background--container", {
        position: "absolute",
        top: "-10%",
        left: "-15%",
        scale: 0.75
      });

      tl.set(".creator__container", {
        autoAlpha: 0,
        y: -50,
        display: "block"
      });

      tl.to(".creator__container", {
        duration: 1.5,
        ease: "power4",
        y: 0,
        autoAlpha: 1
      });
    }
  }

  closeCreator() {
    if (this.isCreatorActive) {
      this.isCreatorActive = false;

      const tl = gsap.timeline();
      tl.to(".creator__container", {
        autoAlpha: 0,
        y: -50
      });

      tl.set(".creator__container", {
        display: "none"
      });
      tl.to(".product__background--container", {
        top: "auto",
        left: "auto",
        scale: 1,
        ease: "power4"
      });

      tl.set(".product__background--container", {
        position: "static"
      });
    }
  }
}
</script>
<style lang="scss">
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
      }
      .product__background {
        z-index: 2;
        width: 100%;
        height: 100%;
        @include backgroundDefault;
        background-image: url("../../assets/images/walls/wall1.jpg");
        .product__image--container {
          width: 100%;
          height: 100vh;
        }
      }
      .product__image--wrapper {
        z-index: 3;
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        border: solid black;
        border-width: 0;
        &.vertical {
          width: 50vw;
          margin: 0 auto;
        }
        .product__image {
          width: 100%;
          height: 100%;
          @include backgroundDefault;
          background-image: url("../../assets/images/paintings/1.jpg");
        }
      }
      .product__description {
        z-index: 1;
        position: absolute;
        left: 50%;
        bottom: 3vh;
        transform: translate(-50%, -50%);
        @include flex;
        text-align: center;
        opacity: 0;
        transition: opacity 0.2s cubic-bezier(0.65, 0, 0.35, 1);
        h2 {
          font-size: 2.5rem;
          font-weight: 600;
          line-height: 1;
        }
        h4 {
          font-size: 1.75rem;
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
        position: absolute;
        bottom: 0;
        right: 0;
        max-width: 35%;
        height: 100%;
        padding: $verticalPadding $horizontalPadding / 4;
        z-index: 2;
        margin-left: auto;

        .creator__content {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: 1.5fr 1fr 1fr;
          column-gap: $verticalPadding / 2;
          row-gap: $verticalPadding / 2;
          .title {
            width: max-content;
          }

          .previews__container,
          .frames__container {
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
            &.border__previews {
              height: 100%;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(auto-fit, 2rem);
            }
            .preview {
              width: 100%;
              height: 100%;
              border: 2px solid white;
              transition: border-color 0.25s ease-in-out;
              &.active {
                border-color: black;
              }
              &:hover {
                border-color: black;
                cursor: pointer;
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
          padding: 0 $horizontalPadding / 2 10px $horizontalPadding / 8;
          border-bottom: 1px solid;
          p {
            font-size: 0.875rem;
            white-space: nowrap;
            span {
              font-size: 0.75rem;
              font-weight: 600;
              text-transform: uppercase;
              width: 150px;
              display: inline-block;
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
</style>
