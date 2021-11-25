import Vue from 'vue'
import { createHotPromise } from '~/services/hot-promise'

export default {
  namespaced: true,
  state: () => ({
    images: {},
    imagesPromises: {}
  }),
  mutations: {
    setImages (state, { key, images }) {
      Vue.set(state.images, key, images)
    },
    imagesPromises (state, { key, promise }) {
      Vue.set(state.imagesPromises, key, promise)
    }
  },
  actions: {
    async loadImage ({ commit, getters }, item) {
      const images = getters.images(item)

      if (images) {
        return images
      }

      const promise = createHotPromise()
      commit('imagesPromises', {
        key: item.movie.ids.imdb || item.movie.ids.tmdb,
        promise
      })

      try {
        const images = await this.$trakt.getMovieImages(item)
        commit('setImages', {
          key: item.movie.ids.imdb || item.movie.ids.tmdb,
          images
        })
        promise.resolve(images)
      } catch (error) {
        promise.reject(error)
        // eslint-disable-next-line no-console
        console.error(error)
        // this.$toast.error(error.response?.data?.message || error.message)
      }
    }
  },
  getters: {
    images (state) {
      return (item) => {
        return state.images[item.movie.ids.imdb || item.movie.ids.tmdb]
      }
    },
    imagesProimse (state) {
      return (item) => {
        return state.imagesPromises[item.movie.ids.imdb || item.movie.ids.tmdb]
      }
    }
  }
}
