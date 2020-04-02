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
  cards: (state) => {
    if (state.current25Words.length && state.gamePattern.length && state.current25Words.length === state.gamePattern.length) {
      return state.current25Words.map((word, index) => {
        return {
          text: word,
          type: state.gamePattern[index]
        }
      })
    } else {
      return false
    }
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}