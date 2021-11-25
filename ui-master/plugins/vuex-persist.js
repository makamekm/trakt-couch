import VuexPersistence from 'vuex-persist'
import { traktFactory } from '~/api/trakt'
import { createHotPromise } from '~/services/hot-promise'

export default ({ store }) => {
  store.$trakt = traktFactory(store)
  store.$storageInit = createHotPromise()

  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'trakt',
      modules: ['trakt'],
      reducer: (state) => {
        return {
          trakt: {
            session: state.trakt.session
          }
        }
      },
      storage: window.localStorage
    }).plugin(store)

    new VuexPersistence({
      key: 'movie-image',
      modules: ['movie-image'],
      reducer: (state) => {
        return {
          'movie-image': {
            images: state['movie-image'].images
          }
        }
      },
      storage: window.localStorage
    }).plugin(store)

    new VuexPersistence({
      key: 'router',
      modules: ['router'],
      reducer: (state) => {
        return {
          router: state.router
        }
      },
      storage: window.localStorage
    }).plugin(store)

    store.$storageInit.resolve()
  })
}
