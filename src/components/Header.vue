<template>
  <div class="Header">
    <div class="Header__left">
      <Logo />
      <AudioPlayer :src="src" :program="program"></AudioPlayer>
    </div>
    <Navigation class="Header__right" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import config from '../config.js'

import Logo from './Logo.vue'
import AudioPlayer from './AudioPlayer.vue'
import Navigation from './Navigation.vue'

export default {
  name: 'Header',
  components: {
    Navigation,
    AudioPlayer,
    Logo
  },
    data: () => {
    return {
      src: config.streamUrl
    }
  },
  computed: {
    ...mapState('data', ['site']),
    program() {
      if (!this.site || !this.site.broadcast) return ''
      return this.site.broadcast
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'Header';

  .#{$c} {
    display: flex;
    padding-top: $s-size-gutter-small;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;

    &__left {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      min-width: 0; // https://stackoverflow.com/a/36247448/1121268
    }

    &__right {
      flex: 0 0 auto;
      min-height: 0; // https://stackoverflow.com/a/36247448/1121268
    }
  }

  @include mq($from: large) {
    padding: 0 $s-size-gutter-medium;
  }
</style>
