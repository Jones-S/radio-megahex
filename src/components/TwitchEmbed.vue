<template>
  <div class="TwitchEmbed" id="twitch-embed">
    <div ref="player"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);

export default {
  name: 'TwitchEmbed',
  data() {
    return {
      width: '100%',
      height: 1000
    }
  },
  props: {
    channel: {
      type: String,
      required: true,
      default: ''
    },
  },
  beforeCreate() {
    Vue.loadScript('https://embed.twitch.tv/embed/v1.js')
      .then(() => {
        const options = {
          width: this.width,
          height: this.height,
        }
        if (this.channel) {
          options.channel = this.channel
        }
        new window.Twitch.Embed(this.$refs.player, options)
      }).catch((e) => (this.$emit('error', e)));
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
