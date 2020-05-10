const state = {
  navMenuOpen: false,
  breakpointCurrent: false
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
  UPDATE_BREAKPOINT(state, breakpoint) {
    // Save current breakpoint
    state.breakpointCurrent = breakpoint
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
