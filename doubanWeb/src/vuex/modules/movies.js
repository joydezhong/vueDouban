export default {
  namespaced: true,
  state: {
    searchGradeRange: []
  },

  mutations: {
    updateState (state, data) {
      // console.log(state,data,'updateMessage')
      state[data.type] = data.value;
    }
  }
}
