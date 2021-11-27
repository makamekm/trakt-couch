<template>
  <div class="min-w-full max-w-full min-h-full overflow-y-auto overflow-x-hidden relative">
    <transition name="fade">
      <MovieTorrents v-if="torrentsMovie" />
      <Movie v-else-if="movie" :item="movie" />
      <CollectedMovies v-else-if="page === 'trenging'" />
      <CollectedMovies v-else />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollectedMovies from './CollectedMovies.vue'
import Movie from './Movie.vue'
import MovieTorrents from './MovieTorrents.vue'

export default {
  components: {
    CollectedMovies,
    Movie,
    MovieTorrents
  },
  computed: {
    ...mapGetters('router', {
      page: 'page',
      movie: 'movie',
      show: 'show',
      torrent: 'torrent',
      setting: 'setting'
    }),
    ...mapGetters('torrent', {
      torrents: 'torrents',
      torrentsMovie: 'movie',
      torrentsShow: 'show'
    })
  },
  mounted () {
    const url = new URL(window.location)
    url.searchParams.set('state', 'inited')
    window.history.pushState({}, '', url)

    window.onpopstate = () => {
      let canExit = false

      if (this.torrentsMovie) {
        this.resetTorrents()
      } else if (this.movie) {
        this.setMovie(null)
      } else {
        canExit = true
      }

      if (!canExit) {
        const url = new URL(window.location)
        url.searchParams.set('state', 'inited')
        window.history.pushState({}, '', url)
      }
    }

    this.onBackspace = (e) => {
      if (e.keyCode === 8) {
        if (this.torrentsMovie) {
          this.resetTorrents()
          // e.preventDefault()
          // e.stopPropagation()
        } else if (this.movie) {
          this.setMovie(null)
          // e.preventDefault()
          // e.stopPropagation()
        }
      }
    }

    document.addEventListener('keyup', this.onBackspace, true)
  },
  unmounted () {
    document.removeEventListener('keyup', this.onBackspace)
    window.onpopstate = undefined
  },
  methods: {
    ...mapActions('router', {
      setMovie: 'setMovie'
    }),
    ...mapActions('torrent', {
      resetTorrents: 'resetTorrents'
    })
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
