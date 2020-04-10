<template>
  <div class="ContentBox">
    <div ref="box" :class="['ContentBox__box', { 'is-inverted' : inverted }, `ContentBox__box--susy-cols-${columns}`]">
      <slot></slot>
      <div v-if="!noLine" :class="['ContentBox__line-wrap']" :style="`left: ${offset}`">
        <div class="ContentBox__line" />
        <div :class="['ContentBox__line', 'ContentBox__line--horizontal', direction]" :style="`height: ${horizontalLineLength}`"></div>
      </div>
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
    },
    noLine: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => {
    return {
      offset: 0,
      direction: false,
      horizontalLineLength: 0
    }
  },
  mounted() {
    const boxWidth = this.$refs.box.clientWidth
    const offset = getRandomInt(0, boxWidth)
    // then calculate max offset
    this.offset = `${offset}px`
    this.direction = offset / boxWidth < 0.5 ? 'to-right' : 'to-left';
    // distance from offset to middle of box (assuming that the middle of the box is always overlapping)
    const horizontalLineLength = Math.abs((boxWidth / 2) - offset)
    this.horizontalLineLength = `${horizontalLineLength}px`
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
      background-color: $s-color-white;
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

      @include mq($from: large) {
        &--susy-cols-7 {
          width: span(5 of 12);
          margin-left: span(2 of 12)
        }
        &--susy-cols-8 {
          width: span(6 of 12);
          margin-left: span(2 of 12)
        }
        &--susy-cols-9 {
          width: span(7 of 12);
          margin-left: span(2 of 12)
        }
        &--susy-cols-10 {
          width: span(8 of 12);
          margin-left: span(1 of 12)
        }
        &--susy-cols-11 {
          width: span(9 of 12);
          margin-left: 0;
        }
        &--susy-cols-12 {
          width: span(10 of 12);
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

    &__line-wrap {
      background-color: yellow;
      position: absolute;
      bottom: -1px;
      height: 1px; // is somehow needed to not be randomly placed on the screen... :S
    }

    &__line {
      position: absolute;
      width: 1px;
      background-color: $s-color-black;
      height: $s-box-margin + 0.9rem;

      &--horizontal {
        height: 1px; // calculated by javascript (is actually the length, because of the rotation)
        transform-origin: top left;
        top: $s-box-margin + 0.9rem;

        &.to-left {
          transform-origin: top right;
          transform: rotate(90deg);
        }

        &.to-right {
          transform: rotate(-90deg);
        }
      }
    }
  }
</style>
