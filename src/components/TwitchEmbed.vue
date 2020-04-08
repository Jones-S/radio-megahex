<template>
  <div class="TwitchEmbed" id="twitch-embed">
    <vue-twitch-player
      :channel="channel"
    ></vue-twitch-player>
  </div>
</template>

<script>
import VueTwitchPlayer from 'vue-twitch-player'

export default {
  name: 'TwitchEmbed',
  components: {
    VueTwitchPlayer
  },
  props: {
    channel: {
      type: String,
      required: true,
      default: ''
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'TwitchEmbed';

  .#{$c} {

  }
</style>
