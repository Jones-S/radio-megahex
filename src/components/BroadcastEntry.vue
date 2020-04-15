<template>
  <div class="BroadcastEntry">
    Item
  </div>
</template>

<script>
export default {
  name: 'BroadcastEntry',
  props: {
    broadcasts: {
      type: Array,
      default: () => []
    }
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
