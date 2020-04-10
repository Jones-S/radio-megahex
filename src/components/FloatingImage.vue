<template>
  <div class="FloatingImage">
    <VueDragResize
      :isActive="isActive"
      :w="initialWidth || 100"
      :h="initialHeight || 100"
      :z="zIndex"
      :aspectRatio="keepAspectRatio"
      :isDraggable="true"
      @resizing="resize"
      @dragging="resize"
      @activated="activate"
      @deactivated="deactivate"
      :sticks="['tr','tl','bl','br']"
      class="FloatingImage__drag-box"
    >
      <img ref="image" :src="src" :alt="alt" />
    </VueDragResize>
  </div>
</template>

<script>
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  name: 'FloatingImage',
  components: {
    VueDragResize
  },
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
    alt: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      initialWidth: false,
      initialHeight: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      zIndex: 10,
      isActive: false,
      keepAspectRatio: true
    }
  },
  mounted() {
    // create initial size
    const imageHeight = this.$refs.image.naturalHeight || 400
    const imageWidth = this.$refs.image.naturalWidth || 400
    const aspectRatio = imageWidth / imageHeight

    // set initial size
    this.initialWidth = getRandomInt(300, 750)
    this.initialHeight = this.initialWidth / aspectRatio

  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    activate() {
      console.log('active')
      this.isActive = true
      this.zIndex = 100
    },
    deactivate() {
      this.isActive = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FloatingImage';

  .#{$c} {
    &__drag-box {
      z-index: 10;

      &--is-active {
        z-index: 20;
      }
    }

    img {
      width: 100%;
    }
  }
</style>
