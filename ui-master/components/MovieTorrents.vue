<template>
  <div class="flex flex-col space-y-4 items-start justify-between w-screen min-h-full max-h-full h-full px-16">
    <div class="flex items-stretch justify-start space-x-16 min-h-1px w-full h-full">
      <div class="0w-56 break-words py-16">
        <div class="space-y-6">
          <MoviePoster :item="item" />
          <div class="text-2xl font-bold opacity-70">
            {{ item.movie.title }} ({{ item.movie.year }})
          </div>
          <div class="text-xl font-semibold opacity-60">
            {{ item.movie.tagline }}
          </div>
        </div>
      </div>
      <div class="flex-1 max-h-full h-full relative">
        <div class="overflow-y-auto overflow-x-hidden max-h-full h-full px-4 pb-4 pt-16 9absolute left-0 top-0 bottom-0 right-0">
          <div class="flex flex-col space-y-8">
            <div
              v-for="(torrent, index) in torrents"
              ref="torrents"
              :key="index"
              v-focus
              class="text-left py-4 px-6 rounded-md bg-black flex flex-col items-start justify-start bg-opacity-40 focus:outline-none focus:ring-8 focus:ring-white transition duration-300 space-y-4"
            >
              <div>
                <div class="flex items-start justify-start">
                  <div class="text-2xl break-words">
                    {{ torrent.title }}
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="flex items-center justify-start space-x-6">
                  <div class="opacity-50">
                    {{ $moment(torrent.createTime).format('YYYY-MM-DD') }}
                  </div>
                  <div class="opacity-50">
                    {{ torrent.tracker }}
                  </div>
                  <div class="flex-1" />
                  <div>
                    <span class="opacity-50">Раздают:</span> {{ torrent.pir }}
                  </div>
                  <div>
                    <span class="opacity-50">Качают:</span> {{ torrent.sid }}
                  </div>
                  <div class="px-4 py-2 bg-white rounded-md text-gray-700 font-semibold">
                    {{ torrent.sizeName }}
                  </div>
                </div>
              </div>
            <!-- <div class="text-5xl font-semibold flex justify-center items-center">
              <template v-if="item.movie.rating">
                {{ Number(item.movie.rating).toFixed(1).toLocaleString() }}
              </template>
            </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import {
//   PlayIcon,
//   LoaderIcon
// } from 'vue-feather-icons'
import MoviePoster from './MoviePoster.vue'

export default {
  components: {
    MoviePoster
  },
  computed: {
    ...mapGetters('torrent', {
      torrents: 'torrents',
      item: 'movie'
    })
  },
  mounted () {
    console.log(this.torrents)
    console.log(this.item.movie)
    this.$refs.torrents?.[0]?.focus()
  },
  methods: {
    ...mapActions('torrent', {
      searchTorrents: 'searchTorrents'
    }),
    onWatchTorrent () {
      if (!this.isLoading) {
        this.searchTorrents(this.item)
      }
    }
  }
}
</script>
