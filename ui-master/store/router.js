export default {
  namespaced: true,
  state: () => ({
    page: null,
    movie: null,
    show: null,
    torrent: null,
    settings: null
  }),
  mutations: {
    page (state, page) {
      state.page = page || null
    },
    movie (state, movie) {
      state.movie = movie || null
    },
    show (state, show) {
      state.show = show || null
    },
    torrent (state, torrent) {
      state.torrent = torrent || null
    },
    settings (state, settings) {
      state.settings = settings || null
    }
  },
  actions: {
    setPage ({ commit, dispatch }, value) {
      dispatch('resetRouter')
      commit('page', value)
    },
    setMovie ({ commit }, value) {
      commit('movie', value)
    },
    setShow ({ commit }, value) {
      commit('show', value)
    },
    setTorrent ({ commit }, value) {
      commit('torrent', value)
    },
    setSettings ({ commit }, value) {
      commit('settings', value)
    },
    resetRouter ({ commit, dispatch }) {
      dispatch('torrent/resetTorrents', null, { root: true })
      commit('page', null)
      commit('movie', null)
      commit('show', null)
      commit('torrent', null)
      commit('settings', null)
    }
  },
  getters: {
    page (state) {
      return state.page
    },
    movie (state) {
      return state.movie
    },
    show (state) {
      return state.show
    },
    torrent (state) {
      return state.torrent
    },
    settings (state) {
      return state.settings
    }
  }
}
