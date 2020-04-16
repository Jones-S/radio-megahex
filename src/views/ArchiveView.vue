<template>
  <div class="ArchiveView">
    <BroadcastList v-if="completeBroadCasts" :broadcasts="completeBroadCasts" />
  </div>
</template>

<script>
import config from '../config.js'
import axios from 'axios'
import BroadcastList from '../components/BroadcastList.vue'
import { mergeArraysByValue } from '../utilities/helpers'

export default {
  name: 'ArchiveView',
  components: {
    BroadcastList,
  },
  data: () => {
    return {
      recordingsUrl: config.recordingsUrl,
      broadcasts: false,
      broadcastsMeta: false
    }
  },
  computed: {
    completeBroadCasts() {
      if (!this.broadcasts || !this.broadcastsMeta) return false
      const mergedArray = mergeArraysByValue(this.broadcasts, this.broadcastsMeta, 'name', 'file')

      // Filter those out which don't have any metadata
      return mergedArray.filter(item => item.title)
    }
  },
  async mounted() {
    this.fetchBroadCasts()
    this.fetchbroadcastsMeta()
  },
  methods: {
    async fetchBroadCasts() {
      this.broadcasts = await axios.get(config.recordingsUrl)
        .then((response) => {
          if (response.status === 200 && response.data) {
            return response.data
          } else {
            console.warn('response: ', response) // eslint-disable-line
          }
        }, (err) => {
          console.error(err) // eslint-disable-line
        })
    },
    async fetchbroadcastsMeta() {
      const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/archive` : `${config.apiBaseUrlRemote}/archive`

      this.broadcastsMeta = await axios.get(url)
        .then((response) => {
          if (response.status === 200 && response.data) {
            console.log('response.data: ', response.data)
            return response.data.archive_entries
          } else {
            console.warn('response: ', response) // eslint-disable-line
          }
        }, (err) => {
          console.error(err) // eslint-disable-line
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ArchiveView';

  .#{$c} {

  }
</style>
