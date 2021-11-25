<template>
  <img
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
    }"
    :src="src"
    alt="poster"
  >
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    item: { type: Object, requred: true, default: null }
  },
  computed: {
    ...mapGetters('movie-image', {
      imagesProimse: 'imagesProimse',
      images: 'images'
    }),
    src () {
      return this.images(this.item)?.poster || 'https://walter.trakt.tv/images/movies/000/416/151/posters/thumb/ef9c109fbf.jpg.webp'
    }
  },
  async mounted () {
  },
  methods: {
    ...mapActions('movie-image', {
      loadImage: 'loadImage'
    }),
    async visibilityChanged () {
      await this.loadImage(this.item)
    }
  }
}
</script>
