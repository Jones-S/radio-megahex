<template>
  <div class="KirbyBlocks">
    kirbyblocks
    <template v-for="block in blocks">
      <Heading :level="2" v-if="!block.isHidden && block.type==='heading'" :key="block.id">{{block.content.text}}</Heading>
      <Paragraph v-if="!block.isHidden && block.type==='text'" :key="block.id" :content="block.content.text" />
      <img class="KirbyBlocks__image" v-if="!block.isHidden && block.type==='image'" :key="block.id" :src="block.content.medium" :alt="block.content.alt" />
    </template>
  </div>
</template>

<script>
/*
 * Kirby Richtext in the blocks format:
 * https://getkirby.com/docs/reference/panel/fields/blocks
 * Comes as an JSON stringified Array of blocks.
 */
import { kirbyTagsHelper } from '../mixins/helpers'
import Paragraph from '../components/Paragraph.vue'
import Heading from '../components/Heading.vue'

export default {
  name: 'KirbyBlocks',
  mixins: [kirbyTagsHelper],
  components: {
    Heading,
    Paragraph,
  },
  props: {
    content: {
      type: [String, Array],
      required: true
    },
  },
  computed: {
    blocks() {
      if (this.content.constructor === Array) {
        return this.content
      }
      return JSON.parse(this.content)
    }
  },
}
</script>

<!-- Do not add "scoped" attribute because content is not affected by scope-->
<style lang="scss">
  @import '@/assets/css/global';
  $c: 'KirbyBlocks';

  .#{$c} {
    &__image {
      max-width: 100%;
      max-height: 30rem;
    }
  }
</style>
