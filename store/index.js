import Vuex from 'vuex'
import User from './user'
import Device from './device'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'
const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: true
      // authUser: {
      //   kikuk: 'sasasas'
      // }
    },
    mutations: {
      setLoading (state, data) {
        state.loading = data
      }
      // SET_USER: function (state, user) {
      //   state.authUser = user
      // }
    },
    actions: {
      // nuxtServerInit ({ commit }, { req }) {
      //   if (req.session && req.user) {
      //     commit('SET_USER', req.user)
      //   }
      // }
      async nuxtServerInit ({ commit, dispatch }, { req, res }) {}
    },
    plugins: process.browser
      ? [
        createPersistedState({
          storage: window.sessionStorage
        })
      ]
      : [],
    modules: {
      User,
      Device
    }
  })
}

export default createStore
