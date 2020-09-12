<template>
  <section class="products">
    <div class="products__container">
      <h1>Obrazy</h1>
      <div class="macy__grid">
        <img
          v-for="(image, i) in images"
          :src="require(`@/assets/images/paintings/${image}`)"
          :key="i"
          :alt="i"
          @click="$router.push({ path: `/obrazy/${i + 1}`, params: { image } })"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Macy from "macy";

@Component
export default class Products extends Vue {
  macy = {};
  mounted() {
    this.macy = Macy({
      container: ".macy__grid",
      trueOrder: false,
      waitForImages: true,
      margin: 30,
      columns: 4,
      breakAt: {
        1650: 3,
        940: 2,
        400: 1
      }
    });
  }

  currentImage = "";

  images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg"
  ];
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.products {
  width: 100%;
  color: black;
  .products__container {
    padding: $verticalPadding * 5 / 2 $horizontalPadding;
    h1 {
      font-size: 3rem;
      font-weight: 700;
    }
    .macy__grid {
      margin: $verticalPadding 0;
      img {
        max-width: 100%;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
