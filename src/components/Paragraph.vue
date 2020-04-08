<template>
  <p v-if="content" class="Paragraph" v-html="convertKirbyTags(content)" />
</template>

<script>
import { kirbyTagsHelper } from '../mixins/helpers'

export default {
  name: 'Paragraph',
  mixins: [kirbyTagsHelper],
  props: {
    content: {
      type: String,
      required: true,
      default: ''
    }
  },
}
</script>

<!-- Do not add "scoped" attribute because content is not affected by scope-->
<style lang="scss">
  @import '@/assets/css/global';
  $c: 'Paragraph';

  .#{$c} {
    @include font-style-base;
    color: $s-color-black;

    ol,
    ul {
      @include reset-list;
      margin: 1em 0;
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }

    li {
      margin-left: 1em;
      margin-bottom: 0.4em;
    }

    a {
      text-decoration: underline;
    }
  }
</style>
