<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
    }"
    class="flex flex-col items-center justify-center h-56"
  >
    <div class="relative">
      <img
        v-if="!isReset"
        ref="image"
        :data-src="src"
        :alt="item.movie.title"
        data-sizes="auto"
        class="lazyload object-cover rounded-md w-40 max-h-56 h-56"
        @load="onImageLoad"
        @error="onImageLoadError"
      >

      <transition name="fade">
        <div
          v-if="isLoading"
          class="absolute rounded-md left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full bg-black bg-opacity-60 flex items-center justify-center text-white z-10"
        >
          <svg fill="none" class="w-20 h-20 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import 'lazysizes'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    item: { type: Object, requred: true, default: null }
  },
  data () {
    return {
      isDownloading: true,
      isError: false,
      isReset: false
    }
  },
  computed: {
    ...mapGetters('movie-image', {
      poster: 'poster',
      imagesIsLoading: 'imagesIsLoading'
    }),
    src () {
      return this.poster(this.item) || '/img_broken.svg'
    },
    isLoading () {
      return this.imagesIsLoading(this.item) || this.isDownloading
    }
  },
  watch: {
    src (value) {
      if (value !== this.loadedSrc) {
        this.doLoad()
      }
    }
  },
  mounted () {
    this.doLoad()
  },
  methods: {
    ...mapActions('movie-image', {
      loadImage: 'loadImage',
      clearImage: 'clearImage'
    }),
    async visibilityChanged (isVisible) {
      if (isVisible) {
        await this.loadImage(this.item)
      }
    },
    async onImageLoad (e) {
      this.isDownloading = false
      if (!e.currentTarget?.width) {
        this.isError = true
        await this.clearImage(this.item)
        await this.loadImage(this.item)
      }
    },
    doLoad () {
      this.isReset = true
      this.isDownloading = true
      this.$nextTick(() => {
        this.isReset = false
        this.isError = false
        this.loadedSrc = this.src
      })
    },
    async onImageLoadError (e) {
      this.isDownloading = false
      this.isError = true
      await this.clearImage(this.item)
      await this.loadImage(this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  img[src=""], img[src="#"], img:not([src]) {
    opacity: 0;
  }
</style>
