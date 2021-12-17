export default {
  namespaced: true,
  state: () => ({
    show: null,
    movie: null,
    torrents: [],
    isLoading: false
  }),
  mutations: {
    torrents (state, { torrents, movie, show }) {
      state.torrents = torrents || []
      state.movie = movie || null
      state.show = show || null
    },
    reset (state) {
      state.torrents = []
      state.movie = null
      state.show = null
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading || false
    }
  },
  actions: {
    resetTorrents ({ commit }) {
      commit('reset')
    },
    async searchMovieTorrents ({ commit }, item) {
      commit('isLoading', true)
      try {
        const query = encodeURIComponent(`${item.movie.title}`)
        const torrents = await this.$axios.$get('/api/jackett/' + query)
        // eslint-disable-next-line no-console
        commit('torrents', { torrents: torrents.Results, movie: item })
        return torrents
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        commit('isLoading', false)
      }
    },
    async searchMovieTorrentsOLD ({ commit }, item) {
      commit('isLoading', true)
      try {
        const query = encodeURIComponent(`${item.movie.title}`)
        const torrents = await this.$axios.$get('/api/jacred/torrents?search=' + query)
        // eslint-disable-next-line no-console
        commit('torrents', { torrents, movie: item })
        return torrents
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        commit('isLoading', false)
      }
    },
    async searchShowTorrents ({ commit }, item) {
      commit('isLoading', true)
      try {
        const query = encodeURIComponent(`${item.show.title}`)
        const torrents = await this.$axios.$get('/api/jackett/' + query)
        // eslint-disable-next-line no-console
        commit('torrents', { torrents: torrents.Results, show: item })
        return torrents
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        commit('isLoading', false)
      }
    }
  },
  getters: {
    torrents (state) {
      return [...state.torrents].sort((a, b) => (b.Seeders + b.Peers / 20) - (a.Seeders + b.Peers / 20)).slice(0, 20)
    },
    isLoading (state) {
      return state.isLoading
    },
    movie (state) {
      return state.movie
    },
    show (state) {
      return state.show
    }
  }
}
