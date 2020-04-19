<template>
  <router-link :class="['BroadcastEntry', { 'is-last': isLastOfDay }]" :to="`/${uri}`" :title="title">
      <span>
        <span class="BroadcastEntry__date">{{ date }}</span>
        <span v-if="time" class="BroadcastEntry__time">{{ time }}</span>
      </span><br>
      <span class="BroadcastEntry__title">{{ title }}</span>
  </router-link>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'BroadcastEntry',
  props: {
    data: {
      type: Object,
      required: true
    },
    isLastOfDay: { // needed to display a bit of spacing and different connection line
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    uri() {
      return this.data.uri
    },
    title() {
      return this.data.title
    },
    file() {
      return this.data.file
    },
    date() {
      return format(new Date(this.data.mtime), 'yyyy-MM-dd')
    },
    time() {
      if (!this.data.date) return false
      const date = this.data.date.replace('&#160;', 'T')
      const starttime = format(new Date(date), 'HH:mm')
      return `${starttime}—${this.data.end_time}`
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'BroadcastEntry';

  $c-broadcastentry-margin-bottom: $s-box-distance * 2;
  $c-broadcastentry-margin-bottom-big: $s-box-distance * 10;

  .#{$c} {
    margin-bottom: $c-broadcastentry-margin-bottom;
    border: 1px solid $s-color-white;
    padding: $c-broadcastentry-margin-bottom $c-broadcastentry-margin-bottom $s-box-distance;
    position: relative;
    text-decoration: none;

    &:hover {
      background-color: $s-color-primary;

      .#{$c}__date,
      .#{$c}__title {
        color: $s-color-white;
      }
      .#{$c}__time {
        color: $s-color-black;
      }

    }

    &::after {
      content: '';
      display: block;
      width: 1px;
      height: $c-broadcastentry-margin-bottom + 0.1rem;
      background-color: $s-color-white;
      position: absolute;
      bottom:-  $c-broadcastentry-margin-bottom - 0.1rem;
    }

    &.is-last {
      margin-bottom: $c-broadcastentry-margin-bottom-big;

      &::after {
        left: 20%;
        height: $c-broadcastentry-margin-bottom-big + 0.1rem;
        bottom: - $c-broadcastentry-margin-bottom-big - 0.1rem;
      }
    }

    &__date {
      &::after {
        content: '';
        display: inline-block;
        margin-right: 1em;
      }
    }

    &__time {
      color: $s-color-primary;
    }
  }

  .is-inverted {
    .#{$c} {
      color: $s-color-white;

      &:hover {
        @include reset-link;
      }
    }
  }
</style>
