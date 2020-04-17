<template>
  <div class="DefaultView">
    <div v-if="page">
      <ContentBox
        v-for="(paragraph, index) in paragraphs"
        :key="index"
        :inverted="!!paragraph.inverted"
        :columns="susyColumns(minCol, maxCol)"
        :no-line="index === paragraphs.length - 1"
      >
        <Heading :level="2">{{ paragraph.title }}</Heading>
        <Paragraph v-if="paragraph.text" :content="paragraph.text"></Paragraph>
      </ContentBox>
      <FloatingImages v-if="floatingImages" :images="floatingImages" />
    </div>
    <Loader v-else></Loader>
    <ContentBox v-if="channel">
      <TwitchEmbed :channel="channel"></TwitchEmbed>
    </ContentBox>
    <router-link to="/archive">ARchiv</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Paragraph from '../components/Paragraph.vue'
import TwitchEmbed from '../components/TwitchEmbed.vue'
import Loader from '../components/Loader.vue'
import Heading from '../components/Heading.vue'
import ContentBox from '../components/ContentBox.vue'
import FloatingImages from '../components/FloatingImages.vue'
import { connectionLineHelper } from '../mixins/helpers'

export default {
  name: 'DefaultView',
  components: {
    Loader,
    TwitchEmbed,
    FloatingImages,
    Paragraph,
    ContentBox,
    Heading
  },
  mixins: [connectionLineHelper],
  data: () => {
    return {
      minCol: 7,
      maxCol: 12,
    }
  },
  computed: {
    ...mapGetters('data', ['page']),
    paragraphs() {
      if (!this.page || !this.page.content || !this.page.content.paragraphs) return false
      return this.page.content.paragraphs
    },
    channel() {
      if (!this.page || !this.page.content || !this.page.content.twitch_channel) return false
      return this.page.content.twitch_channel
    },
    floatingImages() {
      if (!this.page || !this.page.content || !this.page.content.draggable_images) return false
      return this.page.content.draggable_images
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
  mounted() {
    this.$forceUpdate()
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
