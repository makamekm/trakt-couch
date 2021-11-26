<template>
  <div class="max-w-full min-h-full overflow-y-auto overflow-x-hidden">
    <transition name="fade">
      <Movie v-if="movie" :item="movie" />
      <CollectedMovies v-else-if="page === null" />
      <CollectedMovies v-else-if="page === 'trenging'" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollectedMovies from './CollectedMovies.vue'
import Movie from './Movie.vue'

export default {
  components: {
    CollectedMovies,
    Movie
  },
  computed: {
    ...mapGetters('router', {
      page: 'page',
      movie: 'movie',
      show: 'show',
      torrent: 'torrent',
      setting: 'setting'
    })
  },
  mounted () {
    this.onBackspace = (e) => {
      if (e.keyCode === 8) {
        if (this.movie) {
          this.setMovie(null)
        }
      }
    }
    document.addEventListener('keyup', this.onBackspace, true)
  },
  unmounted () {
    document.removeEventListener('keyup', this.onBackspace)
  },
  methods: {
    ...mapActions('router', {
      setMovie: 'setMovie'
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
  }
</style>
