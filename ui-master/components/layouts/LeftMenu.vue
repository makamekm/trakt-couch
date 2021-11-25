<template>
  <div>
    <button :class="{ 'opacity-0 pointer-events-none': !hide, 'opacity-100 pointer-events-auto': hide }" class="fixed flex justify-center items-center w-auto px-1 h-16 absolute left-0 top-1/4 border border-transparent transform -translate-y-1/2 bg-black bg-opacity-40 rounded-tr-xl rounded-br-xl text-md font-medium text-white focus:bg-red-700 focus:outline-none focus:ring-8 focus:ring-offset-8 focus:ring-red-700 transition duration-300" @click="onFocus">
      <ChevronLeftIcon size="1.5x" />
    </button>
    <div class="transition-all duration-300" :class="{ 'w-0': hide, 'w-96': !hide }" />
    <div class="fixed left-0 top-0 flex items-start justify-center h-full max-h-full bg-opacity-100 left-menu-overlay text-white overflow-auto w-96 max-w-96 border-r border-black border-opacity-10 shadow-lg bg-black bg-opacity-10" :class="{ 'hide': hide }" @mouseleave="onMouseLeave">
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
