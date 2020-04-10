<template>
  <div class="FloatingImages">
    <FloatingElement v-for="(image, index) in images" :key="index" :src="image.url" :alt="'megahex'" />
  </div>
</template>

<script>
import FloatingElement from './FloatingElement.vue'

export default {
  name: 'FloatingImages',
  components: {
    FloatingElement
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  mounted() {
    // console.log('images: ', this.images)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FloatingImages';

  .#{$c} {

  }
</style>
