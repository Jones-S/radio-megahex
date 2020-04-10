import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import LoadScript from 'vue-plugin-load-script'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(LoadScript)

new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
