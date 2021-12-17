import _ from 'lodash'

export default {
  namespaced: true,
  state: () => ({
    code: null,
    url: null,
    session: null,
    initialized: false,
    error: null
  }),
  mutations: {
    code (state, code) {
      state.code = code || null
    },
    url (state, url) {
      state.url = url || null
    },
    session (state, session) {
      state.session = session || null
    },
    initialized (state, value) {
      state.initialized = value
    },
    error (state, value) {
      state.error = value
    }
  },
  actions: {
    async loadSessionForce ({ commit }) {
      if (process.server) {
        return
      }

      await this.$storageInit

      commit('error', null)

      if (this.state.trakt.session) {
        this.$trakt.access_token = this.state.trakt.session.access_token
        this.$trakt.sessionInit.resolve()
        commit('initialized', true)
        return this.state.trakt.session
      }

      try {
        const session = await this.$trakt
          .getCodes()
          .then((poll) => {
            commit('code', poll.user_code)
            commit('url', poll.verification_url)
            commit('initialized', true)
            return this.$trakt.pollAccess(poll)
          })
        commit('session', session)
        this.$trakt.access_token = session.access_token
        this.$trakt.sessionInit.resolve()
        return session
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        commit('session', null)
        commit('error', error.message)
      } finally {
        commit('initialized', true)
      }
    },
    loadSession: _.memoize(async function ({ dispatch }) {
      await dispatch('loadSessionForce')
    }),
    resession ({ commit }) {
      commit('session', null)
    }
  },
  getters: {
    hasInitialized (state) {
      return state.initialized
    }
  }
}
