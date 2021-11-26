<template>
  <div class="flex flex-col space-y-4 items-start justify-center py-16 w-screen min-h-full">
    <div
      class="max-w-full w-full"
    >
      <div class="text-medium px-24 text-4xl mb-10 opacity-80">
        Collected Movies
      </div>

      <div v-if="selected" class="text-medium px-24 mb-4 space-y-2">
        <div class="flex w-full justify-between items-center">
          <div class="text-3xl h-8">
            {{ selected.movie.title }} ({{ selected.movie.year }})
          </div>
          <div class="text-5xl font-semibold h-20 flex justify-center items-center">
            <template v-if="selected.movie.rating">
              {{ Number(selected.movie.rating).toFixed(1).toLocaleString() }}
            </template>
          </div>
        </div>
        <div v-snip="3" class="h-24">
          {{ selected.movie.overview }}
        </div>
      </div>

      <div v-else class="text-medium px-24 mb-4 space-y-2">
        <div class="flex w-full justify-between items-center">
          <div class="text-3xl h-8 w-60 w-1/4 bg-white bg-opacity-20 rounded-md" />
          <div class="text-5xl h-20 w-20 bg-white bg-opacity-20 rounded-md" />
        </div>
        <div class="h-24 w-96 bg-white bg-opacity-20 rounded-md" />
      </div>

      <HorizontalScrollContainer v-if="isLoading" class="space-x-6 py-4 px-24">
        <div
          v-for="i in 3"
          :key="i"
          class="flex flex-col items-center justify-center h-80 animate-pulse"
        >
          <div class="w-52 h-72 bg-white bg-opacity-40 rounded-md" />
        </div>
      </HorizontalScrollContainer>

      <HorizontalScrollContainer v-else class="space-x-6 py-4 px-24">
        <button
          v-for="item in collectedMovies"
          :key="item.movie.ids.trakt"
          v-focus
          class="first-focus min-w-max group flex items-center justify-between p-0 border border-transparent text-md font-medium rounded-md text-white focus:outline-none"
          @click="onClick(item)"
          @focus="selected = item"
        >
          <MoviePosterSelectable :item="item" />
        </button>
      </HorizontalScrollContainer>
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
