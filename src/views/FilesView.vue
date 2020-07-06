<template>
  <div class="FilesView">
    <h1>All files</h1>
    <h2>List of all uploads</h2>
    <Paragraph :content="recordingsText"></Paragraph>
    <FilesListing v-if="uploads" :files="uploads" :copy-full-path="true"/>
    <hr>

    <h2>List of all recordings</h2>
    <Paragraph :content="recordingsText"></Paragraph>
    <FilesListing v-if="broadcasts" :files="broadcasts" />
  </div>
</template>

<script>
import axios from 'axios'

import { mapActions } from 'vuex'
import config from '../config.js'
import FilesListing from '../components/FilesListing.vue'
import Paragraph from '../components/Paragraph.vue'

export default {
  name: 'FilesView',
  components: {
    Paragraph,
    FilesListing
  },
  data: () => {
    return {
      broadcasts: false,
      uploads: false,
      recordingsUrl: config.recordingsUrl,
      recordingsText: 'All recordings from <a href="https://zzz.megahex.fm/recordings/">https://zzz.megahex.fm/recordings/</a>. Click onto the name to copy the filename to use it in your CMS.',
      uploadsText: 'All uploads from <a href="https://zzz.megahex.fm/uploads/upstate">https://zzz.megahex.fm/uploads/upstate</a>. Click onto the name to copy the full path to use it in your CMS.'
    }
  },
  computed: {
  },
  mounted() {
    // fetch all broadcasts, but keeo them raw, don't do the merge with the meta data
    // we also don't want this in the store, this is just a route for the editors...
    // but we actually repeat the 'fetchBroadcasts' action...
    axios.get(config.recordingsUrl)
      .then((response) => {
        if (response.status === 200 && response.data) {
          this.broadcasts = response.data
        } else {
          console.warn('response: ', response) // eslint-disable-line
        }
      }, (err) => {
        console.error(err) // eslint-disable-line
      })

    axios.get(config.uploadsUrl)
      .then((response) => {
        if (response.status === 200 && response.data) {
          this.uploads = response.data
        } else {
          console.warn('response: ', response) // eslint-disable-line
        }
      }, (err) => {
        console.error(err) // eslint-disable-line
      })
  },
  methods: {
    ...mapActions('data', ['fetchBroadcastData']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FilesView';

  .#{$c} {

    hr {
      margin-bottom: $s-size-spacer-medium;
    }

    /deep/ .Paragraph {
      max-width: 30em;
    }
  }
</style>
