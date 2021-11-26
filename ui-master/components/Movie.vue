<template>
  <div class="flex flex-col space-y-4 items-start justify-between py-16 w-screen min-h-full">
    <div
      class="max-w-full w-full px-24"
    >
      <div class="flex items-start justify-start space-x-8">
        <div>
          <MoviePoster :item="item" />
        </div>
        <div class="flex-1">
          <div class="text-medium mb-4 space-y-8">
            <div class="flex w-full justify-between items-center">
              <div class="text-5xl">
                {{ item.movie.title }} ({{ item.movie.year }})
              </div>
              <div class="text-5xl font-semibold flex justify-center items-center">
                <template v-if="item.movie.rating">
                  {{ Number(item.movie.rating).toFixed(1).toLocaleString() }}
                </template>
              </div>
            </div>
            <div>
              {{ item.movie.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 px-24 flex flex-col space-y-4 items-start justify-end">
      asdasd
    </div>
  </div>
</template>

<script>
import MoviePoster from './MoviePoster.vue'

export default {
  components: {
    MoviePoster
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
