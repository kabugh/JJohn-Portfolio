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
          <div class="product__image--wrapper">
            <div class="product__image" ref="image"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="product__details">
      <ul class="background__previews">
        <li
          class="preview"
          v-for="preview in backgroundPreviews"
          :key="preview.title"
          @click="activeBackground = preview"
        >
          <img
            :src="require(`@/assets/images/walls/${preview.image}`)"
            :alt="preview.title"
          />
        </li>
      </ul>
      <div class="product__description"></div>
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductModel from "@/utils/typings/ProductModel";
import gsap from "gsap";

import VueDraggableResizable from "vue-draggable-resizable";

@Component({
  components: { VueDraggableResizable }
})
export default class Product extends Vue {
  product: ProductModel = {
    title: "Obraz",
    image: "wall2.jpg",
    description: "obraz"
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

  activeArt = "";
  activeBackground = this.backgroundPreviews[0];

  isActive = false;

  width = 0;
  height = 0;
  x = 0;
  y = 0;

  imageWidth = 200;
  imageHeight = 200;

  mounted() {
    this.scrollAnimation();
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
    const image = (this.$refs.image as any).getBoundingClientRect();
    this.imageWidth = image.width;
    this.imageHeight = image.height;
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
      scale: 0.25
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
        scrub: 0.4,
        pin: ".product__content"
      },
      scale: 0.75,
      onLeave: this.isActive = true
    });
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.product {
  width: 100%;
  color: black;
  .product__container {
    width: 100%;
    height: 200vh;
    .product__content {
      width: 100%;
      height: 100vh;
      .product__background--container {
        position: relative;
        width: 100vw;
        height: 100vh;
      }
      .product__background {
        z-index: 1;
        width: 100%;
        height: 100%;
        @include backgroundDefault;
        background-image: url("../../assets/images/walls/wall1.jpg");
        .product__image--container {
          width: 100vw;
          height: 100vh;
        }
      }
      .product__image--wrapper {
        z-index: 2;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        .product__image {
          width: 100%;
          height: 100%;
          @include backgroundDefault;
          background-image: url("../../assets/images/paintings/003-2000.jpg");
        }
      }
    }
  }
  .product__details {
    @include flex;
    justify-content: flex-start;
    height: 100vh;
    padding: $verticalPadding / 2 $horizontalPadding;
    .background__previews {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
      grid-auto-rows: 1fr;
      column-gap: 3vh;
      row-gap: 3vh;
      padding-bottom: $verticalPadding;
      .preview {
        width: 100%;
        height: 100%;
        &:hover {
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
</style>
