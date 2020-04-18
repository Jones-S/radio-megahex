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
      :aspectRatio="true"
      :isDraggable="true"
      @resizing="resize"
      @dragging="resize"
      @activated="activate"
      @deactivated="deactivate"
      :sticks="['tr','tl','bl','br']"
      class="FloatingElement__drag-box"
    >
      <div class="FloatingElement__content">
        <button class="FloatingElement__button" @click="destroy">Close
          <div class="FloatingElement__border">
            <div class="FloatingElement__bar"></div>
            <div class="FloatingElement__bar FloatingElement__bar--left"></div>
          </div>
        </button>
        <div class="FloatingElement__img-wrap">
          <slot></slot>
          <!-- <div v-if="src" class="FloatingElement__img" :style="`background-color: ${imageBackgroundColor}; background-image: url('${src}');`" /> -->
        </div>
      </div>
    </VueDragResize>
  </div>
</template>

<script>
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)
import { draggableImageHelper } from '../mixins/helpers'

export default {
  name: 'FloatingElement',
  components: {
    VueDragResize
  },
  mixins: [draggableImageHelper],
  props: {
    src: {
      type: String,
      required: false,
      default: ''
    },
    alt: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    imageBackgroundColor: {
      type: String,
      required: false,
      default: '#df4f41'
    }
  },
  data() {
    return {
      ready: false,
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
      documentWidth: false,
      documentHeight: false,
      distanceToTop: 150 // relatively random
    }
  },
  async mounted() {
    // if we have an image we need to calculate the image size
    if (this.src) {
      const initialSize = await this.setInitialSize(this.src)
      this.initialWidth = initialSize.initialWidth
      this.initialHeight = initialSize.initialHeight
      const initialPosition = this.setInitialPosition(this.initialWidth, this.initialHeight, this.distanceToTop)
      this.initialXPosition = initialPosition.x
      this.initialYPosition = initialPosition.y
      this.ready = true
    } else {
      this.initialWidth = this.options && this.options.width ? this.options.width : 100,
      this.initialHeight = this.options && this.options.height ? this.options.height : 100,
      this.initialXPosition = this.options && this.options.xPos ? this.options.xPos : 100,
      this.initialYPosition = this.options && this.options.yPos ? this.options.yPos : 100,
      this.ready = true
    }
  },
beforeDestroy () {
  if(this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el)
  }
},
  methods: {
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
      cursor: move; /* fallback if grab cursor is unsupported */
      cursor: grab;

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

  // Overriding scoped child components with /deep/
  // https://bambielli.com/til/2018-08-19-how-to-target-child-components-with-scoped-css-in-vue/
  /deep/ .Paragraph {
    padding: $s-box-distance;
    padding-top: 2rem;
    background-color: $s-color-white;
    border: 1px solid $s-color-black;
    height: 100%;
    overflow-y: scroll;
  }
</style>
