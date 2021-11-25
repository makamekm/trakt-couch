import _ from 'lodash'

export default {
  namespaced: true,
  state: () => ({
    collectedMovies: [],
    isLoading: true
  }),
  mutations: {
    setCollectionMovies (state, values) {
      console.log(JSON.stringify(values[10], null, 4))
      state.collectedMovies = values || []
    },
    setIsLoading (state, value) {
      state.isLoading = value
    }
  },
  actions: {
    loadCollectionMoviesThrottled: _.throttle(async function ({ commit, state }) {
      try {
        commit('setCollectionMovies', await this.$trakt.getCollectionMovies())
      } catch (error) {
        this.$toast.error(error.response?.data?.message || error.message)
      } finally {
        commit('setIsLoading', false)
      }
    }, 2000),
    async loadCollectionMovies ({ commit, dispatch }) {
      commit('setIsLoading', true)
      await dispatch('loadCollectionMoviesThrottled')
    }
  }
}
