import {
  removeLeadingSlash,
  removeTrailingSlash
} from '../utilities/helpers'
import axios from 'axios'
import config from '../config'
import {
  mergeArraysByValue
} from '../utilities/helpers'

const state = {
  pages: [],
  currentPage: false,
  broadcasts: false,
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
    let path = removeTrailingSlash(removeLeadingSlash(payload.path))
    if (!path) {
      path = config.homeSlug
    }

    // kirby cms stores subpages like this:
    // parentpage/childpage -> parentpage+childpage
    // so let's replace the slash with a +
    const requestPath = path.replace('/', '+')

    const pageInStore = state.pages.find(p => p.id === path)

    // check if page already is in store
    if (pageInStore) {
      commit('SAVE_CURRENT_PAGE', pageInStore)
    } else {
      const page = await dispatch('fetchPage', {
        // lang: payload.lang,
        slug: requestPath
      })
      commit('SAVE_CURRENT_PAGE', page)
      commit('SAVE_PAGE_IN_STORE', page)
      commit('SET_LOADING_DONE')
    }
  },
  async fetchBroadCastData({ commit, state, dispatch}) {
    if (!state.broadcasts) {
      const broadcasts = await dispatch('fetchBroadCasts')
      const broadcastsMeta = await dispatch('fetchbroadcastsMeta')

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
  async fetchBroadCasts() {
    return axios.get(config.recordingsUrl)
      .then((response) => {
        console.log('response: ', response)
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
    console.log('fetch: ')
    return axios.get(url)
      .then((response) => {
        console.log('response: ', response)
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
    const broadcastsMeta = [...meta]
    // const broadcastsArray = [{
    //     'name': 'jones1.mp3',
    //     'type': 'file',
    //     'mtime': 'Thu, 07 Apr 2020 17:59:48 GMT',
    //     'size': 286854928
    //   },
    //   {
    //     'name': 'jones2.mp3',
    //     'type': 'file',
    //     'mtime': 'Thu, 09 Apr 2020 17:59:48 GMT',
    //     'size': 286854928
    //   },
    //   ...broadcasts,
    //   {
    //     'name': 'jonesi.mp3',
    //     'type': 'file',
    //     'mtime': 'Thu, 09 Aug 2020 10:59:48 GMT',
    //     'size': 286854928
    //   },
    //   {
    //     'name': 'jones.mp3',
    //     'type': 'file',
    //     'mtime': 'Thu, 09 Dec 2021 10:59:48 GMT',
    //     'size': 286854928
    //   }
    // ]
    // const broadcastsMeta = [
    //   ...meta,
    //   {
    //     "title": "Jones is in da House. Parganzi a longer title even go for itèè",
    //     "file": "jones1.mp3",
    //     "start_time": "14:00",
    //     "end_time": "18:00"
    //   },
    //   {
    //     "title": "Jones is in da House. Parganzi a longer title even go for ",
    //     "file": "jones2.mp3",
    //     "start_time": "14:00",
    //     "end_time": "18:00"
    //   },
    //   {
    //     "title": "Jones is in da House. Parganzi a longer title even go for 12",
    //     "file": "jonesi.mp3",
    //     "start_time": "14:00",
    //     "end_time": "18:00"
    //   },
    //   {
    //     "title": "Jones is in da House. Parganzi",
    //     "file": "jones.mp3",
    //     "start_time": "14:00",
    //     "end_time": "18:00"
    //   },
    // ]
    const mergedArray = mergeArraysByValue(broadcastsArray, broadcastsMeta, 'name', 'file')

    // Filter those out which don't have any metadata
    return mergedArray.filter(item => item.title)

  },
  async fetchPage({}, { slug }) { // eslint-disable-line
    const url = process.env.NODE_ENV === 'development' ? `${config.apiBaseUrlLocal}/rest/pages/${slug}/` : `${config.apiBaseUrlRemote}/rest/pages/${slug}/`

    return axios.get(url)
      .then((response) => {
        console.log('response: ', response)
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
  SAVE_BROADCASTS(state, data) {
    state.broadcasts = data
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
