<template>
  <div>
    <button :class="{ 'opacity-0 pointer-events-none': !hide, 'opacity-100 pointer-events-auto': hide }" class="fixed flex justify-center items-center w-auto px-1 h-16 absolute left-0 top-1/4 border border-transparent transform -translate-y-1/2 bg-black bg-opacity-40 rounded-tr-xl rounded-br-xl text-md font-medium text-white focus:bg-red-700 focus:outline-none focus:ring-8 focus:ring-offset-8 focus:ring-red-700 transition duration-300" @click="onFocus">
      <ChevronLeftIcon size="1.5x" />
    </button>
    <div class="transition-all duration-300" :class="{ 'w-0': hide, 'w-96': !hide }" />
    <div class="fixed left-0 top-0 flex flex-col items-center justify-start h-full max-h-full bg-opacity-100 left-menu-overlay text-white overflow-auto w-96 border-r border-black border-opacity-10 shadow-lg bg-black" :class="{ 'hide': hide }" @mouseleave="onMouseLeave">
      <div class="w-full px-4 py-4">
        <div class="logo antialiased flex items-center space-x-3 mb-0 lg:m-0">
          <div class="text-xl">
            <img
              src="/trakt-white-bg.png"
              class="w-16 h-16"
            >
          <!-- <svg
            class="w-16 h-16"
            fill="none"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          ><title>Trakt icon</title><path fill="currentColor" d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm0-22.789C6.05 1.211 1.211 6.05 1.211 12S6.05 22.79 12 22.79 22.79 17.95 22.79 12 17.95 1.211 12 1.211zm-7.11 17.32c1.756 1.92 4.294 3.113 7.11 3.113 1.439 0 2.801-.313 4.027-.876l-6.697-6.68-4.44 4.443zm14.288-.067c1.541-1.71 2.484-3.99 2.484-6.466 0-3.885-2.287-7.215-5.568-8.76l-6.089 6.076 9.164 9.15h.009zm-9.877-8.429L4.227 15.09l-.679-.68 5.337-5.336 6.23-6.225c-.978-.328-2.02-.509-3.115-.509C6.663 2.337 2.337 6.663 2.337 12c0 2.172.713 4.178 1.939 5.801l5.056-5.055.359.329 7.245 7.245c.15-.082.285-.164.42-.266L9.33 12.05l-4.854 4.855-.679-.679 5.535-5.535.359.331 8.46 8.437c.135-.1.255-.215.375-.316L9.39 10.027l-.083.015-.006-.007zm3.047 1.028l-.678-.676 4.788-4.79.679.689-4.789 4.785v-.008zm4.542-6.578l-5.52 5.52-.68-.679 5.521-5.52.679.684v-.005z" /></svg> -->
          </div>
          <div class="flex flex-col items-start justify-center pr-1 space-y-1">
            <div class=" font-semibold text-sm logo">
              Trakt Couch
            </div>
            <div class="text-gray-300 text-xs">
              TRAKT.TV
            </div>
          </div>
        </div>
      </div>
      <div v-focus-section="{ enterTo:'last-focused' }" class="flex flex-col justify-start items-start text-sm space-y-2 mt-36">
        <button
          v-focus
          class="text-left space-x-4 min-w-max group flex items-center justify-between py-2 px-4 rounded-md border border-transparent text-lg font-medium text-white bg-black bg-opacity-40 focus:bg-red-700 focus:outline-none focus:ring-8 focus:ring-offset-8 focus:ring-red-700 transition duration-300"
          @focus="onFocus"
          @blur="onBlur"
          @click="onClick"
        >
          <span class="text-white transition duration-300">
            <LockIcon />
          </span>
          <span class="w-52">Sign in</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LockIcon, ChevronLeftIcon } from 'vue-feather-icons'

export default {
  components: {
    LockIcon,
    ChevronLeftIcon
  },
  data () {
    return {
      hide: true
    }
  },
  methods: {
    onFocus () {
      this.hide = false
    },
    onBlur () {
      this.hide = true
    },
    onMouseLeave () {
      this.hide = true
    },
    onClick () {
      this.hide = true
      // eslint-disable-next-line no-self-assign
      window.location.href = window.location.href
    }
  }
}
</script>

<style scoped>
  .left-menu-overlay {
    opacity: 1;
    transition: all 0.3s;
    user-select: none;
    z-index: 1;
    pointer-events: all;
    transform: translateX(0);
  }

  .left-menu-overlay.hide {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-100%);
  }
</style>
