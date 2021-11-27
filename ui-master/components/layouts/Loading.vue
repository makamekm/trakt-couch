<template>
  <div class="flex items-center justify-center w-full h-full fixed left-0 top-0 bg-black bg-opacity-100 loading-overlay text-white" :class="{ 'hide': hide }">
    <!-- <Background /> -->
    <div class="flex justify-center items-center text-sm space-x-2">
      <div class="animate-pulse text-lg font-bold">
        Trakt
      </div>
      <div class="relative w-24 h-24">
        <div class="animate-pulse absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <div class="w-20 h-20 rounded-full bg-white opacity-20" />
        </div>
        <div class="animate-pulse absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <svg fill="none" class="w-40 h-40 animate-spin opacity-10" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div class="animate-pulse absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <div class="w-16 h-16">
            <img
              class="w-full h-full"
              src="/trakt-white-bg.png"
            >
          </div>
          <!-- <svg fill="none" class="w-20 h-20" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Trakt icon</title><path fill="currentColor" d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm0-22.789C6.05 1.211 1.211 6.05 1.211 12S6.05 22.79 12 22.79 22.79 17.95 22.79 12 17.95 1.211 12 1.211zm-7.11 17.32c1.756 1.92 4.294 3.113 7.11 3.113 1.439 0 2.801-.313 4.027-.876l-6.697-6.68-4.44 4.443zm14.288-.067c1.541-1.71 2.484-3.99 2.484-6.466 0-3.885-2.287-7.215-5.568-8.76l-6.089 6.076 9.164 9.15h.009zm-9.877-8.429L4.227 15.09l-.679-.68 5.337-5.336 6.23-6.225c-.978-.328-2.02-.509-3.115-.509C6.663 2.337 2.337 6.663 2.337 12c0 2.172.713 4.178 1.939 5.801l5.056-5.055.359.329 7.245 7.245c.15-.082.285-.164.42-.266L9.33 12.05l-4.854 4.855-.679-.679 5.535-5.535.359.331 8.46 8.437c.135-.1.255-.215.375-.316L9.39 10.027l-.083.015-.006-.007zm3.047 1.028l-.678-.676 4.788-4.79.679.689-4.789 4.785v-.008zm4.542-6.578l-5.52 5.52-.68-.679 5.521-5.52.679.684v-.005z" /></svg> -->
        </div>
      </div>
      <div class="animate-pulse text-lg font-bold">
        Couch
      </div>
    </div>
  </div>
</template>

<script>
// import Background from './Background.vue'
export default {
  // components: { Background },
  props: {
    hide: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .loading-overlay {
    opacity: 1;
    transition: opacity 0.3s;
    user-select: none;
    z-index: 9999;
    pointer-events: all;
  }

  .loading-overlay.hide {
    opacity: 0;
    pointer-events: none;
  }
</style>
