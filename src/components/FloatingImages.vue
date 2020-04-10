<template>
  <div class="FloatingImages">
    <v-breakpoint>
      <div slot-scope="scope">
        <div v-if="scope.viewportWidth > 800">
          <FloatingElement v-for="(image, index) in images" :key="index" :src="image.url" :alt="'megahex'" />
        </div>
        <div v-else>
          <ColoredImage v-for="(image, index) in images" :key="index" :src-set="image.srcset" :alt="'megahex'" />
        </div>
      </div>
    </v-breakpoint>
  </div>
</template>

<script>
import { VBreakpoint } from 'vue-breakpoint-component'
import FloatingElement from './FloatingElement.vue'
import ColoredImage from './ColoredImage.vue'

export default {
  name: 'FloatingImages',
  components: {
    ColoredImage,
    FloatingElement,
    VBreakpoint
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
