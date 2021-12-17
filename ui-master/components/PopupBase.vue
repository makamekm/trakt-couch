<template>
  <Portal to="popup">
    <transition name="fade">
      <FocusTrap v-if="show" :active="show && focusTrap" :initial-focus="focusElement">
        <div
          ref="popup"
          class="popup-wrap"
          :style="{ left: offset.left, right: offset.right, top: offset.top, bottom: offset.bottom, minWidth: offset.width }"
          @click.prevent.stop
        >
          <slot />
        </div>
      </FocusTrap>
    </transition>
  </Portal>
</template>

<script>
import { FocusTrap } from 'focus-trap-vue'

export default {
  components: {
    FocusTrap
  },
  props: {
    offsetLeft: {
      default: 0,
      type: Number
    },
    offsetRight: {
      default: 0,
      type: Number
    },
    offsetTop: {
      default: 0,
      type: Number
    },
    offsetBottom: {
      default: 0,
      type: Number
    },
    positionX: {
      default: 'left',
      type: String
    },
    positionY: {
      default: 'bottom',
      type: String
    },
    closeEsc: {
      default: false,
      type: Boolean
    },
    closeOutside: {
      default: true,
      type: Boolean
    },
    focusTrap: {
      default: false,
      type: Boolean
    },
    show: {
      default: true,
      type: Boolean
    },
    label: {
      required: false,
      type: String,
      default: 'popup'
    },
    focusElement: {
      required: false,
      type: Function,
      default: undefined
    },
    targetElement: {
      required: false,
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      offset: {
        top: 0 + 'px',
        left: 0 + 'px',
        width: 'auto'
      }
    }
  },
  watch: {
    show (value) {
      if (value) {
        this.getOffset()
        if (!this.$store.$overlays.includes(this)) {
          this.$store.$overlays.push(this)
        }
      } else if (this.$store.$overlays.includes(this)) {
        this.$store.$overlays.splice(this.$store.$overlays.findIndex(p => p === this.$store.$overlays), 1)
      }
    }
  },
  mounted () {
    const close = (e) => {
      if (!this.closeEsc) {
        return
      }

      const ESC = 27
      if (e.keyCode !== ESC && this.show) {
        return
      }

      this.$emit('close')
    }

    const onRouteChange = () => {
      if (this.show && this.$store.$overlays[0] === this) {
        this.$emit('close')
      }
    }

    window.addEventListener('popstate', onRouteChange)
    this.$on('hook:destroyed', () => {
      window.removeEventListener('popstate', onRouteChange)
    })

    const closeIfOutside = (e) => {
      if (!this.closeOutside) {
        return
      }

      if (this.$refs.popup && (e.target === this.$refs.popup || this.$refs.popup.contains(e.target))) {
        return
      }

      const targetElement = this.targetElement && this.targetElement()
      if (targetElement && (e.target === targetElement || targetElement.contains(e.target))) {
        return
      }

      this.$emit('close')
    }

    // Close the popup when the
    // user presses the ESC key.
    document.addEventListener('keyup', close)
    this.$on('hook:destroyed', () => {
      document.removeEventListener('keyup', close)
    })

    // Close the popup when the
    // user clicks outside.
    document.addEventListener('mouseup', closeIfOutside)
    this.$on('hook:destroyed', () => {
      document.removeEventListener('mouseup', closeIfOutside)
    })

    this.getOffset()
  },
  methods: {
    getOffset () {
      const targetElement = this.targetElement && this.targetElement()
      if (!targetElement) {
        this.offset = {
          top: 0,
          left: 0,
          width: 'auto'
        }
      }

      const bodyRect = document.body.getBoundingClientRect()
      const elemRect = targetElement.getBoundingClientRect()

      const offset = {
        width: elemRect.width + 'px'
      }

      let offsetX = {}
      if (this.positionX === 'right') {
        offsetX = {
          right: (bodyRect.width - (elemRect.left - bodyRect.left) - elemRect.width + this.offsetRight) + 'px'
        }
      } else {
        offsetX = {
          left: (elemRect.left - bodyRect.left + this.offsetLeft) + 'px'
        }
      }

      let offsetY = {}
      if (this.positionY === 'top') {
        offsetY = {
          bottom: (bodyRect.height - (elemRect.top - bodyRect.top) + this.offsetBottom) + 'px'
        }
      } else {
        offsetY = {
          top: (elemRect.top - bodyRect.top + elemRect.height + this.offsetTop) + 'px'
        }
      }

      this.offset = {
        ...offset,
        ...offsetX,
        ...offsetY
      }
    }
  }
}
</script>

<style scoped>
.popup-wrap {
  position: absolute;
  z-index: 10;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
