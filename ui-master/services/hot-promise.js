export const createHotPromise = () => {
  let rr, ee
  const promise = new Promise((resolve, reject) => {
    rr = resolve
    ee = reject
  })
  promise.resolve = (...args) => {
    rr(...args)
    promise.resolved = true
  }
  promise.reject = (...args) => {
    ee(...args)
    promise.resolved = true
  }
  return promise
}
