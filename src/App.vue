<template>
  <div id="app" :class="['App', { 'is-dark' : spymasterView }]">
    <Heading v-if="section.title" :level="section.level || 2">{{ section.title }}</Heading>
    <Paragraph :content="section.text"></Paragraph>
  </div>
</template>

<script>
import Heading from './components/Heading.vue'
import Paragraph from './components/Paragraph.vue'

export default {
  name: 'app',
  components: {
    Paragraph,
    Heading
  },
  data: () => {
    return {}
  },
  metaInfo:() => {
    const ogImageUrl = require('@/assets/covidnames_og.jpg');
    return {
      title: 'CovidNames – CodeNames in Quarantäne-Zeiten',
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
@import '@/assets/css/_generic.normalize';
@import '@/assets/css/_generic.fonts';
@import '@/assets/css/_generic.box-sizing';
@import '@/assets/css/global';
@import '@/assets/css/_elements.page';

$c: 'App';

.#{$c} {
  height: 100%;
  min-height: 100vh;
  transition: background-color $s-animation-duration-default;
}
</style>
