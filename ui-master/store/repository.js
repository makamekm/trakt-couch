import { getField, updateField, createHelpers } from 'vuex-map-fields'
import _ from 'lodash'

function getUrl (base, form) {
  const params = []

  params.push(['query', form.query || ''])
  params.push(['language', form.language || ''])
  params.push(['visibility', form.visibility || ''])
  params.push(['pushed', form.pushed || ''])
  params.push(['status', form.status || ''])
  params.push(['hasFile', form.hasFile || ''])
  params.push(['user', form.user || ''])
  params.push(['organization', form.organization || ''])
  params.push(['followers', form.followers || ''])
  params.push(['stars', form.stars || ''])
  params.push(['forks', form.forks || ''])
  params.push(['created', form.created || ''])
  params.push(['license', form.license || ''])
  params.push(['topics', form.topics || ''])

  return base + '?' + new URLSearchParams(params).toString()
}

function getUrlGenerate (base, repository, form) {
  const params = []

  params.push(['repository', repository?.full_name || form.repository || ''])
  params.push(['rows', form.rows || ''])
  params.push(['included', form.included || '**/*'])
  params.push(['excluded', form.excluded || ''])

  return base + '?' + new URLSearchParams(params).toString()
}

function download (data, filename, type) {
  const file = new Blob([data], { type })
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename)
  } else {
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}

export const { mapFields } = createHelpers({
  getterType: 'repository/getField',
  mutationType: 'repository/updateField'
})

const cache = {}

export default {
  namespaced: true,
  state: () => ({
    list: [],
    isLoading: false,
    isLoadingRandom: false,
    isLoadingGenerate: false,
    repository: null,
    form: {
      query: '',
      language: '',
      visibility: '',
      pushed: '',
      status: '',
      hasFile: '',
      user: '',
      organization: '',
      followers: 0,
      stars: 0,
      forks: 0,
      created: '',
      license: '',
      topics: 0,
      rows: 2000,
      included: '',
      excluded: '',
      repository: ''
    }
  }),
  getters: {
    list (state) {
      return state.list
    },
    isLoading (state) {
      return state.isLoading
    },
    isLoadingRandom (state) {
      return state.isLoadingRandom
    },
    isLoadingGenerate (state) {
      return !!state.isLoadingGenerate
    },
    repository (state) {
      return state.repository
    },
    canGenerate (state) {
      return !!state.repository || !!state.form.repository
    },
    getField
  },
  mutations: {
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    setIsLoadingRandom (state, isLoadingRandom) {
      state.isLoadingRandom = isLoadingRandom
    },
    setIsLoadingGenerate (state, isLoadingGenerate) {
      state.isLoadingGenerate = isLoadingGenerate
    },
    setRepository (state, repository) {
      state.repository = repository || null
    },
    setList (state, list) {
      state.list = list || null
    },
    updateField
  },
  actions: {
    select ({ commit }, value) {
      commit('setRepository', value)
    },
    randomizeThrottle: _.throttle(async function ({ commit, state }) {
      try {
        const url = getUrl('/api/repository/random', state.form)
        const data = await this.$axios.$get(url)
        if (data.result) {
          commit('setRepository', data.result)
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.message || error.message)
      } finally {
        commit('setIsLoadingRandom', false)
      }
    }, 1000),
    async randomize ({ commit, dispatch }) {
      commit('setIsLoadingRandom', true)
      await dispatch('randomizeThrottle')
    },
    searchThrottle: _.throttle(async function ({ commit, state }) {
      try {
        const url = getUrl('/api/repository/search', state.form)
        const data = cache[url] || await this.$axios.$get(url)
        commit('setList', data.items || [])
        cache[url] = data
      } catch (error) {
        this.$toast.error(error.response?.data?.message || error.message)
      } finally {
        commit('setIsLoading', false)
      }
    }, 2000),
    async search ({ commit, dispatch }) {
      commit('setIsLoading', true)
      await dispatch('searchThrottle')
    },
    async generate ({ commit, state, dispatch }) {
      if (!state.isLoadingGenerate) {
        commit('setIsLoadingGenerate', true)
        try {
          const data = await this.$axios.$get(getUrlGenerate('/api/repository/generate', state.repository, state.form))
          await dispatch('user/loadUserForce', null, { root: true })
          download(data, 'report.txt', 'text/plain')
        } catch (error) {
          this.$toast.error(error.response?.data?.message || error.message)
        } finally {
          commit('setIsLoadingGenerate', false)
        }
      }
    }
  }
}
