<template>
  <div id="app" :class="['App']">
    <Logo />
    <AudioPlayer :src="src" :program="program"></AudioPlayer>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './components/Logo.vue'
import AudioPlayer from './components/AudioPlayer.vue'

export default {
  name: 'app',
  components: {
    AudioPlayer,
    Logo
  },
  data: () => {
    return {
      src: 'https://zzz.megahex.fm:8001/listen?type=.mp3'
    }
  },
  computed: {
    ...mapGetters('data', ['page']),
    program() {
      if (!this.page || !this.page.content || !this.page.content.broadcast) return '...'
      return this.page.content.broadcast
    }
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
}
</style>
