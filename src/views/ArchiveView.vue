<template>
  <div class="ArchiveView">
    <ContentBox
      :inverted="true"
      :columns="susyColumns()"
      :no-line="true"
    >
      <BroadcastList v-if="broadcasts" :broadcasts="broadcasts" />
    </ContentBox>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '../config.js'
// import axios from 'axios'
import BroadcastList from '../components/BroadcastList.vue'
import ContentBox from '../components/ContentBox.vue'
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
      recordingsUrl: config.recordingsUrl
    }
  },
  computed: {
    ...mapState('data', ['broadcasts'])
  },
  async mounted() {
    console.log('hello')
    this.fetchBroadCastData()
  },
  methods: {
    ...mapActions('data', ['fetchBroadCastData']),
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
