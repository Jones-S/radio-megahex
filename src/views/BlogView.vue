<template>
  <div class="BlogView">
    <div v-if="page">
      <Teaser
          v-for="(post, index) in posts"
          :key="`${index}-${post.id}`"
          :rich-text="post.richText"
          :date="post.date"
          :title="post.title"
          :link="post.link"
        ></Teaser>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BaseView from './BaseView.vue'
import Teaser from '../components/Teaser.vue'
import { dateHelper } from '../mixins/helpers'

export default {
  name: 'BlogView',
  components: {
    Teaser
  },
  extends: BaseView,
  mixins: [dateHelper],
  async mounted() {
    this.fetchAllBlogPosts() // fetches filter and archive data
  },
  computed: {
    ...mapState('data', ['blogPosts']),
    posts() {
      if (!this.blogPosts) return false
      const posts = this.blogPosts.map(post => {
        return {
          richText: post?.teaserText || '',
          title: post?.title || '',
          link: {
            url: post.uri,
            text: '> Weiterlesen...',
          },
          date: this.prepareDate(post.date),
        }
      })
      return posts
    }
  },
  methods: {
    ...mapActions('data', ['fetchAllBlogPosts']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'BlogView';

  .#{$c} {

  }
</style>
