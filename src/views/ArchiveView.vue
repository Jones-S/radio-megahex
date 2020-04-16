<template>
  <div class="ArchiveView">
    <ContentBox
      :inverted="true"
      :columns="susyColumns()"
      :no-line="false"
    >
      <BroadcastList v-if="completeBroadCasts" :broadcasts="completeBroadCasts" />
    </ContentBox>
  </div>
</template>

<script>
import config from '../config.js'
import axios from 'axios'
import BroadcastList from '../components/BroadcastList.vue'
import ContentBox from '../components/ContentBox.vue'
import { mergeArraysByValue } from '../utilities/helpers'
import { connectionLineHelper } from '../mixins/helpers'

export default {
  name: 'ArchiveView',
  components: {
    BroadcastList,
    ContentBox
  },
  mixins: [connectionLineHelper],
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
      const broadcasts = [
        { 'name':'jones1.mp3', 'type':'file', 'mtime':'Thu, 07 Apr 2020 17:59:48 GMT', 'size':286854928 },
        { 'name':'jones2.mp3', 'type':'file', 'mtime':'Thu, 09 Apr 2020 17:59:48 GMT', 'size':286854928 },
        ...this.broadcasts,
        { 'name':'jonesi.mp3', 'type':'file', 'mtime':'Thu, 09 Aug 2020 10:59:48 GMT', 'size':286854928 },
        { 'name':'jones.mp3', 'type':'file', 'mtime':'Thu, 09 Dec 2021 10:59:48 GMT', 'size':286854928 }
      ]
      const broadcastsMeta = [
        ...this.broadcastsMeta,
        {"title":"Jones is in da House. Parganzi a longer title even go for itèè", "file":"jones1.mp3","start_time":"14:00","end_time":"18:00"},
        {"title":"Jones is in da House. Parganzi a longer title even go for ", "file":"jones2.mp3","start_time":"14:00","end_time":"18:00"},
        {"title":"Jones is in da House. Parganzi a longer title even go for 12", "file":"jonesi.mp3","start_time":"14:00","end_time":"18:00"},
        {"title":"Jones is in da House. Parganzi", "file":"jones.mp3","start_time":"14:00","end_time":"18:00"},
      ]
      const mergedArray = mergeArraysByValue(broadcasts, broadcastsMeta, 'name', 'file')

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
