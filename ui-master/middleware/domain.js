export default function ({ route, store, req, redirect }) {
  if (process.server) {
    store.commit('domain/setScope', req.headers.referer?.startsWith('https') ? 'https' : 'http')
    store.commit('domain/setDomain', req.headers.host || '')
  }
}
