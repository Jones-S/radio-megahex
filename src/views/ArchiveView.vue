<template>
  <div class="ArchiveView">
    <BroadcastList v-if="broadcasts" :broadcasts="broadcasts" />
  </div>
</template>

<script>
import config from '../config.js'
import axios from 'axios'
import BroadcastList from '../components/BroadcastList.vue'

export default {
  name: 'ArchiveView',
  components: {
    BroadcastList,
  },
  data: () => {
    return {
      recordingsUrl: config.recordingsUrl,
      broadcasts: false
    }
  },
  async mounted() {
    console.log('laodng')
    this.broadcasts = await axios.get(config.recordingsUrl, {
      crossdomain: true
    }).then((response) => {
        console.log('response: ', response)
        if (response.status === 200 && response.data && response.data.data) {
          const page = response.data.data
          return page
        } else {
          console.warn('response: ', response) // eslint-disable-line
        }
      }, (err) => {
        console.error(err) // eslint-disable-line
      })
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
