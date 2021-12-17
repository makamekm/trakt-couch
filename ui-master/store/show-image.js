import Vue from 'vue'
import { createHotPromise } from '~/services/hot-promise'

export default {
  namespaced: true,
  state: () => ({
    images: {},
    imagesPromises: {},
    imagesIsLoading: {}
  }),
  mutations: {
    images (state, { key, images }) {
      Vue.set(state.images, key, images)
    },
    imagesPromises (state, { key, promise }) {
      Vue.set(state.imagesPromises, key, promise)
    },
    imagesIsLoading (state, { key, value }) {
      Vue.set(state.imagesIsLoading, key, value)
    }
  },
  actions: {
    clearImage ({ commit, getters }, item) {
      const images = getters.images(item)

      if (images) {
        commit('images', {
          key: item.show.ids.imdb || item.show.ids.tmdb,
          images: null
        })
      }
    },
    async loadImage ({ commit, getters }, item) {
      let images = getters.images(item)
      let promise = getters.imagesProimse(item)

      if (images?.poster) {
        return images
      }

      if (promise && !promise.resolved) {
        return promise
      }

      commit('imagesIsLoading', {
        key: item.show.ids.imdb || item.show.ids.tmdb,
        value: true
      })

      promise = createHotPromise()
      commit('imagesPromises', {
        key: item.show.ids.imdb || item.show.ids.tmdb,
        promise
      })

      try {
        images = await this.$trakt.getShowImages(item)
        commit('images', {
          key: item.show.ids.imdb || item.show.ids.tmdb,
          images
        })
        promise.resolve(images)
      } catch (error) {
        promise.reject(error)
        // eslint-disable-next-line no-console
        console.error(error, item)
        // this.$toast.error(error.response?.data?.message || error.message)
      } finally {
        commit('imagesIsLoading', {
          key: item.show.ids.imdb || item.show.ids.tmdb,
          value: false
        })
      }
    }
  },
  getters: {
    images (state) {
      return (item) => {
        return state.images[item.show.ids.imdb || item.show.ids.tmdb]
      }
    },
    poster (state) {
      return (item) => {
        const images = state.images[item.show.ids.imdb || item.show.ids.tmdb]
        const imageUrl = images?.poster
        // if (imageUrl) {
        //   if ()
        // }
        return imageUrl
      }
    },
    imagesProimse (state) {
      return (item) => {
        return state.imagesPromises[item.show.ids.imdb || item.show.ids.tmdb]
      }
    },
    imagesIsLoading (state) {
      return (item) => {
        return state.imagesIsLoading[item.show.ids.imdb || item.show.ids.tmdb]
      }
    }
  }
}
