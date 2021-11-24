import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    modules: ['repository'],
    reducer: (state) => {
      return {
        repository: {
          form: state.repository.form,
          repository: state.repository.repository
        }
      }
    },
    storage: window.localStorage
  }).plugin(store)
}
