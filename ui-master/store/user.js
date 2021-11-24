import _ from 'lodash'
import moment from 'moment'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    initialized: false
  }),
  mutations: {
    setUser (state, user) {
      state.user = user || null
    },
    setInitialize (state, value) {
      state.initialized = value
    }
  },
  actions: {
    loadUserForce ({ commit }) {
      // const user = await this.$axios.$get('/api/user/me')
      const user = {
        id: 123123
      }
      commit('setUser', user)
    },
    loadUser: _.memoize(async function ({ dispatch }) {
      await dispatch('loadUserForce')
    }),
    initialize ({ commit }) {
      if (!process.server) {
        commit('setInitialize', true)
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    hasSubscription (state) {
      return state.user?.isSubscribed
    },
    restSubscriptionDays (state) {
      return state.user?.payedUpTo && moment(new Date(state.user.payedUpTo)).diff(moment(new Date()), 'days') + 1
    },
    payedUpTo (state) {
      return state.user?.payedUpTo && moment(new Date(state.user.payedUpTo)).format('DD/MM/YYYY, HH:mm')
    },
    canRunGenerate (state) {
      return state.user?.canRunGenerate
    },
    hasInitialized (state) {
      return state.initialized
    }
  }
}
