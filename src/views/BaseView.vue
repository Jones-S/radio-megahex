<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseView',
  data: () => {
    return {
      minCol: 7,
      maxCol: 12
    }
  },
  computed: {
    ...mapGetters('data', ['page']),
    title() {
      return this.page ? this.page.title : 'Radio Megahex'
    },
    metaDesc() {
      return this.page && this.page.content && this.page.content.metadesc ? this.page.content.metadesc : 'Megahex.fm – Internetradio aus Zureich'
    }
  },
  watch: {
    // call again the method if the route changes
    $route: function(newRoute) {
      this.fetchData(newRoute)
    }
  },
  created () {
    this.fetchData(this.$route)
  },
  methods: {
    ...mapActions('data', ['fetchData']),
  },
  metaInfo() {
    const ogImageUrl = require('@/assets/og_image.jpg');
    return {
      title: this.title,
      htmlAttrs: {
        // reptilian: 'gator'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: this.metaDesc },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:image', content: ogImageUrl },
        { name: 'og:image:width', content: 642 },
        { name: 'og:image:height', content: 640 },
        { name: 'og:image:alt', content: this.metaDesc }
      ]
    }
  }
}
</script>
