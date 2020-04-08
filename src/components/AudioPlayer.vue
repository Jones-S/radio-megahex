<template>
  <div class="AudioPlayer">
    <div :class="['AudioPlayer__textbox', { 'AudioPlayer__textbox--overflowing' : overflowing }]">
      <div ref="wrapper" class="AudioPlayer__text-wrapper">
        <span ref="ticker" class="AudioPlayer__text">Dieses Radio ist noch nicht auf Sendung!!! Bald gibt's hier jedoch was zu sehen, respektive zu hören. Bis dahin, schön zuhause bleiben.</span>
        <span v-show="overflowing" class="AudioPlayer__dots">...</span>
      </div>
    </div>
    <audio ref="audio" countrols="controls">
      <source :src="src" type="audio/mpeg">      
      Sorry, your browser does not support the audio tag
    </audio>
    <div class="AudioPlayer__controls">
      <button :class="['AudioPlayer__button', playing ? 'AudioPlayer__button--stop' : 'AudioPlayer__button--play']" @click="playing ? stop() : play()">Play</button>
      <button :class="['AudioPlayer__button AudioPlayer__button--volume', { 'AudioPlayer__button--volume-down' : volume == 0 }]">
        Adjust volume
        <div class="AudioPlayer__range-wrapper">
          <input type="range" v-model="volume" @change="adjustVolume" />
        </div>
      </button>
    </div>
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
      volume: 80, // initial volume
      showVolume: false,
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

    // set initial volume
    this.$refs.audio.volumne = this.volume

    // start animation if text is longer than wrapper
    if (this.deltaWrapperTextWidth < 0) {
      // set ... to indicate that there is more text
      this.overflowing = true

      setTimeout(() => {
        // wait 3s before startin animation
        window.requestAnimationFrame(this.animate)
      }, 3000)
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
    showVolumeRange() {
      this.showVolume = true
    },
    hideVolumeRange() {
      this.showVolume = false
    },
    adjustVolume() {
      this.$refs.audio.volume = (this.volume / 100)
    },
    animate() {
      this.$refs.ticker.style.transform =`translateX(${this.tickerPosition}px)`
      const nextIteration = this.tickerPosition -= this.tickerStep
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
      max-width: calc(100% - #{$s-size-gutter-medium});
      border: 1px solid $s-color-black;
      position: relative;
      margin-bottom: $s-box-distance;
      
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

    &__controls {
      margin: 0 $s-box-distance $s-box-distance 0;
      display: flex;
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
      margin-right: $s-box-distance;
      flex: 0 0 auto;
      position: relative;
      
      &:hover {
        background-color: $s-color-primary;
      }

      &--volume {
        background-image: url('~@/assets/icon/volume.svg');
        background-position: 30% center;
      }

      &--volume-down {
        background-image: url('~@/assets/icon/volume-down.svg');
        background-position: center center;
      }

      &--stop {
        background-image: url('~@/assets/icon/stop.svg');
      }
    }

    &__button--volume {
      &:hover {
        .#{$c}__range-wrapper {
          display: flex;
        }
      }
    }

    &__range-wrapper {
      height: $c-audioplayer-button-size;
      border: 1px solid $s-color-black;
      padding: 1rem;
      display: none;
      margin: 0 $s-box-distance $s-box-distance 0;
      flex: 0 1 auto;
      position: absolute;
      left: calc(#{$c-audioplayer-button-size} - 2px);
      top: -1px;
    }

    input[type=range] {
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid #000000;
      height: 3rem;
      width: 16px;
      border-radius: 0;
      background: #ffffff;
      cursor: pointer;
      margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    }

    /* All the same stuff for Firefox */
    input[type=range]::-moz-range-thumb {
      border: 1px solid #000000;
      height: 3rem;
      width: 16px;
      border-radius: 0;
      background: #ffffff;
      cursor: pointer;
    }

    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0.1rem;
      cursor: pointer;
      border-radius: 0;
      background-color: $s-color-black;
    }

    input[type=range]::-moz-range-track {
      width: 100%;
      height: 0.1rem;
      cursor: pointer;
      border-radius: 0;
      background-color: $s-color-black;
    }
  }
</style>
