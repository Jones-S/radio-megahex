<template>
  <div class="DefaultView">
    <div v-if="page">
      <Paragraph v-if="text" :content="text"></Paragraph>
    </div>
    <Loader v-else></Loader>
    <TwitchEmbed></TwitchEmbed>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Paragraph from '../components/Paragraph.vue'
import TwitchEmbed from '../components/TwitchEmbed.vue'
import Loader from '../components/Loader.vue'
// import Heading from '../components/Heading.vue'


export default {
  name: 'DefaultView',
  components: {
    Loader,
    TwitchEmbed,
    Paragraph,
    // Heading
  },
  computed: {
    ...mapGetters('data', ['page']),
    text() {
      if (!this.page || !this.page.content || !this.page.content.text) return false
      return this.page.content.text
    }
  },
  watch: {
    // call again the method if the route changes
    $route: function(oldRoute, newRoute) {
      this.fetchData(newRoute)
    }
  },
  created () {
    this.fetchData(this.$route)
  },
  methods: {
    ...mapActions('data', ['fetchData']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'DefaultView';

  .#{$c} {

  }
</style>
