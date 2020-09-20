<template>
  <section class="products">
    <div class="products__container">
      <h1 data-aos="fade-up" data-aos-delay="400">
        {{ currentCategory.title }}
      </h1>
      <div class="macy__grid" data-aos="fade-up" data-aos-delay="600">
        <img
          v-for="(work, i) in currentCategory.works"
          :src="work.image.fields.file.url"
          :key="i"
          @click="
            $router.push({
              name: 'Product',
              params: { id: work.catalogId, product: work }
            })
          "
          :alt="work.title"
        />
      </div>
      <!-- <LoadingComponent /> -->
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Macy from "macy";
import LoadingComponent from "@/components/LoadingComponent.vue";

@Component({
  components: { LoadingComponent }
})
export default class Products extends Vue {
  macy: any = {};

  async mounted() {
    await this.$store.dispatch("fetchCategory", this.$route.params.category);
  }

  @Watch("currentCategory")
  initGrid() {
    console.log("reinit");
    this.macy = Macy({
      container: ".macy__grid",
      trueOrder: false,
      waitForImages: false,
      margin: 30,
      columns: 4,
      breakAt: {
        1650: 3,
        940: 2,
        450: 1
      }
    });
  }

  currentImage = "";

  get currentCategory() {
    return this.$store.getters.currentCategory;
  }

  get loading() {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.products {
  width: 100%;
  color: black;
  .products__container {
    padding: $verticalPadding * 5 / 2 $horizontalPadding * 3 / 4;
    overflow: hidden;
    h1 {
      font-size: 3rem;
      font-weight: 700;
      text-transform: capitalize;
    }
    .macy__grid {
      margin: $verticalPadding 0;
      overflow: hidden;
      img {
        width: 100%;
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
