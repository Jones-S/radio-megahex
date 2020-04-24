<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseView',
  data: () => {
    return {
      minCol: 7,
      maxCol: 12,
    }
  },
  computed: {
    ...mapGetters('data', ['page']),
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
  }
}
</script>
