<template>
  <div id="app" :class="['App']">
    <Heading class="Heading" :level="1">megahex.fm</Heading>
    <AudioPlayer :src="src"></AudioPlayer>
    <router-view />
  </div>
</template>

<script>
import Heading from './components/Heading.vue'
import AudioPlayer from './components/AudioPlayer.vue'

export default {
  name: 'app',
  components: {
    Heading,
    AudioPlayer
  },
  data: () => {
    return {
      src: 'https://zzz.megahex.fm:8001/listen?type=.mp3'
    }
  },
  metaInfo:() => {
    const ogImageUrl = require('@/assets/covidnames_og.jpg');
    return {
      title: 'Radio Megahex',
      htmlAttrs: {
        // reptilian: 'gator'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: 'Radio Megahex!!' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:image', content: ogImageUrl },
        { name: 'og:image:width', content: 1080 },
        { name: 'og:image:height', content: 724 },
        { name: 'og:image:alt', content: 'CovidNames – CodeNames Spiel' }
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
  @include set-gutter('large');
  height: 100%;
  min-height: 100vh;
  transition: background-color $s-animation-duration-default;
}
</style>
