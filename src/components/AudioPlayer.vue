<template>
  <div class="AudioPlayer" :class="{ 'AudioPlayer--inverted': inverted }">
    <div :class="['AudioPlayer__textbox', { 'AudioPlayer__textbox--overflowing' : overflowing, 'AudioPlayer__textbox--no-margin-bottom' : showPlaybar }]">
      <div ref="wrapper" class="AudioPlayer__text-wrapper">
        <span ref="ticker" class="AudioPlayer__text" v-html="program" />
        <span v-show="overflowing" class="AudioPlayer__dots">...</span>
      </div>
    </div>
    <audio ref="audio" countrols="controls">
      <source :src="src" type="audio/mpeg">
      <!--googleoff: index-->
      Sorry, your browser does not support the audio tag.
      <!--googleon: index-->
    </audio>

    <!-- Only use v-show because refs.playhead is undefined otherwise -->
    <div
      v-show="showPlaybar"
      class="AudioPlayer__progress-bar"
    >
      <div ref="progressbar" class="AudioPlayer__track-line" @click="setPlayPosition" />
      <div
        class="AudioPlayer__track-line AudioPlayer__track-line--colored"
        :style="`width: ${userPosXInPercent ? userPosXInPercent : percentComplete}%; border-right-width: ${!userPosXInPercent ? 0 : '1px' }`"
      />
      <div class="AudioPlayer__time-indicators">
        <span :class="['AudioPlayer__time AudioPlayer__time--current']">{{ currentTime }}</span>
        <span :class="['AudioPlayer__time AudioPlayer__time--duration']">{{ durationTime }}</span>
      </div>
    </div>

    <div class="AudioPlayer__controls">
      <button :class="['AudioPlayer__button', buttonState]" @click="playing ? stop() : play()">Play</button>
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
import { mapActions } from 'vuex'

export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
    program: {
      type: String,
      required: true,
    },
    showPlaybar: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      volume: 80, // initial volume
      showVolume: false,
      playing: false,
      tickerPosition: 0,
      deltaWrapperTextWidth: false,
      overflowing: false,
      tickerStep: 0.5, // in px per frame
      interval: false,
      currentSeconds: 0,
      durationSeconds: 0,
      loaded: false,
      loading: false,
      touching: false,
      dragging: false,
      userPosXInPercent: false,
    }
  },
  watch: {
    program: function(newProgram) {
      console.log('newProgram: ', newProgram)
      this.$nextTick(() => { // wait until text window is filled with content to have access to width of text
        this.calculateOverflow()
      })
    }
  },
  computed: {
    currentTime() {
      return this.convertTimeHHMMSS(this.currentSeconds)
    },
    durationTime() {
      return this.convertTimeHHMMSS(this.durationSeconds)
    },
    isDragged() {
      if (this.touching || this.dragging) return true
      return false
    },
    percentComplete() {
      if (!this.durationSeconds) return 0
      return parseInt((this.currentSeconds / this.durationSeconds) * 100, 10)
    },
    buttonState() {
      if (!this.playing) return 'AudioPlayer__button--play'
      return this.showPlaybar ? 'AudioPlayer__button--pause' : 'AudioPlayer__button--stop'
    }
  },
  mounted() {
    this.initEventListeners()

    // subscribe to action to listen if other players start playing
    this.$store.subscribeAction(action => {
      if (action.type === "ui/setCurrentPlayer" && action.payload) {
        // check which player is playing. if it is not self, then pause
        if (action.payload !== this._uid) {
          this.pause()
        }
      }
    })

    this.calculateOverflow()
  },
  methods: {
    ...mapActions('ui', ['setCurrentPlayer']),
    calculateOverflow() {
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
    initEventListeners() {
      this.$refs.audio.addEventListener('timeupdate', this.update)
      this.$refs.audio.addEventListener('loadeddata', this.load)
    },
    play(position) {
      // dispatch action, which other players subscribe to, to say that this player is currently playing
      this.setCurrentPlayer(this._uid)

      if (!this.$refs.audio) return
      this.$refs.audio.play()
      this.playing = true
      if (position) {
        this.$refs.audio.currentTime = position
      }
    },
    pause() {
      if (!this.$refs.audio) return
      this.$refs.audio.pause()
      this.playing = false
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
    update() {
      // because loaded is set later than the audio starts to play, we end up with a loading button but a playing audio
      // therefore we also set loading to false whenever we have a timeupdate
      this.setLoading(false)
      this.currentSeconds = parseInt(this.$refs.audio.currentTime, 10)
    },
    animate() {
      this.$refs.ticker.style.transform =`translateX(${this.tickerPosition}px)`
      const nextIteration = this.tickerPosition -= this.tickerStep
      this.tickerPosition = this.tickerPosition <= this.deltaWrapperTextWidth ? 0 : nextIteration
      window.requestAnimationFrame(this.animate)
    },
    setLoading(bool) {
      this.loading = bool
    },
    load() {
      this.interval = setInterval(this.checkIfAudioISLoaded, 3000)
    },
    checkIfAudioISLoaded() {
      try {
        if (this.$refs.audio && this.$refs.audio.readyState >= 2) {
          this.loaded = true
          // this.setLoading(false)
          this.durationSeconds = parseInt(this.$refs.audio.duration, 10)
          clearInterval(this.interval)
          return
        }
      } catch (err) {
        console.error('Failed to load sound file. Error:', err) // eslint-disable-line no-console
      }
    },
    setPlayPosition(e) {
      const absoluteClickPosX = e.pageX
      const progressbarPosX = this.$refs.progressbar.getBoundingClientRect().x // returns X position on screen
      const progressBarWidth = this.$refs.progressbar.getBoundingClientRect().width // returns X position on screen
      // We can now calculate where the element was clicked
      const clickPosX = absoluteClickPosX - progressbarPosX
      // and now we set this in relation with the whole width of the progressbar to get a percent of the progress
      const progressInPercent = clickPosX/progressBarWidth * 100
      this.userPosXInPercent = progressInPercent
      const newPosition = this.setPlayheadByUser(progressInPercent)
      this.currentSeconds = newPosition
      this.play(newPosition)
    },
    setPlayheadByUser(percent) {
      // returns currentTime in seconds
      return parseInt(this.$refs.audio.duration * (percent / 100), 10) // prettier-ignore
    },
    convertTimeHHMMSS(val) {
      if (!val) return '00:00'
      const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
      return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'AudioPlayer';

  $c-audioplayer-button-size: 5.2rem;
  $c-audioplayer-text-wrapper-size: $s-size-textbox;
  $c-audioplayer-playhead-clickable-area: 5rem;
  $c-audioplayer-playhead-size: 1rem;
  $c-audioplayer-trackline-height: 2.2rem;
  $c-audioplayer-offset-at-edge: 3rem;

  .#{$c} {
    @include font-style-extra;
    margin-bottom: $s-box-margin;
    max-width: 100%;
    width: 100%;

    &--inverted {
      background-color: $s-color-black;
      color: $s-color-white;

      .#{$c}__button {
        filter: invert(100%);

        &:hover {
          filter: none;
          border: 1px solid $s-color-white;
        }
      }

      .#{$c}__textbox,
      .#{$c}__track-line,
      .#{$c}__range-wrapper {
        border: 1px solid $s-color-white;
      }

      input[type=range]::-webkit-slider-runnable-track,
      input[type=range]::-moz-range-track {
        background-color: $s-color-white;
      }

      .#{$c}__range-wrapper,
      input[type=range]::-webkit-slider-thumb,
      input[type=range]::-moz-range-thumb {
        border: 1px solid $s-color-white;
        background: $s-color-black;
      }
    }

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

      &--no-margin-bottom {
        margin-bottom: 0;
        border-bottom-width: 0;
      }
    }

    &__text-wrapper {
      height: 100%;
      width: 100%;
      max-width: 100%;
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
      }

      &--volume-down {
        background-image: url('~@/assets/icon/volume-down.svg');
      }

      &--stop {
        background-image: url('~@/assets/icon/stop.svg');
      }

      &--pause {
        background-image: url('~@/assets/icon/pause.svg');
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
      border: 1px solid $s-color-black;
      height: 3rem;
      width: 16px;
      border-radius: 0;
      background: $s-color-white;
      cursor: pointer;
      margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    }

    /* All the same stuff for Firefox */
    input[type=range]::-moz-range-thumb {
      border: 1px solid $s-color-black;
      height: 3rem;
      width: 16px;
      border-radius: 0;
      background: $s-color-white;
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

    &__progress-bar {
      cursor: pointer;
      position: relative;
      height: $c-audioplayer-trackline-height;
      max-height: $c-audioplayer-trackline-height;
      margin-bottom: $s-box-distance;
    }

    &__track-line {
      width: 100%;
      height: $c-audioplayer-trackline-height;
      border: 1px solid $s-color-black;

      &--colored {
        position: relative;
        top: -$c-audioplayer-trackline-height;
        background-color: $s-color-primary;
        pointer-events: none;
      }
    }

    &__progress {
      position: relative;
    }

    &__time-indicators {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      position: absolute;
      top: 0;
      width: 100%;
      padding: 0 0.3em;
      align-items: center;
      height: 100%;
      pointer-events: none;
    }

    &__time {
      transition: transform $s-animation-duration-default;

      &.is-at-edge {
        transform: translateY(-#{$c-audioplayer-offset-at-edge});
      }
    }
  }
</style>
