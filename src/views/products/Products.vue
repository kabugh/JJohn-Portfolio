<template>
  <section class="products">
    <div class="products__container">
      <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
        {{ $route.params.category }}
      </h1>
      <div class="macy__grid">
        <!-- <img
          v-for="(work, i) in currentCategory.works"
          :src="work.image.fields.file.url"
          :key="work.catalogId + i"
          @click="
            $router.push({
              path: `/obrazy/${i + 1}`,
              params: { image: work.image.fields.file.url }
            })
          "
          :alt="work.title"
        /> -->
        <img
          v-for="(image, i) in images"
          :src="require(`@/assets/images/paintings/${image}`)"
          :key="i"
          @click="
            $router.push({
              path: `/obrazy/${i + 1}`,
              params: { image }
            })
          "
          :alt="i"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
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
  macy: any = {};
  gridLoaded = false;
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
        450: 1
      }
    });
    // this.$store
    //   .dispatch("fetchCategory", this.$route.params.category)
    //   .then(() => {
    //     this.macy.runOnImageLoad(() => {
    //       console.log("I only get called when all images are loaded");
    //       this.macy.recalculate(true, true);
    //     });
    //     console.log("test");
    //   });

    this.macy.on(this.macy.constants.EVENT_IMAGE_COMPLETE, () => {
      this.gridLoaded = true;
    });
  }

  currentImage = "";

  // get currentCategory() {
  //   return this.$store.getters.currentCategory;
  // }

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
    padding: $verticalPadding * 5 / 2 $horizontalPadding * 3 / 4;
    h1 {
      font-size: 3rem;
      font-weight: 700;
      text-transform: capitalize;
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
    @media (min-width: 768px) {
    }

    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      padding: $verticalPadding * 7 / 2 $horizontalPadding * 3 / 4;
    }
    @media (max-width: 650px) and (max-height: 350px) and (orientation: landscape) {
      h1 {
        font-size: 2.5rem;
      }
    }
  }
}
.dark .products {
  color: $dark-color;
}
</style>
