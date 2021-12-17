<template>
  <div class="flex flex-col space-y-16 items-start justify-between py-16 w-screen min-h-full">
    <div class="max-w-full w-full px-16">
      <div class="flex items-start justify-start space-x-16">
        <div class="w-48 flex items-start justify-end">
          <ShowPoster :item="item" />
        </div>
        <div class="flex-1">
          <div class="text-medium mb-4 space-y-8">
            <div class="flex w-full justify-between items-center">
              <div class="text-4xl">
                {{ item.show.title }} ({{ item.show.year }})
              </div>
              <div class="text-5xl font-semibold flex justify-center items-center">
                <template v-if="item.show.rating">
                  {{ Number(item.show.rating).toFixed(1).toLocaleString() }}
                </template>
              </div>
            </div>
            <div>
              {{ item.show.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 px-16 flex space-x-4 items-start justify-start">
      <button
        ref="watchBtn"
        v-focus
        :class="{ 'animate-pulse': isLoading }"
        class="min-w-max group flex space-x-4 items-center justify-between py-3 px-6 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 focus:bg-green-700 focus:outline-none focus:ring-4 focus:ring-white transition duration-300"
        @click="onWatchTorrent"
      >
        <span class="items-center transition duration-300">
          <LoaderIcon v-if="isLoading" size="1x" class="animate-spin" />
          <PlayIcon v-else size="1x" />
        </span>
        <span class="w-auto">Watch</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  PlayIcon,
  LoaderIcon
} from 'vue-feather-icons'
import ShowPoster from './ShowPoster.vue'

export default {
  components: {
    ShowPoster,
    PlayIcon,
    LoaderIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('torrent', {
      isLoading: 'isLoading'
    })
  },
  mounted () {
    this.$refs.watchBtn?.focus()
  },
  methods: {
    ...mapActions('torrent', {
      searchShowTorrents: 'searchShowTorrents'
    }),
    onWatchTorrent () {
      if (!this.isLoading) {
        this.searchShowTorrents(this.item)
      }
    }
  }
}
</script>
