<template>
  <div class="BroadcastList">
    {{ broadcastsDividedInMonths }}
    <BroadcastEntry v-for="(item, index) in broadcasts" :key="index" :data="item" />
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
  },
  computed: {
    broadcastsDividedInMonths() {
      const years = new Map
      this.broadcasts.forEach(show => {
        const date = new Date(show.mtime)
        // const date = new Date(show.mtime).toUTCString()
        const year = date.getFullYear()
        const month = date.getMonth() // Jan is 0

        console.log('year: ', year)
        console.log('month: ', month)

        if (years.has(year)) {
          const months = years.get(year) // months is a map too
          if (months.has(month)) {
            // add show to existing month
            months.set(month, [show, ...months.get(month)])
          } else {
            // if month does not exist, add it
            months.set(month, [show])
          }
        } else {
          const months = new Map
          months.set(month, [show])
          years.set(year, months)
        }
      })
      console.log('years: ', years)
      console.log('Array.from(years.values()): ', Array.from(years.values()))
      return Array.from(years.values())
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
