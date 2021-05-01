<template>
  <div class="KirbyBlocks">
    <template v-for="block in blocks">
      <Paragraph v-if="!block.isHidden && block.type==='text'" :key="block.id" :content="block.content.text" />
      <img v-if="!block.isHidden && block.type==='image'" :key="block.id" :src="imgPath(block.content.image)" :alt="block.content.alt" />
    </template>
  </div>
</template>

<script>
/*
 * Kirby Richtext in the blocks format:
 * https://getkirby.com/docs/reference/panel/fields/blocks
 * Comes as an JSON stringified Array of blocks.
 *
 * The path property is needed to resolve image paths properly, as the image block does not contain that info.
 */
import { kirbyTagsHelper } from '../mixins/helpers'
import config from '../config'
import Paragraph from '../components/Paragraph.vue'

export default {
  name: 'KirbyBlocks',
  mixins: [kirbyTagsHelper],
  components: {
    Paragraph,
  },
  props: {
    content: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    blocks() {
      return JSON.parse(this.content)
    }
  },
  methods: {
    imgPath(file) {
      const url = process.env.NODE_ENV === 'development' ? `${config.imageBaseUrlLocal}/pages` : `${config.imageBaseUrlRemote}/pages`
      return `${url}/${this.path}/${file}`
    }
  }
}
</script>

<!-- Do not add "scoped" attribute because content is not affected by scope-->
<style lang="scss">
  @import '@/assets/css/global';
  $c: 'KirbyBlocks';

  .#{$c} {

  }
</style>
