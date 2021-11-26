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
    setPage ({ commit }, value) {
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
