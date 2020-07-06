<template>
  <li class="FileEntry">
    <span class="FileEntry__highlight" @click="copyToClipboard(data.name)">Filename: {{ data.name }}</span><br>
    <span class="FileEntry__2nd">Date {{ data.mtime }}</span>
  </li>
</template>

<script>
import config from '../config.js'

export default {
  name: 'FileEntry',
  props: {
    data: {
      type: Object,
      required: true
    },
    copyFullPath: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    copyToClipboard(filename) {
      if (!navigator.clipboard) {
        alert('Copying to clipboard did not work. You may want to use another browser...')
        return
      }
      const text = this.copyFullPath ? `${config.uploadsUrl}${filename}` : filename
      navigator.clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FileEntry';

  .#{$c} {
    font-size: 14px;
    list-style-position: inside;
    margin-bottom: 1em;
    list-style-type: decimal-leading-zero;

    &__highlight {
      color: $s-color-red;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__2nd {
      padding-left: 3em;
    }
  }
</style>
