<template>
  <div class="BroadcastList">
    <div class="BroadcastList__year" v-for="(year, index) in broadcastsDividedInMonths" :key="index">
      <div class="BroadcastList__month" v-for="(month, index) in year.items" :key="index">
        <div class="BroadcastList__month-name">{{ getMonthName(month.name) }} {{ year.name }}</div>
        <BroadcastEntry v-for="(item, index) in month.items" :key="index" :data="item" :is-last-of-day="isLastOfDay(index, month.items)" />
      </div>
    </div>
  </div>
</template>

<script>
import BroadcastEntry from './BroadcastEntry.vue'
import { transformMapToArrayDeep } from '../utilities/helpers'
import { de } from 'date-fns/locale'
import { format } from 'date-fns'

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

      return transformMapToArrayDeep(years)
    }
  },
  methods: {
    getMonthName(monthNumber) {
      // Cheap version to get month name, just set a random date and only read out the month
      return format(new Date(2000, monthNumber, 1), 'MMMM', { locale: de })
    },
    isLastOfDay(index, items) {
      if (index === items.length - 1) return true
      if (index === 0) return false
      const currentDate = new Date(items[index].mtime).getUTCDate()
      const lastDate = new Date(items[index + 1].mtime).getUTCDate()
      if (lastDate !== currentDate) return true
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'BroadcastList';

  .#{$c} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__year,
    &__month {
      margin-bottom: 3em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__month-name {
      margin-bottom: 0.5em;
    }
  }

  // Overriding scoped child components with /deep/
  // https://bambielli.com/til/2018-08-19-how-to-target-child-components-with-scoped-css-in-vue/
  /deep/
  .BroadcastEntry {
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
</style>
