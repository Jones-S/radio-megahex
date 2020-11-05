<template>
  <div class="FloatingImages">
    <div v-if="breakpointCurrent.innerWidth > 800">
      <FloatingElement v-for="(image) in images" :key="image.url" :src="image.url">
        <ColoredImage :src-set="image.srcset" :alt="alt(image.alt)" />
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
</template>

<script>
import { mapState } from 'vuex'
import FloatingElement from './FloatingElement.vue'
import ColoredImage from './ColoredImage.vue'

export default {
  name: 'FloatingImages',
  components: {
    ColoredImage,
    FloatingElement,
  },
  props: {
    images: {
      type: Array,
      required: true
    },
  },
  computed: {
    ...mapState('ui', ['breakpointCurrent'])
  },
  methods: {
    alt(alt) {
      if (alt && alt.value) return alt.value
      return 'megahex.fm image'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FloatingImages';

  .#{$c} {

  }
</style>
