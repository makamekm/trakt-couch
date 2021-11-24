<template>
  <div>
    <button :class="{ 'opacity-0 pointer-events-none': !hide, 'opacity-1000 pointer-events-auto': hide }" class="fixed flex justify-center items-center w-auto px-2 h-16 absolute left-0 top-1/4 border border-transparent transform -translate-y-1/2 bg-purple-700 rounded-tr-xl rounded-br-xl text-md font-medium text-white focus:bg-purple-700 focus:outline-none focus:ring-8 focus:ring-offset-8 focus:ring-purple-700 transition duration-300" @click="onFocus">
      <ChevronsLeftIcon size="1.5x" />
    </button>
    <div class="transition-all duration-400" :class="{ 'w-0': hide, 'w-96': !hide }" />
    <div class="fixed left-0 top-0 flex items-start justify-center h-full max-h-full bg-opacity-100 left-menu-overlay text-white overflow-auto w-96 max-w-96" :class="{ 'hide': hide }" @mouseleave="onMouseLeave">
      <div v-focus-section class="flex flex-col justify-start items-start text-sm space-y-2 mt-36">
        <button
          v-focus
          class="text-left space-x-4 min-w-max group flex items-center justify-between py-2 px-4 rounded-md border border-transparent text-lg font-medium text-white bg-purple-600 focus:bg-purple-700 focus:outline-none focus:ring-8 focus:ring-offset-8 focus:ring-purple-700 transition duration-300"
          @focus="onFocus"
          @blur="onBlur"
          @click="onClick"
        >
          <span class="text-purple-500 group-hover:text-purple-400 transition duration-300">
            <LockIcon />
          </span>
          <span class="w-52">Sign in</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LockIcon, ChevronsLeftIcon } from 'vue-feather-icons'

export default {
  components: {
    LockIcon,
    ChevronsLeftIcon
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
