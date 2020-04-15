<template>
  <div class="BroadcastList">
    <BroadcastEntry v-for="(item, index) in broadcasts" :key="index" :data="item.data" />
  </div>
</template>

<script>
import BroadcastEntry from './BroadcastEntry.vue'

export default {
  name: 'BroadcastList',
  components: {
    BroadcastEntry
  },
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
  $c: 'BroadcastList';

  .#{$c} {

  }
</style>
