import Vue from 'vue'
import Vuex from 'vuex'
import ui from './ui'
import data from './data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    data
  }
})
