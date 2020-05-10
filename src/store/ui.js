const state = {
  navMenuOpen: false,
  currentImageUrl: false
}

// actions
const actions = {
  setCurrentPlayer() {
    // action does nothing, components can subscribe to it
  },
  setTopFloatingElement() {
    // action does nothing, components can subscribe to it
  },
  saveReceivedImage({ commit }, payload) { // eslint-disable-line
    // save image in store, in case client reconnects to server
    commit('SAVE_CURRENT_IMAGE', payload)
  },
  toggleMenu({ commit }) {
    commit('TOGGLE_MENU')
  },
  closeMenu({ commit, state }) {
    if (state.navMenuOpen) commit('CLOSE_MENU')
  },
}

// mutations
const mutations = {
  TOGGLE_MENU(state) {
    state.navMenuOpen = !state.navMenuOpen
    // state.navMenuOpen ? noScroll.on() : noScroll.off()
  },
  CLOSE_MENU(state) {
    state.navMenuOpen = false
    // noScroll.off()
  },
  SAVE_CURRENT_IMAGE(state, imgUrl) {
    state.currentImageUrl = imgUrl
  }
}

const getters = {
  navMenuOpen: state => state.navMenuOpen
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
