<template>
  <div class="flex flex-col space-y-4 items-start justify-center py-4 w-screen min-h-full">
    <div
      class="max-w-full w-full"
    >
      <div class="px-16 text-2xl opacity-80">
        Collected Movies
      </div>

      <HorizontalScrollContainer v-if="isLoading" class="space-x-6 py-4 px-16">
        <div
          v-for="i in 5"
          :key="i"
          class="flex flex-col items-center justify-center h-56 animate-pulse"
        >
          <div class="w-36 h-48 bg-white bg-opacity-40 rounded-md" />
        </div>
      </HorizontalScrollContainer>

      <HorizontalScrollContainer v-else class="space-x-6 py-4 px-16">
        <button
          v-for="item in collectedMovies"
          ref="items"
          :key="item.movie.ids.trakt"
          v-focus
          class="first-focus min-w-max group flex items-center justify-between p-0 border border-transparent text-md font-medium rounded-md text-white focus:outline-none"
          @click="onClick(item)"
          @focus="selected = item"
        >
          <MoviePosterSelectable :item="item" />
        </button>
      </HorizontalScrollContainer>

      <div v-if="selected" class="px-16 space-y-4 h-32">
        <div class="flex w-full justify-between items-center">
          <div class="font-semibold text-3xl">
            {{ selected.movie.title }} ({{ selected.movie.year }})
          </div>
          <div class="text-5xl font-semibold flex justify-center items-center">
            <template v-if="selected.movie.rating">
              {{ Number(selected.movie.rating).toFixed(1).toLocaleString() }}
            </template>
          </div>
        </div>
        <div v-snip="3">
          {{ selected.movie.overview }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HorizontalScrollContainer from './HorizontalScrollContainer.vue'
import MoviePosterSelectable from './MoviePosterSelectable.vue'

export default {
  components: {
    HorizontalScrollContainer,
    MoviePosterSelectable
  },
  data () {
    return {
      selected: null
    }
  },
  computed: {
    ...mapState('collection-movies', {
      collectedMovies: 'collectedMovies',
      isLoading: 'isLoading'
    })
  },
  watch: {
    isLoading (value) {
      if (!value) {
        setTimeout(() => this.$refs.items?.[0]?.focus(), 300)
      }
    }
  },
  mounted () {
    this.loadCollectionMovies()
  },
  methods: {
    ...mapActions('collection-movies', {
      loadCollectionMovies: 'loadCollectionMovies'
    }),
    ...mapActions('router', {
      setMovie: 'setMovie'
    }),
    onClick (item) {
      this.setMovie(item)
    }
  }
}
</script>
