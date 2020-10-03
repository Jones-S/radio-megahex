<template>
  <div class="ArchiveMeta">
    <span v-if="format" class="ArchiveMeta__meta">Format: {{ format }}</span>
    <span id="list-label" class="ArchiveMeta__label">Tags:</span>
    <ul v-if="tags" aria-labelledby="list-label">
      <li v-for="(tag, index) in tags" :key="index">{{ tag }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ArchiveMeta',
  props: {
    tags: {
      type: Array,
      required: false,
      default: () => []
    },
    format: {
      type: [String, Boolean],
      required: false,
      default: false
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ArchiveMeta';

  .#{$c} {
    @include font-style-cygnito-small;
    color: $s-color-primary;
    margin-bottom: 0.4em;

    @include mq($from: medium) {
      font-size: $s-fz-14;
    }

    &__label {
      margin-right: 1em;
      // off-screen heading for a11y, like wikipedia
      position: absolute;
      top: -9999px;
    }

    &__meta {
      // links will follow here
    }

    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      margin-right: 1em;
      color: $s-color-primary;

      @include mq($from: medium) {
        font-size: $s-fz-14;
      }

      &::before {
        content: '#';
        display: inline;
      }
    }
  }
</style>
