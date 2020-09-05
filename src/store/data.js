import { removeLeadingSlash, removeTrailingSlash } from '../utilities/helpers'
import { sanitizeFilterData } from '../utilities/sanitizeData'
import { mapFormats } from '../utilities/mapData'
import axios from 'axios'
import config from '../config'
import {
  mergeArraysByValue
} from '../utilities/helpers'

const state = {
  pages: [],
  site: false,
  currentPage: false,
  broadcasts: false,
  loading: true,
  filterData: false
}

// actions
const actions = {
  async fetchData({
      commit,
      state,
      dispatch
    }, payload) {
    commit('SET_LOADING')
    let path = removeTrailingSlash(removeLeadingSlash(payload.path))
    if (!path) {
      path = config.homeSlug
    }
    // kirby cms stores subpages like this:
    // parentpage/childpage -> parentpage+childpage
    // so let's replace the slash with a +
    const requestPath = path.replace('/', '+')

    const pageInStore = state.pages.find(p => p.id === path)

    let page
    let site

    // check if page already is in store
    if (pageInStore) {
      commit('SAVE_CURRENT_PAGE', pageInStore)
      page = pageInStore
    } else {
      page = dispatch('fetchPage', {
        // lang: payload.lang,
        slug: requestPath
      })
    }

    // always try to fetch site info
    // example: current radio program and navigation
    site = dispatch('fetchSite')

    Promise.all([page, site]).then((data) => {
      commit('SAVE_CURRENT_PAGE', data[0])
      commit('SAVE_PAGE_IN_STORE', data[0])
      if (data[1] !== true) {
        commit('SAVE_SITE', data[1])
      }

      commit('SET_LOADING_DONE')
    })

  },
  async fetchSite({ state }) {
    if (state.site) {
      return true // instead of resolving a resolved promise
    } else {
      const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/megahex` : `${config.apiBaseUrlRemote}/megahex`
      return axios.get(url)
        .then((response) => {
          if (response.status === 200 && response.data) {
            return response.data.site
          } else {
            console.warn('response: ', response) // eslint-disable-line
          }
        }, (err) => {
          console.error(err) // eslint-disable-line
        })
    }
  },
  async fetchBroadcastData({ commit, state, dispatch }) {
    if (!state.broadcasts) {
      const broadcasts = dispatch('fetchBroadcasts')
      const broadcastsMeta = dispatch('fetchbroadcastsMeta')

      // first wait for the fetching promises to resolve
      Promise.all([broadcasts, broadcastsMeta]).then(values => {
        // and then wait for the mergeArray action to finish
        // No idea why this returns a promise in the first place...
        dispatch('mergeArrays', { broadcasts: values[0], meta: values[1] }).then((mergedArrays) => {
          commit('SAVE_BROADCASTS', mergedArrays)
        })
      })
    }
  },
  async fetchFilterData({ commit, state }) {
    if (!state.filterData) {
      const filterData = await axios.get(`${config.apiBaseUrlRemote}/filter`)
        .then((response) => {
          if (response.status === 200 && response.data) {
            return response.data
          } else {
            console.warn('response: ', response) // eslint-disable-line
          }
        }, (err) => {
          console.error(err) // eslint-disable-line
        })

      const sanitizedFilterData = {
        formats: mapFormats(sanitizeFilterData(filterData.formats)),
        tags: sanitizeFilterData(filterData.tags),
      }

      commit('SAVE_FILTER_DATA', sanitizedFilterData)
    }
  },
  async fetchBroadcasts() {
    return axios.get(config.recordingsUrl)
    .then((response) => {
      if (response.status === 200 && response.data) {
        return response.data
      } else {
        console.warn('response: ', response) // eslint-disable-line
      }
    }, (err) => {
      console.error(err) // eslint-disable-line
    })
  },
  async fetchbroadcastsMeta() {
    const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/archive` : `${config.apiBaseUrlRemote}/archive`
    return axios.get(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
          return response.data.archive_entries
        } else {
          console.warn('response: ', response) // eslint-disable-line
        }
      }, (err) => {
        console.error(err) // eslint-disable-line
      })
  },
  mergeArrays({}, { broadcasts, meta }) { // eslint-disable-line
    const broadcastsArray = [...broadcasts]
    // fix filenames if suffix is missing
    const broadcastsMeta = meta.map((item) => {
      item.file = item.file.endsWith('.mp3') ? item.file : `${item.file}.mp3`
      return item
    })
    const mergedArray = mergeArraysByValue(broadcastsArray, broadcastsMeta, 'name', 'file')

    // Filter those out which don't have any metadata
    return mergedArray.filter(item => item.title)
  },
  async fetchPage({}, { slug }) { // eslint-disable-line
    const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/rest/pages/${slug}/` : `${config.apiBaseUrlRemote}/rest/pages/${slug}/`

    return axios.get(url)
      .then((response) => {
        if (response.status === 200 && response.data && response.data.data) {
          const page = response.data.data
          return page
        } else {
          console.warn('response: ', response) // eslint-disable-line
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
    // We have to use Vue.set() here, see: https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    // Vue.set(state.data, 'currentPage', page)
    state.currentPage = page
  },
  SAVE_PAGE_IN_STORE(state, page) {
    state.pages.push(page)
  },
  SAVE_SITE(state, site) {
    state.site = site
  },
  SAVE_FILTER_DATA(state, data) {
    state.filterData = data
  },
  SAVE_BROADCASTS(state, data) {
    state.broadcasts = data
  }
}

const getters = {
  page: state => {
    if (state.loading || !state.currentPage) return false
    return state.currentPage
  },
  getMenu: state => {
    return state.site && state.site.navigation ? state.site.navigation : false
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
