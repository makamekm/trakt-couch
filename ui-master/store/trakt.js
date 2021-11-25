import _ from 'lodash'

export default {
  namespaced: true,
  state: () => ({
    code: null,
    url: null,
    session: null,
    initialized: false
  }),
  mutations: {
    setCode (state, code) {
      state.code = code || null
    },
    setUrl (state, url) {
      state.url = url || null
    },
    setSession (state, session) {
      state.session = session || null
    },
    setInitialize (state, value) {
      state.initialized = value
    }
  },
  actions: {
    async loadSessionForce ({ commit }) {
      if (process.server) {
        return
      }

      await this.$storageInit

      if (this.state.trakt.session) {
        this.$trakt.access_token = this.state.trakt.session.access_token
        this.$trakt.sessionInit.resolve()
        commit('setInitialize', true)
        return this.state.trakt.session
      }

      try {
        const session = await this.$trakt
          .getCodes()
          .then((poll) => {
            commit('setCode', poll.user_code)
            commit('setUrl', poll.verification_url)
            commit('setInitialize', true)
            return this.$trakt.pollAccess(poll)
          })
        commit('setSession', session)
        this.$trakt.access_token = session.access_token
        this.$trakt.sessionInit.resolve()
        return session
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        commit('setSession', null)
      } finally {
        commit('setInitialize', true)
      }
    },
    loadSession: _.memoize(async function ({ dispatch }) {
      await dispatch('loadSessionForce')
    }),
    resetSession ({ commit }) {
      commit('setSession', null)
    }
  },
  getters: {
    hasInitialized (state) {
      return state.initialized
    }
  }
}
