<template>
  <div>
    <slot name="input" :events="slotContext" />
    <PopupModalBase
      :position-x="positionX"
      :position-y="positionY"
      :show="showPopup"
      :target-element="() => getElement()"
      :focus-element="doFocusElement ? () => focusElement || getElements()[0] : undefined"
      :focus-trap="focusTrap"
      :offset-left="offsetLeft"
      :offset-right="offsetRight"
      :offset-top="offsetTop"
      :offset-bottom="offsetBottom"
      :mobile-top="mobileTop"
      :disable-popup="disablePopup"
      :disable-modal="disableModal"
      @close="onClose"
    >
      <template #modal-main>
        <slot name="modal-input" :events="slotContext" />
      </template>
      <div
        ref="menu"
        class="flex flex-col space-y-3 p-3"
      >
        <slot name="content" :events="slotContext" />
      </div>
    </PopupModalBase>
  </div>
</template>

<script>
import Vue from 'vue'
import PopupModalBase from './PopupModalBase.vue'

export default {
  components: {
    PopupModalBase
  },
  props: {
    mobileTop: {
      default: false,
      type: Boolean
    },
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
    focusTrap: {
      default: false,
      type: Boolean
    },
    focusElement: {
      default: null,
      type: Object
    },
    element: {
      default: null,
      type: Function
    },
    doFocusElement: {
      default: true,
      type: Boolean
    },
    disablePopup: {
      default: false,
      type: Boolean
    },
    disableModal: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      showPopup: false
    }
  },
  computed: {
    slotContext () {
      return {
        open: this.onOpen,
        close: this.onClose,
        isOpen: this.showPopup,
        select: this.onSelect,
        toggle: this.onToggle,
        focusFirst: this.onFocusFirst,
        blur: this.onBlur,
        focusNext: this.onFocusNext,
        focusPrev: this.onFocusPrev,
        keyDown: this.onKeyDown,
        keyDownX: this.onKeyDownX,
        keyDownY: this.onKeyDownY
      }
    }
  },
  methods: {
    getElement () {
      return (this.element && this.element()) || this.$el
    },
    getElements () {
      let items = []
      const $elements = this.getElement()?.querySelectorAll('[tabindex]')
      if ($elements) {
        items = [...items, ...Array.from($elements).filter(el => el.getAttribute('tabindex') !== '-1')]
      }
      const elements = this.$refs.menu?.querySelectorAll('[tabindex]')
      if (elements) {
        items = [...items, ...Array.from(elements).filter(el => el.getAttribute('tabindex') !== '-1')]
      }
      return items
    },
    onSelect (item) {
      this.$emit('select', item)
      this.onClose()
    },
    onOpen () {
      if (!this.showPopup && (!this.closeTimestamp || this.closeTimestamp + 100 < +new Date())) {
        this.openTimestamp = +new Date()
        this.showPopup = true
        this.$emit('open')
      }
    },
    onClose () {
      if (this.showPopup && (!this.openTimestamp || this.openTimestamp + 100 < +new Date())) {
        this.closeTimestamp = +new Date()
        this.showPopup = false
        this.$emit('close')
      }
    },
    onToggle () {
      if (this.showPopup) {
        this.onClose()
      } else {
        this.onOpen()
      }
    },
    async onFocusFirst () {
      if (this.showPopup) {
        await Vue.nextTick()
        this.getElements()[0]?.focus()
      }
    },
    onKeyDown (e) {
      if (e.keyCode === 39 || e.keyCode === 40) {
        this.onFocusNext() && e.preventDefault()
      } else if (e.keyCode === 37 || e.keyCode === 38) {
        this.onFocusPrev() && e.preventDefault()
      }
    },
    onKeyDownX (e) {
      if (e.keyCode === 39) {
        this.onFocusNext() && e.preventDefault()
      } else if (e.keyCode === 37) {
        this.onFocusPrev() && e.preventDefault()
      }
    },
    onKeyDownY (e) {
      if (e.keyCode === 40) {
        this.onFocusNext() && e.preventDefault()
      } else if (e.keyCode === 38) {
        this.onFocusPrev() && e.preventDefault()
      }
    },
    onBlur () {
      setTimeout(() => {
        const elements = this.getElements()
        const targetIndex = elements.indexOf(document.activeElement)
        if (targetIndex < 0 && !this.getElement()?.contains(document.activeElement) && this.getElement() !== document.activeElement) {
          this.showPopup = false
        }
      }, 0)
    },
    onFocusNext () {
      const elements = this.getElements()
      const targetIndex = elements.indexOf(document.activeElement)

      if (targetIndex >= 0) {
        if (elements[targetIndex + 1]) {
          elements[targetIndex + 1].focus()
          return true
        } else if (elements[0]) {
          elements[0].focus()
          return true
        }
      } else if (elements[0]) {
        elements[0].focus()
        return true
      }
    },
    onFocusPrev () {
      const elements = this.getElements()
      const targetIndex = elements.indexOf(document.activeElement)

      if (targetIndex >= 0) {
        if (elements[targetIndex - 1]) {
          elements[targetIndex - 1].focus()
          return true
        } else if (elements.length - 1) {
          elements[elements.length - 1].focus()
          return true
        }
      } else if (elements[0]) {
        elements[0].focus()
        return true
      }
    }
  }
}
</script>
