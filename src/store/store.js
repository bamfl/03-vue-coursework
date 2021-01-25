import { createStore } from 'vuex'

export default createStore({
  state () {
		return {
			allTasks: []
		}
	},
	getters: {
		allTasks(state) {
			return state.allTasks
		}
	},
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
