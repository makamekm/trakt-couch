import VuexPersistence from 'vuex-persist'
import { traktFactory } from '~/api/trakt'
import { createHotPromise } from '~/services/hot-promise'

export default ({ store }) => {
  store.$trakt = traktFactory(store)
  store.$storageInit = createHotPromise()

  window.onNuxtReady(() => {
    new VuexPersistence({
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

    store.$storageInit.resolve()
  })
}
