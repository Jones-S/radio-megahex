import { removeLeadingSlash, removeTrailingSlash } from '../utilities/helpers'
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
  async fetchArchive({ dispatch }) {
    dispatch('fetchBroadcastData')
    // because MAMP is unable to cope too many simultaneous requests we add a one tick timeout to postpone things a bit
    // no idea if this is a problem on the remote server...
    const timeoutDuration = process.env.NODE_ENV === 'development' ? 100 : 1
    setTimeout(async() => {
      console.log('fetching filter data a bit later...')
      dispatch('fetchFilterData')
    }, timeoutDuration)
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
      const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/filter` : `${config.apiBaseUrlRemote}/filter`
      const filterData = await axios.get(url)
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
        formats: mapFormats(filterData.formats),
        tags: filterData.tags,
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
    let url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}` : `${config.apiBaseUrlRemote}`
    // if we fetch the home slug, we don't just want to fetch the default page which is returned by the robinscholz better rest plugin
    // instead we want to add some info about related (linked) podcasts
    // that's why we need to fetch from a special endpoint for home.
    if (slug === 'home') {
      console.log('... fetching special home!');
      url = `${url}/megahex-home`
    } else {
      url = `${url}/rest/pages/${slug}/`
    }

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
    console.log('page: ', page)
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
  },
  // return filtered broadcasts by checking archiveFilter from ui store
  broadcasts: (state, getters, rootState) => {
    if (!rootState || !rootState.ui || !rootState.ui.archiveFilter) return state.broadcasts
    let filteredBroadcasts = state.broadcasts
    // filter broadcasts for tags
    if (rootState.ui.archiveFilter.data.tags && rootState.ui.archiveFilter.data.tags.length) {
      filteredBroadcasts = filteredBroadcasts.filter((broadcast) => {
        if (broadcast.tags && broadcast.tags.some((tag) => {
          if (rootState.ui.archiveFilter.data.tags.includes(tag)) return true
        })) {
          return broadcast
        }
      })
    }
    // and filter for channel (=format)
    if (rootState.ui.archiveFilter.data.format && rootState.ui.archiveFilter.data.format !== '0') { // when setting format to all, we have a string value of 0
      filteredBroadcasts = filteredBroadcasts.filter(broadcast => {
        if (broadcast.format === rootState.ui.archiveFilter.data.format) return broadcast
      })
    }
    return filteredBroadcasts
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
