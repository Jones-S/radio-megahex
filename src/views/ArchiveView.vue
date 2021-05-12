<template>
  <div class="ArchiveView">
    <ContentBox
      v-if="filterData && broadcasts"
      :inverted="true"
      :columns="10"
      :no-line="true"
    >
      <ArchiveFilter v-if="filterData" :filter-data="filterData" />
      <BroadcastList v-if="broadcasts" :broadcasts="broadcasts" />
    </ContentBox>
    <Loader v-else></Loader>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import config from '../config.js'
import BaseView from './BaseView.vue'
import BroadcastList from '../components/BroadcastList.vue'
import ContentBox from '../components/ContentBox.vue'
import ArchiveFilter from '../components/ArchiveFilter.vue'
import Loader from '../components/Loader.vue'

export default {
  name: 'ArchiveView',
  components: {
    BroadcastList,
    ArchiveFilter,
    Loader,
    ContentBox
  },
  extends: BaseView,
  data: () => {
    return {
      recordingsUrl: config.recordingsUrl
    }
  },
  computed: {
    ...mapGetters('data', ['broadcasts']),
    ...mapState('data', ['filterData']),
  },
  async mounted() {
    this.fetchArchive() // fetches filter and archive data
  },
  methods: {
    ...mapActions('data', ['fetchArchive']),
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
