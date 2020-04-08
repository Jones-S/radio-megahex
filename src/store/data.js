import {
  removeLeadingSlash,
  removeTrailingSlash
} from '../utilities/helpers'
import axios from 'axios'
import config from '../config'

const state = {
  pages: [],
  currentPage: false,
  loading: true
}

// actions
const actions = {
  async fetchData({
      commit,
      state,
      dispatch
    }, payload) {
    commit('SET_LOADING')
    const path = removeTrailingSlash(removeLeadingSlash(payload.path))
    const pageInStore = state.pages.find(p => p.slug === path)

    // check if page already is in store
    if (pageInStore) {
      commit('SAVE_CURRENT_PAGE', pageInStore)
    } else {
      const page = await dispatch('fetchPage', {
        // lang: payload.lang,
        slug: path
      })
      commit('SAVE_CURRENT_PAGE', page)
      commit('SAVE_PAGE_IN_STORE', page)
      commit('SET_LOADING_DONE')
    }
  },
  async fetchPage({}, { slug }) { // eslint-disable-line
    const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/pages/${slug}/` : `${config.apiBaseUrlRemote}/pages/${slug}/`

    return axios.get(url)
      .then((response) => {
        if (response.status === 200 && response.data && response.data.data) {
          const page = response.data.data
          return page
        }
      }, (err) => {
        console.error(err) // eslint-disable-line
      })
  }
}

// mutations
const mutations = {
  SET_LOADING(state) {
    state.loading = true
  },
  SET_LOADING_DONE(state) {
    state.loading = false
  },
  SAVE_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },
  SAVE_PAGE_IN_STORE(state, page) {
    state.pages.push(page)
  }
}

const getters = {
  page: state => {
    if (state.loading || !state.currentPage) return false
    return state.currentPage
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
