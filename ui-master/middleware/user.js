export default async function ({ route, store, req, redirect }) {
  await store.dispatch('user/loadUser')
}
