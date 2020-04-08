<template>
  <div :class="['ContentBox', { 'is-inverted' : inverted }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentBox',
  props: {
    inverted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ContentBox';

  .#{$c} {
    border: 1px solid $s-color-black;
    padding: $s-box-distance * 5 $s-box-distance * 2 $s-box-distance * 2;
    width: span(12 of 12);
    margin: 0 auto;
    margin-top: $s-box-margin;

    // &::after {
    //   display: inline;
    // }

    @include mq($from: medium) {
      width: span(10 of 12);
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
</style>
