<template>
  <div class="WebsocketManager">
    <button @click="push">PUSH</button>
    <button @click="clear">CLEAR IMAGES</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import config from '../config.js'

export default {
  name: 'WebsocketManager',
  data: () => {
    return {
      serverurl: process.env.NODE_ENV === 'development' ? config.websocketServerLocal : config.websocketServerRemote,
      connection: null
    }
  },
  mounted() {
    // create connection
    this.connection = new WebSocket(this.serverurl)
    this.connection.onopen = () => {
      console.log('Websocket connection established')
    }
    this.connection.onerror = error => {
      console.log(`WebSocket error: `, error)
    }
    this.connection.onmessage = e => {
      console.log(e.data)
      this.displayReceivedImage(e.data)
    }
  },
  methods: {
    ...mapActions('ui', ['displayReceivedImage']),
    push() {
      this.connection.send('http://cms.megahex.test/media/pages/home/147509377-1586469010/virus-1111x.png')
    },
    clear() {
      this.connection.send('clear')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'WebsocketManager';

  .#{$c} {

  }
</style>
