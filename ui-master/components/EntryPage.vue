<template>
  <div class="min-w-full max-w-full min-h-full overflow-y-auto overflow-x-hidden relative">
    <transition name="fade">
      <MovieTorrents v-if="torrentsMovie" />
      <ShowTorrents v-else-if="torrentsShow" />
      <Show v-else-if="show" :item="show" />
      <Movie v-else-if="movie" :item="movie" />
      <CollectedShows v-else-if="page === 'collected-shows'" />
      <CollectedMovies v-else />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollectedMovies from './CollectedMovies.vue'
import CollectedShows from './CollectedShows.vue'
import Movie from './Movie.vue'
import Show from './Show.vue'
import MovieTorrents from './MovieTorrents.vue'
import ShowTorrents from './ShowTorrents.vue'

export default {
  components: {
    CollectedMovies,
    Movie,
    Show,
    MovieTorrents,
    ShowTorrents,
    CollectedShows
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
    this.addRouteState = () => {
      const url = new URL(window.location)
      url.searchParams.set('state', (Math.random() * 1000).toFixed(0))
      window.history.pushState({}, '', url)
    }

    this.addRouteState()

    this.onRouteChange = () => {
      if (this.$store.$overlays.length) {
        this.addRouteState()
      } else if (this.torrentsMovie) {
        this.addRouteState()
        this.resetTorrents()
      } else if (this.torrentsShow) {
        this.addRouteState()
        this.resetTorrents()
      } else if (this.movie) {
        this.addRouteState()
        this.setMovie(null)
      } else if (this.show) {
        this.addRouteState()
        this.setShow(null)
      } else {
        TVXInteractionPlugin?.executeAction('back')
        TVXInteractionPlugin?.executeAction('reload')
        TVXInteractionPlugin?.executeAction('interaction:unload')
      }
    }

    window.addEventListener('popstate', this.onRouteChange)

    this.onBackspace = (e) => {
      if (e.keyCode === 8) {
        if (this.torrentsMovie) {
          window.history.back()
        } else if (this.torrentsShow) {
          window.history.back()
        } else if (this.movie) {
          window.history.back()
        } else if (this.show) {
          window.history.back()
        } else {
          window.history.back()
        }
        e.preventDefault()
        e.stopPropagation()
        // if (this.torrentsMovie) {
        //   this.resetTorrents()
        //   // e.preventDefault()
        //   // e.stopPropagation()
        // } else if (this.movie) {
        //   this.setMovie(null)
        //   // e.preventDefault()
        //   // e.stopPropagation()
        // }
      }
    }

    document.addEventListener('keyup', this.onBackspace, true)
  },
  unmounted () {
    window.removeEventListener('popstate', this.onRouteChange)
    document.removeEventListener('keyup', this.onBackspace)
    window.onpopstate = undefined
  },
  methods: {
    ...mapActions('router', {
      setMovie: 'setMovie',
      setShow: 'setShow'
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
    -webkit-transform: translate3d(0, 0, 0);
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform: translate3d(0, 0, 0);
  }
</style>

<style lang="scss">
  .gpu {
    -webkit-transform: translate3d(0, 0, 0);
  }
</style>
