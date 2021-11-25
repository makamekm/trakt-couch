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
    changePage ({ commit }, value) {
      commit('page', value)
    },
    changeMovie ({ commit }, value) {
      commit('movie', value)
    },
    changeShow ({ commit }, value) {
      commit('show', value)
    },
    changeTorrent ({ commit }, value) {
      commit('torrent', value)
    },
    changeSettings ({ commit }, value) {
      commit('settings', value)
    }
  }
}
