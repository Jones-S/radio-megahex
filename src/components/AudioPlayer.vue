<template>
  <div class="AudioPlayer">
    <div class="AudioPlayer__text-wrapper">
      <span class="AudioPlayer__text">Corona-News—Die etwas andere Sichtweise zur weltweiten Krise. Moderiert durch Lenski und Markinski.</span>
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
      animation-name: pass-by;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-duration: 50s;
    }

    &__button {
      @include reset-button;
      display: inline-block;
      width: $c-audioplayer-button-size;
      height: $c-audioplayer-button-size;
      border: 1px solid $s-color-black;
    }

    @keyframes pass-by {
      100% {
        transform: translateX(-100%);
      }
      0% {
        transform: translateX(0%);
      }
    }
  }
</style>
