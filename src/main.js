import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import LoadScript from 'vue-plugin-load-script'
import router from './router'
import store from './store'

import { VBreakpoint } from 'vue-breakpoint-component'

Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(LoadScript)

Vue.component('v-breakpoint', VBreakpoint)


new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
