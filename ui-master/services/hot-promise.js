export const createHotPromise = () => {
  let rr, ee
  const promise = new Promise((resolve, reject) => {
    rr = resolve
    ee = reject
  })
  promise.resolve = rr
  promise.reject = ee
  return promise
}
