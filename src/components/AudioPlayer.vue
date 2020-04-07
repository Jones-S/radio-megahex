<template>
  <div class="AudioPlayer">
    <div :class="['AudioPlayer__textbox', { 'AudioPlayer__textbox--overflowing' : overflowing }]">
      <div ref="wrapper" class="AudioPlayer__text-wrapper">
        <span ref="ticker" class="AudioPlayer__text">Dieser Radio ist noch nicht auf Sendung!!! Work in Progress!!! Am Donnerstag gibt's hier was zu sehen. Bis dahin, schön zuhause bleiben.</span>
        <span v-show="overflowing" class="AudioPlayer__dots">...</span>
      </div>
    </div>
    <audio ref="audio" countrols="controls">
      <source :src="src" type="audio/mpeg">      
      Sorry, your browser does not support the audio tag
    </audio>
    <button :class="['AudioPlayer__button', playing ? 'AudioPlayer__button--stop' : 'AudioPlayer__button--play']" @click="playing ? stop() : play()">Play</button>
    <button class="AudioPlayer__button AudioPlayer__button--volume" @click="increaseVolume">Adjust volume</button>
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
      playing: false,
      tickerPosition: 0,
      deltaWrapperTextWidth: false,
      overflowing: false,
      tickerStep: 0.5 // in px per frame
    }
  },
  mounted() {
    // calculate amount of pixel difference between text and wrapper == how much we have to translate text to actually see the end...
    this.deltaWrapperTextWidth = this.$refs.wrapper.clientWidth - this.$refs.ticker.clientWidth

    // start animation if text is longer than wrapper
    if (this.deltaWrapperTextWidth < 0) {
      // set ... to indicate that there is more text
      this.overflowing = true

      setTimeout(() => {
        // wait 3s before startin animation
        window.requestAnimationFrame(this.animate);
      }, 3000);
    }
  },
  methods: {
    play() {
      this.$refs.audio.play()
      this.playing = true
    },
    stop() {
      this.$refs.audio.pause()
      this.playing = false
    },
    increaseVolume() {
      console.log('this.$refs.audio.volume: ', this.$refs.audio.volume)
      this.$refs.audio.volume = this.$refs.audio.volume - 0.05
    },
    animate() {
      this.$refs.ticker.style.transform =`translateX(${this.tickerPosition}px)`
      const nextIteration = this.tickerPosition -= this.tickerStep;
      this.tickerPosition = this.tickerPosition <= this.deltaWrapperTextWidth ? 0 : nextIteration
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

    &__textbox {
      padding: 0 0.3rem;
      height: $c-audioplayer-text-wrapper-size;
      width: 100%;
      max-width: 1000px;
      border: 1px solid $s-color-black;
      position: relative;

      &--overflowing {
        padding-right: 3.3rem;
      }
    }

    &__text-wrapper {
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    &__text {
      @include font-style-cygnito-small;
      display: inline-block;
      white-space: nowrap;
    }

    &__dots {
      @include font-style-cygnito-small;
      display: inline-block;
      position: absolute;
      right: 0.3rem;
    }

    &__button {
      @include reset-button;
      display: inline-block;
      width: $c-audioplayer-button-size;
      height: $c-audioplayer-button-size;
      border: 1px solid $s-color-black;
      text-indent: -9999px;
      background-image: url('~@/assets/icon/play.svg');
      background-repeat: no-repeat;
      background-position: center center;
      
      &:hover {
        background-color: $s-color-primary;
      }

      &--volume {
        background-image: url('~@/assets/icon/volume.svg');
        background-position: 30% center;
      }
      &--stop {
        background-image: url('~@/assets/icon/stop.svg');
      }
    }
  }
</style>
