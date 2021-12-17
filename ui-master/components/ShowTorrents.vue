<template>
  <div class="flex flex-col space-y-4 items-start justify-between w-screen min-h-full max-h-full h-full px-16">
    <div class="flex items-stretch justify-start space-x-16 min-h-1px w-full h-full">
      <div class="w-48 break-words py-16">
        <div class="space-y-6">
          <ShowPoster :item="item" />
          <div class="text-2xl font-bold opacity-70">
            {{ item.show.title }} ({{ item.show.year }})
          </div>
          <div class="text-xl font-semibold opacity-60">
            {{ item.show.tagline }}
          </div>
        </div>
      </div>
      <div class="flex-1 max-h-full h-full relative">
        <div class="overflow-y-auto overflow-x-hidden min-h-full max-h-full h-full px-4 pb-4 pt-16 absolute left-0 top-0 bottom-0 right-0">
          <div class="flex flex-col space-y-8">
            <button
              v-for="(torrent, index) in torrents"
              ref="torrents"
              :key="index"
              v-focus
              class="text-left py-4 px-6 rounded-md bg-black flex flex-col items-start justify-start bg-opacity-40 focus:outline-none focus:ring-8 focus:ring-white transition duration-300 space-y-4"
              @click="onClick(torrent)"
            >
              <div>
                <div class="flex items-start justify-start">
                  <div class="text-2xl break-words">
                    {{ torrent.Title }}
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="flex items-center justify-start space-x-6">
                  <div class="opacity-50">
                    {{ $moment(torrent.PublishDate).format('YYYY-MM-DD') }}
                  </div>
                  <div class="opacity-50">
                    {{ torrent.Tracker }}
                  </div>
                  <div class="flex-1" />
                  <div>
                    <span class="opacity-50">Оценка:</span> {{ torrent.Grabs }}
                  </div>
                  <div>
                    <span class="opacity-50">Раздают:</span> {{ torrent.Seeders }}
                  </div>
                  <div>
                    <span class="opacity-50">Качают:</span> {{ torrent.Peers }}
                  </div>
                  <div class="px-4 py-2 bg-white rounded-md text-gray-700 font-semibold">
                    {{ (torrent.Size / 1073741824).toFixed(2) }} Gb
                  </div>
                </div>
              </div>
              <!-- <div class="text-5xl font-semibold flex justify-center items-center">
              <template v-if="item.show.rating">
                {{ Number(item.show.rating).toFixed(1).toLocaleString() }}
              </template>
            </div> -->
            </button>
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
import ShowPoster from './ShowPoster.vue'

export default {
  components: {
    ShowPoster
  },
  computed: {
    ...mapGetters('torrent', {
      torrents: 'torrents',
      item: 'show'
    })
  },
  mounted () {
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
    },
    async onClick (torrent) {
      console.log(JSON.stringify(torrent, null, 2))
      // window.location.href = `http://hp.my:8090/stream/fname?link=${torrent.magnet}&play`
      // if (typeof TVXServices !== 'undefined') {
      //   alert('HERE')
      // }
      // window.location.href = `vlc-x-callback://x-callback-url/ACTION?url=${torrent.magnet}`
      // window.location.href = torrent.magnet
      // window.location.href = `http://msx.benzac.de/?start=content:http://hp.my:4001/android?stream=${torrent.magnet}`
      // if (typeof TVXInteractionPlugin !== 'undefined') {
      // alert('HERE')
      // window.AndroidJS.openTorrentLink(torrent.magnet)
      // eslint-disable-next-line no-undef
      // console.log(`http://hp.my:8090/stream/${torrent.media?.[0]?.path || 'fname'}?link=${torrent.magnet}&play`)

      const magnet = torrent.Magnet || (await this.$axios.$post('/torrent-to-magnet', {
        file: torrent.Link
      })).magnet
      console.log(magnet)
      TVXInteractionPlugin?.executeAction('system:tvx:launch', {
        // id: 'request_id',
        uri: magnet
        // uri: `http://localhost:8090/stream/${torrent.media?.[0]?.path || 'fname'}?link=${torrent.magnet}&play`,
        // type: 'video/*'
      })
      // }
    }
  }
}
</script>
