<template>
  <div class="flex flex-col space-y-4 items-start justify-between py-20">
    <div
      v-for="k in 1"
      :key="k"
      class="max-w-full"
    >
      <HorizontalScrollContainer class="space-x-4 py-4 px-24">
        <button
          v-for="i in 30"
          :key="i"
          v-focus
          class="first-focus min-w-max group flex items-center justify-between p-0 border border-transparent text-md font-medium rounded-md text-white focus:outline-none"
          @click="onClick"
        >
          <div class="flex items-center h-96">
            <img class="object-cover rounded-md w-52 max-h-96 h-auto group-focus:w-64 transition-all duration-200 bg-white-600 group-focus:bg-white-700 group-focus:outline-none group-focus:ring-8 group-focus:ring-offset-8 group-focus:ring-purple-700" src="https://walter.trakt.tv/images/movies/000/416/151/posters/thumb/ef9c109fbf.jpg.webp" alt="sdfsdf">
          </div>
        </button>
      </HorizontalScrollContainer>
    </div>
  </div>
</template>

<script>
import HorizontalScrollContainer from './HorizontalScrollContainer.vue'

export default {
  components: {
    HorizontalScrollContainer
  },
  methods: {
    onClick () {
      console.log('dssdfsdf')
    }
  }
}
</script>
