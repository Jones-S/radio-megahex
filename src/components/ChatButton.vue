<template>
  <button :class="['ChatButton', { 'is-open': chatOpen }]" @click="toggleChat">
    chat
  </button>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ChatButton',
  computed: {
    ...mapState('ui', ['chatOpen'])
  },
  methods: {
    ...mapActions('ui', ['toggleChat']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ChatButton';

  .#{$c} {
    @include reset-button;
    position: fixed;
    z-index: z('chatbutton');
    bottom: $s-size-gutter-small;
    right: $s-size-gutter-small;
    background-color: $s-color-black;
    width: 6rem;
    height: 6rem;
    color: $s-color-white;
    border-radius: 50%;
    box-shadow: 0 1px 10px 3px $s-color-primary;
    transition: $s-animation-duration-default;

    @include mq($from: medium) {
      bottom: $s-size-gutter-medium;
      right: $s-size-gutter-medium;
    }

    &:hover {
      background-color: $s-color-primary;
    }

    &.is-open {
      background-color: $s-color-primary;

      &:hover {
        background-color: darken($s-color-primary, 20%);
      }
    }
  }
</style>
