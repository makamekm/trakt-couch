import _ from 'lodash'

export default {
  namespaced: true,
  state: () => ({
    collectedShows: [],
    isLoading: true
  }),
  mutations: {
    setCollectionShows (state, values) {
      // console.log(JSON.stringify(values[10], null, 4))
      state.collectedShows = values || []
    },
    setIsLoading (state, value) {
      state.isLoading = value
    }
  },
  actions: {
    loadCollectionShowsThrottled: _.throttle(async function ({ commit, state }) {
      try {
        commit('setCollectionShows', await this.$trakt.getCollectionShows())
      } catch (error) {
        this.$toast.error(error.response?.data?.message || error.message)
      } finally {
        commit('setIsLoading', false)
      }
    }, 2000),
    async loadCollectionShows ({ commit, dispatch }) {
      commit('setIsLoading', true)
      await dispatch('loadCollectionShowsThrottled')
    }
  }
}
