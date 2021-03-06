const state = {
  navMenuOpen: false,
  chatOpen: false,
  breakpointCurrent: false,
  archiveFilter: {
    data: {
      tags: [],
      format: false
    }
  }
}

// actions
const actions = {
  setCurrentPlayer() {
    // action does nothing, components can subscribe to it
  },
  setTopFloatingElement() {
    // action does nothing, components can subscribe to it
  },
  toggleMenu({ commit }) {
    commit('TOGGLE_MENU')
  },
  toggleChat({ commit }) {
    commit('TOGGLE_CHAT')
  },
  setArchiveFilter({ commit }, data) {
    commit('SAVE_ARCHIVE_FILTER', data)
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
  TOGGLE_CHAT(state) {
    state.chatOpen = !state.chatOpen
  },
  CLOSE_MENU(state) {
    state.navMenuOpen = false
    // noScroll.off()
  },
  UPDATE_BREAKPOINT(state, breakpoint) {
    // Save current breakpoint
    state.breakpointCurrent = breakpoint
  },
  SAVE_ARCHIVE_FILTER(state, data) {
    state.archiveFilter = data
  },
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
