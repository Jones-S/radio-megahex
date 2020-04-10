<template>
  <div class="FloatingImages">
    <v-breakpoint>
      <div slot-scope="scope" v-if="scope.viewportWidth">
        <div v-if="scope.viewportWidth > 800">
          <FloatingElement v-for="(image, index) in images" :key="index" :src="image.url">
            <ColoredImage :src-set="image.srcset" :alt="'megahex'" />
          </FloatingElement>
          <!-- Proof of Concept for using any element as draggable item -->
          <!-- <FloatingElement :options="{ width: 300, height: 250 }">
            <Paragraph ref="paragraph" :content="'Ein Text ist nicht zu verachten, mein Junge, Ein Text ist nicht zu verachten, mein Junge, Ein Text ist nicht zu verachten, mein Junge, Ein Text ist nicht zu verachten, mein Junge'"/>
          </FloatingElement> -->
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
import Paragraph from './Paragraph.vue'

export default {
  name: 'FloatingImages',
  components: {
    Paragraph,
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
