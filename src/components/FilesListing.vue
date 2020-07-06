<template>
  <div class="FilesListing">
    <ol>
      <FileEntry v-for="(item, key) in files" :key="key" :data="item" :copy-full-path="copyFullPath" />
    </ol>
  </div>
</template>

<script>
import FileEntry from '../components/FileEntry.vue'

export default {
  name: 'FilesListing',
  components: {
    FileEntry
  },
  props: {
    files: {
      type: Array,
      required: true
    },
    copyFullPath: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FilesListing';

  .#{$c} {

  }
</style>
