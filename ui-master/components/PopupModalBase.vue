<template>
  <PopupBase
    v-if="isDesktop"
    :position-x="positionX"
    :position-y="positionY"
    close-esc
    :focus-trap="focusTrap"
    :show="show && !disablePopup"
    :target-element="targetElement"
    :focus-element="focusElement"
    :offset-left="offsetLeft"
    :offset-right="offsetRight"
    :offset-top="offsetTop"
    :offset-bottom="offsetBottom"
    @close="$emit('close')"
  >
    <div
      class="flex flex-col rounded-xl bg-black bg-opacity-50 shadow menu-popup"
    >
      <slot />
    </div>
  </PopupBase>
  <ModalBase
    v-else
    :show="show && !disableModal"
    :centered-x="false"
    :centered-y="false"
    :focus-element="focusElement"
    @close="$emit('close')"
  >
    <template #backdrop>
      <div class="backdrop" @click="$emit('close')" />
    </template>
    <slot name="modal-main" />
    <div
      v-if="!disablePopup"
      class="flex flex-col bg-black bg-opacity-50 shadow"
      :class="{ 'menu-modal-bottom rounded-t-xl': !mobileTop, 'menu-modal-top mx-2 rounded-xl': mobileTop }"
    >
      <slot />
    </div>
  </ModalBase>
</template>

<script>
import PopupBase from './PopupBase.vue'
import ModalBase from './ModalBase.vue'

export default {
  components: {
    PopupBase,
    ModalBase
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
    targetElement: {
      required: false,
      type: Function,
      default: undefined
    },
    focusElement: {
      required: false,
      type: Function,
      default: undefined
    },
    show: {
      default: true,
      type: Boolean
    },
    focusTrap: {
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
  computed: {
    isDesktop () {
      return this.$vssWidth > 1024
    }
  }
}
</script>

<style scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}

.menu-popup {
  min-width: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.menu-modal-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 60vh;
  overflow-y: auto;
}

.menu-modal-top {
  position: absolute;
  bottom: auto;
  left: 0;
  right: 0;
  max-height: 35vh;
  overflow-y: auto;
}
</style>
