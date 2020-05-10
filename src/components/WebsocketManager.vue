<template>
  <div class="WebsocketManager">
    <FloatingElement ref="image" v-if="currentImageUrl" :key="currentImageUrl" :src="currentImageUrl" :options="{ width: 300 }">
      FLOATING
      <ColoredImage :src="currentImageUrl" :alt="'megahex'" />
    </FloatingElement>
    <button @click="push">PUSH</button>
    <button @click="push2">PUSH2</button>
    <button @click="clear">CLEAR IMAGES</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '../config.js'
import FloatingElement from './FloatingElement.vue'
import ColoredImage from './ColoredImage.vue'

export default {
  name: 'WebsocketManager',
  components: {
    ColoredImage,
    FloatingElement
  },
  data: () => {
    return {
      serverurl: process.env.NODE_ENV === 'development' ? config.websocketServerLocal : config.websocketServerRemote,
      connection: null
    }
  },
  watch: {
    currentImageUrl: {
      handler(newUrl) {
        console.log('newUrl: ', newUrl)
        console.log('this.$refs.image: ', this.$refs.image)
      },
      immediate: true,
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
      // parse JSON string
      const data = JSON.parse(e.data)
      console.log('data: ', data)
      if (data.image) {
        this.saveReceivedImage(data.image)
      }
    }
  },
  computed: {
    ...mapState('ui', ['currentImageUrl'])
  },
  methods: {
    ...mapActions('ui', ['saveReceivedImage']),
    push() {
      this.connection.send('http://cms.megahex.test/media/pages/home/147509377-1586469010/virus-1111x.png')
    },
    push2() {
      this.connection.send('https://cms.megahex.fm/media/pages/home/3870236723-1586937032/antifa-radio-kopie-1111x.png')
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
