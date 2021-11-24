<template>
  <Portal to="modal">
    <transition name="fade-backdrop">
      <div
        v-if="show"
        class="modal-wrap"
      >
        <slot name="backdrop" />
      </div>
    </transition>
    <transition name="fade">
      <FocusTrap v-if="show" :active="show && focusTrap" :initial-focus="focusElement">
        <slot v-if="hasSlot" name="content" />
        <div
          v-else
          role="dialog"
          :aria-label="label"
          aria-modal="true"
          class="modal-wrap"
          :class="{
            'modal-wrap-centered-x': centeredX,
            'modal-wrap-centered-y': centeredY,
          }"
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
    show: {
      default: true,
      type: Boolean
    },
    centeredX: {
      default: true,
      type: Boolean
    },
    centeredY: {
      default: false,
      type: Boolean
    },
    label: {
      required: false,
      type: String,
      default: 'modal'
    },
    focusElement: {
      required: false,
      type: Function,
      default: undefined
    },
    focusTrap: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    hasSlot () {
      return !!this.$slots.content || !!this.$scopedSlots.content
    }
  },
  watch: {
    show (value) {
      if (value) {
        this.activate()
      } else {
        this.deactivate()
      }
    }
  },
  mounted () {
    const close = (e) => {
      const ESC = 27
      if (e.keyCode !== ESC && this.show) {
        return
      }
      this.$emit('close')
    }

    // Close the modal when the
    // user presses the ESC key.
    document.addEventListener('keyup', close)
    this.$on('hook:destroyed', () => {
      document.removeEventListener('keyup', close)
    })

    // Activate the modal when the component is mounted.
    if (this.show) {
      this.activate()
    }
    this.$on('hook:destroyed', () => {
      // Deactivate when the component is destroyed.
      this.deactivate()
    })
  },
  methods: {
    activate () {
      if (!this.active) {
        this.active = true
        // Prevent the background to be scrollable.
        this.disableScrolling()
      }
    },
    deactivate () {
      if (this.active) {
        this.active = false
        // Enable the background to be scrollable.
        this.enableScrolling()
      }
    },
    // Disable scrolling on all devices (including iOS).
    disableScrolling () {
      this.scrollPosition = window.pageYOffset
      const $body = document.querySelector('body')
      $body.style.overflow = 'hidden'
      $body.style.position = 'fixed'
      $body.style.top = `-${this.scrollPosition}px`
      $body.style.width = '100%'
    },
    // Enable scrolling on all devices (including iOS).
    enableScrolling () {
      const $body = document.querySelector('body')
      $body.style.removeProperty('overflow')
      $body.style.removeProperty('position')
      $body.style.removeProperty('top')
      $body.style.removeProperty('width')
      window.scrollTo(0, this.scrollPosition)
    }
  }
}
</script>

<style scoped>
.modal-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
}

.modal-wrap >>> * {
  pointer-events: all;
}

.modal-wrap-centered-x {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.modal-wrap-centered-y {
  display: flex;
  align-items: center;
}

.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-backdrop-enter,
.fade-backdrop-leave-to {
  opacity: 0;
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
