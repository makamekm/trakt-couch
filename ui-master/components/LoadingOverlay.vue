<template>
  <div class="flex items-center justify-center w-full h-full absolute z-10 left-0 top-0 bg-black bg-opacity-40 loading-overlay text-white rounded-md" :class="{ 'show': show }">
    <div class="flex justify-center items-center space-x-1 text-sm">
      <svg fill="none" class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
      <div>Loading</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      default: true,
      type: Boolean
    },
    element: {
      default: () => null,
      type: Function
    }
  },
  watch: {
    show (value) {
      if (value) {
        const el = this.element && this.element()
        const curr = document.activeElement
        if (el && (el === curr || el.contains(curr))) {
          curr.blur()
        }
      }
    }
  },
  mounted () {
    this.__onFocus = (e) => {
      let prev = e.target
      if (this.show) {
        const el = this.element && this.element()
        if (el && (el === e.target || el.contains(e.target))) {
          e.target.blur()
          prev = this.focusNextElement(el, e.target)
        }
      }
      this.__prevFocused = prev
    }
    document.addEventListener('focus', this.__onFocus, true)
  },
  unmount () {
    document.removeEventListener('focus', this.__onFocus)
  },
  methods: {
    focusNextElement (el, current) {
      const focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
      const focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElements),
        (element) => {
          return element === current || (element !== el && !el.contains(element))
        })
      const focussableAll = Array.from(document.querySelectorAll(focussableElements))
      let indexPrevAll = focussableAll.indexOf(this.__prevFocused)
      const indexAll = focussableAll.indexOf(current)
      if (indexPrevAll === -1) {
        indexPrevAll = indexAll
      }

      const index = focussable.indexOf(current)
      if (index > -1) {
        if (indexPrevAll > indexAll) {
          const nextElement = focussable[index - 1] || focussable[0]
          nextElement.focus()
          return nextElement
        } else {
          const nextElement = focussable[index + 1] || focussable[0]
          nextElement.focus()
          return nextElement
        }
      }
    }
  }
}
</script>

<style scoped>
  .loading-overlay {
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    user-select: none;
  }

  .loading-overlay.show {
    opacity: 1;
    pointer-events: all;
  }
</style>
