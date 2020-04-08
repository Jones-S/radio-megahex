const state = {
  menuOpen: false
}

// actions
const actions = {
  toggleSpyMaster({ commit }) {
    commit('TOGGLE_SPYMASTER')
  }
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
