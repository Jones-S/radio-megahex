<template>
  <div id="app" :class="['App']">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  },
  metaInfo:() => {
    const ogImageUrl = require('@/assets/og_image.jpg');
    return {
      title: 'Radio Megahex',
      htmlAttrs: {
        // reptilian: 'gator'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: 'Megahex.fm – Internetradio vom Feinsten' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:image', content: ogImageUrl },
        { name: 'og:image:width', content: 642 },
        { name: 'og:image:height', content: 640 },
        { name: 'og:image:alt', content: 'Megahex.fm – Internetradio vom Feinsten' }
      ]
    }
  },
}
</script>

<style lang="scss">
// Do not add 'scoped' here, because otherwise elements.page styling is not applied to all elements on the page
@import '@/assets/css/_generic.normalize';
@import '@/assets/css/_generic.fonts';
@import '@/assets/css/_generic.box-sizing';
@import '@/assets/css/global';
@import '@/assets/css/_elements.page';

$c: 'App';

.#{$c} {
  @include set-gutter('medium');
  height: 100%;
  min-height: 100vh;
  transition: background-color $s-animation-duration-default;

  @include mq($from: medium) {
    margin-left: 0;
  }
  @include mq($from: large) {
    margin-left: 0;
  }
}
</style>
