import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userToken: ''
  },
  actions: {
  },
  mutations: {
    setUserToken: (state, val) => {
      state.userToken = val
    }
  },
  getters: {
    getUserToken: (state) => {
      return state.userToken
    }
  }
})

export default store
