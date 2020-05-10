<template>
  <div v-if="src || srcSet" class="ColoredImage" :style="`background-color: ${imageBackgroundColor};`">
    <img class="ColoredImage__img" :srcset="srcSet" :alt="alt" :src="src" />
  </div>
</template>

<script>
export default {
  name: 'ColoredImage',
  props: {
    srcSet: {
      type: String,
      required: false,
      default: ''
    },
    src: {
      type: [String, Boolean],
      required: false,
      default: false
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ColoredImage';

  .#{$c} {
    position: relative;
    width: 100%;

    &__img {
      object-fit: cover;
      width: 100%;
      display: block;
      mix-blend-mode: soft-light;
      mix-blend-mode: multiply;
      mix-blend-mode: hard-light;
    }
  }
</style>
