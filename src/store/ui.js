const state = {
  menuOpen: false
}

// actions
const actions = {
  setCurrentPlayer() {
    // action does nothing, components can subscribe to it
  },
}

// mutations
const mutations = {
  TOGGLE_SPYMASTER(state) {
    state.spymasterView = !state.spymasterView
  }
}

const getters = {
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
