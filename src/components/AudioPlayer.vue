<template>
  <div class="AudioPlayer">
    <!-- <audio ref="audio" countrols="controls">
      <source src="http://kein.fm:8000/zuhause?type=.mp3" type="audio/mpeg">      
      Sorry, your browser does not support the audio tag
    </audio> -->
    <button @click="play">Play</button>
    <button @click="stop">Stop</button>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  methods: {
    play() {
      this.$refs.audio.play()
    },
    stop() {
      this.$refs.audio.pause()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'AudioPlayer';
  
  .#{$c} {

  }
</style>
