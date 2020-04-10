<template>
  <div class="ContentBox">
    <div ref="box" :class="['ContentBox__box', { 'is-inverted' : inverted }, `ContentBox__box--susy-cols-${columns}`]">
      <slot></slot>
      <div :class="['ContentBox__line', `ContentBox__line--susy-cols-${columns}`]" :style="`left: ${offset}`"></div>
    </div>
  </div>
</template>

<script>
import { getRandomInt } from '../utilities/helpers'

export default {
  name: 'ContentBox',
  props: {
    inverted: {
      type: Boolean,
      required: false,
      default: false
    },
    // Random amount of columns (max 12) to display in susy grid
    columns: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data: () => {
    return {
      offset: 0
    }
  },
  mounted() {
    const boxWidth = this.$refs.box.clientWidth
    // then calculate max offset
    this.offset = `${getRandomInt(0, boxWidth)}px`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ContentBox';

  .#{$c} {
    margin-bottom: $s-box-margin;

    &__box {
      border: 1px solid $s-color-black;
      padding: $s-box-distance * 5 $s-box-distance * 2 $s-box-distance * 2;
      width: span(12 of 12);
      position: relative;

      @include mq($from: medium) {
        width: span(10 of 12);
        margin-left: span(1 of 12)

        &--susy-cols-7 {
          width: span(7 of 12);
          margin-left: span(2 of 12)
        }
        &--susy-cols-8 {
          width: span(8 of 12);
          margin-left: span(2 of 12)
        }
        &--susy-cols-9 {
          width: span(9 of 12);
          margin-left: span(2 of 12)
        }
        &--susy-cols-10 {
          width: span(10 of 12);
          margin-left: span(1 of 12)
        }
        &--susy-cols-11 {
          width: span(11 of 12);
          margin-left: 0;
        }
        &--susy-cols-12 {
          width: span(12 of 12);
          margin-left: 0;
        }
      }

      p {
        margin-bottom: 0;
      }

      &.is-inverted {
        background-color: $s-color-black;

        & > * {
          color: $s-color-white;
        }
      }
    }

    &__line {
      width: 1px;
      background-color: $s-color-black;
      height: $s-box-margin + 0.2rem;
      position: absolute;
      bottom: -$s-box-margin - 0.2rem;
      transition: left $s-animation-duration-default;
    }
  }
</style>
