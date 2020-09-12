<template>
  <section class="home">
    <Slider />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slider from "@/components/Slider.vue";

@Component({
  components: { Slider }
})
export default class Home extends Vue {}
</script>
<style lang="scss">
.home {
  width: 100%;
}
</style>
