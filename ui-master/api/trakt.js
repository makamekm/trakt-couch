import { createHotPromise } from '~/services/hot-promise'

export const traktFactory = store => ({
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
  access_token: null,
  sessionInit: createHotPromise(),
  getCodes () {
    // const myRequest = new Request('/api/trakt/oauth/device/code', {
    //   method: 'POST',
    //   // mode: 'no-cors',
    //   body: JSON.stringify({
    //     client_id: this.client_id
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'trakt-api-key': this.client_id,
    //     // 'trakt-api-version': '2'
    //   }
    // })

    // return fetch(myRequest).then((response) => {
    //   return response.body
    // }).then((response) => {
    //   console.log(response)
    //   return response
    // }).catch((e) => {
    //   console.log(e)
    // })

    return store.$axios.$get('/api/trakt/code')

    // return store.$axios({
    //   method: 'post',
    //   mode: 'no-cors',
    //   url: '/api/trakt/oauth/device/code',
    //   data: {
    //     client_id: this.client_id
    //   },
    //   // referrer: 'https://trakt.rowanberry.xyz',
    //   // origin: 'https://trakt.rowanberry.xyz',
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'trakt-api-key': this.client_id,
    //     // 'trakt-api-version': '2'
    //   }
    // })

    // return store.$axios.$post('/oauth/device/code', {
    //   client_id: this.client_id
    // })
  },
  async pollAccess (poll) {
    let session = null

    do {
      session = await store.$axios({
        method: 'post',
        url: '/api/trakt/oauth/device/token',
        data: {
          code: poll.device_code
        },
        validateStatus (status) {
          return status === 200 || status === 400
        }
      })
      if (session.status !== 200) {
        await new Promise(resolve => setTimeout(resolve, 10000))
      }
    } while (!session || session.status !== 200)

    return session.data
  },
  async getCollectionMovies () {
    await this.sessionInit
    return await store.$axios({
      method: 'get',
      url: '/api/trakt/sync/collection/movies?extended=full',
      headers: {
        Authorization: `Bearer ${this.access_token}`
      }
    }).then(r => r.data)
  },
  async getCollectionShows () {
    await this.sessionInit
    return await store.$axios({
      method: 'get',
      url: '/api/trakt/sync/collection/shows?extended=full',
      headers: {
        Authorization: `Bearer ${this.access_token}`
      }
    }).then(r => r.data)
  },
  async getMovieFanartTVImage (item) {
    return await store.$axios({
      method: 'get',
      url: `/api/fanart/movies/${item.movie.ids.imdb}?api_key=7b33bf78562656116a1e4df7e5b561c6`
    }).then((r) => {
      return { poster: r.data.movieposter?.[0]?.url, art: r.data.moviebackground?.[0]?.url }
    })
  },
  async getMovieTMDBImage (item) {
    return await store.$axios({
      method: 'get',
      url: `/api/tmdb/movie/${item.movie.ids.tmdb}?api_key=9d41796deb35c0f5873b3c96ed2ce4a8`
    }).then((r) => {
      return { poster: 'https://image.tmdb.org/t/p/w500' + r.data.poster_path, art: 'https://image.tmdb.org/t/p/original' + r.data.backdrop_path }
    })
  },
  async getMovieImages (item) {
    let images = { poster: undefined, art: undefined }

    if (!images.poster && item.movie.ids.tmdb) {
      try {
        images = { ...images, ...await this.getMovieTMDBImage(item) }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error, item)
      }
    }

    if (!images.poster && item.movie.ids.imdb) {
      try {
        images = { ...images, ...await this.getMovieFanartTVImage(item) }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error, item)
      }
    }

    return images
  },
  async getShowTMDBImage (item) {
    return await store.$axios({
      method: 'get',
      url: `/api/tmdb/tv/${item.show.ids.tmdb}?api_key=9d41796deb35c0f5873b3c96ed2ce4a8`
    }).then((r) => {
      return { poster: 'https://image.tmdb.org/t/p/w500' + r.data.poster_path, art: 'https://image.tmdb.org/t/p/original' + r.data.backdrop_path }
    })
  },
  async getShowImages (item) {
    let images = { poster: undefined, art: undefined }

    if (!images.poster && item.show.ids.tmdb) {
      try {
        images = { ...images, ...await this.getShowTMDBImage(item) }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error, item)
      }
    }

    return images
  }
})
