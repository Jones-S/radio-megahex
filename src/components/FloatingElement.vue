<template>
  <div class="FloatingElement">
    <VueDragResize
      v-if="ready"
      :isActive="isActive"
      :w="initialWidth"
      :h="initialHeight"
      :x="initialXPosition"
      :y="initialYPosition"
      :z="zIndex"
      :aspectRatio="keepAspectRatio"
      :isDraggable="true"
      @resizing="resize"
      @dragging="resize"
      @activated="activate"
      @deactivated="deactivate"
      :sticks="['tr','tl','bl','br']"
      class="FloatingElement__drag-box"
    >
      <div v-if="src" class="FloatingElement__content">
        <button class="FloatingElement__button" @click="destroy">Close
          <div class="FloatingElement__border">
            <div class="FloatingElement__bar"></div>
            <div class="FloatingElement__bar FloatingElement__bar--left"></div>
          </div>
        </button>
        <div class="FloatingElement__img-wrap">
          <div v-if="src" class="FloatingElement__img" :style="`background-color: ${imageBackgroundColor}; background-image: url('${src}');`" />
        </div>
      </div>
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

const onload2promise = (img) => {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

const addImageProcess = async (src) => {
  let img = new Image()
  let imgPromise = onload2promise(img)
  img.src = src
  await imgPromise
  const { height, width } = img
  return { height, width }
}

export default {
  name: 'FloatingElement',
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
    },
    imageBackgroundColor: {
      type: String,
      required: false,
      default: '#df4f41'
    }
  },
  data() {
    return {
      initialWidth: false,
      initialHeight: false,
      initialXPosition: false,
      initialYPosition: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      zIndex: 10,
      isActive: false,
      keepAspectRatio: true,
      documentWidth: false,
      documentHeight: false,
      distanceToTop: 150 // relatively random
    }
  },
  computed: {
    ready() {
      return this.initialWidth && this.initialHeight && this.initialXPosition && this.initialYPosition
    }
  },
  async mounted() {
    await this.setInitialSize()
    this.setInitialPosition()
  },
beforeDestroy () {
  this.$el.parentNode.removeChild(this.$el)
},
  methods: {
    async setInitialSize() {
      // Create image programmatically (use promises to use async await)
      const imageDimensions = await addImageProcess(this.src)

      // create initial size
      const aspectRatio = imageDimensions.width / imageDimensions.height

      this.documentWidth = document.body.clientWidth
      this.documentHeight = document.body.clientHeight
      const browserHeight = window.innerHeight

      const smallerWindowSideSize = this.documentWidth > browserHeight ? browserHeight : this.documentWidth

      // determine width of screen, to not create images bigger than a fraction of the smaller browser side
      const maxWidth = smallerWindowSideSize / 3

      // set initial size
      this.initialWidth = getRandomInt(150, maxWidth)
      this.initialHeight = this.initialWidth / aspectRatio
    },
    setInitialPosition() {
      const maxXPosition = this.documentWidth - this.initialWidth
      this.initialXPosition = getRandomInt(1, maxXPosition)

      let maxYPosition = this.documentHeight - this.initialHeight
      maxYPosition = maxYPosition > this.distanceToTop && maxYPosition >= 0 ? maxYPosition : this.distanceToTop
      this.initialYPosition = getRandomInt(this.distanceToTop, maxYPosition)
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    activate() {
      this.isActive = true
      this.zIndex = 100
    },
    deactivate() {
      console.log('deactivate')
      this.isActive = false
    },
    destroy() {
      this.$destroy()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FloatingElement';

  $c-floating-element-button-size: 3.5rem;

  .#{$c} {
    &__drag-box {
      z-index: 10;

      &--is-active {
        z-index: 20;
      }
    }

    &__button {
      @include reset-button;
      display: inline-block;
      position: absolute;
      z-index: 2;
      padding: 0;
      text-indent: -9999px;
      width: auto;
      right: $c-floating-element-button-size;
      top: -  ($c-floating-element-button-size - 0.5rem);
    }

    &__content,
    &__img-wrap {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      position: relative;
    }

    &__img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      background-blend-mode: hard-light;
      // mix-blend-mode: multiply;
      display: block;
      position: absolute;
      background-size: cover;
    }

    &__border {
      width: $c-floating-element-button-size;
      height: $c-floating-element-button-size;
      background-color: $s-color-white;
      border: 1px solid $s-color-black;
      position: absolute;
      right: 0;
    }

    &__bar {
      height: $c-floating-element-button-size + 1.1rem; // optical pythagoras
      width: 1px;
      background-color: $s-color-black;
      transform-origin: top left;
      transform: rotate(45deg);
      Z-index: 1;
      position: absolute;
      right: 0;

      &--left {
        transform: rotate(-45deg);
        left: 0;
      }
    }
  }
</style>
