<template>
  <div class="BroadcastEntry">
    {{ uri }},
    {{ title }},
    {{ file }}
  </div>
</template>

<script>
export default {
  name: 'BroadcastEntry',
  props: {
    data: {
      type: Object,
      required: true
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
    startTime() {
      return this.data.start_time
    },
    endTime() {
      return this.data.end_time
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'BroadcastEntry';

  .#{$c} {

  }
</style>
