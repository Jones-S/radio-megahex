<template>
  <div class="AudioPlayer">
    <div ref="wrapper" class="AudioPlayer__text-wrapper">
      <span ref="ticker" class="AudioPlayer__text"></span>
    </div>
    <audio ref="audio" countrols="controls">
      <source :src="src" type="audio/mpeg">      
      Sorry, your browser does not support the audio tag
    </audio>
    <button class="AudioPlayer__button AudioPlayer__button--play" @click="play">Play</button>
    <button class="AudioPlayer__button AudioPlayer__button--stop" @click="stop">Stop</button>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      tickerPercent: 0
    }
  },
  mounted() {
    window.requestAnimationFrame(this.animate);
  },
  methods: {
    play() {
      this.$refs.audio.play()
    },
    stop() {
      this.$refs.audio.pause()
    },
    animate() {
      this.$refs.ticker.style.transform =`translateX(${this.tickerPercent})`
      this.tickerPercent = this.tickerPercent >= 100 ? 0 : this.tickerPercent++
      window.requestAnimationFrame(this.animate)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'AudioPlayer';

  $c-audioplayer-button-size: 5.2rem;
  $c-audioplayer-text-wrapper-size: 3.5rem;
  
  .#{$c} {

    &__text-wrapper {
      height: $c-audioplayer-text-wrapper-size;
      width: 100%;
      border: 1px solid $s-color-black;
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    &__text {
      @include font-style-cygnito-small;
      display: inline-block;
      padding: 0 1em;
      white-space: nowrap;
    }

    &__button {
      @include reset-button;
      display: inline-block;
      width: $c-audioplayer-button-size;
      height: $c-audioplayer-button-size;
      border: 1px solid $s-color-black;
    }
  }
</style>
