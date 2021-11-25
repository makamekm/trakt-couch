<template>
  <div class="flex flex-col space-y-4 items-start justify-between py-20">
    <div
      class="max-w-full"
    >
      <div class="font-semibold text-medium px-24">
        Collected Movies:
      </div>
      <HorizontalScrollContainer class="space-x-6 py-4 px-24 -mt-0">
        <button
          v-for="item in collectedMovies"
          :key="item.movie.ids.trakt"
          v-focus
          class="first-focus min-w-max group flex items-center justify-between p-0 border border-transparent text-md font-medium rounded-md text-white focus:outline-none"
          @click="onClick"
        >
          <div class="flex flex-col items-center justify-center h-80">
            <MoviePoster :item="item" class="object-cover rounded-md w-52 max-h-80 h-auto group-focus:w-56 transition-all duration-200 bg-white-600 group-focus:bg-white-700 group-focus:outline-none group-focus:ring-8 group-focus:ring-offset-8 group-focus:ring-red-700" src="https://walter.trakt.tv/images/movies/000/416/151/posters/thumb/ef9c109fbf.jpg.webp" alt="sdfsdf" />
          </div>
        </button>
      </HorizontalScrollContainer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HorizontalScrollContainer from './HorizontalScrollContainer.vue'
import MoviePoster from './MoviePoster.vue'

export default {
  components: {
    HorizontalScrollContainer,
    MoviePoster
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
    onClick () {
      console.log('dssdfsdf')
    }
  }
}
</script>
